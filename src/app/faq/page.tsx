import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ_GROUPS } from "@/lib/faqs";
import {
  CONTACT,
  ADDRESS_LINE,
  HOURS_SHORT,
  MAPS_URL,
  wa,
} from "@data/site";
import styles from "@/components/FaqAccordion.module.css";

export const metadata: Metadata = {
  title: "Help & FAQ",
  description:
    "Answers to common questions about buying, finance, service and electric TVS two-wheelers at Zaidi TVS, Chandpur — plus call, WhatsApp and showroom support.",
};

const WHATSAPP_URL = wa(
  "Hi Zaidi TVS, I have a question about a TVS two-wheeler."
);

const HEADING_STYLE = {
  fontFamily: "Oswald, Arial, sans-serif",
  fontStyle: "italic" as const,
  fontSize: 30,
  margin: 0,
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="HELP & FAQ"
        title="EVERYTHING YOU WANTED TO ASK."
        subtitle="Buying, finance, service, electric and documents — quick honest answers. Still unsure? We are one message away."
      />

      <section className="page-section dark">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; QUICK ANSWERS</div>
          <h2 style={HEADING_STYLE}>FREQUENTLY ASKED QUESTIONS</h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            Search below or browse by topic.
          </p>
        </div>

        <Reveal>
          <FaqAccordion groups={FAQ_GROUPS} defaultOpen={0} />
        </Reveal>
      </section>

      <section className="page-section section-light">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; STILL NEED HELP?</div>
          <h2 style={HEADING_STYLE}>TALK TO A REAL PERSON.</h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            Call, message or drop by the showroom — we will help you sort it out.
          </p>
        </div>

        <div className={styles.helpGrid}>
          <Reveal>
            <div className={styles.helpCard}>
              <span className={styles.helpIcon} aria-hidden="true">
                ⌕
              </span>
              <h3>Call us</h3>
              <p>
                Speak to our team during showroom hours for prices, offers and
                availability.
              </p>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.helpCard}>
              <span className={styles.helpIcon} aria-hidden="true">
                ◉
              </span>
              <h3>WhatsApp us</h3>
              <p>
                Send a photo, ask a question or book a test ride and service
                slot.
              </p>
              <a
                className="btn ghost"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                CHAT NOW <span>→</span>
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.helpCard}>
              <span className={styles.helpIcon} aria-hidden="true">
                ⌖
              </span>
              <h3>Visit the showroom</h3>
              <p>
                {ADDRESS_LINE}
                <br />
                {HOURS_SHORT}
              </p>
              <a
                className="btn ghost"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                GET DIRECTIONS <span>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
