import React from 'react';

export default function Logo({ variant = 'dark', size = 'md', showTagline = true, className = '' }) {
  const isLight = variant === 'light'; // Light text for dark footer/hero backgrounds

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Geometric IVR Icon Mark */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="ivrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7047EB" />
              <stop offset="100%" stopColor="#3478E5" />
            </linearGradient>
            <linearGradient id="ivrGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3478E5" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7047EB" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Outer Geometric Base */}
          <rect x="2" y="2" width="40" height="40" rx="9" fill={isLight ? '#1F2937' : '#111827'} stroke="url(#ivrGrad)" strokeWidth="2" />
          <rect x="4" y="4" width="36" height="36" rx="7" fill="url(#ivrGlow)" />

          {/* Forward-leaning geometric chevron accent */}
          <path d="M 28 8 L 34 14 L 31 17 L 27 13 Z" fill="url(#ivrGrad)" opacity="0.9" />

          {/* Clean Geometric Letters "IVR" */}
          <text
            x="22"
            y="27"
            textAnchor="middle"
            fontFamily="Inter, Manrope, sans-serif"
            fontWeight="800"
            fontSize="15"
            letterSpacing="-0.5px"
            fill="#FFFFFF"
          >
            IVR
          </text>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-tight">
        <div className={`font-extrabold tracking-tight font-display flex items-center gap-1.5 ${textSizes[size]}`}>
          <span className={isLight ? 'text-white' : 'text-[#111827]'}>IVR</span>
          <span className="font-semibold text-[#7047EB]">Tech</span>
          <span className={isLight ? 'text-gray-300 font-medium' : 'text-gray-700 font-medium'}>Solutions</span>
        </div>
        {showTagline && (
          <span className={`tracking-wide font-medium text-gray-500 uppercase ${taglineSizes[size]}`}>
            Innovation That Builds Tomorrow.
          </span>
        )}
      </div>
    </div>
  );
}
