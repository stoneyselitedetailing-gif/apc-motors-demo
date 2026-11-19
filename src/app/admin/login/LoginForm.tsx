"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { browserClient } from "@/lib/supabase/browser";

type SignInError = { status?: number; code?: string; message?: string; name?: string };

// Turns a Supabase sign-in error into a plain-English reason, so a staff
// member (or the owner helping them) can tell what to fix.
function explain(error: SignInError): string {
  const code = error.code ?? "";
  const message = (error.message ?? "").toLowerCase();
  if (code === "email_not_confirmed" || message.includes("not confirmed"))
    return "This account hasn't been confirmed. In Supabase → Authentication → Users, open the user's ⋯ menu and choose Confirm email (or delete the user and add them again with Auto confirm ticked).";
  if (code === "invalid_credentials" || message.includes("invalid login credentials"))
    return "Email or password is incorrect. If this account was invited by email or added without a password, the owner should delete it in Supabase → Authentication → Users and add it again with Add user → Create new user, a password, and Auto confirm ticked.";
  if (code === "user_banned") return "This account has been blocked in Supabase.";
  if (error.status === 429 || code.startsWith("over_")) return "Too many attempts. Wait a few minutes and try again.";
  if (message.includes("invalid api key") || message.includes("no api key"))
    return "The site's Supabase key isn't valid. Check NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel, then redeploy.";
  if (message.includes("not configured"))
    return "The site can't see its Supabase settings. Check the keys in Vercel → Settings → Environment Variables, then redeploy.";
  if (!error.status || error.name === "AuthRetryableFetchError" || message.includes("fetch"))
    return "Couldn't reach the sign-in service. Check your internet connection and try again. If it keeps happening, check the Supabase project isn't paused.";
  return `Sign-in failed: ${error.message ?? "unknown error"}${error.status ? ` (${error.status})` : ""}.`;
}

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    try {
      const { error } = await browserClient().auth.signInWithPassword({
        email: String(form.get("email") ?? "").trim().toLowerCase(),
        password: String(form.get("password") ?? ""),
      });
      if (error) {
        setError(explain(error));
        setBusy(false);
        return;
      }
    } catch (err) {
      setError(explain(err instanceof Error ? { name: err.name, message: err.message } : {}));
      setBusy(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <label>
        Email
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {error && <p role="alert" className="form-error">{error}</p>}
      <button type="submit" className="btn btn-yellow" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
