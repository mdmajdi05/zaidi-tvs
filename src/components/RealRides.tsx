"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Reel = {
  id: string;
  src: string;
  tag: string;
  kicker: string;
  title: string;
  portrait?: boolean;
};

const REELS: Reel[] = [
  {
    id: "floor",
    src: "/video-1.mp4",
    tag: "REEL 01 / THE DETAIL",
    kicker: "UP CLOSE",
    title: "EVERY BOLT. EVERY BEAT.",
    portrait: true,
  },
  {
    id: "road",
    src: "/WhatsApp%20Video%202026-10-23%20at%2010.32.50%20PM.mp4",
    tag: "REEL 02 / THE MACHINE",
    kicker: "TVS MOTORCYCLES",
    title: "BUILT TO TURN HEADS.",
  },
];

const TICKER = ["REAL RIDES", "REAL CARE", "REAL PEOPLE", "CHANDPUR", "ZAIDI TVS"];

const timecode = (value: number) => {
  const total = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.2v13.6L19 12z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="7" y="5" width="3.6" height="14" rx="1" />
      <rect x="13.4" y="5" width="3.6" height="14" rx="1" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
    </svg>
  );
}

function ReelPlayer({
  reel,
  onExpand,
}: {
  reel: Reel;
  onExpand: (reel: Reel) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(10);

  // Reels stay muted — always.
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = true;
  }, []);

  // Play only while the reel is on screen — keeps two videos from burning CPU.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  };

  const seek = (next: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = next;
    setTime(next);
  };

  const progress = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <figure className={`zReel${reel.portrait ? " isPortrait" : ""}${playing ? " isPlaying" : ""}`}>
      <div className="zReelFrame">
        <video
          ref={videoRef}
          src={reel.src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={`${reel.kicker} — ${reel.title}`}
          onClick={togglePlay}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => {
            const value = event.currentTarget.duration;
            if (Number.isFinite(value) && value > 0) setDuration(value);
          }}
        />
        <span className="zReelGrain" aria-hidden="true" />

        <span className="zReelTop">
          <span className="zReelRec">
            <i aria-hidden="true" /> REC
          </span>
          <span className="zReelTag">{reel.tag}</span>
        </span>

        <button
          type="button"
          className="zReelCenter"
          onClick={togglePlay}
          aria-label={playing ? `Pause ${reel.kicker}` : `Play ${reel.kicker}`}
        >
          <PlayIcon />
        </button>

        <span className="zReelMeta">
          <small>{reel.kicker}</small>
          <h3>{reel.title}</h3>
        </span>

        <div className="zReelCtl">
          <button
            type="button"
            className="zReelBtn"
            onClick={togglePlay}
            aria-label={playing ? `Pause ${reel.kicker}` : `Play ${reel.kicker}`}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <span className="zReelTime">{timecode(time)}</span>
          <input
            className="zReelRange"
            type="range"
            min={0}
            max={duration || 10}
            step={0.05}
            value={Math.min(time, duration || 10)}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label={`Seek ${reel.kicker}`}
            style={{ "--p": `${progress.toFixed(2)}%` } as CSSProperties}
          />
          <span className="zReelTime">{timecode(duration)}</span>
          <button
            type="button"
            className="zReelBtn"
            onClick={() => onExpand(reel)}
            aria-label={`Watch ${reel.kicker} fullscreen`}
          >
            <ExpandIcon />
          </button>
        </div>
      </div>
    </figure>
  );
}

export default function RealRides({ onBook }: { onBook?: () => void }) {
  const [openReel, setOpenReel] = useState<Reel | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!openReel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenReel(null);
    };
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openReel]);

  return (
    <section className="zReels" aria-labelledby="zReelsTitle">
      <div className="zReelsGhost" aria-hidden="true">
        REELS
      </div>

      <div className="zReelsInner">
        <header className="zReelsHead reveal">
          <div>
            <div className="eyebrow red">▣ &nbsp; REAL RIDES. REAL CARE.</div>
            <h2 id="zReelsTitle">
              FROM OUR FLOOR.
              <br />
              <span>TO YOUR STREET.</span>
            </h2>
          </div>
          <p>
            No stock photos, no filters — real TVS machines, real deliveries
            and real roads around Chandpur. Muted by default, from first frame
            to last.
          </p>
        </header>

        <div className="zReelsStage">
          <ReelPlayer reel={REELS[0]} onExpand={setOpenReel} />

          <div className="zReelsAside">
            <ReelPlayer reel={REELS[1]} onExpand={setOpenReel} />

            <div className="zReelsCopy reveal">
              <div className="zReelsCopyTop">
                <span className="zReelsLive">
                  <i aria-hidden="true" /> LIVE FROM THE FLOOR
                </span>
                <span>CHANDPUR</span>
              </div>
              <h3>
                NO FILTER.
                <br />
                <em>JUST RIDERS.</em>
              </h3>
              <div className="zReelsNums">
                <div>
                  <b>12,000+</b>
                  <small>RIDERS</small>
                </div>
                <div>
                  <b>4.8/5</b>
                  <small>RATED</small>
                </div>
                <div>
                  <b>10+</b>
                  <small>YEARS</small>
                </div>
              </div>
              <div className="zReelsCopyFoot">
                <button type="button" className="btn primary" onClick={onBook}>
                  BOOK A TEST RIDE <span>→</span>
                </button>
                <span className="zReelsCopyHint">10 SEC LOOP · MUTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="zReelsTicker" aria-hidden="true">
        <div className="zReelsTickerTrack">
          {[0, 1].map((half) => (
            <div className="zReelsTickerRow" key={half}>
              {TICKER.map((item) => (
                <span key={item}>
                  {item} <b>◆</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {openReel && (
        <div
          className="zReelsModal"
          role="dialog"
          aria-modal="true"
          aria-label={`${openReel.kicker} — ${openReel.title}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenReel(null);
          }}
        >
          <div className={`zReelsModalCard${openReel.portrait ? " isPortrait" : ""}`}>
            <div className="zReelsModalHead">
              <div>
                <small>{openReel.tag}</small>
                <strong>{openReel.title}</strong>
              </div>
              <button
                type="button"
                ref={closeRef}
                className="zReelsClose"
                onClick={() => setOpenReel(null)}
                aria-label="Close video"
              >
                ✕
              </button>
            </div>
            <div className="zReelsModalStage">
              <video
                key={openReel.id}
                src={openReel.src}
                controls
                autoPlay
                loop
                playsInline
                muted
                preload="auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
