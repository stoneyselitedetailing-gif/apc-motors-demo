import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cleanKey, cleanSupabaseUrl } from "@/lib/supabase/url";

// Keeps the admin's session fresh. Access is checked again on the server
// by every admin page and action (src/lib/auth.ts).
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = cleanSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = cleanKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!url || !key) return response;
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        for (const { name, value } of toSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of toSet) response.cookies.set(name, value, options);
      },
    },
  });
  await supabase.auth.getUser();
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
