import React, { useState } from 'react';
import { X, Smartphone, KeyRound, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PhoneOtpModal({ onClose, onLoginSuccess, showToast }) {
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = Phone Input, 2 = OTP Input
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
      // Fallback local state if server offline
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <Smartphone size={20} style={{ display: 'inline', marginRight: '8px' }} />
            SnapCart Mobile Login
          </h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body otp-modal-content">
          <div className="otp-icon">
            {step === 1 ? <Smartphone size={28} /> : <KeyRound size={28} />}
          </div>

          <h3 style={{ marginBottom: '6px' }}>
            {step === 1 ? 'Login or Sign Up with Mobile' : 'Verify Mobile OTP'}
          </h3>
          <p style={{ color: '#878787', fontSize: '0.85rem', marginBottom: '16px' }}>
            {step === 1
              ? 'Get access to your Orders, Wishlist and SuperCoins'
              : `Enter the 6-digit code sent to +91 ${phone}`}
          </p>

          <div className="otp-demo-notice">
            💡 <strong>Demo Mobile OTP:</strong> Use any 10-digit number. The verification code is <strong>123456</strong>. (Use <code>9999999999</code> for Admin access).
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
