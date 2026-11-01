import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { SERVICES } from '../data/servicesData';
import { api } from '../services/api';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: SERVICES[0].title,
    subject: '',
    message: '',
    _hp: '', // Honeypot
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
      const res = await api.submitContact(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || 'Failed to submit enquiry. Please review the form and try again.');
      }
    } catch (err) {
      setError('A network error occurred while submitting your enquiry. Please reach us at admin@ivrtechsolution.in.');
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
              <span>Official Corporate Communications</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Contact <span className="gradient-text">IVR Tech Solutions</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Connect directly with our corporate team for project inquiries, technical consultations, enterprise service requests, or institutional collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid: Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
                Registered Information
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                Direct Channels & Coordinates
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Reach our representatives through the verified channels below. We respond to all official communications promptly.
              </p>
            </div>

            <div className="space-y-4">
              {/* Official Entity Card */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7047EB] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Legal Entity</span>
                    <h4 className="text-sm font-bold text-gray-900">{COMPANY_INFO.legalName}</h4>
                  </div>
                </div>
              </div>

              {/* Emails Card */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7047EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Official Emails</span>
                    <div>
                      <span className="text-xs font-semibold text-gray-500">Primary: </span>
                      <a
                        href={`mailto:${COMPANY_INFO.emails.official}`}
                        className="text-xs sm:text-sm font-bold text-gray-900 hover:text-[#7047EB] transition-colors"
                      >
                        {COMPANY_INFO.emails.official}
                      </a>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500">Secondary: </span>
                      <a
                        href={`mailto:${COMPANY_INFO.emails.secondary}`}
                        className="text-xs sm:text-sm font-bold text-gray-900 hover:text-[#7047EB] transition-colors"
                      >
                        {COMPANY_INFO.emails.secondary}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Numbers Card */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3478E5] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Direct Telephone</span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <a
                        href={`tel:${COMPANY_INFO.phones[0].raw}`}
                        className="text-sm font-bold text-gray-900 hover:text-[#3478E5] transition-colors"
                      >
                        +91 {COMPANY_INFO.phones[0].raw}
                      </a>
                      <a
                        href={`tel:${COMPANY_INFO.phones[1].raw}`}
                        className="text-sm font-bold text-gray-900 hover:text-[#3478E5] transition-colors"
                      >
                        +91 {COMPANY_INFO.phones[1].raw}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7047EB] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Corporate Hub</span>
                    <h4 className="text-sm font-bold text-gray-900">Chennai, Tamil Nadu, India</h4>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct Connect Action */}
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-5 h-5 text-emerald-600 fill-current" />
                  <h4 className="text-sm font-bold text-emerald-950">Direct WhatsApp Integration</h4>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Need quick assistance or an instant consultation? Connect directly with our solutions team on WhatsApp.
                </p>
                <div className="pt-1">
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Chat on WhatsApp (+91 8143177907)</span>
                  </a>
                </div>
              </div>

              {/* Existing Website Link */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-center justify-between">
                <span>Existing Website Portal:</span>
                <a
                  href={COMPANY_INFO.existingWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#3478E5] hover:text-[#7047EB] flex items-center gap-1"
                >
                  <span>ivrtechsolution.in</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Working Corporate Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-corporate space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
                  Inquiry Portal
                </span>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                  Send Us a Direct Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Please share your requirements below. Our solutions group will review and respond within 1 business day.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Enquiry Received!</h4>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to <strong>IVR Tech Solutions Private Limited</strong>. Your inquiry has been logged in our secure system and assigned to a solutions manager.
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
                          service: SERVICES[0].title,
                          subject: '',
                          message: '',
                          _hp: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-lg text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Your Name <span className="text-red-500">*</span>
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
                        Corporate Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sundar@enterprise.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company Pvt Ltd"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none bg-white transition"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g., Web Portal Consultation"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Message / Project Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your requirements, challenges, or questions..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-gray-400">
                      We adhere to strict confidentiality. Your details are never shared.
                    </span>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white gradient-accent shadow hover:opacity-95 disabled:opacity-50 transition flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
