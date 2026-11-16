import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured, supabaseSettingsStatus } from "@/lib/env";

export const dynamic = "force-dynamic";

export default function SetupPage() {
  if (isSupabaseConfigured()) redirect("/admin");
  const status = supabaseSettingsStatus();
  return (
    <div className="admin-auth">
      <div className="admin-card wide">
        <p className="eyebrow">Admin · demo mode</p>
        <h1>Connect the database to switch on the admin area</h1>
        <p>
          The public site is running on demo stock. Once a free Supabase project is connected, this is where the owner signs
          in to add cars, upload photos from their phone, mark cars as sold and read enquiries.
        </p>
        <div>
          <h2 className="setup-h">What this deployment can see</h2>
          <ul className="setting-list">
            {status.map((s) => (
              <li key={s.name} className={s.ok ? "ok" : "bad"}>
                <span className="dot" aria-hidden="true">{s.ok ? "✓" : "✕"}</span>
                <span>
                  <code>{s.name}</code>
                  <small>{s.ok ? "Found" : s.problem}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ol className="steps-list">
          <li>Create a project at supabase.com.</li>
          <li>In Supabase, open <b>SQL Editor</b>, paste in <code>supabase/migrations/20261116000000_stock_and_enquiries.sql</code> and run it.</li>
          <li>In <b>Authentication → Users</b>, add the owner&apos;s email and a password. Then add that email to the <code>admin_users</code> table.</li>
          <li>In Vercel, add <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> from Supabase → Project Settings → API, then redeploy.</li>
        </ol>
        <Link className="btn btn-dark" href="/">Back to the website</Link>
      </div>
    </div>
  );
}
