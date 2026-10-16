/**
 * SEO barrel — the single import surface for the rest of the app.
 *
 *   import { createMetadata, breadcrumbSchema } from "@/lib/seo";
 */
export { createMetadata } from "./metadata";
export type { SeoInput } from "./metadata";

export {
  ORG_ID,
  WEBSITE_ID,
  DEALER_ID,
  jsonLd,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  breadcrumbSchema,
  articleSchema,
  faqSchema,
  itemListSchema,
  serviceSchema,
  contactPageSchema,
  productSchema,
  reviewsSchema,
} from "./schemas";
export type { JsonLdProps } from "./schemas";
