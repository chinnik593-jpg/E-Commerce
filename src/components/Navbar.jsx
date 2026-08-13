import React, { useState } from 'react';
import { Search, ShoppingCart, ShieldCheck, User, LogOut, ChevronDown, Smartphone } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenCart,
  onOpenAuth,
  user,
  onLogout,
  isAdminView,
  setIsAdminView,
  products = []
}) {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const filteredSuggestions = searchTerm.trim()
    ? products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Flipkart Logo */}
        <a href="#" className="brand-logo" onClick={() => setIsAdminView(false)}>
          <span>Flipkart</span>
          <span className="brand-subtitle">
            Explore <span className="plus">Plus</span>
            <span style={{ color: '#ffe500', fontSize: '0.9rem', lineHeight: 0 }}>✦</span>
          </span>
        </a>

        {/* Search Bar */}
        <div className="search-box">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for products, brands and more (e.g., Mobile, Denim, Tea, RC Car)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
            />
            <Search className="search-icon" size={20} />
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {showSearchDropdown && filteredSuggestions.length > 0 && (
            <div className="search-dropdown">
              {filteredSuggestions.map((prod) => (
                <div
                  key={prod.id}
                  className="search-item"
                  onMouseDown={() => {
                    setSearchTerm(prod.title);
                    setShowSearchDropdown(false);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={prod.image} alt={prod.title} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '0.85rem' }}>{prod.title}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#388e3c', fontWeight: 600 }}>₹{prod.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nav Actions */}
        <div className="nav-actions">
          {/* User Auth Status */}
          {user ? (
            <div className="user-profile-badge" onClick={onLogout} title="Click to Logout">
              <User size={18} />
              <span>{user.name}</span>
              <LogOut size={14} style={{ marginLeft: '4px' }} />
            </div>
          ) : (
            <button className="login-btn" onClick={onOpenAuth}>
              <Smartphone size={16} style={{ display: 'inline', marginRight: '4px' }} />
              Login
            </button>
          )}

          {/* Cart button */}
          {!isAdminView && (
            <button className="cart-btn" onClick={onOpenCart}>
              <ShoppingCart size={22} />
              <span>Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          )}

          {/* Admin Switch Toggle Button */}
          <button
            className={`admin-switch-btn ${isAdminView ? 'active' : ''}`}
            onClick={() => setIsAdminView(!isAdminView)}
          >
            <ShieldCheck size={18} />
            {isAdminView ? 'Customer Store' : 'Admin Portal'}
          </button>
        </div>
      </div>
    </header>
  );
}
