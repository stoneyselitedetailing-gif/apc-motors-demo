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
export async function listPublicCars(): Promise<Car[]> {
  if (!isSupabaseConfigured()) return seedCars.filter((c) => c.status !== "hidden").sort(order);
  const { data, error } = await serviceClient().from("cars").select("*").neq("status", "hidden");
  if (error) throw error;
  return (data as Car[]).map(withUrls).sort(order);
}

export async function getPublicCar(slug: string): Promise<Car | null> {
  if (!isSupabaseConfigured()) return seedCars.find((c) => c.slug === slug && c.status !== "hidden") ?? null;
  const { data, error } = await serviceClient().from("cars").select("*").eq("slug", slug).neq("status", "hidden").maybeSingle();
  if (error) throw error;
  return data ? withUrls(data as Car) : null;
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
