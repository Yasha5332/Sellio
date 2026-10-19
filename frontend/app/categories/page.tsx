'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, CATEGORIES, Product, A } from '../../components/store-context';
import { Bookmark } from 'lucide-react';

export default function CategoriesPage() {
  const { products, addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const BRANDS = ['All Brands', 'iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Huawei'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCat === 'all' || p.category === selectedCat;
    const matchesBrand =
      !selectedBrand ||
      selectedBrand === 'All Brands' ||
      p.compatibleBrands.includes(selectedBrand);
    return matchesCategory && matchesBrand;
  });

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
        {/* Header Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 16 }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>Categories</span>
        </div>

        {/* Hero Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #12161C 0%, #2A2050 100%)',
            color: '#FFFFFF',
            borderRadius: 28,
            padding: '48px 36px',
            marginBottom: 40,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(18,22,28,0.12)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 240,
              height: 240,
              borderRadius: 120,
              background: 'radial-gradient(circle, rgba(212,245,106,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ maxWidth: 640, position: 'relative', zIndex: 2 }}>
            <span
              style={{
                display: 'inline-block',
                background: '#D4F56A',
                color: '#12161C',
                padding: '4px 12px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 16,
                letterSpacing: '0.04em',
              }}
            >
              🏷️ COMPLETE COLLECTION
            </span>
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                lineHeight: 1.15,
                margin: '0 0 12px',
              }}
            >
              Browse Accessories by Category
            </h1>
            <p style={{ color: '#D1D5DB', fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Tailored protection, high-speed charging, and immersive audio built specifically for your smartphone.
            </p>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>
              Select a Category ({CATEGORIES.length - 1} Departments)
            </h2>
            {selectedCat !== 'all' && (
              <button
                onClick={() => setSelectedCat('all')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: A,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Reset to All Categories ↺
              </button>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {CATEGORIES.map(cat => {
              const isSelected = selectedCat === cat.id;
              const count = cat.id === 'all'
                ? products.length
                : products.filter(p => p.category === cat.id).length;

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  style={{
                    background: isSelected ? '#12161C' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#12161C',
                    padding: '24px 20px',
                    borderRadius: 20,
                    cursor: 'pointer',
                    border: isSelected ? '2px solid #12161C' : '1px solid rgba(18,22,28,0.08)',
                    boxShadow: isSelected
                      ? '0 12px 28px rgba(18,22,28,0.18)'
                      : '0 4px 16px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 130,
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.08)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: 32 }}>{cat.icon}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: '3px 9px',
                        borderRadius: 999,
                        background: isSelected ? 'rgba(255,255,255,0.18)' : '#F1F1F8',
                        color: isSelected ? '#D4F56A' : A,
                      }}
                    >
                      {count} items
                    </span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
                      {cat.title}
                    </div>
                    <div style={{ fontSize: 13, color: isSelected ? '#9CA3AF' : '#6A7280' }}>
                      {cat.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Filter Chips */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#6A7280', marginRight: 4 }}>Filter Brand:</span>
          {BRANDS.map(brand => {
            const isSelected = (!selectedBrand && brand === 'All Brands') || selectedBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand === 'All Brands' ? null : brand)}
                style={{
                  minHeight: 34,
                  padding: '0 14px',
                  borderRadius: 999,
                  border: isSelected ? '1.5px solid #12161C' : '1px solid #E5E7EB',
                  background: isSelected ? '#12161C' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#374151',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {brand}
              </button>
            );
          })}
        </div>

        {/* Matching Products Grid */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px' }}>
                {selectedCat === 'all'
                  ? 'All Available Gear'
                  : CATEGORIES.find(c => c.id === selectedCat)?.title}
              </h2>
              <span style={{ color: '#6A7280', fontSize: 14 }}>
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
            <Link
              href="/products"
              style={{
                color: A,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              View Full Catalog →
            </Link>
          </div>

          {filteredProducts.length === 0 ? (
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 24,
                padding: '60px 24px',
                textAlign: 'center',
                border: '1px solid #E5E7EB',
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px' }}>No products found</h3>
              <p style={{ color: '#6A7280', margin: '0 0 20px', fontSize: 14 }}>
                Try selecting a different category or clearing the brand filter.
              </p>
              <button
                onClick={() => { setSelectedCat('all'); setSelectedBrand(null); }}
                style={{
                  padding: '10px 20px',
                  borderRadius: 999,
                  background: '#12161C',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 20,
              }}
            >
              {filteredProducts.map(product => {
                const isWishlisted = wishlist.includes(product.id);
                return (
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
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 16px 36px rgba(40,30,120,0.12)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                    }}
                  >
                    {/* Image Box */}
                    <div
                      style={{
                        height: 200,
                        background: '#F9FAFC',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      {product.tag && (
                        <span
                          style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            background: product.badgeColor || A,
                            color: '#FFF',
                            fontSize: 11,
                            fontWeight: 800,
                            padding: '3px 9px',
                            borderRadius: 999,
                            zIndex: 2,
                          }}
                        >
                          {product.tag}
                        </span>
                      )}

                      <button
                        onClick={() => toggleWishlist(product)}
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          width: 34,
                          height: 34,
                          borderRadius: 17,
                          border: isWishlisted ? '1px solid #12161C' : '1px solid rgba(18,22,28,0.08)',
                          background: 'rgba(255,255,255,0.92)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isWishlisted ? '#12161C' : '#4B5563',
                          zIndex: 2,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                          transition: 'transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        title={isWishlisted ? 'Remove from saved items' : 'Save item'}
                      >
                        <Bookmark
                          size={16}
                          strokeWidth={2}
                          fill={isWishlisted ? '#12161C' : 'none'}
                          color={isWishlisted ? '#12161C' : '#4B5563'}
                        />
                      </button>

                      <Link href={`/products/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      </Link>
                    </div>

                    {/* Content Box */}
                    <div style={{ padding: '18px 18px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ fontSize: 12, color: '#6A7280', fontWeight: 600, marginBottom: 4 }}>
                        {product.categoryName}
                      </div>

                      <Link
                        href={`/products/${product.id}`}
                        style={{
                          textDecoration: 'none',
                          color: '#12161C',
                          fontWeight: 800,
                          fontSize: 16,
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

                      {/* Price & Action */}
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F0F0F4' }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 17, color: '#12161C' }}>
                            {product.price.toLocaleString()} Ks
                          </div>
                          {product.originalPrice && (
                            <div style={{ fontSize: 12, color: '#9CA3AF', textDecoration: 'line-through' }}>
                              {product.originalPrice.toLocaleString()} Ks
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          style={{
                            background: '#12161C',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '8px 14px',
                            borderRadius: 999,
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            transition: 'background 0.15s ease',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = A)}
                          onMouseLeave={e => (e.currentTarget.style.background = '#12161C')}
                        >
                          <span>+ Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
