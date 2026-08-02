import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import CtaSection from "@/components/CtaSection";
import Tabs from "@/components/Tabs";
import Partners from "@/components/Partners";

export const metadata: Metadata = {
  title: "Our Services",
};

const missionTabs = [
  {
    label: "AI & Tech Integration",
    content: (
      <div>
        <div className="left-image">
          <img src="/assets/images/service-details-01.jpg" alt="AI and tech integration" />
        </div>
        <div className="right-content">
          <h4>Practical AI automation for schools and enterprises</h4>
          <p>
            We bring practical AI automation solutions and future-ready skills
            to schools and local enterprises, helping them work smarter with
            technology.
          </p>
          <span>- AI chatbots for customer support</span>
          <span>- Business process automation</span>
          <span className="last-span">- AI tools and skills for your team</span>
        </div>
      </div>
    ),
  },
  {
    label: "Community Digitalization",
    content: (
      <div>
        <div className="left-image">
          <img src="/assets/images/service-details-02.jpg" alt="Community digitalization" />
        </div>
        <div className="right-content">
          <h4>Digital tools for micro-enterprises</h4>
          <p>
            We promote digital tools for micro-enterprises and bridge the
            technology gap between rural and urban sectors so every business can
            compete.
          </p>
          <span>- Websites for local businesses</span>
          <span>- Online stores and payments</span>
          <span className="last-span">- Real estate listing platforms</span>
        </div>
      </div>
    ),
  },
  {
    label: "Education & Innovation",
    content: (
      <div>
        <div className="left-image">
          <img src="/assets/images/service-details-03.jpg" alt="Education and innovation" />
        </div>
        <div className="right-content">
          <h4>Equipping learners and TVET students</h4>
          <p>
            We equip learners and TVET students with technical proficiencies
            through practical training in web design, programming and AI.
          </p>
          <span>- Digital skills workshops</span>
          <span>- School and college projects</span>
          <span className="last-span">- AI skills bootcamps for youth</span>
        </div>
      </div>
    ),
  },
];

const services = [
  {
    icon: "fas fa-laptop-code",
    title: "Website Design",
    text: "We design and develop custom, modern websites that look great and work perfectly on mobile, tablet and desktop. From simple business sites to content-rich platforms, we build websites that help your business grow and reach more customers online.",
    image: "service-image-01.jpg",
    side: "right",
  },
  {
    icon: "fab fa-wordpress",
    title: "WordPress & Joomla",
    text: "We build professional websites on WordPress and Joomla so you can easily manage your own content. We handle themes, plugins, setup, security and maintenance, giving you a powerful and flexible website without the technical stress.",
    image: "service-image-02.jpg",
    side: "left",
  },
  {
    icon: "fas fa-shopping-cart",
    title: "E-Commerce Solutions",
    text: "Launch a secure online store with easy product management, mobile money and card payments, and order tracking. We help Kenyan businesses sell their products online to customers everywhere.",
    image: "service-image-03.jpg",
    side: "right",
  },
  {
    icon: "fas fa-building",
    title: "Real Estate Platforms",
    text: "We build property listing websites and platforms for real estate agents, landlords and developers. Showcase properties, manage listings and connect with serious buyers and tenants online.",
    image: "service-image-01.jpg",
    side: "left",
  },
  {
    icon: "fas fa-palette",
    title: "Graphic Design & Branding",
    text: "Logos, brand identities, posters, flyers, banners and marketing materials that make your business look professional and memorable. A strong brand builds trust and sets you apart from competitors.",
    image: "service-image-02.jpg",
    side: "right",
  },
  {
    icon: "fas fa-robot",
    title: "AI Automation",
    text: "Bring artificial intelligence into your daily operations with chatbots, automated workflows, smart content and data dashboards. We help schools and local enterprises save time, cut costs and stay ahead of the digital curve.",
    image: "service-image-03.jpg",
    side: "left",
  },
];

export default function OurServicesPage() {
  return (
    <>
      <PageHeading title="Our Services" />
      <section className="main-services">
        <div className="container">
          <div className="row">
            {services.map((service, i) => (
              <div className="col-lg-12" key={service.title}>
                <div className={`service-item ${i === services.length - 1 ? "last-service" : ""}`}>
                  <div className="row">
                    {service.side === "right" ? (
                      <>
                        <div className="col-lg-6">
                          <div className="left-image">
                            <img src={`/assets/images/${service.image}`} alt={service.title} />
                          </div>
                        </div>
                        <div className="col-lg-6 align-self-center">
                          <div className="right-text-content">
                            <i className={service.icon}></i>
                            <h4>{service.title}</h4>
                            <p>{service.text}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-lg-6 align-self-center">
                          <div className="left-text-content">
                            <i className={service.icon}></i>
                            <h4>{service.title}</h4>
                            <p>{service.text}</p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="right-image">
                            <img src={`/assets/images/${service.image}`} alt={service.title} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
      <section className="service-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading">
                <h6>What Drives Us</h6>
                <h4>Our Mission &amp; Focus</h4>
              </div>
            </div>
            <div className="col-lg-10 offset-lg-1">
              <Tabs items={missionTabs} />
            </div>
          </div>
        </div>
      </section>
      <Partners />
    </>
  );
}
