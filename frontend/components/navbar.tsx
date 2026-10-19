'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SellioLogo from './sellio-logo';
import { useStore, A } from './store-context';
import { AuthModal } from './auth-modal';
import { Bookmark } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    currentUser,
    setCurrentUser,
    userRole,
    setRole,
    wishlist,
    totalCount,
    totalPrice,
    toast,
  } = useStore();

  const isGuest = userRole === 'guest' || !currentUser;
  const isCustomer = userRole === 'customer';
  const isAdmin = userRole === 'admin';
  const isLoggedIn = !isGuest && !!currentUser;

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openLogin = () => { setAuthMode('login'); setAuthOpen(true); };
  const openRegister = () => { setAuthMode('register'); setAuthOpen(true); };

  // Close dropdown on outside click or route change
  useEffect(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    setRoleMenuOpen(false);
  }, [pathname]);

  interface NavLinkItem {
    label: string;
    href: string;
    sectionId?: string;
  }

  const customerNavLinks: NavLinkItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Catalog', href: '/products' },
    { label: 'FAQ & Policies', href: '/faq' },
    { label: 'About & Contact', href: '/contact' },
  ];

  const guestNavLinks: NavLinkItem[] = [
    { label: 'Home', href: '/#top', sectionId: 'top' },
    { label: 'Categories', href: '/#categories', sectionId: 'categories' },
    { label: 'Products', href: '/#products', sectionId: 'products' },
    { label: 'How It Works', href: '/#how', sectionId: 'how' },
    { label: 'Contact', href: '/#contact', sectionId: 'contact' },
  ];

  const navLinks = isLoggedIn ? customerNavLinks : guestNavLinks;

  const [activeSection, setActiveSection] = useState<string>('top');

  // Track active section on scroll when on landing page & handle hash on navigation
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['top', 'categories', 'products', 'how', 'contact'];

    // If there is an initial hash in URL, smoothly scroll to it
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const mapped = hashId === 'featured' ? 'products' : hashId;
      if (sectionIds.includes(mapped)) {
        setActiveSection(mapped);
      }
      const el = document.getElementById(hashId) || (hashId === 'products' ? document.getElementById('featured') : null);
      if (el) {
        setTimeout(() => {
          const headerOffset = 76;
          const elPosition = el.getBoundingClientRect().top;
          const offsetPosition = elPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 150);
      }
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 160;

      // Check bottom of page
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // If near top of page
      if (scrollY < 200) {
        setActiveSection('top');
        return;
      }

      const elements = [
        { id: 'top', el: document.getElementById('top') },
        { id: 'categories', el: document.getElementById('categories') },
        { id: 'products', el: document.getElementById('products') || document.getElementById('featured') },
        { id: 'how', el: document.getElementById('how') },
        { id: 'contact', el: document.getElementById('contact') },
      ];

      let current = 'top';
      for (const item of elements) {
        if (item.el) {
          const top = item.el.offsetTop;
          if (scrollY + offset >= top) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: NavLinkItem
  ) => {
    if (link.sectionId) {
      if (pathname === '/') {
        e.preventDefault();
        const targetId = link.sectionId;
        if (targetId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          let el = document.getElementById(targetId);
          if (!el && targetId === 'products') {
            el = document.getElementById('featured');
          }
          if (el) {
            const headerOffset = 76;
            const elPosition = el.getBoundingClientRect().top;
            const offsetPosition = elPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }
        setActiveSection(targetId);
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  const isLinkActive = (link: NavLinkItem) => {
    if (link.sectionId) {
      if (pathname === '/') {
        return activeSection === link.sectionId;
      }
      return false;
    }
    if (link.href === '/') return pathname === '/';
    return pathname.startsWith(link.href);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#12161C',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 14,
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            animation: 'fadeInDown 0.25s ease-out',
          }}
        >
          <span>⚡</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Fixed Header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 100,
          padding: '12px 20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px 16px',
              padding: '10px 18px',
              borderRadius: 32,
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.95)',
              boxShadow: '0 8px 32px rgba(40,30,120,0.10)',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <SellioLogo variant="kinetic-s" size={38} />
            </Link>

            {/* Navigation Links — 'sellio-desktop-nav' for customer, 'sellio-guest-nav' for guest */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14.5,
                fontWeight: 600,
              }}
              className={isLoggedIn ? 'sellio-desktop-nav' : 'sellio-guest-nav'}
            >

              {navLinks.map(link => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    style={{
                      textDecoration: 'none',
                      padding: '8px 14px',
                      borderRadius: 999,
                      color: active ? '#FFFFFF' : '#12161C',
                      background: active ? '#12161C' : 'transparent',
                      transition: 'all 0.18s ease',
                      fontWeight: active ? 700 : 600,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(18,22,28,0.06)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Utilities */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              {/* Search Page Button — strictly logged-in users only */}
              {isLoggedIn && (
                <Link
                  href="/search"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    minHeight: 38,
                    padding: '0 12px',
                    borderRadius: 999,
                    border: isActive('/search') ? '1.5px solid #12161C' : '1px solid rgba(18,22,28,0.12)',
                    background: isActive('/search') ? '#12161C' : 'rgba(255,255,255,0.9)',
                    color: isActive('/search') ? '#FFFFFF' : '#555E6B',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  }}
                  title="Search accessories"
                >
                  <span>🔍</span>
                  <span className="search-text-label">Search</span>
                </Link>
              )}


              {/* Saved Items Link — strictly logged-in users only (Customer & Admin) */}
              {isLoggedIn && (
                <Link
                  href="/wishlist"
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    minHeight: 38,
                    padding: '0 14px',
                    borderRadius: 999,
                    border: isActive('/wishlist')
                      ? '1.5px solid #12161C'
                      : '1.5px solid rgba(18,22,28,0.15)',
                    background: isActive('/wishlist')
                      ? '#12161C'
                      : 'rgba(255,255,255,0.85)',
                    color: isActive('/wishlist') ? '#FFFFFF' : '#12161C',
                    fontSize: 13.5,
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: isActive('/wishlist') ? '0 4px 14px rgba(18,22,28,0.18)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                  title="Saved Items"
                >
                  <Bookmark
                    size={15}
                    strokeWidth={2}
                    fill={isActive('/wishlist') ? '#FFFFFF' : wishlist.length > 0 ? '#12161C' : 'none'}
                    color={isActive('/wishlist') ? '#FFFFFF' : '#12161C'}
                  />
                  <span className="saved-text-label">Saved</span>
                  {wishlist.length > 0 && (
                    <span
                      style={{
                        minWidth: 19,
                        height: 19,
                        borderRadius: 10,
                        background: isActive('/wishlist') ? '#FFFFFF' : '#F1F1F8',
                        color: '#12161C',
                        fontSize: 11,
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 5px',
                      }}
                    >
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              )}

              {/* Cart Page Link — strictly logged-in users only (Customer & Admin) */}
              {isLoggedIn && (
                <Link
                  href="/cart"
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    minHeight: 38,
                    padding: '0 14px',
                    borderRadius: 999,
                    border: '1.5px solid rgba(18,22,28,0.15)',
                    background: totalCount > 0 ? '#12161C' : 'rgba(255,255,255,0.85)',
                    color: totalCount > 0 ? '#FFFFFF' : '#12161C',
                    fontSize: 13.5,
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: totalCount > 0 ? '0 4px 14px rgba(18,22,28,0.18)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                  title="View Shopping Cart"
                >
                  <span>🛒</span>
                  <span className="cart-text-label">Cart</span>
                  <span
                    style={{
                      minWidth: 19,
                      height: 19,
                      borderRadius: 10,
                      background: totalCount > 0 ? '#D4F56A' : '#F1F1F8',
                      color: totalCount > 0 ? '#12161C' : A,
                      fontSize: 11,
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 4px',
                    }}
                  >
                    {totalCount}
                  </span>
                </Link>
              )}

              {/* Admin Direct Shortcut Pill — Admin role only */}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    minHeight: 38,
                    padding: '0 14px',
                    borderRadius: 999,
                    background: 'linear-gradient(135deg, #5B3DF5 0%, #3B1FD0 100%)',
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(91, 61, 245, 0.28)',
                    transition: 'all 0.15s ease',
                  }}
                  title="Seller / Admin Dashboard"
                >
                  <span>📊</span>
                  <span className="admin-text-label">Dashboard</span>
                </Link>
              )}

              {/* User Menu OR Login/Register Links */}
              {currentUser ? (
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(prev => !prev)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      minHeight: 38,
                      padding: '0 12px 0 6px',
                      borderRadius: 999,
                      background: '#FFFFFF',
                      border: '1.5px solid rgba(18,22,28,0.12)',
                      boxShadow: '0 2px 10px rgba(18,22,28,0.06)',
                      cursor: 'pointer',
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: '#12161C',
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        background: `linear-gradient(135deg, ${A} 0%, #12161C 160%)`,
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="user-name-label">{currentUser.name}</span>
                    <span
                      style={{
                        fontSize: 9,
                        color: '#7E8794',
                        transform: userMenuOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        width: 250,
                        background: '#FFFFFF',
                        borderRadius: 20,
                        border: '1px solid rgba(18,22,28,0.08)',
                        boxShadow: '0 18px 48px rgba(18,22,28,0.18)',
                        padding: 8,
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <div
                        style={{
                          padding: '10px 12px 8px',
                          borderBottom: '1px solid #F0F0F4',
                          marginBottom: 4,
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: 14, color: '#12161C' }}>
                          {currentUser.name}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: '#7E8794',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {currentUser.email}
                        </div>
                        {isAdmin ? (
                          <span
                            style={{
                              display: 'inline-block',
                              marginTop: 4,
                              background: '#EEF0FD',
                              color: '#5B3DF5',
                              fontSize: 10.5,
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: 999,
                            }}
                          >
                            👑 Store Owner / Admin
                          </span>
                        ) : (
                          <span
                            style={{
                              display: 'inline-block',
                              marginTop: 4,
                              background: '#E8F8EE',
                              color: '#0D8A4E',
                              fontSize: 10.5,
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: 999,
                            }}
                          >
                            ✓ Verified Customer
                          </span>
                        )}
                      </div>

                      {/* Role Switcher Pills */}
                      <div style={{ padding: '8px 10px', background: '#F8F9FD', borderRadius: 12, margin: '4px 0 8px' }}>
                        <div style={{ fontSize: 10.5, fontWeight: 700, color: '#6B7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Switch Role:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
                          <button
                            type="button"
                            onClick={() => { setRole('guest'); setUserMenuOpen(false); }}
                            style={{
                              border: 'none',
                              background: userRole === 'guest' ? '#12161C' : '#FFFFFF',
                              color: userRole === 'guest' ? '#FFFFFF' : '#374151',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '5px 0',
                              borderRadius: 6,
                              cursor: 'pointer',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            }}
                            title="Log out and switch to visitor"
                          >
                            Guest
                          </button>
                          <button
                            type="button"
                            onClick={() => { setRole('customer'); setUserMenuOpen(false); }}
                            style={{
                              border: 'none',
                              background: userRole === 'customer' ? '#5B3DF5' : '#FFFFFF',
                              color: userRole === 'customer' ? '#FFFFFF' : '#374151',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '5px 0',
                              borderRadius: 6,
                              cursor: 'pointer',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            }}
                            title="Switch to customer mode"
                          >
                            Customer
                          </button>
                          <button
                            type="button"
                            onClick={() => { setRole('admin'); setUserMenuOpen(false); }}
                            style={{
                              border: 'none',
                              background: userRole === 'admin' ? '#D97706' : '#FFFFFF',
                              color: userRole === 'admin' ? '#FFFFFF' : '#374151',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '5px 0',
                              borderRadius: 6,
                              cursor: 'pointer',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            }}
                            title="Switch to store owner/admin mode"
                          >
                            Admin
                          </button>
                        </div>
                      </div>

                      <Link
                        href="/profile"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 12,
                          textDecoration: 'none',
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: '#12161C',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F6F6FB')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>👤</span> <span>Account Profile</span>
                      </Link>

                      <Link
                        href="/orders"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 12,
                          textDecoration: 'none',
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: '#12161C',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F6F6FB')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>📦</span> <span>My Orders</span>
                      </Link>

                      <Link
                        href="/wishlist"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 12,
                          textDecoration: 'none',
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: '#12161C',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F6F6FB')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Bookmark
                          size={16}
                          strokeWidth={2}
                          color="#12161C"
                          fill={wishlist.length > 0 ? '#12161C' : 'none'}
                        />
                        <span>Saved Items</span>
                        {wishlist.length > 0 && (
                          <span style={{ marginLeft: 'auto', background: '#F1F1F8', color: '#12161C', fontSize: 11, fontWeight: 800, padding: '1px 6px', borderRadius: 999 }}>{wishlist.length}</span>
                        )}
                      </Link>

                      <Link
                        href="/dashboard"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 12,
                          textDecoration: 'none',
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: '#12161C',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F6F6FB')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>📊</span> <span>Seller / Admin Dashboard</span>
                      </Link>

                      <Link
                        href="/faq"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 12,
                          textDecoration: 'none',
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: '#12161C',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F6F6FB')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>❓</span> <span>FAQ & Policies</span>
                      </Link>

                      <Link
                        href="/contact"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 12,
                          textDecoration: 'none',
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: '#12161C',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F6F6FB')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>💬</span> <span>Help & Support</span>
                      </Link>

                      <div style={{ height: 1, background: '#F0F0F4', margin: '4px 0' }} />

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentUser(null);
                          setUserMenuOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 12,
                          border: 'none',
                          background: 'transparent',
                          textAlign: 'left',
                          fontSize: 13,
                          fontWeight: 700,
                          color: '#EF4444',
                          cursor: 'pointer',
                          width: '100%',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#FEE2E2')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>🚪</span> <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Guest Action Buttons: ONLY Home Page, Log In & Sign Up */
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Link
                    href="/login"
                    className="sellio-guest-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: 38,
                      padding: '0 18px',
                      borderRadius: 999,
                      border: '1.5px solid rgba(18,22,28,0.18)',
                      background: '#FFF',
                      color: '#12161C',
                      fontSize: 13.5,
                      fontWeight: 700,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F6F6FB')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#FFF')}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="sellio-guest-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: 38,
                      padding: '0 18px',
                      borderRadius: 999,
                      background: '#5B3DF5',
                      border: '1.5px solid transparent',
                      color: '#FFFFFF',
                      fontSize: 13.5,
                      fontWeight: 800,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(91, 61, 245, 0.25)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#4A2CE0')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#5B3DF5')}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Hamburger Button — available for ALL users */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="sellio-mobile-toggle"
                aria-label="Toggle navigation menu"
                style={{
                  display: 'none',
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  border: '1px solid rgba(18,22,28,0.15)',
                  background: '#FFF',
                  color: '#12161C',
                  fontSize: 18,
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer / Dropdown */}
          {mobileMenuOpen && (
            <div
              style={{
                marginTop: 8,
                background: '#FFFFFF',
                borderRadius: 24,
                padding: '16px',
                border: '1px solid rgba(18,22,28,0.08)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {navLinks.map(link => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      padding: '11px 16px',
                      borderRadius: 14,
                      textDecoration: 'none',
                      color: active ? '#FFFFFF' : '#12161C',
                      background: active ? '#12161C' : '#F6F6FB',
                      fontWeight: active ? 800 : 700,
                      fontSize: 14.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{link.label}</span>
                    {active && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#D4F56A' }} />}
                  </Link>
                );
              })}

              {!isLoggedIn && (
                <div style={{ display: 'flex', gap: 8, marginTop: 4, paddingTop: 12, borderTop: '1px solid #F0F0F4' }}>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '10px 0',
                      borderRadius: 12,
                      background: '#F1F1F8',
                      color: '#12161C',
                      fontWeight: 700,
                      fontSize: 13.5,
                      textDecoration: 'none',
                    }}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '10px 0',
                      borderRadius: 12,
                      background: '#5B3DF5',
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: 13.5,
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(91,61,245,0.25)',
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Spacer for non-home pages so fixed navbar does not obscure page content */}
      {pathname && pathname !== '/' && (
        <div style={{ height: 80 }} aria-hidden="true" />
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -16px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (max-width: 860px) {
          .sellio-desktop-nav,
          .sellio-guest-nav {
            display: none !important;
          }
          .sellio-mobile-toggle {
            display: inline-flex !important;
          }
          .search-text-label, .saved-text-label, .cart-text-label, .user-name-label {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .sellio-guest-btn {
            padding: 0 12px !important;
            font-size: 12.5px !important;
          }
        }
      `}</style>

      {/* Auth Modal — inline, no page navigation needed */}
      <AuthModal
        isOpen={authOpen}
        initialMode={authMode}
        onClose={() => setAuthOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setAuthOpen(false);
        }}
      />
    </>
  );
}

