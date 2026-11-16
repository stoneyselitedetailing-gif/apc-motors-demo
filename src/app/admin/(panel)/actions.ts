"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { serviceClient, PHOTO_BUCKET } from "@/lib/supabase/admin";
import { photoUrl } from "@/lib/cars";
import type { CarStatus } from "@/lib/car-types";

const STATUSES: CarStatus[] = ["available", "under_offer", "sold", "hidden"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function refreshSite() {
  revalidatePath("/", "layout");
}

function str(form: FormData, name: string, max = 200): string | null {
  const v = String(form.get(name) ?? "").trim().slice(0, max);
  return v === "" ? null : v;
}

function int(form: FormData, name: string): number | null {
  const v = String(form.get(name) ?? "").replace(/[^\d]/g, "");
  return v === "" ? null : Number(v);
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}

export type SaveState = { error?: string; saved?: boolean } | null;

export async function saveCar(_prev: SaveState, form: FormData): Promise<SaveState> {
  await requireAdmin();
  const id = str(form, "id");
  const make = str(form, "make", 60);
  const model = str(form, "model", 60);
  if (!make || !model) return { error: "Make and model are required." };
  const year = int(form, "year");
  if (year != null && (year < 1900 || year > 2100)) return { error: "Year should be four digits, e.g. 2006." };
  const status = (str(form, "status") ?? "available") as CarStatus;
  if (!STATUSES.includes(status)) return { error: "Pick a status." };

  const row = {
    make,
    model,
    year,
    status,
    variant: str(form, "variant", 80),
    price: int(form, "price"),
    km: int(form, "km"),
    body: str(form, "body", 60),
    transmission: str(form, "transmission", 40),
    fuel: str(form, "fuel", 40),
    engine: str(form, "engine", 80),
    colour: str(form, "colour", 60),
    interior: str(form, "interior", 80),
    description: str(form, "description", 4000),
    features: String(form.get("features") ?? "")
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)
      .slice(0, 40),
    featured: form.get("featured") === "on",
    updated_at: new Date().toISOString(),
  };

  const db = serviceClient();
  if (id) {
    if (!UUID.test(id)) return { error: "That car wasn't found." };
    const { error } = await db.from("cars").update(row).eq("id", id);
    if (error) return { error: "Couldn't save. Try again." };
    refreshSite();
    return { saved: true };
  }

  const slug = `${slugify([year, make, model, row.variant].filter(Boolean).join(" "))}-${Math.random().toString(36).slice(2, 6)}`;
  const { data, error } = await db.from("cars").insert({ ...row, slug }).select("id").single();
  if (error || !data) return { error: "Couldn't save. Try again." };
  refreshSite();
  redirect(`/admin/cars/${data.id}?new=1`);
}

export async function setStatus(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  const status = String(form.get("status") ?? "") as CarStatus;
  if (!UUID.test(id) || !STATUSES.includes(status)) return;
  await serviceClient().from("cars").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  refreshSite();
}

async function removeUploads(paths: string[]) {
  const uploads = paths.filter((p) => !p.startsWith("/") && !p.startsWith("http"));
  if (uploads.length) await serviceClient().storage.from(PHOTO_BUCKET).remove(uploads);
}

export async function deleteCar(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  if (!UUID.test(id)) return;
  const db = serviceClient();
  const { data } = await db.from("cars").select("photos").eq("id", id).maybeSingle();
  await db.from("cars").delete().eq("id", id);
  if (data) await removeUploads(data.photos as string[]);
  refreshSite();
  redirect("/admin");
}

export type UploadResult = { path: string; url: string } | { error: string };

// One photo per call. The browser shrinks each photo before sending it, so
// a request stays well under Vercel's 4.5 MB limit.
export async function uploadPhoto(carId: string, form: FormData): Promise<UploadResult> {
  await requireAdmin();
  if (!UUID.test(carId)) return { error: "That car wasn't found." };
  const file = form.get("file");
  if (!(file instanceof File)) return { error: "No photo received." };
  const types: Record<string, string> = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" };
  const ext = types[file.type];
  if (!ext) return { error: `${file.name} isn't a JPEG, PNG or WebP photo.` };
  if (file.size > 4 * 1024 * 1024) return { error: `${file.name} is too large.` };

  const db = serviceClient();
  const path = `${carId}/${crypto.randomUUID()}.${ext}`;
  const up = await db.storage.from(PHOTO_BUCKET).upload(path, file, { contentType: file.type, cacheControl: "31536000" });
  if (up.error) return { error: `Couldn't upload ${file.name}.` };

  const { data } = await db.from("cars").select("photos").eq("id", carId).single();
  const photos = [...((data?.photos as string[]) ?? []), path];
  const { error } = await db.from("cars").update({ photos, updated_at: new Date().toISOString() }).eq("id", carId);
  if (error) {
    await removeUploads([path]);
    return { error: "Couldn't save the photo. Try again." };
  }
  refreshSite();
  return { path, url: photoUrl(path) };
}

// Saves a new order (first photo is the cover). Photos left out are deleted.
export async function savePhotoOrder(carId: string, paths: string[]): Promise<{ error?: string }> {
  await requireAdmin();
  if (!UUID.test(carId)) return { error: "That car wasn't found." };
  const db = serviceClient();
  const { data } = await db.from("cars").select("photos").eq("id", carId).single();
  const current = (data?.photos as string[]) ?? [];
  const next = paths.filter((p) => current.includes(p));
  const { error } = await db.from("cars").update({ photos: next, updated_at: new Date().toISOString() }).eq("id", carId);
  if (error) return { error: "Couldn't save the photo order." };
  await removeUploads(current.filter((p) => !next.includes(p)));
  refreshSite();
  return {};
}

export async function setHandled(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  if (!UUID.test(id)) return;
  await serviceClient().from("enquiries").update({ handled: form.get("handled") === "true" }).eq("id", id);
  revalidatePath("/admin", "layout");
}
