import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ArrowRight, Globe, FolderKanban, Briefcase, FileText } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { PROJECTS } from '../data/projectsData';
import { JOB_OPENINGS } from '../data/careersData';

export default function SearchModal({ isOpen, onClose, navigate }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();

    const items = [];

    // Search Services
    SERVICES.forEach((s) => {
      if (
        s.title.toLowerCase().includes(term) ||
        s.shortDesc.toLowerCase().includes(term) ||
        s.capabilities.some((c) => c.toLowerCase().includes(term))
      ) {
        items.push({
          type: 'Service',
          icon: Globe,
          title: s.title,
          subtitle: s.shortDesc,
          path: `/services#${s.id}`,
        });
      }
    });

    // Search Projects
    PROJECTS.forEach((p) => {
      if (
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.technologies.some((t) => t.toLowerCase().includes(term)) ||
        p.shortDesc.toLowerCase().includes(term)
      ) {
        items.push({
          type: 'Project',
          icon: FolderKanban,
          title: p.title,
          subtitle: `${p.category} • ${p.badge}`,
          path: `/work#${p.id}`,
        });
      }
    });

    // Search Careers
    JOB_OPENINGS.forEach((j) => {
      if (
        j.title.toLowerCase().includes(term) ||
        j.department.toLowerCase().includes(term) ||
        j.overview.toLowerCase().includes(term)
      ) {
        items.push({
          type: 'Career',
          icon: Briefcase,
          title: j.title,
          subtitle: `${j.department} • ${j.type} • ${j.location}`,
          path: `/careers#${j.id}`,
        });
      }
    });

    return items;
  }, [searchTerm]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-gray-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services, projects, jobs, or technologies..."
            className="w-full text-base outline-none text-gray-900 placeholder-gray-400 bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {!searchTerm.trim() ? (
            <div className="py-8 text-center text-xs text-gray-400">
              Type keywords to search across IVR Tech Solutions services, projects, and careers.
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500">
              No matching records found for "{searchTerm}".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((res, i) => {
                const Icon = res.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(res.path)}
                    className="w-full p-3 rounded-xl hover:bg-gray-50 flex items-center justify-between text-left group transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-[#7047EB] transition-colors mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 uppercase tracking-wider text-[10px]">
                            {res.type}
                          </span>
                          <span className="text-sm font-bold text-gray-900 group-hover:text-[#7047EB] transition-colors">
                            {res.title}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{res.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#7047EB] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span>IVR Tech Solutions Corporate Portal</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
