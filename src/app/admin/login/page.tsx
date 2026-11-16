import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!isSupabaseConfigured()) redirect("/admin/setup");
  const { error } = await searchParams;
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
          <p className="form-error" role="alert">That account isn&apos;t set up as an admin yet. In Supabase → SQL Editor, run: insert into public.admin_users (email) values (&apos;your email in lower case&apos;);</p>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
