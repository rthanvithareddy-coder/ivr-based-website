const http = require('http');
const fs = require('fs');
const path = require('path');

require(require.resolve('dotenv', { paths: [path.join(__dirname, 'server')] }))
  .config({ path: path.join(__dirname, 'server', '.env') });
process.env.ADMIN_USERNAME ||= 'admin';
process.env.ADMIN_PASSWORD ||= 'test-only-password-change-me';
process.env.JWT_SECRET ||= 'test-only-jwt-secret-change-me';

const app = require('./server/index.js');

async function runTests() {
  console.log('\n======================================================');
  console.log(' RUNNING END-TO-END VERIFICATION SUITE');
  console.log(' IVR TECH SOLUTIONS PRIVATE LIMITED PLATFORM');
  console.log('======================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, name) {
    total++;
    if (condition) {
      console.log(`  ✓ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${name}`);
    }
  }

  const BASE_URL = 'http://localhost:5000';

  // Helper request
  function request(method, pathUrl, headers = {}, body = null) {
    return new Promise((resolve, reject) => {
      const url = new URL(pathUrl, BASE_URL);
      const req = http.request(
        url,
        {
          method,
          headers,
        },
        (res) => {
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => {
            let parsed = data;
            try {
              parsed = JSON.parse(data);
            } catch (e) {}
            resolve({ status: res.statusCode, headers: res.headers, body: parsed, raw: data });
          });
        }
      );
      req.on('error', reject);
      if (body) {
        req.write(body);
      }
      req.end();
    });
  }

  try {
    // 1. Health check
    const health = await request('GET', '/api/health');
    assert(health.status === 200, 'Health check returns status 200');
    assert(health.body.company === 'IVR Tech Solutions Private Limited', 'Health check reflects official company name');

    // 2. Static SPA serving
    const home = await request('GET', '/');
    assert(home.status === 200, 'Root / serves SPA index.html with HTTP 200');
    assert(home.raw.includes('IVR Tech Solutions'), 'Root contains IVR Tech Solutions branding');

    // 3. Contact Form Submission
    const contactPayload = JSON.stringify({
      name: 'Ramesh Sundaram',
      email: 'ramesh@enterprise.in',
      phone: '9840123456',
      company: 'Sundaram Enterprises',
      service: 'Web Development',
      subject: 'Inquiry for Corporate Portal',
      message: 'We are looking to develop an enterprise portal for our retail operations.',
    });
    const contactRes = await request('POST', '/api/contact', { 'Content-Type': 'application/json' }, contactPayload);
    assert(contactRes.status === 201, 'Contact form submission creates record with HTTP 201');
    assert(contactRes.body.success === true, 'Contact response indicates success');
    assert(typeof contactRes.body.id === 'number', 'Contact record assigned an ID');

    // 4. Contact Form Validation check
    const invalidContact = await request('POST', '/api/contact', { 'Content-Type': 'application/json' }, JSON.stringify({ name: '' }));
    assert(invalidContact.status === 400, 'Contact form rejects invalid payload with HTTP 400');

    // 5. Let's Talk Project RFP Submission
    const rfpPayload = JSON.stringify({
      name: 'Priya Narayanan',
      email: 'priya@techventures.co',
      phone: '9884567890',
      company: 'TechVentures Pvt Ltd',
      project_type: 'Mobile App (iOS / Android)',
      budget: '₹1,50,000 - ₹5,00,000',
      timeline: 'Within 1-3 Months',
      description: 'Need a Flutter cross-platform mobile application with offline-first synchronization.',
    });
    const rfpRes = await request('POST', '/api/rfp', { 'Content-Type': 'application/json' }, rfpPayload);
    assert(rfpRes.status === 201, 'Project RFP submission creates record with HTTP 201');
    assert(rfpRes.body.success === true, 'RFP response indicates success');

    // 6. Insights Articles Retrieval & Search
    const insightsRes = await request('GET', '/api/insights');
    assert(insightsRes.status === 200, 'GET /api/insights returns HTTP 200');
    assert(Array.isArray(insightsRes.body.articles) && insightsRes.body.articles.length > 0, 'Seeded articles returned');

    const searchRes = await request('GET', '/api/insights?search=Telephony');
    assert(searchRes.status === 200, 'Article search query returns HTTP 200');
    assert(searchRes.body.articles.some((a) => a.title.includes('Telephony')), 'Search matches Telephony article');

    // 7. Single Article by Slug
    const articleSlug = insightsRes.body.articles[0].slug;
    const singleArt = await request('GET', `/api/insights/${articleSlug}`);
    assert(singleArt.status === 200, 'GET /api/insights/:slug returns HTTP 200');
    assert(singleArt.body.article.slug === articleSlug, 'Slug matches requested article');

    // 8. Admin Authentication
    const adminLoginRes = await request(
      'POST',
      '/api/admin/login',
      { 'Content-Type': 'application/json' },
      JSON.stringify({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD })
    );
    assert(adminLoginRes.status === 200, 'Admin login with valid credentials succeeds with HTTP 200');
    assert(!!adminLoginRes.body.token, 'Admin receives JWT Bearer token');
    const adminToken = adminLoginRes.body.token;

    // 9. Admin Stats
    const statsRes = await request('GET', '/api/admin/stats', { Authorization: `Bearer ${adminToken}` });
    assert(statsRes.status === 200, 'Admin stats retrieved with HTTP 200');
    assert(statsRes.body.stats.inquiries >= 1, 'Stats reflect submitted inquiry count');
    assert(statsRes.body.stats.rfps >= 1, 'Stats reflect submitted RFP count');

    // 10. Admin Inquiries List
    const adminInquiries = await request('GET', '/api/admin/inquiries', { Authorization: `Bearer ${adminToken}` });
    assert(adminInquiries.status === 200, 'Admin inquiries list returns HTTP 200');
    assert(adminInquiries.body.inquiries.some((i) => i.name === 'Ramesh Sundaram'), 'Submitted inquiry present in admin list');

    // 11. Admin RFPs List
    const adminRfps = await request('GET', '/api/admin/rfps', { Authorization: `Bearer ${adminToken}` });
    assert(adminRfps.status === 200, 'Admin RFPs list returns HTTP 200');
    assert(adminRfps.body.rfps.some((r) => r.name === 'Priya Narayanan'), 'Submitted RFP present in admin list');

    // 12. Careers Resume Upload Simulation
    const boundary = '----WebKitFormBoundaryIVRTest' + Math.random().toString(16);
    const resumeTextContent = 'Sample Resume Content for Junior Full-Stack Developer Application.';
    const postData = [
      `--${boundary}`,
      'Content-Disposition: form-data; name="name"',
      '',
      'Karthik Venkat',
      `--${boundary}`,
      'Content-Disposition: form-data; name="email"',
      '',
      'karthik@example.com',
      `--${boundary}`,
      'Content-Disposition: form-data; name="phone"',
      '',
      '9841234567',
      `--${boundary}`,
      'Content-Disposition: form-data; name="position"',
      '',
      'Senior Full-Stack Developer',
      `--${boundary}`,
      'Content-Disposition: form-data; name="cover_letter"',
      '',
      'I have 3 years experience building React and Node applications in Chennai.',
      `--${boundary}`,
      'Content-Disposition: form-data; name="resume"; filename="karthik_resume.pdf"',
      'Content-Type: application/pdf',
      '',
      resumeTextContent,
      `--${boundary}--`,
      '',
    ].join('\r\n');

    const appRes = await request(
      'POST',
      '/api/careers/apply',
      {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(postData),
      },
      postData
    );
    assert(appRes.status === 201, 'Job application with resume upload succeeds with HTTP 201');
    assert(appRes.body.success === true, 'Application submission marked success');

    // 13. Admin Applications List & Resume Download
    const adminApps = await request('GET', '/api/admin/applications', { Authorization: `Bearer ${adminToken}` });
    assert(adminApps.status === 200, 'Admin applications list returns HTTP 200');
    const uploadedCandidate = adminApps.body.applications.find((a) => a.name === 'Karthik Venkat');
    assert(!!uploadedCandidate, 'Uploaded candidate found in admin applications list');

    if (uploadedCandidate) {
      const resumeDownload = await request('GET', `/api/admin/resumes/${uploadedCandidate.resume_filename}`, {
        Authorization: `Bearer ${adminToken}`,
      });
      assert(resumeDownload.status === 200, 'Resume download endpoint serves file with HTTP 200');
      assert(resumeDownload.raw === resumeTextContent, 'Resume content verified identical to uploaded document');
    }

    console.log(`\n======================================================`);
    console.log(` TEST RESULTS: ${passed} / ${total} CHECKS PASSED (${Math.round((passed / total) * 100)}%)`);
    console.log(`======================================================\n`);

    if (passed === total) {
      console.log('ALL INTEGRATION AND FUNCTIONAL REQUIREMENTS SATISFIED.');
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

// Allow server to listen before test run
setTimeout(runTests, 1200);
