"use client";

import Link from "next/link";
import { ADDRESS_LINE, CONTACT, MAPS_URL, SOCIAL } from "@data/site";
import { useEffect, useRef, useState } from "react";
import EngineWorks from "./EngineWorks";
import Hero3D from "./Hero3D";
import Bike360 from "./Bike360";
import BlogTeaser from "./BlogTeaser";
import BookingModal from "./BookingModal";
import BranchLocator from "./BranchLocator";
import FaqAccordion from "./FaqAccordion";
import GalleryGrid from "./GalleryGrid";
import OffersHub from "./OffersHub";
import Reviews from "./Reviews";
import RideJourney from "./RideJourney";
import ServiceFloor from "./ServiceFloor";
import FinanceCalculator from "./FinanceCalculator";
import StatsBand from "./StatsBand";
import { BIKES, PRODUCT_IMAGES, vehicleHref } from "@/lib/catalog";
import { TOP_FAQS } from "@/lib/faqs";
import { spinFrames } from "@/lib/spinFrames";

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

/** "Discover Your Ride" rail — category tabs derived from the catalogue. */
const RIDE_KIND_LABEL: Record<string, string> = {
  Motorcycle: "Motorcycles",
  Scooter: "Scooters",
  Electric: "Electric",
  Moped: "Mopeds",
};

const RIDE_KIND_ICON: Record<string, string> = {
  Motorcycle: "▲",
  Scooter: "♧",
  Electric: "⚡",
  Moped: "◆",
};

const RIDE_TABS: Array<{ id: string; label: string }> = Array.from(
  new Set(BIKES.map((b) => b.kind))
).map((kind) => ({
  id: kind,
  label: RIDE_KIND_LABEL[kind] ?? kind,
}));

/** Real TVS 360° turntable frames for the featured scooter showcase. */
const NTORQ_FRAMES = spinFrames("ntorq");

/** Bikes offered in the booking form. */
const BOOKING_BIKES = BIKES.map((b) => ({
  slug: b.slug,
  name: b.name,
  image: b.image,
  engine: b.engine,
  power: b.power,
  price: b.price,
}));

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

/** Home hero — real TVS photography that auto cross-fades. */
/**
 * Hero backgrounds. Only use images WITHOUT baked-in UI text.
 * `hero-bike-clean.jpg` is `hero-bike.jpg` with the stock site's fake header
 * (phone number, WhatsApp icon, "Book Test Ride") cropped off the top — using
 * the raw file made that contact info bleed through behind the real header.
 * `cta-bg.jpg` (banner text + WhatsApp icon) and `quiz-rider.jpg` (baked
 * slogan) were removed for the same reason.
 */
const HERO_SLIDES: Array<{ src: string; alt: string }> = [
  { src: "/assets/hero-bike-clean.jpg", alt: "TVS bike on the open road" },
  { src: "/assets/performance-bike.jpg", alt: "TVS Apache performance motorcycle" },
  { src: "/assets/featured-bike.jpg", alt: "TVS Ntorq 125 scooter" },
  { src: "/assets/family-rider.jpg", alt: "TVS scooter family ride" },
  { src: "/assets/city-rider.jpg", alt: "TVS commuter in the city" },
  { src: "/assets/style-scooter.jpg", alt: "TVS style scooter" },
];

