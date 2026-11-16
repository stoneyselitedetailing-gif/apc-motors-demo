"use server";

import { isSupabaseConfigured } from "@/lib/env";
import { serviceClient } from "@/lib/supabase/admin";

export type EnquiryState = { ok: boolean; error?: string } | null;

const KINDS = ["find", "sell", "finance", "car"] as const;
type Kind = (typeof KINDS)[number];

// Fields kept for each enquiry type, besides name, phone, email and message.
const DETAIL_FIELDS: Record<Kind, string[]> = {
  find: ["year", "make", "model", "transmission", "fuel", "max_km", "budget", "finance"],
  sell: ["year", "make", "model", "km", "transmission", "asking_price", "owing", "trade_in", "suburb"],
  finance: ["year", "make", "model", "amount", "repayments"],
  car: ["car", "finance", "trade_in"],
};

function text(form: FormData, name: string, max = 200): string {
  return String(form.get(name) ?? "").trim().slice(0, max);
}

export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Bots fill in the hidden "website" field; people never see it.
  if (text(form, "website")) return { ok: true };

  const kind = text(form, "kind") as Kind;
  if (!KINDS.includes(kind)) return { ok: false, error: "Something went wrong. Please call us instead." };

  const name = text(form, "name", 120);
  const phone = text(form, "phone", 40);
  const email = text(form, "email", 200) || null;
  const message = text(form, "message", 2000) || null;
  if (!name) return { ok: false, error: "Please enter your name." };
  if (phone.replace(/\D/g, "").length < 8) return { ok: false, error: "Please enter a phone number we can call you on." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "That email address doesn't look right." };

  const details: Record<string, string> = {};
  for (const f of DETAIL_FIELDS[kind]) {
    const v = text(form, f);
    if (v) details[f] = v;
  }
  const carId = text(form, "car_id") || null;

  // Demo mode: nothing to save to yet.
  if (!isSupabaseConfigured()) return { ok: true };

  const { error } = await serviceClient()
    .from("enquiries")
    .insert({ kind, name, phone, email, message, details, car_id: carId && /^[0-9a-f-]{36}$/.test(carId) ? carId : null });
  if (error) return { ok: false, error: "We couldn't send that just now. Please call us on 0438 908 560." };
  return { ok: true };
}
