# SEO Checklist & Conventions — Zaidi TVS

This project follows the same centralised, data-driven SEO pattern used in the
`servchip` reference (documented in the sibling `negbuy-n` project):
**pages never hand-write metadata or raw JSON-LD** — they call a factory and a
schema builder. Everything is derived from `/data`, the single "database".

The site targets **India only** (`en_IN`, `addressCountry: "IN"`, `areaServed`
= India, an `AutoDealer`/`LocalBusiness` location schema).

## Where things live

| Concern | File |
|---------|------|
| Brand, domain, contact, address, hours, default title/description/keywords, OG image | `data/site.ts` |
| Metadata factory (title, canonical, robots, OG, Twitter) | `src/lib/seo/metadata.ts` |
| JSON-LD builders (Organization, WebSite, LocalBusiness/AutoDealer, Breadcrumb, Article, FAQ, ItemList, Service, ContactPage, Product, Reviews) | `src/lib/seo/schemas.ts` |
| Import surface | `src/lib/seo/index.ts` |
| **Single source of truth for every indexable route** | `src/lib/sitemap-data.ts` |
| Global Organization + WebSite JSON-LD, title template | `src/app/layout.tsx` |
| XML sitemap (derived from `SITEMAP_ENTRIES`, with image sitemap) | `src/app/sitemap.ts` |
| Human-readable, paginated sitemap | `src/app/sitemap-html/page.tsx` |
| robots.txt | `src/app/robots.ts` |
| Security / cache headers, image formats | `next.config.ts` |

## Rules

1. **Every indexable page exports `metadata` built with `createMetadata(...)`.**
   ```ts
   export const metadata: Metadata = createMetadata({
     title: "Our Company",   // no brand — the layout template appends "| Zaidi TVS"
     description: "…",
     path: "/about",          // drives canonical + og:url
   });
   ```
   Only the homepage passes `absolute: true`, because its title already carries
   the brand.

2. **Every indexable page adds a `BreadcrumbList`** via
   `breadcrumbSchema([...])`, and any visual breadcrumb must match it exactly.

3. **Add the right JSON-LD for the page type:**
   | Page | Schema |
   |------|--------|
   | All pages | `Organization` + `WebSite` (from layout) |
   | Home | `BreadcrumbList`, `FAQPage` |
   | Bikes / Scooters index | `BreadcrumbList`, `ItemList` |
   | Vehicle detail | `BreadcrumbList`, `Product` (+ `FAQPage`) |
   | Blog index | `BreadcrumbList`, `ItemList` of posts |
   | Blog post | `Article`, `BreadcrumbList` |
   | Contact | `BreadcrumbList`, `ContactPage` |
   | Service / Parts / Offers | `BreadcrumbList`, `Service` |
   | Reviews | `BreadcrumbList`, `Reviews` |
   | HTML sitemap | `BreadcrumbList` |

4. **JSON-LD is injected as a `<script>`** in the server page or via the
   `jsonLd()` helper:
   ```tsx
   <script type="application/ld+json" dangerouslySetInnerHTML={breadcrumbSchema([
     { name: "Home", url: "/" }, { name: "About", url: "/about" },
   ])} />
   ```

5. **Titles:** never include the brand in a page title (except the homepage).
   The root layout sets `title.template = "%s | Zaidi TVS"`.

6. **Canonical + OG + Twitter are automatic.** Never set them by hand — the
   factory derives canonical/og:url from `path` and uses the site OG image
   (`data/site.ts` → `SITE.ogImage`) unless an `image` is passed.

7. **`noindex` pages must set it in `createMetadata`** and be kept out of
   `src/lib/sitemap-data.ts`. `/ride` is the example (orphan page, `noindex`).

8. **The production URL is env-driven.** Set
   `NEXT_PUBLIC_SITE_URL = https://www.zaiditvs.in` in the hosting panel;
   canonical, OG, robots and every sitemap entry use it via `absoluteUrl()`.

## Adding a new page

1. Create `src/app/<route>/page.tsx` (server component).
2. `export const metadata = createMetadata({ title, description, path: "/<route>" })`.
3. Inject the page-type JSON-LD plus a `breadcrumbSchema` script.
4. **Add the route to `STATIC_ROUTES` in `src/lib/sitemap-data.ts`.** This one
   edit updates the XML sitemap, the HTML sitemap and its pagination — there is
   no second place to forget.
5. If the page is an orphan or should not be indexed, pass `noindex: true`
   instead and skip step 4.
6. Use `next/link` for internal links.

## Adding a model or a blog post

1. Bikes/scooters: append to `MOTORCYCLES` / `MOPEDS` / `SCOOTERS` in
   `data/catalog.ts` (or the relevant lib). Posts: append to `POSTS` in
   `data/posts.ts`.
2. Nothing else — `generateStaticParams`, `generateMetadata`, the XML sitemap,
   the HTML sitemap and the index pages all read from `/data`.

## The two sitemaps

- **`/sitemap.xml`** — `src/app/sitemap.ts`, generated from `SITEMAP_ENTRIES`,
  includes an image sitemap (`<image:loc>`).
- **`/sitemap-html`** — a human-readable index linked from the Footer (and the
  mobile drawer). It renders `SITEMAP_PAGE_SIZE` (200) links per page in a
  compact grid, grouped by section (Main Pages / Motorcycles & Mopeds /
  Scooters & Electric / Blog & Guides). Page 1 is the clean URL; later pages use
  `?page=N`. `export const instant = false` lets it read `searchParams`.

## Local check before shipping

```bash
npm run build                 # must be 0 errors; /robots.txt, /sitemap.xml, /sitemap-html
npx tsc --noEmit
npx eslint src data next.config.ts
```

Then confirm in the rendered HTML: `<link rel="canonical">`, `og:type/url/image`,
`twitter:card`, `name="robots"` where expected, and one `application/ld+json`
script per expected schema type.
