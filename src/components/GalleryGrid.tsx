"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import styles from "./GalleryGrid.module.css";

type Category = "Showroom" | "Bikes" | "Service" | "Events";

type GalleryItem = {
  src: string;
  alt: string;
  cat: Category;
};

const ITEMS: GalleryItem[] = [
  { src: "/tvs/products/apache-rtr-310.webp", alt: "TVS Apache RTR 310", cat: "Bikes" },
  { src: "/tvs/products/apache-rtr-160-4v.webp", alt: "TVS Apache RTR 160 4V", cat: "Bikes" },
  { src: "/tvs/products/apache-rtr-200-4v.webp", alt: "TVS Apache RTR 200 4V", cat: "Bikes" },
  { src: "/tvs/products/apache-rr-310.webp", alt: "TVS Apache RR 310", cat: "Bikes" },
  { src: "/tvs/products/apache-rtx.png", alt: "TVS Apache RTX", cat: "Bikes" },
  { src: "/tvs/products/ronin.webp", alt: "TVS Ronin", cat: "Bikes" },
  { src: "/tvs/products/raider.webp", alt: "TVS Raider 125", cat: "Bikes" },
  { src: "/tvs/products/radeon.webp", alt: "TVS Radeon", cat: "Bikes" },
  { src: "/tvs/products/sport.webp", alt: "TVS Sport", cat: "Bikes" },
  { src: "/tvs/products/jupiter.webp", alt: "TVS Jupiter", cat: "Bikes" },
  { src: "/tvs/products/jupiter-125.webp", alt: "TVS Jupiter 125", cat: "Bikes" },
  { src: "/tvs/products/ntorq-125.webp", alt: "TVS NTORQ 125", cat: "Bikes" },
  { src: "/tvs/products/ntorq-150.png", alt: "TVS NTORQ 150", cat: "Bikes" },
  { src: "/tvs/products/zest-110.webp", alt: "TVS Zest 110", cat: "Bikes" },
  { src: "/tvs/products/iqube.webp", alt: "TVS iQube electric scooter", cat: "Bikes" },
  { src: "/tvs/products/orbiter.webp", alt: "TVS Orbiter electric scooter", cat: "Bikes" },
  { src: "/tvs/products/tvs-x.webp", alt: "TVS X electric scooter", cat: "Bikes" },
  { src: "/tvs/products/xl100.webp", alt: "TVS XL100 moped", cat: "Bikes" },
  { src: "/TVS%20BIKES/Apache%20rtx310/RIDER%20WITH%20BIKE-D.webp", alt: "Rider with the TVS Apache RTX", cat: "Bikes" },
  { src: "/TVS%20BIKES/tvs%20ronin/ronin.jpg", alt: "TVS Ronin on the road", cat: "Bikes" },
];

const CATEGORIES: Category[] = ["Bikes"];
const ALL = "All" as const;
type Filter = typeof ALL | Category;

export default function GalleryGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<Filter>(ALL);
  const [active, setActive] = useState<number | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const isOpen = active !== null;

  const visible = useMemo(() => {
    const base = limit ? ITEMS.slice(0, limit) : ITEMS;
    if (limit || filter === ALL) return base;
    return base.filter((item) => item.cat === filter);
  }, [limit, filter]);

  const close = useCallback(() => {
    setActive(null);
    const previous = lastFocused.current;
    if (previous && document.contains(previous)) previous.focus();
    lastFocused.current = null;
  }, []);

  const step = useCallback(
    (dir: number) => {
      setActive((current) => {
        if (current === null || visible.length === 0) return current;
        return (current + dir + visible.length) % visible.length;
      });
    },
    [visible.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }
      if (event.key === "Tab") {
        const nodes = overlayRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes || nodes.length === 0) return;
        const list = Array.from(nodes);
        const first = list[0];
        const last = list[list.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const open = (index: number, trigger: HTMLElement) => {
    lastFocused.current = trigger;
    setActive(index);
  };

  const current = active !== null ? visible[active] ?? null : null;

  return (
    <div className={styles.wrap}>
      <div className="section-head">
        <div className="eyebrow red"> &nbsp; GALLERY</div>
        <h2>Inside Zaidi TVS</h2>
        <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
          Every TVS motorcycle, scooter and electric available at our Chandpur showroom.
        </p>
      </div>

      {!limit && CATEGORIES.length > 1 ? (
        <div className={styles.chips} role="group" aria-label="Filter gallery by category">
          {[ALL, ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.chip} ${filter === cat ? styles.chipActive : ""}`.trim()}
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.grid}>
        {visible.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            className={styles.tile}
            onClick={(event) => open(index, event.currentTarget)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span className={styles.tileTag}>{item.cat}</span>
          </button>
        ))}
      </div>

      {isOpen && current ? (
        <div
          className={styles.lightbox}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={overlayRef}
            className={styles.lbDialog}
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${current.alt}`}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.lbClose}
              aria-label="Close image viewer"
              onClick={close}
            >
              &times;
            </button>

            {visible.length > 1 ? (
              <>
                <button
                  type="button"
                  className={`${styles.lbNav} ${styles.lbPrev}`}
                  aria-label="Previous image"
                  onClick={() => step(-1)}
                >
                  &lsaquo;
                </button>
                <button
                  type="button"
                  className={`${styles.lbNav} ${styles.lbNext}`}
                  aria-label="Next image"
                  onClick={() => step(1)}
                >
                  &rsaquo;
                </button>
              </>
            ) : null}

            <figure className={styles.lbFigure}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.src} alt={current.alt} />
              <figcaption className={styles.lbCaption}>
                <span>{current.alt}</span>
                <small>
                  {current.cat} · {(active ?? 0) + 1} / {visible.length}
                </small>
              </figcaption>
            </figure>
          </div>
        </div>
      ) : null}
    </div>
  );
}
