'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, Product, A } from '../../components/store-context';

export default function DashboardPage() {
  const { products, orders, setToast } = useStore();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'analytics'>('inventory');
  const [stockStatus, setStockStatus] = useState<Record<string, boolean>>({
    p1: true,
    p2: true,
    p3: true,
    p4: true,
    p5: true,
    p6: true,
    p7: true,
    p8: true,
    p9: true,
    p10: true,
    p11: true,
    p12: true,
  });

  const toggleStock = (id: string, name: string) => {
    setStockStatus(prev => {
      const next = !prev[id];
      setToast(`Product "${name}" marked as ${next ? 'In Stock' : 'Out of Stock'}`);
      return { ...prev, [id]: next };
    });
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

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 20 }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>Seller & Admin Dashboard</span>
        </div>

        {/* Dashboard Title & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 'clamp(26px, 3.5vw, 36px)',
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                Seller & Inventory Dashboard
              </h1>
              <span style={{ background: '#DCFCE7', color: '#059669', fontSize: 11, fontWeight: 800, padding: '3px 9px', borderRadius: 999 }}>
                ● Store Live
              </span>
            </div>
            <p style={{ color: '#6A7280', fontSize: 15, margin: 0 }}>
              Sellio Yangon Hub • Manage stock availability, customer orders, and sales performance.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Link
              href="/products"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E5E7EB',
                padding: '10px 18px',
                borderRadius: 999,
                color: '#12161C',
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              View Public Catalog ↗
            </Link>
          </div>
        </div>

        {/* KPI Metrics Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '20px 24px', border: '1px solid rgba(18,22,28,0.08)' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#6A7280', textTransform: 'uppercase', marginBottom: 8 }}>
              Monthly Sales (Ks)
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#12161C' }}>1,840,000 Ks</div>
            <div style={{ fontSize: 12, color: '#10B981', fontWeight: 700, marginTop: 4 }}>↑ +18.4% vs last month</div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '20px 24px', border: '1px solid rgba(18,22,28,0.08)' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#6A7280', textTransform: 'uppercase', marginBottom: 8 }}>
              Completed Orders
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#12161C' }}>{orders.length + 42}</div>
            <div style={{ fontSize: 12, color: '#10B981', fontWeight: 700, marginTop: 4 }}>98.6% delivered on time</div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '20px 24px', border: '1px solid rgba(18,22,28,0.08)' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#6A7280', textTransform: 'uppercase', marginBottom: 8 }}>
              Catalog SKUs
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#12161C' }}>{products.length} Items</div>
            <div style={{ fontSize: 12, color: A, fontWeight: 700, marginTop: 4 }}>All live in store</div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '20px 24px', border: '1px solid rgba(18,22,28,0.08)' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#6A7280', textTransform: 'uppercase', marginBottom: 8 }}>
              Avg. Courier Transit
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#12161C' }}>1.2 Days</div>
            <div style={{ fontSize: 12, color: '#6A7280', fontWeight: 700, marginTop: 4 }}>Yangon & Mandalay</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }}>
          <button
            onClick={() => setActiveTab('inventory')}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: 'none',
              background: activeTab === 'inventory' ? '#12161C' : 'transparent',
              color: activeTab === 'inventory' ? '#FFF' : '#4B5563',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📦 Inventory & Stock
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: 'none',
              background: activeTab === 'orders' ? '#12161C' : 'transparent',
              color: activeTab === 'orders' ? '#FFF' : '#4B5563',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📋 Orders Management ({orders.length})
          </button>
        </div>

        {/* Inventory View */}
        {activeTab === 'inventory' && (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid rgba(18,22,28,0.08)',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F0F4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Stock Availability & Pricing</h2>
              <span style={{ fontSize: 13, color: '#6A7280' }}>Toggle availability switch to update live storefront</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#F9FAFC', borderBottom: '1px solid #E5E7EB', color: '#6A7280', fontSize: 12.5, textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 20px' }}>Product</th>
                    <th style={{ padding: '14px 20px' }}>Category</th>
                    <th style={{ padding: '14px 20px' }}>Price</th>
                    <th style={{ padding: '14px 20px' }}>Rating</th>
                    <th style={{ padding: '14px 20px' }}>Live Status</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    const inStock = stockStatus[product.id] ?? true;
                    return (
                      <tr key={product.id} style={{ borderBottom: '1px solid #F0F0F4' }}>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', border: '1px solid #E5E7EB' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: '#12161C' }}>{product.name}</div>
                              <div style={{ fontSize: 12, color: '#8A94A3' }}>SKU: {product.id.toUpperCase()}-MYA</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', color: '#4B5563', fontWeight: 600 }}>
                          {product.categoryName}
                        </td>
                        <td style={{ padding: '14px 20px', fontWeight: 800, color: '#12161C' }}>
                          {product.price.toLocaleString()} Ks
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{ color: '#F59E0B', fontWeight: 700 }}>★ {product.rating}</span>
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span
                            style={{
                              background: inStock ? '#DCFCE7' : '#FEE2E2',
                              color: inStock ? '#059669' : '#EF4444',
                              fontSize: 12,
                              fontWeight: 800,
                              padding: '3px 10px',
                              borderRadius: 999,
                            }}
                          >
                            {inStock ? '● In Stock' : '✕ Out of Stock'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                          <button
                            onClick={() => toggleStock(product.id, product.name)}
                            style={{
                              padding: '6px 14px',
                              borderRadius: 999,
                              border: inStock ? '1px solid #EF4444' : '1px solid #10B981',
                              background: '#FFF',
                              color: inStock ? '#EF4444' : '#10B981',
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            {inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Management View */}
        {activeTab === 'orders' && (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid rgba(18,22,28,0.08)',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F0F4' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Customer Orders Pipeline</h2>
            </div>

            <div style={{ padding: '12px 24px' }}>
              {orders.map(order => (
                <div
                  key={order.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 0',
                    borderBottom: '1px solid #F0F0F4',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#12161C' }}>
                      #{order.id} • {order.paymentMethod}
                    </div>
                    <div style={{ fontSize: 13, color: '#6A7280' }}>
                      {order.shippingAddress} • Placed {order.date}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: 16, color: '#12161C' }}>
                        {order.total.toLocaleString()} Ks
                      </div>
                      <div style={{ fontSize: 12, color: '#10B981', fontWeight: 700 }}>
                        {order.status}
                      </div>
                    </div>

                    <button
                      onClick={() => setToast(`Order #${order.id} verified and assigned to courier!`)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 999,
                        background: '#12161C',
                        color: '#FFF',
                        fontSize: 12.5,
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Verify & Dispatch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
