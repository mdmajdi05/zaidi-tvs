import type { MetadataRoute } from "next";
import { BIKES, vehicleHref } from "@/lib/catalog";
import { POSTS } from "@/lib/posts";
import { SITE_URL } from "@data/site";

const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/bikes", priority: 0.9 },
  { path: "/scooters", priority: 0.9 },
  { path: "/offers", priority: 0.9 },
  { path: "/compare", priority: 0.8 },
  { path: "/parts", priority: 0.8 },
  { path: "/service", priority: 0.8 },
  { path: "/reviews", priority: 0.7 },
  { path: "/gallery", priority: 0.6 },
  { path: "/branches", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...BIKES.map((bike) => ({
      url: `${SITE_URL}${vehicleHref(bike)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  ];
}
