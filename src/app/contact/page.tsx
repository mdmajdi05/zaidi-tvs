import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import {
  breadcrumbSchema,
  contactPageSchema,
  createMetadata,
} from "@/lib/seo";
import {
  CONTACT,
  ADDRESS_LINE,
  HOURS_SHORT,
  MAPS_URL,
  MAP_EMBED_URL,
} from "@data/site";

export const metadata: Metadata = createMetadata({
  title: "Contact & Showroom",
  description: `Contact Zaidi TVS, Chandpur (Uttar Pradesh) — call ${CONTACT.phone}, chat on WhatsApp or visit the showroom on ${ADDRESS_LINE}. Book a free test ride, service slot or check today's price.`,
  path: "/contact",
  keywords: [
    "contact Zaidi TVS",
    "TVS showroom address Chandpur",
    "TVS showroom timing Chandpur",
    "book TVS test ride Chandpur",
  ],
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={contactPageSchema()}
      />
      <PageHero
        eyebrow="GET IN TOUCH"
        title="WE ARE HERE TO HELP."
        subtitle="Questions about a model, price, finance or service? Call, message or drop by — we reply fast."
      />

      <section className="page-section dark">
        <div className="contact-grid">
          <Reveal>
            <div className="contact-card">
              <h2
                style={{
                  fontFamily: "Oswald, Arial, sans-serif",
                  fontStyle: "italic",
                  fontSize: 24,
                  margin: "0 0 18px",
                }}
              >
                SHOWROOM DETAILS
              </h2>
              <h3>Address</h3>
              <p>⌖ {ADDRESS_LINE}</p>
              <h3>Phone</h3>
              <a href={CONTACT.phoneHref}>⌕ {CONTACT.phone}</a>
              <h3>WhatsApp</h3>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                ◉ Chat with us on WhatsApp
              </a>
              <h3>Hours</h3>
              <p>{HOURS_SHORT}</p>
              <a className="btn ghost" href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ marginTop: 14 }}>
                VIEW ON MAP <span>→</span>
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="contact-card">
              <h2
                style={{
                  fontFamily: "Oswald, Arial, sans-serif",
                  fontStyle: "italic",
                  fontSize: 24,
                  margin: "0 0 18px",
                }}
              >
                SEND AN ENQUIRY
              </h2>
              <p style={{ marginBottom: 16 }}>
                Fill in the form and we will get back to you on WhatsApp with
                prices, offers and test ride slots.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="map-frame">
            <iframe
              src={MAP_EMBED_URL}
              title="Zaidi TVS showroom location on Google Maps"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <legend aria-hidden="true">⌖ Zaidi TVS — {ADDRESS_LINE}</legend>
          </div>
        </Reveal>

        <Reveal>
          <div className="center" style={{ marginTop: 45 }}>
            <p style={{ fontSize: 11, color: "#aeb5bc", maxWidth: 460, margin: "0 auto" }}>
              Prefer talking? Call us directly during showroom hours — real
              people, real answers, no waiting.
            </p>
            <a className="btn primary" href={CONTACT.phoneHref} style={{ marginTop: 16 }}>
              CALL {CONTACT.phone} <span>→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}