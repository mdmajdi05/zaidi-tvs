"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EngineWorks from "./EngineWorks";
import ExplodeBike from "./ExplodeBike";
import Hero3D from "./Hero3D";
import RideJourney from "./RideJourney";
import ServiceFloor from "./ServiceFloor";
import ServicesShowcase from "./ServicesShowcase";
import StatsBand from "./StatsBand";
import WheelCursor from "./WheelCursor";

type ModelKey = "ntorq" | "jupiter" | "raider";

const MODELS: Record<
  ModelKey,
  { name: string; engine: string; type: string; mileage: string; weight: string; price: string }
> = {
  ntorq: {
    name: "TVS Ntorq 125",
    engine: "124.8 cc",
    type: "Sporty Scooter",
    mileage: "Up to 40 km/l*",
    weight: "116 kg*",
    price: "Contact showroom",
  },
  jupiter: {
    name: "TVS Jupiter",
    engine: "113.3 cc",
    type: "Family Scooter",
    mileage: "Up to 50 km/l*",
    weight: "109 kg*",
    price: "Contact showroom",
  },
  raider: {
    name: "TVS Raider",
    engine: "124.8 cc",
    type: "Performance Bike",
    mileage: "Up to 56 km/l*",
    weight: "123 kg*",
    price: "Contact showroom",
  },
};

const COMPARE_ROWS: Array<[string, keyof (typeof MODELS)[ModelKey]]> = [
  ["Engine", "engine"],
  ["Category", "type"],
  ["Mileage", "mileage"],
  ["Kerb Weight", "weight"],
  ["Price", "price"],
];

const RIDE_CARDS = [
  { filter: "city", bg: "/assets/city-rider.jpg", icon: "▥", title: "CITY RIDER", text: "Daily commute" },
  { filter: "family", bg: "/assets/family-rider.jpg", icon: "♧", title: "FAMILY RIDE", text: "Comfort & practicality" },
  { filter: "performance", bg: "/assets/performance-bike.jpg", icon: "ϟ", title: "PERFORMANCE", text: "Power & thrill" },
  { filter: "style", bg: "/assets/style-scooter.jpg", icon: "☆", title: "STYLE", text: "Looks that stand out" },
];

const QUIZ_ANSWERS: Record<string, string> = {
  Daily: "TVS Jupiter is a great place to start.",
  Sporty: "TVS Ntorq 125 could match your sporty side.",
  Family: "TVS Jupiter fits comfort-focused family rides.",
  Premium: "Explore the premium TVS range at our showroom.",
};

