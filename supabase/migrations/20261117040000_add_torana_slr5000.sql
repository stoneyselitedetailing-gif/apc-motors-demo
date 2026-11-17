-- Adds the 1974 Holden LH Torana SL/R 5000 to stock. Safe to run more than once.
insert into public.cars (
  slug, status, featured, year, make, model, variant, price, km, body, transmission, fuel, engine,
  colour, interior, description, features, photos
)
values (
  '1974-holden-torana-lh-slr-5000', 'available', true, 1974, 'Holden', 'Torana', 'LH SL/R 5000', 94888, null,
  'Sedan', 'Manual', 'Petrol', '5.0L V8 (L31)',
  'Absinth Yellow', 'Black cloth',
  'An October 1974 Holden LH Torana SL/R 5000 with the 5.0 litre V8 and four-speed manual. It''s numbers matching on all three tags with a matching body number (the engine number does not match), and comes with its Holden Historical Services production report.

It presents in great condition inside and out with nothing to spend, and has just had a new clutch fitted and a maintenance check-over. It''s ready for cruising with the family. Private plates are included if sold in WA (conditions apply).

Production report: built 24/10/1974 at Dandenong, Melbourne. Model 8VD69, body number 454905M. Paint Absinth Yellow (568-15949), trim Black Cloth (1886-19X). Options L31 5.0 litre V8, M21 4-speed manual, GU7 2.78:1 diff. Credited selling dealer City Motors Perth, sold March 1975.

We welcome inspections on site and are happy to help arrange interstate enclosed door-to-door transport at the purchaser''s expense. The car is in Bibra Lake, Perth. Genuine enquiries only, and viewing is by appointment.',
  array['5.0L V8 (L31)', '4-speed manual (M21)', 'Numbers matching on all 3 tags, matching body number',
        'Holden Historical Services production report', 'Built 24/10/1974, Dandenong', 'Absinth Yellow, Black Cloth trim',
        'Sold new by City Motors Perth, March 1975', 'New clutch and maintenance check', 'Private plates included if sold in WA'],
  array['/images/torana-slr5000/01.webp', '/images/torana-slr5000/02.webp', '/images/torana-slr5000/03.webp',
        '/images/torana-slr5000/04.webp']
)
on conflict (slug) do nothing;
