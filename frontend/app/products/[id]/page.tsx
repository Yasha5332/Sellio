'use client';

import React, { useState, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { useStore, Product, A } from '../../../components/store-context';
import { Bookmark } from 'lucide-react';

function ProductDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { products, addToCart, wishlist, toggleWishlist } = useStore();

  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Standard / Universal');

  const product = products.find(p => p.id === resolvedParams.id) || products[0];
  const isWishlisted = wishlist.includes(product.id);

  // Related products from same category or random
  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || true))
    .slice(0, 4);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 24, flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/products" style={{ color: '#6A7280', textDecoration: 'none' }}>Catalog</Link>
          <span>/</span>
          <Link href={`/categories`} style={{ color: '#6A7280', textDecoration: 'none' }}>{product.categoryName}</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>{product.name}</span>
        </div>

        {/* Product Detail Layout */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 28,
            border: '1px solid rgba(18,22,28,0.08)',
            boxShadow: '0 8px 32px rgba(40,30,120,0.06)',
            padding: '36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            marginBottom: 56,
          }}
        >
          {/* Left Column: Image showcase */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                background: '#F9FAFC',
                borderRadius: 24,
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ECECF2',
              }}
            >
              {product.tag && (
                <span
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    background: product.badgeColor || A,
                    color: '#FFF',
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 999,
                    zIndex: 2,
                  }}
                >
                  {product.tag}
                </span>
              )}

              {discountPercent && (
                <span
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: '#EF4444',
                    color: '#FFF',
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 999,
                    zIndex: 2,
                  }}
                >
                  -{discountPercent}% OFF
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Trust badge strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
                textAlign: 'center',
                background: '#F8F9FD',
                padding: '12px 8px',
                borderRadius: 16,
              }}
            >
              <div>
                <div style={{ fontSize: 16 }}>🛡️</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#12161C' }}>100% Genuine</div>
              </div>
              <div>
                <div style={{ fontSize: 16 }}>🚚</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#12161C' }}>Fast Delivery</div>
              </div>
              <div>
                <div style={{ fontSize: 16 }}>🔄</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#12161C' }}>7-Day Returns</div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Specs & Purchase Options */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: A, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
              {product.categoryName}
            </div>

            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 800,
                lineHeight: 1.2,
                margin: '0 0 12px',
              }}
            >
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B', fontWeight: 800, fontSize: 15 }}>
                <span>★</span>
                <span style={{ color: '#12161C' }}>{product.rating}</span>
              </div>
              <span style={{ color: '#8A94A3', fontSize: 14 }}>({product.reviews} customer reviews)</span>
              <span style={{ background: '#E6F9EF', color: '#10B981', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                ✓ In Stock (Ready to Ship)
              </span>
            </div>

            {/* Price display */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24, padding: '16px 20px', background: '#F8F9FD', borderRadius: 16 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: '#12161C' }}>
                {product.price.toLocaleString()} Ks
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: 18, color: '#9CA3AF', textDecoration: 'line-through', fontWeight: 600 }}>
                  {product.originalPrice.toLocaleString()} Ks
                </span>
              )}
              <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#059669', background: '#DCFCE7', padding: '4px 10px', borderRadius: 999 }}>
                Special Online Deal
              </span>
            </div>

            {/* Description */}
            <p style={{ color: '#4B5563', fontSize: 15, lineHeight: 1.6, margin: '0 0 24px' }}>
              {product.desc}
            </p>

            {/* Feature Highlights */}
            {product.features && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#6A7280', marginBottom: 10, letterSpacing: '0.04em' }}>
                  Key Features & Specs
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
                  {product.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: '#1F2937', fontWeight: 500 }}>
                      <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compatible Phone Brands */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#6A7280', marginBottom: 10, letterSpacing: '0.04em' }}>
                Supported Phone Brands
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.compatibleBrands.map(b => (
                  <span
                    key={b}
                    style={{
                      background: '#F3F4F6',
                      color: '#1F2937',
                      fontSize: 12.5,
                      fontWeight: 600,
                      padding: '5px 12px',
                      borderRadius: 999,
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar (Quantity + Add to Cart + Wishlist) */}
            <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #F0F0F4', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {/* Qty Selector */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #E5E7EB', borderRadius: 999, background: '#FFF', padding: '0 6px' }}>
                <button
                  type="button"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: 34, height: 34, borderRadius: 17, border: 'none', background: 'transparent', fontSize: 18, fontWeight: 700, cursor: 'pointer' }}
                >
                  −
                </button>
                <span style={{ minWidth: 32, textAlign: 'center', fontWeight: 800, fontSize: 15 }}>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(q => q + 1)}
                  style={{ width: 34, height: 34, borderRadius: 17, border: 'none', background: 'transparent', fontSize: 18, fontWeight: 700, cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={() => addToCart(product, qty)}
                style={{
                  flex: 1.5,
                  minHeight: 48,
                  borderRadius: 999,
                  border: 'none',
                  background: '#12161C',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 8px 24px rgba(18,22,28,0.2)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = A)}
                onMouseLeave={e => (e.currentTarget.style.background = '#12161C')}
              >
                <span>🛒</span>
                <span>Add {qty > 1 ? `${qty} to Cart` : 'to Cart'}</span>
              </button>

              {/* Direct Checkout CTA */}
              <button
                type="button"
                onClick={() => {
                  addToCart(product, qty);
                  router.push('/checkout');
                }}
                style={{
                  flex: 1.2,
                  minHeight: 48,
                  borderRadius: 999,
                  border: 'none',
                  background: '#D4F56A',
                  color: '#12161C',
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <span>⚡ Buy Now</span>
              </button>

              {/* Saved Items Bookmark Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  border: isWishlisted ? '1.5px solid #12161C' : '1.5px solid #E5E7EB',
                  background: isWishlisted ? '#F4F4F8' : '#FFF',
                  color: '#12161C',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                title={isWishlisted ? 'Remove from Saved Items' : 'Save for Later'}
              >
                <Bookmark
                  size={20}
                  strokeWidth={2}
                  fill={isWishlisted ? '#12161C' : 'none'}
                  color="#12161C"
                />
              </button>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Recommended For Your Phone</h2>
            <Link href="/products" style={{ color: A, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              View All →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {related.map(item => (
              <div
                key={item.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1px solid rgba(18,22,28,0.08)',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Link href={`/products/${item.id}`} style={{ display: 'block', height: 160, overflow: 'hidden', borderRadius: 14, marginBottom: 12 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Link>
                <div style={{ fontSize: 12, color: '#6A7280', fontWeight: 600 }}>{item.categoryName}</div>
                <Link href={`/products/${item.id}`} style={{ textDecoration: 'none', color: '#12161C', fontWeight: 800, fontSize: 15, margin: '4px 0 8px' }}>
                  {item.name}
                </Link>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
                  <span style={{ fontWeight: 800, color: '#12161C' }}>{item.price.toLocaleString()} Ks</span>
                  <button
                    onClick={() => addToCart(item)}
                    style={{ background: '#12161C', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    + Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#F6F6FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>Loading...</div>}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