const TESTIMONIALS = [
  { initials: "AV", quote: "“Amazing service and a great experience at Zaidi TVS. Highly recommended.”", name: "Aman Verma", tag: "TVS Rider" },
  { initials: "NS", quote: "“The team helped me choose the perfect scooter for my daily commute. Love it!”", name: "Neha Singh", tag: "TVS Jupiter" },
  { initials: "RK", quote: "“Best showroom in Chandpur. Smooth buying process and excellent support.”", name: "Rohit Kumar", tag: "TVS Apache" },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Zaidi%20TVS%20Chandpur";

export default function ZaidiLanding() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modelA, setModelA] = useState<ModelKey>("ntorq");
  const [modelB, setModelB] = useState<ModelKey>("jupiter");
  const [quizResult, setQuizResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dial, setDial] = useState(50);
  const [activeThumb, setActiveThumb] = useState(0);
  const bikeRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; d: number } | null>(null);
  const startQuizRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Reveal on scroll
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("show"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Modal: escape, backdrop click, focus management
  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    closeBtnRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  // Mobile menu close on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openModal = () => {
    setModalOpen(true);
    setDial(50);
    setActiveThumb(0);
  };

  // Body scroll lock while modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const bikeTransform = () => {
    const rot = (dial - 50) * 0.9;
    const scale = 1 + Math.abs(dial - 50) / 600;
    const tx = (activeThumb - 1.5) * 14;
    const ty = (activeThumb - 1.5) * 1.5;
    return `rotateY(${rot}deg) scale(${scale}) translateX(${tx}px) rotate(${ty}deg)`;
  };

  const a = MODELS[modelA];
  const b = MODELS[modelB];

  return (
    <div ref={rootRef}>
      <WheelCursor />
      <section className="hero">
        <div className="hero-pin">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-decor" aria-hidden="true">
            <div className="grid-overlay" />
            <span className="orb orb-1" />
            <span className="orb orb-2" />
            <Hero3D />
          </div>
          <div className="hero-copy reveal">
            <div className="eyebrow">▣ &nbsp; WELCOME TO ZAIDI TVS</div>
            <h1>
              YOUR <em>RIDE.</em>
              <br />
              YOUR <strong>STYLE.</strong>
            </h1>
            <p>
              Discover the latest TVS bikes &amp; scooters
              <br />
              at Zaidi TVS.
            </p>
            <div className="hero-buttons">
              <Link className="btn primary" href="/bikes">
                EXPLORE BIKES <span>→</span>
              </Link>
              <Link className="btn ghost" href="/scooters">
                EXPLORE SCOOTERS <span>→</span>
              </Link>
            </div>
          </div>
          <div className="hero-bottom">
            <div className="slides" aria-hidden="true">
              <b>01</b>
              <span />
              <b>02</b>
              <b>03</b>
            </div>
            <div className="scroll">
              SCROLL
              <br />
              TO EXPLORE <i>↓</i>
            </div>
          </div>
          <div className="tvs-mark">
            TVS <i aria-hidden="true" />
          </div>
        </div>
        </section>

        <div className="strip-marquee" aria-hidden="true">
          <div className="strip-track">
            {[
              "TVS Ntorq 125",
              "TVS Jupiter",
              "TVS Raider",
              "TVS Apache",
              "TVS Ronin",
              "TVS iQube",
              "TVS Scooty",
              "TVS Sport",
            ].concat([
              "TVS Ntorq 125",
              "TVS Jupiter",
              "TVS Raider",
              "TVS Apache",
              "TVS Ronin",
              "TVS iQube",
              "TVS Scooty",
              "TVS Sport",
            ]).map((model, index) => (
              <span key={index}>
                {model} <b>✦</b>
              </span>
            ))}
          </div>
        </div>

        <section className="ride-picker section-light" id="ride">
          <div className="section-head">
            <div className="eyebrow red">▣ &nbsp; FIND YOUR PERFECT MATCH</div>
            <h2>CHOOSE YOUR RIDE</h2>
            <p>Every journey is different. What&apos;s yours?</p>
          </div>
          <div className="ride-grid">
            {RIDE_CARDS.map((card) => (
              <button
                type="button"
                key={card.filter}
                className="ride-card"
                style={{ ["--bg" as string]: `url('${card.bg}')` }}
                onClick={() => router.push("/bikes")}
                aria-label={`${card.title} — ${card.text}`}
              >
                <span className="card-shade" aria-hidden="true" />
                <span className="card-content">
                  <span className="icon" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </span>
                <span className="card-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="featured dark" id="bikes">
          <div className="featured-copy reveal">
            <div className="eyebrow red">▣ &nbsp; FEATURED MODELS</div>
            <h2>TVS BIKES &amp; SCOOTERS</h2>
            <p>Powerful. Stylish. Connected.</p>
            <div className="model-title">
              <strong>
                TVS <span>Ntorq</span>
              </strong>
              <small>RIDE THE NEXT</small>
            </div>
            <div className="spec-row">
              <span>◉ 125 CC</span>
              <span>✦ Sporty</span>
              <span>⌁ Connected</span>
            </div>
            <div className="hero-buttons">
              <button type="button" className="btn primary" onClick={openModal}>
                360° VIEW <span>↻</span>
              </button>
              <Link className="btn ghost" href="/compare">
                EXPLORE MODEL <span>→</span>
              </Link>
            </div>
          </div>
          <div className="bike-stage">
            <div ref={bikeRef} className="bike-tilt" style={{ transform: bikeTransform() }}>
              <ExplodeBike />
            </div>
            <div className="stage-glow" aria-hidden="true" />
          </div>
          <div className="model-thumbs">
            {[0, 1, 2, 3].map((thumb) => (
              <button
                type="button"
                key={thumb}
                className={`thumb${activeThumb === thumb ? " active" : ""}`}
                aria-label={`View ${thumb + 1}`}
                onClick={() => setActiveThumb(thumb)}
              />
            ))}
          </div>
          <div className="model-logo">
            NTORQ <small>125</small>
          </div>
        </section>

        <EngineWorks />

        <section className="parts-strip dark" id="parts">
          <div>
            <div className="eyebrow red">▣ &nbsp; GENUINE TVS SUPPORT</div>
            <h2>PARTS, ACCESSORIES &amp; CARE</h2>
            <p>
              Genuine TVS spare parts, accessories and dependable workshop
              support for your everyday ride.
            </p>
          </div>
          <div className="service-pills">
            <span>Genuine Spare Parts</span>
            <span>Accessories</span>
            <span>Repair &amp; Maintenance</span>
            <span>Safety Gear</span>
          </div>
          <a className="btn primary" href="tel:+919009010050">
            ENQUIRE NOW <span>→</span>
          </a>
        </section>

        <ServicesShowcase />

        <section className="quiz section-light" id="scooters">
          <div className="quiz-copy reveal">
            <div className="eyebrow red">▣ &nbsp; FUN QUIZ</div>
            <h2>
              WHICH TVS
              <br />
              ARE YOU?
            </h2>
            <p>Answer a few quick questions and find your perfect ride.</p>
            <button
              type="button"
              ref={startQuizRef}
              className="btn primary"
              onClick={() =>
                document
                  .querySelector(".quiz-options button")
                  ?.setAttribute("tabindex", "0")
              }
            >
              LET&apos;S START <span>→</span>
            </button>
          </div>
          <div className="quiz-box">
            <div className="quiz-screen" id="quizScreen">
              <strong>What&apos;s your riding style?</strong>
              <p>Let&apos;s find your ride!</p>
              <div className="quiz-options">
                {Object.keys(QUIZ_ANSWERS).map((answer) => (
                  <button
                    type="button"
                    key={answer}
                    data-answer={answer}
                    onClick={(event) =>
                      setQuizResult(
                        QUIZ_ANSWERS[event.currentTarget.dataset.answer ?? ""] ?? ""
                      )
                    }
                  >
                    {answer === "Daily" || answer === "Family" ? "♧ " : answer === "Sporty" ? "ϟ " : "☆ "}
                    {answer}
                  </button>
                ))}
              </div>
              <div className="quiz-result" aria-live="polite">
                {quizResult}
              </div>
            </div>
          </div>
          <div className="quiz-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/quiz-rider.jpg" alt="Rider on an open road" />
          </div>
        </section>

        <StatsBand />

        <ServiceFloor />

        <section className="location" id="about">
          <div className="location-bg" aria-hidden="true" />
          <div className="location-overlay" aria-hidden="true" />
          <div className="location-copy">
            <div className="eyebrow">▣ &nbsp; LOCAL TO YOU</div>
            <h2>
              CHANDPUR,
              <br />
              YOUR RIDE IS HERE.
            </h2>
            <p>
              Visit our showroom in Chandpur. Explore our range,
              <br />
              take a test ride and experience the TVS difference.
            </p>
            <a className="btn ghost" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              GET DIRECTIONS <span>→</span>
            </a>
          </div>
          <div className="map-card">
            <div>
              <strong>Zaidi TVS Showroom</strong>
              <small>Chandpur</small>
            </div>
            <p>⌖ Main Road, Chandpur, Uttar Pradesh</p>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              View on Map&nbsp; →
            </a>
            <div className="pin" aria-hidden="true">
              ●
            </div>
          </div>
        </section>

        <section className="testimonials dark">
          <div className="section-head">
            <div className="eyebrow red">▣ &nbsp; REAL RIDES</div>
            <h2>REAL RIDES. REAL PEOPLE.</h2>
            <p>See what our customers have to say.</p>
          </div>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t) => (
              <article key={t.initials}>
                <div className="avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <p>{t.quote}</p>
                <strong>{t.name}</strong>
                <small>{t.tag}</small>
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
              </article>
            ))}
            <div className="instagram-card">
              <b aria-hidden="true">◎</b>
              <strong>#ZaidiRiders</strong>
              <p>
                Join our rider club
                <br />
                and share your story.
              </p>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                Upload Your Ride →
              </a>
            </div>
          </div>
        </section>

        <section className="compare section-light" id="compare">
          <div className="section-head center">
            <div className="eyebrow red">▣ &nbsp; SMART SHOPPING</div>
            <h2>COMPARE TVS MODELS</h2>
            <p>Select models and compare the essentials side by side.</p>
          </div>
          <div className="compare-controls">
            <label className="srOnly" htmlFor="modelA">
              First model
            </label>
            <select
              id="modelA"
              value={modelA}
              onChange={(event) => setModelA(event.target.value as ModelKey)}
            >
              <option value="ntorq">TVS Ntorq 125</option>
              <option value="jupiter">TVS Jupiter</option>
              <option value="raider">TVS Raider</option>
            </select>
            <span>VS</span>
            <label className="srOnly" htmlFor="modelB">
              Second model
            </label>
            <select
              id="modelB"
              value={modelB}
              onChange={(event) => setModelB(event.target.value as ModelKey)}
            >
              <option value="jupiter">TVS Jupiter</option>
              <option value="ntorq">TVS Ntorq 125</option>
              <option value="raider">TVS Raider</option>
            </select>
          </div>
          <div className="compare-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">{a.name}</th>
                  <th scope="col">{b.name}</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(([label, key]) => (
                  <tr key={label}>
                    <td>
                      <b>{label}</b>
                    </td>
                    <td>{a[key]}</td>
                    <td>{b[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <RideJourney />

        <section className="service dark" id="service">
          <div className="service-inner">
            <div>
              <div className="eyebrow red">▣ &nbsp; SERVICE &amp; CARE</div>
              <h2>
                KEEP YOUR RIDE
                <br />
                RUNNING RIGHT.
              </h2>
              <p>
                Workshop support, routine maintenance, genuine parts and repair
                assistance from Zaidi TVS.
              </p>
            </div>
            <div className="service-grid">
              <span>🔧 Periodic Service</span>
              <span>🧩 Genuine Parts</span>
              <span>📄 Insurance Renewal</span>
              <span>🔄 Vehicle Exchange</span>
            </div>
          </div>
        </section>

        <section className="cta" id="test-ride">
          <div className="cta-bg" aria-hidden="true" />
          <div className="cta-overlay" aria-hidden="true" />
          <div className="cta-content">
            <small>READY TO RIDE?</small>
            <h2>
              YOUR NEXT ADVENTURE
              <br />
              STARTS HERE.
            </h2>
            <Link className="btn primary" href="/contact">
              BOOK A TEST RIDE <span>→</span>
            </Link>
          </div>
        </section>

      <div
        className={`modal${modalOpen ? " open" : ""}`}
        id="showcaseModal"
        ref={modalRef}
        aria-hidden={!modalOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="modal-card">
          <button
            type="button"
            className="modal-close"
            ref={closeBtnRef}
            onClick={() => setModalOpen(false)}
            aria-label="Close showcase"
          >
            ×
          </button>
          <div
            className="modal-image"
            onPointerDown={(e) => {
              dragRef.current = { x: e.clientX, d: dial };
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              const s = dragRef.current;
              if (!s) return;
              setDial(Math.max(0, Math.min(100, s.d + (e.clientX - s.x) * 0.25)));
            }}
            onPointerUp={() => (dragRef.current = null)}
            onPointerCancel={() => (dragRef.current = null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/featured-bike.jpg"
              alt="TVS Ntorq showcase"
              style={{ transform: `rotateY(${(dial - 50) * 0.9}deg) scale(${1 + Math.abs(dial - 50) / 600})` }}
            />
          </div>
          <div>
            <div className="eyebrow red">INTERACTIVE SHOWCASE</div>
            <h2 id="modalTitle">TVS NTORQ 125</h2>
            <p>
              Drag the photo or the dial to explore the model. Real photos,
              real angles — full 360° turntable shoot coming to the showroom soon.
            </p>
            <div className="dial">
              <label className="srOnly" htmlFor="dial">
                Rotate model
              </label>
              <input
                type="range"
                id="dial"
                min={0}
                max={100}
                value={dial}
                onChange={(event) => setDial(Number(event.target.value))}
              />
              <span id="dialValue">{dial}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}