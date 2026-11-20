import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";

export const IMAGE_KEYS = [
  "logo",
  "hero_1",
  "hero_2",
  "hero_3",
  "hero_projects",
  "hero_events",
  "hero_services",
  "hero_about",
  "hero_contact",
  "hero_privacy",
  "hero_blog",
  "service_website",
  "service_pos",
  "service_ecommerce",
  "service_real_estate",
  "service_school",
  "service_design",
  "service_ai",
  "mission_ai",
  "mission_community",
  "mission_education",
  "about_image",
  "partner_logo",
  "bg_header",
  "bg_cta",
  "bg_calculator",
  "bg_heading",
] as const;

export type ImageKey = (typeof IMAGE_KEYS)[number];

export const IMAGE_DEFAULTS: Record<ImageKey, string> = {
  logo: "/assets/images/brevan-logo.jpg",
  hero_1: "/assets/images/slide-01.webp",
  hero_2: "/assets/images/slide-02.webp",
  hero_3: "/assets/images/slide-03.webp",
  hero_projects: "/assets/images/slide-01.webp",
  hero_events: "/assets/images/slide-02.webp",
  hero_services: "/assets/images/slide-03.webp",
  hero_about: "/assets/images/slide-01.webp",
  hero_contact: "/assets/images/slide-02.webp",
  hero_privacy: "/assets/images/slide-03.webp",
  service_website: "/assets/images/service-web-design.webp",
  service_pos: "/assets/images/service-pos.webp",
  service_ecommerce: "/assets/images/service-ecommerce.webp",
  service_real_estate: "/assets/images/service-real-estate.webp",
  service_school: "/assets/images/service-school-management.webp",
  service_design: "/assets/images/service-graphic-design.webp",
  service_ai: "/assets/images/service-ai-automation.webp",
  mission_ai: "/assets/images/mission-ai.webp",
  mission_community: "/assets/images/mission-community.webp",
  mission_education: "/assets/images/mission-education.webp",
  about_image: "/assets/images/about-left-image.webp",
  hero_blog: "/assets/images/slide-02.webp",
  partner_logo: "/assets/images/client-01.png",
  bg_header: "/assets/images/header-bg.png",
  bg_cta: "/assets/images/cta-bg.webp",
  bg_calculator: "/assets/images/calculator-bg.webp",
  bg_heading: "/assets/images/heading-bg.webp",
};

export type SiteImages = Record<ImageKey, string>;

async function loadSiteImages(): Promise<SiteImages> {
  const images = { ...IMAGE_DEFAULTS };

  if (!supabase) return images;

  const { data, error } = await supabase
    .from("site_settings")
    .select("key,value");

  if (error) {
    console.error("Supabase site settings query error:", error.message);
    return images;
  }

  for (const row of data ?? []) {
    if (row.key in images && typeof row.value === "string" && row.value.trim()) {
      images[row.key as ImageKey] = row.value.trim();
    }
  }

  return images;
}

/**
 * Cached site images from the `site_settings` table (falls back to bundled
 * defaults). Cached for 5 minutes so the static pages never wait on a DB
 * round trip; refreshed automatically when the value expires.
 */
export const listSiteImages = unstable_cache(loadSiteImages, ["site-images"], {
  revalidate: 300,
  tags: ["site-images"],
});
