// Cleans up the Supabase Project URL however it was pasted: stray spaces or
// quotes, a missing https://, or extra on the end such as /rest/v1/. Only
// the address itself (e.g. https://abcd.supabase.co) is kept. Returns
// undefined if it isn't a web address at all.
export function cleanSupabaseUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let v = raw.trim().replace(/^(["'])(.*)\1$/, "$2").trim();
  if (v === "") return undefined;
  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  try {
    const u = new URL(v);
    if (!u.hostname.includes(".")) return undefined;
    return u.origin;
  } catch {
    return undefined;
  }
}

// Same tidy-up for keys: stray spaces or quotes around the value.
export function cleanKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const v = raw.trim().replace(/^(["'])(.*)\1$/, "$2").trim();
  return v !== "" ? v : undefined;
}
