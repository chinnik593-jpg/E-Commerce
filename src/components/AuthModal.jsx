import React, { useState } from 'react';
import { X, LogIn, UserCheck, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AuthModal({ onClose, showToast }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (authError) {
        setError(authError.message || 'Google sign in failed. Please check Supabase configuration.');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during Google authentication.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <UserCheck size={20} style={{ display: 'inline', marginRight: '8px' }} />
            SnapCart Authentication
          </h3>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body otp-modal-content" style={{ padding: '32px 24px' }}>
          <div className="otp-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <LogIn size={28} />
          </div>

          <h3 style={{ marginBottom: '6px', fontSize: '1.25rem', color: '#0f172a' }}>
            Sign in with Google
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '24px' }}>
            Sign in securely using your official Google Account via Supabase Auth
          </p>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Real Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: '100%',
              background: '#ffffff',
              color: '#374151',
              border: '1px solid #cbd5e1',
              padding: '14px 0',
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            {loading ? 'Connecting to Google...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    </div>
  );
}
