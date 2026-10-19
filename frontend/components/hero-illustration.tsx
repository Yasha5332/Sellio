import * as React from 'react';
export { Hero3DIllustration } from './hero-3d-illustration';

interface HeroIllustrationProps {
  accentColor?: string;
}

export function HeroIllustration({ accentColor = '#4B3BFF' }: HeroIllustrationProps) {
  return (
    <div className="w-full max-w-[520px] mx-auto select-none">
      <svg
        viewBox="0 0 520 520"
        width="100%"
        role="img"
        aria-label="Illustration of a phone in a gradient case with earbuds, a charger and a cable around it"
        className="block drop-shadow-md"
      >
        <defs>
          <radialGradient id="orb" cx="50%" cy="38%" r="62%">
            <stop offset="0" stopColor="#F2FFB8" />
            <stop offset="0.6" stopColor="#D4F56A" />
            <stop offset="1" stopColor="#9EE08A" />
          </radialGradient>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.5" stopColor="#12161C" stopOpacity="0" />
            <stop offset="1" stopColor="#12161C" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#12161C" stopOpacity="0.28" />
            <stop offset="1" stopColor="#12161C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="260" cy="272" r="214" fill="url(#orb)" />
        <circle cx="260" cy="272" r="214" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2" />
        <ellipse cx="270" cy="478" rx="150" ry="18" fill="url(#shadow)" />
        <rect x="172" y="66" width="196" height="392" rx="40" fill={accentColor} />
        <rect x="172" y="66" width="196" height="392" rx="40" fill="url(#shade)" />
        <rect x="172" y="66" width="196" height="392" rx="40" fill="url(#sheen)" />
        <rect x="188" y="86" width="86" height="86" rx="24" fill="#12161C" />
        <circle cx="214" cy="112" r="14" fill="#2B3340" stroke="#8A94A3" strokeWidth="3" />
        <circle cx="248" cy="112" r="14" fill="#2B3340" stroke="#8A94A3" strokeWidth="3" />
        <circle cx="231" cy="146" r="14" fill="#2B3340" stroke="#8A94A3" strokeWidth="3" />
        <rect x="366" y="170" width="7" height="56" rx="3.5" fill="#12161C" />
        <rect x="236" y="330" width="96" height="14" rx="7" fill="#FFFFFF" opacity="0.9" />
        <rect x="236" y="354" width="56" height="14" rx="7" fill="#FFFFFF" opacity="0.55" />
        <g transform="rotate(-12 130 390)">
          <rect x="64" y="338" width="132" height="104" rx="42" fill="#FFFFFF" stroke="#12161C" strokeWidth="5" />
          <line x1="64" y1="382" x2="196" y2="382" stroke="#12161C" strokeWidth="5" />
          <circle cx="130" cy="412" r="9" fill={accentColor} />
        </g>
        <g transform="rotate(10 410 130)">
          <rect x="380" y="98" width="68" height="82" rx="16" fill="#12161C" />
          <rect x="395" y="76" width="9" height="26" rx="3" fill="#12161C" />
          <rect x="424" y="76" width="9" height="26" rx="3" fill="#12161C" />
          <polygon points="418,118 400,146 413,146 407,166 428,134 415,134" fill="#D4F56A" />
        </g>
        <path d="M424 178 C 440 250, 490 250, 460 330 S 360 430, 330 470" fill="none" stroke="#12161C" strokeWidth="8" strokeLinecap="round" />
        <rect x="318" y="462" width="30" height="16" rx="4" fill="#12161C" transform="rotate(-35 333 470)" />
        <circle cx="86" cy="150" r="7" fill="#12161C" />
        <circle cx="470" cy="420" r="9" fill={accentColor} />
      </svg>
    </div>
  );
}
