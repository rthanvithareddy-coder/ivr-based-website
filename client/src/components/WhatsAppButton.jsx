import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function WhatsAppButton() {
  return (
    <aside
      aria-label="Direct messaging contact"
      className="fixed bottom-6 right-6 z-30 flex items-center group"
    >
      {/* Tooltip on hover */}
      <div className="hidden sm:block mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with our solution team on WhatsApp
      </div>

      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with IVR Tech Solutions on WhatsApp"
        className="w-13 h-13 p-3.5 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </aside>
  );
}
