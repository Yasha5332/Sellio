'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, UserOrder, A } from '../../components/store-context';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart, userProfile, addOrder } = useStore();

  const [name, setName] = useState(userProfile.name || 'Aung Ko');
  const [phone, setPhone] = useState(userProfile.phone || '09-987654321');
  const [address, setAddress] = useState(userProfile.address || 'No. 42, Inya Road');
  const [township, setTownship] = useState(userProfile.township || 'Kamayut, Yangon');
  const [note, setNote] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'kbz' | 'wave' | 'cod'>('kbz');
  const [txnLast4, setTxnLast4] = useState('');
  const [slipUploaded, setSlipUploaded] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<UserOrder | null>(null);

  const deliveryFee = totalPrice >= 50000 || totalPrice === 0 ? 0 : 2500;
  const finalTotal = totalPrice + deliveryFee;

  // Townships in Myanmar
  const TOWNSHIPS = [
    'Kamayut, Yangon',
    'Bahan, Yangon',
    'Sanchaung, Yangon',
    'Hlaing, Yangon',
    'Mayangone, Yangon',
    'Yankin, Yangon',
    'Tamwe, Yangon',
    'Downtown (Kyauktada), Yangon',
    'Chanayethazan, Mandalay',
    'Mahaaungmye, Mandalay',
    'Pyin Oo Lwin',
    'Naypyitaw',
    'Taunggyi',
    'Bago',
    'Mawlamyine',
  ];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `SLO-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: UserOrder = {
      id: orderId,
      date: 'Just now',
      status: paymentMethod === 'cod' ? 'Processing' : 'Payment Verified',
      statusColor: paymentMethod === 'cod' ? '#FEF3C7' : '#DCFCE7',
      total: finalTotal,
      shippingAddress: `${address}, ${township}`,
      paymentMethod:
        paymentMethod === 'kbz'
          ? 'KBZPay QR'
          : paymentMethod === 'wave'
          ? 'WavePay QR'
          : 'Cash On Delivery',
      items: cart.length > 0
        ? cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, image: i.image }))
        : [{ id: 'p1', name: 'Crystal Clear MagSafe Case', price: 18000, qty: 1 }],
    };

    addOrder(newOrder);
    setConfirmedOrder(newOrder);
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

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 20 }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/cart" style={{ color: '#6A7280', textDecoration: 'none' }}>Cart</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>Checkout</span>
        </div>

        {confirmedOrder ? (
          /* Confirmation Success View */
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 28,
              padding: '48px 32px',
              border: '1px solid rgba(18,22,28,0.08)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
              maxWidth: 680,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                background: '#DCFCE7',
                color: '#10B981',
                fontSize: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              ✓
            </div>

            <span
              style={{
                display: 'inline-block',
                background: '#F1F1F8',
                color: A,
                padding: '4px 12px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              ORDER #{confirmedOrder.id}
            </span>

            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(26px, 3.5vw, 34px)',
                fontWeight: 800,
                margin: '0 0 12px',
                color: '#12161C',
              }}
            >
              Order Placed Successfully!
            </h1>

            <p style={{ color: '#4B5563', fontSize: 15, lineHeight: 1.6, maxWidth: 520, margin: '0 auto 28px' }}>
              Thank you for ordering with Sellio. We have received your order and payment info. Your items are being packed for express courier dispatch.
            </p>

            {/* Order Details Card */}
            <div
              style={{
                background: '#F8F9FD',
                borderRadius: 20,
                padding: '24px',
                textAlign: 'left',
                border: '1px solid #ECECF4',
                marginBottom: 32,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
                <span style={{ color: '#6A7280' }}>Total Paid:</span>
                <strong style={{ color: '#12161C' }}>{confirmedOrder.total.toLocaleString()} Ks</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
                <span style={{ color: '#6A7280' }}>Payment Method:</span>
                <strong style={{ color: '#12161C' }}>{confirmedOrder.paymentMethod}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
                <span style={{ color: '#6A7280' }}>Shipping Destination:</span>
                <strong style={{ color: '#12161C' }}>{confirmedOrder.shippingAddress}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#6A7280' }}>Estimated Delivery:</span>
                <strong style={{ color: '#059669' }}>Within 1–2 business days</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/orders"
                style={{
                  padding: '14px 28px',
                  borderRadius: 999,
                  background: '#12161C',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                Track In My Orders →
              </Link>
              <Link
                href="/"
                style={{
                  padding: '14px 24px',
                  borderRadius: 999,
                  background: '#F1F1F8',
                  color: '#12161C',
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 800,
                margin: '0 0 8px',
              }}
            >
              Checkout & Payment
            </h1>
            <p style={{ color: '#6A7280', fontSize: 15, margin: '0 0 32px' }}>
              Enter your shipping details and select your Myanmar payment method.
            </p>

            <form onSubmit={handlePlaceOrder}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 32,
                  alignItems: 'start',
                }}
              >
                {/* Left Side: Shipping & Payment Method */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {/* Shipping Details Card */}
                  <div
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 24,
                      padding: '28px',
                      border: '1px solid rgba(18,22,28,0.08)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                      <span style={{ fontSize: 20 }}>📍</span>
                      <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>1. Shipping Details</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                          Recipient Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
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
                          Phone Number (for Courier) *
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
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                        Township / City *
                      </label>
                      <select
                        value={township}
                        onChange={e => setTownship(e.target.value)}
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
                        {TOWNSHIPS.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                        Street Address & Building No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="e.g. No. 42, 3rd Floor, Inya Road"
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
                        Delivery Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="e.g. Leave with security desk, call before arrival"
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
                  </div>

                  {/* Payment Method Card */}
                  <div
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 24,
                      padding: '28px',
                      border: '1px solid rgba(18,22,28,0.08)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                      <span style={{ fontSize: 20 }}>💳</span>
                      <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>2. Payment Method</h2>
                    </div>

                    {/* Method Radio Selectors */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('kbz')}
                        style={{
                          padding: '16px 12px',
                          borderRadius: 16,
                          border: paymentMethod === 'kbz' ? `2px solid ${A}` : '1.5px solid #E5E7EB',
                          background: paymentMethod === 'kbz' ? '#F0F1FA' : '#FFF',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span style={{ fontSize: 22 }}>🔵</span>
                        <span style={{ fontWeight: 800, fontSize: 13, color: paymentMethod === 'kbz' ? A : '#12161C' }}>
                          KBZPay QR
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('wave')}
                        style={{
                          padding: '16px 12px',
                          borderRadius: 16,
                          border: paymentMethod === 'wave' ? '2px solid #F59E0B' : '1.5px solid #E5E7EB',
                          background: paymentMethod === 'wave' ? '#FEF3C7' : '#FFF',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span style={{ fontSize: 22 }}>🟡</span>
                        <span style={{ fontWeight: 800, fontSize: 13, color: paymentMethod === 'wave' ? '#D97706' : '#12161C' }}>
                          WavePay QR
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        style={{
                          padding: '16px 12px',
                          borderRadius: 16,
                          border: paymentMethod === 'cod' ? '2px solid #12161C' : '1.5px solid #E5E7EB',
                          background: paymentMethod === 'cod' ? '#F3F4F6' : '#FFF',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span style={{ fontSize: 22 }}>💵</span>
                        <span style={{ fontWeight: 800, fontSize: 13, color: '#12161C' }}>
                          Cash on Delivery
                        </span>
                      </button>
                    </div>

                    {/* QR Payment View */}
                    {(paymentMethod === 'kbz' || paymentMethod === 'wave') && (
                      <div
                        style={{
                          background: '#F8F9FD',
                          borderRadius: 20,
                          padding: '24px',
                          border: '1px solid #ECECF4',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>
                          Scan with your {paymentMethod === 'kbz' ? 'KBZPay' : 'WavePay'} App
                        </div>
                        <p style={{ color: '#6A7280', fontSize: 13, margin: '0 auto 16px', maxWidth: 360 }}>
                          Scan the merchant QR code below to pay the exact amount of <strong>{finalTotal.toLocaleString()} Ks</strong>.
                        </p>

                        {/* Interactive QR Simulation Box */}
                        <div
                          style={{
                            width: 180,
                            height: 180,
                            margin: '0 auto 16px',
                            background: '#FFFFFF',
                            borderRadius: 16,
                            border: '2px dashed #CBD5E1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                          }}
                        >
                          <div style={{ fontSize: 44, marginBottom: 6 }}>📱</div>
                          <div style={{ fontSize: 11, fontWeight: 800, color: paymentMethod === 'kbz' ? A : '#D97706' }}>
                            {paymentMethod === 'kbz' ? 'KBZPay Official QR' : 'WavePay Merchant QR'}
                          </div>
                          <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>
                            Sellio Accessories Ltd.
                          </div>
                        </div>

                        <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 16 }}>
                          Merchant Phone: <strong>09-798881234</strong> (Sellio Mobile)
                        </div>

                        {/* Upload slip or Last 4 digits */}
                        <div style={{ maxWidth: 320, margin: '0 auto', textAlign: 'left' }}>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                            Enter Transaction Last 4 Digits or Reference:
                          </label>
                          <input
                            type="text"
                            value={txnLast4}
                            onChange={e => setTxnLast4(e.target.value)}
                            placeholder="e.g. 8421"
                            style={{
                              width: '100%',
                              padding: '10px 14px',
                              borderRadius: 10,
                              border: '1.5px solid #E5E7EB',
                              fontSize: 13,
                              outline: 'none',
                              boxSizing: 'border-box',
                              marginBottom: 8,
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setSlipUploaded(prev => !prev)}
                            style={{
                              width: '100%',
                              padding: '8px',
                              borderRadius: 10,
                              border: '1px dashed #9CA3AF',
                              background: slipUploaded ? '#DCFCE7' : '#FFFFFF',
                              color: slipUploaded ? '#059669' : '#4B5563',
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            {slipUploaded ? '✓ Transfer Slip Attached' : '📎 Attach Payment Screenshot'}
                          </button>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div
                        style={{
                          background: '#F8F9FD',
                          borderRadius: 20,
                          padding: '20px',
                          border: '1px solid #ECECF4',
                          fontSize: 13.5,
                          color: '#4B5563',
                          lineHeight: 1.5,
                        }}
                      >
                        <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#12161C' }}>
                          💵 Cash on Delivery Selected
                        </p>
                        Please prepare the exact cash amount of <strong>{finalTotal.toLocaleString()} Ks</strong> for the courier upon parcel arrival at your doorstep.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Order Summary */}
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
                    <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 16px', color: '#12161C' }}>
                      Order Items ({cart.length > 0 ? cart.length : 1})
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                      {(cart.length > 0 ? cart : [{ id: 'p1', name: 'Crystal Clear MagSafe Case', price: 18000, qty: 1 }]).map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                          <div style={{ maxWidth: 200 }}>
                            <div style={{ fontWeight: 700, color: '#12161C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: 12, color: '#6A7280' }}>Qty: {item.qty}</div>
                          </div>
                          <span style={{ fontWeight: 700, color: '#12161C' }}>
                            {(item.price * item.qty).toLocaleString()} Ks
                          </span>
                        </div>
                      ))}

                      <div style={{ height: 1, background: '#F0F0F4', margin: '8px 0' }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', fontSize: 14 }}>
                        <span>Subtotal</span>
                        <span style={{ fontWeight: 700, color: '#12161C' }}>{(totalPrice || 18000).toLocaleString()} Ks</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', fontSize: 14 }}>
                        <span>Express Delivery</span>
                        <span style={{ fontWeight: 700, color: deliveryFee === 0 ? '#10B981' : '#12161C' }}>
                          {deliveryFee === 0 ? 'FREE' : `${deliveryFee.toLocaleString()} Ks`}
                        </span>
                      </div>

                      <div style={{ height: 1, background: '#F0F0F4', margin: '8px 0' }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800 }}>
                        <span>Total Payable</span>
                        <span style={{ color: '#12161C' }}>{finalTotal.toLocaleString()} Ks</span>
                      </div>
                    </div>

                    <button
                      type="submit"
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
                      }}
                    >
                      Confirm Order & Place Now →
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
