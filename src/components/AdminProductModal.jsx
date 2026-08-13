import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Edit, Upload, Image as ImageIcon, Check } from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'Smartphone', url: '/images/mobile_phone.jpg' },
  { name: 'Denim Jacket', url: '/images/fashion_jacket.jpg' },
  { name: 'Desk Lamp', url: '/images/home_lamp.jpg' },
  { name: 'Organic Tea Box', url: '/images/grocery_tea.jpg' },
  { name: 'RC Racing Car', url: '/images/toy_car.jpg' },
  { name: 'Headphones', url: '/images/headphones.jpg' }
];

export default function AdminProductModal({
  isOpen,
  onClose,
  productToEdit,
  categories = [],
  onSaveProduct,
  showToast
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Mobiles');
  const [customCategory, setCustomCategory] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [image, setImage] = useState('/images/headphones.jpg');
  const [description, setDescription] = useState('');
  const [specs, setSpecs] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title || '');
      setCategory(productToEdit.category || 'Other');
      setPrice(productToEdit.price || '');
      setOriginalPrice(productToEdit.originalPrice || '');
      setStock(productToEdit.stock !== undefined ? String(productToEdit.stock) : '10');
      setImage(productToEdit.image || '/images/headphones.jpg');
      setDescription(productToEdit.description || '');
      setSpecs(productToEdit.specs ? productToEdit.specs.join('\n') : '');
    } else {
      setTitle('');
      setCategory('Mobiles');
      setCustomCategory('');
      setPrice('');
      setOriginalPrice('');
      setStock('10');
      setImage('/images/headphones.jpg');
      setDescription('');
      setSpecs('');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle direct file upload from PC
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        if (showToast) showToast('📸 Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCategory = category === 'CUSTOM' ? customCategory : category;

    const payload = {
      title,
      category: selectedCategory || 'Other',
      price: Number(price),
      originalPrice: Number(originalPrice) || Number(price),
      stock: Number(stock),
      inStock: Number(stock) > 0,
      image: image || '/images/headphones.jpg',
      description,
      specs: specs ? specs.split('\n').filter(Boolean) : ['Genuine Quality Product']
    };

    onSaveProduct(payload, productToEdit ? productToEdit.id : null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            {productToEdit ? <Edit size={20} style={{ display: 'inline', marginRight: '6px' }} /> : <PlusCircle size={20} style={{ display: 'inline', marginRight: '6px' }} />}
            {productToEdit ? 'Edit Product Item' : 'Add New Inventory Item'}
          </h3>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Product Title:</label>
              <input
                type="text"
                className="input-field"
                style={{ marginBottom: 0 }}
                placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Category:</label>
                <select
                  className="input-field"
                  style={{ marginBottom: 0 }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Mobiles">📱 Mobiles</option>
                  <option value="Fashion">👗 Fashion</option>
                  <option value="Home">🏠 Home</option>
                  <option value="Grocery">🛒 Grocery</option>
                  <option value="Toys">🧸 Toys</option>
                  <option value="Other">📦 Other</option>
                  <option value="CUSTOM">+ Add Custom Category...</option>
                </select>
              </div>

              {category === 'CUSTOM' && (
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Custom Category Name:</label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ marginBottom: 0 }}
                    placeholder="e.g. Sports & Fitness"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Selling Price (₹):</label>
                <input
                  type="number"
                  className="input-field"
                  style={{ marginBottom: 0 }}
                  placeholder="24990"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Original Price (MRP ₹):</label>
                <input
                  type="number"
                  className="input-field"
                  style={{ marginBottom: 0 }}
                  placeholder="29990"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Stock Quantity:</label>
                <input
                  type="number"
                  className="input-field"
                  style={{ marginBottom: 0 }}
                  placeholder="10"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* REAL PRODUCT IMAGE UPLOADER & PREVIEW */}
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <ImageIcon size={18} color="#2563eb" /> Product Image Upload & Selection:
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '14px', alignItems: 'center' }}>
                {/* Live Preview Box */}
                <div style={{
                  width: '120px',
                  height: '110px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  overflow: 'hidden'
                }}>
                  {image ? (
                    <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No Image</span>
                  )}
                </div>

                {/* Upload Options */}
                <div>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#2563eb',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      <Upload size={14} /> Upload Image File from PC
                      <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>

                  <input
                    type="text"
                    className="input-field"
                    style={{ marginBottom: 0, fontSize: '0.8rem', padding: '6px 10px' }}
                    placeholder="Or paste Image URL (e.g. https://...)"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
              </div>

              {/* Quick Preset Selector */}
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Or Select Sample Asset:</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img.name}
                      onClick={() => setImage(img.url)}
                      style={{
                        padding: '3px 8px',
                        fontSize: '0.72rem',
                        borderRadius: '4px',
                        border: image === img.url ? '1px solid #2563eb' : '1px solid #cbd5e1',
                        background: image === img.url ? '#eff6ff' : 'white',
                        color: image === img.url ? '#2563eb' : '#475569',
                        cursor: 'pointer',
                        fontWeight: image === img.url ? 700 : 500
                      }}
                    >
                      {img.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Product Description:</label>
              <textarea
                className="input-field"
                style={{ height: '60px', resize: 'none', marginBottom: 0 }}
                placeholder="Key highlights and product overview..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Specifications (one per line):</label>
              <textarea
                className="input-field"
                style={{ height: '60px', resize: 'none', marginBottom: 0 }}
                placeholder="100% Authentic Product&#10;Includes 1 Year Warranty"
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              {productToEdit ? 'SAVE CHANGES' : 'CREATE PRODUCT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
