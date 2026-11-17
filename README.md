# APC Motor Group · Performance Vehicle Warehouse

The website concept for APC Motor Group, with Performance Vehicle Warehouse as its stock section and an admin area where the owner manages stock and reads enquiries.

It is a **concept preview**: a banner marks it as such, and search engines are told not to index it (`robots.txt`, a `noindex` meta tag and an `X-Robots-Tag` header).

## What's in it

- `/`: home page with the latest stock, services, finance, about and the enquiry forms
- `/stock`: every car, with filters for make, body and price
- `/stock/<car>`: a car's own page with its photo gallery, details and an enquiry form
- `/admin`: the owner signs in to add and edit cars, upload photos from a phone, mark cars Under offer, Sold or Hidden, and read enquiries

Until Supabase is connected the site runs in **demo mode**: it shows the HSV Coupe from `src/lib/seed.ts`, the forms show a thank-you message without saving anything, and `/admin` shows these setup steps.

## Switching on the admin area

1. Create a free project at [supabase.com](https://supabase.com).
2. In Supabase, open **SQL Editor**, paste in `supabase/migrations/20261116000000_stock_and_enquiries.sql` and click **Run**.
3. In **Authentication → Users**, click **Add user**, enter the owner's email and a password, and tick **Auto confirm**.
4. Back in **SQL Editor**, run this with that email in lower case:
   ```sql
   insert into public.admin_users (email) values ('owner@example.com');
   ```
5. In **Authentication → Sign In / Providers**, turn off **Allow new users to sign up**, so only users you add can sign in.
6. In Vercel, open the project's **Settings → Environment Variables** and add these from Supabase → **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`: the Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: the publishable (anon) key
   - `SUPABASE_SERVICE_ROLE_KEY`: the secret (service_role) key. Keep this one secret.
7. Redeploy. The owner signs in at `/admin`.

## Vercel settings

The project is a Next.js app. In Vercel → **Settings → Build and Deployment**, set **Framework Preset** to **Next.js** and leave the build command and output directory on their defaults.

## Local development

```bash
npm install
npm run dev
```

## Handover

Both Vercel and Supabase let you transfer a project to another account (Vercel: project **Settings → General → Transfer**; Supabase: **Project Settings → General → Transfer project**). Point the owner's domain at Vercel under **Settings → Domains**.

Before launch: remove the concept banner (`DemoStrip` in `src/components/SiteChrome.tsx`) and the `noindex` settings in `src/app/layout.tsx`, `next.config.ts` and `public/robots.txt`.

## Adding stock

The easiest way is the admin area: `/admin` → **+ Add a car**, with photos uploaded from a phone.

Cars supplied as listings are also kept as SQL in `supabase/migrations/*_add_*.sql`. To add all of them at once, paste `supabase/add-all-stock.sql` into Supabase → SQL Editor and click **Run**. It is safe to run more than once.

## Deploying

Vercel builds every push to `main`. On Vercel's Hobby plan with a private repository, it only builds commits authored by the account owner; if a deployment shows as blocked, go to Deployments → **Create Deployment**, enter `main`, and deploy.
