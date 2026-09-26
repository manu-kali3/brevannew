import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import CtaSection from "@/components/CtaSection";
import { listPosts } from "@/lib/supabase";
import { listSiteImages } from "@/lib/site-settings";
import { safeUrl } from "@/lib/validation";

export const dynamic = "force-static";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog & Updates",
  description:
    "Daily updates, news and stories from Brevan Softwares in Kenya. Web design tips, AI automation, school systems, POS and e-commerce insights from the Brevan team.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string | null, created: string) {
  const date = iso ? new Date(iso) : new Date(created);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const [posts, images] = await Promise.all([listPosts(), listSiteImages()]);

  return (
    <>
      <PageHeading
        title="Blog &amp; Updates"
        kicker="Latest News"
        subtitle="Daily updates from the Brevan team — project launches, new services, digital skills tips, and what’s happening around our community in Kenya."
        image={images.hero_blog}
      />
      <section className="blog-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading">
                <h6>From the Blog</h6>
                <h4>Daily Updates</h4>
              </div>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="row">
              <div className="col-lg-12">
                <div className="blog-empty">
                  <p>
                    No updates yet — check back soon! Daily news, project
                    launches and tips will land here.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => {
                const cover = safeUrl(post.cover_image);
                return (
                  <article className="blog-card" key={post.id}>
                    <Link className="blog-thumb" href={`/blog/${post.slug}`}>
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="blog-thumb-fallback">
                          <i className="fas fa-newspaper"></i>
                        </div>
                      )}
                    </Link>
                    <div className="blog-body">
                      <div className="blog-meta">
                        <span>
                          <i className="fas fa-calendar-alt"></i>{" "}
                          {formatDate(post.published_at, post.created_at)}
                        </span>
                        {post.author && (
                          <span>
                            <i className="fas fa-user"></i> {post.author}
                          </span>
                        )}
                      </div>
                      <h4>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}
                      {post.tags && post.tags.length > 0 && (
                        <div className="blog-tags">
                          {post.tags.slice(0, 4).map((tag) => (
                            <span className="blog-tag" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <Link className="blog-read-more" href={`/blog/${post.slug}`}>
                        Read more <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <CtaSection />
    </>
  );
}