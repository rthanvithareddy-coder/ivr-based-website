import React from 'react';
import { COMPANY_INFO, CORE_VALUES, DEVELOPMENT_PROCESS, TECH_CAPABILITIES, TESTIMONIALS } from '../data/companyData';
import { SERVICES } from '../data/servicesData';
import { PROJECTS } from '../data/projectsData';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles,
  Award,
  Users,
  Building2,
  ChevronRight,
  Globe,
  Smartphone,
  Code2,
  Cpu,
  Cloud,
  Compass,
  TrendingUp,
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

export default function HomePage({ navigate, onOpenLetsTalk }) {
  const featuredServices = SERVICES.slice(0, 6);
  const featuredProjects = PROJECTS.slice(0, 4);

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[#7047EB] text-xs font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-[#7047EB] animate-pulse" />
                <span>Enterprise Technology & Digital Services</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
                Building Digital Solutions That <span className="gradient-text">Move Businesses Forward.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl">
                {COMPANY_INFO.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => navigate('/services')}
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-gray-800 bg-[#F5F6F8] hover:bg-gray-200/80 border border-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </button>

                <button
                  onClick={onOpenLetsTalk}
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-white gradient-accent shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Let's Talk</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-gray-100">
                <div>
                  <div className="text-2xl font-black text-gray-900">100%</div>
                  <div className="text-xs text-gray-500 font-medium">Verified Code Delivery</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#7047EB]">24/7</div>
                  <div className="text-xs text-gray-500 font-medium">Enterprise Cloud Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#3478E5]">Chennai</div>
                  <div className="text-xs text-gray-500 font-medium">Tamil Nadu Tech Hub</div>
                </div>
              </div>
            </div>

            {/* Right Media Column: Elegant Corporate Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="Software engineers and corporate tech team collaborating"
                  className="w-full h-[420px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />

                {/* Floating Corporate Identity Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#7047EB] uppercase tracking-wider">
                        {COMPANY_INFO.legalName}
                      </p>
                      <h4 className="text-sm font-bold text-gray-900">
                        {COMPANY_INFO.tagline}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#7047EB] flex-shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Geometric Outline Accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-purple-200/50 rounded-2xl -z-10 hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-gray-200 shadow-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
                Corporate Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Smart digital transformation for ambitious companies and growing teams.
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Founded and registered in Chennai, Tamil Nadu, <strong>IVR Tech Solutions Private Limited</strong> is a full-spectrum digital engineering and software services firm dedicated to translating business complexity into reliable, high-yield digital software.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/about')}
                  className="text-sm font-bold text-[#7047EB] hover:text-[#3478E5] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Learn about our corporate philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mission Panel */}
              <div className="p-6 rounded-2xl bg-[#F5F6F8] border border-gray-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7047EB] flex items-center justify-center font-black">
                  M
                </div>
                <h3 className="text-lg font-bold text-gray-900">Our Mission</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  To deliver high-quality, affordable, and innovative web, mobile, and software solutions that help businesses grow, scale, and thrive in the modern digital era.
                </p>
              </div>

              {/* Vision Panel */}
              <div className="p-6 rounded-2xl bg-[#F5F6F8] border border-gray-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#3478E5] flex items-center justify-center font-black">
                  V
                </div>
                <h3 className="text-lg font-bold text-gray-900">Our Vision</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  To become India's most trusted and innovative technology solutions company, empowering enterprises and institutions through smart digital transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              What We Deliver
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
              Enterprise Technology Services
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-xl">
              End-to-end software engineering capabilities tailored to propel business operations and user experiences forward.
            </p>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#7047EB] hover:text-[#3478E5]"
          >
            <span>View All 8 Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <div
                key={service.id}
                className="corporate-card p-7 flex flex-col justify-between group hover:border-[#7047EB]/40"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#7047EB] group-hover:bg-[#7047EB] group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7047EB] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    {service.capabilities.slice(0, 3).map((cap, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3478E5] flex-shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/services#${service.id}`)}
                    className="text-xs font-bold text-gray-700 group-hover:text-[#7047EB] inline-flex items-center gap-1"
                  >
                    <span>View Capabilities</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenLetsTalk}
                    className="text-[11px] font-bold text-[#7047EB] bg-purple-50 hover:bg-[#7047EB] hover:text-white px-2.5 py-1 rounded-md transition"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHY CHOOSE IVR TECH SOLUTIONS */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              Accenture-Style Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Why Forward-Thinking Businesses Choose IVR
            </h2>
            <p className="text-sm text-gray-600">
              We combine enterprise engineering discipline with the agility, speed, and personal attention of a dedicated technology partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Architectural Rigor',
                desc: 'We do not compromise on system foundations. Codebases are built modular, strictly typed, and structured for frictionless multi-year maintenance.',
                icon: Layers,
              },
              {
                title: 'Rapid & Predictable Delivery',
                desc: 'Structured 2-week agile sprint cycles with transparent milestone demos ensure predictable releases without surprise scope creep.',
                icon: TrendingUp,
              },
              {
                title: 'Security-First Culture',
                desc: 'Built-in defenses from day one: parameterized SQL queries, SSL/TLS encryption, sanitized file handling, and robust authentication.',
                icon: Shield,
              },
              {
                title: 'Total Code & IP Ownership',
                desc: 'You retain 100% intellectual property, full source repository access, and database ownership. No vendor lock-in or proprietary traps.',
                icon: Award,
              },
            ].map((pillar, i) => {
              const PillarIcon = pillar.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-[#F5F6F8] border border-gray-200/80 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-[#7047EB] flex items-center justify-center shadow-sm">
                    <PillarIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUR WORK / FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
              Featured Systems & Case Studies
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-xl">
              Real-world digital software deployed for operational clarity, customer self-service, and business growth.
            </p>
          </div>
          <button
            onClick={() => navigate('/work')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#7047EB] hover:text-[#3478E5]"
          >
            <span>Explore All Projects & Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="corporate-card overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide shadow-sm ${
                    project.isVerified
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {project.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-2 py-0.5 rounded bg-black/60 text-white text-[11px] font-medium backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#7047EB] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    {project.shortDesc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-700 rounded border border-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{project.clientType}</span>
                  <button
                    onClick={() => navigate(`/work#${project.id}`)}
                    className="text-xs font-bold text-[#7047EB] group-hover:text-[#3478E5] inline-flex items-center gap-1"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. OUR DEVELOPMENT PROCESS */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
              Structured Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Our 4-Stage Engineering Process
            </h2>
            <p className="text-sm text-gray-600">
              From first architectural assessment to post-launch cloud reliability, we govern projects with predictability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {DEVELOPMENT_PROCESS.map((proc, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl bg-[#F5F6F8] border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-purple-600/60 font-display">
                    {proc.step}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{proc.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{proc.description}</p>
                <div className="pt-2 border-t border-gray-200/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Key Deliverables</span>
                  {proc.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="text-xs text-gray-700 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7047EB]" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TECHNOLOGY CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
            Full-Stack Modern Stacks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Technology Stack & Cloud Ecosystems
          </h2>
          <p className="text-sm text-gray-600">
            We select production-proven frameworks and scalable cloud primitives tailored to each project's performance criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_CAPABILITIES.map((cat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-l-2 border-[#7047EB] pl-2.5">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.items.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-md text-xs font-semibold bg-[#F5F6F8] text-gray-800 border border-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CLIENT ENDORSEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Verified Client Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Endorsements & Delivery Trust
            </h2>
            <p className="text-sm text-gray-400">
              Feedback from operations managers, commercial directors, and founders who trust IVR Tech Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-800/60 border border-gray-700 space-y-4 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                  "{test.quote}"
                </p>
                <div className="pt-4 border-t border-gray-700 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{test.client}</h4>
                    <span className="text-xs text-gray-400">{test.role}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LET'S TALK CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl p-10 sm:p-14 text-center gradient-accent text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-200">
              Ready to Accelerate Your Digital Transformation?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Let's Build Something Exceptional Together.
            </h2>
            <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto leading-relaxed">
              Connect directly with our engineering architects to discuss technical feasibility, timelines, and tailored proposals for your organization.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenLetsTalk}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-gray-900 shadow-lg hover:bg-gray-100 transition-transform transform hover:-translate-y-0.5"
              >
                Initiate Project Enquiry
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-purple-900/40 hover:bg-purple-900/60 text-white border border-white/20 transition"
              >
                Direct Contact Information
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
