import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteImagesProvider from "@/components/SiteImagesProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import AsyncCss from "@/components/AsyncCss";
import { listSiteImages } from "@/lib/site-settings";
import { SystemStatusGate } from "@/components/SystemStatus";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://brevansoftwares.co.ke";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NZZFG3MW";

export const dynamic = "force-static";
export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Brevan Softwares - AI Automation & Web Design in Kenya",
    template: "%s | Brevan Softwares",
  },
  description:
    "Brevan Softwares is a Kenyan technology initiative by Emmanuel Kiplangat offering AI automation, website design, WordPress, POS, e-commerce, real estate platforms and graphic design for local businesses, schools and communities.",
  keywords: [
    "AI automation Kenya",
    "website design Kenya",
    "WordPress developer",
    "POS Systems",
    "e-commerce Kenya",
    "graphic design Narok",
    "digital training Kenya",
    "Brevan Softwares",
  ],
  applicationName: "Brevan Softwares",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: "Brevan Softwares",
    title: "Brevan Softwares - AI Automation & Web Design in Kenya",
    description:
      "AI automation, website design and digital tools that help local businesses, schools and communities across Kenya grow.",
  },
  twitter: {
    card: "summary",
    title: "Brevan Softwares - AI Automation & Web Design in Kenya",
    description:
      "AI automation, website design and digital tools that help local businesses, schools and communities across Kenya grow.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const images = await listSiteImages();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href={images.hero_1} fetchPriority="high" />
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/templatemo-574-mexant.css" />
        <link rel="stylesheet" href="/assets/css/brevan.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Brevan Softwares",
              url: SITE_URL,
              email: "brevansoftwares@gmail.com",
              telephone: "+254117004147",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Narok",
                addressCountry: "KE",
              },
              founder: {
                "@type": "Person",
                name: "Emmanuel Kiplangat",
              },
              description:
                "AI automation, website design and digital tools for local businesses, schools and communities across Kenya.",
            }),
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <SystemStatusGate />
        <SiteImagesProvider images={images}>
          <Header />
          {children}
          <Footer images={images} />
        </SiteImagesProvider>
        <AsyncCss />
        <WhatsAppButton />
      </body>
    </html>
  );
}
