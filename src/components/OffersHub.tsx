import Link from "next/link";
import { wa } from "@data/site";
import Reveal from "@/components/Reveal";
import {
  EXCHANGE_STEPS,
  FINANCE_SCHEMES,
  OFFERS,
} from "@/lib/offers";
import styles from "./OffersHub.module.css";

const EMI_TEXT =
  "Hello Zaidi TVS! I'd like to check my EMI options for a TVS. Please share the finance schemes and monthly estimate.";

export default function OffersHub({ limit }: { limit?: number }) {
  const offers = typeof limit === "number" ? OFFERS.slice(0, limit) : OFFERS;
  const finance = FINANCE_SCHEMES.slice(0, 3);

  return (
    <div className={styles.hub}>
      <div className="section-head">
        <div className="eyebrow red">▣ &nbsp; SAVE MORE, RIDE MORE</div>
        <h2
          style={{
            fontFamily: "Oswald, Arial, sans-serif",
            fontStyle: "italic",
            fontSize: 30,
            margin: 0,
          }}
        >
          OFFERS, FINANCE &amp; EXCHANGE.
        </h2>
        <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
          Everything you need to own your TVS — running offers, easy EMI, insurance
          and best-value exchange, all under one roof.
        </p>
      </div>

      <div className={styles.offerGrid}>
        {offers.map((offer) => (
          <Reveal key={offer.title}>
            <article className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.icon} aria-hidden="true">
                  {offer.icon}
                </span>
                <span className={styles.tag}>{offer.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{offer.title}</h3>
              <p className={styles.cardText}>{offer.text}</p>
              <span className={styles.valid}>⏱ {offer.valid}</span>
            </article>
          </Reveal>
        ))}
      </div>

      <div className={styles.financeRow}>
        {finance.map((scheme) => (
          <Reveal key={scheme.title}>
            <div className={styles.financeCard}>
              <span className={styles.icon} aria-hidden="true">
                {scheme.icon}
              </span>
              <h3 className={styles.financeTitle}>{scheme.title}</h3>
              <strong className={styles.rate}>{scheme.rate}</strong>
              <p className={styles.cardText}>{scheme.points[0]}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className={styles.stepsStrip}>
        <div className={styles.stepsInner}>
          <div className={styles.stepsHead}>
            <div className="eyebrow red">▣ &nbsp; EXCHANGE IN 4 STEPS</div>
            <h3
              style={{
                fontFamily: "Oswald, Arial, sans-serif",
                fontStyle: "italic",
                fontSize: 22,
                margin: "4px 0 0",
              }}
            >
              TRADE IN. UPGRADE. RIDE OUT.
            </h3>
          </div>
          <ol className={styles.steps}>
            {EXCHANGE_STEPS.map((step) => (
              <li key={step.num} className={styles.step}>
                <b className={styles.stepNum}>{step.num}</b>
                <strong className={styles.stepTitle}>{step.title}</strong>
                <span className={styles.cardText}>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={styles.ctaRow}>
        <Link className="btn primary" href="/offers">
          SEE ALL OFFERS <span>→</span>
        </Link>
        <a
          className="btn ghost"
          href={wa(EMI_TEXT)}
          target="_blank"
          rel="noopener noreferrer"
        >
          CHECK MY EMI ON WHATSAPP <span>→</span>
        </a>
      </div>
    </div>
  );
}
