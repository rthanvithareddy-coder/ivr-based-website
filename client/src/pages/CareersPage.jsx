import React, { useState, useRef } from 'react';
import { CAREERS_HEADER, CULTURE_PILLARS, HIRING_PROCESS, JOB_OPENINGS } from '../data/careersData';
import { api } from '../services/api';
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileCheck,
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CareersPage({ navigate }) {
  const [expandedJobId, setExpandedJobId] = useState(JOB_OPENINGS[0].id);
  const [selectedPosition, setSelectedPosition] = useState(JOB_OPENINGS[0].title);
  const formRef = useRef(null);

  // Form State
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [hp, setHp] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleApplyClick = (jobTitle) => {
    setSelectedPosition(jobTitle);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError('Resume file size must be under 5MB.');
        return;
      }
      setResumeFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!resumeFile) {
      setError('Please attach your resume file (.pdf, .doc, .docx).');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', candidateName);
      formData.append('email', candidateEmail);
      formData.append('phone', candidatePhone);
      formData.append('position', selectedPosition);
      formData.append('cover_letter', coverLetter);
      formData.append('resume', resumeFile);
      if (hp) formData.append('_hp', hp);

      const res = await api.submitApplication(formData);

      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || 'Failed to submit application. Please check the fields and try again.');
      }
    } catch (err) {
      setError('A network error occurred while submitting your application. Please email admin@ivrtechsolution.in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#7047EB] text-xs font-bold uppercase tracking-wider">
              <span>Join Our Engineering Team</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              {CAREERS_HEADER.headline}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {CAREERS_HEADER.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Culture & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
            Life at IVR Tech Solutions
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900">
            A Culture of Rigor, Support, and Autonomy
          </h2>
          <p className="text-sm text-gray-600">
            We operate as a close-knit engineering unit in Chennai where your voice influences architectural decisions directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CULTURE_PILLARS.map((cult, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-[#7047EB] flex items-center justify-center font-bold text-sm">
                0{i + 1}
              </div>
              <h3 className="text-base font-bold text-gray-900">{cult.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{cult.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Hiring Process */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              Transparent Recruitment
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our 4-Stage Candidate Journey
            </h2>
            <p className="text-sm text-gray-600">
              Respectful of your time, straightforward, and focused on practical engineering ability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIRING_PROCESS.map((st) => (
              <div key={st.step} className="p-6 rounded-2xl bg-[#F5F6F8] border border-gray-200 space-y-3">
                <span className="text-2xl font-black text-[#7047EB] font-display">{st.step}</span>
                <h3 className="text-base font-bold text-gray-900">{st.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Active Job Openings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
            Current Opportunities
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
            Available Roles & Internships
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Explore open opportunities across frontend, full-stack, mobile, UI/UX, and university talent.
          </p>
        </div>

        <div className="space-y-4">
          {JOB_OPENINGS.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div
                key={job.id}
                id={job.id}
                className="scroll-mt-32 corporate-card p-6 sm:p-8 transition-all"
              >
                <div
                  onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                  className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-50 text-[#7047EB] border border-purple-100">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700">
                        {job.type}
                      </span>
                      <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-[#7047EB] transition-colors pt-1">
                      {job.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
                      Experience: {job.experience}
                    </span>
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600"
                      aria-label="Toggle details"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#7047EB]' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-6 animate-in fade-in duration-150">
                    <p className="text-sm text-gray-700 leading-relaxed font-normal">
                      {job.overview}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-l-2 border-[#7047EB] pl-2">
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-1.5">
                          {job.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="text-xs text-gray-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7047EB] mt-1.5 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-l-2 border-[#3478E5] pl-2">
                          Required Qualifications
                        </h4>
                        <ul className="space-y-1.5">
                          {job.requirements.map((req, qIdx) => (
                            <li key={qIdx} className="text-xs text-gray-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3478E5] mt-1.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-400">Application deadline: Rolling basis</span>
                      <button
                        onClick={() => handleApplyClick(job.title)}
                        className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white gradient-accent shadow hover:opacity-95 transition flex items-center gap-1.5"
                      >
                        <span>Apply for This Role</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Working Application Form */}
      <section ref={formRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-corporate space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              Talent Application
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Submit Your Candidacy
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Fill in your contact information, select your position, and attach your resume. All submissions are reviewed by our engineering leads.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Application Successfully Submitted!</h4>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you for applying to <strong>IVR Tech Solutions Private Limited</strong>. Your resume has been securely archived on our server. If your credentials align with our current openings, our talent coordinator will reach out via email or phone.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCandidateName('');
                    setCandidateEmail('');
                    setCandidatePhone('');
                    setCoverLetter('');
                    setResumeFile(null);
                  }}
                  className="px-6 py-2.5 rounded-lg text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  Submit Another Application
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
                value={hp}
                onChange={(e) => setHp(e.target.value)}
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
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g., Ananya Raman"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="ananya@gmail.com"
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
                    required
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Position Applied For <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none bg-white transition"
                  >
                    {JOB_OPENINGS.map((j) => (
                      <option key={j.id} value={j.title}>
                        {j.title} ({j.type})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Resume File Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Upload Resume / CV (.pdf, .doc, .docx - max 5MB) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#7047EB] transition-colors bg-gray-50/60">
                  <div className="space-y-2 text-center">
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-700">
                        <FileCheck className="w-5 h-5 text-emerald-600" />
                        <span>{resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)</span>
                      </div>
                    ) : (
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    )}
                    <div className="flex text-xs text-gray-600 justify-center">
                      <label className="relative cursor-pointer rounded-md font-bold text-[#7047EB] hover:text-[#5B34DB] focus-within:outline-none">
                        <span>{resumeFile ? 'Click to change file' : 'Select a document'}</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      {!resumeFile && <p className="pl-1 text-gray-500">from your device</p>}
                    </div>
                    <p className="text-[11px] text-gray-400">PDF, DOC, DOCX up to 5MB</p>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Cover Letter / Portfolio Links / Key Strengths
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell us about yourself, links to your GitHub or portfolio, and why you would like to join IVR Tech Solutions..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none transition"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-gray-400">
                  Data privacy protected. Your documents are solely used for recruitment evaluation.
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white gradient-accent shadow hover:opacity-95 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading Resume...</span>
                    </>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
