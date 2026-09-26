import HeroSlider from "@/components/HeroSlider";
import ServicesCards from "@/components/ServicesCards";
import CtaSection from "@/components/CtaSection";
import AboutSection from "@/components/AboutSection";
import CalculatorSection from "@/components/CalculatorSection";

export default function Home() {
  return (
    <>
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