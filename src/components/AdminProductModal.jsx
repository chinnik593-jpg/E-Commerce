import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Edit, Image, Tag, DollarSign, Package } from 'lucide-react';

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
      <div className="modal-card" style={{ maxWidth: '620px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            {productToEdit ? <Edit size={20} style={{ display: 'inline', marginRight: '6px' }} /> : <PlusCircle size={20} style={{ display: 'inline', marginRight: '6px' }} />}
            {productToEdit ? 'Edit Product Item' : 'Add New Inventory Item'}
          </h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Product Title:</label>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Category:</label>
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
                  <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Custom Category Name:</label>
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
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Selling Price (₹):</label>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Original MRP Price (₹):</label>
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
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Stock Quantity:</label>
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

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Image URL / Asset Path:</label>
              <input
                type="text"
                className="input-field"
                style={{ marginBottom: 0 }}
                placeholder="/images/headphones.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Product Description:</label>
              <textarea
                className="input-field"
                style={{ height: '60px', resize: 'none', marginBottom: 0 }}
                placeholder="Key highlights and product overview..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Specifications (one per line):</label>
              <textarea
                className="input-field"
                style={{ height: '60px', resize: 'none', marginBottom: 0 }}
                placeholder="100% Genuine Quality&#10;1 Year Flipkart Warranty"
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
