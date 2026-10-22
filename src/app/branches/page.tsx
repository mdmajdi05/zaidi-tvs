import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BranchLocator from "@/components/BranchLocator";
import { breadcrumbSchema, createMetadata, localBusinessSchema } from "@/lib/seo";
import { ADDRESS_LINE, ADDRESS_SHORT, CONTACT, MAPS_URL, wa } from "@data/site";
import { DOORSTEP } from "@/lib/branches";

export const metadata: Metadata = createMetadata({
  title: "Showroom, Timings & Location",
  description:
    "Visit Zaidi TVS in Chandpur, Uttar Pradesh — main showroom, service centre and parts & accessories counter, with timings, directions and doorstep pickup & drop.",
  path: "/branches",
  keywords: [
    "Zaidi TVS address Chandpur",
    "TVS showroom timings Chandpur",
    "TVS showroom near me Uttar Pradesh",
    "TVS showroom location",
  ],
});

const WA_LINK = wa(
  "Hi Zaidi TVS, I would like to know more about your showroom and timings."
);

const QUICK_ACTIONS = [
  {
    icon: "⌕",
    title: "Call us",
    text: "Talk to our team during showroom hours for models, prices and bookings.",
    href: CONTACT.phoneHref,
    cta: `CALL ${CONTACT.phone}`,
  },
  {
    icon: "◉",
    title: "WhatsApp",
    text: "Send us a message any time — we usually reply within minutes.",
    href: WA_LINK,
    cta: "CHAT ON WHATSAPP",
  },
  {
    icon: "⌖",
    title: "Get directions",
    text: `Find us on ${ADDRESS_LINE}.`,
    href: MAPS_URL,
    cta: "OPEN IN MAPS",
  },
];

export default function BranchesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Showroom & Timings", url: "/branches" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={localBusinessSchema()}
      />
      <PageHero
        eyebrow="SHOWROOM & TIMINGS"
        title="FIND US IN CHANDPUR."
        subtitle={`One dealership, three counters — sales, service and genuine parts — all in ${ADDRESS_SHORT}.`}
      />

      <section className="page-section dark">
        <Reveal>
          <BranchLocator />
        </Reveal>
      </section>

      <section className="page-section section-light">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; QUICK ACTIONS</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            REACH US YOUR WAY
          </h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            Call, message or drop by — whichever suits you best.
          </p>
        </div>

        <div className="page-grid">
          {QUICK_ACTIONS.map((action) => (
            <Reveal key={action.title}>
              <div className="page-card">
                <span className="icon" aria-hidden="true" style={{ color: "var(--red)" }}>
                  {action.icon}
                </span>
                <h3>{action.title}</h3>
                <p>{action.text}</p>
                <a
                  className="btn ghost"
                  href={action.href}
                  target={action.href.startsWith("tel:") ? undefined : "_blank"}
                  rel={action.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                  style={{ marginTop: 8, justifySelf: "start" }}
                >
                  {action.cta} <span>→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="section-head" style={{ marginTop: 56 }}>
          <div className="eyebrow red">▣ &nbsp; DOORSTEP SERVICE</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            {DOORSTEP.title.toUpperCase()}
          </h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            {DOORSTEP.text}
          </p>
        </div>

        <div className="page-grid">
          {DOORSTEP.steps.map((step, i) => (
            <Reveal key={step}>
              <div className="page-card">
                <span className="icon" aria-hidden="true" style={{ color: "var(--red)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ margin: 0 }}>{step}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="center" style={{ marginTop: 44 }}>
            <p style={{ fontSize: 12, color: "inherit", opacity: 0.68, maxWidth: 480, margin: "0 auto 16px" }}>
              Ready to book a service or a test ride? We will confirm your slot on
              WhatsApp.
            </p>
            <Link className="btn primary" href="/service">
              BOOK A SERVICE <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
