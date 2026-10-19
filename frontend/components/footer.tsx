'use client';

import React from 'react';
import Link from 'next/link';
import SellioLogo from './sellio-logo';
import { A } from './store-context';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#12161C',
        color: '#FFFFFF',
        padding: '72px 24px 36px',
        marginTop: 64,
        fontFamily: "'Manrope','Noto Sans Myanmar',system-ui,sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 40,
            marginBottom: 56,
          }}
        >
          {/* Brand info */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <SellioLogo variant="kinetic-s" size={36} />
            </div>
            <p style={{ color: '#9CA3AF', fontSize: 14, lineHeight: 1.6, maxWidth: 280, margin: '0 0 20px' }}>
              Everything your phone needs, in one place. Cases, chargers, power banks, and screen protectors with instant KBZPay & WavePay QR payment.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ background: '#1E242D', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: '#D4F56A' }}>
                🇲🇲 Myanmar Delivery
              </span>
              <span style={{ background: '#1E242D', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: '#93C5FD' }}>
                ⚡ 1–3 Days
              </span>
            </div>
          </div>

          {/* Quick Shop */}
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: '#F3F4F6', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Shop & Explore
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link href="/products" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s' }}>
                All Catalog
              </Link>
              <Link href="/categories" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s' }}>
                Categories & Collections
              </Link>
              <Link href="/search" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s' }}>
                Search Accessories
              </Link>
              <Link href="/cart" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s' }}>
                Shopping Cart
              </Link>
              <Link href="/wishlist" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s' }}>
                Saved Wishlist
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: '#F3F4F6', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Customer Care
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link href="/orders" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
                Track My Orders
              </Link>
              <Link href="/faq" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
                FAQ & Shipping Policies
              </Link>
              <Link href="/contact" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
                Contact & Support
              </Link>
              <Link href="/profile" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
                Account Settings
              </Link>
              <Link href="/dashboard" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
                Seller Dashboard
              </Link>
            </div>
          </div>

          {/* Payment & Security */}
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: '#F3F4F6', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Fast Payment
            </div>
            <p style={{ color: '#9CA3AF', fontSize: 13, lineHeight: 1.6, margin: '0 0 14px' }}>
              Scan to pay with any Myanmar mobile banking app. Instant verification, no transaction surcharge.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: '#1D4ED8', color: '#FFF', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 8 }}>
                KBZPay
              </span>
              <span style={{ background: '#F59E0B', color: '#12161C', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 8 }}>
                WavePay
              </span>
              <span style={{ background: '#374151', color: '#FFF', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 8 }}>
                Cash On Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: '1px solid #1F2937',
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            fontSize: 13,
            color: '#6B7280',
          }}
        >
          <div>© 2026 Sellio Mobile Accessories. All rights reserved. Yangon, Myanmar.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/faq" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/faq" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Terms of Service</Link>
            <Link href="/contact" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Viber Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
