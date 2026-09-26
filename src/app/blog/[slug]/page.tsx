import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaSection from "@/components/CtaSection";
import { getPost, listPosts } from "@/lib/supabase";
import { renderMarkdown } from "@/lib/markdown";
import { safeUrl } from "@/lib/validation";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const dynamic = "force-static";
export const revalidate = 300;
export const dynamicParams = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://brevansoftwares.co.ke";

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const description = post.excerpt ?? `${post.title} — an update from Brevan Softwares.`;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at ?? post.created_at,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const published = post.published_at ?? post.created_at;
  const cover = safeUrl(post.cover_image);
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const shareText = `New update from Brevan Softwares: ${post.title}`;
  const whatsappShare = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `${shareText} ${shareUrl}`
  )}`;

  return (
    <>
      <section className="blog-post-hero">
        <div className="container">
          <Link className="blog-back" href="/blog">
            <i className="fas fa-arrow-left"></i> All updates
          </Link>
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span>
              <i className="fas fa-calendar-alt"></i> {formatDate(published)}
            </span>
            {post.author && (
              <span>
                <i className="fas fa-user"></i> {post.author}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="blog-post-section">
        <div className="container">
          <article className="blog-article">
            {cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="blog-cover" src={cover} alt={post.title} />
            )}
            <div className="blog-content">{renderMarkdown(post.content ?? "")}</div>

            {post.tags && post.tags.length > 0 && (
              <div className="blog-tags">
                {post.tags.map((tag) => (
                  <span className="blog-tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="blog-share">
              <span>Share this update</span>
              <a
                className="blog-share-btn"
                href={whatsappShare}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i> Share on WhatsApp
              </a>
            </div>
          </article>
        </div>
      </section>
      <CtaSection />
    </>
  );
}