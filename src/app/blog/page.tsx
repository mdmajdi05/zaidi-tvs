import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { sortedPosts, formatPostDate } from "@/lib/posts";
import { breadcrumbSchema, createMetadata, itemListSchema } from "@/lib/seo";
import styles from "@/components/BlogTeaser.module.css";

export const metadata: Metadata = createMetadata({
  title: "Blog, Buying Guides & Tips",
  description:
    "Buying guides, finance explainers, maintenance and monsoon care tips for two-wheeler owners — straight from the Zaidi TVS team in Chandpur, Uttar Pradesh.",
  path: "/blog",
  keywords: [
    "TVS blog",
    "two wheeler buying guide India",
    "bike maintenance tips",
    "TVS EMI explained",
    "monsoon bike care",
  ],
});

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog & Tips", url: "/blog" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          sortedPosts.map((post) => ({
            name: post.title,
            url: `/blog/${post.slug}`,
            description: post.excerpt,
            image: post.cover,
          })),
        )}
      />
      <PageHero
        eyebrow="BLOG & TIPS"
        title="NEWS & TIPS."
        subtitle="Honest, practical guidance for every stage of two-wheeler ownership — from choosing your ride to keeping it reliable."
      />

      <section className="page-section section-light">
        <div className="section-head">
          <div className="eyebrow red"> &nbsp; LATEST STORIES</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            ALL ARTICLES
          </h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            {sortedPosts.length} articles, newest first.
          </p>
        </div>

        <div className={styles.grid} style={{ marginTop: 30 }}>
          {sortedPosts.map((post) => (
            <Reveal key={post.slug}>
              <article className={styles.card}>
                <Link className={styles.cover} href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.cover} alt={post.title} loading="lazy" />
                  <span className={styles.chip}>{post.category}</span>
                </Link>
                <div className={styles.body}>
                  <h3 className={styles.title}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <div className={styles.meta}>
                    <span>{formatPostDate(post.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
