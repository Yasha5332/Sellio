'use client';

import React from 'react';
import Link from 'next/link';
import SellioLogo from '../components/sellio-logo';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(60% 55% at 12% 8%, rgba(75, 59, 255, 0.14) 0%, transparent 70%), radial-gradient(50% 50% at 92% 18%, rgba(212, 245, 106, 0.45) 0%, transparent 70%), #F6F6FB',
        fontFamily: "'Manrope', 'Noto Sans Myanmar', system-ui, sans-serif",
        color: '#12161C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <SellioLogo variant="kinetic-s" size={44} />
      </div>

      <div
        style={{
          maxWidth: 540,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(18, 22, 28, 0.08)',
          borderRadius: 32,
          padding: '48px 36px',
          boxShadow: '0 20px 60px rgba(40, 30, 120, 0.08)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            background: 'rgba(75, 59, 255, 0.08)',
            color: '#4B3BFF',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 16,
          }}
        >
          <span>Error 404</span>
        </div>

        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            margin: '0 0 14px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            color: '#555E6B',
            fontSize: 16,
            lineHeight: 1.6,
            margin: '0 0 32px',
          }}
        >
          Sorry, we couldn&apos;t find the phone accessory or page you are looking for. It may have moved or been updated.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 50,
              padding: '0 28px',
              borderRadius: 999,
              background: 'linear-gradient(135deg, #4B3BFF 0%, #12161C 160%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(75, 59, 255, 0.3)',
            }}
          >
            <span>← Back to Store</span>
          </Link>

          <Link
            href="/#categories"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 50,
              padding: '0 24px',
              borderRadius: 999,
              background: '#FFFFFF',
              border: '1.5px solid rgba(18, 22, 28, 0.14)',
              color: '#12161C',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            <span>Browse Categories</span>
          </Link>
        </div>

        <div
          style={{
            marginTop: 36,
            paddingTop: 24,
            borderTop: '1px solid rgba(18, 22, 28, 0.08)',
            fontSize: 13.5,
            color: '#7E8794',
          }}
        >
          Need help right away? <Link href="/#contact" style={{ color: '#4B3BFF', fontWeight: 700, textDecoration: 'none' }}>Contact support</Link>
        </div>
      </div>
    </div>
  );
}
