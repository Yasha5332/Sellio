'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from './store-context';

interface AuthSplitViewProps {
  initialMode: 'login' | 'register';
}

function GoogleIcon({ size = 20 }: { size?: number }) {
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


export default function AuthSplitView({ initialMode }: AuthSplitViewProps) {
  const router = useRouter();
  const { setCurrentUser, setToast } = useStore();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [lang, setLang] = useState<'en' | 'mm'>('en');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [fullName, setFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Status & dialogs
  const [submitting, setSubmitting] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [policyModal, setPolicyModal] = useState<'terms' | 'privacy' | null>(null);

  // Google Sign-in state
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  const sampleGoogleAccounts = [
    {
      name: 'Min Thant',
      email: 'minthant.ygn@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    },
    {
      name: 'Su Myat Noe',
      email: 'sumyatnoe.mm@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const handleSelectGoogleAccount = (account: { name: string; email: string; avatar?: string }) => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setGoogleModalOpen(false);
      setShowCustomGoogleInput(false);
      setCurrentUser({
        name: account.name,
        email: account.email,
        avatar: account.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        role: 'customer',
      });
      setToast(
        mode === 'login'
          ? (lang === 'en' ? `Welcome back, ${account.name}!` : `${account.name} အား ကြိုဆိုပါသည်!`)
          : (lang === 'en' ? `Account created for ${account.name}!` : `${account.name} အတွက် အကောင့်ဖွင့်ပြီးပါပြီ!`)
      );
      router.push('/');
    }, 550);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail) return;
    const displayName = customGoogleName.trim() || customGoogleEmail.split('@')[0];
    handleSelectGoogleAccount({
      name: displayName,
      email: customGoogleEmail.includes('@') ? customGoogleEmail : `${customGoogleEmail}@gmail.com`,
    });
  };


  // Sync mode if prop changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    window.history.pushState(null, '', newMode === 'register' ? '/register' : '/login');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const credential = authMethod === 'phone' ? (loginPhone ? `+95 ${loginPhone}` : '09xxxxxxxxx') : loginEmail;

    setTimeout(() => {
      setSubmitting(false);
      const displayName = authMethod === 'email' && loginEmail.includes('@')
        ? loginEmail.split('@')[0]
        : (loginPhone ? `User +95 ${loginPhone.slice(-4)}` : 'Sellio Member');
      const email = authMethod === 'email' && loginEmail
        ? loginEmail
        : `${loginPhone || 'member'}@sellio.customer`;

      setCurrentUser({ name: displayName, email });
      setToast(lang === 'en' ? 'Welcome back to Sellio!' : 'Sellio သို့ ပြန်လည်ကြိုဆိုပါသည်!');
      router.push('/');
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setToast(lang === 'en' ? 'Please agree to the Terms & Privacy Policy' : 'ကျေးဇူးပြု၍ စည်းကမ်းချက်များကို သဘောတူပါ');
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      const name = fullName.trim() || 'Sellio Member';
      const email = authMethod === 'email' && regEmail
        ? regEmail
        : `${regPhone || 'new_member'}@sellio.customer`;

      setCurrentUser({ name, email });
      setToast(lang === 'en' ? 'Account created successfully!' : 'အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်!');
      router.push('/');
    }, 600);
  };

  const handleGuestContinue = () => {
    setCurrentUser({ name: 'Guest Shopper', email: 'guest@sellio.store', role: 'guest' });
    setToast(lang === 'en' ? 'Continuing as guest' : 'ဧည့်သည်အဖြစ် ဆက်လက်ဝယ်ယူနေပါသည်');
    router.push('/');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setForgotModalOpen(false);
      setToast(lang === 'en' ? 'Reset link sent!' : 'စကားဝှက်ပြန်လည်သတ်မှတ်ရန် လင့်ခ်ပို့ပြီးပါပြီ!');
    }, 1400);
  };

  // Translations
  const t = {
    en: {
      leftHeadline1: 'Shop with',
      leftHeadline2: 'confidence.',
      leftSubtitle: 'Pay on delivery or by QR, and follow your order from one page.',
      feat1: 'Cash on delivery or QR payment',
      feat2: 'Track every order in one place',
      feat3: 'Shop in Burmese or English',
      demoNote: 'Demo store with sample products',
      // Login
      loginTitle: 'Welcome back',
      loginSubtitle: 'Log in to track your orders and check out faster.',
      phone: 'Phone',
      email: 'Email',
      phonePlaceholder: '9xx xxx xxx',
      emailPlaceholder: 'name@example.com',
      password: 'Password',
      loginPassPlaceholder: 'Enter your password',
      show: 'Show',
      hide: 'Hide',
      forgot: 'Forgot password?',
      loginBtn: 'Log in',
      or: 'or',
      guestBtn: 'Continue as guest',
      newToSellio: 'New to Sellio?',
      signupLink: 'Sign up',
      // Register
      regTitle: 'Create your account',
      regSubtitle: 'Save your details once and order in a few taps.',
      fullName: 'Full name',
      namePlaceholder: 'Your name',
      regPassPlaceholder: 'Create a password',
      passHelper: 'At least 8 characters',
      agreeTermsPre: 'I agree to the ',
      terms: 'Terms',
      agreeAnd: ' and ',
      privacy: 'Privacy Policy',
      createBtn: 'Create account',
      haveAccount: 'Already have an account?',
      loginLink: 'Log in',
      // Google
      googleBtn: 'Continue with Google',
      googleChooserTitle: 'Choose an account',
      googleChooserSubtitle: 'to continue to Sellio',
      googleOtherAccount: 'Use another account',
      googleCustomName: 'Your Name',
      googleCustomEmail: 'Google Email address',
      googleSignInBtn: 'Sign in',
      googleDisclaimer: 'To continue, Google will share your name, email address, and profile picture with Sellio.',
    },
    mm: {
      leftHeadline1: 'စိတ်ချလက်ချ',
      leftHeadline2: 'ဝယ်ယူလိုက်ပါ။',
      leftSubtitle: 'ပစ္စည်းရောက်မှငွေချေ သို့မဟုတ် QR ဖြင့်ငွေချေပြီး အော်ဒါများကို တစ်နေရာတည်းမှ ကြည့်နိုင်ပါသည်။',
      feat1: 'ပစ္စည်းရောက်ငွေချေ သို့မဟုတ် QR ဖြင့်ငွေချေနိုင်ခြင်း',
      feat2: 'အော်ဒါအားလုံးကို တစ်နေရာတည်းမှ ခြေရာခံခြင်း',
      feat3: 'မြန်မာဘာသာ သို့မဟုတ် အင်္ဂလိပ်ဘာသာဖြင့် ဝယ်ယူနိုင်ခြင်း',
      demoNote: 'နမူနာပစ္စည်းများဖြင့် စမ်းသပ်စတိုး',
      // Login
      loginTitle: 'ပြန်လည်ကြိုဆိုပါသည်',
      loginSubtitle: 'သင်၏အော်ဒါများကို ခြေရာခံပြီး ပိုမိုမြန်ဆန်စွာ ဝယ်ယူရန် အကောင့်ဝင်ပါ။',
      phone: 'ဖုန်း',
      email: 'အီးမေးလ်',
      phonePlaceholder: '9xx xxx xxx',
      emailPlaceholder: 'name@example.com',
      password: 'စကားဝှက်',
      loginPassPlaceholder: 'စကားဝှက်ထည့်ပါ',
      show: 'ပြမည်',
      hide: 'ဝှက်မည်',
      forgot: 'စကားဝှက် မေ့နေပါသလား?',
      loginBtn: 'အကောင့်ဝင်ရန်',
      or: 'သို့မဟုတ်',
      guestBtn: 'ဧည့်သည်အဖြစ် ဆက်လက်သွားမည်',
      newToSellio: 'Sellio တွင် အကောင့်မရှိသေးဘူးလား?',
      signupLink: 'အကောင့်ဖွင့်ရန်',
      // Register
      regTitle: 'အကောင့်အသစ်ပြုလုပ်ပါ',
      regSubtitle: 'အချက်အလက်များကို တစ်ခါသိမ်းဆည်းပြီး လွယ်ကူစွာ ဝယ်ယူပါ။',
      fullName: 'အမည်အပြည့်အစုံ',
      namePlaceholder: 'သင့်အမည်',
      regPassPlaceholder: 'စကားဝှက်အသစ် သတ်မှတ်ပါ',
      passHelper: 'အနည်းဆုံး ၈ လုံး ရှိရပါမည်',
      agreeTermsPre: 'စည်းကမ်းသတ်မှတ်ချက်များ ',
      terms: 'Terms',
      agreeAnd: ' နှင့် ',
      privacy: 'ကိုယ်ရေးအချက်အလက်မူဝါဒ',
      createBtn: 'အကောင့်ဖွင့်မည်',
      haveAccount: 'အကောင့်ရှိပြီးသားလား?',
      loginLink: 'အကောင့်ဝင်ရန်',
      // Google
      googleBtn: 'Google ဖြင့် ဆက်လက်သွားမည်',
      googleChooserTitle: 'အကောင့်တစ်ခု ရွေးချယ်ပါ',
      googleChooserSubtitle: 'Sellio သို့ ဆက်လက်ဝင်ရောက်ရန်',
      googleOtherAccount: 'အခြားအကောင့်တစ်ခု အသုံးပြုမည်',
      googleCustomName: 'သင့်အမည်',
      googleCustomEmail: 'Google အီးမေးလ်လိပ်စာ',
      googleSignInBtn: 'အကောင့်ဝင်မည်',
      googleDisclaimer: 'ဆက်လက်လုပ်ဆောင်ရန် Google သည် သင့်အမည်၊ အီးမေးလ်နှင့် ပရိုဖိုင်ပုံကို Sellio နှင့် မျှဝေပါမည်။',
    },
  }[lang];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
        background: '#FFFFFF',
        fontFamily: "'Manrope', 'Noto Sans Myanmar', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ── LEFT HERO PANEL (Purple #5B3DF5) ── */}
      <div
        className="sellio-auth-left"
        style={{
          flex: '1 1 50%',
          minWidth: 380,
          background: '#5B3DF5',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 56px 40px',
          boxSizing: 'border-box',
        }}
      >
        {/* Concentric rings decoration in bottom right quadrant */}
        <svg
          style={{
            position: 'absolute',
            bottom: -130,
            right: -130,
            width: 760,
            height: 760,
            pointerEvents: 'none',
            opacity: 0.22,
          }}
          viewBox="0 0 760 760"
          fill="none"
        >
          <circle cx="380" cy="380" r="130" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="380" cy="380" r="230" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="380" cy="380" r="330" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="380" cy="380" r="430" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="380" cy="380" r="530" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="380" cy="380" r="630" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>

        {/* Brand Logo Header */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
              }}
            >
              {/* Shopping Bag Icon matching Log in (website)@1x.png */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5B3DF5"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: 27,
                fontWeight: 800,
                letterSpacing: -0.6,
              }}
            >
              Sellio
            </span>
          </Link>
        </div>

        {/* Center Main Value Proposition */}
        <div style={{ margin: 'auto 0', padding: '40px 0 32px', position: 'relative', zIndex: 2 }}>
          <h1
            style={{
              fontSize: 'clamp(36px, 4.2vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              margin: '0 0 18px',
              color: '#FFFFFF',
            }}
          >
            {t.leftHeadline1}
            <br />
            {t.leftHeadline2}
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              color: 'rgba(255, 255, 255, 0.84)',
              maxWidth: 390,
              margin: '0 0 38px',
              fontWeight: 400,
            }}
          >
            {t.leftSubtitle}
          </p>

          {/* 3 Value Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Feature 1: COD / QR */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.16)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {/* QR / COD 4-block icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <circle cx="17.5" cy="17.5" r="2.5" fill="#FFFFFF" />
                </svg>
              </div>
              <span style={{ fontSize: 15.5, fontWeight: 600, color: '#FFFFFF' }}>
                {t.feat1}
              </span>
            </div>

            {/* Feature 2: Track Orders */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.16)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {/* 3D Parcel Box Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
              <span style={{ fontSize: 15.5, fontWeight: 600, color: '#FFFFFF' }}>
                {t.feat2}
              </span>
            </div>

            {/* Feature 3: Burmese or English */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.16)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {/* Globe Wireframe Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span style={{ fontSize: 15.5, fontWeight: 600, color: '#FFFFFF' }}>
                {t.feat3}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div style={{ position: 'relative', zIndex: 2, paddingTop: 16 }}>
          <span
            style={{
              fontSize: 13.5,
              color: 'rgba(255, 255, 255, 0.65)',
              fontWeight: 500,
            }}
          >
            {t.demoNote}
          </span>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL (White #FFFFFF) ── */}
      <div
        className="sellio-auth-right"
        style={{
          flex: '1 1 50%',
          minWidth: 360,
          background: '#FFFFFF',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px 52px 36px',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Language Switcher (EN / မြန်မာ) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: 12 }}>
          <div
            style={{
              background: '#F1F2F7',
              borderRadius: 9999,
              padding: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              style={{
                border: 'none',
                background: lang === 'en' ? '#5B3DF5' : 'transparent',
                color: lang === 'en' ? '#FFFFFF' : '#4B5563',
                fontSize: 12.5,
                fontWeight: 700,
                padding: '6px 14px',
                borderRadius: 9999,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('mm')}
              style={{
                border: 'none',
                background: lang === 'mm' ? '#5B3DF5' : 'transparent',
                color: lang === 'mm' ? '#FFFFFF' : '#4B5563',
                fontSize: 12.5,
                fontWeight: 700,
                padding: '6px 14px',
                borderRadius: 9999,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              မြန်မာ
            </button>
          </div>
        </div>

        {/* Centered Form Wrapper (Max 420px) */}
        <div
          style={{
            width: '100%',
            maxWidth: 420,
            margin: 'auto',
            padding: '12px 0 24px',
          }}
        >
          {mode === 'login' ? (
            /* ════════════ LOGIN VIEW (Matches Log in (website)@1x.png) ════════════ */
            <div>
              {/* Header */}
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#111827',
                  margin: '0 0 6px',
                  letterSpacing: '-0.025em',
                }}
              >
                {t.loginTitle}
              </h2>
              <p
                style={{
                  fontSize: 14.5,
                  color: '#6B7280',
                  margin: '0 0 24px',
                  lineHeight: 1.45,
                }}
              >
                {t.loginSubtitle}
              </p>

              {/* Segmented Phone / Email Switcher */}
              <div
                style={{
                  background: '#F1F2F7',
                  borderRadius: 12,
                  padding: 4,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  marginBottom: 20,
                }}
              >
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  style={{
                    border: 'none',
                    background: authMethod === 'phone' ? '#FFFFFF' : 'transparent',
                    color: authMethod === 'phone' ? '#111827' : '#6B7280',
                    fontSize: 14,
                    fontWeight: authMethod === 'phone' ? 700 : 500,
                    padding: '10px 0',
                    borderRadius: 9,
                    boxShadow: authMethod === 'phone' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {t.phone}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  style={{
                    border: 'none',
                    background: authMethod === 'email' ? '#FFFFFF' : 'transparent',
                    color: authMethod === 'email' ? '#111827' : '#6B7280',
                    fontSize: 14,
                    fontWeight: authMethod === 'email' ? 700 : 500,
                    padding: '10px 0',
                    borderRadius: 9,
                    boxShadow: authMethod === 'email' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {t.email}
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit}>
                {authMethod === 'phone' ? (
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: 6,
                      }}
                    >
                      {t.phone}
                    </label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <div
                        style={{
                          width: 64,
                          height: 48,
                          borderRadius: 10,
                          border: '1.5px solid #E5E7EB',
                          background: '#F9FAFB',
                          color: '#111827',
                          fontWeight: 700,
                          fontSize: 15,
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
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        style={{
                          flex: 1,
                          height: 48,
                          borderRadius: 10,
                          border: '1.5px solid #E5E7EB',
                          padding: '0 16px',
                          fontSize: 15,
                          color: '#111827',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.15s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: 6,
                      }}
                    >
                      {t.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      style={{
                        width: '100%',
                        height: 48,
                        borderRadius: 10,
                        border: '1.5px solid #E5E7EB',
                        padding: '0 16px',
                        fontSize: 15,
                        color: '#111827',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                    />
                  </div>
                )}

                {/* Password field */}
                <div style={{ marginTop: 16 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: 6,
                    }}
                  >
                    {t.password}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder={t.loginPassPlaceholder}
                      style={{
                        width: '100%',
                        height: 48,
                        borderRadius: 10,
                        border: '1.5px solid #E5E7EB',
                        padding: '0 68px 0 16px',
                        fontSize: 15,
                        color: '#111827',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'transparent',
                        color: '#5B3DF5',
                        fontWeight: 700,
                        fontSize: 13.5,
                        cursor: 'pointer',
                      }}
                    >
                      {showLoginPassword ? t.hide : t.show}
                    </button>
                  </div>
                </div>

                {/* Forgot Password link */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 10,
                    marginBottom: 20,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setForgotInput(authMethod === 'phone' ? loginPhone : loginEmail);
                      setForgotModalOpen(true);
                    }}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#5B3DF5',
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {t.forgot}
                  </button>
                </div>

                {/* Primary Button: Log In */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 12,
                    border: 'none',
                    background: '#5B3DF5',
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: submitting ? 'wait' : 'pointer',
                    transition: 'background-color 0.15s, transform 0.1s',
                    boxShadow: '0 4px 14px rgba(91, 61, 245, 0.28)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4A2CE0')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5B3DF5')}
                >
                  {submitting ? '...' : t.loginBtn}
                </button>

                {/* "or" divider */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    margin: '20px 0',
                  }}
                >
                  <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
                  <span style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
                    {t.or}
                  </span>
                  <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
                </div>

                {/* Secondary Actions: Continue with Google & Continue as guest */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setGoogleModalOpen(true)}
                    style={{
                      width: '100%',
                      height: 50,
                      borderRadius: 12,
                      border: '1.5px solid #E5E7EB',
                      background: '#FFFFFF',
                      color: '#111827',
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                      transition: 'all 0.15s ease',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                      e.currentTarget.style.borderColor = '#D1D5DB';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
                    }}
                  >
                    <GoogleIcon size={20} />
                    <span>{t.googleBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGuestContinue}
                    style={{
                      width: '100%',
                      height: 50,
                      borderRadius: 12,
                      border: '1.5px solid #E5E7EB',
                      background: '#FFFFFF',
                      color: '#111827',
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: 'pointer',
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
                    {t.guestBtn}
                  </button>
                </div>
              </form>

              {/* Footer Switcher */}
              <div
                style={{
                  marginTop: 24,
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#6B7280',
                }}
              >
                {t.newToSellio}{' '}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#5B3DF5',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: 14,
                    padding: 0,
                  }}
                >
                  {t.signupLink}
                </button>
              </div>
            </div>
          ) : (
            /* ════════════ REGISTER VIEW (Matches Sign up (website)@1x.png) ════════════ */
            <div>
              {/* Header */}
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#111827',
                  margin: '0 0 6px',
                  letterSpacing: '-0.025em',
                }}
              >
                {t.regTitle}
              </h2>
              <p
                style={{
                  fontSize: 14.5,
                  color: '#6B7280',
                  margin: '0 0 20px',
                  lineHeight: 1.45,
                }}
              >
                {t.regSubtitle}
              </p>

              {/* Register Form */}
              <form onSubmit={handleRegisterSubmit}>
                {/* Full name input */}
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: 6,
                    }}
                  >
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    style={{
                      width: '100%',
                      height: 48,
                      borderRadius: 10,
                      border: '1.5px solid #E5E7EB',
                      padding: '0 16px',
                      fontSize: 15,
                      color: '#111827',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.15s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  />
                </div>

                {/* Segmented Phone / Email Switcher */}
                <div
                  style={{
                    background: '#F1F2F7',
                    borderRadius: 12,
                    padding: 4,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    marginBottom: 16,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setAuthMethod('phone')}
                    style={{
                      border: 'none',
                      background: authMethod === 'phone' ? '#FFFFFF' : 'transparent',
                      color: authMethod === 'phone' ? '#111827' : '#6B7280',
                      fontSize: 14,
                      fontWeight: authMethod === 'phone' ? 700 : 500,
                      padding: '10px 0',
                      borderRadius: 9,
                      boxShadow: authMethod === 'phone' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {t.phone}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod('email')}
                    style={{
                      border: 'none',
                      background: authMethod === 'email' ? '#FFFFFF' : 'transparent',
                      color: authMethod === 'email' ? '#111827' : '#6B7280',
                      fontSize: 14,
                      fontWeight: authMethod === 'email' ? 700 : 500,
                      padding: '10px 0',
                      borderRadius: 9,
                      boxShadow: authMethod === 'email' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {t.email}
                  </button>
                </div>

                {/* Phone or Email Field */}
                {authMethod === 'phone' ? (
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: 6,
                      }}
                    >
                      {t.phone}
                    </label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <div
                        style={{
                          width: 64,
                          height: 48,
                          borderRadius: 10,
                          border: '1.5px solid #E5E7EB',
                          background: '#F9FAFB',
                          color: '#111827',
                          fontWeight: 700,
                          fontSize: 15,
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
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        style={{
                          flex: 1,
                          height: 48,
                          borderRadius: 10,
                          border: '1.5px solid #E5E7EB',
                          padding: '0 16px',
                          fontSize: 15,
                          color: '#111827',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.15s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: 6,
                      }}
                    >
                      {t.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      style={{
                        width: '100%',
                        height: 48,
                        borderRadius: 10,
                        border: '1.5px solid #E5E7EB',
                        padding: '0 16px',
                        fontSize: 15,
                        color: '#111827',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                    />
                  </div>
                )}

                {/* Password field */}
                <div style={{ marginTop: 16 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: 6,
                    }}
                  >
                    {t.password}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder={t.regPassPlaceholder}
                      style={{
                        width: '100%',
                        height: 48,
                        borderRadius: 10,
                        border: '1.5px solid #E5E7EB',
                        padding: '0 68px 0 16px',
                        fontSize: 15,
                        color: '#111827',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#5B3DF5')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword((prev) => !prev)}
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'transparent',
                        color: '#5B3DF5',
                        fontWeight: 700,
                        fontSize: 13.5,
                        cursor: 'pointer',
                      }}
                    >
                      {showRegPassword ? t.hide : t.show}
                    </button>
                  </div>
                  {/* Password helper text */}
                  <span
                    style={{
                      display: 'block',
                      fontSize: 12.5,
                      color: '#6B7280',
                      marginTop: 6,
                    }}
                  >
                    {t.passHelper}
                  </span>
                </div>

                {/* Terms & Privacy checkbox */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 18,
                    marginBottom: 22,
                  }}
                >
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    style={{
                      width: 17,
                      height: 17,
                      borderRadius: 4,
                      border: '1.5px solid #D1D5DB',
                      accentColor: '#5B3DF5',
                      cursor: 'pointer',
                    }}
                  />
                  <label
                    htmlFor="terms-checkbox"
                    style={{
                      fontSize: 13.5,
                      color: '#374151',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    {t.agreeTermsPre}
                    <button
                      type="button"
                      onClick={() => setPolicyModal('terms')}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: '#5B3DF5',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0,
                        fontSize: 'inherit',
                      }}
                    >
                      {t.terms}
                    </button>
                    {t.agreeAnd}
                    <button
                      type="button"
                      onClick={() => setPolicyModal('privacy')}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: '#5B3DF5',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0,
                        fontSize: 'inherit',
                      }}
                    >
                      {t.privacy}
                    </button>
                  </label>
                </div>

                {/* Primary Button: Create account */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 12,
                    border: 'none',
                    background: '#5B3DF5',
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: submitting ? 'wait' : 'pointer',
                    transition: 'background-color 0.15s',
                    boxShadow: '0 4px 14px rgba(91, 61, 245, 0.28)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4A2CE0')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5B3DF5')}
                >
                  {submitting ? '...' : t.createBtn}
                </button>

                {/* "or" divider */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    margin: '20px 0',
                  }}
                >
                  <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
                  <span style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
                    {t.or}
                  </span>
                  <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
                </div>

                {/* Continue with Google button */}
                <button
                  type="button"
                  onClick={() => setGoogleModalOpen(true)}
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 12,
                    border: '1.5px solid #E5E7EB',
                    background: '#FFFFFF',
                    color: '#111827',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    transition: 'all 0.15s ease',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#D1D5DB';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <GoogleIcon size={20} />
                  <span>{t.googleBtn}</span>
                </button>
              </form>

              {/* Footer Switcher */}
              <div
                style={{
                  marginTop: 24,
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#6B7280',
                }}
              >
                {t.haveAccount}{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#5B3DF5',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: 14,
                    padding: 0,
                  }}
                >
                  {t.loginLink}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty bottom spacer to keep form balanced */}
        <div style={{ height: 16 }} />
      </div>

      {/* ── FORGOT PASSWORD MODAL ── */}
      {forgotModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setForgotModalOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              width: '100%',
              maxWidth: 420,
              padding: 32,
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#111827' }}>
                {lang === 'en' ? 'Reset your password' : 'စကားဝှက် ပြန်လည်သတ်မှတ်ရန်'}
              </h3>
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                style={{
                  border: 'none',
                  background: '#F1F2F7',
                  borderRadius: 16,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6B7280',
                  fontSize: 16,
                }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 20px', lineHeight: 1.5 }}>
              {lang === 'en'
                ? 'Enter your phone number or email and we will send you a verification code to recover your account.'
                : 'သင့်ဖုန်းနံပါတ် သို့မဟုတ် အီးမေးလ်ကို ထည့်သွင်းပါ၊ စကားဝှက်ပြန်လည်သတ်မှတ်ရန် ကုဒ်ပို့ပေးပါမည်။'}
            </p>

            <form onSubmit={handleForgotSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                  {lang === 'en' ? 'Phone number or email' : 'ဖုန်းနံပါတ် သို့မဟုတ် အီးမေးလ်'}
                </label>
                <input
                  type="text"
                  required
                  value={forgotInput}
                  onChange={(e) => setForgotInput(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. 09xxxxxxxxx or name@domain.com' : 'ဥပမာ ၀၉xxxxxxxx သို့မဟုတ် အီးမေးလ်'}
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: 10,
                    border: '1.5px solid #E5E7EB',
                    padding: '0 16px',
                    fontSize: 15,
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={forgotSent}
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 12,
                  border: 'none',
                  background: '#5B3DF5',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                }}
              >
                {forgotSent
                  ? (lang === 'en' ? 'Sending code...' : 'ကုဒ်ပို့နေပါသည်...')
                  : (lang === 'en' ? 'Send Recovery Code' : 'ကုဒ်ပို့ရန်')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── TERMS & PRIVACY MODAL ── */}
      {policyModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setPolicyModal(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              width: '100%',
              maxWidth: 500,
              padding: 32,
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#111827' }}>
                {policyModal === 'terms' ? 'Sellio Terms of Service' : 'Sellio Privacy Policy'}
              </h3>
              <button
                type="button"
                onClick={() => setPolicyModal(null)}
                style={{
                  border: 'none',
                  background: '#F1F2F7',
                  borderRadius: 16,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6B7280',
                  fontSize: 16,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6 }}>
              {policyModal === 'terms' ? (
                <>
                  <p>Welcome to Sellio. By creating an account or placing an order, you agree to our terms of service.</p>
                  <p><strong>1. Orders & Delivery:</strong> Cash on delivery (COD) and QR payment (KBZPay, WavePay) are accepted. Deliveries are fulfilled through verified local couriers in Myanmar.</p>
                  <p><strong>2. Accuracy:</strong> You agree to provide accurate phone numbers and township addresses to ensure timely delivery.</p>
                  <p><strong>3. Returns & Refunds:</strong> Returns are accepted within 3 days of delivery for defective items or wrong models.</p>
                </>
              ) : (
                <>
                  <p>Sellio values your privacy. Your information is securely encrypted and used only to process and deliver your phone accessories orders.</p>
                  <p><strong>1. Data collected:</strong> Name, phone number, shipping township, and order history.</p>
                  <p><strong>2. Usage:</strong> Your phone number is used exclusively for courier delivery coordination and order status notifications.</p>
                  <p><strong>3. Security:</strong> We do not share your private details with unauthorized third parties.</p>
                </>
              )}
            </div>
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setPolicyModal(null)}
                style={{
                  padding: '10px 22px',
                  borderRadius: 10,
                  border: 'none',
                  background: '#5B3DF5',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── GOOGLE AUTH MODAL ── */}
      {googleModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 350,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => {
            if (!googleLoading) {
              setGoogleModalOpen(false);
              setShowCustomGoogleInput(false);
            }
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 22,
              width: '100%',
              maxWidth: 420,
              padding: '28px 26px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
              position: 'relative',
              boxSizing: 'border-box',
              fontFamily: "'Manrope', 'Noto Sans Myanmar', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Google Logo & Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <GoogleIcon size={26} />
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: '#3C4043',
                    letterSpacing: -0.2,
                  }}
                >
                  Google
                </span>
              </div>
              <button
                type="button"
                disabled={googleLoading}
                onClick={() => {
                  setGoogleModalOpen(false);
                  setShowCustomGoogleInput(false);
                }}
                style={{
                  border: 'none',
                  background: '#F1F2F7',
                  borderRadius: 16,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6B7280',
                  fontSize: 16,
                }}
              >
                ✕
              </button>
            </div>

            {/* Title & Subtitle */}
            <h3
              style={{
                margin: '0 0 4px',
                fontSize: 22,
                fontWeight: 800,
                color: '#111827',
                letterSpacing: '-0.02em',
              }}
            >
              {t.googleChooserTitle}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: '#6B7280',
                margin: '0 0 20px',
              }}
            >
              {t.googleChooserSubtitle}
            </p>

            {googleLoading ? (
              <div
                style={{
                  padding: '36px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    border: '3.5px solid #E5E7EB',
                    borderTopColor: '#4285F4',
                    borderRadius: '50%',
                    animation: 'sellio-google-spin 0.8s linear infinite',
                  }}
                />
                <span style={{ fontSize: 14, color: '#4B5563', fontWeight: 600 }}>
                  {lang === 'en' ? 'Connecting with Google...' : 'Google ဖြင့် ချိတ်ဆက်နေပါသည်...'}
                </span>
                <style>{`
                  @keyframes sellio-google-spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            ) : showCustomGoogleInput ? (
              /* Custom Google Email Form */
              <form onSubmit={handleCustomGoogleSubmit}>
                <div style={{ marginBottom: 14 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: 5,
                    }}
                  >
                    {t.googleCustomName}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aung Min"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    style={{
                      width: '100%',
                      height: 44,
                      borderRadius: 10,
                      border: '1.5px solid #E5E7EB',
                      padding: '0 14px',
                      fontSize: 14.5,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: 5,
                    }}
                  >
                    {t.googleCustomEmail}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    style={{
                      width: '100%',
                      height: 44,
                      borderRadius: 10,
                      border: '1.5px solid #E5E7EB',
                      padding: '0 14px',
                      fontSize: 14.5,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setShowCustomGoogleInput(false)}
                    style={{
                      flex: 1,
                      height: 44,
                      borderRadius: 10,
                      border: '1.5px solid #E5E7EB',
                      background: '#FFFFFF',
                      color: '#374151',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {lang === 'en' ? 'Back' : 'ရှေ့သို့ပြန်သွား'}
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      height: 44,
                      borderRadius: 10,
                      border: 'none',
                      background: '#5B3DF5',
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {t.googleSignInBtn}
                  </button>
                </div>
              </form>
            ) : (
              /* Sample Google Account List */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {sampleGoogleAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleSelectGoogleAccount(acc)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1px solid #F1F2F7',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8F9FA';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#F1F2F7';
                    }}
                  >
                    {/* Avatar */}
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1.5px solid #E5E7EB',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14.5,
                          fontWeight: 700,
                          color: '#111827',
                          lineHeight: 1.25,
                        }}
                      >
                        {acc.name}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: '#6B7280',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {acc.email}
                      </div>
                    </div>
                    {/* Small arrow */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                ))}

                {/* Use another account option */}
                <button
                  type="button"
                  onClick={() => setShowCustomGoogleInput(true)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px dashed #D1D5DB',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginTop: 2,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8F9FA';
                    e.currentTarget.style.borderColor = '#9CA3AF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4B5563',
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#374151',
                    }}
                  >
                    {t.googleOtherAccount}
                  </span>
                </button>
              </div>
            )}

            {/* Disclaimer */}
            <div
              style={{
                borderTop: '1px solid #F1F2F7',
                paddingTop: 14,
                fontSize: 12,
                color: '#6B7280',
                lineHeight: 1.45,
              }}
            >
              {t.googleDisclaimer}
            </div>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .sellio-auth-left {
            display: none !important;
          }
          .sellio-auth-right {
            flex: 1 1 100% !important;
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
