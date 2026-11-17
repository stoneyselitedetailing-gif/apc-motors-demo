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

const five = (dir: string) => Array.from({ length: 5 }, (_, i) => `/images/${dir}/0${i + 1}.webp`);

// The same cars as the SQL files in supabase/migrations, so demo mode matches the live site.
seedCars.unshift(
  {
    id: "seed-x1", slug: "2025-bmw-x1-m35i-xdrive", status: "available", featured: true, year: 2025, make: "BMW", model: "X1",
    variant: "M35i xDrive", price: null, km: 11222, body: "SUV", transmission: "Automatic", fuel: "Petrol",
    engine: "2.0L turbo 4-cylinder", colour: "White", interior: "Red and black leather M sport seats",
    description: "A one-owner 2025 BMW X1 M35i xDrive with a very low 11,222 km, in as-new condition.",
    features: ["One owner", "Balance of new car warranty", "20\" M Sport Y-spoke wheels", "Privacy glass"],
    photos: five("bmw-x1-m35i"), created_at: "2026-11-17T03:00:00Z",
  },
  {
    id: "seed-camaro", slug: "1968-chevrolet-camaro-ss", status: "available", featured: true, year: 1968, make: "Chevrolet",
    model: "Camaro", variant: "SS", price: 99888, km: 9410, body: "Coupe", transmission: "Automatic", fuel: "Petrol",
    engine: "5.7L V8, ProCharger supercharged", colour: "Grey", interior: "Black vinyl bucket seats",
    description: "A complete new-chassis-up build with only 9,410 km travelled since. A multi show winner.",
    features: ["ProCharger side mount", "Turbo 700 transmission", "Wilwood front brakes", "Multi show winner"],
    photos: five("camaro-ss-68"), created_at: "2026-11-17T02:00:00Z",
  },
  {
    id: "seed-ssv", slug: "2017-holden-commodore-ssv-redline", status: "available", featured: true, year: 2017, make: "Holden",
    model: "Commodore", variant: "VF II SS V Redline", price: 64888, km: 26450, body: "Sedan", transmission: "Automatic",
    fuel: "Petrol", engine: "6.2L V8", colour: "Son of a Gun", interior: "Black leather",
    description: "A September 2017 VF Series II SS V Redline with only 26,450 km and no modifications.",
    features: ["Factory sunroof", "Log books and service history", "Spare key", "Clear PPSR"],
    photos: five("vf-ssv-redline"), created_at: "2026-11-17T01:00:00Z",
  },
);

const pics = (dir: string, n: number) => Array.from({ length: n }, (_, i) => `/images/${dir}/0${i + 1}.webp`);

seedCars.push(
  {
    id: "seed-ve-hdt", slug: "2009-holden-commodore-ve-ss-hdt", status: "available", featured: false, year: 2009, make: "Holden",
    model: "Commodore", variant: "VE SS HDT Improved", price: 44888, km: 191865, body: "Sedan", transmission: null, fuel: "Petrol",
    engine: "6.0L V8", colour: "White", interior: "Black cloth",
    description: "A genuine two-owner VE SS, HDT Improved build #0117 (certified 09/2020), with new paint in 2020 and a file of receipts.",
    features: ["HDT Improved, build #0117", "Genuine 2 owners", "Performance exhaust", "Pedders adjustable suspension"],
    photos: pics("ve-ss-hdt", 5), created_at: "2026-11-17T09:00:00Z",
  },
  {
    id: "seed-vf-hdt", slug: "2014-holden-commodore-vf-ss-hdt", status: "available", featured: false, year: 2014, make: "Holden",
    model: "Commodore", variant: "VF SS HDT Improved", price: 63888, km: 62565, body: "Sedan", transmission: null, fuel: "Petrol",
    engine: "6.0L V8", colour: "Blue", interior: "Black leather and suede",
    description: "A VF SS, HDT Improved build #0144 (certified 06/2022), with only 62,565 km, log books and a spare key.",
    features: ["HDT Improved, build #0144", "Only 62,565 km", "OTR intake and tune", "Pedders adjustable suspension"],
    photos: pics("vf-ss-hdt", 4), created_at: "2026-11-17T08:00:00Z",
  },
  {
    id: "seed-torana", slug: "1974-holden-torana-lh-slr-5000", status: "available", featured: true, year: 1974, make: "Holden",
    model: "Torana", variant: "LH SL/R 5000", price: 94888, km: null, body: "Sedan", transmission: "Manual", fuel: "Petrol",
    engine: "5.0L V8 (L31)", colour: "Absinth Yellow", interior: "Black cloth",
    description: "An October 1974 LH Torana SL/R 5000, numbers matching on all three tags, with its Holden Historical Services production report.",
    features: ["5.0L V8 (L31)", "4-speed manual (M21)", "Production report", "New clutch"],
    photos: pics("torana-slr5000", 4), created_at: "2026-11-17T07:00:00Z",
  },
  {
    id: "seed-customline", slug: "1957-ford-customline-v8", status: "available", featured: false, year: 1957, make: "Ford",
    model: "Customline", variant: "V8 Sedan", price: 79888, km: null, body: "Sedan", transmission: "Automatic", fuel: "Petrol",
    engine: "272 Y-block V8", colour: "Blue and white two-tone", interior: "Blue and tan vinyl bench seats",
    description: "A very rare Australian-delivered, numbers-matching 1957 Customline V8, ready for Sunday cruises and Show 'n' Shines.",
    features: ["Australian delivered", "Numbers matching", "272 Y-block V8", "Full WA registration"],
    photos: pics("ford-customline-57", 4), created_at: "2026-11-17T06:00:00Z",
  },
);
