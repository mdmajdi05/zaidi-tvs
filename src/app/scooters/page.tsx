import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Scooters",
  description:
    "Explore TVS scooters at Zaidi TVS, Chandpur — TVS Jupiter, Ntorq 125 and iQube electric with specifications and test rides.",
};

const SCOOTERS: Array<{
  name: string;
  tagline: string;
  image: string;
  engine: string;
  mileage: string;
  desc: string;
}> = [
  {
    name: "TVS Jupiter",
    tagline: "FAMILY FAVOURITE",
    image: "/assets/family-rider.jpg",
    engine: "113.3 CC",
    mileage: "Up to 50 km/l*",
    desc: "India's best-selling family scooter — comfortable seat, big boot and smooth, refined ride quality.",
  },
  {
    name: "TVS Ntorq 125",
    tagline: "SPORTY & CONNECTED",
    image: "/assets/featured-bike.jpg",
    engine: "124.8 CC",
    mileage: "Up to 40 km/l*",
    desc: "The sporty scooter with race-inspired looks, a punchy engine and smartphone connectivity.",
  },
  {
    name: "TVS iQube (Electric)",
    tagline: "GO ELECTRIC",
    image: "/assets/city-rider.jpg",
    engine: "Electric",
    mileage: "Up to 100+ km/charge*",
    desc: "Silent, smart and stylish — the iQube makes city riding effortless and future-ready.",
  },
];

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

        {SCOOTERS.map((scooter) => (
          <Reveal key={scooter.name}>
            <article className="bike-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={scooter.image} alt={scooter.name} />
              <div>
                <div className="eyebrow red">▣ &nbsp; {scooter.tagline}</div>
                <h3>{scooter.name}</h3>
                <div className="spec-row">
                  <span>◉ {scooter.engine}</span>
                  <span>✦ {scooter.mileage}</span>
                </div>
                <p>{scooter.desc}</p>
                <div className="hero-buttons">
                  <Link className="btn primary" href="/contact">
                    BOOK TEST RIDE <span>→</span>
                  </Link>
                  <a
                    className="btn ghost"
                    href="https://wa.me/919009010050"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GET PRICE <span>→</span>
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

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