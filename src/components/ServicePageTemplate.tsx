import PageHeading from "@/components/PageHeading";
import CtaSection from "@/components/CtaSection";
import CalculatorSection from "@/components/CalculatorSection";
import Accordions from "@/components/Accordions";
import { safeUrl } from "@/lib/validation";
import type { Project } from "@/lib/supabase";
import type { SiteImages } from "@/lib/site-settings";
import type { ServicePageContent } from "@/lib/service-pages";

export default function ServicePageTemplate({
  content,
  images,
  projects,
}: {
  content: ServicePageContent;
  images: SiteImages;
  projects: Project[];
}) {
  // Match projects whose category contains one of the service keywords
  // (case-insensitive) so each page shows real work where available.
  const keywords = content.projectKeywords.map((k) => k.toLowerCase());
  const matchedProjects = projects.filter((project) => {
    const category = (project.category ?? "").toLowerCase();
    return keywords.some((keyword) => category.includes(keyword));
  });

  return (
    <>
      <PageHeading
        title={content.heroTitle}
        kicker={content.kicker}
        subtitle={content.subtitle}
        image={images[content.heroImage]}
        crumb={content.name}
      />

      {/* Service explanation */}
      <section className="service-page-section service-overview">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="section-heading">
                <h6>{content.name}</h6>
                <h4>{content.introHeading}</h4>
              </div>
              {content.intro.map((paragraph, index) => (
                <p key={index} className="service-overview-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="service-page-section service-features">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading">
                <h6>What&apos;s Included</h6>
                <h4>{content.featuresHeading}</h4>
              </div>
            </div>
          </div>
          <div className="row service-feature-grid">
            {content.features.map((feature, index) => (
              <div className="col-lg-4 col-md-6 col-12" key={index}>
                <div className="service-feature-card">
                  <i className={feature.icon} aria-hidden="true"></i>
                  <h5>{feature.title}</h5>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="service-page-section service-process">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading">
                <h6>How It Works</h6>
                <h4>{content.processHeading}</h4>
              </div>
            </div>
          </div>
          <div className="row">
            {content.process.map((step, index) => (
              <div className="col-lg-3 col-md-6 col-12" key={index}>
                <div className="service-step-card">
                  <span className="service-step-num">{index + 1}</span>
                  <h5>{step.title}</h5>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real projects, where available */}
      {matchedProjects.length > 0 && (
        <section className="service-page-section service-projects">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="section-heading">
                  <h6>Real Work</h6>
                  <h4>{content.projectsHeading}</h4>
                </div>
              </div>
            </div>
            <div className="projects-grid">
              {matchedProjects.map((project) => {
                const imageUrl = safeUrl(project.image_url);
                const projectUrl = safeUrl(project.project_url);
                return (
                  <article className="project-card" key={project.id}>
                    <div className="project-thumb">
                      {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="project-thumb-fallback">
                          <i className="fas fa-laptop-code"></i>
                        </div>
                      )}
                    </div>
                    <div className="project-body">
                      {project.category && (
                        <span className="project-category">{project.category}</span>
                      )}
                      <h4>{project.title}</h4>
                      {project.description && (
                        <p className="project-desc">{project.description}</p>
                      )}
                      {projectUrl && (
                        <a
                          className="project-link"
                          href={projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project <i className="fas fa-arrow-right"></i>
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section className="service-page-section service-faq">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="section-heading">
                  <h6>FAQ</h6>
                  <h4>{content.faqHeading}</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <Accordions
                  items={content.faqs.map((faq) => ({
                    title: faq.question,
                    content: faq.answer,
                  }))}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaSection />
      <CalculatorSection />
    </>
  );
}