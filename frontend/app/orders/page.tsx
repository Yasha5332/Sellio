'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, A } from '../../components/store-context';

export default function OrdersPage() {
  const { orders, addToCart } = useStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { bg: '#DCFCE7', text: '#059669', label: '✓ Delivered' };
      case 'In Transit':
        return { bg: '#FEF3C7', text: '#D97706', label: '🚚 In Transit' };
      case 'Payment Verified':
        return { bg: '#E0F2FE', text: '#0284C7', label: '💳 Payment Verified' };
      default:
        return { bg: '#F1F1F8', text: A, label: '⏳ Processing' };
    }
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

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 20 }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>My Orders</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              fontWeight: 800,
              margin: '0 0 6px',
            }}
          >
            My Orders & Tracking
          </h1>
          <p style={{ color: '#6A7280', fontSize: 15, margin: 0 }}>
            Track live dispatch status, review order receipts, and re-order phone accessories.
          </p>
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '64px 24px',
              textAlign: 'center',
              border: '1px solid #E5E7EB',
            }}
          >
            <div style={{ fontSize: 52, marginBottom: 16 }}>📦</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>No orders yet</h2>
            <p style={{ color: '#6A7280', margin: '0 0 24px', fontSize: 15 }}>
              Once you place an order with KBZPay, WavePay or Cash on Delivery, it will appear here.
            </p>
            <Link
              href="/products"
              style={{
                display: 'inline-block',
                background: '#12161C',
                color: '#FFF',
                padding: '12px 26px',
                borderRadius: 999,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {orders.map(order => {
              const badge = getStatusBadge(order.status);
              return (
                <div
                  key={order.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 24,
                    border: '1px solid rgba(18,22,28,0.08)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* Order Card Header */}
                  <div
                    style={{
                      padding: '20px 24px',
                      background: '#FAFBFD',
                      borderBottom: '1px solid #F0F0F4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontWeight: 800, fontSize: 16, color: '#12161C' }}>
                          Order #{order.id}
                        </span>
                        <span
                          style={{
                            background: badge.bg,
                            color: badge.text,
                            fontSize: 12,
                            fontWeight: 800,
                            padding: '3px 10px',
                            borderRadius: 999,
                          }}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: '#6A7280' }}>Placed {order.date}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: '#6A7280' }}>Total Paid</div>
                      <div style={{ fontWeight: 800, fontSize: 18, color: '#12161C' }}>
                        {order.total.toLocaleString()} Ks
                      </div>
                    </div>
                  </div>

                  {/* Order Tracking Progress Stepper */}
                  <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #F0F0F4' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                      {/* Connecting Line */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: '12%',
                          right: '12%',
                          height: 3,
                          background: '#E5E7EB',
                          zIndex: 1,
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: '12%',
                          width: order.status === 'Delivered' ? '76%' : order.status === 'In Transit' ? '50%' : '25%',
                          height: 3,
                          background: '#10B981',
                          zIndex: 2,
                          transition: 'width 0.4s ease',
                        }}
                      />

                      {/* Step 1 */}
                      <div style={{ zIndex: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: 28, height: 28, borderRadius: 14, background: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, marginBottom: 6 }}>
                          ✓
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#12161C' }}>Placed</span>
                      </div>

                      {/* Step 2 */}
                      <div style={{ zIndex: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: 28, height: 28, borderRadius: 14, background: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, marginBottom: 6 }}>
                          ✓
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#12161C' }}>Verified</span>
                      </div>

                      {/* Step 3 */}
                      <div style={{ zIndex: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            background: order.status === 'In Transit' || order.status === 'Delivered' ? '#10B981' : '#E5E7EB',
                            color: order.status === 'In Transit' || order.status === 'Delivered' ? '#FFF' : '#6A7280',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13,
                            fontWeight: 800,
                            marginBottom: 6,
                          }}
                        >
                          🚚
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: order.status === 'In Transit' || order.status === 'Delivered' ? '#12161C' : '#9CA3AF' }}>
                          In Transit
                        </span>
                      </div>

                      {/* Step 4 */}
                      <div style={{ zIndex: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            background: order.status === 'Delivered' ? '#10B981' : '#E5E7EB',
                            color: order.status === 'Delivered' ? '#FFF' : '#6A7280',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13,
                            fontWeight: 800,
                            marginBottom: 6,
                          }}
                        >
                          📦
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: order.status === 'Delivered' ? '#12161C' : '#9CA3AF' }}>
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#6A7280', marginBottom: 12, textTransform: 'uppercase' }}>
                      Items Ordered
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {order.items.map(item => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', border: '1px solid #E5E7EB' }}
                              />
                            )}
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 14.5, color: '#12161C' }}>{item.name}</div>
                              <div style={{ fontSize: 12.5, color: '#6A7280' }}>
                                Qty: {item.qty} × {item.price.toLocaleString()} Ks
                              </div>
                            </div>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: 15, color: '#12161C' }}>
                            {(item.price * item.qty).toLocaleString()} Ks
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Card Footer */}
                  <div
                    style={{
                      padding: '16px 24px',
                      background: '#FAFBFD',
                      borderTop: '1px solid #F0F0F4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 12,
                      fontSize: 13,
                    }}
                  >
                    <div style={{ color: '#4B5563' }}>
                      Ship to: <strong>{order.shippingAddress}</strong> • Payment: <strong>{order.paymentMethod}</strong>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <Link
                        href="/contact"
                        style={{
                          padding: '8px 14px',
                          borderRadius: 999,
                          border: '1px solid #E5E7EB',
                          background: '#FFF',
                          color: '#12161C',
                          fontWeight: 700,
                          fontSize: 12.5,
                          textDecoration: 'none',
                        }}
                      >
                        Help & Support
                      </Link>
                      <button
                        onClick={() => {
                          order.items.forEach(i => {
                            addToCart({
                              id: i.id,
                              name: i.name,
                              desc: '',
                              price: i.price,
                              category: 'accessories',
                              categoryName: 'Accessories',
                              rating: 5,
                              reviews: 1,
                              image: i.image || '/products/clear-case.jpg',
                              compatibleBrands: ['All Brands'],
                            }, i.qty);
                          });
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 999,
                          border: 'none',
                          background: '#12161C',
                          color: '#FFF',
                          fontWeight: 700,
                          fontSize: 12.5,
                          cursor: 'pointer',
                        }}
                      >
                        Re-order Items ↺
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
