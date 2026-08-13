import React from 'react';
import { CheckCircle2, PackageCheck, Truck, ArrowRight, X } from 'lucide-react';

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '520px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#388e3c' }}>
          <h3>
            <CheckCircle2 size={22} style={{ display: 'inline', marginRight: '6px' }} />
            Order Placed Successfully!
          </h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body" style={{ padding: '28px 24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#e8f5e9',
            color: '#388e3c',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justify-content: 'center',
            margin: '0 auto 16px'
          }}>
            <PackageCheck size={36} />
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>
            Thank You for Shopping on Flipkart!
          </h2>

          <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '16px' }}>
            Order ID: <strong style={{ color: 'var(--fk-blue)' }}>{order.id}</strong>
          </p>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', textAlign: 'left', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span>Customer Name:</span>
              <strong>{order.customerName}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span>Total Paid:</span>
              <strong style={{ color: '#388e3c' }}>₹{order.totalAmount ? order.totalAmount.toLocaleString('en-IN') : '0'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>Estimated Delivery:</span>
              <span style={{ color: 'var(--fk-blue)', fontWeight: 600 }}>Tomorrow by 5:00 PM</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="submit-btn" onClick={onClose} style={{ background: 'var(--fk-blue)' }}>
              CONTINUE SHOPPING <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
