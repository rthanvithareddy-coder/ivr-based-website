const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('ivr_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Public Form Submissions
  async submitContact(data) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async submitRfp(data) {
    const res = await fetch(`${API_BASE}/rfp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async submitApplication(formData) {
    const res = await fetch(`${API_BASE}/careers/apply`, {
      method: 'POST',
      body: formData, // Browser sets multipart boundary automatically
    });
    return res.json();
  },

  // Insights
  async getArticles(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    const res = await fetch(`${API_BASE}/insights?${query.toString()}`);
    return res.json();
  },

  async getArticleBySlug(slug) {
    const res = await fetch(`${API_BASE}/insights/${slug}`);
    return res.json();
  },

  // Admin Auth
  async adminLogin(credentials) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  async adminMe() {
    const res = await fetch(`${API_BASE}/admin/me`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  // Admin Management
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  async getAdminInquiries() {
    const res = await fetch(`${API_BASE}/admin/inquiries`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  async updateInquiryStatus(id, status) {
    const res = await fetch(`${API_BASE}/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  async getAdminRfps() {
    const res = await fetch(`${API_BASE}/admin/rfps`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  async updateRfpStatus(id, status) {
    const res = await fetch(`${API_BASE}/admin/rfps/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  async getAdminApplications() {
    const res = await fetch(`${API_BASE}/admin/applications`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  async updateApplicationStatus(id, status) {
    const res = await fetch(`${API_BASE}/admin/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  getResumeDownloadUrl(filename) {
    const token = localStorage.getItem('ivr_admin_token');
    return `${API_BASE}/admin/resumes/${filename}?token=${token || ''}`;
  },

  async getAdminArticles() {
    const res = await fetch(`${API_BASE}/admin/articles`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  async createAdminArticle(article) {
    const res = await fetch(`${API_BASE}/admin/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(article),
    });
    return res.json();
  },

  async deleteAdminArticle(id) {
    const res = await fetch(`${API_BASE}/admin/articles/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },
};
