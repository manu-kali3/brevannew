import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import CtaSection from "@/components/CtaSection";
import { listProjects } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects and case studies delivered by Brevan Softwares in Kenya. Web development, AI automation, digital tools and community solutions.",
};

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <>
      <PageHeading title="Projects" />
      <section className="projects-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading">
                <h6>Our Work</h6>
                <h4>Projects We&apos;ve Built</h4>
              </div>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="row">
              <div className="col-lg-12">
                <div className="projects-empty">
                  <p>Our project portfolio is being updated. Check back soon!</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.id}>
                  <div className="project-thumb">
                    {project.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.image_url} alt={project.title} />
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
                    {project.project_url && (
                      <a
                        className="project-link"
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project <i className="fas fa-arrow-right"></i>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
