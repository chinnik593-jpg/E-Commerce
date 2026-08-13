import React, { useState, useEffect } from 'react';
import ProjectBadge from './components/ProjectBadge';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import HeroSlider from './components/HeroSlider';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './components/AdminDashboard';
import AdminProductModal from './components/AdminProductModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import { initialProducts } from '../server/seedData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(["Mobiles", "Fashion", "Home", "Grocery", "Toys", "Other"]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('snapcart_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // UI Modals State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminProductModalOpen, setIsAdminProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [latestOrder, setLatestOrder] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast Notification helper
  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Fetch initial products & orders
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setProducts(data);
      }
    } catch (err) {
      console.log('Using local state for products');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setCategories(data);
      }
    } catch (err) {
      console.log('Using default categories');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.log('Using local orders state');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchOrders();
  }, []);

  // Cart Handlers
  const handleAddToCart = (product) => {
    if (!product.inStock || product.stock <= 0) {
      showToast('❌ Item is currently Out of Stock!');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    showToast(`🛒 Added "${product.title.slice(0, 22)}..." to Cart!`);
  };

  const handleUpdateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from Cart');
  };

  // Admin Handlers
  const handleToggleStock = async (id, currentInStockState) => {
    const nextState = !currentInStockState;

    try {
      const res = await fetch(`/api/products/${id}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: nextState })
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p.id === id ? updated : p));
      } else {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: nextState, stock: nextState ? (p.stock || 10) : 0 } : p));
      }
    } catch (err) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: nextState, stock: nextState ? (p.stock || 10) : 0 } : p));
    }

    showToast(nextState ? '⚡ Item Marked as IN STOCK!' : '🚫 Item Marked as OUT OF STOCK!');
  };

  const handleUpdateStockCount = async (id, count) => {
    try {
      const res = await fetch(`/api/products/${id}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: count })
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p.id === id ? updated : p));
      } else {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: count, inStock: count > 0 } : p));
      }
    } catch (err) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: count, inStock: count > 0 } : p));
    }
    showToast(`Stock updated to ${count} units`);
  };

  const handleSaveProduct = async (productData, editId) => {
    if (editId) {
      try {
        const res = await fetch(`/api/products/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (res.ok) {
          const updated = await res.json();
          setProducts(prev => prev.map(p => p.id === editId ? updated : p));
        } else {
          setProducts(prev => prev.map(p => p.id === editId ? { ...p, ...productData } : p));
        }
      } catch (err) {
        setProducts(prev => prev.map(p => p.id === editId ? { ...p, ...productData } : p));
      }
      showToast('✔ Product details updated!');
    } else {
      try {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (res.ok) {
          const created = await res.json();
          setProducts(prev => [created, ...prev]);
        } else {
          const newObj = { ...productData, id: 'prod-' + Date.now(), rating: 4.5, ratingsCount: 1, assured: true };
          setProducts(prev => [newObj, ...prev]);
        }
      } catch (err) {
        const newObj = { ...productData, id: 'prod-' + Date.now(), rating: 4.5, ratingsCount: 1, assured: true };
        setProducts(prev => [newObj, ...prev]);
      }

      if (productData.category && !categories.includes(productData.category)) {
        setCategories(prev => [...prev, productData.category]);
      }

      showToast(`✔ Added new item under "${productData.category}" category!`);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product from inventory?')) return;

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (err) {}

    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('🗑 Product removed from inventory');
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {}

    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    showToast(`Order ${id} status set to "${status}"`);
  };

  const handleOrderSuccess = (order) => {
    setLatestOrder(order);
    setOrders(prev => [order, ...prev]);

    setProducts(prev => prev.map(p => {
      const orderedItem = order.items.find(i => i.id === p.id);
      if (orderedItem) {
        const newStock = Math.max(0, p.stock - orderedItem.quantity);
        return {
          ...p,
          stock: newStock,
          inStock: newStock > 0
        };
      }
      return p;
    }));

    setCart([]);
    setIsCheckoutOpen(false);
    showToast('🎉 Order Placed Successfully!');
  };

  return (
    <div className="app-container">
      {/* Top Academic Banner */}
      <ProjectBadge />

      {/* Main Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={() => {
          setUser(null);
          try { localStorage.removeItem('snapcart_user'); } catch (e) {}
          showToast('Logged out of session');
        }}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
        products={products}
      />

      {/* Category Pills Bar */}
      {!isAdminView && (
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      )}

      {/* Page Main Content */}
      <main className="app-content">
        {!isAdminView ? (
          <>
            {/* Hero Showcase Banner */}
            <HeroSlider onShopNow={() => setActiveCategory('All')} />

            {/* Product Catalog Grid */}
            <ProductGrid
              products={products.filter(p =>
                searchTerm.trim()
                  ? p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase())
                  : true
              )}
              activeCategory={activeCategory}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              isAdminView={false}
              onToggleStock={handleToggleStock}
            />
          </>
        ) : (
          /* Admin Dashboard */
          <AdminDashboard
            products={products}
            orders={orders}
            categories={categories}
            onOpenAddModal={() => {
              setProductToEdit(null);
              setIsAdminProductModalOpen(true);
            }}
            onOpenEditModal={(product) => {
              setProductToEdit(product);
              setIsAdminProductModalOpen(true);
            }}
            onToggleStock={handleToggleStock}
            onUpdateStockCount={handleUpdateStockCount}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            showToast={showToast}
          />
        )}
      </main>

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={(prod) => {
          handleAddToCart(prod);
          setIsCartOpen(true);
        }}
      />

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(userData) => {
            setUser(userData);
            if (userData.role === 'admin') {
              setIsAdminView(true);
            }
          }}
          showToast={showToast}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        user={user}
        onOrderSuccess={handleOrderSuccess}
      />

      <AdminProductModal
        isOpen={isAdminProductModalOpen}
        onClose={() => setIsAdminProductModalOpen(false)}
        productToEdit={productToEdit}
        categories={categories}
        onSaveProduct={handleSaveProduct}
        showToast={showToast}
      />

      <OrderSuccessModal
        order={latestOrder}
        onClose={() => setLatestOrder(null)}
      />

      {/* Toast Notifications Overlay */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast">
            <CheckCircle2 size={18} color="#10b981" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
