-- Adds the 2014 Holden VF SS HDT Improved to stock. Safe to run more than once.
insert into public.cars (
  slug, status, featured, year, make, model, variant, price, km, body, transmission, fuel, engine,
  colour, interior, description, features, photos
)
values (
  '2014-holden-commodore-vf-ss-hdt', 'available', true, 2014, 'Holden', 'Commodore', 'VF SS HDT Improved', 63888, 62565,
  'Sedan', null, 'Petrol', '6.0L V8',
  'Blue', 'Black leather and suede',
  'A 2014 Holden VF SS sedan, HDT Improved: build number 0144, certified 06/2022. It has travelled only 62,565 km and comes with log books, service history and a spare key.

A lot of money and time went into the build, using all genuine HDT and Holden parts: a performance exhaust, OTR intake, tune, Pedders adjustable suspension and plenty more. It presents in great condition inside and out and must be seen. No spend, just cruise and enjoy.

Clear PPSR certificate with no bad history, and WA registration until 26/11/2026. Private plates are included if sold in WA. Competitive finance is available to approved purchasers; conditions apply. We''re happy to help arrange interstate door-to-door transport at the purchaser''s expense, and welcome inspections on site.

The car is in Bibra Lake, Perth. Genuine enquiries only, and viewing is by appointment.',
  array['HDT Improved, build #0144 (certified 06/2022)', 'Only 62,565 km', 'Performance exhaust', 'OTR intake', 'Tune',
        'Pedders adjustable suspension', 'All genuine HDT and Holden parts', 'Log books, service history and spare key',
        'Clear PPSR certificate', 'Private plates included if sold in WA'],
  array['/images/vf-ss-hdt/01.webp', '/images/vf-ss-hdt/02.webp', '/images/vf-ss-hdt/03.webp', '/images/vf-ss-hdt/04.webp']
)
on conflict (slug) do nothing;
