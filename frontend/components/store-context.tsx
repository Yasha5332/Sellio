'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export const A = '#4B3BFF';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  label?: string;
  image?: string;
}

export interface Product {
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

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

export interface UserOrder {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered' | 'Payment Verified';
  statusColor: string;
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

export type UserRole = 'guest' | 'customer' | 'admin';

export interface User {
  name: string;
  email: string;
  role?: UserRole;
  phone?: string;
  avatar?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  township: string;
}

export const CATEGORIES = [
  { id: 'all', title: 'All Gear', sub: 'Complete catalog', icon: '⚡', bg: '#F0F1FA' },
  { id: 'cases', title: 'Cases and covers', sub: 'Clear, matte and tough', icon: '📱', bg: 'linear-gradient(135deg,#FFEFEA 0%,#FFD5C8 100%)' },
  { id: 'chargers', title: 'Chargers and cables', sub: 'Fast GaN and heavy-duty', icon: '🔌', bg: 'linear-gradient(135deg,#FFF7D6 0%,#FFEAA0 100%)' },
  { id: 'banks', title: 'Power banks', sub: 'Magnetic and slim', icon: '🔋', bg: 'linear-gradient(135deg,#E6F7F2 0%,#BFEAD9 100%)' },
  { id: 'screens', title: 'Screen protectors', sub: 'HD and privacy glass', icon: '🛡️', bg: 'linear-gradient(135deg,#F4EDFB 0%,#DEC8F7 100%)' },
  { id: 'earbuds', title: 'Earbuds & audio', sub: 'Wireless and wired', icon: '🎧', bg: 'linear-gradient(135deg,#E9F0FB 0%,#B3CBF2 100%)' },
  { id: 'holders', title: 'Holders & stands', sub: 'Desk, car and bed', icon: '📐', bg: 'linear-gradient(135deg,#FFF0D9 0%,#FFCF8A 100%)' },
];

export const BRANDS = ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei', 'Other brands'];

export const INITIAL_PRODUCTS: Product[] = [
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

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (p: Product, qty?: number) => void;
  updateQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  wishlist: string[];
  toggleWishlist: (p: Product) => void;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  userRole: UserRole;
  setRole: (role: UserRole) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  orders: UserOrder[];
  addOrder: (order: UserOrder) => void;
  toast: string;
  setToast: (msg: string) => void;
  previewProduct: Product | null;
  setPreviewProduct: (p: Product | null) => void;
  chatOpen: boolean;
  setChatOpen: (o: boolean | ((prev: boolean) => boolean)) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const userRole: UserRole = currentUser?.role || (currentUser ? 'customer' : 'guest');

  const setRole = (role: UserRole) => {
    if (role === 'guest') {
      setCurrentUser(null);
      setToast('Switched to Guest mode (not logged in)');
    } else if (role === 'customer') {
      setCurrentUser({
        name: 'Aung Ko',
        email: 'aungko@sellio.customer',
        role: 'customer',
      });
      setToast('Switched to Logged-in Customer');
    } else if (role === 'admin') {
      setCurrentUser({
        name: 'Ko Htet (Owner)',
        email: 'owner@sellio.store',
        role: 'admin',
      });
      setToast('Switched to Store Owner / Admin');
    }
  };
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    township: '',
  });
  const [orders, setOrders] = useState<UserOrder[]>([
    {
      id: 'SLO-84291',
      date: 'Yesterday, 4:15 PM',
      status: 'In Transit',
      statusColor: '#FEF3C7',
      total: 35000,
      paymentMethod: 'KBZPay QR',
      shippingAddress: 'Kamayut, Yangon',
      items: [
        { id: 'p2', name: '65W GaN Fast Charger & Cable', price: 28000, qty: 1, image: '/products/fast-charger.jpg' },
      ],
    },
  ]);
  const [toast, setToastState] = useState('');
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const setToast = (msg: string) => {
    setToastState(msg);
    setTimeout(() => setToastState(''), 2400);
  };

  const addToCart = (p: Product, qty: number = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty, label: p.desc, image: p.image }];
    });
    setToast(`"${p.name}" added to cart`);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
    setToast('Item removed from cart');
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (p: Product) => {
    setWishlist(prev => {
      const exists = prev.includes(p.id);
      if (exists) {
        setToast(`Removed "${p.name}" from saved items`);
        return prev.filter(id => id !== p.id);
      } else {
        setToast(`Saved "${p.name}" to saved items`);
        return [...prev, p.id];
      }
    });
  };

  const addOrder = (order: UserOrder) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
    setToast(`Order #${order.id} placed successfully!`);
  };

  const totalCount = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalCount,
        totalPrice,
        wishlist,
        toggleWishlist,
        currentUser,
        setCurrentUser,
        userRole,
        setRole,
        userProfile,
        setUserProfile,
        orders,
        addOrder,
        toast,
        setToast,
        previewProduct,
        setPreviewProduct,
        chatOpen,
        setChatOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
