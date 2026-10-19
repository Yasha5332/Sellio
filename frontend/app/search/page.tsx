'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, CATEGORIES, BRANDS, Product, A } from '../../components/store-context';
import { Bookmark } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { products, addToCart, wishlist, toggleWishlist } = useStore();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const trendingSearches = [
    'MagSafe Case',
    '65W GaN',
    'ANC Earbuds',
    'Privacy Glass',
    'Power Bank',
    'Desk Stand',
  ];

  const results = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.compatibleBrands.some(b => b.toLowerCase().includes(q)) ||
        (p.features && p.features.some(f => f.toLowerCase().includes(q)))
      );
    }

    if (selectedCat !== 'all') {
      list = list.filter(p => p.category === selectedCat);
    }

    if (selectedBrand !== 'all') {
      list = list.filter(
        p => p.compatibleBrands.includes(selectedBrand) || p.compatibleBrands.includes('Other brands')
      );
    }

    return list;
  }, [products, query, selectedCat, selectedBrand]);

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px 80px' }}>
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 20 }}>
        <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <span style={{ color: '#12161C', fontWeight: 700 }}>Search Catalog</span>
      </div>

      {/* Search Header */}
      <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 36px' }}>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(28px, 4vw, 38px)',
            fontWeight: 800,
            margin: '0 0 12px',
          }}
        >
          Search Phone Accessories
        </h1>
        <p style={{ color: '#6A7280', fontSize: 15, margin: '0 0 24px' }}>
          Instantly look up phone cases, high-watt chargers, tempered glass, audio, and power banks.
        </p>

        {/* Search Bar Input */}
        <div style={{ position: 'relative', width: '100%' }}>
          <span
            style={{
              position: 'absolute',
              left: 18,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 20,
              color: '#9CA3AF',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by accessory name, phone model, or spec..."
            autoFocus
            style={{
              width: '100%',
              padding: '16px 48px 16px 52px',
              borderRadius: 999,
              border: '2px solid #E5E7EB',
              background: '#FFFFFF',
              fontSize: 16,
              fontWeight: 600,
              outline: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = A)}
            onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: 18,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer',
                fontSize: 18,
                fontWeight: 700,
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Trending Searches */}
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#8A94A3' }}>Popular searches:</span>
          {trendingSearches.map(term => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              style={{
                background: '#F1F1F8',
                color: '#4B3BFF',
                border: 'none',
                padding: '4px 10px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Category & Brand Bar */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: '16px 20px',
          border: '1px solid rgba(18,22,28,0.08)',
          marginBottom: 32,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#6A7280', marginRight: 4 }}>Department:</span>
          {CATEGORIES.map(cat => {
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: isSelected ? '1.5px solid #12161C' : '1px solid #E5E7EB',
                  background: isSelected ? '#12161C' : '#FFF',
                  color: isSelected ? '#FFF' : '#374151',
                  fontWeight: 700,
                  fontSize: 12.5,
                  cursor: 'pointer',
                }}
              >
                {cat.icon} {cat.title}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#6A7280' }}>Brand:</span>
          <select
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 10,
              border: '1.5px solid #E5E7EB',
              background: '#FFF',
              fontSize: 13,
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Brands</option>
            {BRANDS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>
          {query.trim() ? `Search results for "${query}"` : 'All Available Catalog'}
        </h2>
        <span style={{ color: '#6A7280', fontSize: 14 }}>
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Empty State UI */}
      {results.length === 0 ? (
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '72px 24px',
            textAlign: 'center',
            border: '1px solid #E5E7EB',
          }}
        >
          <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 10px', color: '#12161C' }}>
            No accessories matched &ldquo;{query}&rdquo;
          </h3>
          <p style={{ color: '#6A7280', maxWidth: 440, margin: '0 auto 24px', fontSize: 15, lineHeight: 1.5 }}>
            Check the spelling, remove any filters, or try one of our popular searches below.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => { setQuery(''); setSelectedCat('all'); setSelectedBrand('all'); }}
              style={{
                padding: '12px 24px',
                borderRadius: 999,
                background: '#12161C',
                color: '#FFF',
                fontWeight: 700,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reset Search & Filters
            </button>
            <Link
              href="/products"
              style={{
                padding: '12px 24px',
                borderRadius: 999,
                background: '#F1F1F8',
                color: A,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Browse All Products
            </Link>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 22,
          }}
        >
          {results.map(product => {
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
                <div style={{ height: 190, background: '#F9FAFC', position: 'relative', overflow: 'hidden' }}>
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
                      marginBottom: 6,
                    }}
                  >
                    {product.name}
                  </Link>
                  <p style={{ color: '#555E6B', fontSize: 13, lineHeight: 1.4, margin: '0 0 12px', flex: 1 }}>
                    {product.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <span style={{ color: '#F59E0B', fontSize: 13, fontWeight: 700 }}>★ {product.rating}</span>
                    <span style={{ color: '#9CA3AF', fontSize: 12 }}>({product.reviews})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F0F0F4' }}>
                    <span style={{ fontWeight: 800, fontSize: 17, color: '#12161C' }}>
                      {product.price.toLocaleString()} Ks
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        background: '#12161C',
                        color: '#FFF',
                        border: 'none',
                        padding: '7px 14px',
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = A)}
                      onMouseLeave={e => (e.currentTarget.style.background = '#12161C')}
                    >
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
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
      <Suspense fallback={<div style={{ padding: 60, textAlign: 'center' }}>Loading Search...</div>}>
        <SearchPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}
