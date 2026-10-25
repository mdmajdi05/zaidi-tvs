import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PartsFinder from "@/components/PartsFinder";
import { BIKES, PARTS, vehicleHref } from "@/lib/catalog";
import { breadcrumbSchema, createMetadata, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Genuine TVS Parts & Accessories",
  description:
    "Genuine TVS spare parts, accessories, lubricants and safety gear at Zaidi TVS, Chandpur (Uttar Pradesh) — original parts for your TVS bike or scooter, fitted by trained technicians.",
  path: "/parts",
  keywords: [
    "TVS spare parts Chandpur",
    "genuine TVS parts",
    "TVS accessories Chandpur",
    "TVS engine oil",
    "TVS bike parts Uttar Pradesh",
  ],
});

const CATEGORIES = [
  { icon: "", title: "Engine Parts", text: "Pistons, valves, clutch and engine kits — always genuine TVS." },
  { icon: "", title: "Body Panels", text: "Fenders, side panels and fairings in factory colors." },
  { icon: "", title: "Electrics", text: "Batteries, bulbs, wiring harnesses and spark plugs." },
  { icon: "", title: "Brake & Clutch", text: "Discs, brake shoes, cables and lever assemblies." },
  { icon: "", title: "Tyres & Tubes", text: "TVS-approved tyres and tubes for every model." },
  { icon: "", title: "Accessories", text: "Seat covers, luggage, smartphone mounts and more." },
  { icon: "", title: "Safety Gear", text: "Helmets, gloves and protective gear for every rider." },
  { icon: "", title: "Lubricants", text: "TVS genuine engine oils and coolants, fit for your engine." },
];

export default function PartsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Parts & Accessories", url: "/parts" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          CATEGORIES.map((category) => ({
            name: category.title,
            url: "/parts",
            description: category.text,
          })),
        )}
      />
      <PageHero
        eyebrow="PARTS & ACCESSORIES"
        title="GENUINE PARTS. REAL PEACE OF MIND."
        subtitle="Only genuine TVS spare parts and accessories — because your ride deserves nothing less."
      />

      <section className="page-section dark">
        <div className="banner-strip" style={{ ["--banner-bg" as string]: "url('/assets/location-bg.jpg')", minHeight: 240 }}>
          <div>
            <div className="eyebrow red"> &nbsp; PARTS &amp; ACCESSORIES STORE</div>
            <h2>REAL PARTS. REAL FITTING.</h2>
            <p>Ask for a part by model name — we stock it, we fit it.</p>
          </div>
        </div>

        <div className="section-head" style={{ marginTop: 70 }}>
          <div className="eyebrow red"> &nbsp; WHAT WE CARRY</div>
          <h2 style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 26, margin: 0 }}>
            EVERYTHING YOUR RIDE NEEDS
          </h2>
          <p style={{ fontSize: 12, color: "#aeb5bc", margin: "6px 0 0" }}>
            Walk in with your model number and we will find the right part.
          </p>
        </div>
        <div className="parts-cats">
          {CATEGORIES.map((cat) => (
            <Reveal key={cat.title}>
              <div className="page-card">
                <span className="icon" aria-hidden="true" style={{ color: "#ed2931" }}>
                  {cat.icon}
                </span>
                <h3>{cat.title}</h3>
                <p>{cat.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="section-head" style={{ marginTop: 70 }}>
          <div className="eyebrow red"> &nbsp; IN STOCK</div>
          <h2 style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 26, margin: 0 }}>
            POPULAR GENUINE PARTS
          </h2>
          <p style={{ fontSize: 12, color: "#aeb5bc", margin: "6px 0 0" }}>
            A small sample of the fast-moving parts we keep on the shelf.
          </p>
        </div>
        <div className="parts-grid">
          {PARTS.map((part) => (
            <Reveal key={part.name}>
              <div className="part-chip">
                <span className="part-icon" aria-hidden="true">{part.icon}</span>
                <b>{part.name}</b>
                <small>{part.note}</small>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 70 }}>
          <PartsFinder />
        </div>

        <div className="section-head" style={{ marginTop: 70 }}>
          <div className="eyebrow red"> &nbsp; SHOP BY MODEL</div>
          <h2 style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 26, margin: 0 }}>
            FIND PARTS FOR YOUR TVS
          </h2>
        </div>
        <div className="model-chip-wrap">
          {BIKES.map((b) => (
            <Link key={b.slug} className="model-chip" href={vehicleHref(b)}>
              {b.name}
            </Link>
          ))}
        </div>

        <Reveal>
          <div className="parts-strip" style={{ border: "1px solid #161c22", borderRadius: 10, marginTop: 45 }}>
            <div>
              <div className="eyebrow red"> &nbsp; NEED A PART?</div>
              <h2>ORDER IT IN MINUTES</h2>
              <p>
                Send us your model and part name on WhatsApp — we will confirm
                availability and price, and keep it ready for pickup or fitting.
              </p>
            </div>
            <div className="service-pills">
              <span>Genuine Spare Parts</span>
              <span>Accessories</span>
              <span>Safety Gear</span>
              <span>Lubricants</span>
            </div>
            <a
              className="btn primary"
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              ORDER ON WHATSAPP <span>→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
