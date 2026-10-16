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
  { src: "/assets/location-bg.jpg", alt: "Zaidi TVS showroom in Chandpur", cat: "Showroom" },
  { src: "/assets/reference.jpg", alt: "Customer area at the Zaidi TVS showroom", cat: "Showroom" },
  { src: "/assets/cta-bg.jpg", alt: "Sales floor at Zaidi TVS, Chandpur", cat: "Showroom" },

  { src: "/tvs/products/apache-rtr-310.webp", alt: "TVS Apache RTR 310 studio shot", cat: "Bikes" },
  { src: "/tvs/products/apache-rtx.png", alt: "TVS Apache RTX", cat: "Bikes" },
  { src: "/tvs/products/ntorq-125.webp", alt: "TVS NTORQ 125 scooter", cat: "Bikes" },
  { src: "/tvs/products/ronin.webp", alt: "TVS Ronin motorcycle", cat: "Bikes" },
  { src: "/tvs/products/raider.webp", alt: "TVS Raider motorcycle", cat: "Bikes" },
  { src: "/tvs/products/iqube.webp", alt: "TVS iQube electric scooter", cat: "Bikes" },
  { src: "/TVS%20BIKES/Apache%20RTR310/DOHC1037_573.webp", alt: "TVS Apache RTR 310 engine detail", cat: "Bikes" },
  { src: "/TVS%20BIKES/Apache%20rtx310/RIDER%20WITH%20BIKE-D.webp", alt: "Rider with the TVS Apache RTX", cat: "Bikes" },
  { src: "/TVS%20BIKES/Apache%20rr310%20-%20Copy/apacherr310.jpg", alt: "TVS Apache RR 310 on the road", cat: "Bikes" },
  { src: "/TVS%20BIKES/tvs%20ronin/ronin.jpg", alt: "TVS Ronin lifestyle shot", cat: "Bikes" },

  { src: "/tvs/shop/vehicle-care.webp", alt: "Vehicle care products at Zaidi TVS", cat: "Service" },
  { src: "/tvs/shop/protection-security.webp", alt: "Protection and security accessories", cat: "Service" },
  { src: "/tvs/shop/riding-gear.webp", alt: "Riding gear available at the store", cat: "Service" },
  { src: "/tvs/shop/touring-accessories.webp", alt: "Touring accessories for two-wheelers", cat: "Service" },
  { src: "/tvs/shop/helmets.webp", alt: "TVS helmets on display", cat: "Service" },

  { src: "/assets/family-rider.jpg", alt: "Family riders at a Zaidi TVS event", cat: "Events" },
  { src: "/assets/city-rider.jpg", alt: "City rider in Chandpur", cat: "Events" },
  { src: "/assets/quiz-rider.jpg", alt: "Rider at a Zaidi TVS community ride", cat: "Events" },
  { src: "/assets/performance-bike.jpg", alt: "Performance ride event", cat: "Events" },
  { src: "/assets/style-scooter.jpg", alt: "Scooter styling at a Zaidi TVS meet", cat: "Events" },
  { src: "/assets/hero-bike.jpg", alt: "TVS rider on the open road", cat: "Events" },
];

const CATEGORIES: Category[] = ["Showroom", "Bikes", "Service", "Events"];
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
        <div className="eyebrow red">▣ &nbsp; GALLERY</div>
        <h2
          style={{
            fontFamily: "Oswald, Arial, sans-serif",
            fontStyle: "italic",
            fontSize: 30,
            margin: 0,
          }}
        >
          INSIDE ZAIDI TVS
        </h2>
        <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
          Moments from the showroom, the workshop and the road.
        </p>
      </div>

      {!limit ? (
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
