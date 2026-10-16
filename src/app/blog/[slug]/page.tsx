import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { POSTS, getPost, sortedPosts, formatPostDate } from "@/lib/posts";
import {
  articleSchema,
  breadcrumbSchema,
  createMetadata,
} from "@/lib/seo";
import { wa } from "@data/site";
import styles from "@/components/BlogTeaser.module.css";

/** This page reads `params`, so it is allowed to block the first render. */
export const instant = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return createMetadata({
      title: "Article not found",
      description: "This article is no longer available.",
      path: `/blog/${slug}`,
      noindex: true,
    });
  }
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    authors: [post.author],
    tags: [post.category],
    image: post.cover,
    imageAlt: post.title,
    keywords: [post.title, post.category, "TVS blog", "two wheeler guide India"],
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const waText = `Hello Zaidi TVS! I read your article "${post.title}" and would like to know more.`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={articleSchema({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          publishedAt: post.date,
          author: post.author,
          image: post.cover,
          category: post.category,
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog & Tips", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />
      <PageHero eyebrow={post.category.toUpperCase()} title={post.title} subtitle={post.excerpt} />

      <section className="page-section dark">
        <Reveal>
          <figure className={styles.articleCover} style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt={post.title} />
          </figure>
        </Reveal>
        <div className={styles.articleMeta}>
          <span className={styles.articleAuthor}>{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatPostDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>
      </section>

      <section className="page-section section-light">
        <article className={styles.articleBody}>
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return <h2 key={i}>{block.text}</h2>;
            }
            if (block.type === "ul") {
              return (
                <ul key={i}>
                  {(block.items ?? []).map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}
        </article>
      </section>

      <section className="page-section dark">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; NEED HELP?</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            TALK TO OUR TEAM
          </h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            Questions about a TVS model, finance or servicing? We are one message away.
          </p>
        </div>
        <div className={styles.ctaRow}>
          <a
            className="btn primary"
            href={wa(waText)}
            target="_blank"
            rel="noopener noreferrer"
          >
            ASK ON WHATSAPP <span>→</span>
          </a>
          <Link className="btn ghost" href="/blog">
            BACK TO BLOG <span>→</span>
          </Link>
        </div>
      </section>

      <section className="page-section section-light">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; KEEP READING</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            MORE FROM THE BLOG
          </h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((r) => (
            <Link key={r.slug} className={styles.relatedCard} href={`/blog/${r.slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.cover} alt={r.title} loading="lazy" />
              <div className={styles.relatedBody}>
                <small>{r.category}</small>
                <strong>{r.title}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
