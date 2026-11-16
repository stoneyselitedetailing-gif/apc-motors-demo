import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/env";
import { userClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (isSupabaseConfigured()) {
    const supabase = await userClient();
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
}
