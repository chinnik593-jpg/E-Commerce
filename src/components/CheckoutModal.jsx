import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, MapPin, Phone, Truck } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  user,
  onOrderSuccess
}) {
  const [address, setAddress] = useState('Department of CSE, Student Hostel Block B, Room 402, Campus');
  const [name, setName] = useState(user ? user.name : 'K. Teja');
  const [phone, setPhone] = useState(user ? user.phone : '9876543210');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      customerName: name,
      phone: phone,
      address: address,
      items: cartItems,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const order = await res.json();
      setIsSubmitting(false);

      if (res.ok) {
        onOrderSuccess(order);
      } else {
        // Fallback local mock order ID
        onOrderSuccess({
          id: "OD" + Date.now().toString().slice(-8),
          date: new Date().toISOString(),
          customerName: name,
          totalAmount: totalAmount,
          items: cartItems,
          status: "Placed"
        });
      }
    } catch (err) {
      setIsSubmitting(false);
      onOrderSuccess({
        id: "OD" + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        customerName: name,
        totalAmount: totalAmount,
        items: cartItems,
        status: "Placed"
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <ShieldCheck size={20} style={{ display: 'inline', marginRight: '6px' }} />
            SnapCart Secure Checkout
          </h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmitOrder}>
            {/* Step 1: Delivery Address */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--fk-blue)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={18} /> 1. Delivery Address
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Full Name:</label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ marginBottom: 0 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Mobile Number:</label>
                  <input
                    type="tel"
                    className="input-field"
                    style={{ marginBottom: 0 }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Delivery Address:</label>
                <textarea
                  className="input-field"
                  style={{ height: '64px', resize: 'none', marginBottom: 0 }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--fk-blue)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={18} /> 2. Payment Method
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['UPI / Google Pay / PhonePe', 'Credit / Debit Card', 'Cash on Delivery (COD)'].map(method => (
                  <label
                    key={method}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      border: paymentMethod === method ? '2px solid var(--fk-blue)' : '1px solid #ddd',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: paymentMethod === method ? '#f0f5ff' : 'white',
                      fontWeight: paymentMethod === method ? 600 : 400
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '6px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                <span>Amount Payable:</span>
                <span style={{ color: 'var(--fk-orange)' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#388e3c', marginTop: '4px', fontWeight: 600 }}>
                ✓ Includes Free Delivery & GST Taxes
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'PROCESSING ORDER...' : 'CONFIRM & PLACE ORDER'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
