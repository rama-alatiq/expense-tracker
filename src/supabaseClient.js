import { createClient } from "@supabase/supabase-js/dist/index.cjs";



const supabaseURL= import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey= import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseURL, supabaseAnonKey)