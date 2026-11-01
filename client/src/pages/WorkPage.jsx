import React, { useState, useEffect } from 'react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projectsData';
import { ArrowRight, CheckCircle2, X, ExternalLink, ShieldCheck, Sparkles, FolderKanban } from 'lucide-react';

export default function WorkPage({ navigate, onOpenLetsTalk }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Check URL hash for direct project opening
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = PROJECTS.find((p) => p.id === hash);
      if (match) setActiveModalProject(match);
    }
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#7047EB] text-xs font-bold uppercase tracking-wider">
              <span>Client Deployments & Case Studies</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Our <span className="gradient-text">Work & Impact</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Explore our track record of production web platforms, enterprise systems, mobile applications, and clinical workflows. Each project reflects our dedication to architectural precision.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'bg-[#F5F6F8] text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="corporate-card overflow-hidden group flex flex-col justify-between hover:border-[#7047EB]/40"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide shadow-sm ${
                      project.isVerified
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {project.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7047EB] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {project.shortDesc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-700 rounded border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-gray-400 font-semibold">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-medium truncate max-w-[150px]">
                    {project.clientType}
                  </span>
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-bold text-[#7047EB] hover:text-[#3478E5] inline-flex items-center gap-1"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 relative">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    activeModalProject.isVerified
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {activeModalProject.badge}
                </span>
                <span className="text-xs text-gray-500">• {activeModalProject.category}</span>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="rounded-2xl overflow-hidden h-64 bg-gray-100">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  {activeModalProject.title}
                </h2>
                <p className="text-xs text-gray-500 font-semibold mt-1">
                  Client Sector: {activeModalProject.clientType}
                </p>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                    The Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {activeModalProject.challenge}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
                    Our Engineering Solution
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Outcomes */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Measurable Outcomes & Deliverables
                </h4>
                <div className="space-y-2">
                  {activeModalProject.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">IVR Tech Solutions Private Limited</span>
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    onOpenLetsTalk();
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white gradient-accent shadow hover:opacity-95 transition"
                >
                  Discuss a Similar System
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Let's Talk CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Have a Project in Mind?</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            From pilot MVPs to enterprise-grade web platforms and telemetry pipelines, our engineering leads are prepared to build your solution.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenLetsTalk}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white gradient-accent shadow-md hover:opacity-95 transition"
            >
              Start Project Conversation (Let's Talk)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
