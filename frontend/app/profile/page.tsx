'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, A } from '../../components/store-context';
import { Bookmark } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, setCurrentUser, userProfile, setUserProfile, setToast } = useStore();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(userProfile.address);
  const [township, setTownship] = useState(userProfile.township);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const TOWNSHIPS = [
    'Yangon',
    'Kamayut',
    'Bahan',
    'Sanchaung',
    'Hlaing',
    'Mayangone',
    'Yankin',
    'Tamwe',
    'Mandalay',
    'Naypyitaw',
    'Taunggyi',
    'Bago',
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      name,
      email,
      phone,
      address,
      township,
    });
    if (currentUser) {
      setCurrentUser({ name, email });
    }
    setToast('Profile updated successfully!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPwdMsg({ type: 'err', text: 'Please enter your current password' });
      return;
    }
    if (newPassword.length < 6) {
      setPwdMsg({ type: 'err', text: 'New password must be at least 6 characters' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMsg({ type: 'err', text: 'New passwords do not match' });
      return;
    }
    setPwdMsg({ type: 'ok', text: 'Password successfully updated!' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setToast('Password updated successfully!');
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

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 20 }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>Account Profile</span>
        </div>

        {/* User Card Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #12161C 0%, #2E2660 100%)',
            color: '#FFFFFF',
            borderRadius: 28,
            padding: '36px 32px',
            marginBottom: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            boxShadow: '0 12px 36px rgba(18,22,28,0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                background: `linear-gradient(135deg, ${A} 0%, #D4F56A 160%)`,
                color: '#12161C',
                fontSize: 28,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, margin: 0 }}>
                  {name}
                </h1>
                <span style={{ background: '#DCFCE7', color: '#059669', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 999 }}>
                  ✓ Verified Member
                </span>
              </div>
              <div style={{ color: '#D1D5DB', fontSize: 14 }}>{email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/orders"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#FFF',
                padding: '10px 18px',
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              📦 My Orders
            </Link>
            <Link
              href="/wishlist"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#FFF',
                padding: '10px 18px',
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                transition: 'all 0.15s ease',
              }}
            >
              <Bookmark size={15} strokeWidth={2} color="#FFF" fill="none" />
              <span>Saved Items</span>
            </Link>
          </div>
        </div>

        {/* Content Columns: Info & Security */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {/* Column 1: Personal & Shipping Information */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '28px',
              border: '1px solid rgba(18,22,28,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 20px', color: '#12161C' }}>
              👤 Personal & Shipping Info
            </h2>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
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
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
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
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
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
                  Default Shipping Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
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
                  Township / City
                </label>
                <select
                  value={township}
                  onChange={e => setTownship(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 12,
                    border: '1.5px solid #E5E7EB',
                    fontSize: 14,
                    background: '#FFF',
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                >
                  {TOWNSHIPS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: 10,
                  padding: '12px 20px',
                  borderRadius: 999,
                  border: 'none',
                  background: '#12161C',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 14.5,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = A)}
                onMouseLeave={e => (e.currentTarget.style.background = '#12161C')}
              >
                Save Profile Changes
              </button>
            </form>
          </div>

          {/* Column 2: Password & Account Preferences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 24,
                padding: '28px',
                border: '1px solid rgba(18,22,28,0.08)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 20px', color: '#12161C' }}>
                🔒 Security & Password
              </h2>

              <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
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
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
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
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 12,
                      border: '1.5px solid #E5E7EB',
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {pwdMsg && (
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: pwdMsg.type === 'ok' ? '#10B981' : '#EF4444' }}>
                    {pwdMsg.text}
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    marginTop: 6,
                    padding: '12px 20px',
                    borderRadius: 999,
                    border: '1.5px solid #12161C',
                    background: '#FFFFFF',
                    color: '#12161C',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Quick Actions Card */}
            <div
              style={{
                background: '#F8F9FD',
                borderRadius: 20,
                padding: '24px',
                border: '1px solid #ECECF4',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: '#12161C' }}>
                Account Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                <Link href="/dashboard" style={{ color: A, textDecoration: 'none', fontWeight: 700 }}>
                  📊 Go to Seller / Admin Dashboard →
                </Link>
                <Link href="/faq" style={{ color: '#4B5563', textDecoration: 'none' }}>
                  ❓ Shipping & Returns FAQ
                </Link>
                <Link href="/contact" style={{ color: '#4B5563', textDecoration: 'none' }}>
                  💬 Need help? Contact Viber Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
