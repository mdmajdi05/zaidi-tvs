import Link from "next/link";
import { sortedPosts, formatPostDate } from "@/lib/posts";
import styles from "./BlogTeaser.module.css";

export default function BlogTeaser({ limit = 3 }: { limit?: number }) {
  const posts = sortedPosts.slice(0, limit);

  return (
    <div className={styles.wrap}>
      <div className="section-head">
        <div className="eyebrow red">▣ &nbsp; NEWS &amp; TIPS</div>
        <h2
          style={{
            fontFamily: "Oswald, Arial, sans-serif",
            fontStyle: "italic",
            fontSize: 30,
            margin: 0,
          }}
        >
          FROM THE ZAIDI BLOG
        </h2>
        <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
          Practical ownership guides, buying advice and maintenance tips for every rider.
        </p>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.slug} className={styles.card}>
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
        ))}
      </div>

      <div className={styles.cta}>
        <Link className="btn primary" href="/blog">
          READ ALL ARTICLES <span>→</span>
        </Link>
      </div>
    </div>
  );
}
