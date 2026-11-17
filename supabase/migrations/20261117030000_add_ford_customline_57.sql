-- Adds the 1957 Ford Customline V8 sedan to stock. Safe to run more than once.
insert into public.cars (
  slug, status, featured, year, make, model, variant, price, km, body, transmission, fuel, engine,
  colour, interior, description, features, photos
)
values (
  '1957-ford-customline-v8', 'available', true, 1957, 'Ford', 'Customline', 'V8 Sedan', 79888, null,
  'Sedan', 'Automatic', 'Petrol', '272 Y-block V8',
  'Blue and white two-tone', 'Blue and tan vinyl bench seats',
  'A very rare Australian-delivered, numbers-matching 1957 Ford Customline V8 sedan, a must-have for any enthusiast or collector. Powered by the 272 Y-block V8 with a two-speed automatic, it presents and drives great and must be seen.

An older restoration with nothing left to spend: it''s ready for a family Sunday cruise or a Show ''n'' Shine with mates. It''s on full WA registration with a clear PPSR certificate and no bad history, and the private plates are included if sold in WA.

We welcome inspections on site and are happy to help arrange interstate door-to-door transport at the purchaser''s expense. The car is in Bibra Lake, Perth. Genuine enquiries only, and viewing is by appointment.',
  array['Australian delivered', 'Numbers matching', '272 Y-block V8', 'Two-speed automatic', 'Older restoration, no spend needed',
        'Full WA registration', 'Clear PPSR certificate', 'Private plates included if sold in WA'],
  array['/images/ford-customline-57/01.webp', '/images/ford-customline-57/02.webp', '/images/ford-customline-57/03.webp',
        '/images/ford-customline-57/04.webp']
)
on conflict (slug) do nothing;
