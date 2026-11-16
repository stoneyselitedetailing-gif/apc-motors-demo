import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/env";

// Per-request client acting as the signed-in user.
export async function userClient() {
  if (!env.supabaseUrl || !env.supabaseAnonKey) throw new Error("Supabase is not configured");
  const cookieStore = await cookies();
  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          for (const { name, value, options } of toSet) cookieStore.set(name, value, options);
        } catch {
          // Read-only in Server Components; the proxy refreshes the session.
        }
      },
    },
  });
}
