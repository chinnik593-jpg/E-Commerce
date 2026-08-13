import React, { useState } from 'react';
import {
  Package, ShoppingBag, DollarSign, AlertCircle, Plus, Edit2, Trash2,
  CheckCircle2, XCircle, RefreshCw, Filter, Layers, ListOrdered
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
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'orders'
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStockStatus, setFilterStockStatus] = useState('all'); // 'all', 'instock', 'outofstock', 'lowstock'

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

  return (
    <div className="admin-dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
            SnapCart Inventory & Seller Dashboard
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            Manage product inventory, toggle stock statuses, add items, and track orders.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`filter-pill ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <Layers size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Inventory Stock Control ({products.length})
          </button>
          <button
            className={`filter-pill ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <ListOrdered size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Customer Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#2874f0' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Revenue</h4>
            <p>₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#388e3c' }}>
            <Package size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Products</h4>
            <p>{products.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fb641b' }}>
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
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.85rem' }}
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

            <button className="primary-btn" onClick={onOpenAddModal}>
              <Plus size={18} /> Add New Product / Item
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Count</th>
                  <th>Stock Status</th>
                  <th>Stock Quick Toggle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
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
                            <img src={p.image} alt={p.title} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', background: '#f8fafc', padding: '2px' }} />
                            <div>
                              <div style={{ fontWeight: 600, color: '#1e293b' }}>{p.title}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ID: {p.id}</div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="academic-badge" style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}>
                            {p.category}
                          </span>
                        </td>

                        <td style={{ fontWeight: 700 }}>
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
                              style={{ width: '50px', textAlign: 'center', padding: '2px 4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem' }}
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
                            style={{ margin: 0, padding: '4px 10px', fontSize: '0.78rem' }}
                          >
                            {isOut ? '⚡ Set In Stock' : '🚫 Set Out of Stock'}
                          </button>
                        </td>

                        <td>
                          <div className="action-btns-group">
                            <button className="icon-btn edit" onClick={() => onOpenEditModal(p)} title="Edit Item">
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
                <th>Date</th>
                <th>Customer</th>
                <th>Purchased Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No customer orders placed yet.
                  </td>
                </tr>
              ) : (
                orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 700, color: 'var(--fk-blue)' }}>{o.id}</td>
                    <td style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(o.date).toLocaleString()}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#888' }}>📱 {o.phone}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem' }}>
                        {o.items && o.items.map((i, idx) => (
                          <div key={idx}>• {i.title} (x{i.quantity})</div>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: '#388e3c' }}>
                      ₹{o.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className="stock-badge in-stock" style={{ background: o.status === 'Delivered' ? '#e8f5e9' : '#fff3e0', color: o.status === 'Delivered' ? '#2e7d32' : '#e65100' }}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateOrderStatus(o.id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
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
    </div>
  );
}
