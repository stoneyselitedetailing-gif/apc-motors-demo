import Link from "next/link";
import { redirect } from "next/navigation";
import { deploymentInfo, isSupabaseConfigured, supabaseSettingsStatus } from "@/lib/env";

export const dynamic = "force-dynamic";

export default function SetupPage() {
  if (isSupabaseConfigured()) redirect("/admin");
  const status = supabaseSettingsStatus();
  const info = deploymentInfo();
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
          <dl className="deploy-info">
            <dt>Vercel environment</dt>
            <dd>{info.environment}</dd>
            <dt>Vercel project</dt>
            <dd>{info.project}</dd>
            <dt>Built from</dt>
            <dd>{info.commit}{info.commitMessage ? ` · ${info.commitMessage}` : ""}</dd>
            <dt>Settings with &ldquo;supa&rdquo; in the name</dt>
            <dd>{info.supabaseNames.length ? info.supabaseNames.join(", ") : "none"}</dd>
          </dl>
        </div>
        <ol className="steps-list">
          <li>In Vercel, open this project (<b>{info.project}</b>) → <b>Settings → Environment Variables</b>.</li>
          <li>
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code> (the Project URL), <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> (the
            publishable key) and <code>SUPABASE_SECRET_KEY</code> (the secret key) from Supabase → Project Settings → API Keys,
            each with <b>Production</b> ticked.
          </li>
          <li>Go to <b>Deployments</b>, click <b>⋯</b> on the top row, then <b>Redeploy</b>. Keys only reach deployments made after they were added.</li>
          <li>First time only: in Supabase → SQL Editor, run <code>supabase/migrations/20261116000000_stock_and_enquiries.sql</code>, add a user under Authentication → Users and add its email to <code>admin_users</code>.</li>
        </ol>
        <Link className="btn btn-dark" href="/">Back to the website</Link>
      </div>
    </div>
  );
}
