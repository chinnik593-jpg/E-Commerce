-- =========================================================================
-- SnapCart E-Commerce Supabase Database Schema Script
-- Lingayas Institute of Management and Technology | Student Project: K. Teja
-- Roll No: 23NA1A0595 | Guide: Prof. Prabhakar
-- =========================================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  discount TEXT,
  rating NUMERIC DEFAULT 4.5,
  ratings_count INTEGER DEFAULT 100,
  stock INTEGER DEFAULT 10,
  in_stock BOOLEAN DEFAULT TRUE,
  assured BOOLEAN DEFAULT TRUE,
  image TEXT,
  specs TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  payment_method TEXT DEFAULT 'UPI',
  status TEXT DEFAULT 'Placed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Seed Initial Data
INSERT INTO products (id, title, category, price, original_price, discount, rating, ratings_count, stock, in_stock, assured, image, specs, description)
VALUES 
  ('prod-1', 'Nothing Phone (2a) 5G (Milk White, 256 GB, 12 GB RAM)', 'Mobiles', 23999, 27999, '14% off', 4.5, 18450, 15, true, true, '/images/mobile_phone.jpg', ARRAY['12 GB RAM | 256 GB ROM', '6.7 inch AMOLED Display', '50 MP OIS Dual Camera', '5000 mAh Battery'], 'Iconic Glyph Interface with transparent design aesthetics.'),
  ('prod-2', 'Men Washed Casual Denim Trucker Jacket', 'Fashion', 1299, 2999, '56% off', 4.3, 4210, 8, true, true, '/images/fashion_jacket.jpg', ARRAY['100% Premium Cotton Denim', 'Button Closure & Dual Flap Pockets', 'Regular Fit'], 'Classic vintage wash denim jacket designed for everyday style.'),
  ('prod-3', 'Nordic Minimalist Warm LED Study Desk Lamp', 'Home', 1899, 3499, '45% off', 4.7, 950, 0, false, true, '/images/home_lamp.jpg', ARRAY['3 Temperature Color Modes', 'Touch Control Dimmable', 'Wood & Metal Finish'], 'Scandinavian minimalist study lamp with warm illumination.'),
  ('prod-4', 'Sencha Reserve Premium Organic Green Tea & Nuts Box', 'Grocery', 649, 999, '35% off', 4.8, 3120, 45, true, true, '/images/grocery_tea.jpg', ARRAY['100g Whole Leaf Green Tea', 'Includes Dried Berries & Almonds', '100% Natural'], 'Hand-picked green tea packed in airtight luxury tin container.'),
  ('prod-5', 'X-BLADE Ultra Fast 2.4GHz High Speed RC Racing Car Toy', 'Toys', 1499, 2999, '50% off', 4.6, 1480, 12, true, true, '/images/toy_car.jpg', ARRAY['2.4GHz Wireless Controller', 'LED Headlights', 'Rechargeable Battery Pack'], 'High performance radio-controlled supercar toy.'),
  ('prod-6', 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', 'Other', 24990, 29990, '16% off', 4.9, 8900, 5, true, true, '/images/headphones.jpg', ARRAY['Active Noise Cancellation', '30-Hour Battery Life', 'Clear Calling Mics'], 'Flagship wireless over-ear noise-cancelling headphones.')
ON CONFLICT (id) DO NOTHING;
