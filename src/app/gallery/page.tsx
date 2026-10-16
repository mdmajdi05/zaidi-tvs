import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { breadcrumbSchema, createMetadata, itemListSchema } from "@/lib/seo";
import { SOCIAL } from "@data/site";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description:
    "Photo gallery of Zaidi TVS, Chandpur (Uttar Pradesh) — our showroom, the TVS line-up, workshop moments and rider events.",
  path: "/gallery",
  keywords: [
    "Zaidi TVS gallery",
    "TVS showroom photos Chandpur",
    "TVS bikes photos",
  ],
});

const IG_TILES: Array<{ src: string; alt: string }> = [
  { src: "/assets/city-rider.jpg", alt: "TVS rider in the city" },
  { src: "/tvs/shop/style.webp", alt: "Styled scooter accessories" },
  { src: "/assets/style-scooter.jpg", alt: "Styled TVS scooter" },
  { src: "/tvs/shop/urban-wear.webp", alt: "Urban wear range" },
  { src: "/assets/family-rider.jpg", alt: "Family riding a TVS" },
  { src: "/tvs/shop/utility.webp", alt: "Utility accessories" },
];

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          IG_TILES.map((tile) => ({
            name: tile.alt,
            url: "/gallery",
            image: tile.src,
          })),
        )}
      />
      <PageHero
        eyebrow="GALLERY"
        title="MOMENTS AT ZAIDI TVS."
        subtitle="A look inside our Chandpur showroom, the workshop and the rides that bring riders together."
      />

      <section className="page-section dark">
        <GalleryGrid />
      </section>

      <section className="page-section section-light">
        <div className="section-head">
          <div className="eyebrow red">▣ &nbsp; FOLLOW THE RIDE · #ZaidiRiders</div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            FOLLOW THE RIDE
          </h2>
          <p style={{ color: "inherit", opacity: 0.68, fontSize: 13, margin: "8px 0 0" }}>
            Share your TVS moments with #ZaidiRiders and tag us to be featured.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 26,
          }}
        >
          {IG_TILES.map((tile) => (
            <a
              key={tile.src}
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tile.alt} — open Instagram`}
              style={{
                flex: "1 1 150px",
                maxWidth: 208,
                aspectRatio: "1 / 1",
                display: "block",
                overflow: "hidden",
                borderRadius: 12,
                border: "1px solid rgba(128,128,128,0.22)",
                background: "rgba(128,128,128,0.08)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </a>
          ))}
        </div>

        <div className="center" style={{ marginTop: 28 }}>
          <a
            className="btn primary"
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            FIND US ON INSTAGRAM <span>→</span>
          </a>
        </div>
      </section>
    </>
  );
}
