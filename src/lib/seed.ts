import type { Car } from "@/lib/car-types";

const xwPhotos = Array.from({ length: 27 }, (_, i) => `/images/xw-gt/${String(i + 1).padStart(2, "0")}.webp`);

// Demo stock, used only until Supabase is connected.
export const seedCars: Car[] = [
  {
    id: "seed-xw-falcon-gt",
    slug: "ford-falcon-xw-gt",
    status: "available",
    featured: true,
    year: null,
    make: "Ford",
    model: "Falcon",
    variant: "XW GT",
    price: null,
    km: null,
    body: "Sedan",
    transmission: "Manual",
    fuel: "Petrol",
    engine: "351 V8",
    colour: "Dark green with gold GT stripes",
    interior: "Black vinyl bucket seats",
    description:
      "A genuine Australian muscle car icon. This XW Falcon GT is powered by the 351 High Performance V8 with a four-speed manual, and presents beautifully inside and out, from the bonnet scoop and gold GT stripes to the red-line tyres. It comes with its original owner's manual and maintenance schedule. Call for full history and an inspection time.",
    features: [
      "351 High Performance V8",
      "4-speed manual",
      "Bonnet scoop",
      "Gold GT side stripes",
      "Red-line tyres",
      "Woodgrain dash and steering wheel",
      "Original owner's manual and service book",
    ],
    photos: xwPhotos,
    created_at: "2026-11-17T00:00:00Z",
  },
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
