import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { initialProducts } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// Supabase Live Connection
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://twupxledocamoggrtmuf.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_QP7ckttSixCQseQEVxr7IQ_eLDWE7ro';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const otpSessions = new Map();

function initDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const defaultData = {
      products: initialProducts,
      orders: [],
      categories: ["Mobiles", "Fashion", "Home", "Grocery", "Toys", "Other"]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

function readData() {
  initDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    initDb();
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  }
}

function writeData(data) {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Sync to Supabase in background
async function syncProductToSupabase(product) {
  try {
    await supabase.from('products').upsert({
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      original_price: product.originalPrice,
      discount: product.discount,
      rating: product.rating,
      ratings_count: product.ratingsCount,
      stock: product.stock,
      in_stock: product.inStock,
      assured: product.assured,
      image: product.image,
      specs: product.specs,
      description: product.description
    });
  } catch (e) {}
}

async function syncOrderToSupabase(order) {
  try {
    await supabase.from('orders').insert({
      id: order.id,
      customer_name: order.customerName,
      phone: order.phone,
      address: order.address,
      items: order.items,
      total_amount: order.totalAmount,
      payment_method: order.paymentMethod,
      status: order.status
    });
  } catch (e) {}
}

export const db = {
  getProducts: () => {
    const data = readData();
    return data.products || [];
  },

  getProductById: (id) => {
    const products = db.getProducts();
    return products.find(p => p.id === id);
  },

  addProduct: (productData) => {
    const data = readData();
    const newProduct = {
      id: "prod-" + Date.now(),
      title: productData.title,
      category: productData.category || "Other",
      price: Number(productData.price) || 0,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
      discount: productData.discount || (productData.originalPrice > productData.price ? `${Math.round(((productData.originalPrice - productData.price)/productData.originalPrice)*100)}% off` : "Special Price"),
      rating: 4.5,
      ratingsCount: 1,
      stock: Number(productData.stock) || 0,
      inStock: Number(productData.stock) > 0,
      assured: true,
      image: productData.image || "/images/headphones.jpg",
      specs: Array.isArray(productData.specs) ? productData.specs : (productData.specs ? productData.specs.split('\n').filter(Boolean) : ["Genuine Quality Product"]),
      description: productData.description || "Authentic quality product listed on SnapCart platform."
    };

    data.products.unshift(newProduct);
    if (newProduct.category && !data.categories.includes(newProduct.category)) {
      data.categories.push(newProduct.category);
    }
    writeData(data);

    // Live sync to Supabase
    syncProductToSupabase(newProduct);

    return newProduct;
  },

  updateProduct: (id, updateFields) => {
    const data = readData();
    const index = data.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const existing = data.products[index];
    const updatedStock = updateFields.stock !== undefined ? Number(updateFields.stock) : existing.stock;
    const updatedInStock = updateFields.inStock !== undefined ? Boolean(updateFields.inStock) : (updatedStock > 0);

    const updatedProduct = {
      ...existing,
      ...updateFields,
      price: updateFields.price !== undefined ? Number(updateFields.price) : existing.price,
      originalPrice: updateFields.originalPrice !== undefined ? Number(updateFields.originalPrice) : existing.originalPrice,
      stock: updatedStock,
      inStock: updatedInStock
    };

    data.products[index] = updatedProduct;
    if (updatedProduct.category && !data.categories.includes(updatedProduct.category)) {
      data.categories.push(updatedProduct.category);
    }
    writeData(data);

    // Live sync to Supabase
    syncProductToSupabase(updatedProduct);

    return updatedProduct;
  },

  toggleStock: (id, inStockState) => {
    const data = readData();
    const product = data.products.find(p => p.id === id);
    if (!product) return null;

    product.inStock = inStockState !== undefined ? Boolean(inStockState) : !product.inStock;
    if (!product.inStock) {
      product.stock = 0;
    } else if (product.stock <= 0) {
      product.stock = 10;
    }

    writeData(data);
    syncProductToSupabase(product);
    return product;
  },

  deleteProduct: (id) => {
    const data = readData();
    const initialLen = data.products.length;
    data.products = data.products.filter(p => p.id !== id);
    if (data.products.length < initialLen) {
      writeData(data);
      try {
        supabase.from('products').delete().eq('id', id);
      } catch (e) {}
      return true;
    }
    return false;
  },

  getCategories: () => {
    const data = readData();
    return data.categories || ["Mobiles", "Fashion", "Home", "Grocery", "Toys", "Other"];
  },

  getOrders: () => {
    const data = readData();
    return data.orders || [];
  },

  createOrder: (orderData) => {
    const data = readData();
    const newOrder = {
      id: "OD" + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      customerName: orderData.customerName || "K. Teja",
      phone: orderData.phone || "9876543210",
      address: orderData.address || "Dept of CSE, Campus Hostel, Room 402",
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      paymentMethod: orderData.paymentMethod || "UPI / Card",
      status: "Placed"
    };

    newOrder.items.forEach(item => {
      const prod = data.products.find(p => p.id === item.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
        if (prod.stock === 0) {
          prod.inStock = false;
        }
        syncProductToSupabase(prod);
      }
    });

    data.orders.unshift(newOrder);
    writeData(data);
    syncOrderToSupabase(newOrder);
    return newOrder;
  },

  updateOrderStatus: (id, status) => {
    const data = readData();
    const order = data.orders.find(o => o.id === id);
    if (!order) return null;
    order.status = status;
    writeData(data);
    try {
      supabase.from('orders').update({ status }).eq('id', id);
    } catch (e) {}
    return order;
  },

  sendOtp: (phone) => {
    const otp = "123456";
    otpSessions.set(phone, {
      code: otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });
    return { success: true, message: `OTP sent successfully to ${phone}`, demoOtp: "123456" };
  },

  verifyOtp: (phone, code) => {
    const session = otpSessions.get(phone);
    if (!session && code !== "123456") {
      return { success: false, message: "Invalid or expired OTP session" };
    }

    if (code === "123456" || (session && session.code === code)) {
      otpSessions.delete(phone);
      const isAdmin = phone === "9999999999" || phone === "9876543210";
      return {
        success: true,
        user: {
          phone,
          name: isAdmin ? "Admin (K. Teja)" : "Customer (" + phone.slice(-4) + ")",
          role: isAdmin ? "admin" : "customer",
          superCoins: 250
        }
      };
    }
    return { success: false, message: "Incorrect OTP code. Try 123456" };
  }
};
