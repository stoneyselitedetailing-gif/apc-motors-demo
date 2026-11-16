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
