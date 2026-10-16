import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Bike360 from "@/components/Bike360";
import { SCOOTERS } from "@/lib/catalog";
import { spinFrames } from "@/lib/spinFrames";

export const metadata: Metadata = {
  title: "Our Scooters",
  description:
    "Explore the TVS scooter line-up at Zaidi TVS, Chandpur — TVS Jupiter, Jupiter 125, Ntorq 125 & 150, Zest 110, plus the iQube, TVS X and Orbiter electrics with specifications and free test rides.",
};

export default function ScootersPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR SCOOTERS"
        title="SCOOTERS THAT KEEP UP."
        subtitle="City-ready scooters with comfort, style and efficiency — petrol and electric, all under one roof."
      />

      <section className="page-section dark">
        <div className="banner-strip" style={{ ["--banner-bg" as string]: "url('/assets/style-scooter.jpg')", minHeight: 240 }}>
          <div>
            <div className="eyebrow red">▣ &nbsp; RIDE THE CITY</div>
            <h2>SCORE ON EVERY STREET.</h2>
            <p>Petrol &amp; electric · exchange &amp; EMI options available</p>
          </div>
        </div>

        <Reveal>
          <div className="model360-wrap">
            <div className="eyebrow red" style={{ textAlign: "center" }}>▣ &nbsp; REAL 360° · DRAG TO ROTATE</div>
            <Bike360 frames={spinFrames("ntorq")} alt="TVS Ntorq 125 — 360° view" />
            <p className="model360-tag">DRAG · TVS NTORQ 125</p>
          </div>
        </Reveal>

        <div className="section-head" style={{ marginTop: 70 }}>
          <div className="eyebrow red">▣ &nbsp; THE LINE-UP</div>
          <h2 style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 30, margin: 0 }}>
            {SCOOTERS.length} TVS SCOOTERS
          </h2>
        </div>

        <div className="bike-catalog">
          {SCOOTERS.map((scooter) => (
            <Reveal key={scooter.slug}>
              <article className="bike-item">
                <Link href={`/scooters/${scooter.slug}`} aria-label={`View ${scooter.name} details`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={scooter.image} alt={scooter.name} loading="lazy" />
                </Link>
                <div>
                  <div className="eyebrow red">
                    ▣ &nbsp; {scooter.tagline}
                  </div>
                  <h3>
                    <Link href={`/scooters/${scooter.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {scooter.name}
                    </Link>
                  </h3>
                  <div className="spec-row">
                    <span>◉ {scooter.engine}</span>
                    <span>✦ {scooter.mileage}</span>
                    <span>⌁ {scooter.weight}</span>
                  </div>
                  <p>{scooter.desc}</p>
                  <div className="hero-buttons">
                    <Link className="btn primary" href={`/scooters/${scooter.slug}`}>
                      FULL DETAILS <span>→</span>
                    </Link>
                    <Link className="btn ghost" href="/contact">
                      BOOK TEST RIDE <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="center" style={{ marginTop: 45 }}>
            <p style={{ fontSize: 11, color: "#aeb5bc", maxWidth: 460, margin: "0 auto 16px" }}>
              Exchange your old scooter and get the best value on your new TVS.
              Ask us about exchange and EMI options.
            </p>
            <Link className="btn primary" href="/contact">
              EXPLORE EXCHANGE OFFERS <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
