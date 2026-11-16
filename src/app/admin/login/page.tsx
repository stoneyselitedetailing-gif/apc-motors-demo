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
        <p className="mark-dark"><span className="big">APC</span> Admin</p>
        <h1>Sign in</h1>
        {error === "not-authorised" && (
          <p className="form-error" role="alert">That account isn&apos;t set up as an admin.</p>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
