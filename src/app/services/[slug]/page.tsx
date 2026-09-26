import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { SERVICE_PAGES, getServicePage } from "@/lib/service-pages";
import { listProjects } from "@/lib/supabase";
import { listSiteImages } from "@/lib/site-settings";

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

  return (
    <ServicePageTemplate
      content={content}
      images={images}
      projects={projects}
    />
  );
}