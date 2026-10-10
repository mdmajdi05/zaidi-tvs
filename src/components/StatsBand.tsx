"use client";

import { useEffect, useRef } from "react";

const MARQUEE = [
  "TVS NTORQ 125",
  "TVS JUPITER",
  "TVS RAIDER",
  "TVS APACHE",
  "TVS RONIN",
  "TVS IQUBE",
  "GENUINE PARTS",
  "SERVICE & CARE",
];

type Stat = {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  sub: string;
  comma?: boolean;
};

const STATS: Stat[] = [
  {
    value: 12000,
    decimals: 0,
    suffix: "+",
    label: "Happy Riders",
    sub: "Across Chandpur & nearby",
    comma: true,
  },
  {
    value: 7500,
    decimals: 0,
    suffix: "+",
    label: "Services / Year",
    sub: "Workshop jobs completed",
    comma: true,
  },
  {
    value: 4.9,
    decimals: 1,
    suffix: "/5",
    label: "Customer Rating",
    sub: "Based on showroom reviews",
  },
  {
    value: 10,
    decimals: 0,
    suffix: "+",
    label: "Years of Trust",
    sub: "Authorized TVS dealership",
  },
];

export default function StatsBand() {
  const bandRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const format = (v: number, i: number) => {
      const s = STATS[i];
      const fixed = v.toFixed(s.decimals);
      const withComma = s.comma ? Number(fixed).toLocaleString("en-US") : fixed;
      return `${withComma}${s.suffix}`;
    };

    const run = () => {
      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = STATS[i].value;
        if (reduced) {
          el.textContent = format(target, i);
          return;
        }
        const t0 = performance.now();
        const dur = 1700;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(target * eased, i);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(band);
    return () => io.disconnect();
  }, []);

  const row = [...MARQUEE, ...MARQUEE];

  return (
    <section className="zStatsBand" ref={bandRef} aria-label="Zaidi TVS in numbers">
      <div className="zStatsMarquee" aria-hidden="true">
        <div className="zStatsTrack">
          {[0, 1].map((half) => (
            <div key={half} className="zStatsHalf">
              {row.map((m, i) => (
                <span key={`${half}-${i}`} className="zStatsItem">
                  {m} <i>•</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="zStatsGrid">
        {STATS.map((s, i) => (
          <div key={s.label} className="zStatCell reveal">
            <b
              ref={(el) => {
                numRefs.current[i] = el;
              }}
            >
              0{s.suffix}
            </b>
            <span className="zStatLabel">{s.label}</span>
            <small>{s.sub}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
