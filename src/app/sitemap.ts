/**
 * XML sitemap — generated from the same data the pages render (`/data`), so a
 * new model, post or route is never forgotten. See `src/lib/sitemap-data.ts`
 * for the single source of truth shared with the HTML sitemap.
 */
import type { MetadataRoute } from "next";
import { SITEMAP_ENTRIES } from "@/lib/sitemap-data";
import { SITE_URL } from "@data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return SITEMAP_ENTRIES.map((entry) => ({
    url: entry.path === "/" ? SITE_URL : `${SITE_URL}${entry.path}`,
    lastModified: entry.lastModified ?? now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    ...(entry.images?.length
      ? { images: entry.images.map((image) => `${SITE_URL}${image}`) }
      : {}),
  }));
}
