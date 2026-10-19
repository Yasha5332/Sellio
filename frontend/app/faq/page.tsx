'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { A } from '../../components/store-context';

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'payment' | 'shipping' | 'returns' | 'privacy'>('all');
  const [search, setSearch] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'q1': true,
    'q2': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const FAQS = [
    {
      id: 'q1',
      cat: 'payment',
      catName: 'Payment & QR',
      q: 'How do I pay with KBZPay or WavePay QR code?',
      a: 'During checkout, choose either KBZPay QR or WavePay QR. An official merchant QR code is generated. Open your KBZPay or WavePay application, scan the code, enter the exact amount, and take a screenshot or note the last 4 digits of the transaction reference. Our system automatically confirms verified payments within 15 minutes.',
    },
    {
      id: 'q2',
      cat: 'shipping',
      catName: 'Shipping & Delivery',
      q: 'What is the delivery time and cost across Myanmar?',
      a: 'We deliver within 1–2 business days in Yangon, and 2–3 business days in Mandalay, Naypyitaw, Taunggyi, Mawlamyine, and major regional hubs. Standard shipping is 2,500 Ks. Orders over 50,000 Ks receive free express delivery.',
    },
    {
      id: 'q3',
      cat: 'returns',
      catName: 'Returns & Replacements',
      q: 'What is the 7-day return and exchange policy?',
      a: 'If any accessory arrives damaged, defective, or incompatible with your phone model, you can request an instant replacement or full refund within 7 days of delivery. Simply message our Viber support with your Order ID and photos of the issue.',
    },
    {
      id: 'q4',
      cat: 'payment',
      catName: 'Payment & QR',
      q: 'Do you accept Cash on Delivery (COD)?',
      a: 'Yes, Cash on Delivery is available for all addresses in Yangon and selected central delivery zones in Mandalay. For other regional townships, QR payment via KBZPay or WavePay is required prior to courier dispatch.',
    },
    {
      id: 'q5',
      cat: 'shipping',
      catName: 'Shipping & Delivery',
      q: 'How can I track my parcel after ordering?',
      a: 'Once your order is processed, a tracking number and courier link are issued. You can track real-time parcel movements anytime under the "My Orders" tab on Sellio.',
    },
    {
      id: 'q6',
      cat: 'returns',
      catName: 'Returns & Replacements',
      q: 'Are your chargers and cases genuine brand products?',
      a: 'All accessories listed on Sellio are 100% genuine and sourced directly from certified manufacturers. Our GaN fast chargers feature internal temperature regulation and multi-protocol safeguards (PD 3.0 / PPS / QC 4.0).',
    },
    {
      id: 'q7',
      cat: 'privacy',
      catName: 'Privacy & Security',
      q: 'How is my personal shipping data protected?',
      a: 'We treat your privacy with highest confidentiality. Your name, phone number, and physical delivery address are strictly utilized for delivery dispatch and order confirmation. We never share, sell, or disclose customer data to third-party marketing companies.',
    },
    {
      id: 'q8',
      cat: 'privacy',
      catName: 'Privacy & Security',
      q: 'Terms of Service and Order Cancellations',
      a: 'Orders can be cancelled free of charge before courier pickup (usually within 2 hours of placement). Once dispatched with the courier, orders cannot be cancelled mid-transit but may be exchanged upon receipt.',
    },
  ];

  const filteredFaqs = FAQS.filter(item => {
    const matchesCat = activeTab === 'all' || item.cat === activeTab;
    const matchesSearch =
      !search.trim() ||
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F6F6FB',
        fontFamily: "'Manrope','Noto Sans Myanmar',system-ui,sans-serif",
        color: '#12161C',
      }}
    >
      <Navbar />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 20 }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>FAQ & Policies</span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 36px' }}>
          <span
            style={{
              display: 'inline-block',
              background: '#F1F1F8',
              color: A,
              fontSize: 12.5,
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 999,
              marginBottom: 12,
            }}
          >
            ❓ HELP & POLICIES
          </span>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(28px, 4vw, 38px)',
              fontWeight: 800,
              margin: '0 0 10px',
            }}
          >
            Frequently Asked Questions
          </h1>
          <p style={{ color: '#6A7280', fontSize: 15, margin: '0 0 24px' }}>
            Everything you need to know about Myanmar shipping, QR payment, warranty, and return policies.
          </p>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search help questions (e.g. KBZPay, delivery time, returns)..."
              style={{
                width: '100%',
                padding: '14px 16px 14px 44px',
                borderRadius: 999,
                border: '1.5px solid #E5E7EB',
                background: '#FFF',
                fontSize: 14.5,
                outline: 'none',
                boxSizing: 'border-box',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'payment', label: '💳 Payment & QR' },
            { id: 'shipping', label: '🚚 Shipping & Rates' },
            { id: 'returns', label: '🔄 7-Day Returns' },
            { id: 'privacy', label: '🔒 Privacy & Terms' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                border: activeTab === tab.id ? '1.5px solid #12161C' : '1px solid #E5E7EB',
                background: activeTab === tab.id ? '#12161C' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#374151',
                fontSize: 13.5,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredFaqs.map(faq => {
            const isOpen = openItems[faq.id] ?? false;
            return (
              <div
                key={faq.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1px solid rgba(18,22,28,0.08)',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      style={{
                        background: '#F1F1F8',
                        color: A,
                        fontSize: 11,
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 6,
                        textTransform: 'uppercase',
                      }}
                    >
                      {faq.catName}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#12161C' }}>
                      {faq.q}
                    </span>
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#6A7280', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px',
                      color: '#4B5563',
                      fontSize: 15,
                      lineHeight: 1.6,
                      borderTop: '1px solid #F6F6FB',
                      paddingTop: 14,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Banner */}
        <div
          style={{
            marginTop: 48,
            background: 'linear-gradient(135deg, #12161C 0%, #2B2560 100%)',
            color: '#FFFFFF',
            borderRadius: 24,
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>
            Still have questions about your phone accessories?
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: 14, maxWidth: 480, margin: '0 auto 20px' }}>
            Our Yangon customer support team is available every day from 9:00 AM to 8:00 PM via Viber and Telegram.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                background: '#D4F56A',
                color: '#12161C',
                padding: '12px 24px',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              Contact Support Desk →
            </Link>
            <a
              href="viber://chat?number=%2B959798881234"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              Chat on Viber (09-798881234)
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
