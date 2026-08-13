import React from 'react';
import { Tag, Zap, ShieldAlert, Sparkles } from 'lucide-react';

export default function HeroSlider({ onShopNow }) {
  return (
    <div className="hero-carousel">
      <div className="hero-text">
        <span className="hero-badge">
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
          Big Billion Days Sale - Live Now
        </span>
        <h1>Mega Savings on Electronics, Mobiles & Fashion</h1>
        <p>Up to 80% Off across Mobiles, Fashion, Home, Grocery & Toys • Free Express Delivery</p>
        <button className="hero-btn" onClick={onShopNow}>
          Explore Deals Now
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '16px 24px',
          borderRadius: '8px',
          textAlign: 'center',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <Zap size={32} color="#ffe500" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>⚡ Flash Deal</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>100% Guaranteed Assured</div>
        </div>
      </div>
    </div>
  );
}
