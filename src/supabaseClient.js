// Supabase Client Integration Setup
// To connect your Supabase database:
// 1. Create a free project at https://supabase.com
// 2. Run the SQL script located at supabase/schema.sql in your Supabase SQL Editor
// 3. Add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to a .env file

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
