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

## Header / Nav

`src/components/Header.tsx` ("use client") renders the desktop nav as a **flex bar** (`brevan.css`, `@media (min-width: 768px)`) so the menu never wraps below the logo at narrow/tablet widths. The "Pages" dropdown is a `<button>` (React 19 blocks `javascript:` URLs). Mobile uses the hamburger `.menu-trigger` with the dropdown panel styled in `brevan.css`.

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
