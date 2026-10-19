'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, A } from '../../components/store-context';

export default function ContactPage() {
  const { setToast } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Compatibility Question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setToast('Your message has been sent to our Yangon team!');
  };

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

      <main style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 20 }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>About & Contact</span>
        </div>

        {/* Hero Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #12161C 0%, #252250 100%)',
            color: '#FFFFFF',
            borderRadius: 28,
            padding: '48px 36px',
            marginBottom: 48,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <span
              style={{
                display: 'inline-block',
                background: '#D4F56A',
                color: '#12161C',
                padding: '4px 12px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 16,
              }}
            >
              🇲🇲 YANGON, MYANMAR
            </span>
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                margin: '0 0 12px',
                lineHeight: 1.15,
              }}
            >
              We&apos;re Here to Help Your Phone
            </h1>
            <p style={{ color: '#D1D5DB', fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Questions about case fit, fast-charging protocols, or delivery status? Reach out through Viber, Telegram, or send us a note below.
            </p>
          </div>
        </div>

        {/* Contact Channels Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginBottom: 48,
          }}
        >
          {/* Viber Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 22,
              padding: '24px',
              border: '1px solid rgba(18,22,28,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>💬</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px' }}>Viber Direct Chat</h2>
              <p style={{ color: '#6A7280', fontSize: 14, margin: '0 0 16px', lineHeight: 1.5 }}>
                Chat with our customer service reps in Burmese or English. Average response time: under 10 minutes.
              </p>
            </div>
            <a
              href="viber://chat?number=%2B959798881234"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 18px',
                borderRadius: 999,
                background: '#7360F2',
                color: '#FFF',
                fontWeight: 700,
                fontSize: 13.5,
                textDecoration: 'none',
              }}
            >
              Open Viber (09-798881234)
            </a>
          </div>

          {/* Telegram Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 22,
              padding: '24px',
              border: '1px solid rgba(18,22,28,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✈️</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px' }}>Telegram Channel</h2>
              <p style={{ color: '#6A7280', fontSize: 14, margin: '0 0 16px', lineHeight: 1.5 }}>
                Instant inquiries, tracking updates, and daily arrival notifications for new cases and accessories.
              </p>
            </div>
            <a
              href="https://t.me/SellioMobileSupport"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 18px',
                borderRadius: 999,
                background: '#229ED9',
                color: '#FFF',
                fontWeight: 700,
                fontSize: 13.5,
                textDecoration: 'none',
              }}
            >
              @SellioMobileSupport
            </a>
          </div>

          {/* Phone Hotline Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 22,
              padding: '24px',
              border: '1px solid rgba(18,22,28,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📞</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px' }}>Phone Hotline</h2>
              <p style={{ color: '#6A7280', fontSize: 14, margin: '0 0 16px', lineHeight: 1.5 }}>
                Call our Yangon fulfillment hub during store hours (9:00 AM – 8:00 PM daily).
              </p>
            </div>
            <a
              href="tel:09798881234"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 18px',
                borderRadius: 999,
                background: '#12161C',
                color: '#FFF',
                fontWeight: 700,
                fontSize: 13.5,
                textDecoration: 'none',
              }}
            >
              Call 09-798881234
            </a>
          </div>
        </div>

        {/* Contact Form & Location Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* Form */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '32px',
              border: '1px solid rgba(18,22,28,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>Send Us an Inquiry</h2>
            <p style={{ color: '#6A7280', fontSize: 14, margin: '0 0 24px' }}>
              Fill in your details and we&apos;ll get back to you via SMS or Viber shortly.
            </p>

            {submitted ? (
              <div style={{ padding: '32px 16px', textAlign: 'center', background: '#F8F9FD', borderRadius: 16 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>💌</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px' }}>Inquiry Received!</h3>
                <p style={{ color: '#4B5563', fontSize: 14, margin: '0 0 16px' }}>
                  Thank you, <strong>{name}</strong>. Our support desk has logged your ticket and will message you at {phone}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: '#12161C',
                    color: '#FFF',
                    padding: '8px 18px',
                    borderRadius: 999,
                    border: 'none',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ko Aung Myo"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1.5px solid #E5E7EB',
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                    Phone or Viber Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="09-xxxxxxxxx"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1.5px solid #E5E7EB',
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                    Topic
                  </label>
                  <select
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1.5px solid #E5E7EB',
                      fontSize: 14,
                      background: '#FFF',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Compatibility Question">Phone Model Compatibility</option>
                    <option value="Order Tracking">Order & Shipping Status</option>
                    <option value="KBZPay Payment">Payment & Transfer Slip</option>
                    <option value="Wholesale">Wholesale & Bulk Inquiries</option>
                    <option value="Return">Defective Item Replacement</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what accessory you need help with..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1.5px solid #E5E7EB',
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '14px 24px',
                    borderRadius: 999,
                    border: 'none',
                    background: `linear-gradient(135deg, ${A} 0%, #12161C 160%)`,
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(75,59,255,0.3)',
                  }}
                >
                  Send Inquiry Now →
                </button>
              </form>
            )}
          </div>

          {/* Location & Hub Info */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '32px',
              border: '1px solid rgba(18,22,28,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px' }}>Store & Dispatch Center</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14, lineHeight: 1.6, color: '#4B5563' }}>
              <div>
                <strong style={{ color: '#12161C', display: 'block', marginBottom: 4 }}>📍 Physical Location</strong>
                Sellio Hub, No. 42 Inya Road, Near Hledan Center, Kamayut Township, Yangon 11041, Myanmar.
              </div>

              <div>
                <strong style={{ color: '#12161C', display: 'block', marginBottom: 4 }}>⏰ Operating Hours</strong>
                Monday to Sunday: 9:00 AM – 8:00 PM (Daily courier pickups at 11:00 AM and 4:30 PM).
              </div>

              <div>
                <strong style={{ color: '#12161C', display: 'block', marginBottom: 4 }}>🚚 Nationwide Shipping</strong>
                Express courier delivery to Yangon, Mandalay, Naypyitaw, Taunggyi, Mawlamyine, Bago, and 50+ townships.
              </div>

              <div style={{ padding: '16px', background: '#F8F9FD', borderRadius: 16, border: '1px solid #ECECF4', marginTop: 8 }}>
                <div style={{ fontWeight: 800, color: '#12161C', marginBottom: 6 }}>Need Urgent Pickup?</div>
                <div>Same-day delivery is available for orders placed before 1:00 PM in Yangon municipal townships.</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
