import "server-only";
import { isSupabaseConfigured, env } from "@/lib/env";
import { serviceClient, PHOTO_BUCKET } from "@/lib/supabase/admin";
import { seedCars } from "@/lib/seed";
import type { Car, CarStatus } from "@/lib/car-types";

export type { Car, CarStatus } from "@/lib/car-types";

// Photos are either files that ship with the site (start with "/") or
// uploads in the Supabase storage bucket.
export function photoUrl(path: string): string {
  if (path.startsWith("/") || path.startsWith("http")) return path;
  return `${env.supabaseUrl}/storage/v1/object/public/${PHOTO_BUCKET}/${path}`;
}

function withUrls(c: Car): Car {
  return { ...c, photos: c.photos.map(photoUrl) };
}

const rank = (s: CarStatus) => (s === "sold" ? 2 : s === "under_offer" ? 1 : 0);
const order = (a: Car, b: Car) =>
  rank(a.status) - rank(b.status) || Number(b.featured) - Number(a.featured) || b.created_at.localeCompare(a.created_at);

/** Every car the public can see: available first, sold last. */
// A database problem never breaks the public site (or a Vercel build): the
// stock list just comes back empty and the problem is logged.
export async function listPublicCars(): Promise<Car[]> {
  if (!isSupabaseConfigured()) return seedCars.filter((c) => c.status !== "hidden").sort(order);
  try {
    const { data, error } = await serviceClient().from("cars").select("*").neq("status", "hidden");
    if (error) throw error;
    return (data as Car[]).map(withUrls).sort(order);
  } catch (e) {
    console.error("Couldn't load stock from Supabase:", e);
    return [];
  }
}

export async function getPublicCar(slug: string): Promise<Car | null> {
  if (!isSupabaseConfigured()) return seedCars.find((c) => c.slug === slug && c.status !== "hidden") ?? null;
  try {
    const { data, error } = await serviceClient().from("cars").select("*").eq("slug", slug).neq("status", "hidden").maybeSingle();
    if (error) throw error;
    return data ? withUrls(data as Car) : null;
  } catch (e) {
    console.error("Couldn't load a car from Supabase:", e);
    return null;
  }
}

/** Plain-English reason the database isn't usable yet, or null if it's fine. */
export async function databaseProblem(): Promise<string | null> {
  try {
    const { error } = await serviceClient().from("cars").select("id", { head: true, count: "exact" });
    if (!error) return null;
    if (error.code === "42P01" || error.code === "PGRST205" || /does not exist|schema cache/i.test(error.message))
      return "The database tables haven't been created yet. In Supabase, open SQL Editor, paste in the SQL file from the repo (supabase/migrations) and click Run.";
    if (/invalid api key|jwt|unauthor/i.test(error.message))
      return "Supabase rejected the secret key. Check SUPABASE_SECRET_KEY in Vercel is the secret key from this project, then redeploy.";
    return `Supabase returned an error: ${error.message}`;
  } catch {
    return "Couldn't reach Supabase. Check NEXT_PUBLIC_SUPABASE_URL in Vercel is this project's URL, then redeploy.";
  }
}

/** Admin: every car, including hidden ones. Call after requireAdmin(). */
export async function listAllCars(): Promise<Car[]> {
  const { data, error } = await serviceClient().from("cars").select("*");
  if (error) throw error;
  return (data as Car[]).map(withUrls).sort(order);
}

/** Admin: one car with its raw photo paths (not URLs). Call after requireAdmin(). */
export async function getCarForEdit(id: string): Promise<Car | null> {
  const { data, error } = await serviceClient().from("cars").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Car) ?? null;
}
