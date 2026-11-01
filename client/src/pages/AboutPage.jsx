import React from 'react';
import { COMPANY_INFO, CORE_VALUES } from '../data/companyData';
import { ShieldCheck, Target, Compass, Sparkles, Building2, Users2, Code2, ArrowRight } from 'lucide-react';

export default function AboutPage({ navigate, onOpenLetsTalk }) {
  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#7047EB] text-xs font-bold uppercase tracking-wider">
              <span>Corporate Overview</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              About <span className="gradient-text">{COMPANY_INFO.legalName}</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We are an enterprise technology and software engineering company committed to building reliable, resilient digital solutions that power the modern economy.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Company Overview & Origin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              Who We Are
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
              An engineering-first corporate software house built on integrity, competence, and measurable results.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                <strong>IVR Tech Solutions Private Limited</strong> is a registered corporate entity headquartered in Chennai, Tamil Nadu. We specialize in software development, web applications, mobile engineering, cloud systems, and smart digital transformation.
              </p>
              <p>
                Our foundation is rooted in a pragmatic engineering ethos: rather than chasing superficial buzzwords, we architect and deliver practical, high-performance technology systems that solve tangible operational challenges for enterprises, institutions, and growing businesses.
              </p>
              <p>
                With clients spanning healthcare, retail, personal services, and enterprise logistics, our mission is to empower organizations with dependable digital tools that simplify operations, elevate customer satisfaction, and generate sustainable commercial return on investment.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-200">
              <div className="p-4 rounded-xl bg-white border border-gray-200">
                <span className="text-xs text-gray-500 font-semibold block">Official Entity</span>
                <span className="text-sm font-bold text-gray-900">Private Limited</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200">
                <span className="text-xs text-gray-500 font-semibold block">Headquarters</span>
                <span className="text-sm font-bold text-gray-900">Chennai, Tamil Nadu</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200 col-span-2 sm:col-span-1">
                <span className="text-xs text-gray-500 font-semibold block">Core Focus</span>
                <span className="text-sm font-bold text-gray-900">Software & Digital</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Corporate modern architecture building"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Tagline
                </span>
                <h3 className="text-lg font-bold">"{COMPANY_INFO.tagline}"</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F5F6F8] border border-gray-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#7047EB] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                To deliver high-quality, affordable, and innovative web, mobile app, and software solutions that help businesses grow, scale, and succeed in the digital world. We engineer digital assets that convert complexity into clear competitive advantage.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-[#F5F6F8] border border-gray-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#3478E5] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                To become India's most trusted and innovative tech solutions company, empowering businesses through smart digital transformation, unmatched reliability, and enduring engineering standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
            Guiding Principles
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Our Core Values
          </h2>
          <p className="text-sm text-gray-600">
            These foundational values govern our engineering decisions, client partnerships, and delivery culture every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CORE_VALUES.map((val, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-4"
                  style={{ backgroundColor: val.accent }}
                >
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Corporate Leadership & Governance */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              Leadership & Corporate Governance
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Steered by Seasoned Engineering & Advisory Leadership
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              IVR Tech Solutions Private Limited operates under a collaborative executive framework that bridges architectural excellence, rigorous financial stewardship, and customer-centric delivery management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F5F6F8] border border-gray-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7047EB] flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Engineering Leadership Council</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Oversees software architecture, code reviews, technology stack standardization, and cloud security protocols across all client initiatives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F6F8] border border-gray-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#3478E5] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Quality & Compliance Board</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Maintains strict verification procedures, data privacy safeguards, SLA adherence, and post-deployment client satisfaction monitoring.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F6F8] border border-gray-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7047EB] flex items-center justify-center">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Client Advisory & Strategy</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Partners closely with client executives to translate commercial roadmaps into prioritized technical delivery phases with clear ROI milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Approach & Commitment to Innovation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              Our Engineering Approach
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
              A disciplined, transparent delivery methodology designed to eliminate ambiguity.
            </h2>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-[#7047EB] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Pragmatic Over Speculative</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    We select battle-tested, maintainable technologies that minimize operational cost and guarantee long-term stability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#3478E5] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Continuous Stakeholder Alignment</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Bi-weekly sprint demos keep clients fully informed with live progress rather than abstract status slide decks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-[#7047EB] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Commitment to Sustainable Innovation</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    We invest actively in training our engineers on emerging cloud architectures, API security, and high-uptime telephony pipelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenLetsTalk}
                className="px-6 py-3 rounded-xl font-bold text-sm text-white gradient-accent shadow-md hover:opacity-95 transition inline-flex items-center gap-2"
              >
                <span>Discuss Your Project With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#111827] text-white space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Corporate Standards
            </span>
            <h3 className="text-2xl font-bold">
              Engineering Pillars We Stand By
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-gray-300">
              <div className="p-4 rounded-xl bg-gray-800/60 border border-gray-700">
                <h4 className="font-bold text-white mb-1">Zero Security Compromises</h4>
                <p>All client code undergoes vulnerability assessments and adherence to OWASP security principles.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/60 border border-gray-700">
                <h4 className="font-bold text-white mb-1">Strict Confidentiality & NDA</h4>
                <p>Client intellectual property, customer datasets, and business logic remain strictly confidential.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/60 border border-gray-700">
                <h4 className="font-bold text-white mb-1">Transparent Pricing & Timelines</h4>
                <p>Detailed milestone breakdowns with fixed-price or dedicated team scopes without hidden add-ons.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
