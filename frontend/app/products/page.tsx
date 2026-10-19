'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useStore, CATEGORIES, BRANDS, Product, A } from '../../components/store-context';
import { Bookmark } from 'lucide-react';

export default function ProductsPage() {
  const { products, addToCart, wishlist, toggleWishlist } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const PAGE_SIZE = 8;

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      list = list.filter(
        p => p.compatibleBrands.includes(selectedBrand) || p.compatibleBrands.includes('Other brands')
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.features && p.features.some(f => f.toLowerCase().includes(q)))
      );
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginated = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7280', marginBottom: 16 }}>
          <Link href="/" style={{ color: '#6A7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#12161C', fontWeight: 700 }}>Catalog & Accessories</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(28px, 3.5vw, 38px)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 8px',
            }}
          >
            All Phone Accessories Catalog
          </h1>
          <p style={{ color: '#6A7280', fontSize: 15, margin: 0 }}>
            Find the exact case, charger, screen protector, and audio gear for your smartphone.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            padding: '20px',
            border: '1px solid rgba(18,22,28,0.08)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Search + Sort row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search products by keyword (e.g. MagSafe, 65W, ANC, Glass)..."
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: 14,
                  border: '1.5px solid #E5E7EB',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#6A7280' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1.5px solid #E5E7EB',
                  background: '#FFF',
                  fontSize: 13.5,
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#8A94A3', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.04em' }}>
              Categories
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 999,
                      border: isSelected ? '1.5px solid #12161C' : '1px solid #E5E7EB',
                      background: isSelected ? '#12161C' : '#F6F6FB',
                      color: isSelected ? '#FFFFFF' : '#374151',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#8A94A3', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.04em' }}>
              Compatible Brand
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button
                onClick={() => { setSelectedBrand('all'); setCurrentPage(1); }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: selectedBrand === 'all' ? '1.5px solid #4B3BFF' : '1px solid #E5E7EB',
                  background: selectedBrand === 'all' ? '#F0F1FA' : '#FFF',
                  color: selectedBrand === 'all' ? A : '#4B5563',
                  fontWeight: 700,
                  fontSize: 12.5,
                  cursor: 'pointer',
                }}
              >
                All Brands
              </button>
              {BRANDS.map(brand => {
                const isSelected = selectedBrand === brand;
                return (
                  <button
                    key={brand}
                    onClick={() => { setSelectedBrand(brand); setCurrentPage(1); }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 999,
                      border: isSelected ? `1.5px solid ${A}` : '1px solid #E5E7EB',
                      background: isSelected ? '#F0F1FA' : '#FFF',
                      color: isSelected ? A : '#4B5563',
                      fontWeight: 700,
                      fontSize: 12.5,
                      cursor: 'pointer',
                    }}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Summary & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 14, color: '#6A7280', fontWeight: 600 }}>
            Showing <strong style={{ color: '#12161C' }}>{filteredProducts.length}</strong> items
            {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.title}`}
            {selectedBrand !== 'all' && ` for ${selectedBrand}`}
          </div>
          {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
            <button
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: A,
                fontSize: 13.5,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '64px 24px',
              textAlign: 'center',
              border: '1px solid #E5E7EB',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 14 }}>🔍</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>No matching accessories</h2>
            <p style={{ color: '#6A7280', maxWidth: 440, margin: '0 auto 20px', fontSize: 14 }}>
              We could not find anything matching your search. Try resetting the filters or searching for another keyword.
            </p>
            <button
              onClick={resetFilters}
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
              Show All Products
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 22,
              marginBottom: 48,
            }}
          >
            {paginated.map(product => {
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
                  {/* Image Card Box */}
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
                        }}
                      />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
                        marginBottom: 6,
                      }}
                    >
                      {product.name}
                    </Link>

                    <p style={{ color: '#555E6B', fontSize: 13, lineHeight: 1.45, margin: '0 0 12px', flex: 1 }}>
                      {product.desc}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                      <span style={{ color: '#F59E0B', fontSize: 13, fontWeight: 700 }}>★ {product.rating}</span>
                      <span style={{ color: '#9CA3AF', fontSize: 12 }}>({product.reviews} reviews)</span>
                    </div>

                    {/* Price and Cart Action */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F0F0F4' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 18, color: '#12161C' }}>
                          {product.price.toLocaleString()} Ks
                        </div>
                        {product.originalPrice && (
                          <div style={{ fontSize: 12, color: '#9CA3AF', textDecoration: 'line-through' }}>
                            {product.originalPrice.toLocaleString()} Ks
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: 6 }}>
                        <Link
                          href={`/products/${product.id}`}
                          style={{
                            padding: '8px 12px',
                            borderRadius: 999,
                            border: '1px solid #E5E7EB',
                            background: '#FFF',
                            color: '#12161C',
                            fontSize: 12.5,
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          View
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          style={{
                            background: '#12161C',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '8px 14px',
                            borderRadius: 999,
                            fontWeight: 700,
                            fontSize: 12.5,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
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
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              style={{
                minHeight: 40,
                padding: '0 16px',
                borderRadius: 12,
                border: '1px solid #E5E7EB',
                background: currentPage === 1 ? '#F3F4F6' : '#FFF',
                color: currentPage === 1 ? '#9CA3AF' : '#12161C',
                fontWeight: 700,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  border: currentPage === pageNumber ? 'none' : '1px solid #E5E7EB',
                  background: currentPage === pageNumber ? '#12161C' : '#FFF',
                  color: currentPage === pageNumber ? '#FFF' : '#12161C',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {pageNumber}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              style={{
                minHeight: 40,
                padding: '0 16px',
                borderRadius: 12,
                border: '1px solid #E5E7EB',
                background: currentPage === totalPages ? '#F3F4F6' : '#FFF',
                color: currentPage === totalPages ? '#9CA3AF' : '#12161C',
                fontWeight: 700,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Next →
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
