import Link from "next/link";
import Bike360 from "./Bike360";
import EmiCalc from "./EmiCalc";
import Faq from "./Faq";
import Reveal from "./Reveal";
import {
  vehicleFamily,
  vehicleHref,
  vehicleImage,
  vehicleListHref,
  type Vehicle,
} from "@/lib/catalog";
import { spinFramesForSlug } from "@/lib/spinFrames";
import { CONTACT, wa } from "@data/site";

/** "MILEAGE" for petrol models, "RANGE" for electrics. */
function fuelLabel(kind: Vehicle["kind"]): string {
  return kind === "Electric" ? "RANGE" : "MILEAGE";
}

/** "BIKES" / "SCOOTERS" — the listing this model lives on. */
function listLabel(v: Vehicle): string {
  return vehicleListHref(v) === "/scooters" ? "SCOOTERS" : "BIKES";
}

function faqFor(m: Vehicle): Array<[string, string]> {
  const priceLine = m.price
    ? `Ex-showroom starts around ${m.price}.`
    : "The ex-showroom price is shared on request.";
  return [
    [
      `What is the on-road price of the ${m.shortName}?`,
      `${priceLine} On-road price depends on the variant, insurance and the offers running today — message us on WhatsApp or call ${CONTACT.phone} for the exact Chandpur price.`,
    ],
    [
      `Can I take a free test ride?`,
      `Yes — test rides on the ${m.shortName} are free all week at our Chandpur showroom. Bring a valid driving licence and pick any slot on WhatsApp.`,
    ],
    [
      "Do you offer finance and exchange?",
      "Yes — easy EMI with quick approvals at the showroom, plus the best value for your old two-wheeler on exchange.",
    ],
    [
      `Where do I get the ${m.shortName} serviced?`,
      "Right here — our in-house workshop uses genuine TVS parts, and periodic service is quick if you book a slot in advance.",
    ],
    [
      "Which colours and variants are available?",
      `We stock the popular variants of the ${m.shortName}. Message us on WhatsApp to check today's colour availability and delivery time.`,
    ],
  ];
}

