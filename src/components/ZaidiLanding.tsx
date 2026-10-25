"use client";

import Link from "next/link";
import {
  ADDRESS_LINE,
  CONTACT,
  HOURS_SHORT,
  MAP_EMBED_URL,
  MAPS_URL,
  SOCIAL,
} from "@data/site";
import { useEffect, useRef, useState } from "react";
import EngineWorks from "./EngineWorks";
import Bike360 from "./Bike360";
import BlogTeaser from "./BlogTeaser";
import BookingModal from "./BookingModal";
import CompareTool from "./CompareTool";
import BranchLocator from "./BranchLocator";
import FaqAccordion from "./FaqAccordion";
import GalleryGrid from "./GalleryGrid";
import OffersHub from "./OffersHub";
import RideJourney from "./RideJourney";
import ServiceFloor from "./ServiceFloor";
import FinanceCalculator from "./FinanceCalculator";
import StatsBand from "./StatsBand";
import { BIKES, PRODUCT_IMAGES, vehicleHref } from "@/lib/catalog";
import { AGGREGATE, REVIEWS } from "@/lib/reviews";
import { TOP_FAQS } from "@/lib/faqs";
import { spinFrames } from "@/lib/spinFrames";

/** "Discover Your Ride" rail — category tabs derived from the catalogue. */
const RIDE_KIND_LABEL: Record<string, string> = {
  Motorcycle: "Motorcycles",
  Scooter: "Scooters",
  Electric: "Electric",
  Moped: "Mopeds",
};

