import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { serviceClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  const { count } = await serviceClient()
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("handled", false)
    .then((r) => r, () => ({ count: 0 }));
  return (
    <>
      <header className="admin-top">
        <div className="admin-wrap">
          <Link href="/admin" className="mark-dark"><span className="big">APC</span> Admin</Link>
          <nav>
            <Link href="/admin">Stock</Link>
            <Link href="/admin/enquiries">
              Enquiries{count ? <span className="pill">{count}</span> : null}
            </Link>
            <Link href="/" target="_blank">View site ↗</Link>
          </nav>
          <form action="/admin/signout" method="post">
            <button className="link-btn" type="submit" title={user.email ?? undefined}>Sign out</button>
          </form>
        </div>
      </header>
      <main className="admin-wrap admin-main">{children}</main>
    </>
  );
}
