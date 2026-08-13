import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static public images
const publicPath = path.join(__dirname, '../public');
app.use('/images', express.static(path.join(publicPath, 'images')));

// 1. Health check endpoint for Render.com
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'Flipkart Clone E-Commerce API',
    student: 'K. Taje',
    rollNo: '23NA1A0595',
    dept: 'CSE',
    teacher: 'Prof. Prabhakar',
    timestamp: new Date().toISOString()
  });
});

// 2. GET /api/products (with search, category, stock filters)
app.get('/api/products', (req, res) => {
  let products = db.getProducts();
  const { category, search, inStockOnly, sort } = req.query;

  if (category && category !== 'All') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  if (inStockOnly === 'true') {
    products = products.filter(p => p.inStock && p.stock > 0);
  }

  if (sort === 'price_low_high') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_high_low') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  }

  res.json(products);
});

// 3. GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// 4. POST /api/products (Admin Add Product)
app.post('/api/products', (req, res) => {
  try {
    const newProd = db.addProduct(req.body);
    res.status(201).json(newProd);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. PUT /api/products/:id (Admin Edit Product)
app.put('/api/products/:id', (req, res) => {
  const updated = db.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(updated);
});

// 6. PATCH /api/products/:id/stock (Admin Quick Stock Toggle & Count Edit)
app.patch('/api/products/:id/stock', (req, res) => {
  const { inStock, stock } = req.body;
  let updated = null;

  if (stock !== undefined) {
    updated = db.updateProduct(req.params.id, { stock: Number(stock), inStock: Number(stock) > 0 });
  } else if (inStock !== undefined) {
    updated = db.toggleStock(req.params.id, Boolean(inStock));
  } else {
    updated = db.toggleStock(req.params.id);
  }

  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(updated);
});

// 7. DELETE /api/products/:id (Admin Delete Product)
app.delete('/api/products/:id', (req, res) => {
  const success = db.deleteProduct(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ success: true, message: 'Product removed successfully' });
});

// 8. GET /api/categories
app.get('/api/categories', (req, res) => {
  res.json(db.getCategories());
});

// 9. Auth Routes (Phone OTP)
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length < 10) {
    return res.status(400).json({ error: 'Valid 10-digit mobile number required' });
  }
  const result = db.sendOtp(phone);
  res.json(result);
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone number and OTP code required' });
  }
  const result = db.verifyOtp(phone, otp);
  if (!result.success) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// 10. Orders Routes
app.get('/api/orders', (req, res) => {
  res.json(db.getOrders());
});

app.post('/api/orders', (req, res) => {
  try {
    const order = db.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const order = db.updateOrderStatus(req.params.id, status);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// 11. Admin Dashboard Stats
app.get('/api/stats', (req, res) => {
  const products = db.getProducts();
  const orders = db.getOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const outOfStockCount = products.filter(p => !p.inStock || p.stock <= 0).length;
  const lowStockCount = products.filter(p => p.inStock && p.stock > 0 && p.stock <= 5).length;

  res.json({
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue,
    outOfStockCount,
    lowStockCount
  });
});

// Serve frontend dist bundle in production / fallback
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return;
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.send('Backend Server is Running! Run `npm run client` or `npm run build` for frontend.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Flipkart Clone Backend Server Running on Port ${PORT}`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
  console.log(`Student: K. Taje | Roll No: 23NA1A0595 | CSE | Prof. Prabhakar`);
  console.log(`====================================================`);
});
