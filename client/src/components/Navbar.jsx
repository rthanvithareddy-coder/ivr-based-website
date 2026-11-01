import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { SERVICES } from '../data/servicesData';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  MessageSquare,
  Globe,
  Smartphone,
  Code2,
  Cpu,
  Cloud,
  Layers,
  Compass,
  TrendingUp,
  ArrowRight
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

export default function Navbar({ currentPath, navigate, onOpenLetsTalk, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Our Work', path: '/work' },
    { name: 'Insights', path: '/insights' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const isActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on Left */}
          <button
            onClick={() => handleNavClick('/')}
            className="text-left focus:outline-none focus:ring-2 focus:ring-[#7047EB] rounded-lg p-0.5"
            aria-label="IVR Tech Solutions Home"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                        isActive(item.path)
                          ? 'text-[#7047EB] bg-purple-50/70'
                          : 'text-gray-700 hover:text-[#7047EB] hover:bg-gray-50'
                      }`}
                      aria-expanded={servicesDropdownOpen}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-[#7047EB]' : 'text-gray-400'
                        }`}
                      />
                    </button>

                    {/* Mega Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[720px] transition-all duration-200">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 grid grid-cols-2 gap-4">
                          <div className="col-span-2 pb-2 mb-1 border-b border-gray-100 flex items-center justify-between">
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">
                                Corporate Capabilities
                              </span>
                              <h4 className="text-sm font-bold text-gray-900">Enterprise Technology Services</h4>
                            </div>
                            <button
                              onClick={() => handleNavClick('/services')}
                              className="text-xs font-semibold text-[#3478E5] hover:text-[#7047EB] flex items-center gap-1"
                            >
                              View all services <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {SERVICES.map((srv) => {
                            const IconComponent = iconMap[srv.icon] || Globe;
                            return (
                              <button
                                key={srv.id}
                                onClick={() => handleNavClick(`/services#${srv.id}`)}
                                className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 text-left transition-all"
                              >
                                <div className="p-2 rounded-lg bg-purple-50 text-[#7047EB] group-hover:bg-[#7047EB] group-hover:text-white transition-colors flex-shrink-0">
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-900 group-hover:text-[#7047EB] transition-colors">
                                    {srv.title}
                                  </div>
                                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                    {srv.shortDesc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'text-[#7047EB] bg-purple-50/70 font-bold'
                      : 'text-gray-700 hover:text-[#7047EB] hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons on Right */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-500 hover:text-[#7047EB] hover:bg-gray-100 rounded-lg transition-colors"
              title="Search website"
              aria-label="Search website"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Let's Talk High-Priority CTA */}
            <button
              onClick={onOpenLetsTalk}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white gradient-accent hover:opacity-95 shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Let's Talk</span>
            </button>
          </div>

          {/* Mobile Menu & Search Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-600 hover:text-[#7047EB] rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#7047EB] rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left px-4 py-2.5 text-base font-semibold rounded-lg flex items-center justify-between ${
                  isActive(item.path)
                    ? 'text-[#7047EB] bg-purple-50 font-bold'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span>{item.name}</span>
                {item.hasDropdown && <span className="text-xs text-gray-400">8 Services</span>}
              </button>
            ))}

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLetsTalk();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold gradient-accent text-center shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Let's Talk</span>
              </button>
              <a
                href="tel:8143177907"
                className="text-center text-xs font-semibold text-gray-500 py-1"
              >
                Direct Line: +91 8143177907
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
