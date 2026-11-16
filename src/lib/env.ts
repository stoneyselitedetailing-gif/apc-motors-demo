import "server-only";
import { cleanKey, cleanSupabaseUrl } from "@/lib/supabase/url";

// Server-side settings. Secrets are only read here and never sent to the browser.
export const env = {
  supabaseUrl: cleanSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: cleanKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  supabaseServiceKey: cleanKey(process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY),
};

// Until Supabase is connected the site runs in demo mode: the stock list
// comes from src/lib/seed.ts and the admin area shows setup steps.
export function isSupabaseConfigured(): boolean {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey && env.supabaseServiceKey);
}

/** Which Supabase settings this deployment can see, with a plain-English problem for each. Never includes values. */
export function supabaseSettingsStatus(): { name: string; ok: boolean; problem?: string }[] {
  const raw = (n: string) => cleanKey(process.env[n]);
  const missing = "Not found. Add it in Vercel with Production ticked, then redeploy.";
  const url = env.supabaseUrl;
  const anon = env.supabaseAnonKey;
  const secret = env.supabaseServiceKey;

  let urlProblem: string | undefined;
  if (!url)
    urlProblem = raw("NEXT_PUBLIC_SUPABASE_URL")
      ? "Found, but it isn't a web address. Paste the Project URL, e.g. https://abcd.supabase.co."
      : missing;

  let anonProblem: string | undefined;
  if (!anon) anonProblem = missing;
  else if (anon.startsWith("sb_secret_")) anonProblem = "This holds the secret key. It needs the publishable (anon) key.";
  else if (anon.startsWith("http")) anonProblem = "This holds a web address. It needs the publishable (anon) key.";

  let secretProblem: string | undefined;
  if (!secret) secretProblem = missing;
  else if (secret.startsWith("sb_publishable_")) secretProblem = "This holds the publishable key. It needs the secret (service_role) key.";
  else if (secret.startsWith("http")) secretProblem = "This holds a web address. It needs the secret (service_role) key.";

  return [
    { name: "NEXT_PUBLIC_SUPABASE_URL", ok: !urlProblem, problem: urlProblem },
    { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)", ok: !anonProblem, problem: anonProblem },
    { name: "SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY)", ok: !secretProblem, problem: secretProblem },
  ];
}