export default function ZaidiLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modelA, setModelA] = useState<ModelKey>("ntorq");
  const [modelB, setModelB] = useState<ModelKey>("jupiter");
  const [quizResult, setQuizResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSlug, setBookingSlug] = useState<string | null>(null);
  const [rideTab, setRideTab] = useState<string>(RIDE_TABS[0].id);
  const startQuizRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const rideRailRef = useRef<HTMLDivElement>(null);

  const rideCards = BIKES.filter((b) => b.kind === rideTab);
  const scrollRideRail = (dir: number) => {
    const el = rideRailRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 760), behavior: "smooth" });
  };

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

  // Hero background: auto cross-fading slideshow
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setHeroSlide((index) => (index + 1) % HERO_SLIDES.length);
    }, 5200);
    return () => window.clearInterval(id);
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
    setActiveThumb(0);
  };

  const openBooking = (slug?: string | null) => {
    setBookingSlug(slug ?? null);
    setBookingOpen(true);
  };

  // Body scroll lock while modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const a = MODELS[modelA];
  const b = MODELS[modelB];

  return (
    <div ref={rootRef}>
      {/* Mobile-only hero — static, no animation. Desktop hero below is untouched. */}
      <section className="hero-mobile" aria-label="Zaidi TVS">
        <div
          className="hero-mobile-bg"
          style={{ backgroundImage: "url('/assets/hero-bike-clean.jpg')" }}
          aria-hidden="true"
        />
        <div className="hero-mobile-shade" aria-hidden="true" />
        <div className="hero-mobile-inner">
          <div className="eyebrow">▣ &nbsp; WELCOME TO ZAIDI TVS</div>
          <h1>
            YOUR <em>RIDE.</em>
            <br />
            YOUR <strong>STYLE.</strong>
          </h1>
          <p>Discover the latest TVS bikes &amp; scooters at Zaidi TVS.</p>
          <div className="hero-mobile-cta">
            <Link className="btn primary" href="/bikes">
              EXPLORE BIKES <span>→</span>
            </Link>
            <Link className="btn ghost" href="/scooters">
              EXPLORE SCOOTERS <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="hero">
        <div className="hero-pin">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.src}
              className={`hero-image${index === heroSlide ? " active" : ""}`}
              style={{ backgroundImage: `url('${slide.src}')` }}
              aria-hidden="true"
            />
          ))}
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-decor" aria-hidden="true">
            <div className="grid-overlay" />
            <span className="orb orb-1" />
            <span className="orb orb-2" />
            <Hero3D />
          </div>
          {/* No `reveal` here: the hero is above the fold, so it must never
              depend on JS/IntersectionObserver to become visible. */}
          <div className="hero-copy">
            <div className="eyebrow">▣ &nbsp; WELCOME TO ZAIDI TVS</div>
            <h1>
              YOUR <em>RIDE.</em>
              <br />
              YOUR <strong>STYLE.</strong>
            </h1>
            <p>
              Discover the latest TVS bikes &amp; scooters{" "}
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
              <b className="active">{String(heroSlide + 1).padStart(2, "0")}</b>
              <span />
              <b>{String(HERO_SLIDES.length).padStart(2, "0")}</b>
              <i className="slide-bar">
                <em style={{ width: `${((heroSlide + 1) / HERO_SLIDES.length) * 100}%` }} />
              </i>
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
            <h2>DISCOVER YOUR RIDE</h2>
            <p>Every journey is different. What&apos;s yours?</p>
          </div>

          <div className="ride-bar">
            <div className="ride-tabs" role="tablist" aria-label="Filter vehicles">
              {RIDE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={rideTab === tab.id}
                  className={rideTab === tab.id ? "is-active" : undefined}
                  onClick={() => setRideTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="ride-loc">⌖ &nbsp; Chandpur</span>
            <div className="ride-nav">
              <button type="button" aria-label="Previous vehicles" onClick={() => scrollRideRail(-1)}>
                ←
              </button>
              <button type="button" aria-label="Next vehicles" onClick={() => scrollRideRail(1)}>
                →
              </button>
            </div>
          </div>

          <div className="ride-rail" ref={rideRailRef}>
            {rideCards.map((bike) => (
              <article className="pick-card ride-tile" key={bike.slug} aria-label={bike.name}>
                <div className="pick-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PRODUCT_IMAGES[bike.slug] ?? bike.image} alt={bike.name} loading="lazy" />
                </div>
                <div className="pick-card-body">
                  <span className="pick-card-cat">
                    <i aria-hidden="true">{RIDE_KIND_ICON[bike.kind] ?? "◆"}</i>{" "}
                    {RIDE_KIND_LABEL[bike.kind] ?? bike.kind}
                  </span>
                  <h3>{bike.name}</h3>
                  <dl className="pick-specs">
                    <div>
                      <dt>Engine Capacity</dt>
                      <dd>{bike.engine}</dd>
                    </div>
                    <div>
                      <dt>Max Power</dt>
                      <dd>{bike.power}</dd>
                    </div>
                    <div>
                      <dt>Kerb Weight</dt>
                      <dd>{bike.weight}</dd>
                    </div>
                    <div className="is-price">
                      <dt>Price</dt>
                      <dd>{bike.price ?? "Contact showroom"}</dd>
                    </div>
                  </dl>
                  <div className="pick-card-actions">
                    <Link className="btn primary" href={vehicleHref(bike)}>
                      DETAILS <span>→</span>
                    </Link>
                    <button
                      type="button"
                      className="pick-text-btn"
                      onClick={() => openBooking(bike.slug)}
                    >
                      BOOK RIDE <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="price-note">*Indicative ex-showroom price. Exact on-road price ke liye Zaidi TVS showroom se contact karein.</p>
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
            <Bike360 frames={NTORQ_FRAMES} alt="TVS Ntorq 125 — 360° view" />
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
          <a className="btn primary" href={CONTACT.phoneHref}>
            ENQUIRE NOW <span>→</span>
          </a>
        </section>

        <FinanceCalculator />

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
            <p>⌖ {ADDRESS_LINE}</p>
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
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
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

        {/* ---- New production sections: alternating light / dark ---- */}

        <section className="dark home-new" id="offers">
          <OffersHub limit={3} />
        </section>

        <section className="section-light home-new" id="reviews">
          <Reviews limit={6} />
        </section>

        <section className="dark home-new" id="gallery">
          <GalleryGrid limit={8} />
        </section>

        <section className="section-light home-new" id="blog">
          <BlogTeaser limit={3} />
        </section>

        <section className="dark home-new" id="faq">
          <div className="section-head">
            <div className="eyebrow red">▣ &nbsp; GOOD TO KNOW</div>
            <h2
              style={{
                fontFamily: "Oswald, Arial, sans-serif",
                fontStyle: "italic",
                fontSize: 30,
                margin: 0,
              }}
            >
              QUESTIONS, ANSWERED.
            </h2>
            <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
              Buying, finance, service and electric — the questions riders ask us most.
            </p>
          </div>
          <FaqAccordion items={TOP_FAQS} defaultOpen={0} />
        </section>

        <section className="section-light home-new" id="visit">
          <div className="section-head">
            <div className="eyebrow red">▣ &nbsp; VISIT &amp; TIMINGS</div>
            <h2
              style={{
                fontFamily: "Oswald, Arial, sans-serif",
                fontStyle: "italic",
                fontSize: 30,
                margin: 0,
              }}
            >
              FIND US IN CHANDPUR.
            </h2>
            <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
              Showroom, service centre and parts counter — with doorstep pickup and drop.
            </p>
          </div>
          <BranchLocator compact />
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
              <div className="hero-buttons" style={{ marginTop: 18 }}>
                <Link className="btn primary" href="/service">
                  BOOK A SERVICE SLOT <span>→</span>
                </Link>
                <Link className="btn ghost" href="/branches">
                  TIMINGS &amp; LOCATION <span>→</span>
                </Link>
              </div>
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
          <Bike360 frames={NTORQ_FRAMES} alt="TVS Ntorq 150 — 360° view" autoSpin={false} />
          <div>
            <div className="eyebrow red">INTERACTIVE SHOWCASE</div>
            <h2 id="modalTitle">TVS NTORQ 125</h2>
            <p>
              Drag left or right to spin the scooter through a real 360°
              turntable shot — every angle captured straight from TVS.
            </p>
            <div className="hero-buttons" style={{ marginTop: 18 }}>
              <button
                type="button"
                className="btn primary"
                onClick={() => {
                  setModalOpen(false);
                  openBooking("ntorq");
                }}
              >
                BOOK RIDE <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        open={bookingOpen}
        bikes={BOOKING_BIKES}
        initialSlug={bookingSlug}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}