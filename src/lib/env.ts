import "server-only";
import { cleanKey, cleanSupabaseUrl } from "@/lib/supabase/url";

// Server-side settings. Secrets are only read here and never sent to the browser.
export const env = {
  supabaseUrl: cleanSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: cleanKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  supabaseServiceKey: cleanKey(process.env.SUPABASE_SERVICE_ROLE_KEY),
};

// Until Supabase is connected the site runs in demo mode: the stock list
// comes from src/lib/seed.ts and the admin area shows setup steps.
export function isSupabaseConfigured(): boolean {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey && env.supabaseServiceKey);
}