const RIDE_KIND_ICON: Record<string, string> = {
  Motorcycle: "",
  Scooter: "",
  Electric: "",
  Moped: "",
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

const QUIZ_OPTIONS = [
  {
    label: "Daily",
    hint: "City commutes, college runs, everyday errands",
    result: "TVS Jupiter could be your perfect daily ride.",
    href: "/scooters/jupiter",
  },
  {
    label: "Sporty",
    hint: "Quick acceleration, sharp handling, weekend fun",
    result: "TVS Ntorq 125 matches your sporty side.",
    href: "/scooters/ntorq-125",
  },
  {
    label: "Family",
    hint: "Comfort, stability and space for two",
    result: "TVS Jupiter 125 fits comfort-focused family rides.",
    href: "/scooters/jupiter-125",
  },
  {
    label: "Premium",
    hint: "Feature-first touring and long-distance comfort",
    result: "Explore the premium TVS range at our showroom.",
    href: "/bikes",
  },
];

/**
 * Home hero — every banner from the TVS Motor homepage hero slider.
 * Each slide ships the desktop (1905×837) and mobile (375×586) artwork so the
 * same carousel looks exactly like tvsmotor.com on every screen.
 */
const HERO_SLIDES: Array<{ desktop: string; mobile: string; alt: string }> = [
  { desktop: "/assets/hero-tvs/01-desktop.webp", mobile: "/assets/hero-tvs/01-mobile.webp", alt: "TVS Radeon" },
  { desktop: "/assets/hero-tvs/02-desktop.webp", mobile: "/assets/hero-tvs/02-mobile.webp", alt: "TVS Apache RTR 310" },
  { desktop: "/assets/hero-tvs/03-desktop.webp", mobile: "/assets/hero-tvs/03-mobile.webp", alt: "TVS Apache RR 310" },
  { desktop: "/assets/hero-tvs/04-desktop.webp", mobile: "/assets/hero-tvs/04-mobile.webp", alt: "TVS Ronin" },
  { desktop: "/assets/hero-tvs/05-desktop.webp", mobile: "/assets/hero-tvs/05-mobile.webp", alt: "TVS Apache RTR 160 4V" },
  { desktop: "/assets/hero-tvs/06-desktop.webp", mobile: "/assets/hero-tvs/06-mobile.webp", alt: "TVS Jupiter" },
  { desktop: "/assets/hero-tvs/07-desktop.webp", mobile: "/assets/hero-tvs/07-mobile.webp", alt: "TVS Jupiter 125" },
  { desktop: "/assets/hero-tvs/08-desktop.webp", mobile: "/assets/hero-tvs/08-mobile.webp", alt: "TVS Apache RTX" },
  { desktop: "/assets/hero-tvs/09-desktop.webp", mobile: "/assets/hero-tvs/09-mobile.webp", alt: "TVS Ronin Agonda edition" },
  { desktop: "/assets/hero-tvs/10-desktop.webp", mobile: "/assets/hero-tvs/10-mobile.webp", alt: "Noise x TVS iQube smartwatch" },
  { desktop: "/assets/hero-tvs/11-desktop.webp", mobile: "/assets/hero-tvs/11-mobile.webp", alt: "TVS Ntorq 150" },
  { desktop: "/assets/hero-tvs/12-desktop.webp", mobile: "/assets/hero-tvs/12-mobile.webp", alt: "TVS Orbiter" },
  { desktop: "/assets/hero-tvs/13-desktop.webp", mobile: "/assets/hero-tvs/13-mobile.webp", alt: "TVS Raider" },
  { desktop: "/assets/hero-tvs/14-desktop.webp", mobile: "/assets/hero-tvs/14-mobile.webp", alt: "TVS iQube electric scooter" },
  { desktop: "/assets/hero-tvs/15-desktop.webp", mobile: "/assets/hero-tvs/15-mobile.webp", alt: "TVS sustainability initiative" },
  { desktop: "/assets/hero-tvs/16-desktop.webp", mobile: "/assets/hero-tvs/16-mobile.webp", alt: "TVS Sport" },
  { desktop: "/assets/hero-tvs/17-desktop.webp", mobile: "/assets/hero-tvs/17-mobile.webp", alt: "TVS XL100" },
  { desktop: "/assets/hero-tvs/18-desktop.webp", mobile: "/assets/hero-tvs/18-mobile.webp", alt: "TVS genuine service" },
];

export default function ZaidiLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [, setMenuOpen] = useState(false);
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

  return (
    <div ref={rootRef}>
      {/* Simple TVS-style image carousel hero */}
      <section
        className="hero-carousel"
        aria-roledescription="carousel"
        aria-label="Featured TVS models"
      >
        <h1 className="hero-sr-title">
          Zaidi TVS — TVS bikes, scooters and genuine service in Chandpur
        </h1>
        <div className="hero-slides">
          {HERO_SLIDES.map((slide, index) => {
            const active = index === heroSlide;
            return (
              <div
                key={slide.desktop}
                className={`hero-slide${active ? " is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${HERO_SLIDES.length}: ${slide.alt}`}
                aria-hidden={!active}
              >
                <picture className="hero-slide-picture">
                  <source media="(min-width: 768px)" srcSet={slide.desktop} />
                  <img
                    className="hero-slide-img"
                    src={slide.mobile}
                    alt={slide.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                </picture>
              </div>
            );
          })}
        </div>

        <div className="hero-carousel-ui">
          <div className="hero-dots" role="tablist" aria-label="Choose slide">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.desktop}
                type="button"
                role="tab"
                aria-selected={index === heroSlide}
                aria-label={`Slide ${index + 1}: ${slide.alt}`}
                className={index === heroSlide ? "is-active" : undefined}
                onClick={() => setHeroSlide(index)}
              />
            ))}
          </div>
          <div className="hero-arrows">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() =>
                setHeroSlide((index) => (index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
            >
              
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => setHeroSlide((index) => (index + 1) % HERO_SLIDES.length)}
            >
              →
            </button>
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
                {model} <b></b>
              </span>
            ))}
          </div>
        </div>


        <section className="ride-picker section-light" id="ride">
          <div className="section-head">
            <div className="eyebrow red"> &nbsp; FIND YOUR PERFECT MATCH</div>
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
            <span className="ride-loc"> &nbsp; Chandpur</span>
            <div className="ride-nav">
              <button type="button" aria-label="Previous vehicles" onClick={() => scrollRideRail(-1)}>
                
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
                    <i aria-hidden="true">{RIDE_KIND_ICON[bike.kind] ?? ""}</i>{" "}
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
                      <dd>Contact showroom</dd>
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
                      CONTACT US <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="price-note">Exact on-road price ke liye Zaidi TVS showroom se contact karein.</p>
        </section>

        <section className="featured dark" id="bikes">
          <div className="featured-copy reveal">
            <p className="eyebrow red">Featured models</p>
            <h2>TVS bikes &amp; scooters</h2>
            <p className="featured-lede">
              Powerful. Stylish. Connected. Find the ride that fits the way you
              move.
            </p>
            <div className="model-title">
              <strong>
                TVS <span>Ntorq</span>
              </strong>
              <small>Ride the next</small>
            </div>
            <ul className="spec-row">
              <li>
                <b>125 cc</b>
                <span>Engine</span>
              </li>
              <li>
                <b>Sporty</b>
                <span>Design</span>
              </li>
              <li>
                <b>Connected</b>
                <span>Tech</span>
              </li>
            </ul>
            <div className="hero-buttons">
              <button type="button" className="btn primary" onClick={openModal}>
                360° view <span aria-hidden="true">→</span>
              </button>
              <Link className="btn ghost" href="/scooters">
                Explore models <span>→</span>
              </Link>
            </div>
            <p className="featured-note">
              Genuine TVS · Easy finance · Free test ride at Chandpur
            </p>
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
            <div className="eyebrow red"> &nbsp; GENUINE TVS SUPPORT</div>
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

        <section className="quiz quizPro section-light" id="scooters">
          <div className="quizPro-copy reveal">
            <p className="eyebrow red">Fun quiz</p>
            <h2>Which TVS are you?</h2>
            <p className="quizPro-lede">
              One quick choice is all it takes. Pick the riding style that feels
              most like your day and we&apos;ll point you to the right TVS.
            </p>
            <ul className="quizPro-points">
              <li>30-second quiz</li>
              <li>No sign-up needed</li>
              <li>Instant model match</li>
            </ul>
            <button
              type="button"
              ref={startQuizRef}
              className="btn primary"
              onClick={() =>
                document
                  .querySelector(".quizPro-options button")
                  ?.setAttribute("tabindex", "0")
              }
            >
              Start the quiz <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="quizPro-card">
            <div className="quizPro-top">
              <span className="quizPro-step">Step 1 of 1</span>
              <span className="quizPro-topic">Riding style</span>
            </div>
            <h3>What&apos;s your riding style?</h3>
            <p className="quizPro-sub">
              Choose the option that describes your everyday ride.
            </p>
            <div className="quizPro-options">
              {QUIZ_OPTIONS.map((option, index) => (
                <button
                  type="button"
                  key={option.label}
                  className={quizResult === option.label ? "is-active" : undefined}
                  aria-pressed={quizResult === option.label}
                  onClick={() => setQuizResult(option.label)}
                >
                  <span className="quizPro-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="quizPro-option-copy">
                    <b>{option.label}</b>
                    <small>{option.hint}</small>
                  </span>
                  <span className="quizPro-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>

            <div className="quizPro-result" aria-live="polite">
              {(() => {
                const match = QUIZ_OPTIONS.find((o) => o.label === quizResult);
                return match ? (
                  <>
                    <span>Your match</span>
                    <strong>{match.result}</strong>
                    <Link href={match.href}>
                      Explore this model <span aria-hidden="true">→</span>
                    </Link>
                  </>
                ) : (
                  <p>Select an option above to see your match.</p>
                );
              })()}
            </div>
          </div>
        </section>

        <StatsBand />

        <ServiceFloor />

        <section className="location locPro" id="about">
          <div className="locPro-copy">
            <p className="eyebrow red">Local to you</p>
            <h2>Chandpur, your ride is here.</h2>
            <p className="locPro-lede">
              Walk in to see the full TVS range, take a free test ride and get
              transparent on-road pricing — all in one visit.
            </p>
            <ul className="locPro-list">
              <li>
                <b>Showroom</b>
                <span>{ADDRESS_LINE}</span>
              </li>
              <li>
                <b>Timings</b>
                <span>{HOURS_SHORT}</span>
              </li>
              <li>
                <b>Call us</b>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
            </ul>
            <div className="locPro-actions">
              <a
                className="btn primary"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <span aria-hidden="true">→</span>
              </a>
              <button
                type="button"
                className="btn ghost"
                onClick={() => openBooking()}
              >
                Book a test ride
              </button>
            </div>
          </div>

          <div className="locPro-map">
            <iframe
              src={MAP_EMBED_URL}
              title="Zaidi TVS Chandpur on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="locPro-mapbar">
              <div>
                <strong>Zaidi TVS Showroom</strong>
                <small>Chandpur, Bijnor</small>
              </div>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                Open in Google Maps <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="testimonials reviewsPro dark">
          <div className="reviewsPro-head">
            <div>
              <p className="eyebrow red">Rider stories</p>
              <h2>What riders say.</h2>
              <p className="reviewsPro-lede">
                Feedback from riders across Chandpur and nearby towns.
              </p>
            </div>
            <div className="reviewsPro-score">
              <b>{AGGREGATE.rating.toFixed(1)}</b>
              <div>
                <span className="reviewsPro-stars" aria-label={`${AGGREGATE.rating} out of 5 stars`}>
                  ★★★★★
                </span>
                <small>{AGGREGATE.count}+ happy riders on Google</small>
              </div>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                Read all on Google <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="reviewsPro-grid">
            {REVIEWS.slice(0, 3).map((review) => (
              <article key={review.name} className="reviewsPro-card">
                <div className="reviewsPro-top">
                  <span className="reviewsPro-avatar" aria-hidden="true">
                    {review.initials}
                  </span>
                  <div>
                    <strong>{review.name}</strong>
                    <small>
                      {review.city} · {review.model}
                    </small>
                  </div>
                  <span className="reviewsPro-google">Google</span>
                </div>
                <div className="reviewsPro-stars" aria-label={`${review.rating} out of 5 stars`}>
                  {"★".repeat(review.rating)}
                  <span>{"★".repeat(5 - review.rating)}</span>
                </div>
                <p>{review.text}</p>
                <small className="reviewsPro-date">{review.date}</small>
              </article>
            ))}
          </div>

          <div className="reviewsPro-foot">
            <a
              className="btn primary"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              See all Google reviews <span aria-hidden="true">→</span>
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
              #ZaidiRiders on Instagram
            </a>
          </div>
        </section>

        <section className="compare comparePro section-light" id="compare">
          <div className="comparePro-head">
            <div>
              <p className="eyebrow red">Smart shopping</p>
              <h2>Compare any ride.</h2>
            </div>
            <p>
              Put any TVS model next to another brand — engine, power, mileage,
              weight and price in one clear table.
            </p>
          </div>
          <CompareTool />

          <div className="comparePro-contact">
            <div>
              <b>Can&apos;t find your exact model?</b>
              <span>
                Tell us the bike or scooter you ride and we&apos;ll share current
                pricing, availability and exchange value.
              </span>
            </div>
            <div className="comparePro-contact-actions">
              <Link className="btn primary" href="/contact">
                Contact us <span aria-hidden="true">→</span>
              </Link>
              <a className="btn ghost" href={CONTACT.phoneHref}>
                Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ---- New production sections: alternating light / dark ---- */}

        <section className="dark home-new" id="offers">
          <OffersHub limit={3} />
        </section>

        <section className="dark home-new" id="gallery">
          <GalleryGrid limit={8} />
        </section>

        <section className="section-light home-new" id="blog">
          <BlogTeaser limit={3} />
        </section>

        <section className="section-light home-new faqPro" id="faq">
          <div className="faqPro-copy">
            <p className="eyebrow red">Good to know</p>
            <h2>Questions, answered.</h2>
            <p className="faqPro-lede">
              Buying, finance, service and electric — the questions riders ask us
              most, in plain language.
            </p>

            <ul className="faqPro-points">
              <li>
                <b>Buying &amp; pricing</b>
                <span>On-road price, variants and test rides</span>
              </li>
              <li>
                <b>Finance &amp; exchange</b>
                <span>Loans, insurance and old-vehicle exchange</span>
              </li>
              <li>
                <b>Service &amp; electric</b>
                <span>Genuine parts, pick-up and iQube care</span>
              </li>
            </ul>

            <div className="faqPro-help">
              <span>Still have a question?</span>
              <div>
                <a href={CONTACT.phoneHref}>Call {CONTACT.phone}</a>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>

          <div className="faqPro-panel">
            <FaqAccordion items={TOP_FAQS} defaultOpen={0} />
          </div>
        </section>

        <section className="section-light home-new" id="visit">
          <div className="section-head">
            <div className="eyebrow red"> &nbsp; VISIT &amp; TIMINGS</div>
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
              <div className="eyebrow red"> &nbsp; SERVICE &amp; CARE</div>
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
              <span> Periodic Service</span>
              <span> Genuine Parts</span>
              <span> Insurance Renewal</span>
              <span> Vehicle Exchange</span>
            </div>
          </div>
        </section>

        <section className="ctaPro" id="test-ride">
          <div className="ctaPro-inner">
            <div className="ctaPro-copy">
              <p className="eyebrow red">Ready to ride?</p>
              <h2>
                Your next ride <span>starts here.</span>
              </h2>
              <p>
                Visit the Zaidi TVS showroom in Chandpur, take a free test ride
                and get a clear on-road price before you decide.
              </p>
              <ul className="ctaPro-points">
                <li>Free test rides on popular models</li>
                <li>Finance and exchange support in-house</li>
                <li>Genuine TVS service after purchase</li>
              </ul>
            </div>

            <div className="ctaPro-card">
              <span className="ctaPro-tag">Book a visit</span>
              <h3>Choose your ride, we&apos;ll handle the rest.</h3>
              <p>
                Tell us which TVS you want to ride. We&apos;ll keep it ready with
                a valid licence and a few minutes to spare.
              </p>
              <div className="ctaPro-actions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => openBooking()}
                >
                  Book a test ride <span aria-hidden="true">→</span>
                </button>
                <a className="btn ghost" href={CONTACT.phoneHref}>
                  Call {CONTACT.phone}
                </a>
              </div>
              <small className="ctaPro-hours">
                Open {HOURS_SHORT}
              </small>
            </div>
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