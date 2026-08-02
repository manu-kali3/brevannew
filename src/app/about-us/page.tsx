import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Accordions from "@/components/Accordions";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "About Us",
};

const accordionItems = [
  {
    title: "Who We Are",
    content: (
      <>
        Brevan Softwares is a Kenyan technology initiative founded by Emmanuel
        Kiplangat, an AI automation engineer and computer science student at
        Maasai Mara Technical and Vocational College (MMTVC).
        <br />
        <br />
        Our mission is to upscale artificial intelligence, digitize local small
        businesses and drive digital transformation in rural and educational
        communities across Kenya.
      </>
    ),
  },
  {
    title: "Our Mission & Focus",
    content: (
      <>
        <strong>AI &amp; Tech Integration:</strong> Bringing practical AI
        automation solutions and future-ready skills to schools and local
        enterprises.
        <br />
        <br />
        <strong>Community Digitalization:</strong> Promoting digital tools for
        micro-enterprises and bridging the technology gap between rural and
        urban sectors.
        <br />
        <br />
        <strong>Education &amp; Innovation:</strong> Equipping learners and TVET
        students with technical proficiencies for the digital economy.
      </>
    ),
  },
  {
    title: "Why Choose Brevan Softwares",
    content: (
      <>
        We combine practical AI automation with modern web and design skills to
        deliver solutions that work for real businesses. From websites and
        online stores to chatbots and digital skills training, we are committed
        to the growth of our community.
        <br />
        <br />
        Affordable, reliable and locally rooted, we understand the needs of
        small businesses and educational institutions across Kenya.
      </>
    ),
  },
];

export default function AboutUsPage() {
  return (
    <>
      <PageHeading title="About Us" />
      <section className="top-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-image">
                <img src="/assets/images/about-left-image.jpg" alt="About Brevan Softwares" />
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <Accordions items={accordionItems} />
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
