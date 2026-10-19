'use client';
// animations: intro (CSS keyframes) + scroll reveal (IntersectionObserver)

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import SellioLogo from '../components/sellio-logo';
import { Hero3DIllustration } from '../components/hero-3d-illustration';
import { AuthModal } from '../components/auth-modal';
import { useStore } from '../components/store-context';
import {
  AccountProfileModal,
  MyOrdersModal,
  WishlistModal,
  SellerDashboardModal,
  FaqPoliciesModal,
  SearchModal,
  UserOrder,
} from '../components/user-account-modals';
import { Bookmark } from 'lucide-react';

// ─── Accent token (matches {{accent}} = #4B3BFF from Main.dc.html) ───
const A = '#4B3BFF';

// ─── Cart & Product state types ─────────────────────────────────────────
interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  label?: string;
  image?: string;
}

interface Product {
  id: string;
  name: string;
  desc: string;
  price: number;
  originalPrice?: number;
  category: string;
  categoryName: string;
  tag?: string;
  badgeColor?: string;
  rating: number;
  reviews: number;
  image: string;
  compatibleBrands: string[];
  features?: string[];
}

// ─── SVG icons ─────────────────────────────────────────────────────────
const CartIcon = ({ stroke = 'currentColor' }: { stroke?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4h2.5l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2" />
    <circle cx="9.5" cy="19.5" r="1.4" />
    <circle cx="17" cy="19.5" r="1.4" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#12161C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={A} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12.5l3 3 5-6" />
  </svg>
);

// ─── Hero SVG (exact from Main.dc.html lines 73-108) ──────────────────
const HeroSVG = () => (
  <svg viewBox="0 0 520 520" width="100%" role="img"
    aria-label="Illustration of a phone in a gradient case with earbuds, a charger and a cable around it"
    style={{ display: 'block' }}>
    <defs>
      <radialGradient id="orb" cx="50%" cy="38%" r="62%">
        <stop offset="0" stopColor="#F2FFB8" />
        <stop offset="0.6" stopColor="#D4F56A" />
        <stop offset="1" stopColor="#9EE08A" />
      </radialGradient>
      <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFF" stopOpacity="0.45" />
        <stop offset="0.55" stopColor="#FFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.5" stopColor="#12161C" stopOpacity="0" />
        <stop offset="1" stopColor="#12161C" stopOpacity="0.35" />
      </linearGradient>
      <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#12161C" stopOpacity="0.28" />
        <stop offset="1" stopColor="#12161C" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="260" cy="272" r="214" fill="url(#orb)" />
    <circle cx="260" cy="272" r="214" fill="none" stroke="#FFF" strokeOpacity="0.6" strokeWidth="2" />
    <ellipse cx="270" cy="478" rx="150" ry="18" fill="url(#shadow)" />
    <rect x="172" y="66" width="196" height="392" rx="40" fill={A} />
    <rect x="172" y="66" width="196" height="392" rx="40" fill="url(#shade)" />
    <rect x="172" y="66" width="196" height="392" rx="40" fill="url(#sheen)" />
    <rect x="188" y="86" width="86" height="86" rx="24" fill="#12161C" />
    <circle cx="214" cy="112" r="14" fill="#2B3340" stroke="#8A94A3" strokeWidth="3" />
    <circle cx="248" cy="112" r="14" fill="#2B3340" stroke="#8A94A3" strokeWidth="3" />
    <circle cx="231" cy="146" r="14" fill="#2B3340" stroke="#8A94A3" strokeWidth="3" />
    <rect x="366" y="170" width="7" height="56" rx="3.5" fill="#12161C" />
    <rect x="236" y="330" width="96" height="14" rx="7" fill="#FFF" opacity="0.9" />
    <rect x="236" y="354" width="56" height="14" rx="7" fill="#FFF" opacity="0.55" />
    <g transform="rotate(-12 130 390)">
      <rect x="64" y="338" width="132" height="104" rx="42" fill="#FFF" stroke="#12161C" strokeWidth="5" />
      <line x1="64" y1="382" x2="196" y2="382" stroke="#12161C" strokeWidth="5" />
      <circle cx="130" cy="412" r="9" fill={A} />
    </g>
    <g transform="rotate(10 410 130)">
      <rect x="380" y="98" width="68" height="82" rx="16" fill="#12161C" />
      <rect x="395" y="76" width="9" height="26" rx="3" fill="#12161C" />
      <rect x="424" y="76" width="9" height="26" rx="3" fill="#12161C" />
      <polygon points="418,118 400,146 413,146 407,166 428,134 415,134" fill="#D4F56A" />
    </g>
    <path d="M424 178 C 440 250, 490 250, 460 330 S 360 430, 330 470"
      fill="none" stroke="#12161C" strokeWidth="8" strokeLinecap="round" />
    <rect x="318" y="462" width="30" height="16" rx="4" fill="#12161C" transform="rotate(-35 333 470)" />
    <circle cx="86" cy="150" r="7" fill="#12161C" />
    <circle cx="470" cy="420" r="9" fill={A} />
  </svg>
);

// ─── Category icon SVGs (exact from Main.dc.html) ─────────────────────
const categories = [
  {
    id: 'cases', title: 'Cases and covers', sub: 'Clear, rugged and slim',
    bg: 'linear-gradient(135deg,#EEECFF 0%,#C9C4FF 100%)',
    icon: <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#12161C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="12" y="5" width="24" height="38" rx="6" /><rect x="16" y="9" width="11" height="11" rx="3" /></svg>,
  },
  {
    id: 'screens', title: 'Screen protectors', sub: 'Glass and privacy films',
    bg: 'linear-gradient(135deg,#FFEBE0 0%,#FFB99B 100%)',
    icon: <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#12161C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="12" y="5" width="24" height="38" rx="5" /><rect x="16" y="10" width="16" height="28" rx="2" /><path d="M20 18 L27 11" /></svg>,
  },
  {
    id: 'chargers', title: 'Chargers and cables', sub: 'Wall plugs, USB-C, Lightning',
    bg: 'linear-gradient(135deg,#E4F8EE 0%,#9FE3BF 100%)',
    icon: <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#12161C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="14" width="16" height="16" rx="3" /><path d="M20 14V6M28 14V6" /><path d="M24 30v4c0 5-8 3-8 8" /></svg>,
  },
  {
    id: 'banks', title: 'Power banks', sub: 'Charge on the go',
    bg: 'linear-gradient(135deg,#F6FBD0 0%,#D4F56A 100%)',
    icon: <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#12161C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="10" y="11" width="28" height="30" rx="6" /><path d="M20 5h8" /><polygon points="26,17 19,28 24,28 22,36 30,25 25,25" /></svg>,
  },
  {
    id: 'earbuds', title: 'Earbuds and audio', sub: 'Wireless and wired',
    bg: 'linear-gradient(135deg,#E9F0FB 0%,#B3CBF2 100%)',
    icon: <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#12161C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="15" cy="14" r="6" /><path d="M15 20v14a3 3 0 0 0 6 0" /><circle cx="33" cy="14" r="6" /><path d="M33 20v14a3 3 0 0 1-6 0" /></svg>,
  },
  {
    id: 'holders', title: 'Holders and stands', sub: 'Desk, car and bed',
    bg: 'linear-gradient(135deg,#FFF0D9 0%,#FFCF8A 100%)',
    icon: <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#12161C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="15" y="5" width="18" height="30" rx="4" transform="rotate(10 24 20)" /><path d="M10 43H38" /></svg>,
  },
];

const brands = ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'];

// ─── Real Featured Products with Studio Photography ──────────────────
const products: Product[] = [
  {
    id: 'p1',
    name: 'Crystal Clear MagSafe Case',
    desc: 'Shockproof TPU with military-grade corner airbags & strong magnetic ring alignment.',
    price: 18000,
    originalPrice: 24000,
    category: 'cases',
    categoryName: 'Cases & Covers',
    tag: 'Best Seller',
    badgeColor: '#4B3BFF',
    rating: 4.9,
    reviews: 184,
    image: '/products/clear-case.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei'],
    features: ['Anti-yellowing UV barrier', 'Built-in N52 strong magnets', '10ft drop test certified', 'Raised camera bezel protection'],
  },
  {
    id: 'p2',
    name: '65W GaN Fast Charger & Cable',
    desc: 'Dual USB-C fast charging with heavy-duty tangle-free braided silicone cable.',
    price: 28000,
    originalPrice: 35000,
    category: 'chargers',
    categoryName: 'Chargers & Cables',
    tag: 'Fast Charging',
    badgeColor: '#FF6B4A',
    rating: 4.8,
    reviews: 142,
    image: '/products/fast-charger.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['GaN III temperature control', 'Dual port C1 + C2 charging', 'Braided silicone 1.5m cord included', 'Supports PD 3.0 & PPS fast protocols'],
  },
  {
    id: 'p3',
    name: 'Pro ANC Wireless Earbuds',
    desc: 'Active noise cancellation with rich bass & 32hr battery smart charging case.',
    price: 49000,
    originalPrice: 65000,
    category: 'earbuds',
    categoryName: 'Wireless Audio',
    tag: 'Top Audio',
    badgeColor: '#12161C',
    rating: 4.9,
    reviews: 218,
    image: '/products/wireless-earbuds.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['35dB Hybrid Active Noise Cancellation', '12mm bio-diaphragm drivers', '32-hour playback with fast-charge case', 'IPX5 sweat & water resistant'],
  },
  {
    id: 'p4',
    name: '20,000mAh Magnetic Power Bank',
    desc: 'Snap-on wireless charging with crisp LED real-time battery percentage display.',
    price: 42000,
    originalPrice: 52000,
    category: 'banks',
    categoryName: 'Power Banks',
    tag: 'Must Have',
    badgeColor: '#0EA5E9',
    rating: 4.8,
    reviews: 96,
    image: '/products/power-bank.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['Smart LED digital % display', '15W MagSafe snap-on wireless charging', '22.5W two-way fast USB-C input/output', 'Slim pocketable airplane-safe build'],
  },
  {
    id: 'p5',
    name: '9H HD Privacy Tempered Glass',
    desc: '28° anti-spy privacy shield with oleophobic fingerprint-resistant coating.',
    price: 12000,
    originalPrice: 16000,
    category: 'screens',
    categoryName: 'Screen Protectors',
    tag: 'Privacy Shield',
    badgeColor: '#10B981',
    rating: 4.7,
    reviews: 320,
    image: '/products/screen-protector.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['28-degree micro-louver privacy filter', '9H aerospace diamond hardness', 'Smooth silky oleophobic touch coating', 'Bubble-free auto alignment frame included'],
  },
  {
    id: 'p6',
    name: 'Aerospace Magnetic Desk Stand',
    desc: 'CNC-machined aluminum 360° rotating stand for desk, bedside, and workspace.',
    price: 25000,
    originalPrice: 32000,
    category: 'holders',
    categoryName: 'Stands & Mounts',
    tag: 'Premium Metal',
    badgeColor: '#8B5CF6',
    rating: 4.9,
    reviews: 75,
    image: '/products/mag-mount.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['Solid weighted anti-slip aluminum base', 'Dual-axis smooth 360° rotation', 'Ultra-strong magnetic ring grip', 'Folds flat for travel and pocket carry'],
  },
  {
    id: 'p7',
    name: 'Armor Shield Matte Shockproof Case',
    desc: 'Heavy-duty dual-layer bumper with textured anti-slip grip and camera shutter bezel.',
    price: 16000,
    originalPrice: 22000,
    category: 'cases',
    categoryName: 'Cases & Covers',
    tag: 'Heavy Duty',
    badgeColor: '#059669',
    rating: 4.8,
    reviews: 112,
    image: '/products/clear-case.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['Military-spec drop defense', 'Matte fingerprint-proof finish', 'Reinforced impact corners', 'Precision tactile volume buttons'],
  },
  {
    id: 'p8',
    name: '100W 4-Port GaN Desktop Charger',
    desc: 'Ultra-compact multiport charging station for phone, tablet, and laptop simultaneously.',
    price: 45000,
    originalPrice: 58000,
    category: 'chargers',
    categoryName: 'Chargers & Cables',
    tag: 'High Power',
    badgeColor: '#EA580C',
    rating: 4.9,
    reviews: 88,
    image: '/products/fast-charger.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['100W Max total power output', '3x USB-C + 1x USB-A ports', 'Intelligent power allocation chip', 'Fire-retardant PC casing'],
  },
  {
    id: 'p9',
    name: 'Studio Sport Wireless Earphones',
    desc: 'Comfort-fit ergonomic neckband with magnetic buds, low latency gaming mode & deep bass.',
    price: 32000,
    originalPrice: 42000,
    category: 'earbuds',
    categoryName: 'Wireless Audio',
    tag: 'Sport Edition',
    badgeColor: '#7C3AED',
    rating: 4.7,
    reviews: 134,
    image: '/products/wireless-earbuds.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['24-hour battery on single charge', 'IPX7 waterproof sweat resistance', 'Magnetic snap-to-pause earphones', 'Environmental noise reduction mic'],
  },
  {
    id: 'p10',
    name: '10,000mAh Ultra-Slim MagSafe Battery',
    desc: 'Pocket-sized featherlight wireless magnetic battery pack with fast pass-through charging.',
    price: 34000,
    originalPrice: 42000,
    category: 'banks',
    categoryName: 'Power Banks',
    tag: 'Ultra Slim',
    badgeColor: '#2563EB',
    rating: 4.8,
    reviews: 64,
    image: '/products/power-bank.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['Only 12mm thickness featherlight build', '15W wireless snap charging', 'LED power indicator dots', 'Foreign object automatic safety detection'],
  },
  {
    id: 'p11',
    name: 'Full Coverage Anti-Glare Diamond Glass',
    desc: 'Matte gaming finish eliminates outdoor reflections and sweat marks for ultra-smooth gaming.',
    price: 14000,
    originalPrice: 19000,
    category: 'screens',
    categoryName: 'Screen Protectors',
    tag: 'Matte Finish',
    badgeColor: '#4338CA',
    rating: 4.9,
    reviews: 190,
    image: '/products/screen-protector.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['Anti-reflective matte texture', 'Edge-to-edge curved 3D finish', 'Oil and fingerprint repellent', 'Zero touch latency for mobile gaming'],
  },
  {
    id: 'p12',
    name: '360° Magnetic Car Air Vent Mount',
    desc: 'Super-strong vacuum ring clamp with 360 ball-head rotation for bumpy roads and navigation.',
    price: 22000,
    originalPrice: 28000,
    category: 'holders',
    categoryName: 'Stands & Mounts',
    tag: 'Car Mount',
    badgeColor: '#D97706',
    rating: 4.8,
    reviews: 153,
    image: '/products/mag-mount.jpg',
    compatibleBrands: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'],
    features: ['Spiral twist lock vent hook', '20x N55 neodymium magnets', 'One-hand snap and release', 'Heat and vibration resistant alloy'],
  },
];

