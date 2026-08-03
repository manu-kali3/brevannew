import { supabase } from "@/lib/supabase";

export const IMAGE_KEYS = [
  "logo",
  "hero_1",
  "hero_2",
  "hero_3",
  "service_1",
  "service_2",
  "service_3",
  "service_details_1",
  "service_details_2",
  "service_details_3",
  "about_image",
  "calculator_image",
  "testimonial_avatar",
  "partner_logo",
  "bg_header",
  "bg_cta",
  "bg_calculator",
  "bg_heading",
] as const;

export type ImageKey = (typeof IMAGE_KEYS)[number];

export const IMAGE_DEFAULTS: Record<ImageKey, string> = {
  logo: "/assets/images/brevan-logo.jpg",
  hero_1: "/assets/images/slide-01.jpg",
  hero_2: "/assets/images/slide-02.jpg",
  hero_3: "/assets/images/slide-03.jpg",
  service_1: "/assets/images/service-image-01.jpg",
  service_2: "/assets/images/service-image-02.jpg",
  service_3: "/assets/images/service-image-03.jpg",
  service_details_1: "/assets/images/service-details-01.jpg",
  service_details_2: "/assets/images/service-details-02.jpg",
  service_details_3: "/assets/images/service-details-03.jpg",
  about_image: "/assets/images/about-left-image.jpg",
  calculator_image: "/assets/images/calculator-image.png",
  testimonial_avatar: "/assets/images/testimonials-01.jpg",
  partner_logo: "/assets/images/client-01.png",
  bg_header: "/assets/images/header-bg.png",
  bg_cta: "/assets/images/cta-bg.jpg",
  bg_calculator: "/assets/images/calculator-bg.jpg",
  bg_heading: "/assets/images/heading-bg.jpg",
};

export type SiteImages = Record<ImageKey, string>;

/**
 * Loads the site images from the `site_settings` table, falling back to the
 * bundled defaults for any key that is missing or unreadable. Used server-side
 * so images render dynamically from the very first paint.
 */
export async function listSiteImages(): Promise<SiteImages> {
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
