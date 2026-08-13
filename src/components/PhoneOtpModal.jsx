import React, { useState } from 'react';
import { X, Smartphone, KeyRound, UserCheck, ShieldCheck } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function PhoneOtpModal({ onClose, onLoginSuccess, showToast }) {
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = Choice/Phone, 2 = OTP Input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setStep(2);
        showToast(`OTP Code 123456 sent to +91 ${phone}`);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setLoading(false);
      setStep(2);
      showToast(`OTP Code 123456 sent to +91 ${phone}`);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit OTP code');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        onLoginSuccess(data.user);
        showToast(`Welcome back, ${data.user.name}!`);
        onClose();
      } else {
        setError(data.message || 'Incorrect OTP code. Try 123456');
      }
    } catch (err) {
      setLoading(false);
      if (otp === '123456') {
        const isAdmin = phone === '9999999999';
        const userObj = {
          phone,
          name: isAdmin ? 'Admin (K. Taje)' : 'Customer (' + phone.slice(-4) + ')',
          role: isAdmin ? 'admin' : 'customer',
          superCoins: 250
        };
        onLoginSuccess(userObj);
        showToast(`Welcome back, ${userObj.name}!`);
        onClose();
      } else {
        setError('Incorrect OTP code. Try 123456');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      if (supabase && supabase.auth) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
      }
    } catch (err) {
      console.log('Google Auth fallback simulation');
    }

    // Google Sign In profile object
    const googleUser = {
      name: 'K. Taje (Google Account)',
      email: 'taje.cse@gmail.com',
      phone: '9876543210',
      role: 'customer',
      superCoins: 350,
      avatar: 'https://lh3.googleusercontent.com/a/default-user'
    };

    onLoginSuccess(googleUser);
    showToast('⚡ Logged in with Google Account!');
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
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body otp-modal-content">
          <div className="otp-icon">
            {step === 1 ? <Smartphone size={28} /> : <KeyRound size={28} />}
          </div>

          <h3 style={{ marginBottom: '6px' }}>
            {step === 1 ? 'Login with Mobile OTP or Google' : 'Verify Mobile OTP'}
          </h3>
          <p style={{ color: '#878787', fontSize: '0.85rem', marginBottom: '16px' }}>
            {step === 1
              ? 'Access your orders, wishlist, and active inventory session'
              : `Enter the 6-digit verification code sent to +91 ${phone}`}
          </p>

          {/* Google Sign In Option */}
          {step === 1 && (
            <div style={{ marginBottom: '20px' }}>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  padding: '11px 0',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  borderRadius: '4px',
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
                Sign in with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0', color: '#9ca3af' }}>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
                <span style={{ padding: '0 10px', fontSize: '0.8rem', fontWeight: 600 }}>OR USE MOBILE OTP</span>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
              </div>
            </div>
          )}

          <div className="otp-demo-notice">
            💡 <strong>Demo Mobile OTP:</strong> Use any 10-digit number. Verification code is <strong>123456</strong>. (Use <code>9999999999</code> for Admin access).
          </div>

          {error && (
            <div style={{ color: 'var(--fk-red)', fontSize: '0.85rem', marginBottom: '12px', fontWeight: 600 }}>
              ⚠ {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <div style={{ textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: '#444' }}>
                Mobile Number:
              </div>
              <input
                type="tel"
                className="input-field"
                placeholder="Enter 10-digit Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                required
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending OTP...' : 'CONTINUE & SEND OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div style={{ textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: '#444' }}>
                Enter 6-Digit Verification Code:
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="1 2 3 4 5 6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem', fontWeight: 700 }}
                required
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'VERIFY OTP & LOGIN'}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: 'var(--fk-blue)', marginTop: '12px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
              >
                Change Mobile Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
