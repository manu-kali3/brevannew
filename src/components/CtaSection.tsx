import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="simple-cta">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <h4>
              AI <em>Automation</em> &amp; <strong>Digital</strong>{" "}
              Transformation for Your Business
            </h4>
          </div>
          <div className="col-lg-7">
            <div className="buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <div className="green-button">
                <Link href="/our-services">Discover More</Link>
              </div>
              <div className="orange-button">
                <Link href="/contact-us">Contact Us</Link>
              </div>
              <a href="https://clients.brevansoftwares.co.ke/signup" target="_blank" rel="noopener noreferrer" style={{ background: "#43ba7f", color: "#fff", padding: "12px 22px", borderRadius: 30, fontWeight: 700, textDecoration: "none" }}>
                Start Application
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
