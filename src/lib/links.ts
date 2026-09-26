// Central, env-driven links for the portals the site points to.
// Override the NEXT_PUBLIC_* values in .env if a portal host moves.

export const PORTAL_URL =
  process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL ??
  "https://clients.brevansoftwares.co.ke";

export const PORTAL_SIGNUP_URL = `${PORTAL_URL}/signup`;

export const EVENTS_PORTAL_URL =
  process.env.NEXT_PUBLIC_EVENTS_PORTAL_URL ??
  "https://events.brevansoftwares.co.ke";