# 🛍️ SnapCart — Full-Stack E-Commerce Platform
> **Computer Science & Engineering (CSE) Major Project**  
> **Lingayas Institute of Management and Technology (LIMT)**

---

## 🎓 Project Credentials & Student Information

| Details Key | Information Value |
| :--- | :--- |
| 🏫 **College / Institution** | **Lingayas Institute of Management and Technology (LIMT)** |
| 🎓 **Department / Branch** | **Computer Science & Engineering (CSE)** |
| 👤 **Student Name** | **K. Teja** |
| 🆔 **Student Roll Number** | **23NA1A0595** |
| 👨‍🏫 **Project Guide / Supervisor** | **Prof. Prabhakar** |
| 💻 **Project Title** | **SnapCart — Full-Stack E-Commerce Web Application** |
| 🎨 **Frontend Design** | **React 18 + Vite 5 + 100% Light Theme CSS** |
| ⚙️ **Backend REST API** | **Node.js + Express.js API Server** |
| 🗄️ **Database & Auth** | **Supabase PostgreSQL Cloud + Real Google OAuth 2.0** |
| ☁️ **Deployment Hosting** | **GitHub + Render.com Free Web Service** |
| 🔗 **GitHub Project Link** | [https://github.com/chinnik593-jpg/E-Commerce.git](https://github.com/chinnik593-jpg/E-Commerce.git) |

---

## 💡 What is SnapCart? (Simple Overview)

**SnapCart** is a complete, full-stack online shopping website designed like real e-commerce websites (such as Flipkart and Amazon). 

It allows **Customers** to browse products, search items, filter categories, sign in with their Google accounts, add items to cart, and place orders. 

It also gives **Store Administrators** a powerful Admin Control Dashboard to manage inventory, change stock availability in 1 click, upload product images directly from their PC, create new categories, and track customer orders — all without touching any code!

---

## 🚀 Key Features at a Glance

### 🛒 For Customers (Shoppers):
1. **100% Light Theme Interface**: Clean, modern design with crisp whites (`#ffffff`), soft slates (`#f8fafc`), and royal blue accents (`#2563eb`). Zero dark background clutter.
2. **Real Google Sign-In**: Login securely using your official Google Account via Supabase Auth. Your name, email, and Google profile picture appear in the top navbar.
3. **Persistent Sessions**: Your login stays active even if you refresh or reopen the page.
4. **Category Navigation**: Filter products by Mobiles, Fashion, Home, Grocery, Toys, Other, or custom categories.
5. **Interactive Search**: Search bar with real-time autocomplete suggestions and price previews.
6. **Product Detail Inspector**: Click any item card to see detailed specifications, ratings, stock status, and test delivery times using pincodes.
7. **Shopping Cart & Checkout**: Add items, adjust quantities, calculate subtotal and free shipping perks, and place orders. Stock checks prevent ordering more than available stock.

### 🛡️ For Administrators (Store Managers):
1. **Dedicated Admin Portal**: Open the restricted Admin Security Login Modal to authenticate into the Super Admin Dashboard.
2. **1-Click Stock Status Toggling**: Click **Mark Out of Stock** or **Mark In Stock** to instantly update item availability across the website.
3. **Stock Quantity Adjusters**: Click **`-`**, **`+5`**, or edit numerical stock counts directly.
4. **Real Image Uploader**: Pick any photo directly from your local computer (using FileReader Data URLs), paste image URLs, or choose sample presets.
5. **Custom Category Creator**: Add custom product categories on the fly.
6. **Customer Order Fulfillment Tracker**: View customer orders and update delivery statuses (*Placed*, *Processing*, *Shipped*, *Out for Delivery*, *Delivered*, *Cancelled*).
7. **Live Store Configurator**: Edit store title, free delivery limit, banner notice, and student credentials directly from the **Store Settings** tab without changing code.

---

## 🛠️ All Technologies Used (Easy Table)

| Layer | Technology | Simple Explanation |
| :--- | :--- | :--- |
| **Programming Languages** | **JavaScript (ES6+)**, **HTML5**, **CSS3**, **SQL** | Core logic, layout structure, styling, and database queries |
| **Frontend UI** | **React 18**, **Vite 5** | Renders fast interactive web pages and compiles code |
| **Styling** | **Custom Vanilla CSS (100% Light Theme)** | Clean white design system (`#ffffff`, `#f8fafc`, `#2563eb`, `#10b981`) |
| **Icons** | **Lucide React** | Modern vector SVG interface icons |
| **Backend REST API** | **Node.js**, **Express.js** | Server API handling routing, CORS, image data, and logic |
| **Database** | **Supabase (PostgreSQL Cloud DB)** | Stores products, categories, and customer orders live in the cloud |
| **Authentication** | **Supabase Auth + Google OAuth 2.0** | Official Google account sign-in and session management |
| **Hosting & Git** | **Git**, **GitHub**, **Render.com** | Version control code management and 1-click cloud hosting |

---

## 📐 How the System Works (Architecture Flow)

```
[ Customer / Admin Browser ]
         │
         ├───► (Google OAuth 2.0 Sign In) ───► [ Supabase Auth Engine ]
         │                                            │
         ├───► (React 18 + Vite 5 Storefront)         ▼
         │                                    [ Google Servers ]
         ▼
[ Express REST API Server (Port 5000) ]
         │
         ▼
[ Supabase PostgreSQL Cloud Database ] ───► Stores Products, Orders, & Categories
```

---

## 🛒 Customer User Guide (Step-by-Step)

1. **Open the Website**:
   - Visit the home page at [http://localhost:3000](http://localhost:3000).
2. **Sign In with Google**:
   - Click **Sign in with Google** in the top navigation bar.
   - Choose your Google account on the official Google OAuth login page. Your name and profile picture will immediately show in the header bar!
3. **Search & Filter Products**:
   - Use the category pills (*Mobiles*, *Fashion*, *Home*, *Grocery*, *Toys*, *Other*) to filter items.
   - Type in the top search bar to see instant autocomplete suggestions and prices.
4. **Inspect Product & Check Pincode**:
   - Click any product card to open the detail inspect modal.
   - Enter your 6-digit area pincode to check estimated delivery timelines.
5. **Add to Cart & Checkout**:
   - Click **Add to Cart** -> Open the **Cart Drawer** -> Click **Proceed to Checkout**.
   - Fill in your shipping address and payment method (*UPI*, *Cash on Delivery*, *Card*, *NetBanking*).
   - Click **Place Order** to complete your purchase!

---

## 🛡️ Admin Control Guide (Step-by-Step)

1. **Open the Admin Portal**:
   - Click **Admin Login** in the top header.
   - Enter administrator credentials to unlock the Super Admin Control Dashboard.
2. **Toggle Stock Status in 1 Click**:
   - Click **Mark Out of Stock** or **Mark In Stock** on any product row to instantly update item availability on the storefront.
3. **Change Stock Quantities**:
   - Click **`-`** or **`+5`** or type any number in the stock box to adjust inventory counts.
4. **Add New Products & Upload Images**:
   - Click **+ Add New Product** -> Click **Upload Image File from PC** to select any photo from your computer!
5. **Create Custom Categories**:
   - Select **+ Add Custom Category...** in the category dropdown to create new categories.
6. **Track Customer Orders**:
   - View customer orders and update tracking statuses (*Placed*, *Processing*, *Shipped*, *Out for Delivery*, *Delivered*, *Cancelled*).
7. **Change Live Store Settings**:
   - Click **Store Settings** tab to edit store title, free delivery limit, banner notice, and student credentials.

---

## 🔌 Complete REST API Endpoints List

| HTTP Method | API Endpoint | What It Does |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Checks server health and returns CSE student project metadata |
| **GET** | `/api/products` | Fetches all products from inventory |
| **POST** | `/api/products` | Adds a new product to inventory |
| **PUT** | `/api/products/:id` | Updates product details (title, price, image, etc.) |
| **DELETE** | `/api/products/:id` | Removes a product from inventory |
| **PATCH** | `/api/products/:id/stock` | Toggles stock status or updates stock quantity |
| **GET** | `/api/categories` | Fetches list of active product categories |
| **GET** | `/api/orders` | Fetches all customer orders |
| **POST** | `/api/orders` | Places a new customer order |
| **PATCH** | `/api/orders/:id/status` | Updates order fulfillment tracking status |
| **POST** | `/api/auth/check-admin` | Verifies administrator security authorization |

---

## 🗄️ Database Tables (Supabase PostgreSQL SQL)

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

## 💻 How to Run the Project on Your Computer (4 Simple Steps)

### Step 1: Clone the Code from GitHub
```bash
git clone https://github.com/chinnik593-jpg/E-Commerce.git
cd E-Commerce
```

### Step 2: Install Required Packages
```bash
npm install
```

### Step 3: Set Up Environment File (`.env`)
Create a file named `.env` in the project root directory:
```env
VITE_SUPABASE_URL=https://twupxledocamoggrtmuf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_QP7ckttSixCQseQEVxr7IQ_eLDWE7ro
PORT=5000
```

### Step 4: Start the Project
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser!

---

## ☁️ How to Host on Render.com (100% Free)

1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** -> Select **Web Service**.
3. Connect your GitHub repository: `chinnik593-jpg/E-Commerce`.
4. Enter settings:
   - **Name**: `snapcart-app`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Click **Create Web Service**. Render will publish your site live with a public HTTPS link!

---

## ❓ Frequently Asked Questions (FAQ)

- **Q: How do I log in as Admin?**
  - **A**: Click **Admin Login** in the top navbar. Enter administrator credentials to unlock the Super Admin Dashboard.
- **Q: How does Google login work?**
  - **A**: Click **Sign in with Google**. The website securely connects to Google OAuth 2.0 via Supabase Auth and logs you in with your real Google name and photo.
- **Q: Can I upload photos from my computer?**
  - **A**: Yes! In the Admin Dashboard, click **+ Add New Product** -> Click **Upload Image File from PC** to pick any photo from your computer.
- **Q: What if Port 5000 is busy?**
  - **A**: The Express backend server automatically retries on ports `5001`, `5002`, `5003`, so the app never crashes.

---

## 🏆 Project Conclusion & Acknowledgments

This CSE Major Engineering Project demonstrates a full-stack e-commerce system combining modern web development practices, real-time database synchronization, Google OAuth authentication, and complete administrative control.

Special thanks to project guide **Prof. Prabhakar** and **Lingayas Institute of Management and Technology (LIMT)** for academic supervision and support.

**Developed by**: K. Teja (Roll No: `23NA1A0595`), Department of Computer Science & Engineering (CSE).