import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { SITEMAP_ENTRIES, SITEMAP_PAGE_SIZE } from "@/lib/sitemap-data";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { SITE } from "@data/site";

/**
 * The HTML sitemap reads `searchParams` (the `?page=` number), so it is allowed
 * to block the first render.
 */
export const instant = false;

export const metadata: Metadata = createMetadata({
  title: "HTML Sitemap — All Pages",
  description:
    "Browse every page on the Zaidi TVS website in one place — TVS bikes, scooters, electric iQube, offers & finance, service, genuine parts, showroom details and blog guides for riders across India.",
  path: "/sitemap-html",
  keywords: [
    "Zaidi TVS sitemap",
    "TVS website all pages",
    "TVS showroom Chandpur pages",
  ],
});

const TOTAL = SITEMAP_ENTRIES.length;
const TOTAL_PAGES = Math.max(1, Math.ceil(TOTAL / SITEMAP_PAGE_SIZE));

/** Page 1 lives at the clean URL; later pages use `?page=N`. */
function pageHref(page: number): string {
  return page <= 1 ? "/sitemap-html" : `/sitemap-html?page=${page}`;
}

/** Compact page-number window (1 … 4 5 6 … 20). */
function paginationWindow(current: number, total: number): Array<number | "gap"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  const wanted = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...wanted].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  const output: Array<number | "gap"> = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) output.push("gap");
    output.push(page);
    previous = page;
  }
  return output;
}

export default async function SitemapHtmlPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsed = Number.parseInt(raw ?? "1", 10);
  const current = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, 1), TOTAL_PAGES)
    : 1;

  const start = (current - 1) * SITEMAP_PAGE_SIZE;
  const pageEntries = SITEMAP_ENTRIES.slice(start, start + SITEMAP_PAGE_SIZE);

  // Keep the page small: only the current slice is rendered and grouped.
  const groups: Array<{ title: string; entries: typeof pageEntries }> = [];
  for (const entry of pageEntries) {
    const last = groups[groups.length - 1];
    if (last && last.title === entry.group) {
      last.entries.push(entry);
    } else {
      groups.push({ title: entry.group, entries: [entry] });
    }
  }

  const pages = paginationWindow(current, TOTAL_PAGES);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "HTML Sitemap", url: "/sitemap-html" },
        ])}
      />
      <PageHero
        eyebrow="HTML SITEMAP"
        title="EVERY PAGE. ONE PLACE."
        subtitle={`All ${TOTAL} active pages on the ${SITE.name} website — organised by section so you can find any model, guide or service in a click.`}
      />

      <section className="page-section dark">
        <div className="section-head">
          <div className="eyebrow red">
             &nbsp; ALL PAGES · PAGE {current} OF {TOTAL_PAGES}
          </div>
          <h2
            style={{
              fontFamily: "Oswald, Arial, sans-serif",
              fontStyle: "italic",
              fontSize: 30,
              margin: 0,
            }}
          >
            BROWSE THE SITE
          </h2>
          <div className="sitemap-meta">
            <span>
              <b>{TOTAL}</b> active pages · showing <b>{pageEntries.length}</b> on
              this page (max {SITEMAP_PAGE_SIZE} per page)
            </span>
            <span>
              {SITE.name} · {SITE.city}, {SITE.state}, India
            </span>
          </div>
        </div>

        <nav className="sitemap-groups" aria-label="Sitemap sections">
          {groups.map((group) => (
            <div className="sitemap-group" key={group.title}>
              <div className="sitemap-group-head">
                <h2>{group.title}</h2>
                <span>{group.entries.length} links</span>
              </div>
              <ul className="sitemap-links">
                {group.entries.map((entry) => (
                  <li key={entry.path}>
                    <Link href={entry.path}>{entry.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {TOTAL_PAGES > 1 && (
          <nav className="sitemap-pagination" aria-label="Sitemap pagination">
            <Link
              className={`sitemap-page${current === 1 ? " is-disabled" : ""}`}
              href={pageHref(current - 1)}
              aria-disabled={current === 1}
              tabIndex={current === 1 ? -1 : undefined}
              rel="prev"
            >
               Prev
            </Link>

            {pages.map((item, index) =>
              item === "gap" ? (
                <span key={`gap-${index}`} className="sitemap-page is-disabled">
                  …
                </span>
              ) : (
                <Link
                  key={item}
                  className={`sitemap-page${item === current ? " is-current" : ""}`}
                  href={pageHref(item)}
                  aria-current={item === current ? "page" : undefined}
                >
                  {item}
                </Link>
              ),
            )}

            <Link
              className={`sitemap-page${current === TOTAL_PAGES ? " is-disabled" : ""}`}
              href={pageHref(current + 1)}
              aria-disabled={current === TOTAL_PAGES}
              tabIndex={current === TOTAL_PAGES ? -1 : undefined}
              rel="next"
            >
              Next →
            </Link>
          </nav>
        )}
      </section>
    </>
  );
}
