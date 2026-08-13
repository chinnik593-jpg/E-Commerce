import React from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout
}) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalOriginal = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const totalSavings = totalOriginal - totalAmount;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: 0 }}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} /> My SnapCart Cart ({cartItems.length})
          </h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Free Delivery Bar */}
        <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '10px 16px', fontSize: '0.82rem', fontWeight: 600, borderBottom: '1px solid #c8e6c9' }}>
          ✓ Congratulations! You qualify for <strong>FREE Delivery & 50 SuperCoins</strong>
        </div>

        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px' }}>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/empty-cart_ee5041.png" alt="Empty Cart" style={{ width: '160px', marginBottom: '16px' }} />
              <h4>Your cart is empty!</h4>
              <p style={{ color: '#878787', fontSize: '0.85rem', marginTop: '4px' }}>Explore deals and add items to your cart.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-img" />

                <div className="cart-item-info">
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#212121', marginBottom: '4px' }}>
                    {item.title}
                  </h4>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>₹{item.price.toLocaleString('en-IN')}</span>
                    {item.originalPrice > item.price && (
                      <span style={{ fontSize: '0.8rem', color: '#878787', textDecoration: 'line-through' }}>
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Quantity Control */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity - 1)}>-</button>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--fk-red)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.8rem' }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Price ({cartItems.length} items):</span>
              <span>₹{totalOriginal.toLocaleString('en-IN')}</span>
            </div>

            {totalSavings > 0 && (
              <div style={{ fontSize: '0.85rem', color: '#388e3c', fontWeight: 600, marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Discount & Savings:</span>
                <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="cart-total-row">
              <span>Total Amount:</span>
              <span style={{ color: 'var(--fk-text-dark)' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <button
              className="submit-btn"
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
              style={{ background: 'var(--fk-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              PLACE ORDER <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
