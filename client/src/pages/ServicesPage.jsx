import React, { useState, useEffect } from 'react';
import { SERVICES } from '../data/servicesData';
import {
  Globe,
  Smartphone,
  Code2,
  Cpu,
  Cloud,
  Layers,
  Compass,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Code2,
  Cpu,
  Cloud,
  Layers,
  Compass,
  TrendingUp,
};

export default function ServicesPage({ navigate, onOpenLetsTalk, onSelectService }) {
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);

  // Handle URL hash jumping
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && SERVICES.some((s) => s.id === hash)) {
      setActiveTab(hash);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleEnquire = (serviceTitle) => {
    if (onSelectService) onSelectService(serviceTitle);
    onOpenLetsTalk();
  };

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#7047EB] text-xs font-bold uppercase tracking-wider">
              <span>Corporate Offerings</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Enterprise <span className="gradient-text">Technology Services</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We design, build, deploy, and scale high-performance software systems that solve mission-critical operational challenges for ambitious businesses.
            </p>
          </div>

          {/* Quick-Filter Horizontal Bar */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {SERVICES.map((srv) => (
              <a
                key={srv.id}
                href={`#${srv.id}`}
                onClick={() => setActiveTab(srv.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTab === srv.id
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'bg-[#F5F6F8] text-gray-700 hover:bg-gray-200'
                }`}
              >
                {srv.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Detailed Service Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {SERVICES.map((srv, index) => {
          const Icon = iconMap[srv.icon] || Globe;
          const isEven = index % 2 === 0;

          return (
            <div
              key={srv.id}
              id={srv.id}
              className="scroll-mt-32 corporate-card p-8 sm:p-12 lg:p-16 relative overflow-hidden"
            >
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 gradient-accent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left/Main Description Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#7047EB] flex items-center justify-center flex-shrink-0 shadow-sm border border-purple-100">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Service 0{index + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {srv.fullDesc}
                  </p>

                  {/* Capabilities Checklist */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-l-2 border-[#7047EB] pl-2">
                      Core Capabilities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {srv.capabilities.map((cap, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#7047EB] flex-shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handleEnquire(srv.title)}
                      className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white gradient-accent shadow-sm hover:opacity-95 transition flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enquire About {srv.title}</span>
                    </button>

                    <button
                      onClick={() => navigate('/work')}
                      className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center gap-1.5"
                    >
                      <span>View Related Work</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right/Meta Column: Benefits & Tech Stack */}
                <div className="lg:col-span-5 space-y-6 bg-[#F5F6F8] p-6 sm:p-8 rounded-2xl border border-gray-200/80">
                  {/* Business Benefits */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-l-2 border-[#3478E5] pl-2">
                      Measurable Business Benefits
                    </h3>
                    <ul className="space-y-2.5">
                      {srv.businessBenefits.map((ben, bIdx) => (
                        <li key={bIdx} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3478E5] mt-1.5 flex-shrink-0" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Stack Badges */}
                  <div className="pt-4 border-t border-gray-200/80 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                      Production Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-gray-800 border border-gray-200 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Bottom Consultation Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Need a Custom Technology Solution?</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Our solution architects are available for direct technical scoping and requirements feasibility discussions.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenLetsTalk}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white gradient-accent shadow-md hover:opacity-95 transition"
            >
              Request Structured Proposal (Let's Talk)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
