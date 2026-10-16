"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

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

const RIDE_RECS: Record<string, string> = {
  city: "TVS Jupiter or TVS iQube — smooth, economical and effortless in traffic.",
  family: "TVS Jupiter — comfortable seat, big boot and trusted by families.",
  performance: "TVS Raider — punchy engine and connected features for the thrill.",
  style: "TVS Ntorq 125 — sporty looks and premium styling that stands out.",
};

export default function RidePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState("");
  const startQuizRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <PageHero
        eyebrow="BUILD YOUR RIDE"
        title="WHICH TVS IS YOURS?"
        subtitle="Answer a few quick questions — and let us match you with the perfect bike or scooter."
      />

      <section className="page-section dark">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; STEP 1 — YOUR LIFESTYLE</div>
          <h2 style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 26, margin: 0 }}>
            HOW DO YOU RIDE?
          </h2>
          <p style={{ fontSize: 12, color: "#aeb5bc", margin: "6px 0 0" }}>
            Pick the category closest to your everyday life.
          </p>
        </div>
        <div className="ride-grid">
          {RIDE_CARDS.map((card) => (
            <button
              type="button"
              key={card.filter}
              className="ride-card"
              style={{ ["--bg" as string]: `url('${card.bg}')` }}
              onClick={() => setSelected(card.filter)}
              aria-label={`${card.title} — ${card.text}`}
              aria-pressed={selected === card.filter}
            >
              <span className="card-shade" aria-hidden="true" />
              <span className="card-content">
                <span className="icon" aria-hidden="true">
                  {card.icon}
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </span>
            </button>
          ))}
        </div>
        {selected ? (
          <div
            aria-live="polite"
            style={{
              marginTop: 18,
              background: "#0e141a",
              border: "1px solid #202a32",
              borderRadius: 8,
              padding: 16,
              fontSize: 12,
              color: "#c8cdd1",
              maxWidth: 720,
            }}
          >
            <b style={{ color: "#ef2931" }}>OUR PICK FOR YOU:</b> {RIDE_RECS[selected]}
            <Link className="btn ghost" href="/contact" style={{ marginLeft: 12 }}>
              BOOK TEST RIDE <span>→</span>
            </Link>
          </div>
        ) : null}
      </section>

      <section className="page-section section-light" style={{ background: "#f5f5f3", color: "#111" }}>
        <Reveal>
          <div className="quiz-copy" style={{ width: "100%" }}>
            <div className="eyebrow red">▣ &nbsp; STEP 2 — FUN QUIZ</div>
            <h2 style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 29, margin: 0 }}>
              WHAT&apos;S YOUR
              <br />
              RIDING STYLE?
            </h2>
            <p style={{ fontSize: 11, color: "#555", margin: "10px 0 20px" }}>
              One quick question — pick the answer that sounds most like you.
            </p>
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
            <div className="quiz-box" style={{ position: "static", width: "100%", maxWidth: 460, height: "auto", marginTop: 22, padding: 20 }}>
              <div className="quiz-screen">
                <strong>What&apos;s your riding style?</strong>
                <p>Let&apos;s find your ride!</p>
                <div className="quiz-options">
                  {Object.keys(QUIZ_ANSWERS).map((answer) => (
                    <button
                      type="button"
                      key={answer}
                      onClick={() => setQuizResult(QUIZ_ANSWERS[answer])}
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
          </div>
        </Reveal>
      </section>

      <section className="page-section dark">
        <Reveal>
          <div className="center">
            <p style={{ fontSize: 11, color: "#aeb5bc", maxWidth: 460, margin: "0 auto 16px" }}>
              A match found? Come take it for a spin — test rides are free and
              available all week.
            </p>
            <Link className="btn primary" href="/contact">
              BOOK YOUR TEST RIDE <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
