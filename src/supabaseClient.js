import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://twupxledocamoggrtmuf.supabase.co';
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_QP7ckttSixCQseQEVxr7IQ_eLDWE7ro';

export const supabase = createClient(supabaseUrl, supabaseKey);
