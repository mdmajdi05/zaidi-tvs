import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Bikes",
  description:
    "Explore TVS bikes at Zaidi TVS, Chandpur — TVS Raider, Ntorq 125, Jupiter and more with specifications and test rides.",
};

const BIKES: Array<{
  name: string;
  tagline: string;
  image: string;
  engine: string;
  mileage: string;
  weight: string;
  desc: string;
}> = [
  {
    name: "TVS Raider",
    tagline: "PERFORMANCE BIKE",
    image: "/assets/performance-bike.jpg",
    engine: "124.8 CC",
    mileage: "Up to 56 km/l*",
    weight: "123 kg*",
    desc: "Aggressive styling, punchy engine and connected tech — built for riders who want thrill on every ride.",
  },
  {
    name: "TVS Ntorq 125",
    tagline: "SPORTY SCOOTER",
    image: "/assets/featured-bike.jpg",
    engine: "124.8 CC",
    mileage: "Up to 40 km/l*",
    weight: "116 kg*",
    desc: "India's smartest sporty scooter with race-tuned engine, LED headlamps and TVS SmartXonnect.",
  },
  {
    name: "TVS Jupiter",
    tagline: "FAMILY SCOOTER",
    image: "/assets/family-rider.jpg",
    engine: "113.3 CC",
    mileage: "Up to 50 km/l*",
    weight: "109 kg*",
    desc: "Comfortable, practical and economical — the perfect everyday companion for the whole family.",
  },
];

export default function BikesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR BIKES"
        title="FIND YOUR RIDE."
        subtitle="From daily commuters to performance machines — explore the TVS line-up available at our showroom."
      />

      <section className="page-section dark">
        <div className="banner-strip" style={{ ["--banner-bg" as string]: "url('/assets/city-rider.jpg')", minHeight: 240 }}>
          <div>
            <div className="eyebrow red">▣ &nbsp; RIDE THE RANGE</div>
            <h2>FROM COMMUTERS TO RACERS.</h2>
            <p>Free test rides all week · finance &amp; exchange available</p>
          </div>
        </div>

        {BIKES.map((bike) => (
          <Reveal key={bike.name}>
            <article className="bike-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bike.image} alt={bike.name} />
              <div>
                <div className="eyebrow red">▣ &nbsp; {bike.tagline}</div>
                <h3>{bike.name}</h3>
                <div className="spec-row">
                  <span>◉ {bike.engine}</span>
                  <span>✦ {bike.mileage}</span>
                  <span>⌁ {bike.weight}</span>
                </div>
                <p>{bike.desc}</p>
                <div className="hero-buttons">
                  <Link className="btn primary" href="/contact">
                    BOOK TEST RIDE <span>→</span>
                  </Link>
                  <Link className="btn ghost" href="/compare">
                    COMPARE <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal>
          <div className="center" style={{ marginTop: 45 }}>
            <p style={{ fontSize: 11, color: "#aeb5bc", maxWidth: 460, margin: "0 auto 16px" }}>
              Want the full range — including TVS Apache, Ronin and iQube? Visit
              the showroom or message us on WhatsApp.
            </p>
            <a
              className="btn primary"
              href="https://wa.me/919009010050"
              target="_blank"
              rel="noopener noreferrer"
            >
              ASK ON WHATSAPP <span>→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}