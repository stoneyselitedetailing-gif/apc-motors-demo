-- Adds the 2017 Holden VF II SS V Redline to stock. Safe to run more than once.
insert into public.cars (
  slug, status, featured, year, make, model, variant, price, km, body, transmission, fuel, engine,
  colour, interior, description, features, photos
)
values (
  '2017-holden-commodore-ssv-redline', 'available', true, 2017, 'Holden', 'Commodore', 'VF II SS V Redline',
  64888, 26450, 'Sedan', 'Automatic', 'Petrol', '6.2L V8',
  'Son of a Gun', 'Black leather',
  'A September 2017 Holden VF Series II SS V Redline in Son of a Gun, with only 26,450 km travelled and no modifications. It comes with log books, full service history and a spare key, and presents in great condition inside and out. It must be seen.

Clear PPSR certificate, with WA registration until 30/05/2027. We''re happy to help arrange interstate door-to-door transport at the purchaser''s expense, and welcome inspections on site. Competitive finance is available to approved purchasers; conditions apply.

The car is in Bibra Lake, Perth. Genuine enquiries only, and viewing is by appointment.',
  array['Only 26,450 km', 'Factory sunroof', 'Log books and service history', 'Spare key', 'No modifications',
        'Clear PPSR certificate', 'WA rego until 30/05/2027'],
  array['/images/vf-ssv-redline/01.webp', '/images/vf-ssv-redline/02.webp', '/images/vf-ssv-redline/03.webp',
        '/images/vf-ssv-redline/04.webp', '/images/vf-ssv-redline/05.webp']
)
on conflict (slug) do nothing;
