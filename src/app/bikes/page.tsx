import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Bike360 from "@/components/Bike360";
import { MOPEDS, MOTORCYCLES, vehicleHref } from "@/lib/catalog";
import { spinFrames } from "@/lib/spinFrames";
import { breadcrumbSchema, createMetadata, itemListSchema } from "@/lib/seo";
import { wa } from "@data/site";

const LINEUP = [...MOTORCYCLES, ...MOPEDS];

export const metadata: Metadata = createMetadata({
  title: "TVS Bikes & Motorcycles",
  description:
    "Explore the full TVS motorcycle line-up at Zaidi TVS, Chandpur — TVS Apache RTR, RR, RTX, Raider, Ronin, Radeon, Sport and Star City+ with specifications, on-road price on request and free test rides across Uttar Pradesh.",
  path: "/bikes",
  keywords: [
    "TVS bikes Chandpur",
    "TVS motorcycles Uttar Pradesh",
    "TVS Apache RTR price Chandpur",
    "TVS Raider 125",
    "TVS Ronin",
    "TVS showroom bikes",
  ],
});

export default function BikesPage() {
  const lineUp = LINEUP;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Our Bikes", url: "/bikes" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          lineUp.map((bike) => ({
            name: bike.name,
            url: vehicleHref(bike),
            description: bike.desc,
            image: bike.image,
          })),
        )}
      />
      <PageHero
        eyebrow="OUR BIKES"
        title="FIND YOUR RIDE."
        subtitle="From daily commuters to race-bred performance machines — explore the TVS motorcycle line-up available at our showroom."
      />

      <section className="page-section dark">
        <div className="banner-strip" style={{ ["--banner-bg" as string]: "url('/assets/city-rider.jpg')", minHeight: 240 }}>
          <div>
            <div className="eyebrow red"> &nbsp; RIDE THE RANGE</div>
            <h2>FROM COMMUTERS TO RACERS.</h2>
            <p>Free test rides all week · finance & exchange available</p>
          </div>
        </div>

        <Reveal>
          <div className="model360-wrap">
            <div className="eyebrow red" style={{ textAlign: "center" }}> &nbsp; REAL 360° · DRAG TO ROTATE</div>
            <Bike360 frames={spinFrames("apache-rtr-310")} alt="TVS Apache RTR 310 — 360° view" />
            <p className="model360-tag">DRAG · TVS APACHE RTR 310</p>
          </div>
        </Reveal>

        <div className="section-head" style={{ marginTop: 70 }}>
          <div className="eyebrow red"> &nbsp; THE LINE-UP</div>
          <h2 style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 30, margin: 0 }}>
            {lineUp.length} TVS MOTORCYCLES &amp; MOPEDS
          </h2>
        </div>

        <div className="bike-catalog">
          {lineUp.map((bike) => (
            <Reveal key={bike.slug}>
              <article className="bike-item">
                <Link href={`/bikes/${bike.slug}`} aria-label={`View ${bike.name} details`}>
                  <img src={bike.image} alt={bike.name} loading="lazy" />
                </Link>
                <div>
                  <div className="eyebrow red">
                     &nbsp; {bike.tagline}
                  </div>
                  <h3>
                    <Link href={`/bikes/${bike.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {bike.name}
                    </Link>
                  </h3>
                  <div className="spec-row">
                    <span> {bike.engine}</span>
                    <span> {bike.mileage}</span>
                    <span> {bike.weight}</span>
                  </div>
                  <p>{bike.desc}</p>
                  <div className="hero-buttons">
                    <Link className="btn primary" href={`/bikes/${bike.slug}`}>
                      FULL DETAILS <span>→</span>
                    </Link>
                    <Link className="btn ghost" href="/compare">
                      COMPARE <span>→</span>
                    </Link>
                    <a
                      className="btn ghost"
                      href={wa(
                        `Hello Zaidi TVS! I'm interested in the ${bike.name} — ${bike.engine}. Please send me pricing, offers and test ride slots.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BOOK TEST RIDE <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="center" style={{ marginTop: 45 }}>
            <p style={{ fontSize: 11, color: "#aeb5bc", maxWidth: 460, margin: "0 auto 16px" }}>
              Looking for a scooter instead? See the TVS Jupiter, Jupiter 125,
              Ntorq 125 &amp; 150, Zest 110 and the electric iQube, TVS X and Orbiter
              on our scooters page.
            </p>
            <Link className="btn primary" href="/scooters">
              EXPLORE SCOOTERS <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}