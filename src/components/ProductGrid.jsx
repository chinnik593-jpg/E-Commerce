import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, PackageX } from 'lucide-react';

export default function ProductGrid({
  products = [],
  activeCategory,
  onSelectProduct,
  onAddToCart,
  isAdminView,
  onToggleStock
}) {
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'instock', 'outofstock'
  const [sortBy, setSortBy] = useState('popular');

  let filtered = [...products];

  if (stockFilter === 'instock') {
    filtered = filtered.filter(p => p.inStock && p.stock > 0);
  } else if (stockFilter === 'outofstock') {
    filtered = filtered.filter(p => !p.inStock || p.stock <= 0);
  }

  if (sortBy === 'low_high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high_low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div>
      <div className="section-header">
        <div className="section-title">
          {activeCategory === 'All' ? 'Deals of the Day' : `${activeCategory} Collection`}
          <span style={{ fontSize: '0.85rem', color: '#878787', fontWeight: 400, marginLeft: '8px' }}>
            ({filtered.length} Items Available)
          </span>
        </div>

        <div className="filter-pills">
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <SlidersHorizontal size={14} /> Filter Stock:
          </span>
          <button
            className={`filter-pill ${stockFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStockFilter('all')}
          >
            All Items
          </button>
          <button
            className={`filter-pill ${stockFilter === 'instock' ? 'active' : ''}`}
            onClick={() => setStockFilter('instock')}
          >
            In Stock Only
          </button>
          <button
            className={`filter-pill ${stockFilter === 'outofstock' ? 'active' : ''}`}
            onClick={() => setStockFilter('outofstock')}
          >
            Out of Stock
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '4px 8px',
              fontSize: '0.8rem',
              borderRadius: '16px',
              border: '1px solid #ccc',
              marginLeft: '8px'
            }}
          >
            <option value="popular">Sort: Popularity</option>
            <option value="low_high">Price: Low to High</option>
            <option value="high_low">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '48px',
          textAlign: 'center',
          borderRadius: '0 0 4px 4px'
        }}>
          <PackageX size={48} color="#9e9e9e" style={{ margin: '0 auto 12px' }} />
          <h3>No products match your active filters</h3>
          <p style={{ color: '#878787', fontSize: '0.9rem', marginTop: '4px' }}>
            Try changing the category, clearing the search, or checking back later.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              isAdminView={isAdminView}
              onToggleStock={onToggleStock}
            />
          ))}
        </div>
      )}
    </div>
  );
}