// ─── Cart Drawer ────────────────────────────────────────────────────────
function CartDrawer({
  open, onClose, items, onQty, onDel, onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onQty: (id: string, delta: number) => void;
  onDel: (id: string) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }}>
      <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{ width: 440, maxWidth: '92vw', background: '#FFF', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', boxShadow: '-12px 0 48px rgba(0,0,0,0.2)' }}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #F0F0F4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontWeight: 800, fontSize: 19 }}>Your Cart</span>
            <span style={{ background: '#F1F1F8', padding: '3px 10px', borderRadius: 999, fontSize: 13, fontWeight: 700, color: A }}>
              {totalItems} item{totalItems !== 1 ? 's' : ''}
            </span>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: 24, cursor: 'pointer', color: '#12161C' }}>×</button>
        </div>
        <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 60, padding: '0 20px' }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🛍️</div>
              <p style={{ fontWeight: 800, fontSize: 17, margin: '0 0 6px', color: '#12161C' }}>Your cart is empty</p>
              <p style={{ color: '#6A7280', fontSize: 14, margin: 0 }}>Explore our featured accessories and pick the right gear for your phone.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid #F0F0F4' }}>
                {item.image && (
                  <img src={item.image} alt={item.name} style={{ width: 62, height: 62, objectFit: 'cover', borderRadius: 14, border: '1px solid #EAEAEA', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: '#6A7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</div>
                  <div style={{ fontWeight: 800, marginTop: 4, color: A }}>{(item.price * item.qty).toLocaleString()} Ks</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <button onClick={() => onQty(item.id, -1)} style={{ width: 30, height: 30, borderRadius: 15, border: '1px solid #E0E0E8', background: '#F6F6FB', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>−</button>
                  <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 700 }}>{item.qty}</span>
                  <button onClick={() => onQty(item.id, 1)} style={{ width: 30, height: 30, borderRadius: 15, border: '1px solid #E0E0E8', background: '#F6F6FB', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>+</button>
                  <button onClick={() => onDel(item.id)} style={{ marginLeft: 4, border: 'none', background: 'none', color: '#aaa', fontSize: 18, cursor: 'pointer' }}>×</button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div style={{ padding: 24, borderTop: '1px solid #F0F0F4', background: '#FBFBFE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18, marginBottom: 16 }}>
              <span>Total</span><span style={{ color: '#12161C' }}>{total.toLocaleString()} Ks</span>
            </div>
            <button onClick={() => { onClose(); onCheckout(); }}
              style={{ width: '100%', minHeight: 52, borderRadius: 999, border: 'none', background: `linear-gradient(135deg,${A} 0%,#12161C 160%)`, color: '#FFF', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 8px 24px rgba(75,59,255,0.35)' }}>
              Proceed to QR Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QR Checkout & Order Confirmation Modal ────────────────────────────
function QrModal({
  open,
  onClose,
  total,
  count,
  cartItems,
  currentUser,
  onOrderConfirmed,
}: {
  open: boolean;
  onClose: () => void;
  total: number;
  count: number;
  cartItems: CartItem[];
  currentUser: { name: string; email: string } | null;
  onOrderConfirmed?: (order: UserOrder) => void;
}) {
  const [step, setStep] = useState<'shipping' | 'pay' | 'done'>('shipping');
  const [shippingName, setShippingName] = useState(currentUser?.name || 'Aung Ko');
  const [phone, setPhone] = useState('09-987654321');
  const [address, setAddress] = useState('No. 42, Inya Road, Kamayut');
  const [township, setTownship] = useState('Yangon');
  const [paymentMethod, setPaymentMethod] = useState<'KBZPay QR' | 'WavePay QR' | 'Cash on Delivery'>('KBZPay QR');
  const [confirmedOrder, setConfirmedOrder] = useState<UserOrder | null>(null);

  useEffect(() => {
    if (currentUser?.name) {
      setShippingName(currentUser.name);
    }
  }, [currentUser]);

  if (!open) return null;

  const finalizeOrder = () => {
    const orderId = 'SLO-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder: UserOrder = {
      id: orderId,
      date: 'Today, Just now',
      status: paymentMethod === 'Cash on Delivery' ? 'Processing' : 'Payment Verified',
      statusColor: paymentMethod === 'Cash on Delivery' ? '#FEF3C7' : '#E8F8EE',
      total,
      paymentMethod,
      shippingAddress: `${address}, ${township}`,
      items: cartItems.map(c => ({
        id: c.id,
        name: c.name,
        price: c.price,
        qty: c.qty,
        image: c.image,
      })),
    };
    setConfirmedOrder(newOrder);
    setStep('done');
    onOrderConfirmed?.(newOrder);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'Cash on Delivery') {
      finalizeOrder();
    } else {
      setStep('pay');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 250, background: 'rgba(0,0,0,0.68)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#FFF', borderRadius: 28, maxWidth: 480, width: '100%', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #F0F0F4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontWeight: 800, fontSize: 18, color: '#12161C' }}>
              {step === 'shipping' && 'Step 1 — Shipping & Payment'}
              {step === 'pay' && 'Step 2 — QR Scan & Verification'}
              {step === 'done' && 'Order Confirmation'}
            </span>
          </div>
          <button
            onClick={() => {
              setStep('shipping');
              onClose();
            }}
            style={{ border: 'none', background: '#F4F4F8', width: 32, height: 32, borderRadius: 16, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
        </div>

        {/* Step 1: Shipping Details */}
        {step === 'shipping' && (
          <form onSubmit={handleProceedToPayment} style={{ padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#F8F9FE', borderRadius: 16, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: '#7E8794', fontWeight: 600 }}>Order Summary ({count} item{count !== 1 ? 's' : ''})</div>
                <div style={{ fontWeight: 800, fontSize: 19, color: '#12161C' }}>{total.toLocaleString()} Ks</div>
              </div>
              <span style={{ background: '#E8F8EE', color: '#0D8A4E', fontSize: 11.5, fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>
                Free Delivery
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 5 }}>Recipient Name</label>
              <input
                required
                type="text"
                value={shippingName}
                onChange={e => setShippingName(e.target.value)}
                placeholder="Full Name"
                style={{ width: '100%', boxSizing: 'border-box', minHeight: 42, borderRadius: 12, border: '1.5px solid #E2E4EC', padding: '0 12px', fontSize: 14, outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 5 }}>Phone / Viber for Tracking</label>
              <input
                required
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="09-xxxxxxxxx"
                style={{ width: '100%', boxSizing: 'border-box', minHeight: 42, borderRadius: 12, border: '1.5px solid #E2E4EC', padding: '0 12px', fontSize: 14, outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 5 }}>Delivery Address</label>
                <input
                  required
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Street / Unit"
                  style={{ width: '100%', boxSizing: 'border-box', minHeight: 42, borderRadius: 12, border: '1.5px solid #E2E4EC', padding: '0 12px', fontSize: 14, outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 5 }}>City / Township</label>
                <input
                  required
                  type="text"
                  value={township}
                  onChange={e => setTownship(e.target.value)}
                  placeholder="Yangon"
                  style={{ width: '100%', boxSizing: 'border-box', minHeight: 42, borderRadius: 12, border: '1.5px solid #E2E4EC', padding: '0 12px', fontSize: 14, outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 6 }}>Payment Method</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { id: 'KBZPay QR', icon: '📱', desc: 'Scan KBZPay QR code instantly' },
                  { id: 'WavePay QR', icon: '⚡', desc: 'Scan WavePay QR code instantly' },
                  { id: 'Cash on Delivery', icon: '💵', desc: 'Pay courier in cash on delivery' },
                ].map(opt => (
                  <label
                    key={opt.id}
                    onClick={() => setPaymentMethod(opt.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 14px',
                      borderRadius: 14,
                      border: paymentMethod === opt.id ? `2px solid ${A}` : '1.5px solid #E2E4EC',
                      background: paymentMethod === opt.id ? 'rgba(75,59,255,0.04)' : '#FFF',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === opt.id}
                      onChange={() => setPaymentMethod(opt.id as any)}
                      style={{ accentColor: A }}
                    />
                    <span style={{ fontSize: 18 }}>{opt.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 13.5, color: '#12161C' }}>{opt.id}</div>
                      <div style={{ fontSize: 11.5, color: '#7E8794' }}>{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: 8,
                minHeight: 50,
                borderRadius: 999,
                border: 'none',
                background: `linear-gradient(135deg, ${A} 0%, #12161C 160%)`,
                color: '#FFF',
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(75,59,255,0.35)',
              }}
            >
              {paymentMethod === 'Cash on Delivery' ? 'Confirm Order (COD) →' : 'Continue to QR Payment →'}
            </button>
          </form>
        )}

        {/* Step 2: Pay QR */}
        {step === 'pay' && (
          <div style={{ padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#F8F9FE', borderRadius: 16, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: '#7E8794' }}>Total Payable</div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#12161C' }}>{total.toLocaleString()} Ks</div>
              </div>
              <span style={{ background: 'rgba(75,59,255,0.1)', color: A, fontSize: 12, fontWeight: 800, padding: '4px 10px', borderRadius: 999 }}>
                {paymentMethod}
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 170, height: 170, margin: '0 auto', border: '2px dashed #D0D0E0', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F9FF' }}>
                <svg viewBox="0 0 100 100" width="130" height="130" style={{ color: '#12161C' }}>
                  <rect x="10" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <rect x="15" y="15" width="20" height="20" fill="currentColor"/>
                  <rect x="60" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <rect x="65" y="15" width="20" height="20" fill="currentColor"/>
                  <rect x="10" y="60" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <rect x="15" y="65" width="20" height="20" fill="currentColor"/>
                  <rect x="60" y="60" width="10" height="10" fill="currentColor"/>
                  <rect x="75" y="60" width="10" height="10" fill="currentColor"/>
                  <rect x="60" y="75" width="10" height="10" fill="currentColor"/>
                  <rect x="75" y="75" width="15" height="15" fill={A}/>
                  <rect x="42" y="10" width="6" height="30" fill="currentColor"/>
                  <rect x="10" y="42" width="30" height="6" fill="currentColor"/>
                  <rect x="54" y="42" width="6" height="22" fill="currentColor"/>
                </svg>
              </div>
              <p style={{ fontSize: 13, color: '#4A525D', marginTop: 10 }}>Account: <strong>09-987654321</strong> (Sellio Official)</p>
            </div>

            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: A, marginBottom: 6 }}>Upload Payment Screenshot</div>
              <label style={{ display: 'block', border: '2px dashed #D0D0E0', borderRadius: 14, padding: '16px', textAlign: 'center', cursor: 'pointer', background: '#F9F9FF' }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} />
                <div style={{ fontSize: 13, color: '#4A525D' }}>📷 Click to attach screenshot receipt</div>
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => setStep('shipping')}
                style={{ flex: 1, minHeight: 48, borderRadius: 999, border: '1.5px solid #D0D4E4', background: '#FFF', color: '#12161C', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={finalizeOrder}
                style={{ flex: 2, minHeight: 48, borderRadius: 999, border: 'none', background: '#12161C', color: '#FFF', fontWeight: 800, fontSize: 14.5, cursor: 'pointer' }}
              >
                Confirm Payment & Submit
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 'done' && confirmedOrder && (
          <div style={{ padding: '32px 24px', textAlign: 'center', overflowY: 'auto' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 24, margin: '0 0 6px', color: '#12161C' }}>
              Order Confirmed!
            </h3>
            <div style={{ display: 'inline-block', background: 'rgba(75,59,255,0.08)', color: A, fontWeight: 800, fontSize: 14, padding: '4px 14px', borderRadius: 999, marginBottom: 16 }}>
              Order ID: #{confirmedOrder.id}
            </div>
            
            <p style={{ color: '#4A525D', fontSize: 14, lineHeight: 1.5, margin: '0 0 20px' }}>
              Thank you for ordering with Sellio! We have recorded your items and dispatched confirmation to your phone.
            </p>

            <div style={{ background: '#F8F9FE', borderRadius: 16, padding: '14px 16px', textAlign: 'left', marginBottom: 24, fontSize: 13, border: '1px solid #ECEEF6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#7E8794' }}>Payment Status:</span>
                <span style={{ fontWeight: 700, color: '#0D8A4E' }}>● {confirmedOrder.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#7E8794' }}>Delivery To:</span>
                <span style={{ fontWeight: 700, color: '#12161C' }}>{confirmedOrder.shippingAddress}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7E8794' }}>Total Amount:</span>
                <span style={{ fontWeight: 800, color: A }}>{confirmedOrder.total.toLocaleString()} Ks</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  setStep('shipping');
                  onClose();
                }}
                style={{ flex: 1, minHeight: 48, borderRadius: 999, border: 'none', background: '#12161C', color: '#FFF', fontWeight: 700, fontSize: 14.5, cursor: 'pointer' }}
              >
                Back to Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Quick Product Preview Modal ──────────────────────────────────────
function QuickPreviewModal({
  product,
  onClose,
  onInquire,
  onAdd,
  isWishlisted,
  onToggleWishlist,
}: {
  product: Product | null;
  onClose: () => void;
  onInquire?: (p: Product) => void;
  onAdd?: (p: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (p: Product) => void;
}) {
  if (!product) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 220, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#FFF', borderRadius: 28, maxWidth: 840, width: '100%', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Left: Product Photo */}
        <div style={{ flex: '1 1 360px', position: 'relative', background: '#F6F6FB', minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {product.tag && (
            <div style={{ position: 'absolute', top: 18, left: 18, background: product.badgeColor || A, color: '#FFF', fontSize: 12, fontWeight: 800, padding: '6px 14px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {product.tag}
            </div>
          )}
          {product.originalPrice && (
            <div style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(18,22,28,0.85)', backdropFilter: 'blur(6px)', color: '#D4F56A', fontSize: 12, fontWeight: 800, padding: '4px 10px', borderRadius: 999 }}>
              Save {(product.originalPrice - product.price).toLocaleString()} Ks
            </div>
          )}
        </div>

        {/* Right: Details & Action */}
        <div style={{ flex: '1 1 380px', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: A }}>
                {product.categoryName}
              </span>
              <button onClick={onClose} style={{ border: 'none', background: '#F1F1F6', width: 34, height: 34, borderRadius: 17, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#12161C' }}>✕</button>
            </div>

            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, margin: '0 0 10px', lineHeight: 1.2 }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B', fontWeight: 800, fontSize: 14 }}>
                <span>★</span>
                <span style={{ color: '#12161C' }}>{product.rating}</span>
              </div>
              <span style={{ color: '#8A94A3', fontSize: 14 }}>({product.reviews} reviews)</span>
              <span style={{ background: '#E6F9EF', color: '#10B981', fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>
                ✓ In Stock
              </span>
            </div>

            <p style={{ color: '#4A525D', fontSize: 15, lineHeight: 1.5, margin: '0 0 20px' }}>
              {product.desc}
            </p>

            {/* Feature Highlights */}
            {product.features && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8A94A3', marginBottom: 8 }}>Highlights</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
                  {product.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#2B3340', fontWeight: 500 }}>
                      <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compatible brands */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8A94A3', marginBottom: 8 }}>Compatible With</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {product.compatibleBrands.map(b => (
                  <span key={b} style={{ fontSize: 12, fontWeight: 600, background: '#F4F4F9', padding: '4px 10px', borderRadius: 999, color: '#2B3340' }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#12161C' }}>
                {product.price.toLocaleString()} Ks
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: 16, color: '#8A94A3', textDecoration: 'line-through', fontWeight: 600 }}>
                  {product.originalPrice.toLocaleString()} Ks
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {onToggleWishlist && (
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  style={{ minHeight: 48, width: 48, borderRadius: 24, border: isWishlisted ? '1.5px solid #12161C' : '1.5px solid #E2E4EC', background: isWishlisted ? '#F4F4F8' : '#FFF', color: '#12161C', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease' }}
                  title={isWishlisted ? 'Remove from Saved Items' : 'Save for Later'}
                >
                  <Bookmark
                    size={20}
                    strokeWidth={2}
                    fill={isWishlisted ? '#12161C' : 'none'}
                    color="#12161C"
                  />
                </button>
              )}
              <button
                onClick={onClose}
                style={{ flex: 1, minHeight: 48, borderRadius: 999, border: '1.5px solid #12161C', background: '#FFF', color: '#12161C', fontWeight: 700, fontSize: 14.5, cursor: 'pointer' }}
              >
                Close
              </button>
              {onAdd && (
                <button
                  onClick={() => {
                    onAdd(product);
                    onClose();
                  }}
                  style={{ flex: 1.2, minHeight: 48, borderRadius: 999, border: 'none', background: '#D4F56A', color: '#12161C', fontWeight: 800, fontSize: 14.5, cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <span>🛒 Add to Cart</span>
                </button>
              )}
              <button
                onClick={() => {
                  onClose();
                  onInquire?.(product);
                }}
                style={{ flex: 1.2, minHeight: 48, borderRadius: 999, border: 'none', background: `linear-gradient(135deg,${A} 0%,#12161C 160%)`, color: '#FFF', fontWeight: 700, fontSize: 14.5, cursor: 'pointer', boxShadow: `0 8px 20px color-mix(in srgb,${A} 35%,transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <span>Ask 💬</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────
export default function Page() {
  const {
    cart,
    addToCart: storeAddToCart,
    updateQty,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
    wishlist,
    toggleWishlist,
    currentUser,
    setCurrentUser,
    userProfile,
    setUserProfile,
    orders,
    addOrder,
    toast,
    setToast,
  } = useStore();

  const [cartOpen, setCartOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' }>({ open: false, mode: 'login' });

  // Logged-in & Store Feature Modals
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMsgs, setChatMsgs] = useState<{from:'bot'|'user';text:string}[]>([
    { from: 'bot', text: 'Hi! 👋 How can I help you today?' },
  ]);

  const sendMsg = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { from: 'user' as const, text: text.trim() };
    const t = text.toLowerCase();
    let reply = "I'll pass your message to our team. We usually reply within a few hours!";
    if (t.includes('pay') || t.includes('qr'))  reply = 'You can pay by scanning our QR code at checkout. Send a screenshot of the receipt and we\'ll confirm your order.';
    else if (t.includes('ship') || t.includes('deliver')) reply = 'We deliver within 1–3 business days across Myanmar. You\'ll get tracking once verified.';
    else if (t.includes('return') || t.includes('refund')) reply = 'We accept returns within 7 days of delivery. Contact us with your order details to get started.';
    else if (t.includes('case') || t.includes('cover'))  reply = 'We carry clear MagSafe and shockproof cases for iPhone, Samsung, Xiaomi & more!';
    else if (t.includes('charger') || t.includes('cable')) reply = 'We stock 65W GaN dual chargers and braided cables with high heat resistance.';
    else if (t.includes('price') || t.includes('cost'))  reply = 'Prices are listed directly on our Featured section with real-time discounts. Any specific item you want?';
    setChatMsgs(prev => [...prev, userMsg, { from: 'bot', text: reply }]);
    setChatInput('');
  };

  const FAQS = ['How do I pay?', 'Shipping time?', 'Return policy', 'What cases do you have?'];

  const addToCart = (p: Product) => {
    storeAddToCart(p, 1);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1300);
  };

  // Scroll smoothly to the featured products section
  const scrollToFeatured = () => {
    const el = document.getElementById('featured');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle brand selection
  const handleBrandSelect = (brand: string | null) => {
    setActiveBrand(prev => (prev === brand ? null : brand));
    setCurrentPage(1);
    scrollToFeatured();
  };

  // Toggle category selection
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(prev => (prev === catId ? 'all' : catId));
    setCurrentPage(1);
    scrollToFeatured();
  };

  // ── Filtered & Sorted Products Catalog ────────────────────────────────
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Filter by active brand
    if (activeBrand) {
      list = list.filter(p => p.compatibleBrands.includes(activeBrand) || p.compatibleBrands.includes('Other brands'));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.compatibleBrands.some(b => b.toLowerCase().includes(q)) ||
        (p.features && p.features.some(f => f.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, activeBrand, searchQuery, sortBy]);

  const PAGE_SIZE = 8;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const W = 1200; // max container width

  // ── Scroll reveal observer ──────────────────────────────────────────
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ width: '100%', background: '#F6F6FB', fontFamily: "'Manrope','Noto Sans Myanmar',system-ui,sans-serif", color: '#12161C', lineHeight: 1.5, overflowX: 'hidden' }}>

      {/* ── Animation styles ── */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* ── Intro animations ── */
        .intro-nav  { animation: slideDown   0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .intro-1    { animation: fadeSlideUp 0.65s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .intro-2    { animation: fadeSlideUp 0.7s  cubic-bezier(0.16,1,0.3,1) 0.28s both; }
        .intro-3    { animation: fadeSlideUp 0.7s  cubic-bezier(0.16,1,0.3,1) 0.42s both; }
        .intro-4    { animation: fadeSlideUp 0.7s  cubic-bezier(0.16,1,0.3,1) 0.56s both; }
        .intro-5    { animation: fadeSlideUp 0.7s  cubic-bezier(0.16,1,0.3,1) 0.70s both; }
        .intro-img  { /* Entrance handled smoothly by Hero3DIllustration */ }
        /* ── Scroll reveal ── */
        [data-reveal] {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
        [data-reveal][data-delay='1'] { transition-delay: 0.10s; }
        [data-reveal][data-delay='2'] { transition-delay: 0.20s; }
        [data-reveal][data-delay='3'] { transition-delay: 0.30s; }
        [data-reveal][data-delay='4'] { transition-delay: 0.40s; }
        [data-reveal][data-delay='5'] { transition-delay: 0.50s; }
        [data-reveal][data-delay='6'] { transition-delay: 0.60s; }
        /* scale variant for CTA card */
        [data-reveal='scale'] {
          transform: translateY(24px) scale(0.96);
        }
        [data-reveal='scale'].is-visible { transform: translateY(0) scale(1); }

        /* ── Product Card Modern Entrance & Hover Effects ── */
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .product-card {
          animation: cardFadeIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
          transition: transform 0.32s cubic-bezier(0.16,1,0.3,1), box-shadow 0.32s cubic-bezier(0.16,1,0.3,1) !important;
        }
        .product-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 48px rgba(40,30,120,0.12) !important;
        }
        .product-card:hover .product-img {
          transform: scale(1.08) !important;
        }
        .product-card:hover .quick-view-overlay {
          opacity: 1 !important;
        }
        .product-card:hover .quick-view-btn {
          transform: translateY(0) !important;
        }
      `}</style>

      {/* ── Fixed Navbar with Role-Based Controls ── */}
      <Navbar />

      {/* ── Announcement bar + Hero wrapper ── */}
      {/* 80px top padding offsets the fixed navbar height */}
      <div id="top" style={{ paddingTop: 80, background: `radial-gradient(60% 55% at 12% 8%,color-mix(in srgb,${A} 26%,transparent) 0%,transparent 70%),radial-gradient(50% 50% at 92% 18%,rgba(212,245,106,0.65) 0%,transparent 70%),radial-gradient(55% 50% at 75% 95%,rgba(255,150,120,0.35) 0%,transparent 70%),linear-gradient(180deg,#F3F2FF 0%,#F6F6FB 100%)` }}>

        {/* Hero */}
        <div style={{ maxWidth: W, margin: '0 auto', padding: '48px 24px 96px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40 }}>
          {/* Left */}
          <div style={{ flex: '1 1 460px', minWidth: 0 }}>
            {/* Pill */}
            <div className="intro-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(18,22,28,0.08)', fontWeight: 700, fontSize: 14, padding: '7px 16px 7px 12px', borderRadius: 999, marginBottom: 24, boxShadow: '0 4px 14px rgba(40,30,120,0.08)' }}>
              <span style={{ width: 10, height: 10, borderRadius: 5, background: 'linear-gradient(135deg,#D4F56A,#7BD88F)', flexShrink: 0 }} />
              Phone accessories and more
            </div>
            {/* H1 */}
            <h1 className="intro-2" style={{ margin: '0 0 20px', fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(42px,6.4vw,80px)', lineHeight: 1.0, letterSpacing: '-0.035em' }}>
              Everything your phone needs,{' '}
              <span style={{ backgroundImage: `linear-gradient(90deg,${A} 0%,#FF6B4A 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: A }}>
                in one place.
              </span>
            </h1>
            {/* Subhead */}
            <p className="intro-3" style={{ margin: '0 0 32px', fontSize: 19, color: '#4A525D', maxWidth: 520 }}>
              Cases, screen protectors, chargers, cables, power banks and earbuds. Pick your phone, pick your style, pay with a QR code.
            </p>
            {/* CTAs */}
            <div className="intro-4" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <a
                href="#featured"
                className="hero-primary-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  minHeight: 56,
                  padding: '0 34px',
                  borderRadius: 999,
                  background: `linear-gradient(135deg,${A} 0%,#12161C 160%)`,
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 16,
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  boxShadow: `0 12px 28px color-mix(in srgb,${A} 40%,transparent)`,
                }}
              >
                <span>Explore Now</span>
                <span style={{ fontSize: 17, transform: 'translateY(1px)' }}>↓</span>
              </a>

              <a
                href="#categories"
                className="hero-secondary-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  minHeight: 56,
                  padding: '0 28px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1.5px solid rgba(18,22,28,0.12)',
                  color: '#12161C',
                  fontWeight: 700,
                  fontSize: 15.5,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(18,22,28,0.06)',
                  transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <span style={{ fontSize: 16 }}>🏷️</span>
                <span>Browse Categories</span>
                <span style={{ fontSize: 13, color: '#7E8794', fontWeight: 600 }}>→</span>
              </a>

              {currentUser && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    minHeight: 46,
                    padding: '0 18px',
                    borderRadius: 999,
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(18,22,28,0.1)',
                    boxShadow: '0 2px 10px rgba(18,22,28,0.04)',
                    fontSize: 13.5,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                  <span style={{ fontWeight: 700, color: '#12161C' }}>
                    Welcome back, {currentUser.name}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Guest Ordering Note */}
            <div className="intro-4" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30, fontSize: 13, color: '#6A7280', fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }} />
                Instant KBZPay & Wave QR checkout
              </span>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span style={{ color: '#555E6B' }}>Fast 1–3 day delivery across Myanmar</span>
            </div>
            {/* Trust */}
            <div className="intro-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px', fontSize: 15, fontWeight: 600, color: '#2B323B' }}>
              {['Pay by QR code', 'Match to your phone', 'Track your order'].map(t => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle /> {t}
                </span>
              ))}
            </div>
          </div>
          {/* Right illustration */}
          <div className="intro-img" style={{ flex: '1 1 340px', minWidth: 0, maxWidth: 520, margin: '0 auto' }}>
            <Hero3DIllustration accentColor={A} />
          </div>
        </div>
      </div>

      {/* ── Shop by phone ── */}
      <div style={{ background: 'linear-gradient(180deg,#F6F6FB 0%,#FFF 100%)' }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: '28px 24px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 15, marginRight: 8, color: '#12161C' }}>Shop by phone:</span>
          {brands.map(b => (
            <button key={b} onClick={() => handleBrandSelect(b)}
              style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 20px', borderRadius: 999, background: activeBrand === b ? '#12161C' : '#FFF', color: activeBrand === b ? '#FFF' : '#12161C', border: `1.5px solid ${activeBrand === b ? '#12161C' : 'rgba(18,22,28,0.1)'}`, boxShadow: activeBrand === b ? '0 6px 18px rgba(18,22,28,0.2)' : '0 4px 12px rgba(40,30,120,0.06)', fontWeight: 700, fontSize: 14.5, cursor: 'pointer', transition: 'all 0.15s ease' }}>
              {b} {activeBrand === b && '✓'}
            </button>
          ))}
          {activeBrand && (
            <button onClick={() => handleBrandSelect(null)} style={{ background: 'none', border: 'none', color: '#8A94A3', fontSize: 13, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
              Clear brand filter
            </button>
          )}
        </div>
      </div>

      {/* ── Categories ── */}
      <div id="categories" style={{ background: `radial-gradient(50% 40% at 100% 0%,color-mix(in srgb,${A} 12%,transparent) 0%,transparent 70%),linear-gradient(180deg,#FFF 0%,#F6F6FB 100%)` }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: '80px 24px 88px', boxSizing: 'border-box' }}>
          <div data-reveal style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: A, marginBottom: 12 }}>Categories</div>
          <h2 data-reveal data-delay="1" style={{ margin: '0 0 40px', fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(32px,4.6vw,56px)', lineHeight: 1.04, letterSpacing: '-0.03em', maxWidth: 640 }}>
            Find the right gear for your phone.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {categories.map((cat, i) => (
              <div key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                data-reveal data-delay={String(Math.min(i + 1, 6))}
                style={{ flex: '1 1 340px', minWidth: 0, boxSizing: 'border-box', background: selectedCategory === cat.id ? '#FFFFFF' : 'rgba(255,255,255,0.85)', border: selectedCategory === cat.id ? `2px solid ${A}` : '1px solid rgba(18,22,28,0.06)', borderRadius: 28, padding: 26, display: 'flex', alignItems: 'center', gap: 20, color: '#12161C', boxShadow: selectedCategory === cat.id ? `0 18px 44px color-mix(in srgb,${A} 15%,transparent)` : '0 14px 36px rgba(40,30,120,0.08)', cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)' }}>
                <span style={{ flexShrink: 0, width: 72, height: 72, borderRadius: 22, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cat.icon}
                </span>
                <span style={{ display: 'block', flex: '1 1 auto', minWidth: 0 }}>
                  <span style={{ display: 'block', fontWeight: 800, fontSize: 19 }}>{cat.title}</span>
                  <span style={{ display: 'block', fontSize: 15, color: '#4A525D' }}>{cat.sub}</span>
                </span>
                <ArrowIcon />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Products Catalog (Categories, Filters, Sorting, Search & Pagination) ── */}
      <div id="products" style={{ background: 'radial-gradient(45% 40% at 0% 100%,rgba(212,245,106,0.3) 0%,transparent 70%),linear-gradient(180deg,#F6F6FB 0%,#FFF 35%,#F3F2FF 100%)' }}>
        <span id="featured" style={{ position: 'relative', top: -85, display: 'block', visibility: 'hidden' }} />
        <div style={{ maxWidth: W, margin: '0 auto', padding: '88px 24px', boxSizing: 'border-box' }}>
          
          {/* Section Header & Description */}
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 40px' }}>
            <div data-reveal style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: A, marginBottom: 12 }}>
              Product Catalog
            </div>
            <h2 data-reveal data-delay="1" style={{ margin: 0, fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(32px,4.6vw,54px)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#12161C' }}>
              Find your gear. Filter & explore.
            </h2>
            <p data-reveal data-delay="2" style={{ margin: '14px 0 0', color: '#555E6B', fontSize: 16.5, lineHeight: 1.6 }}>
              High-grade authentic phone accessories with fast delivery across Myanmar and instant KBZPay / Wave QR checkout.
            </p>
          </div>

          {/* Filter Bar: Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
            {[
              { id: 'all', label: 'All Products' },
              { id: 'cases', label: 'Cases & Covers' },
              { id: 'chargers', label: 'Chargers & Cables' },
              { id: 'earbuds', label: 'Wireless Audio' },
              { id: 'banks', label: 'Power Banks' },
              { id: 'screens', label: 'Screen Protectors' },
              { id: 'holders', label: 'Stands & Mounts' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: 40,
                  padding: '0 18px',
                  borderRadius: 999,
                  border: selectedCategory === cat.id ? `1.5px solid ${A}` : '1.5px solid rgba(18,22,28,0.1)',
                  background: selectedCategory === cat.id ? A : '#FFFFFF',
                  color: selectedCategory === cat.id ? '#FFFFFF' : '#12161C',
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: 'pointer',
                  boxShadow: selectedCategory === cat.id ? `0 6px 18px color-mix(in srgb,${A} 30%,transparent)` : '0 2px 8px rgba(18,22,28,0.03)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search, Sort & Active Filters Toolbar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 28, background: '#FFFFFF', padding: '12px 18px', borderRadius: 20, border: '1px solid rgba(18,22,28,0.08)', boxShadow: '0 4px 16px rgba(18,22,28,0.04)' }}>
            
            {/* Search input in catalog */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '1 1 260px' }}>
              <span style={{ fontSize: 16, color: '#8A94A3' }}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search by keyword, phone model..."
                style={{ border: 'none', outline: 'none', fontSize: 14, fontWeight: 600, color: '#12161C', width: '100%', fontFamily: 'inherit' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: '#F1F1F6', border: 'none', borderRadius: 999, padding: '2px 8px', fontSize: 12, cursor: 'pointer', color: '#6A7280' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & Brand Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              {activeBrand && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#12161C', color: '#FFF', padding: '4px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 700 }}>
                  <span>{activeBrand}</span>
                  <button onClick={() => setActiveBrand(null)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: 0, fontSize: 12 }}>✕</button>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#7E8794', fontWeight: 600 }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}
                  style={{ minHeight: 36, padding: '0 12px', borderRadius: 12, border: '1.5px solid #E2E4EC', background: '#F8F9FD', fontSize: 13, fontWeight: 700, color: '#12161C', cursor: 'pointer', outline: 'none' }}
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>

              <span style={{ fontSize: 13, color: '#8A94A3', fontWeight: 600 }}>
                {filteredProducts.length} items
              </span>
            </div>
          </div>

          {/* Empty-State UI */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', background: '#FFFFFF', borderRadius: 24, border: '1px solid rgba(18,22,28,0.06)', boxShadow: '0 8px 24px rgba(18,22,28,0.04)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔎</div>
              <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, margin: '0 0 8px', color: '#12161C' }}>
                No accessories found
              </h3>
              <p style={{ color: '#555E6B', fontSize: 15, maxWidth: 440, margin: '0 auto 24px' }}>
                We couldn&apos;t find any items matching your current filters. Try searching with another keyword or reset filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveBrand(null);
                  setSearchQuery('');
                  setSortBy('featured');
                  setCurrentPage(1);
                }}
                style={{
                  minHeight: 46,
                  padding: '0 26px',
                  borderRadius: 999,
                  border: 'none',
                  background: '#12161C',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(18,22,28,0.15)',
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            /* Products Showcase Grid */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
              {paginatedProducts.map((p) => {
                const isAdded = addedId === p.id;
                const isWishlisted = wishlist.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="modern-product-card"
                    onClick={() => setPreviewProduct(p)}
                    style={{
                      boxSizing: 'border-box',
                      background: '#FFFFFF',
                      border: '1px solid rgba(18, 22, 28, 0.08)',
                      borderRadius: 22,
                      padding: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 20px rgba(18, 22, 28, 0.04)',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    {/* Framed Image Container */}
                    <div
                      style={{
                        height: 230,
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 16,
                        background: '#F5F6FA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="card-product-img"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />

                      {/* Tag badge (e.g. Best Seller) */}
                      {p.tag && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            zIndex: 2,
                            background: 'rgba(18, 22, 28, 0.88)',
                            backdropFilter: 'blur(8px)',
                            color: '#FFFFFF',
                            fontSize: 10.5,
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: 999,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {p.tag}
                        </div>
                      )}

                      {/* Saved items bookmark button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(p);
                        }}
                        aria-label={`Save ${p.name} to saved items`}
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: p.originalPrice ? 62 : 10,
                          zIndex: 3,
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          background: 'rgba(255, 255, 255, 0.92)',
                          backdropFilter: 'blur(6px)',
                          border: isWishlisted ? '1px solid #12161C' : '1px solid rgba(18,22,28,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                          transition: 'transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        title={isWishlisted ? "Remove from saved items" : "Save item"}
                      >
                        <Bookmark
                          size={15}
                          strokeWidth={2}
                          fill={isWishlisted ? '#12161C' : 'none'}
                          color={isWishlisted ? '#12161C' : '#4B5563'}
                        />
                      </button>

                      {/* Subtle Discount badge */}
                      {p.originalPrice && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 2,
                            background: '#E8F8EE',
                            color: '#0D8A4E',
                            fontSize: 10.5,
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: 999,
                          }}
                        >
                          -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>

                    {/* Clean Card Info */}
                    <div
                      style={{
                        padding: '14px 6px 4px',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        {/* Eyebrow: Category & Star Rating */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.06em',
                              color: '#8A94A3',
                            }}
                          >
                            {p.categoryName}
                          </span>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 3,
                              fontSize: 12,
                              fontWeight: 700,
                              color: '#12161C',
                            }}
                          >
                            <span style={{ color: '#F59E0B' }}>★</span>
                            <span>{p.rating}</span>
                          </div>
                        </div>

                        {/* Product Name */}
                        <h3
                          style={{
                            margin: '0 0 16px',
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontWeight: 800,
                            fontSize: 16.5,
                            color: '#12161C',
                            lineHeight: 1.3,
                            letterSpacing: '-0.01em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={p.name}
                        >
                          {p.name}
                        </h3>
                      </div>

                      {/* Bottom Row: Price & Modern Pill Add Button */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: 8,
                          borderTop: '1px solid rgba(18, 22, 28, 0.05)',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span
                            style={{
                              fontWeight: 800,
                              fontSize: 17,
                              color: '#12161C',
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {p.price.toLocaleString()} Ks
                          </span>
                          {p.originalPrice && (
                            <span
                              style={{
                                fontSize: 11.5,
                                color: '#9AA2B1',
                                textDecoration: 'line-through',
                                fontWeight: 600,
                                marginTop: -1,
                              }}
                            >
                              {p.originalPrice.toLocaleString()} Ks
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          className="modern-add-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p);
                          }}
                          aria-label={`Add ${p.name} to cart`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            height: 36,
                            padding: '0 16px',
                            borderRadius: 999,
                            border: 'none',
                            background: isAdded ? '#10B981' : '#12161C',
                            color: '#FFFFFF',
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: 'pointer',
                            boxShadow: isAdded
                              ? '0 4px 14px rgba(16,185,129,0.35)'
                              : '0 2px 8px rgba(18,22,28,0.12)',
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        >
                          {isAdded ? (
                            <>
                              <span style={{ fontSize: 13 }}>✓</span>
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1 }}>+</span>
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 40 }}>
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  scrollToFeatured();
                }}
                style={{
                  minHeight: 40,
                  padding: '0 18px',
                  borderRadius: 999,
                  border: '1.5px solid #E2E4EC',
                  background: currentPage === 1 ? '#F4F4F9' : '#FFFFFF',
                  color: currentPage === 1 ? '#A0AEC0' : '#12161C',
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      scrollToFeatured();
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      border: isActive ? `1.5px solid ${A}` : '1.5px solid #E2E4EC',
                      background: isActive ? A : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#12161C',
                      fontWeight: 800,
                      fontSize: 13.5,
                      cursor: 'pointer',
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  scrollToFeatured();
                }}
                style={{
                  minHeight: 40,
                  padding: '0 18px',
                  borderRadius: 999,
                  border: '1.5px solid #E2E4EC',
                  background: currentPage === totalPages ? '#F4F4F9' : '#FFFFFF',
                  color: currentPage === totalPages ? '#A0AEC0' : '#12161C',
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                }}
              >
                Next →
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ── How it works ── */}
      <div id="how" style={{ background: `radial-gradient(55% 60% at 10% 0%,color-mix(in srgb,${A} 55%,transparent) 0%,transparent 70%),radial-gradient(45% 50% at 100% 100%,rgba(212,245,106,0.22) 0%,transparent 70%),#0C0F15`, color: '#F2F3EF' }}>
        <span id="how-it-works" style={{ position: 'relative', top: -85, display: 'block', visibility: 'hidden' }} />
        <div style={{ maxWidth: W, margin: '0 auto', padding: '96px 24px', boxSizing: 'border-box' }}>
          <div data-reveal style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D4F56A', marginBottom: 12 }}>How it works</div>
          <h2 data-reveal data-delay="1" style={{ margin: '0 0 48px', fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(32px,4.6vw,56px)', lineHeight: 1.04, letterSpacing: '-0.03em', maxWidth: 640, color: '#FFF' }}>
            Order in four simple steps.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {[
              { n: '1', t: 'Pick your items', d: 'Choose your phone brand, then add cases, chargers and more to your cart.' },
              { n: '2', t: 'Scan the QR code', d: "At checkout you see the shop's payment QR code. Pay with your banking or wallet app." },
              { n: '3', t: 'Upload your receipt', d: 'Send a screenshot of your payment receipt so the shop can check it.' },
              { n: '4', t: 'Order confirmed', d: 'The shop approves your payment and you can follow your order status.' },
            ].map((s, i) => (
              <div key={s.n} data-reveal data-delay={String(i + 1)}
                style={{ flex: '1 1 220px', minWidth: 0, boxSizing: 'border-box', padding: 28, borderRadius: 28, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 56, lineHeight: 1, marginBottom: 14, backgroundImage: 'linear-gradient(135deg,#D4F56A,#7BE3B0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#D4F56A' }}>
                  {s.n}
                </div>
                <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, color: '#FFF' }}>{s.t}</div>
                <div style={{ fontSize: 16, color: '#C3C9D3' }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Card ── */}
      <div style={{ background: 'linear-gradient(180deg,#0C0F15 0%,#0C0F15 100%)' }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: '0 24px 80px', boxSizing: 'border-box' }}>
          <div data-reveal="scale"
            style={{ borderRadius: 40, padding: '64px 48px', boxSizing: 'border-box', background: `radial-gradient(40% 90% at 100% 0%,rgba(212,245,106,0.55) 0%,transparent 70%),radial-gradient(40% 80% at 60% 120%,rgba(255,107,74,0.55) 0%,transparent 70%),linear-gradient(120deg,${A} 0%,#12161C 160%)`, color: '#FFF', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 28, border: '1px solid rgba(255,255,255,0.18)' }}>
            <div style={{ flex: '1 1 440px', minWidth: 0 }}>
              <h2 style={{ margin: '0 0 12px', fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(32px,4.6vw,56px)', lineHeight: 1.04, letterSpacing: '-0.03em', color: '#FFF' }}>
                Ready to upgrade your phone?
              </h2>
              <p style={{ margin: 0, fontSize: 18, color: '#FFF', maxWidth: 520 }}>
                Browse the full range and get your accessories today.
              </p>
            </div>
            <a href="#featured" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 58, padding: '0 36px', borderRadius: 999, background: '#D4F56A', color: '#12161C', fontWeight: 800, fontSize: 17, boxShadow: '0 14px 32px rgba(0,0,0,0.25)', whiteSpace: 'nowrap' }}>
              Start shopping
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div id="contact" style={{ background: 'linear-gradient(180deg,#0C0F15 0%,#07090D 100%)', color: '#F2F3EF' }}>
        <span id="about" style={{ position: 'relative', top: -85, display: 'block', visibility: 'hidden' }} />
        <div style={{ maxWidth: W, margin: '0 auto', padding: '48px 24px 32px', boxSizing: 'border-box', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 48px', marginBottom: 48 }}>
            <div style={{ flex: '2 1 280px', minWidth: 0 }}>
              <div style={{ marginBottom: 14 }}>
                <SellioLogo variant="kinetic-s" size={34} subtitle="Mobile" wordmarkColor="#F2F3EF" subtitleColor="#8A94A3" />
              </div>
              <div style={{ fontSize: 15, color: '#B7BEC9', maxWidth: 320 }}>Phone accessories and phone-related items, ordered online and paid by QR code.</div>
            </div>
            <div style={{ flex: '1 1 160px', minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D4F56A', marginBottom: 14 }}>Shop</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
                <a href="#categories" style={{ color: '#F2F3EF' }}>Cases and covers</a>
                <a href="#categories" style={{ color: '#F2F3EF' }}>Chargers and cables</a>
                <a href="#categories" style={{ color: '#F2F3EF' }}>Earbuds and audio</a>
                <a href="#categories" style={{ color: '#F2F3EF' }}>Power banks</a>
              </div>
            </div>
            <div style={{ flex: '1 1 160px', minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D4F56A', marginBottom: 14 }}>Help</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
                <a href="#how" style={{ color: '#F2F3EF' }}>How to order</a>
                <button onClick={() => setQrOpen(true)} style={{ background: 'none', border: 'none', color: '#F2F3EF', padding: 0, fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>Paying by QR code</button>
                <a href="#contact" style={{ color: '#F2F3EF' }}>Contact us</a>
              </div>
            </div>
            <div style={{ flex: '1 1 220px', minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D4F56A', marginBottom: 14 }}>Contact</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15, color: '#B7BEC9' }}>
                <span>[PHONE / VIBER]</span>
                <span>[EMAIL]</span>
                <span>[SHOP ADDRESS]</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, fontSize: 14, color: '#B7BEC9', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 }}>
            <span>Demo store. Products and prices are samples.</span>
            <span>Built with Sellio</span>
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 300, background: '#12161C', color: '#FFF', padding: '12px 22px', borderRadius: 999, fontSize: 14, fontWeight: 600, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: '#D4F56A', flexShrink: 0 }} />
          {toast}
        </div>
      )}

      {/* ── Cart Drawer ── */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onQty={updateQty}
        onDel={removeFromCart}
        onCheckout={() => setQrOpen(true)}
      />

      {/* ── QR & Checkout Modal ── */}
      <QrModal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        total={totalPrice}
        count={totalCount}
        cartItems={cart}
        currentUser={currentUser}
        onOrderConfirmed={(order) => {
          addOrder(order);
          setToast(`Order #${order.id} confirmed!`);
          setTimeout(() => setToast(''), 3000);
        }}
      />

      {/* ── Quick Product Preview Modal ── */}
      <QuickPreviewModal
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
        onAdd={addToCart}
        isWishlisted={previewProduct ? wishlist.includes(previewProduct.id) : false}
        onToggleWishlist={p => toggleWishlist(p)}
        onInquire={p => {
          setPreviewProduct(null);
          setChatOpen(true);
          sendMsg(`Hi! I'd like to ask about the ${p.name}`);
        }}
      />

      {/* ── Auth Modal (Login / Register / Guest) ── */}
      <AuthModal
        isOpen={authModal.open}
        initialMode={authModal.mode}
        onClose={() => setAuthModal(prev => ({ ...prev, open: false }))}
        onSuccess={u => {
          setCurrentUser(u);
          setUserProfile(prev => ({ ...prev, name: u.name, email: u.email }));
          setToast(`Welcome, ${u.name}!`);
          setTimeout(() => setToast(''), 2500);
        }}
      />

      {/* ── User Account Modals ── */}
      <AccountProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={userProfile}
        onUpdateUser={u => {
          setUserProfile(prev => ({
            name: u.name,
            email: u.email,
            phone: u.phone || prev.phone,
            address: u.address || prev.address,
            township: u.township || prev.township,
          }));
          setCurrentUser(prev => prev ? { ...prev, name: u.name, email: u.email } : { name: u.name, email: u.email });
          setToast('Profile updated');
          setTimeout(() => setToast(''), 2000);
        }}
      />

      <MyOrdersModal
        isOpen={ordersModalOpen}
        onClose={() => setOrdersModalOpen(false)}
        orders={orders}
      />

      <WishlistModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
        items={products.filter(p => wishlist.includes(p.id))}
        onRemove={id => {
          const found = products.find(p => p.id === id);
          if (found) toggleWishlist(found);
        }}
        onAddToCart={p => {
          addToCart(p as any);
          setToast(`"${p.name}" added to cart`);
        }}
      />

      <SellerDashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
        totalProducts={products.length}
      />

      <FaqPoliciesModal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        results={filteredProducts}
        onSelectProduct={p => setPreviewProduct(p)}
      />
      {/* ── Support Chat Widget ── */}
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 250, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
        {/* Chat panel */}
        {chatOpen && (
          <div style={{ width: 340, borderRadius: 24, overflow: 'hidden', background: '#FFF', boxShadow: '0 24px 64px rgba(18,22,28,0.22)', border: '1px solid rgba(18,22,28,0.08)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg,${A} 0%,#12161C 160%)`, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#FFF' }}>Sellio Support</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 3, background: '#D4F56A', display: 'inline-block' }} />
                    Online now
                  </div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)}
                style={{ width: 30, height: 30, borderRadius: 15, border: 'none', background: 'rgba(255,255,255,0.15)', color: '#FFF', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
            {/* Messages */}
            <div style={{ flex: 1, padding: '16px 16px 8px', maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chatMsgs.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%', padding: '10px 14px', borderRadius: m.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: m.from === 'user' ? `linear-gradient(135deg,${A},#2A2270)` : '#F6F6FB',
                    color: m.from === 'user' ? '#FFF' : '#12161C',
                    fontSize: 14, fontWeight: 500, lineHeight: 1.5,
                  }}>{m.text}</div>
                </div>
              ))}
            </div>
            {/* Quick FAQ chips */}
            <div style={{ padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {FAQS.map(q => (
                <button key={q} onClick={() => sendMsg(q)}
                  style={{ fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 999, border: `1.5px solid ${A}`, background: 'transparent', color: A, cursor: 'pointer' }}>
                  {q}
                </button>
              ))}
            </div>
            {/* Input */}
            <div style={{ padding: '10px 12px 14px', borderTop: '1px solid #F0F0F4', display: 'flex', gap: 8 }}>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg(chatInput)}
                placeholder="Type a message..."
                style={{ flex: 1, minHeight: 40, borderRadius: 999, border: '1.5px solid #E0E0E8', padding: '0 16px', fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#F9F9FF' }}
              />
              <button onClick={() => sendMsg(chatInput)}
                style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: `linear-gradient(135deg,${A},#12161C)`, color: '#FFF', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                ↑
              </button>
            </div>
          </div>
        )}
        {/* FAB toggle button */}
        <button
          onClick={() => setChatOpen(o => !o)}
          aria-label="Open support chat"
          style={{ width: 58, height: 58, borderRadius: 29, border: 'none', background: `linear-gradient(135deg,${A} 0%,#12161C 160%)`, color: '#FFF', fontSize: 26, cursor: 'pointer', boxShadow: `0 8px 28px color-mix(in srgb,${A} 50%,rgba(0,0,0,0.3))`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {chatOpen ? '✕' : '💬'}
        </button>
      </div>

    </div>
  );
}
