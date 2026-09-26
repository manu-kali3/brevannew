import type { Metadata } from "next";
import HeroSlider from "@/components/HeroSlider";
import ServicesCards from "@/components/ServicesCards";
import CtaSection from "@/components/CtaSection";
import AboutSection from "@/components/AboutSection";
import CalculatorSection from "@/components/CalculatorSection";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://brevansoftwares.co.ke";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Brevan Softwares is a Kenyan technology initiative by Emmanuel Kiplangat offering AI automation, website design, WordPress, POS, e-commerce, real estate platforms and graphic design for local businesses, schools and communities.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Brevan Softwares",
            url: SITE_URL,
            inLanguage: "en-KE",
            publisher: {
              "@type": "Organization",
              name: "Brevan Softwares",
              url: SITE_URL,
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="visually-hidden">
        Brevan Softwares — Web Design, AI Automation, School Management, POS
        &amp; E-Commerce in Kenya
      </h1>
      <HeroSlider />
      <ServicesCards />
      <CtaSection />
      <AboutSection />
      <CalculatorSection />
    </>
  );
}