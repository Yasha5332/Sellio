'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, A } from '../../components/store-context';
import { Bookmark } from 'lucide-react';

export default function WishlistPage() {
  const { products, wishlist, toggleWishlist, addToCart, setToast } = useStore();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  const addAllToCart = () => {
    savedProducts.forEach(p => addToCart(p, 1));
    setToast(`Added all ${savedProducts.length} wishlist items to cart!`);
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

      <main style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 20 }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>Saved Items</span>
        </div>

        {/* Title & Batch Action */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 800,
                margin: '0 0 6px',
              }}
            >
              Saved Items ({savedProducts.length})
            </h1>
            <p style={{ color: '#6A7280', fontSize: 15, margin: 0 }}>
              Gear you have saved for later. Move them directly to your shopping cart when ready.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={addAllToCart}
              style={{
                padding: '12px 22px',
                borderRadius: 999,
                background: '#12161C',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 16px rgba(18,22,28,0.18)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = A)}
              onMouseLeave={e => (e.currentTarget.style.background = '#12161C')}
            >
              <span>🛒 Move All to Cart</span>
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '72px 24px',
              textAlign: 'center',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: '#F1F3F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Bookmark size={36} strokeWidth={1.75} color="#9CA3AF" fill="none" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>Your saved list is empty</h2>
            <p style={{ color: '#6A7280', maxWidth: 420, margin: '0 auto 24px', fontSize: 15, lineHeight: 1.5 }}>
              Tap the bookmark icon on any case, charger, or audio accessory to keep it handy for later.
            </p>
            <Link
              href="/products"
              style={{
                display: 'inline-block',
                background: '#12161C',
                color: '#FFF',
                padding: '12px 24px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14.5,
                textDecoration: 'none',
              }}
            >
              Explore Products Now →
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 22,
            }}
          >
            {savedProducts.map(product => (
              <div
                key={product.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 22,
                  border: '1px solid rgba(18,22,28,0.08)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: 190, background: '#F9FAFC', position: 'relative', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleWishlist(product)}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      width: 34,
                      height: 34,
                      borderRadius: 17,
                      border: '1px solid #12161C',
                      background: 'rgba(255,255,255,0.95)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#12161C',
                      zIndex: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      transition: 'transform 0.15s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    title="Remove from saved items"
                  >
                    <Bookmark size={16} strokeWidth={2} fill="#12161C" color="#12161C" />
                  </button>

                  <Link href={`/products/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Link>
                </div>

                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#6A7280', fontWeight: 600, marginBottom: 4 }}>
                    {product.categoryName}
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    style={{
                      textDecoration: 'none',
                      color: '#12161C',
                      fontWeight: 800,
                      fontSize: 15.5,
                      lineHeight: 1.3,
                      marginBottom: 8,
                    }}
                  >
                    {product.name}
                  </Link>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                    <span style={{ color: '#F59E0B', fontSize: 13, fontWeight: 700 }}>★ {product.rating}</span>
                    <span style={{ color: '#9CA3AF', fontSize: 12 }}>({product.reviews})</span>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F0F0F4' }}>
                    <div style={{ fontWeight: 800, fontSize: 17, color: '#12161C' }}>
                      {product.price.toLocaleString()} Ks
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product);
                      }}
                      style={{
                        background: '#12161C',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
