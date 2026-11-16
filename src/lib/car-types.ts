// Shared by server and browser code.

export type CarStatus = "available" | "under_offer" | "sold" | "hidden";

export type Car = {
  id: string;
  slug: string;
  status: CarStatus;
  featured: boolean;
  year: number | null;
  make: string;
  model: string;
  variant: string | null;
  price: number | null;
  km: number | null;
  body: string | null;
  transmission: string | null;
  fuel: string | null;
  engine: string | null;
  colour: string | null;
  interior: string | null;
  description: string | null;
  features: string[];
  photos: string[];
  created_at: string;
};

export const STATUS_LABEL: Record<CarStatus, string> = {
  available: "Available",
  under_offer: "Under offer",
  sold: "Sold",
  hidden: "Hidden",
};

export function carTitle(c: Pick<Car, "year" | "make" | "model" | "variant">): string {
  return [c.year, c.make, c.model, c.variant].filter(Boolean).join(" ");
}

export function priceText(c: Pick<Car, "price">): string {
  return c.price != null ? `$${c.price.toLocaleString("en-AU")}` : "Price on application";
}

export function kmText(km: number | null): string | null {
  return km != null ? `${km.toLocaleString("en-AU")} km` : null;
}
