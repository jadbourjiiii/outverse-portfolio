import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const hasSupabaseConfig = Boolean(
  supabaseUrl && supabaseServiceRoleKey
);

export const supabaseAdmin = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;

export function ensureSupabaseConfigured() {
  if (!hasSupabaseConfig) {
    console.warn(
      "Supabase environment variables are missing; database features are disabled."
    );
  }

  return hasSupabaseConfig;
}