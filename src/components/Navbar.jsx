import React, { useState } from 'react';
import { Search, ShoppingBag, ShieldCheck, User, LogOut, Sparkles, LogIn } from 'lucide-react';

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
  isAdmin,
  products = []
}) {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const filteredSuggestions = searchTerm.trim()
    ? products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
    : [];

  const displayName = user
    ? (user.user_metadata?.full_name || user.user_metadata?.name || user.email)
    : '';

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" onClick={() => setIsAdminView(false)}>
          <div className="logo-icon">
            <Sparkles size={20} />
          </div>
          <span>SnapCart</span>
        </a>

        {/* Search Bar */}
        <div className="search-box">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for products, categories, specs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
            />
            <Search className="search-icon" size={18} />
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={prod.image} alt={prod.title} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{prod.title}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700 }}>₹{prod.price.toLocaleString('en-IN')}</span>
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
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <User size={16} />
              )}
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{displayName}</span>
              <LogOut size={14} style={{ marginLeft: '4px', opacity: 0.8 }} />
            </div>
          ) : (
            <button className="login-btn" onClick={onOpenAuth}>
              <LogIn size={16} style={{ display: 'inline', marginRight: '6px' }} />
              Sign in with Google
            </button>
          )}

          {/* Cart Button */}
          {!isAdminView && (
            <button className="cart-btn" onClick={onOpenCart}>
              <ShoppingBag size={18} />
              <span>Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          )}

          {/* Admin Switch Toggle Button (Visible for authorized admin session) */}
          {isAdmin && (
            <button
              className={`admin-switch-btn ${isAdminView ? 'active' : ''}`}
              onClick={() => setIsAdminView(!isAdminView)}
            >
              <ShieldCheck size={16} />
              {isAdminView ? 'Storefront' : 'Admin Dashboard'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
