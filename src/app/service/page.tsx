import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Service & Care",
  description:
    "TVS service and care at Zaidi TVS, Chandpur — periodic service, genuine parts, insurance renewal and vehicle exchange.",
};

const STEPS = [
  { num: "01", title: "Book a Slot", text: "Call or WhatsApp us — we schedule your service at your convenience." },
  { num: "02", title: "Transparent Check", text: "Our technicians inspect your ride and share a clear estimate first." },
  { num: "03", title: "Genuine Service", text: "Factory-trained work with genuine TVS parts and oils." },
  { num: "04", title: "Ride Away Happy", text: "Quality-checked, cleaned and ready — with a service record." },
];

const SERVICES = [
  "🔧 Periodic Service",
  "🧩 Genuine Parts",
  "📄 Insurance Renewal",
  "🔄 Vehicle Exchange",
  "🛞 Tyre & Wheel Care",
  "🔋 Battery & Electrics",
  "🧴 Wash & Polish",
  "🚑 Emergency Support",
];

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICE & CARE"
        title="KEEP YOUR RIDE RUNNING RIGHT."
        subtitle="Professional servicing, honest prices and genuine parts — from scheduled maintenance to major repairs."
      />

      <section className="page-section dark">
        <div className="banner-strip" style={{ ["--banner-bg" as string]: "url('/assets/cta-bg.jpg')", minHeight: 260 }}>
          <div>
            <div className="eyebrow red">▣ &nbsp; OUR WORKSHOP</div>
            <h2>TRUSTED WORKSHOP. HONEST SERVICE.</h2>
            <p>Factory-trained technicians · genuine TVS parts · transparent pricing</p>
          </div>
        </div>

        <div className="section-head" style={{ marginTop: 70 }}>
          <div className="eyebrow red">▣ &nbsp; HOW IT WORKS</div>
          <h2 style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 26, margin: 0 }}>
            SERVICE IN 4 EASY STEPS
          </h2>
          <p style={{ fontSize: 12, color: "#aeb5bc", margin: "6px 0 0" }}>
            Simple, transparent and quick — no surprises.
          </p>
        </div>
        <div className="steps-grid">
          {STEPS.map((step) => (
            <Reveal key={step.num}>
              <div className="page-card" style={{ minHeight: 140 }}>
                <b style={{ fontFamily: "Oswald, Arial, sans-serif", fontStyle: "italic", fontSize: 26, color: "#ed2931" }}>
                  {step.num}
                </b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            style={{
              marginTop: 45,
              background: "#0e141a",
              border: "1px solid #202a32",
              borderRadius: 10,
              padding: 24,
            }}
          >
            <div className="eyebrow red">▣ &nbsp; WHAT WE DO</div>
            <h2
              style={{
                fontFamily: "Oswald, Arial, sans-serif",
                fontStyle: "italic",
                fontSize: 24,
                margin: "4px 0 14px",
              }}
            >
              FULL-SERVICE WORKSHOP
            </h2>
            <div className="service-grid">
              {SERVICES.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="center" style={{ marginTop: 40 }}>
            <p style={{ fontSize: 11, color: "#aeb5bc", maxWidth: 460, margin: "0 auto 16px" }}>
              Book your next service slot today — we will remind you when it is
              due, so you never miss a check.
            </p>
            <a
              className="btn primary"
              href="https://wa.me/919009010050"
              target="_blank"
              rel="noopener noreferrer"
            >
              BOOK SERVICE ON WHATSAPP <span>→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}