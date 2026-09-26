"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteImages } from "@/components/SiteImagesProvider";

export default function Header() {
  const pathname = usePathname();
  const images = useSiteImages();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleHashClick = (href: string) => (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    }
  };

  const aboutHref = isHome ? "#about" : "/about-us";
  const testimonialsHref = isHome ? "#testimonials" : "/";

  const navLinkClass = (active: boolean) => (active ? "active" : "");

  return (
    <header
      className={`header-area header-sticky ${scrolled ? "background-header" : ""}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link href="/" className="logo" onClick={closeMenu}>
                <img src={images.logo} alt="Brevan Softwares" />
                <span className="logo-text">Brevan Softwares</span>
              </Link>

              <ul className="nav" style={{ display: menuOpen ? "block" : "none" }}>
                <li className="scroll-to-section">
                  <Link
                    href="/"
                    className={navLinkClass(pathname === "/")}
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>
                <li className="has-sub">
                  <button type="button" className="pages-btn">Services</button>
                  <ul className="sub-menu">
                    <li>
                      <Link
                        href="/services/website-design"
                        className={pathname === "/services/website-design" ? "active" : ""}
                        onClick={closeMenu}
                      >
                        Website Design
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/school-management"
                        className={pathname === "/services/school-management" ? "active" : ""}
                        onClick={closeMenu}
                      >
                        School Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/pos-systems"
                        className={pathname === "/services/pos-systems" ? "active" : ""}
                        onClick={closeMenu}
                      >
                        POS Systems
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/e-commerce"
                        className={pathname === "/services/e-commerce" ? "active" : ""}
                        onClick={closeMenu}
                      >
                        E-Commerce
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/ai-automation"
                        className={pathname === "/services/ai-automation" ? "active" : ""}
                        onClick={closeMenu}
                      >
                        AI Automation
                      </Link>
                    </li>
                    <li>
                      <Link href="/our-services" onClick={closeMenu}>
                        All Services
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="scroll-to-section">
                  <Link
                    href={aboutHref}
                    className={navLinkClass(false)}
                    onClick={handleHashClick(aboutHref)}
                  >
                    About
                  </Link>
                </li>
                <li className="has-sub">
                  <button type="button" className="pages-btn">Pages</button>
                  <ul className="sub-menu">
                    <li>
                      <Link href="/about-us" onClick={closeMenu}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/our-services" onClick={closeMenu}>
                        Our Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact-us" onClick={closeMenu}>
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="scroll-to-section">
                  <Link
                    href={testimonialsHref}
                    className={navLinkClass(false)}
                    onClick={handleHashClick(testimonialsHref)}
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className={navLinkClass(pathname === "/events")}
                    onClick={closeMenu}
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className={navLinkClass(pathname === "/projects")}
                    onClick={closeMenu}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" onClick={closeMenu}>
                    Contact Support
                  </Link>
                </li>
                <li>
                  <a href="https://clients.brevansoftwares.co.ke" target="_blank" rel="noopener noreferrer" onClick={closeMenu} style={{ background: "#43ba7f", color: "#fff", padding: "8px 14px", borderRadius: 8, fontWeight: 700 }}>
                    Client Portal
                  </a>
                </li>
                <li>
                  <a href="https://clients.brevansoftwares.co.ke/signup" target="_blank" rel="noopener noreferrer" onClick={closeMenu} style={{ background: "#ff511a", color: "#fff", padding: "8px 14px", borderRadius: 8, fontWeight: 700 }}>
                    Start Application
                  </a>
                </li>
              </ul>

              <a
                className={`menu-trigger ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
