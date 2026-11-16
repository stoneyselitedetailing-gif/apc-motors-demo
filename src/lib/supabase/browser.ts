"use client";

import { createBrowserClient } from "@supabase/ssr";
import { cleanKey, cleanSupabaseUrl } from "@/lib/supabase/url";

export function browserClient() {
  const url = cleanSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = cleanKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  if (!url || !key) throw new Error("Supabase is not configured");
  return createBrowserClient(url, key);
}
