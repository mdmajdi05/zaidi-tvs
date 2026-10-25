import type { Metadata } from "next";
import { wa } from "@data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import OffersHub from "@/components/OffersHub";
import EmiCalc from "@/components/EmiCalc";
import Faq from "@/components/Faq";
import { breadcrumbSchema, createMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Offers, Finance & Exchange",
  description:
    "Running offers, easy EMI finance, best-value exchange and insurance — all under one roof at Zaidi TVS, Chandpur (Uttar Pradesh). Check your EMI on WhatsApp.",
  path: "/offers",
  keywords: [
    "TVS offers Chandpur",
    "TVS finance EMI Chandpur",
    "two wheeler loan Uttar Pradesh",
    "TVS exchange offer",
    "TVS insurance renewal",
  ],
});

const FINANCE_FAQ: Array<[string, string]> = [
  [
    "What documents do I need for bike finance?",
    "Usually a valid ID proof, address proof, a recent photograph and bank details. Requirements can differ by lender — message us and we will share the exact checklist for your case.",
  ],
  [
    "How much down payment is required?",
    "It depends on the model and the scheme you choose. Many plans let you finance a large part of the on-road price with a modest down payment. Figures shown here are indicative* — ask us for today's exact numbers.",
  ],
  [
    "How long does approval take?",
    "Approvals are often quick and frequently same-day* when your documents are ready. We track your file end to end so you are never left guessing.",
  ],
  [
    "Do you accept exchange of my old two-wheeler?",
    "Yes. Bring your old bike or scooter for a free evaluation. We share a fair value, handle the paperwork and adjust it against your new TVS.",
  ],
  [
    "Are the interest rates fixed?",
    "Rates shown on this page are indicative* only. Final interest, tenure and processing fee depend on the lender, your profile and the offers available at purchase time. Confirm with us before you decide.",
  ],
];

const WA_TEXT =
  "Hello Zaidi TVS! I'd like help with offers, finance and exchange for a TVS. Please share the current schemes and my EMI options.";

export default function OffersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Offers & Finance", url: "/offers" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(
          FINANCE_FAQ.map(([question, answer]) => ({ question, answer })),
        )}
      />
      <PageHero
        eyebrow="OFFERS & FINANCE"
        title="BUY SMARTER. RIDE SOONER."
        subtitle="Running offers, easy EMI, best-value exchange and insurance — everything you need to own your TVS, explained clearly."
      />

      <section className="page-section dark">
        <OffersHub />
      </section>

      <section className="page-section section-light">
        <div className="section-head">
          <div className="eyebrow red"> &nbsp; FINANCE AT A GLANCE</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            PLAN YOUR EMI.
          </h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            Move the sliders to estimate a comfortable monthly EMI. All figures are
            indicative* — final EMI depends on the lender, CIBIL and offers at
            purchase time.
          </p>
        </div>
        <Reveal>
          <EmiCalc />
        </Reveal>
      </section>

      <section className="page-section dark">
        <div className="section-head">
          <div className="eyebrow red"> &nbsp; GOOD TO KNOW</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            FINANCE FAQs.
          </h2>
        </div>
        <Reveal>
          <Faq items={FINANCE_FAQ} />
        </Reveal>

        <Reveal>
          <div className="center" style={{ marginTop: 40 }}>
            <p
              style={{
                color: "inherit",
                opacity: 0.68,
                fontSize: 12,
                maxWidth: 480,
                margin: "0 auto 16px",
              }}
            >
              Still weighing your options? Send us a message and our team will walk
              you through offers, finance and exchange over WhatsApp.
            </p>
            <a
              className="btn primary"
              href={wa(WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
            >
              CHAT WITH US ON WHATSAPP <span>→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
