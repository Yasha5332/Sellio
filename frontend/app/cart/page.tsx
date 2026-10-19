'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, A } from '../../components/store-context';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQty, removeFromCart, clearCart, totalCount, totalPrice } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const FREE_SHIPPING_THRESHOLD = 50000;
  const deliveryFee = totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : 2500;
  const finalTotal = Math.max(0, totalPrice + deliveryFee - discount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SELLIO10') {
      const d = Math.round(totalPrice * 0.1);
      setDiscount(d);
      setPromoMsg({ type: 'ok', text: '10% discount voucher applied!' });
    } else if (code === 'FREESHIP') {
      setDiscount(2500);
      setPromoMsg({ type: 'ok', text: 'Free shipping voucher applied!' });
    } else {
      setPromoMsg({ type: 'err', text: 'Invalid promo code. Try SELLIO10' });
    }
  };

  const progressPercent = Math.min(100, Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100));

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
          <span style={{ color: '#12161C', fontWeight: 700 }}>Shopping Cart</span>
        </div>

        {/* Page Title */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 800,
                margin: '0 0 6px',
              }}
            >
              Your Shopping Cart
            </h1>
            <p style={{ color: '#6A7280', fontSize: 15, margin: 0 }}>
              Review your items, select quantities, and proceed to QR payment.
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                background: 'none',
                border: 'none',
                color: '#EF4444',
                fontSize: 13.5,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Clear Entire Cart 🗑️
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '80px 24px',
              textAlign: 'center',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 16 }}>🛍️</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Your cart is empty</h2>
            <p style={{ color: '#6A7280', maxWidth: 440, margin: '0 auto 28px', fontSize: 15, lineHeight: 1.5 }}>
              Looks like you haven&apos;t added any phone cases, chargers, or accessories yet. Explore our top picks today.
            </p>
            <Link
              href="/products"
              style={{
                display: 'inline-block',
                background: '#12161C',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(18,22,28,0.2)',
              }}
            >
              Start Shopping Now →
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 32,
              alignItems: 'start',
            }}
          >
            {/* Left: Cart items list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Free Shipping Progress Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 18,
                  padding: '16px 20px',
                  border: '1px solid rgba(18,22,28,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, fontSize: 13.5, fontWeight: 700 }}>
                  <span>
                    {totalPrice >= FREE_SHIPPING_THRESHOLD
                      ? '🎉 You unlocked Free Express Delivery!'
                      : `🚚 Add ${(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString()} Ks more for Free Delivery!`}
                  </span>
                  <span style={{ color: A }}>{progressPercent}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: '#F1F1F8', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${progressPercent}%`,
                      background: totalPrice >= FREE_SHIPPING_THRESHOLD ? '#10B981' : A,
                      borderRadius: 999,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 24,
                  border: '1px solid rgba(18,22,28,0.08)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ padding: '20px 24px 12px', borderBottom: '1px solid #F0F0F4', fontWeight: 800, fontSize: 16 }}>
                  Cart Items ({totalCount})
                </div>

                <div style={{ padding: '0 24px' }}>
                  {cart.map((item, index) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '20px 0',
                        borderBottom: index !== cart.length - 1 ? '1px solid #F0F0F4' : 'none',
                        flexWrap: 'wrap',
                      }}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: 72,
                            height: 72,
                            objectFit: 'cover',
                            borderRadius: 16,
                            background: '#F9FAFC',
                            border: '1px solid #E5E7EB',
                            flexShrink: 0,
                          }}
                        />
                      )}

                      <div style={{ flex: 1, minWidth: 200 }}>
                        <Link
                          href={`/products/${item.id}`}
                          style={{
                            fontWeight: 800,
                            fontSize: 16,
                            color: '#12161C',
                            textDecoration: 'none',
                            display: 'block',
                            marginBottom: 4,
                          }}
                        >
                          {item.name}
                        </Link>
                        <div style={{ fontSize: 13, color: '#6A7280', marginBottom: 6 }}>
                          Unit Price: {item.price.toLocaleString()} Ks
                        </div>
                        <div style={{ fontWeight: 800, color: A, fontSize: 16 }}>
                          {(item.price * item.qty).toLocaleString()} Ks
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1.5px solid #E5E7EB',
                            borderRadius: 999,
                            background: '#F9FAFC',
                            padding: '2px 6px',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, -1)}
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 14,
                              border: 'none',
                              background: 'transparent',
                              fontWeight: 700,
                              fontSize: 16,
                              cursor: 'pointer',
                            }}
                          >
                            −
                          </button>
                          <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 800, fontSize: 14 }}>
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, 1)}
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 14,
                              border: 'none',
                              background: 'transparent',
                              fontWeight: 700,
                              fontSize: 16,
                              cursor: 'pointer',
                            }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#9CA3AF',
                            fontSize: 18,
                            cursor: 'pointer',
                            padding: 4,
                          }}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 24,
                  padding: '28px',
                  border: '1px solid rgba(18,22,28,0.08)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                }}
              >
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 20px', color: '#12161C' }}>
                  Order Summary
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20, fontSize: 14.5 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
                    <span>Items Subtotal ({totalCount})</span>
                    <span style={{ fontWeight: 700, color: '#12161C' }}>{totalPrice.toLocaleString()} Ks</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
                    <span>Delivery Fee (Myanmar)</span>
                    <span style={{ fontWeight: 700, color: deliveryFee === 0 ? '#10B981' : '#12161C' }}>
                      {deliveryFee === 0 ? 'FREE' : `${deliveryFee.toLocaleString()} Ks`}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 700 }}>
                      <span>Voucher Discount</span>
                      <span>-{discount.toLocaleString()} Ks</span>
                    </div>
                  )}

                  <div style={{ height: 1, background: '#F0F0F4', margin: '8px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800 }}>
                    <span>Total Amount</span>
                    <span style={{ color: '#12161C' }}>{finalTotal.toLocaleString()} Ks</span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={applyPromo} style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. SELLIO10)"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 12,
                        border: '1.5px solid #E5E7EB',
                        fontSize: 13,
                        outline: 'none',
                        textTransform: 'uppercase',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '10px 16px',
                        borderRadius: 12,
                        border: 'none',
                        background: '#12161C',
                        color: '#FFF',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoMsg && (
                    <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: promoMsg.type === 'ok' ? '#10B981' : '#EF4444' }}>
                      {promoMsg.text}
                    </div>
                  )}
                </form>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={() => router.push('/checkout')}
                  style={{
                    width: '100%',
                    minHeight: 52,
                    borderRadius: 999,
                    border: 'none',
                    background: `linear-gradient(135deg, ${A} 0%, #12161C 160%)`,
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: 16,
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(75,59,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <span>→</span>
                </button>

                <div style={{ textAlign: 'center' }}>
                  <Link
                    href="/products"
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: '#6A7280',
                      textDecoration: 'none',
                    }}
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Guarantees Box */}
              <div
                style={{
                  background: '#F8F9FD',
                  borderRadius: 20,
                  padding: '20px',
                  border: '1px solid #ECECF4',
                  fontSize: 13,
                  color: '#4B5563',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>🔒</span>
                  <span>Instant KBZPay & WavePay QR code payment</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>📦</span>
                  <span>Doorstep delivery across all Myanmar townships</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>🛡️</span>
                  <span>7-day return policy on defective products</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
