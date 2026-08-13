# Flipkart-Style E-Commerce App with Admin Inventory & Stock Control

A full-stack, production-ready E-Commerce application inspired by Flipkart. Built with a Node.js REST API backend, persistent JSON database, mobile phone OTP authentication, end-to-end shopping experience, comprehensive admin inventory control (Add/Edit/Delete/Out of Stock toggle), and pre-configured for 100% Free deployment on **Render.com**.

---

## 🎓 Academic & Project Credentials

- **Student Name**: K. Taje
- **Roll Number**: 23NA1A0595
- **Branch**: Computer Science & Engineering (CSE)
- **Faculty Supervisor / Teacher**: Prof. Prabhakar
- **Project Title**: Full-Stack Flipkart Clone E-Commerce Application with Admin Stock Management & Render Free Hosting

---

## 🌟 Key Features

### 🛍️ Customer Storefront
- **Flipkart Branding**: Signature yellow & blue theme, Flipkart Assured badges, SuperCoins rewards.
- **Categories Nav**: 📱 **Mobiles**, 👗 **Fashion**, 🏠 **Home**, 🛒 **Grocery**, 🧸 **Toys**, and 📦 **Other**.
- **Live Search & Autocomplete**: Instant search by title, category, or description.
- **Interactive Stock Badges**: Real-time "In Stock" vs "Out of Stock" indicators. Out of stock items feature disabled buy buttons.
- **Product Detail Modal**: Specifications grid, pincode delivery checker, buy now/add to cart.
- **Cart & Checkout**: Multi-step checkout with address details, payment method selection, and order placement.
- **📱 Mobile OTP Login**: Enter any 10-digit mobile number, receive OTP code `123456`, and verify.

### 🛡️ Admin Inventory & Stock Control Panel
- **Quick Mode Switcher**: Header toggle button to switch between Customer View and Admin Portal.
- **⚡ One-Click Stock Toggle**: Instant "Mark In Stock" or "Mark Out of Stock" button per item.
- **🔢 Stock Level Control**: Increment/decrement or directly type stock quantity.
- **📦 Add New Product (including "Other" & Custom Categories)**: Create items under Mobiles, Fashion, Home, Grocery, Toys, **Other**, or any custom category name.
- **✏ Edit & 🗑 Delete Products**: Complete CRUD functionality.
- **📊 Analytics Dashboard**: Live metrics for Total Revenue, Active Products, Total Orders, and Out-of-Stock alerts.
- **📋 Order Status Tracking**: Monitor customer orders and update status (Placed -> Shipped -> Delivered).

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Launch
1. Open your terminal in the project directory:
   ```bash
   cd C:\Users\harsha\.gemini\antigravity\scratch\ecommerce-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch backend server and frontend client concurrently:
   ```bash
   npm run dev
   ```
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **API Health Check**: http://localhost:5000/api/health

---

## ☁️ How to Deploy Free of Cost on Render.com

This project is 100% optimized for **Render.com's Free Web Service Tier** (0 cost, no paid SQL database needed).

### Steps to Deploy:
1. Push your repository to **GitHub** or **GitLab**.
2. Go to [https://dashboard.render.com/](https://dashboard.render.com/) and click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Select the build settings (or let Render auto-detect from `render.yaml`):
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click **Create Web Service**. Your live Flipkart clone URL will be live in 2-3 minutes!

---

## 📂 Project Structure

```
ecommerce-app/
├── render.yaml               # Render.com Free Deployment Blueprint
├── package.json              # Express, React, Vite, Lucide dependencies
├── vite.config.js            # Vite config with API proxy
├── index.html                # Entry HTML with fonts
├── server/
│   ├── index.js              # Express REST API & static build server
│   ├── db.js                 # Persistent File-based DB controller
│   └── seedData.js           # Default products for Mobiles, Fashion, Home, Grocery, Toys, Other
├── public/
│   └── images/               # High-res generated product imagery
└── src/
    ├── main.jsx              # React mounting root
    ├── App.jsx               # Application main state controller
    ├── styles/
    │   └── index.css         # Flipkart design system & CSS tokens
    └── components/
        ├── ProjectBadge.jsx  # Academic Banner (K. Taje | 23NA1A0595 | CSE | Prof. Prabhakar)
        ├── Navbar.jsx        # Top Nav with search, OTP login & Admin switch
        ├── CategoryNav.jsx   # Mobiles, Fashion, Home, Grocery, Toys, Other
        ├── HeroSlider.jsx    # Promotional carousel
        ├── ProductGrid.jsx   # Product card grid & stock filters
        ├── ProductCard.jsx   # Individual product card with stock badges
        ├── ProductDetailModal.jsx
        ├── PhoneOtpModal.jsx # Mobile Phone + 6-digit OTP modal
        ├── CartDrawer.jsx    # Slide-out shopping cart
        ├── CheckoutModal.jsx # Address & Payment checkout
        ├── AdminDashboard.jsx # Inventory table, quick stock toggle, orders
        └── AdminProductModal.jsx # Add/Edit form with 'Other' category support
```
