-- Adds the 2025 BMW X1 M35i xDrive to stock. Safe to run more than once.
insert into public.cars (
  slug, status, featured, year, make, model, variant, price, km, body, transmission, fuel, engine,
  colour, interior, description, features, photos
)
values (
  '2025-bmw-x1-m35i-xdrive', 'available', true, 2025, 'BMW', 'X1', 'M35i xDrive', null, 11222,
  'SUV', 'Automatic', 'Petrol', '2.0L turbo 4-cylinder',
  'White', 'Red and black leather M sport seats',
  'A one-owner 2025 BMW X1 M35i xDrive, bought new from Auto Classic on 10/09/2025, with the original contract of sale. It has travelled a very low 11,222 km and presents in as-new condition. It must be seen.

It comes with full service history and a spare key, and was just serviced at BMW on 10/08/2026. The balance of the 5-year new car warranty and roadside assist is included.

Clear PPSR certificate, with registration until 26/02/2027. We welcome inspections on site and are happy to help arrange interstate door-to-door transport at the purchaser''s expense.

The car is in Bibra Lake, Perth. Viewing is by appointment.',
  array['One owner, original contract of sale', 'Only 11,222 km', 'Balance of 5-year new car warranty and roadside assist',
        'Just serviced at BMW (10/08/2026)', 'Full service history and spare key', '20" M Sport Y-spoke wheels',
        'Rear seat adjustment', 'Aluminium ''Mesheffect'' interior trim', 'Privacy glass',
        'Clear PPSR certificate', 'Rego until 26/02/2027'],
  array['/images/bmw-x1-m35i/01.webp', '/images/bmw-x1-m35i/02.webp', '/images/bmw-x1-m35i/03.webp',
        '/images/bmw-x1-m35i/04.webp', '/images/bmw-x1-m35i/05.webp']
)
on conflict (slug) do nothing;
