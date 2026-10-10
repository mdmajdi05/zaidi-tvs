import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Zaidi TVS, Chandpur — call +91 90090 10050, chat on WhatsApp or visit the showroom on Main Road, Chandpur.",
};

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Zaidi%20TVS%20Chandpur";

export default function ContactPage() {
  return (
    <>
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
              <p>⌖ Main Road, Chandpur, Uttar Pradesh</p>
              <h3>Phone</h3>
              <a href="tel:+919009010050">⌕ +91 90090 10050</a>
              <h3>WhatsApp</h3>
              <a
                href="https://wa.me/919009010050"
                target="_blank"
                rel="noopener noreferrer"
              >
                ◉ Chat with us on WhatsApp
              </a>
              <h3>Hours</h3>
              <p>
                Mon – Sat: 10:00 AM – 8:00 PM
                <br />
                Sunday: 11:00 AM – 5:00 PM
              </p>
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
              src="https://www.google.com/maps?q=Zaidi+TVS+Chandpur&output=embed"
              title="Zaidi TVS showroom location on Google Maps"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <legend aria-hidden="true">⌖ Zaidi TVS — Main Road, Chandpur</legend>
          </div>
        </Reveal>

        <Reveal>
          <div className="center" style={{ marginTop: 45 }}>
            <p style={{ fontSize: 11, color: "#aeb5bc", maxWidth: 460, margin: "0 auto" }}>
              Prefer talking? Call us directly during showroom hours — real
              people, real answers, no waiting.
            </p>
            <a className="btn primary" href="tel:+919009010050" style={{ marginTop: 16 }}>
              CALL +91 90090 10050 <span>→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}