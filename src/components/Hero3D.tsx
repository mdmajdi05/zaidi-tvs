"use client";

import { useEffect, useRef } from "react";

/**
 * Realistic TVS-style speedometer cluster.
 * Scroll -> 0-160 km/h, gear N..6, fuel drops, redline glows,
 * needle vibrates like a real engine. Indicators blink on CSS.
 */
const NUMS = [0, 20, 40, 60, 80, 100, 120, 140, 160];
const FUEL_BARS = 6;

export default function Hero3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);
  const gearRef = useRef<HTMLSpanElement>(null);
  const redRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const fuelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = stageRef.current;
    if (!stage) return;
    let frame = 0;
    let current = 0;
    let target = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      if (!hero) {
        target = 0;
        return;
      }
      const rect = hero.getBoundingClientRect();
      const max = Math.max(1, hero.offsetHeight - window.innerHeight);
      target = Math.min(1, Math.max(0, -rect.top / max));
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    const render = () => {
      current += (target - current) * (reduced ? 1 : 0.09);
      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;

      stage.style.transform = `translate3d(${(tx * 26).toFixed(1)}px, ${(ty * 20).toFixed(1)}px, 0)`;
      stage.style.opacity = "1";

      const speed = current * 160;
      // engine vibration grows with rpm
      const t = performance.now() / 1000;
      const vib = reduced
        ? 0
        : (Math.sin(t * 47) * 1.5 + Math.sin(t * 31 + 1.3) * 1.0) * current;
      if (needleRef.current) {
        needleRef.current.style.transform = `rotate(${(-120 + current * 240 + vib).toFixed(2)}deg)`;
      }
      if (digitsRef.current) {
        digitsRef.current.textContent = String(Math.round(speed)).padStart(3, "0");
      }
      if (gearRef.current) {
        gearRef.current.textContent =
          current < 0.04 ? "N" : String(Math.min(6, 1 + Math.floor(current * 6)));
      }
      if (redRef.current) {
        redRef.current.style.opacity = String(Math.max(0, (current - 0.68) / 0.32).toFixed(2));
      }
      if (lightRef.current) {
        lightRef.current.style.opacity = String((0.3 + current * 0.7).toFixed(2));
      }
      if (fuelRef.current) {
        const lit = FUEL_BARS - Math.floor(current * (FUEL_BARS - 1));
        Array.from(fuelRef.current.children).forEach((el, i) => {
          (el as HTMLElement).style.opacity = i < lit ? "1" : "0.18";
        });
        fuelRef.current.classList.toggle("low", lit <= 2);
      }

      frame = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    onScroll();
    frame = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-3d" aria-hidden="true">
      <div className="h3d-stage" ref={stageRef}>
        <div className="h3d-ring r1" />
        <div className="h3d-ring r2" />
        <div className="h3d-meter">
          <div className="h3d-bezel" />
          <div className="h3d-face" />
          <div className="h3d-backlight" ref={lightRef} />
          <div className="h3d-ticks" />
          <div className="h3d-redline" />
          <div className="h3d-redglow" ref={redRef} />
          {NUMS.map((n, i) => {
            const a = -120 + i * 30;
            return (
              <span
                key={n}
                className={`h3d-num${n >= 120 ? " red" : ""}`}
                style={{ transform: `rotate(${a}deg) translateY(-112px)` }}
              >
                <i style={{ transform: `rotate(${-a}deg)` }}>{n}</i>
              </span>
            );
          })}
          <div className="h3d-brand">TVS<b>RACING</b></div>
          <div className="h3d-needle" ref={needleRef}>
            <span className="h3d-tail" />
          </div>
          <div className="h3d-cap" />
          <div className="h3d-lcd">
            <div className="h3d-indis">
              <span className="h3d-indi left">◀</span>
              <span className="h3d-beam">≣</span>
              <span className="h3d-indi right">▶</span>
            </div>
            <div className="h3d-speedrow">
              <span className="h3d-digits" ref={digitsRef}>000</span>
              <small>km/h</small>
              <span className="h3d-gear" ref={gearRef}>N</span>
            </div>
            <div className="h3d-subrow">
              <span className="h3d-odo">ODO 004821 km</span>
              <span className="h3d-fuel" ref={fuelRef}>
                {Array.from({ length: FUEL_BARS }).map((_, i) => (
                  <i key={i} />
                ))}
              </span>
            </div>
          </div>
          <div className="h3d-glass" />
          <div className="h3d-streak" />
        </div>
        <div className="h3d-mount" aria-hidden="true" />
        <div className="h3d-badge">
          <b>SCROLL</b>
          <small>METER HIGH KARO ↓</small>
        </div>
      </div>
    </div>
  );
}
