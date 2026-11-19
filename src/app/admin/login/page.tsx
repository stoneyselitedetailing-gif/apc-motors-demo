import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; email?: string }> }) {
  if (!isSupabaseConfigured()) redirect("/admin/setup");
  const { error, email } = await searchParams;
  const who = (email ?? "").toLowerCase().replace(/[^a-z0-9@._+-]/g, "") || "their email in lower case";
  return (
    <div className="admin-auth">
      <div className="admin-card">
        <p className="admin-logo"><img src="/brand/apc-logo-300.png" alt="APC Motor Group" /><span>Admin</span></p>
        <h1>Sign in</h1>
        {error === "no-database" && (
          <p className="form-error" role="alert">
            You signed in, but the database tables haven&apos;t been created yet. In Supabase, open SQL Editor, paste in the SQL
            file from the repo (supabase/migrations), click Run, then sign in again.
          </p>
        )}
        {error === "not-authorised" && (
          <p className="form-error" role="alert">
            The password was right, but {email ? <b>{who}</b> : "that account"} isn&apos;t on the admin list yet. The owner adds it
            in Supabase → SQL Editor by running: <code>insert into public.admin_users (email) values (&apos;{who}&apos;);</code>
          </p>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
