# Brevan Softwares — Main Website

Marketing site for Brevan Softwares (Kenyan tech initiative: AI automation, website design and digital tools). Public production URL: **https://brevansoftwares.co.ke**.

## Tech Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Supabase** (Postgres) — shared project `hhplmvpwlikifflwczgx.supabase.co`
- **Resend** — contact / quote / newsletter form emails
- **Swiper** — hero slider and testimonials

## Getting Started

```bash
npm install
copy .env.example .env.local   # Windows, or: cp .env.example .env.local
npm run dev                    # http://localhost:3000
```

Node 18.18+ / 20+ is required (Next.js 16).

## Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used by `layout.tsx` / `sitemap.ts`). |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (`https://<project>.supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (Settings > API). |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key — **server only, never expose** in client code. |
| `RESEND_API_KEY` | Resend key for form emails (https://resend.com/api-keys). |
| `CONTACT_EMAIL` | Where form submissions are delivered (default `brevansoftwares@gmail.com`). |
| `EMAIL_FROM` | Sender address, e.g. `Brevan Softwares <no-reply@yourdomain.com>`. |

`.env*` is gitignored — never commit real keys.

## Project Structure

```
src/
  app/            App Router pages (about-us, events, our-services, projects, contact-us)
  components/     Header, HeroSlider, site sections
  lib/
    supabase.ts   Server-side Supabase client (unstable_cache + ISR)
    site-settings.ts  Site image settings (cached)
    email.ts      Resend client (gracefully no-ops without a key)
```

## Caching / Performance

The site is **statically generated with ISR** (no `force-dynamic`):

- Pages export `revalidate` (300s; events 120s).
- `listSiteImages` (300s), `listEvents` (120s), `listProjects` (300s) are wrapped in `unstable_cache`.
- `vercel.json` adds immutable cache headers for `/assets`, `/vendor`, `/_next/static`.

When you change data in Supabase, edits appear within the revalidate window (or force a redeploy).

## Service Imagery

`/our-services` shows **one purpose-made image per service**, not the shared
template stock photos it used to ship with:

| Key | File | Service |
| --- | --- | --- |
| `service_website` | `service-web-design.webp` | Website Design |
| `service_pos` | `service-pos.webp` | POS Systems |
| `service_ecommerce` | `service-ecommerce.webp` | E-Commerce |
| `service_real_estate` | `service-real-estate.webp` | Real Estate Platforms |
| `service_school` | `service-school-management.webp` | School Management |
| `service_design` | `service-graphic-design.webp` | Graphic Design & Branding |
| `service_ai` | `service-ai-automation.webp` | AI Automation |
| `mission_ai` / `mission_community` / `mission_education` | `mission-*.webp` | Mission tab panels |
| `about_image` | `about-left-image.webp` | About page |

Rules to keep in mind when swapping artwork:

- **Every service needs its own file.** Reusing one image across cards is what
  made the page look generic.
- Serve `.webp` at ~1080px on the long edge. The generated 1376×768 PNG sources
  were 2–2.7 MB each; the WebP versions are 32–81 KB at the same crop.
- `public/assets/images` is cached `immutable` for a year, so **a replaced image
  must get a new filename** (or a cache-busting query) or returning visitors keep
  the old bytes.
- The key set in `src/lib/site-settings.ts` (`IMAGE_KEYS`) and the seed rows in
  `supabase/schema.sql` must match; the SQL file also deletes retired keys so an
  old row can't shadow a new default.

WordPress is intentionally **not** offered as a service — it was removed from the
homepage grid, the services page, the footer, the quote form, the About copy and
the metadata/keywords so the wording stays consistent with what we actually build.

## Header / Nav

`src/components/Header.tsx` ("use client") renders the desktop nav as a **flex bar** (`brevan.css`, `@media (min-width: 1200px)`) so the menu never wraps below the logo. Below 1200px — phone **and** tablet — the nav collapses into the hamburger `.menu-trigger`; tapping it adds an `.open` class to the `<ul class="nav">`, which the `max-width: 1199px` block shows as a panel under the bar. Visibility is always decided in CSS (never with an inline `style`), because an inline `display:none` renders in the static HTML and would hide the menu on desktop. The "Pages" dropdown is a `<button>` (React 19 blocks `javascript:` URLs).

## Build & Production

```bash
npm run build     # statically prerenders all pages
npm run start     # serves on http://localhost:3000 (port 3000)
```

## Deploy

Deploys automatically from GitHub on push to `main`:

- Repo: https://github.com/manu-kali3/brevannew
- Hosted on Vercel.

Set the environment variables above in the Vercel project settings.
