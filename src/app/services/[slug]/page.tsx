import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { SERVICE_PAGES, getServicePage } from "@/lib/service-pages";
import { listProjects } from "@/lib/supabase";
import { listSiteImages } from "@/lib/site-settings";
import { SITE_URL } from "@/app/sitemap";

export const dynamic = "force-static";
export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/services/${page.slug}`,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
      url: `/services/${page.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getServicePage(slug);
  if (!content) notFound();

  const [projects, images] = await Promise.all([
    listProjects(),
    listSiteImages(),
  ]);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.name,
    description: content.metaDescription,
    url: `${SITE_URL}/services/${content.slug}`,
    serviceType: content.name,
    provider: {
      "@type": "Organization",
      name: "Brevan Softwares",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Kenya" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/our-services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.name,
        item: `${SITE_URL}/services/${content.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServicePageTemplate
        content={content}
        images={images}
        projects={projects}
      />
    </>
  );
}