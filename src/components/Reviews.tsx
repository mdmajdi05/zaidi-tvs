"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AGGREGATE, REVIEWS, type Review } from "@/lib/reviews";
import styles from "./Reviews.module.css";

/** ms between automatic slide advances. */
const AUTO_ADVANCE = 5500;

/** True when the visitor asked the OS/browser to reduce motion. */
function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const getSnapshot = useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className={styles.stars} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rounded ? styles.starOn : styles.starOff} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

/** A single review card. Exported so the reviews page can reuse it in a grid. */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.avatar} aria-hidden="true">
          {review.initials}
        </span>
        <div className={styles.who}>
          <b className={styles.name}>{review.name}</b>
          <span className={styles.meta}>
            {review.city} · {review.model}
          </span>
        </div>
      </div>
      <Stars rating={review.rating} />
      <p className={styles.text}>{review.text}</p>
      <div className={styles.date}>{review.date}</div>
    </article>
  );
}

export default function Reviews({ limit }: { limit?: number }) {
  const reviews = useMemo(
    () => (typeof limit === "number" && limit > 0 ? REVIEWS.slice(0, limit) : REVIEWS),
    [limit]
  );
  const count = reviews.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);

  // Keep the active index inside range even if `limit` changes.
  const active = count > 0 ? ((index % count) + count) % count : 0;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  // Move the scroller to the active card (CSS decides how many are visible).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[active] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  // Auto-advance: paused on hover/focus and disabled under reduced-motion.
  useEffect(() => {
    if (paused || reduced || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, AUTO_ADVANCE);
    return () => window.clearInterval(id);
  }, [paused, reduced, count]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div className="section-head">
          <div className="eyebrow red"> &nbsp; RIDER STORIES</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            WHAT RIDERS SAY
          </h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            Feedback from riders across Chandpur and nearby towns.
          </p>
        </div>
        <div className={styles.badge}>
          <b>{AGGREGATE.rating.toFixed(1)}★</b>
          <span>{AGGREGATE.count}+ happy riders</span>
        </div>
      </div>

      <div
        className={styles.viewport}
        role="group"
        aria-label="Customer reviews carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onKeyDown={onKeyDown}
      >
        <ul
          className={styles.track}
          ref={trackRef}
          aria-label={`Customer reviews — showing ${active + 1} of ${count}`}
        >
          {reviews.map((review) => (
            <li className={styles.slide} key={`${review.name}-${review.date}`}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>

        {count > 1 ? (
          <>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.prev}`}
              aria-label="Previous reviews"
              onClick={() => goTo(active - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.next}`}
              aria-label="Next reviews"
              onClick={() => goTo(active + 1)}
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className={styles.footer}>
          <span className="srOnly" aria-live="polite">
            Showing review {active + 1} of {count}
          </span>
          <div className={styles.dots}>
            {reviews.map((review, i) => (
              <button
                key={`${review.name}-dot`}
                type="button"
                className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                aria-label={`Show review ${i + 1} of ${count}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      ) : null}

      <p style={{ color: "inherit", opacity: 0.55, fontSize: 11, margin: "14px 0 0" }}>
        *Ratings and comments are compiled from feedback shared with our team.
      </p>
    </div>
  );
}
