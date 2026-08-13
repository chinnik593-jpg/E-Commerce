# SnapCart - Full-Stack E-Commerce Platform

A custom, modern E-Commerce web application built as a CSE Major Engineering Project. Features a Node.js REST API backend, persistent database, mobile phone OTP authentication, end-to-end shopping experience, comprehensive admin inventory control (Add/Edit/Delete/Out of Stock toggle), and pre-configured support for **Render.com** and **Supabase**.

---

## 🎓 Academic Credentials

- **Project Title**: SnapCart - Full-Stack E-Commerce Platform with Admin Stock Management
- **Student Name**: K. Taje
- **Roll Number**: 23NA1A0595
- **Department**: Computer Science & Engineering (CSE)
- **Faculty Supervisor / Guide**: Prof. Prabhakar

---

## ⚡ Key Features

- **Product Categories**: 📱 **Mobiles**, 👗 **Fashion**, 🏠 **Home**, 🛒 **Grocery**, 🧸 **Toys**, and 📦 **Other**.
- **Admin Management**: Add/Edit/Delete products, one-click **In Stock / Out of Stock** toggling, stock quantity modifiers, and customer order status tracker.
- **Dynamic Categories**: Admin can add products under **Other** or create new custom categories on the fly.
- **Mobile OTP Login**: 10-digit mobile number input + 6-digit SMS OTP verification (Demo code `123456`).
- **Database Options**:
  1. Built-in zero-config persistent storage (`server/data/store.json`) for instant 0-cost deployment on Render.com.
  2. Free Cloud Supabase SQL Database (`supabase/schema.sql`).

---

## 🗄️ Connecting Supabase (Optional Free Cloud DB)

1. Create a free project at [Supabase](https://supabase.com).
2. Open the SQL Editor in Supabase and run the script from [`supabase/schema.sql`](file:///C:/Users/harsha/.gemini/antigravity/scratch/ecommerce-app/supabase/schema.sql).
3. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## ☁️ Deploying Free of Cost on Render.com

1. Push your code to GitHub.
2. Log into [Render.com](https://dashboard.render.com/) -> Click **New +** -> **Web Service**.
3. Select this repository. Render automatically uses `render.yaml`:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

---

## 🚀 How to Run Locally

```bash
cd C:\Users\harsha\.gemini\antigravity\scratch\ecommerce-app
npm install
npm run dev
```

- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`
