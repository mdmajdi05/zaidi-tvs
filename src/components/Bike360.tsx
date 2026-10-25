"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./Bike360.module.css";

type Bike360Props = {
  /** Ordered list of frame image URLs/paths (one per rotation step). */
  frames: string[];
  /** Alt text applied to the active frame. */
  alt: string;
  /** Slow auto-rotate while the viewer is idle. Defaults to true. */
  autoSpin?: boolean;
  /** Frame shown on first render. Defaults to 0. */
  initialFrame?: number;
  /** Extra class name applied to the root element. */
  className?: string;
};

/**
 * Target time for one full idle revolution (ms). A constant duration keeps the
 * spin speed identical on every model, no matter how many frames its turntable
 * has (9 → 36 frames), and keeps it slow and easy to read.
 */
const AUTO_SPIN_TURN_MS = 8000;
/** Clamp for the per-frame interval so low/high frame sets stay smooth. */
const MIN_SPIN_INTERVAL = 80;
const MAX_SPIN_INTERVAL = 700;
/** ms to wait after the last interaction before auto-spin resumes. */
const RESUME_DELAY = 1600;

export default function Bike360({
  frames,
  alt,
  autoSpin = true,
  initialFrame = 0,
  className,
}: Bike360Props) {
  const count = frames.length;

  const [frame, setFrame] = useState(() =>
    count > 0 ? ((initialFrame % count) + count) % count : 0
  );
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Keep the active index valid when the frame list changes. Adjusting state
  // during render avoids a setState-in-effect cascade.
  const [prevCount, setPrevCount] = useState(count);
  if (count !== prevCount) {
    setPrevCount(count);
    if (count > 0) setFrame((f) => ((f % count) + count) % count);
  }

  const dragging = useRef(false);
  const startX = useRef(0);
  const startFrame = useRef(0);
  const resumeTimer = useRef<number | null>(null);

  // Respect the user's prefers-reduced-motion setting.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    resumeTimer.current = window.setTimeout(
      () => setPaused(false),
      RESUME_DELAY
    );
  }, [clearResumeTimer]);

  const pauseNow = useCallback(() => {
    clearResumeTimer();
    setPaused(true);
  }, [clearResumeTimer]);

  // Clear any pending timer on unmount.
  useEffect(() => clearResumeTimer, [clearResumeTimer]);

  // Idle auto-spin — disabled during interaction or reduced motion.
  useEffect(() => {
    if (!autoSpin || reducedMotion || paused || count < 2) return;
    const interval = Math.max(
      MIN_SPIN_INTERVAL,
      Math.min(MAX_SPIN_INTERVAL, Math.round(AUTO_SPIN_TURN_MS / count))
    );
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % count);
    }, interval);
    return () => window.clearInterval(id);
  }, [autoSpin, reducedMotion, paused, count]);

  const step = useCallback(
    (dir: number) => {
      if (count === 0) return;
      setFrame((f) => (((f + dir) % count) + count) % count);
    },
    [count]
  );

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (count === 0) return;
    dragging.current = true;
    startX.current = e.clientX;
    startFrame.current = frame;
    e.currentTarget.setPointerCapture(e.pointerId);
    pauseNow();
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current || count === 0) return;
    const delta = e.clientX - startX.current;
    // A full drag across the viewport = one full turn.
    const stepPx = Math.max(12, window.innerWidth / count);
    const next = startFrame.current + Math.round(delta / stepPx);
    setFrame(((next % count) + count) % count);
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    scheduleResume();
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      pauseNow();
      scheduleResume();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      pauseNow();
      scheduleResume();
      step(1);
    }
  };

  const rootClassName = styles.viewer + (className ? " " + className : "");

  if (count === 0) {
    return (
      <div className={rootClassName} role="group" aria-label={alt}>
        <div className={styles.hint} aria-hidden="true">
          <span className={styles.hintGlyph}></span>
          No 360° frames
        </div>
      </div>
    );
  }

  return (
    <div
      className={rootClassName}
      role="group"
      aria-label={alt}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.glow} aria-hidden="true" />

      {frames.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${src}-${i}`}
          src={src}
          alt={i === frame ? alt : ""}
          className={styles.frame + (i === frame ? " " + styles.frameActive : "")}
          loading={i === frame ? "eager" : "lazy"}
          draggable={false}
          aria-hidden={i === frame ? undefined : true}
        />
      ))}

      <div className={styles.hint} aria-hidden="true">
        <span className={styles.hintGlyph}></span>
        Drag to rotate 360°
      </div>

      <button
        type="button"
        className={styles.navBtn + " " + styles.prev}
        aria-label="Previous frame"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => {
          pauseNow();
          scheduleResume();
          step(-1);
        }}
      >
        ‹
      </button>

      <button
        type="button"
        className={styles.navBtn + " " + styles.next}
        aria-label="Next frame"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => {
          pauseNow();
          scheduleResume();
          step(1);
        }}
      >
        ›
      </button>
    </div>
  );
}
