"use client";

import { useEffect, useRef } from "react";
import BikeSVG from "./BikeSVG";

/**
 * ScrollBike — Google/YouTube jaisa top loading effect,
 * lekin line par ek REAL bike photo ka badge chalta hai.
 * Jitna percent neeche scroll, utna badge left -> right.
 */
export default function ScrollBike() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const root = rootRef.current;
    const fill = fillRef.current;
    const bike = bikeRef.current;
    const pct = pctRef.current;
    if (!root || !fill || !bike || !pct) return;

    let ticking = false;
    let lastY = window.scrollY;

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      lastY = window.scrollY;

      fill.style.transform = `scaleX(${p})`;
      const travel = Math.max(0, window.innerWidth - 120);
      bike.style.transform = `translateX(${(p * travel).toFixed(1)}px)`;
      pct.textContent = `${Math.round(p * 100)}%`;
      root.classList.toggle("show", window.scrollY > 40);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className="z-scrollbike" aria-hidden="true">
      <div className="z-sb-track">
        <div ref={fillRef} className="z-sb-fill" />
      </div>
      <div className="z-sb-road" />
      <div ref={bikeRef} className="z-sb-bike">
        <BikeSVG />
      </div>
      <span ref={pctRef} className="z-sb-pct">0%</span>
    </div>
  );
}
