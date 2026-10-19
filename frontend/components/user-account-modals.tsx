'use client';

import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

const A = '#4B3BFF';

// ─── TYPES ─────────────────────────────────────────────────────────────
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

export interface WishlistItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  categoryName: string;
  inStock?: boolean;
}

// ─── 1. ACCOUNT PROFILE MODAL ──────────────────────────────────────────
export function AccountProfileModal({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string; phone?: string; address?: string; township?: string };
  onUpdateUser: (u: { name: string; email: string; phone?: string; address?: string; township?: string }) => void;
}) {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '09-987654321');
  const [address, setAddress] = useState(user.address || 'No. 42, Inya Road, Kamayut');
  const [township, setTownship] = useState(user.township || 'Yangon');
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, email, phone, address, township });
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 900);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 260, background: 'rgba(12, 15, 21, 0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#FFF', borderRadius: 28, maxWidth: 500, width: '100%', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.28)' }}>
        {/* Header */}
        <div style={{ padding: '22px 26px 18px', borderBottom: '1px solid #F0F0F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(75,59,255,0.1)', color: A, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800 }}>
              👤
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#12161C' }}>Account Profile</h3>
              <p style={{ margin: 0, fontSize: 12.5, color: '#7E8794' }}>Manage your personal details & saved addresses</p>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#F4F4F8', width: 34, height: 34, borderRadius: 17, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#12161C' }}>✕</button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: '75vh', overflowY: 'auto' }}>
          {savedToast && (
            <div style={{ background: '#E8F8EE', color: '#0D8A4E', padding: '10px 14px', borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: 'center' }}>
              ✓ Profile changes saved successfully!
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 6 }}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box', minHeight: 44, borderRadius: 14, border: '1.5px solid #E2E4EC', padding: '0 14px', fontSize: 14.5, outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 6 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box', minHeight: 44, borderRadius: 14, border: '1.5px solid #E2E4EC', padding: '0 14px', fontSize: 14.5, outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 6 }}>Phone / Viber Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="09-xxxxxxxxx"
              style={{ width: '100%', boxSizing: 'border-box', minHeight: 44, borderRadius: 14, border: '1.5px solid #E2E4EC', padding: '0 14px', fontSize: 14.5, outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 6 }}>Default Delivery Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Street address, building, floor"
              style={{ width: '100%', boxSizing: 'border-box', borderRadius: 14, border: '1.5px solid #E2E4EC', padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4A525D', marginBottom: 6 }}>Township / City</label>
            <input
              type="text"
              value={township}
              onChange={e => setTownship(e.target.value)}
              placeholder="Yangon / Mandalay / Naypyidaw"
              style={{ width: '100%', boxSizing: 'border-box', minHeight: 44, borderRadius: 14, border: '1.5px solid #E2E4EC', padding: '0 14px', fontSize: 14.5, outline: 'none' }}
            />
          </div>

          <div style={{ background: '#F8F9FD', borderRadius: 16, padding: '14px 16px', border: '1px solid #ECEEF6' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#12161C', marginBottom: 6 }}>Security & Password</div>
            <p style={{ margin: '0 0 10px', fontSize: 12, color: '#7E8794' }}>Password protected with end-to-end Sellio token encryption.</p>
            <button
              type="button"
              onClick={() => alert('Password reset link sent to ' + email)}
              style={{ background: '#FFF', border: '1px solid #D0D4E4', borderRadius: 999, padding: '6px 14px', fontSize: 12.5, fontWeight: 700, color: '#12161C', cursor: 'pointer' }}
            >
              Request Password Reset
            </button>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, minHeight: 48, borderRadius: 999, border: '1.5px solid #D0D4E4', background: '#FFF', color: '#12161C', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ flex: 1.5, minHeight: 48, borderRadius: 999, border: 'none', background: `linear-gradient(135deg, ${A} 0%, #12161C 160%)`, color: '#FFF', fontWeight: 800, fontSize: 14.5, cursor: 'pointer', boxShadow: '0 6px 20px rgba(75,59,255,0.3)' }}
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── 2. MY ORDERS MODAL ────────────────────────────────────────────────
export function MyOrdersModal({
  isOpen,
  onClose,
  orders,
}: {
  isOpen: boolean;
  onClose: () => void;
  orders: UserOrder[];
}) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 260, background: 'rgba(12, 15, 21, 0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#FFF', borderRadius: 28, maxWidth: 640, width: '100%', maxHeight: '88vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.28)' }}>
        {/* Header */}
        <div style={{ padding: '22px 28px 18px', borderBottom: '1px solid #F0F0F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: 'rgba(75,59,255,0.1)', color: A, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>
              📦
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: '#12161C' }}>My Orders</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#7E8794' }}>Track packages, receipts, and order history</p>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#F4F4F8', width: 34, height: 34, borderRadius: 17, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#12161C' }}>✕</button>
        </div>

        {/* Orders list */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
              <h4 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 800, color: '#12161C' }}>No orders yet</h4>
              <p style={{ margin: 0, fontSize: 14, color: '#7E8794' }}>Browse our phone gear, pick your model, and checkout with QR code.</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} style={{ background: '#F9F9FD', borderRadius: 20, border: '1px solid #EAECEF', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingBottom: 12, borderBottom: '1px solid #ECEEF4' }}>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: 15, color: '#12161C', marginRight: 10 }}>Order #{order.id}</span>
                    <span style={{ fontSize: 12.5, color: '#8A94A3' }}>{order.date}</span>
                  </div>
                  <span style={{ background: order.statusColor || '#E8F8EE', color: order.status === 'Delivered' ? '#0D8A4E' : A, padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
                    ● {order.status}
                  </span>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {order.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {item.image && (
                          <img src={item.image} alt={item.name} style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
                        )}
                        <div>
                          <div style={{ fontWeight: 700, color: '#12161C' }}>{item.name}</div>
                          <div style={{ fontSize: 12, color: '#7E8794' }}>Qty: {item.qty} × {item.price.toLocaleString()} Ks</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 800, color: '#12161C' }}>{(item.price * item.qty).toLocaleString()} Ks</div>
                    </div>
                  ))}
                </div>

                {/* Footer details */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8, paddingTop: 10, borderTop: '1px dashed #DCDFEA', fontSize: 13 }}>
                  <div style={{ color: '#555E6B' }}>
                    <span>Paid via: <strong>{order.paymentMethod}</strong></span> • <span>Ship to: <strong>{order.shippingAddress}</strong></span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: A }}>
                    Total: {order.total.toLocaleString()} Ks
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 3. WISHLIST MODAL / DRAWER ─────────────────────────────────────────
export function WishlistModal({
  isOpen,
  onClose,
  items,
  onRemove,
  onAddToCart,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onAddToCart: (item: WishlistItem) => void;
}) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 260, background: 'rgba(12, 15, 21, 0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#FFF', borderRadius: 28, maxWidth: 560, width: '100%', maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.28)' }}>
        {/* Header */}
        <div style={{ padding: '20px 26px', borderBottom: '1px solid #F0F0F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: '#F4F4F8', color: '#12161C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bookmark size={18} strokeWidth={2} color="#12161C" fill={items.length > 0 ? '#12161C' : 'none'} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#12161C' }}>Saved Items</h3>
              <p style={{ margin: 0, fontSize: 12.5, color: '#7E8794' }}>{items.length} saved product{items.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#F4F4F8', width: 34, height: 34, borderRadius: 17, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#12161C' }}>✕</button>
        </div>

        {/* Wishlist Items */}
        <div style={{ flex: 1, padding: '20px 26px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#F1F3F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}
              >
                <Bookmark size={32} strokeWidth={1.75} color="#9CA3AF" fill="none" />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 800, color: '#12161C' }}>Your saved list is empty</h4>
              <p style={{ margin: 0, fontSize: 13.5, color: '#7E8794' }}>Click the bookmark icon on any accessory to save it for later.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderRadius: 18, background: '#F8F9FD', border: '1px solid #ECEEF6' }}>
                <img src={item.image} alt={item.name} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: 'uppercase' }}>{item.categoryName}</div>
                  <div style={{ fontWeight: 800, fontSize: 14.5, color: '#12161C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ fontWeight: 800, fontSize: 14, color: '#12161C' }}>{item.price.toLocaleString()} Ks</span>
                    {item.originalPrice && (
                      <span style={{ fontSize: 11.5, color: '#9AA2B1', textDecoration: 'line-through' }}>{item.originalPrice.toLocaleString()} Ks</span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => onAddToCart(item)}
                    style={{ background: '#12161C', color: '#FFF', border: 'none', padding: '7px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <span>+ Cart</span>
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    style={{ background: 'transparent', color: '#8A94A3', border: 'none', fontSize: 11.5, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 4. SELLER / ADMIN DASHBOARD MODAL ──────────────────────────────────
export function SellerDashboardModal({
  isOpen,
  onClose,
  totalProducts = 12,
}: {
  isOpen: boolean;
  onClose: () => void;
  totalProducts?: number;
}) {
  const [stockStatus, setStockStatus] = useState<Record<string, boolean>>({
    p1: true, p2: true, p3: true, p4: true, p5: true, p6: true,
  });

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 260, background: 'rgba(12, 15, 21, 0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#FFF', borderRadius: 28, maxWidth: 680, width: '100%', maxHeight: '88vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.28)' }}>
        {/* Header */}
        <div style={{ padding: '22px 28px', borderBottom: '1px solid #F0F0F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #12161C 0%, #1A202C 100%)', color: '#FFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: 'rgba(212,245,106,0.2)', color: '#D4F56A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              📊
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#FFF' }}>Seller & Store Dashboard</h3>
                <span style={{ background: '#D4F56A', color: '#12161C', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>Admin</span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: 12.5, color: '#A0AEC0' }}>Real-time inventory, orders & sales analytics</p>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'rgba(255,255,255,0.15)', width: 34, height: 34, borderRadius: 17, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
            <div style={{ background: '#F8F9FE', border: '1px solid #ECEEF6', borderRadius: 18, padding: 16 }}>
              <div style={{ fontSize: 12, color: '#7E8794', fontWeight: 600 }}>Total Revenue</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#12161C', marginTop: 4 }}>1,480,000 Ks</div>
              <div style={{ fontSize: 11, color: '#10B981', fontWeight: 700, marginTop: 4 }}>↑ +18% this week</div>
            </div>
            <div style={{ background: '#F8F9FE', border: '1px solid #ECEEF6', borderRadius: 18, padding: 16 }}>
              <div style={{ fontSize: 12, color: '#7E8794', fontWeight: 600 }}>Completed Orders</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#12161C', marginTop: 4 }}>38 Orders</div>
              <div style={{ fontSize: 11, color: A, fontWeight: 700, marginTop: 4 }}>100% QR Verified</div>
            </div>
            <div style={{ background: '#F8F9FE', border: '1px solid #ECEEF6', borderRadius: 18, padding: 16 }}>
              <div style={{ fontSize: 12, color: '#7E8794', fontWeight: 600 }}>Catalog Items</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#12161C', marginTop: 4 }}>{totalProducts} Items</div>
              <div style={{ fontSize: 11, color: '#10B981', fontWeight: 700, marginTop: 4 }}>Active in store</div>
            </div>
          </div>

          {/* Quick Inventory Controls */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#12161C' }}>Fast Inventory Stock Toggle</h4>
              <span style={{ fontSize: 12, color: '#7E8794' }}>Click to toggle live status</span>
            </div>

            <div style={{ border: '1px solid #ECEEF6', borderRadius: 16, overflow: 'hidden' }}>
              {[
                { id: 'p1', name: 'Ultra-Clear MagSafe Case', cat: 'Cases & Covers', price: '18,000 Ks' },
                { id: 'p2', name: '65W GaN Fast Charger & Cable', cat: 'Chargers & Cables', price: '28,000 Ks' },
                { id: 'p3', name: 'Pro ANC Wireless Earbuds', cat: 'Wireless Audio', price: '49,000 Ks' },
                { id: 'p4', name: '20,000mAh Magnetic Power Bank', cat: 'Power Banks', price: '42,000 Ks' },
                { id: 'p5', name: '9H HD Privacy Tempered Glass', cat: 'Screen Protectors', price: '12,000 Ks' },
              ].map(item => {
                const inStock = stockStatus[item.id] !== false;
                return (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #F0F2F8', background: '#FFF' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5, color: '#12161C' }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: '#7E8794' }}>{item.cat} • {item.price}</div>
                    </div>
                    <button
                      onClick={() => setStockStatus(prev => ({ ...prev, [item.id]: !inStock }))}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 999,
                        border: 'none',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: inStock ? '#E8F8EE' : '#FEE2E2',
                        color: inStock ? '#0D8A4E' : '#DC2626',
                      }}
                    >
                      {inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 5. FAQ & POLICIES MODAL ───────────────────────────────────────────
export function FaqPoliciesModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'faq' | 'shipping' | 'returns' | 'privacy'>('faq');

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 260, background: 'rgba(12, 15, 21, 0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#FFF', borderRadius: 28, maxWidth: 640, width: '100%', maxHeight: '88vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.28)' }}>
        {/* Header */}
        <div style={{ padding: '22px 28px 18px', borderBottom: '1px solid #F0F0F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: '#12161C' }}>Help, FAQ & Policies</h3>
            <p style={{ margin: '2px 0 0', fontSize: 12.5, color: '#7E8794' }}>Everything you need to know about shopping on Sellio</p>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#F4F4F8', width: 34, height: 34, borderRadius: 17, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#12161C' }}>✕</button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 24px', background: '#F8F9FD', borderBottom: '1px solid #ECEEF6', overflowX: 'auto' }}>
          {[
            { id: 'faq', label: 'Common FAQs' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'returns', label: 'Returns & Refunds' },
            { id: 'privacy', label: 'Privacy & Terms' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: 'none',
                background: activeTab === tab.id ? '#12161C' : 'transparent',
                color: activeTab === tab.id ? '#FFF' : '#555E6B',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div style={{ flex: 1, padding: 26, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14.5, color: '#374151', lineHeight: 1.6 }}>
          {activeTab === 'faq' && (
            <>
              <div style={{ background: '#F9FAFB', padding: '14px 18px', borderRadius: 16, border: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 6px', color: '#12161C', fontSize: 15, fontWeight: 800 }}>How do I pay with KBZPay or WavePay?</h4>
                <p style={{ margin: 0, color: '#4B5563' }}>At checkout, scan the official QR code using your banking or wallet app, make payment, and upload the screenshot. Our team verifies the transaction within minutes.</p>
              </div>
              <div style={{ background: '#F9FAFB', padding: '14px 18px', borderRadius: 16, border: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 6px', color: '#12161C', fontSize: 15, fontWeight: 800 }}>Can I order as a guest without logging in?</h4>
                <p style={{ margin: 0, color: '#4B5563' }}>Yes! Instant guest checkout is fully supported. However, creating an account lets you save addresses, track orders, and keep a wishlist.</p>
              </div>
              <div style={{ background: '#F9FAFB', padding: '14px 18px', borderRadius: 16, border: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 6px', color: '#12161C', fontSize: 15, fontWeight: 800 }}>Are cases and chargers authentic?</h4>
                <p style={{ margin: 0, color: '#4B5563' }}>100% authentic. All GaN chargers and MagSafe accessories undergo voltage surge and drop certifications before shipment.</p>
              </div>
            </>
          )}

          {activeTab === 'shipping' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#F9FAFB', padding: 18, borderRadius: 16, border: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 8px', color: '#12161C', fontSize: 15, fontWeight: 800 }}>🚚 Delivery Timelines</h4>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li><strong>Yangon Metropolitan:</strong> Same-day or next-day delivery via express courier.</li>
                  <li><strong>Mandalay & Naypyidaw:</strong> 1–2 business days.</li>
                  <li><strong>Other States & Regions:</strong> 2–4 business days via Royal Express or BPX.</li>
                </ul>
              </div>
              <div style={{ background: '#F9FAFB', padding: 18, borderRadius: 16, border: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 8px', color: '#12161C', fontSize: 15, fontWeight: 800 }}>📦 Delivery Fees</h4>
                <p style={{ margin: 0 }}>Standard delivery is 2,000 Ks. Orders over 50,000 Ks receive free nationwide shipping!</p>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#F9FAFB', padding: 18, borderRadius: 16, border: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 8px', color: '#12161C', fontSize: 15, fontWeight: 800 }}>7-Day Replacement Guarantee</h4>
                <p style={{ margin: 0 }}>If your case doesn&apos;t fit your phone model, or a cable/charger is defective upon unboxing, contact our Viber support within 7 days for a 1-to-1 immediate replacement.</p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#F9FAFB', padding: 18, borderRadius: 16, border: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 8px', color: '#12161C', fontSize: 15, fontWeight: 800 }}>Customer Privacy & Terms</h4>
                <p style={{ margin: '0 0 8px' }}>We respect your privacy. Phone numbers and delivery addresses are strictly used to dispatch your orders and contact you via Viber/Telegram for tracking updates.</p>
                <p style={{ margin: 0 }}>We do not sell, share, or store customer payment data. All QR payments go directly to verified store accounts.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 6. SEARCH MODAL WITH EMPTY STATE UI ────────────────────────────────
export function SearchModal({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  results,
  onSelectProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  results: any[];
  onSelectProduct: (p: any) => void;
}) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 260, background: 'rgba(12, 15, 21, 0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 16px 20px' }}>
      <div style={{ background: '#FFF', borderRadius: 28, maxWidth: 640, width: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.35)' }}>
        {/* Search Input Bar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F4', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18, color: '#8A94A3' }}>🔍</span>
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search cases, GaN chargers, MagSafe, power banks..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, fontWeight: 600, color: '#12161C', fontFamily: 'inherit' }}
          />
          {searchQuery && (
            <button onClick={() => onSearchChange('')} style={{ background: '#F1F1F6', border: 'none', borderRadius: 999, padding: '4px 8px', fontSize: 12, cursor: 'pointer', color: '#6A7280' }}>
              Clear
            </button>
          )}
          <button onClick={onClose} style={{ border: 'none', background: '#F4F4F8', width: 32, height: 32, borderRadius: 16, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#12161C' }}>✕</button>
        </div>

        {/* Results / Empty state */}
        <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px' }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🔎</div>
              <h4 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 800, color: '#12161C' }}>
                No accessories found {searchQuery ? `for "${searchQuery}"` : ''}
              </h4>
              <p style={{ margin: '0 0 20px', fontSize: 13.5, color: '#7E8794' }}>
                Try searching for phone models like &quot;iPhone 15&quot;, &quot;Samsung S24&quot;, or keywords like &quot;GaN&quot;, &quot;MagSafe&quot;, &quot;Privacy Glass&quot;.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {['Cases', 'Fast Chargers', 'MagSafe', 'Earbuds', 'Power Banks'].map(term => (
                  <button
                    key={term}
                    onClick={() => onSearchChange(term)}
                    style={{ background: '#F4F4F9', border: '1px solid #E2E4EC', borderRadius: 999, padding: '6px 14px', fontSize: 12.5, fontWeight: 600, color: '#12161C', cursor: 'pointer' }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#7E8794', textTransform: 'uppercase', marginBottom: 4 }}>
                Found {results.length} item{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((p: any) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 16, background: '#FBFBFE', border: '1px solid #ECEEF6', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F0F1FA')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#FBFBFE')}
                >
                  <img src={p.image} alt={p.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#12161C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#7E8794' }}>{p.categoryName} • ★ {p.rating}</div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: A }}>{p.price.toLocaleString()} Ks</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
