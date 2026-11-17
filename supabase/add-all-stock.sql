-- Adds every car sent so far in one go. Safe to run more than once: cars already
-- in the database are skipped. Paste all of this into Supabase SQL Editor and click Run.

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

-- Adds the 1968 Chevrolet Camaro SS to stock. Safe to run more than once.
insert into public.cars (
  slug, status, featured, year, make, model, variant, price, km, body, transmission, fuel, engine,
  colour, interior, description, features, photos
)
values (
  '1968-chevrolet-camaro-ss', 'available', true, 1968, 'Chevrolet', 'Camaro', 'SS', 99888, 9410,
  'Coupe', 'Automatic', 'Petrol', '5.7L V8, ProCharger supercharged',
  'Grey', 'Black vinyl bucket seats',
  'A complete new-chassis-up build, done around 15 years ago in Texas using a new Fisher body kit and brand new parts throughout. Only 9,410 km travelled since.

Power comes from a 5.7 litre GM Goodwrench crate engine with a billet aluminium ProCharger side mount, through a Turbo 700 transmission with a matched horseshoe selector and an Eaton Truetrac LSD. Wilwood Signature front brakes with vented, slotted rotors sit behind staggered Boyd Coddington alloys on Sumitomo tyres.

The car is immaculate, in better-than-new condition throughout, and a multi show winner. We welcome inspections on site and are happy to help arrange interstate door-to-door transport at the purchaser''s expense.

The car is in Bibra Lake, Perth. Genuine enquiries only, and viewing is by appointment.',
  array['5.7L GM Goodwrench crate engine', 'Billet aluminium ProCharger side mount', 'Turbo 700 transmission, horseshoe selector',
        'Eaton Truetrac LSD', 'Power steering', 'Crane Fireball electronic ignition, in-car advance/retard',
        'Wilwood Signature front brakes, vented slotted rotors', 'Boyd Coddington staggered alloys, Sumitomo tyres',
        'Immobiliser, alarm and keyless entry', 'Kenwood 4-speaker sound with amplifier and subwoofer', 'Multi show winner'],
  array['/images/camaro-ss-68/01.webp', '/images/camaro-ss-68/02.webp', '/images/camaro-ss-68/03.webp',
        '/images/camaro-ss-68/04.webp', '/images/camaro-ss-68/05.webp']
)
on conflict (slug) do nothing;

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

