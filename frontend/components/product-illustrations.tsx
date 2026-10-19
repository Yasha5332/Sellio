'use client';

import * as React from 'react';

// 1. Clear Phone Case (Exact SVG from Main.dc.html)
export function ClearCaseIllustration() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 160 140"
      role="img"
      aria-label="Clear phone case"
      className="block select-none"
    >
      <rect
        x="46"
        y="6"
        width="68"
        height="128"
        rx="18"
        fill="#FFFFFF"
        opacity="0.7"
        stroke="#12161C"
        strokeWidth="3"
      />
      <rect x="54" y="14" width="30" height="30" rx="9" fill="#12161C" />
      <circle cx="63" cy="23" r="5" fill="#8A94A3" />
      <circle cx="75" cy="23" r="5" fill="#8A94A3" />
      <circle cx="69" cy="35" r="5" fill="#8A94A3" />
    </svg>
  );
}

// 2. Fast Charger + Cable (Exact SVG from Main.dc.html)
export function ChargerCableIllustration() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 160 140"
      role="img"
      aria-label="Fast charger with cable"
      className="block select-none"
    >
      <rect x="30" y="40" width="50" height="58" rx="10" fill="#12161C" />
      <rect x="42" y="26" width="6" height="16" rx="2" fill="#12161C" />
      <rect x="62" y="26" width="6" height="16" rx="2" fill="#12161C" />
      <polygon
        points="58,52 46,70 54,70 50,88 66,64 57,64"
        fill="#D4F56A"
      />
      <path
        d="M80 82 C 112 82, 100 122, 132 112"
        fill="none"
        stroke="#12161C"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="128" y="104" width="22" height="14" rx="4" fill="#12161C" />
    </svg>
  );
}

// 3. Wireless Earbuds (Exact SVG from Main.dc.html)
export function EarbudsIllustration() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 160 140"
      role="img"
      aria-label="Wireless earbuds in a charging case"
      className="block select-none"
    >
      <rect
        x="30"
        y="64"
        width="100"
        height="58"
        rx="28"
        fill="#FFFFFF"
        stroke="#12161C"
        strokeWidth="3"
      />
      <line x1="30" y1="86" x2="130" y2="86" stroke="#12161C" strokeWidth="3" />
      <circle cx="62" cy="40" r="13" fill="#12161C" />
      <rect x="58" y="40" width="8" height="28" rx="4" fill="#12161C" />
      <circle cx="98" cy="40" r="13" fill="#12161C" />
      <rect x="94" y="40" width="8" height="28" rx="4" fill="#12161C" />
      <circle cx="80" cy="104" r="5" fill="#D4F56A" stroke="#12161C" strokeWidth="2" />
    </svg>
  );
}

// 4. Power Bank (Exact SVG from Main.dc.html)
export function PowerBankIllustration() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 160 140"
      role="img"
      aria-label="Power bank"
      className="block select-none"
    >
      <rect x="44" y="12" width="72" height="116" rx="16" fill="#12161C" />
      <circle cx="62" cy="28" r="3.5" fill="#D4F56A" />
      <circle cx="80" cy="28" r="3.5" fill="#D4F56A" />
      <circle cx="98" cy="28" r="3.5" fill="#D4F56A" />
      <polygon
        points="86,48 66,82 80,82 74,108 96,70 82,70"
        fill="#D4F56A"
      />
    </svg>
  );
}
