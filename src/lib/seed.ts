import type { Car } from "@/lib/car-types";

// Demo stock, used only until Supabase is connected.
export const seedCars: Car[] = [
  {
    id: "seed-hsv-coupe",
    slug: "hsv-coupe",
    status: "available",
    featured: true,
    year: null,
    make: "HSV",
    model: "Coupe",
    variant: null,
    price: null,
    km: null,
    body: "2-door coupe",
    transmission: "Automatic",
    fuel: null,
    engine: null,
    colour: "Black",
    interior: "Tan leather sports seats",
    description:
      "A gloss black HSV Coupe with tan leather sports seats, presented in excellent condition. Call for kilometres, full history and an inspection time.",
    features: ["Tan leather sports seats", "Rear spoiler", "Twin exhaust", "Multi-spoke alloy wheels"],
    photos: [
      "/images/hsv-coupe-front.webp",
      "/images/hsv-coupe-side.webp",
      "/images/hsv-coupe-rear.webp",
      "/images/hsv-coupe-seats.webp",
      "/images/hsv-coupe-interior.webp",
      "/images/hsv-coupe-door.webp",
    ],
    created_at: "2026-11-16T00:00:00Z",
  },
];
