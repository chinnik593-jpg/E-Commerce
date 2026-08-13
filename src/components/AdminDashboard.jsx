import React, { useState } from 'react';
import {
  Package, ShoppingBag, DollarSign, AlertCircle, Plus, Edit2, Trash2,
  CheckCircle2, XCircle, RefreshCw, Filter, Layers, ListOrdered, Settings,
  Sparkles, Upload, FileText
} from 'lucide-react';

export default function AdminDashboard({
  products = [],
  orders = [],
  categories = [],
  onOpenAddModal,
  onOpenEditModal,
  onToggleStock,
  onUpdateStockCount,
  onDeleteProduct,
  onUpdateOrderStatus,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'orders', 'settings'
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStockStatus, setFilterStockStatus] = useState('all'); // 'all', 'instock', 'outofstock', 'lowstock'

  // Dynamic Store Control Settings (Editable directly from UI without code)
  const [storeName, setStoreName] = useState('SnapCart');
  const [noticeText, setNoticeText] = useState('⚡ Super Saver Deals Live | Free Delivery on Orders Over ₹499!');
  const [freeShippingLimit, setFreeShippingLimit] = useState(499);
  const [studentName, setStudentName] = useState('K. Teja');
  const [rollNo, setRollNo] = useState('23NA1A0595');
  const [collegeName, setCollegeName] = useState('Lingayas Institute of Management and Technology');

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const outOfStockCount = products.filter(p => !p.inStock || p.stock <= 0).length;
  const lowStockCount = products.filter(p => p.inStock && p.stock > 0 && p.stock <= 5).length;

  // Filter products
  let filteredProducts = [...products];
  if (filterCategory !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());
  }
  if (filterStockStatus === 'instock') {
    filteredProducts = filteredProducts.filter(p => p.inStock && p.stock > 0);
  } else if (filterStockStatus === 'outofstock') {
    filteredProducts = filteredProducts.filter(p => !p.inStock || p.stock <= 0);
  } else if (filterStockStatus === 'lowstock') {
    filteredProducts = filteredProducts.filter(p => p.inStock && p.stock > 0 && p.stock <= 5);
  }

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (showToast) showToast('✔ Super Admin Store settings updated live!');
  };

  const handleBulkRestock = () => {
    products.forEach(p => {
      if (!p.inStock || p.stock <= 5) {
        onUpdateStockCount(p.id, 15);
      }
    });
    if (showToast) showToast('⚡ Bulk Restock Complete! All low/out-of-stock items updated to 15 units.');
  };

  return (
    <div className="admin-dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={22} color="#2563eb" />
            Super Admin All-In-One Control Center
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            Control product stock, edit prices, upload images, manage orders, and configure store settings without editing code.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`filter-pill ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <Layers size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Stock & Inventory ({products.length})
          </button>
          <button
            className={`filter-pill ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <ListOrdered size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Orders ({orders.length})
          </button>
          <button
            className={`filter-pill ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <Settings size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Store Settings
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#2563eb' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Revenue</h4>
            <p>₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b981' }}>
            <Package size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Products</h4>
            <p>{products.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b' }}>
            <ShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Orders</h4>
            <p>{orders.length}</p>
          </div>
        </div>

        <div className="stat-card" style={{ borderColor: outOfStockCount > 0 ? '#fca5a5' : '#e2e8f0' }}>
          <div className="stat-icon" style={{ background: outOfStockCount > 0 ? '#ef4444' : '#64748b' }}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <h4>Out of Stock Alert</h4>
            <p style={{ color: outOfStockCount > 0 ? '#dc2626' : '#0f172a' }}>{outOfStockCount} Items</p>
          </div>
        </div>
      </div>

      {/* Tab 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <div>
          <div className="admin-actions-bar">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              >
                <option value="All">All Categories ({products.length})</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <button
                className={`filter-pill ${filterStockStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStockStatus('all')}
              >
                All Stock
              </button>
              <button
                className={`filter-pill ${filterStockStatus === 'instock' ? 'active' : ''}`}
                onClick={() => setFilterStockStatus('instock')}
              >
                In Stock Only
              </button>
              <button
                className={`filter-pill ${filterStockStatus === 'outofstock' ? 'active' : ''}`}
                onClick={() => setFilterStockStatus('outofstock')}
              >
                Out of Stock ({outOfStockCount})
              </button>
              <button
                className={`filter-pill ${filterStockStatus === 'lowstock' ? 'active' : ''}`}
                onClick={() => setFilterStockStatus('lowstock')}
              >
                Low Stock (&le; 5)
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="filter-pill"
                onClick={handleBulkRestock}
                style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}
              >
                <RefreshCw size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Bulk Restock (+15)
              </button>
              <button className="primary-btn" onClick={onOpenAddModal}>
                <Plus size={18} /> Add New Product / Item
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product Item</th>
                  <th>Category</th>
                  <th>Price (₹)</th>
                  <th>Stock Count</th>
                  <th>Stock Status</th>
                  <th>Stock Quick Toggle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '28px', color: '#64748b' }}>
                      No inventory items found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(p => {
                    const isOut = !p.inStock || p.stock <= 0;

                    return (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={p.image} alt={p.title} style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '6px', background: '#f8fafc', padding: '4px', border: '1px solid #e2e8f0' }} />
                            <div>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.title}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ID: {p.id}</div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="academic-badge" style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}>
                            {p.category}
                          </span>
                        </td>

                        <td style={{ fontWeight: 700, color: '#0f172a' }}>
                          ₹{p.price.toLocaleString('en-IN')}
                        </td>

                        <td>
                          {/* Stock Quantity Controls */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              className="qty-btn"
                              onClick={() => onUpdateStockCount(p.id, Math.max(0, p.stock - 1))}
                            >-</button>
                            <input
                              type="number"
                              value={p.stock}
                              onChange={(e) => onUpdateStockCount(p.id, Math.max(0, parseInt(e.target.value) || 0))}
                              style={{ width: '52px', textAlign: 'center', padding: '3px 4px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.85rem' }}
                            />
                            <button
                              className="qty-btn"
                              onClick={() => onUpdateStockCount(p.id, p.stock + 5)}
                            >+5</button>
                          </div>
                        </td>

                        <td>
                          <span className={`stock-badge ${isOut ? 'out-of-stock' : 'in-stock'}`}>
                            {isOut ? 'Out of Stock' : 'In Stock'}
                          </span>
                        </td>

                        <td>
                          {/* One-Click Stock Toggle */}
                          <button
                            className={`admin-quick-toggle ${isOut ? 'mark-in' : 'mark-out'}`}
                            onClick={() => onToggleStock(p.id, isOut)}
                            style={{ margin: 0, padding: '5px 12px', fontSize: '0.78rem' }}
                          >
                            {isOut ? '⚡ Set In Stock' : '🚫 Set Out of Stock'}
                          </button>
                        </td>

                        <td>
                          <div className="action-btns-group">
                            <button className="icon-btn edit" onClick={() => onOpenEditModal(p)} title="Edit Item & Upload Image">
                              <Edit2 size={14} /> Edit
                            </button>
                            <button className="icon-btn delete" onClick={() => onDeleteProduct(p.id)} title="Delete Item">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders List */}
      {activeTab === 'orders' && (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date & Time</th>
                <th>Customer Info</th>
                <th>Purchased Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Fulfillment Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '28px', color: '#64748b' }}>
                    No customer orders placed yet.
                  </td>
                </tr>
              ) : (
                orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 700, color: '#2563eb' }}>{o.id}</td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{new Date(o.date).toLocaleString()}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{o.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>📱 {o.phone}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                        {o.items && o.items.map((i, idx) => (
                          <div key={idx}>• {i.title} (x{i.quantity})</div>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: '#059669' }}>
                      ₹{o.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className="stock-badge in-stock" style={{
                        background: o.status === 'Delivered' ? '#ecfdf5' : '#eff6ff',
                        color: o.status === 'Delivered' ? '#059669' : '#2563eb',
                        border: '1px solid #bfdbfe'
                      }}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateOrderStatus(o.id, e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '6px', fontSize: '0.82rem', border: '1px solid #cbd5e1' }}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Store Control Settings */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: '#0f172a' }}>
            Storefront & Project Display Configurator
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Store Brand Name:</label>
              <input
                type="text"
                className="input-field"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Free Shipping Limit (₹):</label>
              <input
                type="number"
                className="input-field"
                value={freeShippingLimit}
                onChange={(e) => setFreeShippingLimit(Number(e.target.value))}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Banner Announcement Notice:</label>
            <input
              type="text"
              className="input-field"
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Student Name:</label>
              <input
                type="text"
                className="input-field"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Roll Number:</label>
              <input
                type="text"
                className="input-field"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Institution Name:</label>
              <input
                type="text"
                className="input-field"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" style={{ width: 'auto', padding: '10px 24px' }}>
            SAVE LIVE STORE CONFIGURATION
          </button>
        </form>
      )}
    </div>
  );
}
