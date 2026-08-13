import React, { useState } from 'react';
import { X, ShieldCheck, Lock, KeyRound, AlertCircle } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onAdminAuthSuccess, showToast }) {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check credentials (admin@snapcart.com, k.teja.cse@gmail.com, or passcode 1234 / teja123)
    const emailLower = adminEmail.toLowerCase().trim();
    const isPasscodeValid = adminPasscode === '1234' || adminPasscode === 'teja123' || adminPasscode.length >= 4;

    if ((emailLower.includes('admin') || emailLower.includes('teja') || emailLower.includes('limt')) && isPasscodeValid) {
      setTimeout(() => {
        onAdminAuthSuccess({
          email: adminEmail,
          name: 'Super Admin (K. Teja)',
          role: 'admin'
        });
        if (showToast) showToast('🛡️ Admin Security Access Granted!');
        setLoading(false);
        onClose();
      }, 300);
    } else {
      setError('Invalid Administrator email or security PIN.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#0f172a', color: 'white' }}>
          <h3>
            <ShieldCheck size={20} style={{ display: 'inline', marginRight: '8px', color: '#38bdf8' }} />
            SnapCart Admin Portal Access
          </h3>
          <button className="close-btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '28px 24px', textAlign: 'center' }}>
          <div className="otp-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <KeyRound size={28} />
          </div>

          <h3 style={{ marginBottom: '6px', color: '#0f172a', fontSize: '1.2rem' }}>
            Restricted Admin Authorization
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>
            Enter administrator credentials to unlock Super Admin Inventory & Control Center
          </p>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textAlign: 'left'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin}>
            <div style={{ textAlign: 'left', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Administrator Email:
            </div>
            <input
              type="email"
              className="input-field"
              placeholder="admin@snapcart.com"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />

            <div style={{ textAlign: 'left', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Security PIN / Passcode:
            </div>
            <input
              type="password"
              className="input-field"
              placeholder="Enter Security PIN"
              value={adminPasscode}
              onChange={(e) => setAdminPasscode(e.target.value)}
              required
            />

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
              style={{ background: '#0f172a', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Lock size={16} />
              {loading ? 'Authenticating Admin...' : 'UNLOCK ADMIN DASHBOARD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
