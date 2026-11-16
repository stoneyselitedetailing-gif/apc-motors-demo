import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

// Service-role client: bypasses row level security, so it is only used in
// server code, after requireAdmin() for anything that writes.
let cached: SupabaseClient | null = null;

export function serviceClient(): SupabaseClient {
  if (!env.supabaseUrl || !env.supabaseServiceKey) throw new Error("Supabase is not configured");
  cached ??= createClient(env.supabaseUrl, env.supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const PHOTO_BUCKET = "stock-photos";
