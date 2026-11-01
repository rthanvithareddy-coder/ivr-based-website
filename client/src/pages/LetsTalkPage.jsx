import React, { useState } from 'react';
import { PROJECT_TYPES, BUDGET_RANGES } from '../components/LetsTalkModal';
import { api } from '../services/api';
import { COMPANY_INFO } from '../data/companyData';
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Sparkles, Phone, Mail } from 'lucide-react';

export default function LetsTalkPage({ navigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: PROJECT_TYPES[0],
    budget: BUDGET_RANGES[1],
    timeline: 'Within 1-3 Months',
    description: '',
    _hp: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.submitRfp(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || 'Failed to submit proposal.');
      }
    } catch (err) {
      setError('A network error occurred. Please contact admin@ivrtechsolution.in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#7047EB] text-xs font-bold uppercase tracking-wider">
              <span>Project Planning & RFP Intake</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Let's Talk About Your <span className="gradient-text">Next Digital Initiative</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Tell us what you want to build. From custom web portals and mobile applications to enterprise cloud telephony and workflow automation, our engineering directors will deliver a structured technical plan.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-corporate space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
                  Request For Proposal (RFP)
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 mt-1">
                  Project Scope & Estimator
                </h2>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Project Proposal Received!</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to <strong>IVR Tech Solutions Private Limited</strong>. Our technical architecture team will review your specifications and contact you within 24 business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          project_type: PROJECT_TYPES[0],
                          budget: BUDGET_RANGES[1],
                          timeline: 'Within 1-3 Months',
                          description: '',
                          _hp: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-lg text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                      Submit Another Scope
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_hp"
                    value={formData._hp}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Sundar Rajan"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sundar@company.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enterprise Ltd / Startup"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Project Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="project_type"
                        value={formData.project_type}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none bg-white transition"
                      >
                        {PROJECT_TYPES.map((pt) => (
                          <option key={pt} value={pt}>
                            {pt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none bg-white transition"
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none bg-white transition"
                      >
                        <option value="Urgent (1 Month)">Urgent (1 Month)</option>
                        <option value="Within 1-3 Months">Within 1-3 Months</option>
                        <option value="3-6 Months">3-6 Months</option>
                        <option value="Flexible / Q1-Q2">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Project Description & Technical Needs <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your project requirements, user workflows, integrations needed, or existing system to replace..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-gray-400">
                      We protect client confidentiality with full mutual NDA readiness.
                    </span>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white gradient-accent shadow hover:opacity-95 disabled:opacity-50 transition flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Proposal...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Proposal</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Why Work With Us & Direct Reach */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-[#111827] text-white space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                What Happens Next?
              </span>
              <h3 className="text-lg font-bold">Our 3-Step Consultation</h3>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-3 rounded-xl bg-gray-800/70 border border-gray-700/60">
                  <strong className="text-white block mb-0.5">1. Scoping Call</strong>
                  <span>A 30-minute technical session to understand your exact operational workflow.</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-800/70 border border-gray-700/60">
                  <strong className="text-white block mb-0.5">2. Architecture Plan</strong>
                  <span>We draft a proposed tech stack, system architecture diagram, and milestone estimates.</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-800/70 border border-gray-700/60">
                  <strong className="text-white block mb-0.5">3. Commercial Proposal</strong>
                  <span>Clear, transparent milestone costing without recurring proprietary lock-in.</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
                Prefer Direct Voice / Email?
              </span>
              <p className="text-xs text-gray-600">
                You can reach our corporate leads directly at any time:
              </p>
              <div className="space-y-2 text-xs pt-2">
                <a
                  href={`tel:${COMPANY_INFO.phones[0].raw}`}
                  className="flex items-center gap-2 text-gray-800 hover:text-[#7047EB] font-bold"
                >
                  <Phone className="w-4 h-4 text-[#7047EB]" />
                  <span>+91 {COMPANY_INFO.phones[0].raw}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.emails.official}`}
                  className="flex items-center gap-2 text-gray-800 hover:text-[#3478E5] font-bold"
                >
                  <Mail className="w-4 h-4 text-[#3478E5]" />
                  <span>{COMPANY_INFO.emails.official}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
