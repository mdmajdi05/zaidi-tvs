import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { ADDRESS_LINE, STATS } from "@data/site";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "About Zaidi TVS, Chandpur — an authorized TVS dealership in Uttar Pradesh trusted by riders for bikes, scooters, genuine service and support across India-friendly finance options.",
  path: "/about",
  keywords: [
    "about Zaidi TVS",
    "authorized TVS dealership Chandpur",
    "TVS showroom Uttar Pradesh",
    "TVS dealer India",
  ],
});

const VALUES = [
  { icon: "✓", title: "Genuine & Trusted", text: "Authorized TVS dealership with 100% genuine products and transparent pricing." },
  { icon: "⚙", title: "Service First", text: "Trained technicians, factory-grade tools and quick turnaround on every service." },
  { icon: "⌁", title: "Always Connected", text: "Helpful support before, during and after your purchase — one call away." },
  { icon: "★", title: "Rider Community", text: "Test rides, service camps and a growing family of happy Zaidi riders." },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ])}
      />
      <PageHero
        eyebrow="ABOUT ZAIDI TVS"
        title="YOUR RIDE. YOUR STYLE. SINCE DAY ONE."
        subtitle="Zaidi TVS is a family-run, authorized TVS dealership built on one promise — treat every rider like our own."
      />

      <section className="page-section dark">
        <div className="about-stats">
          {STATS.map((stat) => (
            <Reveal key={stat.label}>
              <div className="about-stat">
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="about-story">
            <div className="about-image-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/reference.jpg" alt="Inside the Zaidi TVS showroom" />
              <div className="about-photo-cap">
                <i>●</i> Our showroom — {ADDRESS_LINE}
              </div>
            </div>
            <div>
              <div className="eyebrow red">OUR STORY</div>
              <h2
                style={{
                  fontFamily: "Oswald, Arial, sans-serif",
                  fontStyle: "italic",
                  fontSize: 31,
                  lineHeight: 0.95,
                  margin: "0 0 16px",
                }}
              >
                BUILT IN
                <br />
                CHANDPUR FOR
                <br />
                EVERY RIDER.
              </h2>
              <p style={{ color: "#aeb5bb", fontSize: 14, lineHeight: 1.7, maxWidth: 500 }}>
                What started as a small two-wheeler workshop has grown into one of
                the most trusted TVS showrooms in the region. Over the years we
                have helped thousands of families find the right bike or scooter —
                and kept them running right with honest service and genuine parts.
              </p>
              <p style={{ color: "#aeb5bb", fontSize: 14, lineHeight: 1.7, maxWidth: 500 }}>
                From the sporty TVS Ntorq 125 to the dependable TVS Jupiter and
                the thrilling TVS Raider, our showroom carries the complete TVS
                range. We also handle finance, insurance, exchange and
                accessories under one roof, so buying a TVS is as easy as
                possible.
              </p>
              <p style={{ color: "#c8cdd1", fontSize: 14, lineHeight: 1.7, maxWidth: 500 }}>
                Walk in today for a free test ride, or call us — we would love to
                help you find your perfect ride.
              </p>
              <div className="hero-buttons" style={{ marginTop: 20 }}>
                <Link className="btn primary" href="/contact">
                  GET IN TOUCH <span>→</span>
                </Link>
                <Link className="btn ghost" href="/bikes">
                  VIEW MODELS <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="page-section" style={{ background: "#f5f5f3", color: "#111" }}>
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; WHAT WE STAND FOR</div>
          <h2 style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 26, margin: 0 }}>
            OUR VALUES
          </h2>
          <p style={{ fontSize: 12, color: "#555", margin: "6px 0 0" }}>
            The principles behind every deal and every service at Zaidi TVS.
          </p>
        </div>
        <div className="page-grid">
          {VALUES.map((value) => (
            <Reveal key={value.title}>
              <div className="page-card" style={{ background: "#fff", borderColor: "#e2e2e2", minHeight: 170 }}>
                <span className="icon" aria-hidden="true" style={{ color: "#ed2931" }}>
                  {value.icon}
                </span>
                <h3 style={{ color: "#111" }}>{value.title}</h3>
                <p style={{ color: "#666" }}>{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="center" style={{ marginTop: 40 }}>
            <p style={{ fontSize: 12, color: "#666", maxWidth: 480, margin: "0 auto 16px" }}>
              Visit us on {ADDRESS_LINE} — or reach us on WhatsApp and we
              will get back to you right away.
            </p>
            <Link className="btn primary" href="/contact">
              VISIT OUR SHOWROOM <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}