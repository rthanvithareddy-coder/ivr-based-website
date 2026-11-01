import React from 'react';
import Logo from './Logo';
import { COMPANY_INFO } from '../data/companyData';
import { SERVICES } from '../data/servicesData';
import { Mail, Phone, MapPin, Globe, ShieldCheck, ArrowUpRight, Lock } from 'lucide-react';

export default function Footer({ navigate }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111827] text-gray-300 relative overflow-hidden">
      {/* Top Gradient Accent Bar */}
      <div className="h-1.5 w-full gradient-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          {/* Column 1 & 2: Brand & Entity Information */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleLinkClick('/')}
              className="text-left focus:outline-none"
              aria-label="IVR Tech Solutions Home"
            >
              <Logo variant="light" size="lg" />
            </button>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              IVR Tech Solutions Private Limited is a premier corporate technology services provider delivering resilient web architectures, enterprise mobile applications, cloud telephony, and digital transformation.
            </p>

            <div className="pt-2 space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#7047EB] flex-shrink-0" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#3478E5] flex-shrink-0" />
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <a href={`mailto:${COMPANY_INFO.emails.official}`} className="hover:text-white transition-colors">
                    {COMPANY_INFO.emails.official}
                  </a>
                  <span className="hidden sm:inline text-gray-600">|</span>
                  <a href={`mailto:${COMPANY_INFO.emails.secondary}`} className="hover:text-white transition-colors">
                    {COMPANY_INFO.emails.secondary}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7047EB] flex-shrink-0" />
                <span>
                  <a href={`tel:${COMPANY_INFO.phones[0].raw}`} className="hover:text-white transition-colors">
                    +91 {COMPANY_INFO.phones[0].raw}
                  </a>
                  {' , '}
                  <a href={`tel:${COMPANY_INFO.phones[1].raw}`} className="hover:text-white transition-colors">
                    +91 {COMPANY_INFO.phones[1].raw}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#3478E5] flex-shrink-0" />
                <a
                  href={COMPANY_INFO.existingWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>ivrtechsolution.in</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#7047EB] pl-2.5">
              Corporate Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Our Work', path: '/work' },
                { name: 'Insights', path: '/insights' },
                { name: 'Careers', path: '/careers' },
                { name: 'Contact Us', path: '/contact' },
                { name: "Let's Talk (RFP)", path: '/lets-talk' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Core Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#3478E5] pl-2.5">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleLinkClick(`/services#${s.id}`)}
                    className="hover:text-white transition-colors text-left text-gray-400 hover:underline"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Compliance & Security Assurance */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#7047EB] pl-2.5">
              Trust & Security
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Our engineering adheres to enterprise data security standards, encrypted communications, and high-availability cloud deployments.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SSL/TLS 256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Encrypted Resume Storage</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ACID Compliant Database</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleLinkClick('/admin')}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#3478E5] transition-colors py-1 px-2.5 rounded bg-gray-800/80 border border-gray-700/60"
              >
                <Lock className="w-3 h-3" />
                <span>Authorized Admin Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © {currentYear} IVR Tech Solutions Private Limited. All rights reserved. <span className="text-gray-400 font-medium">Innovation That Builds Tomorrow.</span>
          </p>
          <div className="flex items-center space-x-6">
            <button onClick={() => handleLinkClick('/privacy')} className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => handleLinkClick('/terms')} className="hover:text-gray-300 transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => handleLinkClick('/contact')} className="hover:text-gray-300 transition-colors">
              Security Disclosures
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
