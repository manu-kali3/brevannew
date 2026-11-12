/**
 * Shule Breeze — the school management product Brevan Softwares delivers.
 *
 * Every value here can be overridden with an environment variable, so the
 * branding (logo, name) and links can change without touching the code:
 *
 *   NEXT_PUBLIC_SHULEBREEZE_URL     product site   (default https://shulebreeze.co.ke)
 *   NEXT_PUBLIC_SHULEBREEZE_LOGO    logo image URL (default <site>/assets/images/shuleflow-logo.png)
 *   NEXT_PUBLIC_SHULEBREEZE_REGISTER  sign-up page  (default <site>/register)
 *   NEXT_PUBLIC_SHULEBREEZE_MODULES   modules page  (default <site>/modules)
 */

const SITE =
  process.env.NEXT_PUBLIC_SHULEBREEZE_URL?.replace(/\/+$/, "") ||
  "https://shulebreeze.co.ke";

export const SHULE_BREEZE_URL = SITE;

/** Official product logo, served by the Shule Breeze site. */
export const SHULE_BREEZE_LOGO =
  process.env.NEXT_PUBLIC_SHULEBREEZE_LOGO?.trim() ||
  `${SITE}/assets/images/shuleflow-logo.png`;

export const SHULE_BREEZE_REGISTER_URL =
  process.env.NEXT_PUBLIC_SHULEBREEZE_REGISTER?.trim() || `${SITE}/register`;

export const SHULE_BREEZE_MODULES_URL =
  process.env.NEXT_PUBLIC_SHULEBREEZE_MODULES?.trim() || `${SITE}/modules`;

export const SHULE_BREEZE_CONFIG = {
  slug: "school-management",
  name: "Shule Breeze",
  tagline: "Offline-first school management for Kenyan schools",
  description:
    "Shule Breeze keeps working when the internet drops: learners, CBC assessment, attendance, timetables, fees and M-Pesa, parents and staff in one platform — then it syncs to the cloud the moment signal returns.",
  /** Facts verified on shulebreeze.co.ke (offline-first, 19 modules, 5 roles). */
  highlights: [
    { icon: "fas fa-wifi", label: "Works offline" },
    { icon: "fas fa-clipboard-check", label: "CBC assessment" },
    { icon: "fas fa-coins", label: "Fees & M-Pesa" },
    { icon: "fas fa-users", label: "Parent portal" },
  ],
} as const;
