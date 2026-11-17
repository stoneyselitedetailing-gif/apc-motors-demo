-- Adds the 2009 Holden VE SS HDT Improved to stock. Safe to run more than once.
insert into public.cars (
  slug, status, featured, year, make, model, variant, price, km, body, transmission, fuel, engine,
  colour, interior, description, features, photos
)
values (
  '2009-holden-commodore-ve-ss-hdt', 'available', true, 2009, 'Holden', 'Commodore', 'VE SS HDT Improved', 44888, 191865,
  'Sedan', null, 'Petrol', '6.0L V8',
  'White', 'Black cloth',
  'A genuine two-owner 2009 Holden VE SS sedan, HDT Improved: build number 0117, certified 09/2020. It has travelled 191,865 km and comes with log books, service history, a spare key and a file of receipts.

A lot of money and time went into the build, using all genuine HDT and Holden parts, including new paint in 2020: a performance exhaust, OTR intake, tune, Pedders adjustable suspension and plenty more. It presents in great condition inside and out and must be seen. No spend, just cruise and enjoy.

Clear PPSR certificate with no bad history. Competitive finance is available to approved purchasers; conditions apply. We''re happy to help arrange interstate door-to-door transport at the purchaser''s expense, and welcome inspections on site.

The car is in Bibra Lake, Perth. Genuine enquiries only, and viewing is by appointment.',
  array['HDT Improved, build #0117 (certified 09/2020)', 'Genuine 2 owners', 'New paint in 2020', 'Performance exhaust',
        'OTR intake', 'Tune', 'Pedders adjustable suspension', 'All genuine HDT and Holden parts',
        'Log books, service history, spare key and receipts', 'Clear PPSR certificate'],
  array['/images/ve-ss-hdt/01.webp', '/images/ve-ss-hdt/02.webp', '/images/ve-ss-hdt/03.webp',
        '/images/ve-ss-hdt/04.webp', '/images/ve-ss-hdt/05.webp']
)
on conflict (slug) do nothing;
