"use client";

import { useEffect, useRef } from "react";
import BikeSVG from "./BikeSVG";

/**
 * Real-photo bike cursor: an actual TVS photo badge follows the mouse,
 * orbit ring spins faster with movement speed, slight lean into motion.
 * Click fires a smoke + spark burst.
 */
export default function WheelCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const dot = dotRef.current;
    const badge = badgeRef.current;
    const ring = ringRef.current;
    const layer = smokeRef.current;
    if (!dot || !badge || !ring || !layer) return;

    document.body.classList.add("z-cursor-none");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let x = mx;
    let y = my;
    let angle = 0;
    let spin = 3;
    let lastX = mx;
    let lastY = my;
    let targetLean = 0;
    let lean = 0;
    let frame = 0;
    let visible = false;
    let lastPuff = 0;
    let boomTimer = 0;

    const spawnBurst = (cx: number, cy: number, big: boolean) => {
      const wrap = document.createElement("div");
      wrap.className = "z-smoke";
      wrap.style.left = `${cx}px`;
      wrap.style.top = `${cy}px`;
      const n = big ? 5 : 2;
      for (let i = 0; i < n; i++) {
        const puff = document.createElement("span");
        puff.className = "z-puff";
        const a = Math.PI * 2 * Math.random();
        const d = (big ? 22 : 12) + Math.random() * (big ? 26 : 12);
        puff.style.setProperty("--px", `${Math.cos(a) * d}px`);
        puff.style.setProperty("--py", `${Math.sin(a) * d - 8}px`);
        puff.style.setProperty("--pd", `${i * 0.03}s`);
        wrap.appendChild(puff);
      }
      if (big) {
        for (let i = 0; i < 7; i++) {
          const s = document.createElement("span");
          s.className = "z-spark";
          const a = (Math.PI * 2 * i) / 7 + Math.random() * 0.5;
          const d = 24 + Math.random() * 30;
          s.style.setProperty("--sx", `${Math.cos(a) * d}px`);
          s.style.setProperty("--sy", `${Math.sin(a) * d - 6}px`);
          wrap.appendChild(s);
        }
        // red paint shreds — bike ke tukde bikarte hain
        for (let i = 0; i < 5; i++) {
          const sh = document.createElement("span");
          sh.className = "z-shred";
          const a = (Math.PI * 2 * i) / 5 + Math.random() * 0.8;
          const d = 16 + Math.random() * 26;
          sh.style.setProperty("--sx", `${Math.cos(a) * d}px`);
          sh.style.setProperty("--sy", `${Math.sin(a) * d - 8}px`);
          sh.style.setProperty("--sr", `${(Math.random() * 2 - 1) * 320}deg`);
          wrap.appendChild(sh);
        }
      }
      layer.appendChild(wrap);
      window.setTimeout(() => wrap.remove(), 950);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const speed = Math.min(30, Math.hypot(dx, dy));
      spin += speed * 1.1;
      targetLean = Math.max(-14, Math.min(14, dx * 0.7));
      const now = performance.now();
      if (speed > 9 && now - lastPuff > 90) {
        lastPuff = now;
        spawnBurst(e.clientX - 20, e.clientY + 14, false);
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    const onDown = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY, true);
      // impact flash
      const flash = document.createElement("div");
      flash.className = "z-flash";
      flash.style.left = `${e.clientX}px`;
      flash.style.top = `${e.clientY}px`;
      layer.appendChild(flash);
      window.setTimeout(() => flash.remove(), 340);
      spin += 40;
      dot.classList.add("z-kick");
      window.setTimeout(() => dot.classList.remove("z-kick"), 260);
      // patak diya! parts bikharenge, phir wapas judenge
      dot.classList.add("boom");
      window.clearTimeout(boomTimer);
      boomTimer = window.setTimeout(() => dot.classList.remove("boom"), 1200);
    };

    const render = () => {
      x += (mx - x) * 0.22;
      y += (my - y) * 0.22;
      spin += (3 - spin) * 0.045;
      angle = (angle + spin) % 360;
      lean += (targetLean - lean) * 0.14;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      badge.style.transform = `rotate(${(lean * 0.5).toFixed(2)}deg)`;
      ring.style.transform = `rotate(${angle.toFixed(1)}deg)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("z-cursor-none");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.clearTimeout(boomTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={smokeRef} className="z-cursor-layer" aria-hidden="true" />
      <div ref={dotRef} className="z-cursor" aria-hidden="true">
        <div ref={ringRef} className="z-cursor-ring" />
        <div ref={badgeRef} className="z-bike">
          <BikeSVG />
        </div>
      </div>
    </>
  );
}
