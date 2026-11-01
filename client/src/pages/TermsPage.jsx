import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage({ navigate }) {
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
              Corporate Terms of Service
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
              Terms & Conditions
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Effective Date: January 1, 2026 • {COMPANY_INFO.legalName}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">1. Acceptance of Terms</h2>
              <p>
                By accessing or utilizing the official web portal of <strong>IVR Tech Solutions Private Limited</strong> ({COMPANY_INFO.existingWebsite}), you agree to be bound by these Terms and Conditions and all applicable laws and regulations under the jurisdiction of Chennai, Tamil Nadu, India.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">2. Intellectual Property Rights</h2>
              <p>
                The IVR logo mark, corporate branding, website typography, illustrations, case study narratives, and bespoke code demonstrations are the exclusive intellectual property of IVR Tech Solutions Private Limited. Unauthorized duplication, modification, or distribution is prohibited without prior written consent.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">3. Service Inquiries & Scope Proposals</h2>
              <p>
                Submissions made through our "Let's Talk", project RFPs, or contact forms constitute preliminary business communications and do not constitute a binding delivery contract until formal execution of a Statement of Work (SOW) or Master Services Agreement (MSA).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">4. Candidate Submissions & Accuracy</h2>
              <p>
                Job applicants affirm that all information, resumes, employment credentials, and project portfolios submitted via our careers module represent accurate, un-falsified representations of personal qualifications.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">5. Limitation of Liability</h2>
              <p>
                While IVR Tech Solutions makes reasonable efforts to maintain continuous website availability and accurate technical articles, the portal is provided on an "as is" and "as available" basis without warranties of uninterrupted operation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">6. Governing Law & Jurisdiction</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with the corporate website shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
