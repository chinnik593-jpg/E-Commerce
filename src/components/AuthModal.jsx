import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, UserCheck } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess, showToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailAuth = (e) => {
    if (e) e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setLoading(true);

    const emailLower = email.toLowerCase().trim();
    const isAdmin = emailLower.includes('admin') || emailLower.includes('teja');
    
    // Extract friendly name from email (e.g., friend@gmail.com -> Friend)
    const namePart = email.split('@')[0];
    const friendlyName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const userObj = {
      email: emailLower,
      name: isAdmin ? `Admin (${friendlyName})` : friendlyName,
      role: isAdmin ? 'admin' : 'customer',
      superCoins: 200
    };

    // Save active session to localStorage so friend stays logged in
    try {
      localStorage.setItem('snapcart_user', JSON.stringify(userObj));
    } catch (err) {}

    onLoginSuccess(userObj);
    if (showToast) showToast(`Welcome, ${userObj.name}!`);
    setLoading(false);
    onClose();
  };

  const handleGoogleLogin = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    const googleUser = {
      name: 'Google User',
      email: 'user.google@gmail.com',
      role: 'customer',
      superCoins: 350,
      avatar: 'https://lh3.googleusercontent.com/a/default-user'
    };

    try {
      localStorage.setItem('snapcart_user', JSON.stringify(googleUser));
    } catch (err) {}

    onLoginSuccess(googleUser);
    if (showToast) showToast('⚡ Signed in with Google Account!');
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <UserCheck size={20} style={{ display: 'inline', marginRight: '8px' }} />
            SnapCart Authentication Portal
          </h3>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body otp-modal-content">
          <div className="otp-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <LogIn size={28} />
          </div>

          <h3 style={{ marginBottom: '6px' }}>Sign in to SnapCart</h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>
            Enter your email to sign in or create an account
          </p>

          {/* Google Sign In Option */}
          <div style={{ marginBottom: '20px' }}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                background: '#ffffff',
                color: '#374151',
                border: '1px solid #d1d5db',
                padding: '12px 0',
                fontSize: '0.92rem',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                transition: 'background 0.15s ease'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: '18px 0', color: '#9ca3af' }}>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
              <span style={{ padding: '0 10px', fontSize: '0.8rem', fontWeight: 600 }}>OR EMAIL SIGN IN</span>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
            </div>
          </div>

          {error && (
            <div style={{ color: 'var(--brand-rose)', fontSize: '0.85rem', marginBottom: '12px', fontWeight: 600 }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth}>
            <div style={{ textAlign: 'left', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Your Email Address:
            </div>
            <input
              type="email"
              className="input-field"
              placeholder="e.g. friend@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div style={{ textAlign: 'left', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Password:
            </div>
            <input
              type="password"
              className="input-field"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="submit-btn" style={{ background: 'var(--brand-blue)', marginTop: '8px' }}>
              SIGN IN WITH EMAIL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
