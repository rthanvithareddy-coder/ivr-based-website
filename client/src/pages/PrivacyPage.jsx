import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';

export default function PrivacyPage({ navigate }) {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#7047EB] transition-colors py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              Legal & Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Effective Date: January 1, 2026 • {COMPANY_INFO.legalName}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">1. Commitment to Data Privacy</h2>
              <p>
                <strong>IVR Tech Solutions Private Limited</strong> ("IVR Tech Solutions", "we", "us", or "our") respects your privacy and is dedicated to safeguarding personal data submitted through our corporate website ({COMPANY_INFO.existingWebsite}) and associated inquiry pipelines.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Contact & Project Inquiries:</strong> Name, work email address, telephone number, organization name, project scope, budget indications, and technical requirements.</li>
                <li><strong>Candidate Employment Applications:</strong> Full name, contact coordinates, curriculum vitae/resume documents, employment history, and cover notes.</li>
                <li><strong>Automated Telemetry:</strong> Standard server access logs, browser user agents, and IP addresses for anti-spam rate limiting and server security.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">3. Purpose and Legal Basis for Processing</h2>
              <p>
                We process collected data exclusively to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Respond to commercial proposals, technical enquiries, and service requests.</li>
                <li>Evaluate candidate suitability for posted engineering and corporate vacancies.</li>
                <li>Maintain system availability, mitigate malicious automated spam bots, and enforce contractual confidentiality agreements.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">4. Secure Storage & Retention</h2>
              <p>
                All resume uploads and client inquiries are stored in secure, access-controlled databases with strict cryptographic safeguards. Uploaded candidate files undergo filename sanitization and MIME-type verification. We retain candidate documents only for the duration of the recruitment evaluation cycle unless explicitly authorized for future engineering positions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">5. Non-Disclosure & Third-Party Sharing</h2>
              <p>
                We never sell, lease, or monetize personal information. Information is disclosed only to authorized IVR Tech Solutions engineering and human resources personnel. We maintain strict non-disclosure obligations for all client intellectual property and project documentation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">6. Contacting the Data Protection Officer</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request data rectification or erasure, please write to us at:
              </p>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                <strong>IVR Tech Solutions Private Limited</strong><br />
                Attn: Privacy & Compliance Desk<br />
                Email: <a href={`mailto:${COMPANY_INFO.emails.official}`} className="text-[#7047EB] font-bold">{COMPANY_INFO.emails.official}</a><br />
                Chennai, Tamil Nadu, India
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
