/**
 * Sitemap data — ONE source of truth for every indexable route.
 *
 * Both `app/sitemap.ts` (XML) and `app/sitemap-html/page.tsx` (the human
 * sitemap) read from here, so a new model, post or static route is never
 * forgotten in one place but missing in the other.
 *
 * Everything is derived from `/data` (the "database"), so this is the single
 * place that decides what counts as an active, crawlable page.
 */
import type { MetadataRoute } from "next";
import {
  MOPEDS,
  MOTORCYCLES,
  SCOOTERS,
  vehicleHref,
  vehicleImage,
} from "@/lib/catalog";
import { sortedPosts } from "@/lib/posts";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export interface SitemapEntry {
  /** Human label used by the HTML sitemap. */
  label: string;
  /** Site-relative path used for canonical / absolute URLs. */
  path: string;
  /** Section heading used by the HTML sitemap. */
  group: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified?: Date;
  /** Absolute or site-relative image URLs for the XML image sitemap. */
  images?: string[];
}

export interface SitemapGroup {
  title: string;
  description: string;
  entries: SitemapEntry[];
}

/** How many links the HTML sitemap renders per page. */
export const SITEMAP_PAGE_SIZE = 200;

const GROUP_MAIN = "Main Pages";
const GROUP_MOTORCYCLES = "Motorcycles & Mopeds";
const GROUP_SCOOTERS = "Scooters & Electric";
const GROUP_BLOG = "Blog & Guides";

const STATIC_ROUTES: SitemapEntry[] = [
  { label: "Home", path: "/", group: GROUP_MAIN, priority: 1, changeFrequency: "weekly" },
  { label: "Our Bikes", path: "/bikes", group: GROUP_MAIN, priority: 0.9, changeFrequency: "weekly" },
  { label: "Our Scooters", path: "/scooters", group: GROUP_MAIN, priority: 0.9, changeFrequency: "weekly" },
  { label: "Offers, Finance & Exchange", path: "/offers", group: GROUP_MAIN, priority: 0.9, changeFrequency: "weekly" },
  { label: "Compare Models", path: "/compare", group: GROUP_MAIN, priority: 0.8, changeFrequency: "monthly" },
  { label: "Parts & Accessories", path: "/parts", group: GROUP_MAIN, priority: 0.8, changeFrequency: "monthly" },
  { label: "Service & Care", path: "/service", group: GROUP_MAIN, priority: 0.8, changeFrequency: "monthly" },
  { label: "Contact", path: "/contact", group: GROUP_MAIN, priority: 0.8, changeFrequency: "monthly" },
  { label: "Customer Reviews", path: "/reviews", group: GROUP_MAIN, priority: 0.7, changeFrequency: "weekly" },
  { label: "Showroom & Timings", path: "/branches", group: GROUP_MAIN, priority: 0.7, changeFrequency: "monthly" },
  { label: "Blog & Tips", path: "/blog", group: GROUP_MAIN, priority: 0.7, changeFrequency: "weekly" },
  { label: "Gallery", path: "/gallery", group: GROUP_MAIN, priority: 0.6, changeFrequency: "monthly" },
  { label: "Help & FAQ", path: "/faq", group: GROUP_MAIN, priority: 0.6, changeFrequency: "monthly" },
  { label: "About Us", path: "/about", group: GROUP_MAIN, priority: 0.6, changeFrequency: "monthly" },
  { label: "HTML Sitemap", path: "/sitemap-html", group: GROUP_MAIN, priority: 0.3, changeFrequency: "monthly" },
];

const MOTORCYCLE_ENTRIES: SitemapEntry[] = [...MOTORCYCLES, ...MOPEDS].map((bike) => ({
  label: bike.name,
  path: vehicleHref(bike),
  group: GROUP_MOTORCYCLES,
  priority: 0.75,
  changeFrequency: "monthly",
  images: [vehicleImage(bike)],
}));

const SCOOTER_ENTRIES: SitemapEntry[] = SCOOTERS.map((scooter) => ({
  label: scooter.name,
  path: vehicleHref(scooter),
  group: GROUP_SCOOTERS,
  priority: 0.75,
  changeFrequency: "monthly",
  images: [vehicleImage(scooter)],
}));

const BLOG_ENTRIES: SitemapEntry[] = sortedPosts.map((post) => ({
  label: post.title,
  path: `/blog/${post.slug}`,
  group: GROUP_BLOG,
  priority: 0.55,
  changeFrequency: "monthly",
  lastModified: new Date(post.date),
  images: [post.cover],
}));

export const SITEMAP_GROUPS: SitemapGroup[] = [
  {
    title: GROUP_MAIN,
    description: "The main sections of the Zaidi TVS website.",
    entries: STATIC_ROUTES,
  },
  {
    title: GROUP_MOTORCYCLES,
    description: "Every TVS motorcycle and moped we sell in Chandpur.",
    entries: MOTORCYCLE_ENTRIES,
  },
  {
    title: GROUP_SCOOTERS,
    description: "TVS petrol and electric scooters available at the showroom.",
    entries: SCOOTER_ENTRIES,
  },
  {
    title: GROUP_BLOG,
    description: "Buying guides, finance explainers and maintenance tips.",
    entries: BLOG_ENTRIES,
  },
];

/** Flat list — static pages first, then models, then articles. */
export const SITEMAP_ENTRIES: SitemapEntry[] = SITEMAP_GROUPS.flatMap(
  (group) => group.entries,
);
