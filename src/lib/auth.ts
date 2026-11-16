import "server-only";
import { redirect } from "next/navigation";
import { userClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

// Every admin page and admin action calls requireAdmin(). It checks on the
// server that the user is signed in and listed in admin_users.
export async function requireAdmin() {
  if (!isSupabaseConfigured()) redirect("/admin/setup");
  const supabase = await userClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");
  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error || isAdmin !== true) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not-authorised");
  }
  return { user: data.user };
}