export default function VehiclePage({ vehicle: m }: { vehicle: Vehicle }) {
  const listHref = vehicleListHref(m);
  const cutout = vehicleImage(m);
  const spin = spinFramesForSlug(m.slug);

  // Gallery: real TVS marketing shots when we have them, otherwise different
  // angles from the genuine 360° turntable set.
  const marketing = m.gallery.filter((g) => g.includes("TVS%20BIKES"));
  const angles =
    spin.length >= 4
      ? [
          spin[0],
          spin[Math.round(spin.length / 4)],
          spin[Math.round(spin.length / 2)],
          spin[Math.round((3 * spin.length) / 4)],
        ]
      : m.gallery;
  const gallery = marketing.length >= 2 ? marketing.slice(0, 4) : angles;

  const related = vehicleFamily(m)
    .filter((v) => v.slug !== m.slug)
    .slice(0, 3);

  const specs: Array<[string, string]> = [
    ["ENGINE", m.engine],
    ["MAX POWER", m.power],
    [fuelLabel(m.kind), m.mileage],
    ["KERB WEIGHT", m.weight],
    ["BODY TYPE", m.kind],
    ["PRICE", m.price ?? "On request"],
  ];

  return (
    <article className="vp">
      {/* ---------------- hero ---------------- */}
      <section className="vp-hero">
        <div className="vp-hero-decor" aria-hidden="true">
          <div className="grid-overlay" />
          <span className="orb orb-1" />
          <span className="orb orb-2" />
        </div>

        <div className="vp-hero-inner">
          <nav className="vp-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <b>/</b>
            <Link href={listHref}>{listLabel(m)}</Link>
            <b>/</b>
            <span>{m.shortName}</span>
          </nav>

          <div className="vp-hero-grid">
            <div className="vp-copy">
              <div className="eyebrow red">
                ▣ &nbsp; {m.kind.toUpperCase()} · {m.tagline}
              </div>
              <h1>{m.name}</h1>
              <p className="vp-sub">{m.desc}</p>

              <ul className="vp-chips">
                <li>
                  <small>ENGINE</small>
                  <b>{m.engine}</b>
                </li>
                <li>
                  <small>POWER</small>
                  <b>{m.power}</b>
                </li>
                <li>
                  <small>{fuelLabel(m.kind)}</small>
                  <b>{m.mileage}</b>
                </li>
              </ul>

              <div className="vp-price">
                <small>{m.price ? "EX-SHOWROOM FROM" : "PRICE"}</small>
                <b>{m.price ?? "Best price on WhatsApp"}</b>
                <em>On-road price variant aur offers par depend karta hai.</em>
              </div>

              <div className="hero-buttons">
                <a
                  className="btn primary"
                  href={wa(
                    `Hello Zaidi TVS! I want to book a test ride of the ${m.name} (${m.engine}). Please share available slots.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BOOK TEST RIDE <span>→</span>
                </a>
                <a className="btn ghost" href={wa(`Please share the on-road price of the ${m.name}.`)} target="_blank" rel="noopener noreferrer">
                  GET ON-ROAD PRICE <span>→</span>
                </a>
                <a className="btn ghost" href={CONTACT.phoneHref}>
                  CALL {CONTACT.phone} <span>→</span>
                </a>
              </div>
            </div>

            <div className="vp-art">
              <span className="vp-art-glow" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cutout} alt={m.name} />
              <span className="vp-art-badge">{m.tagline}</span>
              {spin.length > 0 ? <span className="vp-art-hint">360° VIEW NEECHE ↓</span> : null}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- specs ---------------- */}
      <section className="vp-band">
        <div className="spec-band">
          {specs.map(([k, v]) => (
            <div key={k} className="spec-cell">
              <small>{k}</small>
              <b>{v}</b>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- 360 viewer ---------------- */}
      <section className="page-section dark">
        <div className="section-head center">
          <div className="eyebrow red">▣ &nbsp; {spin.length > 0 ? "REAL 360° · DRAG TO ROTATE" : "FULL VIEW"}</div>
          <h2>TAKE A CLOSER LOOK.</h2>
          <p>Rotate the {m.shortName} and check every angle before you come in.</p>
        </div>
        <Reveal>
          <div className="model360-wrap">
            {spin.length > 0 ? (
              <Bike360 frames={spin} alt={`${m.name} — 360° view`} />
            ) : (
              <div className="vp-still">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cutout} alt={m.name} />
              </div>
            )}
            <p className="model360-tag">{m.tagline}</p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- features ---------------- */}
      <section className="page-section dark">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; WHY YOU WILL LOVE IT</div>
          <h2>TOP FEATURES</h2>
          <p>What makes the {m.shortName} stand out in its class.</p>
        </div>
        <div className="page-grid">
          {m.features.map(([icon, title, text]) => (
            <Reveal key={title}>
              <div className="page-card vp-feature">
                <span className="icon" aria-hidden="true">
                  {icon}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- gallery ---------------- */}
      <section className="page-section dark">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; GALLERY</div>
          <h2>SEE IT AROUND.</h2>
        </div>
        <div className="vp-gallery">
          {gallery.map((g, i) => (
            <Reveal key={`${g}-${i}`}>
              <figure className="vp-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g} alt={`${m.name} — view ${i + 1}`} loading="lazy" />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- EMI + FAQ ---------------- */}
      <section className="page-section dark">
        <div className="section-head center">
          <div className="eyebrow red">▣ &nbsp; PLAN YOUR BUY</div>
          <h2>EMI ESTIMATOR</h2>
          <p>Slide to see what the {m.shortName} could cost you per month.</p>
        </div>
        <Reveal>
          <EmiCalc />
        </Reveal>

        <div className="section-head center" style={{ marginTop: 60 }}>
          <div className="eyebrow red">▣ &nbsp; GOOD TO KNOW</div>
          <h2>FAQs</h2>
        </div>
        <Reveal>
          <Faq items={faqFor(m)} />
        </Reveal>
      </section>

      {/* ---------------- related ---------------- */}
      {related.length > 0 ? (
      <section className="page-section dark">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; KEEP EXPLORING</div>
          <h2>ALSO SEE.</h2>
        </div>
        <div className="vp-related">
          {related.map((r) => (
            <Reveal key={r.slug}>
              <Link className="vp-rel-card" href={vehicleHref(r)}>
                <span className="vp-rel-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={vehicleImage(r)} alt={r.name} loading="lazy" />
                </span>
                <span className="vp-rel-body">
                  <small>
                    {r.kind.toUpperCase()} · {r.engine}
                  </small>
                  <strong>{r.name}</strong>
                  <em>
                    {r.power} · {r.mileage}
                  </em>
                  <span className="vp-rel-cta">VIEW DETAILS →</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="center" style={{ marginTop: 30 }}>
          <Link className="btn ghost" href={listHref}>
            SEE ALL {listLabel(m)} <span>→</span>
          </Link>
        </div>
      </section>
      ) : null}

      {/* ---------------- closing CTA ---------------- */}
      <section className="vp-cta">
        <div className="vp-cta-inner">
          <div>
            <div className="eyebrow red">▣ &nbsp; VISIT ZAIDI TVS · CHANDPUR</div>
            <h2>READY TO RIDE THE {m.shortName.toUpperCase()}?</h2>
            <p>
              Walk in for a free test ride, or message us and we&apos;ll keep the {m.shortName} ready
              with today&apos;s best price.
            </p>
          </div>
          <div className="hero-buttons">
            <a
              className="btn primary"
              href={wa(`Hello Zaidi TVS! I am interested in the ${m.name}. Please share details and offers.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              CHAT ON WHATSAPP <span>→</span>
            </a>
            <Link className="btn ghost" href="/contact">
              SHOWROOM TIMINGS <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
