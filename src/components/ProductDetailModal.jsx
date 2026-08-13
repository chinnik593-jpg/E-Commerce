import React, { useState } from 'react';
import { X, Star, ShoppingCart, Zap, CheckCircle, Truck, ShieldCheck, MapPin } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onAddToCart, onBuyNow }) {
  const [pincode, setPincode] = useState('500001');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  if (!product) return null;

  const isOutOfStock = !product.inStock || product.stock <= 0;

  const checkPincode = () => {
    if (pincode.length === 6) {
      setPincodeStatus('Available for FREE Delivery by Tomorrow, 11:00 AM');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Pincode');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Product Specifications & Details</h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
          {/* Left Column: Product Image & Badges */}
          <div>
            <div style={{
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
              marginBottom: '16px',
              background: '#fafafa'
            }}>
              <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '220px', objectFit: 'contain' }} />
            </div>

            <span className={`stock-badge ${isOutOfStock ? 'out-of-stock' : 'in-stock'}`} style={{ display: 'block', textAlign: 'center', fontSize: '0.8rem', padding: '6px' }}>
              {isOutOfStock ? '❌ Currently Out of Stock' : `✔ In Stock (${product.stock} units available)`}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              <button
                className="add-cart-btn"
                disabled={isOutOfStock}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                style={{ padding: '12px 0', fontSize: '0.95rem' }}
              >
                <ShoppingCart size={18} style={{ display: 'inline', marginRight: '6px' }} />
                Add to Cart
              </button>

              <button
                className="hero-btn"
                disabled={isOutOfStock}
                onClick={() => {
                  onBuyNow(product);
                  onClose();
                }}
                style={{
                  background: isOutOfStock ? '#ccc' : 'var(--fk-orange)',
                  color: 'white',
                  padding: '12px 0',
                  fontSize: '0.95rem',
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                }}
              >
                <Zap size={18} style={{ display: 'inline', marginRight: '6px' }} />
                Buy Now
              </button>
            </div>
          </div>

          {/* Right Column: Information & Specs */}
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--fk-blue)', fontWeight: 600 }}>
              Category: {product.category}
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '4px 0 8px' }}>
              {product.title}
            </h2>

            <div className="product-rating" style={{ marginBottom: '12px' }}>
              <div className="rating-badge">
                <span>{product.rating}</span>
                <Star size={12} fill="white" />
              </div>
              <span className="ratings-count">({product.ratingsCount ? product.ratingsCount.toLocaleString() : '100+'} Ratings)</span>
              {product.assured && (
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                  alt="Assured"
                  className="assured-logo"
                />
              )}
            </div>

            <div className="price-row" style={{ alignItems: 'center', marginBottom: '16px' }}>
              <span className="current-price" style={{ fontSize: '1.6rem' }}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <span className="original-price" style={{ fontSize: '1rem' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              {product.discount && (
                <span className="discount-text" style={{ fontSize: '1rem' }}>{product.discount}</span>
              )}
            </div>

            {/* Delivery Pincode Checker */}
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '6px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <MapPin size={16} color="var(--fk-blue)" /> Check Delivery Availability:
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  style={{ width: '130px', padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.85rem' }}
                />
                <button
                  onClick={checkPincode}
                  style={{ background: 'var(--fk-blue)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
                >
                  Check
                </button>
              </div>
              {pincodeStatus && (
                <div style={{ fontSize: '0.8rem', color: '#388e3c', marginTop: '6px', fontWeight: 500 }}>
                  ✓ {pincodeStatus}
                </div>
              )}
            </div>

            {/* Description & Specifications */}
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>Product Overview:</h4>
              <p style={{ fontSize: '0.88rem', color: '#333' }}>{product.description}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Key Specifications:</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#444' }}>
                {product.specs && product.specs.map((spec, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
