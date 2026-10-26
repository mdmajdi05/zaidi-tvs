"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { CONTACT, wa } from "@data/site";

import styles from "./TimedOfferPopup.module.css";

/** Opens immediately on every page load / refresh. */
const WHATSAPP_MESSAGE =
  "Hello Zaidi TVS! I saw the offer popup. Please share today's on-road price, EMI options and free test-ride details.";

export default function TimedOfferPopup() {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<Element | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Put focus back where the visitor left it.
    window.setTimeout(() => {
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    }, 0);
  }, []);

  // Show once, right away, on every page load / refresh.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      // Never interrupt the mobile menu or a booking form already on screen.
      const busy = document.querySelector(
        '.mobile-drawer.open, .modal.open, [role="dialog"][aria-modal="true"]:not([aria-hidden="true"])'
      );
      if (busy) return;

      lastFocused.current = document.activeElement;
      setOpen(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Scroll lock, Esc to close, focus in/out and a simple Tab trap.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = cardRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={cardRef}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="zv-popup-title"
        aria-describedby="zv-popup-desc"
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          aria-label="Close offer"
          onClick={close}
        >
          ×
        </button>

        <div className={styles.banner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/TVS%20BIKES/tvs%20ronin/ronin.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <span className={styles.badge}>Limited-time offer</span>
        </div>

        <div className={styles.body}>
          <p className={styles.eyebrow}>Zaidi TVS · Chandpur</p>
          <h2 id="zv-popup-title" className={styles.title}>
            Get today&apos;s best on-road price
          </h2>
          <p id="zv-popup-desc" className={styles.text}>
            Book a <strong>free test ride</strong> and we&apos;ll share the latest
            price, EMI options and exchange value on WhatsApp — no showroom
            pressure.
          </p>

          <ul className={styles.points}>
            <li>Free test ride at the showroom</li>
            <li>Instant on-road price &amp; EMI</li>
            <li>Best exchange value for your old ride</li>
          </ul>

          <div className={styles.actions}>
            <Link className={styles.primary} href="/contact" onClick={close}>
              Book free test ride <span aria-hidden="true">→</span>
            </Link>
            <a
              className={styles.whatsapp}
              href={wa(WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              Chat on WhatsApp
            </a>
            <a className={styles.call} href={CONTACT.salesPhoneHref} onClick={close}>
              Call now · {CONTACT.salesPhone}
            </a>
          </div>

          <p className={styles.note}>
            No spam · We usually reply within minutes · {CONTACT.salesPhone}
          </p>
        </div>
      </div>
    </div>
  );
}
