'use client';

import React, { useState } from 'react';
import { UserRole } from './store-context';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; role?: UserRole }) => void;
}

function GoogleIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}


export function AuthModal({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && !agreeTerms) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const displayName = fullName.trim() || (method === 'email' && email.includes('@') ? email.split('@')[0] : (phone ? `User +95 ${phone.slice(-4)}` : 'Sellio Member'));
      const userEmail = method === 'email' && email ? email : `${phone || 'member'}@sellio.customer`;
      onSuccess({ name: displayName, email: userEmail });
      onClose();
    }, 500);
  };

  const handleGuestContinue = () => {
    onSuccess({ name: 'Guest Shopper', email: 'guest@sellio.store', role: 'guest' });
    onClose();
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        name: 'Min Thant',
        email: 'minthant.ygn@gmail.com',
      });
      onClose();
    }, 550);
  };


  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        background: 'rgba(12, 15, 21, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: "'Manrope', 'Noto Sans Myanmar', system-ui, sans-serif",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          maxWidth: 440,
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
          boxSizing: 'border-box',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Sellio Logo & Close */}
        <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: '#5B3DF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#111827', letterSpacing: -0.5 }}>
              Sellio
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              border: 'none',
              background: '#F1F2F7',
              color: '#6B7280',
              fontSize: 15,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 28px 28px' }}>
          <h3
            style={{
              margin: '0 0 6px',
              fontSize: 24,
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.02em',
            }}
          >
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h3>
          <p style={{ margin: '0 0 18px', fontSize: 13.5, color: '#6B7280' }}>
            {mode === 'login'
              ? 'Log in to track your orders and check out faster.'
              : 'Save your details once and order in a few taps.'}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 5 }}>
                  Full name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    height: 44,
                    padding: '0 14px',
                    borderRadius: 10,
                    border: '1.5px solid #E5E7EB',
                    fontSize: 14.5,
                    color: '#111827',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                />
              </div>
            )}

            {/* Segmented Phone / Email Switcher */}
            <div
              style={{
                background: '#F1F2F7',
                borderRadius: 10,
                padding: 3,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                marginBottom: 14,
              }}
            >
              <button
                type="button"
                onClick={() => setMethod('phone')}
                style={{
                  border: 'none',
                  background: method === 'phone' ? '#FFFFFF' : 'transparent',
                  color: method === 'phone' ? '#111827' : '#6B7280',
                  fontSize: 13.5,
                  fontWeight: method === 'phone' ? 700 : 500,
                  padding: '8px 0',
                  borderRadius: 8,
                  boxShadow: method === 'phone' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                }}
              >
                Phone
              </button>
              <button
                type="button"
                onClick={() => setMethod('email')}
                style={{
                  border: 'none',
                  background: method === 'email' ? '#FFFFFF' : 'transparent',
                  color: method === 'email' ? '#111827' : '#6B7280',
                  fontSize: 13.5,
                  fontWeight: method === 'email' ? 700 : 500,
                  padding: '8px 0',
                  borderRadius: 8,
                  boxShadow: method === 'email' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                }}
              >
                Email
              </button>
            </div>

            {method === 'phone' ? (
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 5 }}>
                  Phone
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div
                    style={{
                      width: 58,
                      height: 44,
                      borderRadius: 10,
                      border: '1.5px solid #E5E7EB',
                      background: '#F9FAFB',
                      color: '#111827',
                      fontWeight: 700,
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    +95
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9xx xxx xxx"
                    style={{
                      flex: 1,
                      height: 44,
                      borderRadius: 10,
                      border: '1.5px solid #E5E7EB',
                      padding: '0 14px',
                      fontSize: 14.5,
                      color: '#111827',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  />
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 5 }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    height: 44,
                    padding: '0 14px',
                    borderRadius: 10,
                    border: '1.5px solid #E5E7EB',
                    fontSize: 14.5,
                    color: '#111827',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                />
              </div>
            )}

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 5 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'login' ? 'Enter your password' : 'Create a password'}
                  style={{
                    width: '100%',
                    height: 44,
                    padding: '0 60px 0 14px',
                    borderRadius: 10,
                    border: '1.5px solid #E5E7EB',
                    fontSize: 14.5,
                    color: '#111827',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    fontSize: 13,
                    color: '#5B3DF5',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {mode === 'register' && (
                <span style={{ display: 'block', fontSize: 12, color: '#6B7280', marginTop: 5 }}>
                  At least 8 characters
                </span>
              )}
            </div>

            {mode === 'register' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <input
                  type="checkbox"
                  id="modal-agree"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: '#5B3DF5', cursor: 'pointer' }}
                />
                <label htmlFor="modal-agree" style={{ fontSize: 12.5, color: '#4B5563', cursor: 'pointer' }}>
                  I agree to the Terms and Privacy Policy
                </label>
              </div>
            )}

            {/* Primary Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 12,
                border: 'none',
                background: '#5B3DF5',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 15,
                cursor: isLoading ? 'wait' : 'pointer',
                boxShadow: '0 4px 14px rgba(91, 61, 245, 0.25)',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4A2CE0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5B3DF5')}
            >
              {isLoading ? '...' : (mode === 'login' ? 'Log in' : 'Create account')}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
          </div>

          {/* Secondary Actions: Google & Guest */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              style={{
                width: '100%',
                height: 44,
                borderRadius: 12,
                border: '1.5px solid #E5E7EB',
                background: '#FFFFFF',
                color: '#111827',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F9FAFB';
                e.currentTarget.style.borderColor = '#D1D5DB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              <GoogleIcon size={19} />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleGuestContinue}
              style={{
                width: '100%',
                height: 44,
                borderRadius: 12,
                border: '1.5px solid #E5E7EB',
                background: '#FFFFFF',
                color: '#111827',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
            >
              Continue as guest
            </button>
          </div>

          {/* Footer switcher */}
          <div style={{ marginTop: 18, textAlign: 'center', fontSize: 13.5, color: '#6B7280' }}>
            {mode === 'login' ? 'New to Sellio? ' : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#5B3DF5',
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
              }}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
