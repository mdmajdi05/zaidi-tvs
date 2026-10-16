import type { Metadata } from "next";
import { wa } from "@data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Reviews, { ReviewCard } from "@/components/Reviews";
import { AGGREGATE, REVIEWS } from "@/lib/reviews";
import styles from "@/components/Reviews.module.css";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read what riders from Chandpur and nearby towns say about buying and servicing their TVS bikes and scooters at Zaidi TVS.",
};

const WHATSAPP = wa(
  "Hi Zaidi TVS! I'd like to share my review / feedback about my experience."
);

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="CUSTOMER REVIEWS"
        title="TRUSTED BY RIDERS."
        subtitle="Honest words from the families and riders who bought, serviced and rode home with Zaidi TVS."
      />

      <section className="page-section dark">
        <Reveal>
          <Reviews />
        </Reveal>
      </section>

      <section className="page-section section-light">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; ALL REVIEWS</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            EVERY STORY MATTERS
          </h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            {AGGREGATE.rating.toFixed(1)}★ average from {AGGREGATE.count}+ happy riders* — here
            is what they told us.
          </p>
        </div>

        <div className={styles.allGrid}>
          {REVIEWS.map((review) => (
            <ReviewCard key={`${review.name}-${review.date}`} review={review} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 46 }}>
          <p style={{ color: "inherit", opacity: 0.7, fontSize: 13, maxWidth: 480, margin: "0 auto 18px" }}>
            Bought or serviced a TVS with us? We would love to hear about your experience.
          </p>
          <a
            className="btn primary"
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            SHARE YOUR STORY <span>→</span>
          </a>
        </div>
      </section>
    </>
  );
}
