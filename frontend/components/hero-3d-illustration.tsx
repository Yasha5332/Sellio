'use client';

import React from 'react';
import Image from 'next/image';

interface Hero3DIllustrationProps {
  accentColor?: string;
  className?: string;
}

export function Hero3DIllustration({
  accentColor = '#4B3BFF',
  className = '',
}: Hero3DIllustrationProps) {
  return (
    <div className={`relative w-full max-w-[500px] lg:max-w-[520px] mx-auto select-none ${className}`}>
      {/* ── Soft Ambient Backlight Glow ── */}
      <div
        className="absolute inset-8 rounded-full pointer-events-none animate-glow-entrance"
        style={{
          background: `radial-gradient(circle at 50% 45%, rgba(212,245,106,0.5) 0%, rgba(75,59,255,0.22) 50%, transparent 72%)`,
          filter: 'blur(48px)',
          transform: 'translateZ(0)',
        }}
      />

      {/* ── Soft Floor Shadow ── */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 pointer-events-none rounded-full animate-shadow-entrance"
        style={{
          width: '74%',
          height: '22px',
          background: 'radial-gradient(ellipse at center, rgba(18, 22, 28, 0.22) 0%, rgba(18, 22, 28, 0) 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* ── Crisp, High-Resolution 3D Illustration Container ── */}
      <div className="relative w-full aspect-square flex items-center justify-center animate-hero-entrance">
        <Image
          src="/hero-3d-ultra.png"
          alt="Sellio 3D Mobile Accessories - Smart Phone Case, 30W Fast Charger, Braided Cable and Wireless Earbuds"
          width={2048}
          height={2048}
          priority
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 520px"
          className="w-full h-full object-contain filter drop-shadow-[0_24px_38px_rgba(40,30,120,0.14)]"
          style={{
            imageRendering: 'auto',
          }}
        />
      </div>
    </div>
  );
}

export default Hero3DIllustration;
