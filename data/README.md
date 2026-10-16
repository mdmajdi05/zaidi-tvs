# 📁 /data folder — Zaidi TVS ki saari information

**Sabse important file: [`site.ts`](./site.ts)** — yahan se poori website control hoti hai.

---

## Kaise use karein?

Sirf `site.ts` kholo aur value badal do. Save karo. Bas.
Header, Footer, Contact, Branches, Service, Offers, Reviews, FAQ, Gallery,
Blog, Chatbot, sitemap — **sab jagah apne aap update ho jayega.**

| Kya badalna hai | `site.ts` me kahan |
|---|---|
| Phone number | `CONTACT.phone` + `CONTACT.phoneHref` |
| WhatsApp number | `CONTACT.whatsapp` + `CONTACT.whatsappHref` |
| Address | `ADDRESS.line1 / line2 / city / state / postalCode` |
| Google Maps link | `MAPS_URL` + `MAP_EMBED_URL` |
| Opening hours | `HOURS` + `HOURS_SHORT` |
| Instagram / Facebook | `SOCIAL.instagram` / `SOCIAL.facebook` |
| Website ka naam / tagline / SEO | `SITE.*` |
| Home page ke counters (5k+ riders etc.) | `STATS` |
| Chatbot on/off + settings | `CHATBOT.*` |

**Production URL** (deploy se pehle, hosting panel me):
`NEXT_PUBLIC_SITE_URL = https://www.zaiditvs.in`

---
 
## SEO / Sitemap

SEO poori tarah centralised hai — kisi bhi page par metadata ya JSON-LD haath se
nahi likha jata. Details ke liye repo root ka [`SEO-CHECKLIST.md`](../SEO-CHECKLIST.md)
dekho.

| File | Kya hai |
|---|---|
| `src/lib/sitemap-data.ts` | **Sirf yahan** indexable routes ki list — XML sitemap + HTML sitemap dono isi se bante hain |
| `src/lib/seo/metadata.ts` | `createMetadata(...)` — title, canonical, robots, OG, Twitter |
| `src/lib/seo/schemas.ts` | JSON-LD builders (Organization, Product, FAQ, Breadcrumb, …) |
| `/sitemap.xml` + `/sitemap-html` | Google ke liye XML, users ke liye paginated HTML sitemap (Footer me link hai) |

Naya page banate waqt route ko `src/lib/sitemap-data.ts` me add karo — XML aur
HTML sitemap apne aap update ho jayenge.

---

## Baaki files (content)

| File | Kya hai |
|---|---|
| `catalog.ts` | Bikes, scooters, specs, prices, parts, product images |
| `offers.ts` | Finance schemes, festival offers, exchange steps, insurance |
| `reviews.ts` | Customer reviews + average rating |
| `posts.ts` | Blog articles |
| `faqs.ts` | FAQ groups + home page ke top FAQs |
| `branches.ts` | Showroom / Service / Parts counters (site.ts se info leta hai) |
| `spinFrames.ts` | 360° viewer ke frame paths |

> `src/lib/*.ts` me bas re-export shim hai — **wahan kuch edit na karein.**
> Asli data hamesha `/data` me hi hai.

---

## Chatbot (assistant)

`CHATBOT` config `data/site.ts` me hai:

- `enabled: true/false` → `enabled: false` karne par chatbot poori site se hat jayega.
- `provider: "builtin"` → free built-in assistant (kisi API key ki zaroorat nahi).
  Ye aap ke FAQ + offers + timing data se jawab deta hai aur WhatsApp par bhej deta hai.
- `provider: "servibot"` → ServiBot jaisa koi bhi vendor: `servibotKey` me key daal do.
- `provider: "custom"` → `customScript` me vendor ke widget ka script URL.
