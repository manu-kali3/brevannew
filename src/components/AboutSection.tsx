import Link from "next/link";
import Tabs from "@/components/Tabs";

const tabContent = [
  {
    label: "AI & Automation",
    content: (
      <div>
        <div className="main-list">
          <span className="title">Project Title</span>
          <span className="title">Budget</span>
          <span className="title">Deadline</span>
          <span className="title">Client</span>
        </div>
        <div className="list-item">
          <span className="item item-title">AI Customer Support Bot</span>
          <span className="item">$300 to $700</span>
          <span className="item">2026 Aug 12</span>
          <span className="item">Duka Tech</span>
        </div>
        <div className="list-item">
          <span className="item item-title">Workflow Automation</span>
          <span className="item">$500 to $1,200</span>
          <span className="item">2026 Aug 10</span>
          <span className="item">Sacco Online</span>
        </div>
        <div className="list-item">
          <span className="item item-title">AI Content Assistant</span>
          <span className="item">$200 to $500</span>
          <span className="item">2026 Aug 8</span>
          <span className="item">Edu Centre</span>
        </div>
        <div className="list-item last-item">
          <span className="item item-title">Data &amp; Reporting Dashboards</span>
          <span className="item">$400 to $900</span>
          <span className="item">2026 Aug 2</span>
          <span className="item">AgriLink Kenya</span>
        </div>
      </div>
    ),
  },
  {
    label: "Web & Design",
    content: (
      <div>
        <div className="main-list">
          <span className="title">Project Title</span>
          <span className="title">Budget</span>
          <span className="title">Deadline</span>
          <span className="title">Client</span>
        </div>
        <div className="list-item">
          <span className="item item-title">Business Website</span>
          <span className="item">$150 to $400</span>
          <span className="item">2026 Jul 28</span>
          <span className="item">Local Retailer</span>
        </div>
        <div className="list-item">
          <span className="item item-title">E-Commerce Store</span>
          <span className="item">$400 to $1,200</span>
          <span className="item">2026 Jul 24</span>
          <span className="item">Online Shop</span>
        </div>
        <div className="list-item">
          <span className="item item-title">WordPress Site</span>
          <span className="item">$150 to $350</span>
          <span className="item">2026 Jul 20</span>
          <span className="item">Primary School</span>
        </div>
        <div className="list-item last-item">
          <span className="item item-title">Brand Identity</span>
          <span className="item">$50 to $200</span>
          <span className="item">2026 Jul 16</span>
          <span className="item">Startup</span>
        </div>
      </div>
    ),
  },
  {
    label: "Community & Education",
    content: (
      <div>
        <div className="main-list">
          <span className="title">Project Title</span>
          <span className="title">Budget</span>
          <span className="title">Duration</span>
          <span className="title">Audience</span>
        </div>
        <div className="list-item">
          <span className="item item-title">Digital Literacy Workshop</span>
          <span className="item">$200 to $600</span>
          <span className="item">4 Weeks</span>
          <span className="item">TVET Students</span>
        </div>
        <div className="list-item">
          <span className="item item-title">School Website Project</span>
          <span className="item">$150 to $400</span>
          <span className="item">3 Weeks</span>
          <span className="item">High Schools</span>
        </div>
        <div className="list-item">
          <span className="item item-title">Micro-Enterprise Digitization</span>
          <span className="item">$100 to $500</span>
          <span className="item">2 Weeks</span>
          <span className="item">Local Traders</span>
        </div>
        <div className="list-item last-item">
          <span className="item item-title">AI Skills Bootcamp</span>
          <span className="item">$300 to $800</span>
          <span className="item">6 Weeks</span>
          <span className="item">Youth Groups</span>
        </div>
      </div>
    ),
  },
];

export default function AboutSection() {
  return (
    <section className="about-us" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-heading">
              <h6>About Us</h6>
              <h4>Know Us Better</h4>
            </div>
          </div>
          <div className="col-lg-8">
            <Tabs items={tabContent} />
          </div>
          <div className="col-lg-4">
            <div className="right-content">
              <h4>Please tell us about your idea and how you want it to be</h4>
              <p>
                Brevan Softwares was founded by Emmanuel Kiplangat, an AI
                automation engineer and computer science student, to upscale
                artificial intelligence and digitize local small businesses
                across Kenya.
                <br />
                <br />
                From websites and online stores to AI tools and digital skills,
                we turn your ideas into working solutions. Tell us about your
                project today.
              </p>
              <div className="green-button">
                <Link href="/about-us">Discover More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
