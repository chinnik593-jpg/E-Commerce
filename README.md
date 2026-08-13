# 🛍️ SnapCart — Full-Stack E-Commerce Platform
> **Computer Science & Engineering (CSE) Major Engineering Project**  
> **Lingayas Institute of Management and Technology (LIMT)**

---

## 🎓 Academic Credentials & Project Metadata

| Field | Details |
| :--- | :--- |
| **Institution** | **Lingayas Institute of Management and Technology (LIMT)** |
| **Department** | **Computer Science & Engineering (CSE)** |
| **Student Name** | **K. Teja** |
| **Roll Number** | **23NA1A0595** |
| **Faculty Supervisor / Guide** | **Prof. Prabhakar** |
| **Project Title** | **SnapCart — Full-Stack E-Commerce Web Application** |
| **Frontend Framework** | **React 18 + Vite 5 + Vanilla CSS (100% Light Theme)** |
| **Backend REST API** | **Node.js + Express.js** |
| **Database & Auth Engine** | **Supabase Cloud PostgreSQL + Google OAuth 2.0** |
| **Version Control & Hosting** | **Git / GitHub + Render.com Free Web Service** |
| **Live Repository** | [https://github.com/chinnik593-jpg/E-Commerce.git](https://github.com/chinnik593-jpg/E-Commerce.git) |

---

## 📌 Executive Project Summary

**SnapCart** is a complete, production-grade e-commerce application designed to simulate real-world online shopping platforms like Flipkart and Amazon. Built as a CSE Major Engineering Project, SnapCart implements a multi-tier web application architecture featuring:

1. **Customer Storefront**: Built with a 100% Light Theme UI palette (crisp whites `#ffffff`, soft slate `#f8fafc`, vibrant blue `#2563eb`, pastel emerald `#10b981`), featuring real-time category filtering, autocomplete search, pincode delivery estimation, cart drawer, checkout, and order placement.
2. **Super Admin All-In-One Control Suite**: Protected inventory management dashboard allowing sellers to toggle product availability (*In Stock / Out of Stock*) in one click, edit inventory numbers, upload product images directly from their PC, create custom categories, manage customer orders, and update store settings without touching code.
3. **Dual Data Engine**: Real-time cloud persistence using **Supabase PostgreSQL Database** backed by a resilient Node.js Express REST API local store fallback.
4. **Real Authentication**: Integrated with **Supabase Auth + Google OAuth 2.0**, displaying real Google account names, avatars, and emails with session persistence across page refreshes.

---

## 🏗️ System Architecture & Data Flow

```
+-------------------------------------------------------------------------+
|                           CUSTOMER BROWSER                              |
|   (React 18 + Vite 5 Storefront | 100% Light Theme UI System)           |
+------------------------------------+------------------------------------+
                                     |
               +---------------------+---------------------+
               |                                           |
               v                                           v
+-------------------------------+         +-------------------------------+
|     Supabase Auth Engine      |         |     Node.js Express REST API   |
|   (Google OAuth 2.0 Sign In)  |         |   (Port 5000 / Dynamic Fallback)|
+--------------+----------------+         +---------------+---------------+
               |                                           |
               v                                           v
+-------------------------------+         +-------------------------------+
|      Google OAuth Servers     |         |   Supabase PostgreSQL Cloud   |
|  (accounts.google.com)        |         |  (https://twupxledocam...co)  |
+-------------------------------+         +-------------------------------+
```

---

## ✨ Start-to-End Feature Breakdown

### 🛒 1. Customer Shopping Flow
- **Real Google Sign-In**: Click **Sign in with Google** to authenticate via your Google Account. Session automatically persists on refresh using `supabase.auth.getSession()` and `onAuthStateChange()`.
- **Category Navigation**: Switch between categories (*Mobiles*, *Fashion*, *Home*, *Grocery*, *Toys*, *Other*, or custom seller categories).
- **Interactive Autocomplete Search**: Search products by title, category, or specifications with real-time price preview dropdowns.
- **Product Inspect Modal**: Click any item card to view product details, ratings, stock status, and test delivery timelines using pincodes.
- **Shopping Cart & Checkout**: Add products to cart, adjust quantities, calculate discounts/free shipping perks, and place orders. Stock checks prevent ordering more items than available in inventory.

### 🛡️ 2. Super Admin Control Suite
- **Dedicated Admin Portal**: Click **Admin Login** in the header to open the restricted Admin Security Login Modal.
- **One-Click Stock Toggling**: Click **Mark Out of Stock** or **Mark In Stock** to instantly update storefront product availability.
- **Stock Quantity Adjusters**: Click **`-`**, **`+5`**, or edit numerical stock counts directly.
- **Real Product Image Uploader**: Select local image files directly from your computer (converted via FileReader Data URLs), paste image URLs, or choose sample presets.
- **Custom Category Creator**: Add custom categories on the fly without changing code.
- **Order Fulfillment Tracker**: Track customer orders and update status dropdowns (*Placed*, *Processing*, *Shipped*, *Out for Delivery*, *Delivered*, *Cancelled*).
- **Live Store Configurator**: Edit store title, free delivery threshold, banner notices, and student project credentials from the **Store Settings** tab.

---

## 🛠️ Complete Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Languages** | **JavaScript (ES6+)**, **HTML5**, **CSS3**, **SQL** | Core application logic, layout, responsive styling, and database queries |
| **Frontend UI** | **React 18**, **Vite 5** | High-performance interactive component rendering and bundler |
| **Styling** | **Vanilla CSS (100% Light Theme)** | Custom design system (`#ffffff`, `#f8fafc`, `#2563eb`, `#10b981`) |
| **Icons** | **Lucide React** | Clean SVG vector interface icons |
| **Backend Server** | **Node.js**, **Express.js** | Server REST API handling CORS, routing, image hosting, and logic |
| **Database** | **Supabase (PostgreSQL Cloud DB)** | Live cloud data persistence (`https://twupxledocamoggrtmuf.supabase.co`) |
| **Authentication** | **Supabase Auth + Google OAuth 2.0** | Secure Google sign-in and session lifecycle management |
| **Hosting & Git** | **Git**, **GitHub**, **Render.com** | Source code management and 1-click cloud web service deployment |

---

## 🗄️ Database Schema (PostgreSQL / Supabase DDL)

```sql
-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  discount TEXT,
  description TEXT,
  image TEXT,
  rating NUMERIC DEFAULT 4.5,
  ratings_count INTEGER DEFAULT 1,
  in_stock BOOLEAN DEFAULT true,
  stock INTEGER DEFAULT 10,
  specs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Placed',
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📡 REST API Endpoint Specifications

| Method | Endpoint | Description | Request Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Backend API status & academic metadata | None | `{ status: "OK", student: "K. Teja", ... }` |
| **GET** | `/api/products` | Fetch all product inventory | None | `[ { id: "p1", title: "...", ... } ]` |
| **POST** | `/api/products` | Add new product item | `{ title, price, category, image, ... }` | `{ id: "prod-123", ... }` |
| **PUT** | `/api/products/:id` | Update existing product | `{ title, price, stock, ... }` | `{ id: "p1", ... }` |
| **DELETE** | `/api/products/:id` | Remove product from inventory | None | `{ success: true }` |
| **PATCH**| `/api/products/:id/stock` | Toggle stock or update count | `{ inStock: false, stock: 0 }` | `{ id: "p1", inStock: false, ... }` |
| **GET** | `/api/categories` | Fetch category list | None | `["Mobiles", "Fashion", "Home", ...]` |
| **GET** | `/api/orders` | Fetch customer orders list | None | `[ { id: "ORD-123", status: "Placed" } ]` |
| **POST** | `/api/orders` | Place new customer order | `{ customerName, phone, items, ... }` | `{ id: "ORD-123", ... }` |
| **PATCH**| `/api/orders/:id/status` | Update order delivery status | `{ status: "Shipped" }` | `{ success: true }` |
| **POST** | `/api/auth/check-admin` | Secure server admin check | `{ email: "admin@snapcart.com" }` | `{ isAdmin: true }` |

---

## 🚀 Local Development Setup Guide (4 Steps)

### Step 1: Clone Repository
```bash
git clone https://github.com/chinnik593-jpg/E-Commerce.git
cd E-Commerce
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables (`.env`)
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://twupxledocamoggrtmuf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_QP7ckttSixCQseQEVxr7IQ_eLDWE7ro
PORT=5000
```

### Step 4: Run Development Server
```bash
npm run dev
```
- **Frontend App**: Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001`).
- **Backend API**: Check [http://localhost:5000/api/health](http://localhost:5000/api/health).

---

## ☁️ Cloud Deployment Guide (Render.com)

1. Sign in to [Render Dashboard](https://dashboard.render.com).
2. Click **`New +`** -> Select **`Web Service`**.
3. Connect your GitHub repository: `chinnik593-jpg/E-Commerce`.
4. Configure service settings:
   - **Name**: `snapcart-app`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Click **`Create Web Service`**.
6. Render will automatically build and publish your app with a live HTTPS URL!

---

## ❓ FAQ & Troubleshooting for Friends & Evaluators

- **How do I log in as Admin?**
  - Click **Admin Login** in the top navbar. Type `admin@snapcart.com` and PIN `1234` (or `teja123`) to unlock the Super Admin Dashboard.
- **How do I log in with Google?**
  - Click **Sign in with Google** in the header. Select your Google account on the official Google OAuth page to log in.
- **How do I upload a product image from PC?**
  - In Admin Dashboard, click **+ Add New Product** -> Click **Upload Image File from PC** -> Pick any image file on your computer.
- **What if Port 5000 is occupied?**
  - The Express server in `server/index.js` automatically detects port conflicts (`EADDRINUSE`) and retries on `5001`, `5002`, `5003`, ensuring 100% server uptime.

---

### 🎓 Academic Citation & Credits
Developed by **K. Teja** (Roll No: `23NA1A0595`), Department of Computer Science & Engineering (CSE), **Lingayas Institute of Management and Technology (LIMT)** under the supervision of **Prof. Prabhakar**.