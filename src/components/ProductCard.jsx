import React from 'react';
import { Star, ShoppingCart, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
  isAdminView,
  onToggleStock
}) {
  const isOutOfStock = !product.inStock || product.stock <= 0;

  return (
    <div className="product-card" onClick={() => onSelectProduct(product)}>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} />

        {/* Stock Badge */}
        <span className={`stock-badge ${isOutOfStock ? 'out-of-stock' : 'in-stock'}`}>
          {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
        </span>
      </div>

      <div>
        <h3 className="product-title" title={product.title}>{product.title}</h3>

        {/* Rating and Assured Tag */}
        <div className="product-rating">
          <div className="rating-badge">
            <span>{product.rating}</span>
            <Star size={12} fill="white" />
          </div>
          <span className="ratings-count">({product.ratingsCount ? product.ratingsCount.toLocaleString() : '100+'})</span>

          {product.assured && (
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
              alt="Flipkart Assured"
              className="assured-logo"
            />
          )}
        </div>

        {/* Price Row */}
        <div className="price-row">
          <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {product.discount && (
            <span className="discount-text">{product.discount}</span>
          )}
        </div>

        <div className="free-delivery-tag">
          ✓ Free Delivery by Tomorrow
        </div>
      </div>

      <div>
        {/* Customer Action */}
        {!isAdminView ? (
          <button
            className="add-cart-btn"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        ) : (
          /* Admin Quick Toggle Action */
          <button
            className={`admin-quick-toggle ${isOutOfStock ? 'mark-in' : 'mark-out'}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStock(product.id, isOutOfStock);
            }}
          >
            {isOutOfStock ? '⚡ Mark In Stock' : '🚫 Mark Out of Stock'}
          </button>
        )}
      </div>
    </div>
  );
}
