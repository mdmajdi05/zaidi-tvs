/**
 * JSON-LD schema builders.
 *
 * Each builder returns `{ __html }`, ready to spread into a
 * `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` tag.
 * Pages never hand-write raw JSON-LD — always import a builder from here so the
 * `@id` graph stays consistent (Organization → WebSite → AutoDealer → Product /
 * Article / Service …) and fields never drift.
 *
 * The dealership targets India only, so every address uses `addressCountry: IN`
 * and the locale is `en_IN`.
 */
import {
  ADDRESS,
  CONTACT,
  HOURS,
  SITE,
  SITE_URL,
  SOCIAL,
  absoluteUrl,
} from "@data/site";

/** Canonical site origin without a trailing slash, e.g. "https://x.in". */
const BASE_URL = SITE_URL.replace(/\/$/, "");

export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const DEALER_ID = `${BASE_URL}/#dealer`;

export interface JsonLdProps {
  __html: string;
}

/** Wrap any schema object with the Schema.org context and serialise it. */
export function jsonLd(schema: Record<string, unknown>): JsonLdProps {
  return {
    __html: JSON.stringify({ "@context": "https://schema.org", ...schema }),
  };
}

/* -------------------------------------------------------------------------- */
/*  Shared pieces                                                             */
/* -------------------------------------------------------------------------- */

const STREET = [ADDRESS.line1, ADDRESS.line2].filter(Boolean).join(", ");

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  ...(STREET ? { streetAddress: STREET } : {}),
  addressLocality: ADDRESS.city,
  addressRegion: ADDRESS.state,
  ...(ADDRESS.postalCode ? { postalCode: ADDRESS.postalCode } : {}),
  addressCountry: SITE.country,
};

/** Social profile URLs that are actually filled in. */
const SAME_AS = [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.youtube].filter(
  (value): value is string => Boolean(value),
);

/** "10:00 AM" -> "10:00" ("8:00 PM" -> "20:00"). */
function to24h(value: string): string | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = match[2];
  const isPM = match[3].toUpperCase() === "PM";
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

const OPENING_HOURS = HOURS.map(({ day, time }) => {
  const [opens, closes] = time.split(/[–-]/).map((part) => to24h(part));
  if (!opens || !closes) return null;
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day,
    opens,
    closes,
  };
}).filter(Boolean);

const CONTACT_POINT = {
  "@type": "ContactPoint",
  telephone: CONTACT.phone,
  contactType: "sales",
  areaServed: "IN",
  availableLanguage: ["en", "hi"],
};

/* -------------------------------------------------------------------------- */
/*  Global (root layout)                                                      */
/* -------------------------------------------------------------------------- */

export function organizationSchema(): JsonLdProps {
  return jsonLd({
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE.logo),
    },
    image: absoluteUrl(SITE.ogImage),
    description: SITE.defaultDescription,
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    telephone: CONTACT.phone,
    address: POSTAL_ADDRESS,
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [CONTACT_POINT],
  });
}

export function websiteSchema(): JsonLdProps {
  return jsonLd({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: SITE.name,
    description: SITE.defaultDescription,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  });
}

/** Local SEO — an authorized TVS dealership (an `AutoDealer` is a business). */
export function localBusinessSchema(): JsonLdProps {
  return jsonLd({
    "@type": "AutoDealer",
    "@id": DEALER_ID,
    name: SITE.name,
    image: [absoluteUrl(SITE.ogImage), absoluteUrl(SITE.logo)],
    url: absoluteUrl("/"),
    telephone: CONTACT.phone,
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    address: POSTAL_ADDRESS,
    ...(OPENING_HOURS.length
      ? { openingHoursSpecification: OPENING_HOURS }
      : {}),
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Debit Card, Credit Card, Bank Finance",
    areaServed: [
      { "@type": "City", name: ADDRESS.city },
      { "@type": "State", name: ADDRESS.state },
    ],
    parentOrganization: { "@id": ORG_ID },
    brand: { "@type": "Brand", name: "TVS" },
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
  });
}

/* -------------------------------------------------------------------------- */
/*  Page-level builders                                                       */
/* -------------------------------------------------------------------------- */

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): JsonLdProps {
  return jsonLd({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  });
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author: string;
  image?: string;
  category?: string;
}): JsonLdProps {
  return jsonLd({
    "@type": "Article",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: absoluteUrl("/"),
    },
    ...(post.image
      ? { image: { "@type": "ImageObject", url: absoluteUrl(post.image) } }
      : {}),
    ...(post.category ? { articleSection: post.category } : {}),
    inLanguage: "en-IN",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
  });
}

export function faqSchema(
  items: { question: string; answer: string }[],
): JsonLdProps {
  return jsonLd({
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });
}

export function itemListSchema(
  items: {
    name: string;
    url: string;
    description?: string;
    image?: string;
  }[],
): JsonLdProps {
  return jsonLd({
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: absoluteUrl(item.image) } : {}),
    })),
  });
}

export function serviceSchema(
  services: { name: string; description: string; url: string }[],
): JsonLdProps {
  return jsonLd({
    "@type": "ItemList",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: absoluteUrl(service.url),
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "India" },
      },
    })),
  });
}

export function contactPageSchema(): JsonLdProps {
  return jsonLd({
    "@type": "ContactPage",
    "@id": `${absoluteUrl("/contact")}#contactpage`,
    url: absoluteUrl("/contact"),
    name: `Contact ${SITE.name}`,
    mainEntity: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      ...(CONTACT.email ? { email: CONTACT.email } : {}),
      telephone: CONTACT.phone,
      url: absoluteUrl("/"),
      address: POSTAL_ADDRESS,
    },
  });
}

/** Vehicle / product page schema (TVS model). */
export function productSchema(product: {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: string;
  category?: string;
  brand?: string;
}): JsonLdProps {
  const price = product.price ? product.price.replace(/[^\d.]/g, "") : "";
  return jsonLd({
    "@type": "Product",
    "@id": `${absoluteUrl(product.url)}#product`,
    name: product.name,
    description: product.description,
    url: absoluteUrl(product.url),
    ...(product.image ? { image: absoluteUrl(product.image) } : {}),
    brand: { "@type": "Brand", name: product.brand ?? "TVS" },
    ...(product.category ? { category: product.category } : {}),
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            url: absoluteUrl(product.url),
            priceCurrency: "INR",
            price,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": ORG_ID },
          },
        }
      : {}),
  });
}

/** Aggregate rating + reviews for the /reviews page (Google review snippet). */
export function reviewsSchema(input: {
  rating: number;
  count: number;
  reviews: { author: string; rating: number; text: string }[];
}): JsonLdProps {
  return jsonLd({
    "@type": "AutoDealer",
    "@id": DEALER_ID,
    name: SITE.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: input.rating,
      reviewCount: input.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: input.reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.text,
    })),
  });
}
