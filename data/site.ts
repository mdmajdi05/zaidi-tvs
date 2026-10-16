/* ============================================================================
 * ⭐  ZAIDI TVS — SIRF YEH EK FILE EDIT KARO  ⭐
 * ============================================================================
 *
 * Is file me business ki woh saari info hai jo poori website par use hoti hai:
 *   • Phone number / WhatsApp
 *   • Address / Google Maps
 *   • Opening hours (timings)
 *   • Social media links
 *   • Website ka naam, tagline, SEO description
 *   • Home page ke counters (stats)
 *   • Chatbot (assistant) ki settings
 *
 * Yahan value badlo → Header, Footer, Contact, Branches, Service, Offers,
 * Reviews, FAQ, Gallery, Blog, Chatbot, sitemap — sab me AUTOMATIC
 * reflect ho jayega. Kisi aur file ko chhune ki zaroorat nahi.
 *
 * ⚠️ Sirf itna dhyan rakho: text ko "quotes ke andar" hi rakhna hai.
 * ==========================================================================*/

/* ---------------------------------------------------------------------------
 * 1) WEBSITE KA ADDRESS (production URL)
 *    Deploy se pehle hosting wale panel me env variable set karo:
 *      NEXT_PUBLIC_SITE_URL = https://www.zaiditvs.in
 *    (Set na ho to localhost use hota hai — build phir bhi chalta hai.)
 * -------------------------------------------------------------------------*/
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
export const SITE_URL = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;

/* ---------------------------------------------------------------------------
 * 2) BRAND
 * -------------------------------------------------------------------------*/
export const SITE = {
  /** Dealership ka naam — header, footer, titles me aata hai. */
  name: "Zaidi TVS",
  /** Chhota naam (mobile/welcome text ke liye). */
  shortName: "Zaidi TVS",
  /** Legal / registered naam (schema.org Organization me). */
  legalName: "Zaidi TVS",
  /** Tagline. */
  tagline: "Your Ride. Your Style.",
  /** Footer me dikhne wala chhota parichay (2-3 lines). */
  about:
    "Zaidi TVS is your neighbourhood authorized TVS dealership in Chandpur — new bikes & scooters, genuine spare parts, expert servicing, finance, insurance and exchange, all under one roof.",
  /** Google / search description. */
  description:
    "Zaidi TVS, Chandpur — authorized TVS dealership for bikes, scooters, genuine spare parts, servicing, finance, insurance and exchange.",
  /**
   * Default <title> (home page) — brand + primary keyword + location.
   * Baaki pages ka title root layout ka "%s | Zaidi TVS" template use karta hai.
   */
  defaultTitle:
    "Zaidi TVS | Authorized TVS Showroom in Chandpur, Uttar Pradesh",
  /** Default meta description (India ke liye optimized). */
  defaultDescription:
    "Zaidi TVS is an authorized TVS showroom in Chandpur, Uttar Pradesh. Buy new TVS bikes & scooters (Apache, Raider, Ronin, Jupiter, Ntorq, iQube), get genuine spare parts, expert service, easy finance, insurance and exchange — all under one roof. Free test rides across India-friendly EMI plans.",
  /** Default keyword bank for pages that don't pass their own. */
  defaultKeywords: [
    "TVS showroom Chandpur",
    "TVS dealership Chandpur",
    "TVS bikes Chandpur",
    "TVS scooters Chandpur",
    "TVS Apache RTR",
    "TVS Raider 125",
    "TVS Ronin",
    "TVS Jupiter",
    "TVS Ntorq 125",
    "TVS iQube electric scooter",
    "TVS genuine spare parts Chandpur",
    "TVS service centre Chandpur",
    "TVS finance and EMI Chandpur",
    "TVS showroom Uttar Pradesh",
  ],
  /** SEO me use hota hai. */
  locale: "en_IN",
  /** Schema.org ke liye — desh India target karta hai. */
  country: "IN",
  city: "Chandpur",
  state: "Uttar Pradesh",
  region: "Uttar Pradesh",
  /** Default social share (OpenGraph/Twitter) image, site-root ke relative. */
  ogImage: "/assets/hero-bike.jpg",
  /** Organization logo (schema.org). */
  logo: "/Website_Logo/Transparent/ZAIDI_TVS_Logo_ZAIDI_White_TVS_Red_Transparent.png",
};

/* ---------------------------------------------------------------------------
 * 3) CONTACT — phone + WhatsApp
 *    phone      = jo customers ko screen par dikhta hai
 *    phoneHref  = click-to-call (spaces nahi hone chahiye)
 *    whatsapp   = country code ke saath, sirf digits
 * -------------------------------------------------------------------------*/
export const CONTACT = {
  phone: "+91 90090 10050",
  phoneHref: "tel:+919009010050",
  whatsapp: "919009010050",
  whatsappHref: "https://wa.me/919009010050",
  /** Email add karna ho to yahan likho (khaali chhodne par kahin nahi dikhega). */
  email: "",
};

/* ---------------------------------------------------------------------------
 * 4) ADDRESS + MAPS
 *    Map ke liye Google Maps par apni shop dhoondho, URL copy karke yahan
 *    paste kar do — "mapsQuery" (link) aur "mapEmbed" (website ke andar wala map).
 * -------------------------------------------------------------------------*/
export const ADDRESS = {
  line1: "Main Road",
  line2: "",
  city: "Chandpur",
  state: "Uttar Pradesh",
  postalCode: "",
  country: "India",
};

/** Poora address ek line me: "Main Road, Chandpur, Uttar Pradesh" */
export const ADDRESS_LINE = [
  ADDRESS.line1,
  ADDRESS.line2,
  ADDRESS.city,
  [ADDRESS.state, ADDRESS.postalCode].filter(Boolean).join(" "),
]
  .filter(Boolean)
  .join(", ");

/** "Get directions" button ka link. */
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Zaidi%20TVS%20Chandpur";

/** Website ke andar dikhne wala Google Map. */
export const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Zaidi+TVS+Chandpur&output=embed";

/* ---------------------------------------------------------------------------
 * 5) TIMINGS (opening hours)
 *    ⚠️ Order mat badlo: Monday pehle, Sunday sabse aakhir me.
 * -------------------------------------------------------------------------*/
export const HOURS: Array<{ day: string; time: string }> = [
  { day: "Monday", time: "10:00 AM – 8:00 PM" },
  { day: "Tuesday", time: "10:00 AM – 8:00 PM" },
  { day: "Wednesday", time: "10:00 AM – 8:00 PM" },
  { day: "Thursday", time: "10:00 AM – 8:00 PM" },
  { day: "Friday", time: "10:00 AM – 8:00 PM" },
  { day: "Saturday", time: "10:00 AM – 8:00 PM" },
  { day: "Sunday", time: "11:00 AM – 5:00 PM" },
];

/** Ek line wali timings (cards me dikhti hai). */
export const HOURS_SHORT = "Mon – Sat: 10:00 AM – 8:00 PM · Sun: 11:00 AM – 5:00 PM";

/* ---------------------------------------------------------------------------
 * 6) SOCIAL MEDIA
 *    Apna asli page URL daalo — khaali chhodne par link kahin nahi aayega.
 * -------------------------------------------------------------------------*/
export const SOCIAL = {
  instagram: "https://instagram.com/",
  facebook: "",
  youtube: "",
};

/* ---------------------------------------------------------------------------
 * 7) HOME PAGE KE COUNTERS
 * -------------------------------------------------------------------------*/
export const STATS: Array<{ value: string; label: string }> = [
  { value: "10+", label: "Years in Chandpur" },
  { value: "5k+", label: "Happy Riders" },
  { value: "15+", label: "TVS Models" },
  { value: "4.8★", label: "Customer Rating" },
];

/* ---------------------------------------------------------------------------
 * 8) CHATBOT (assistant — neeche wala floating chat bubble)
 *
 *    provider:
 *      "builtin"  → apna chatbot (free, API key ki zaroorat nahi).
 *      "servibot" → ServiBot jaisa vendor: servibotKey me apna key daalo.
 *      "custom"   → kisi bhi vendor ka script: customScript me URL daalo.
 *    enabled: false karne se chatbot poori website se hat jayega.
 * -------------------------------------------------------------------------*/
export const CHATBOT = {
  enabled: true,
  provider: "builtin" as "builtin" | "servibot" | "custom",
  title: "Zaidi TVS Assistant",
  subtitle: "Aam taur par turant jawab",
  greeting:
    "Namaste! 🙏 Main Zaidi TVS ka assistant hoon. Price, test ride, service, EMI ya timing — kuch bhi poochho, ya seedha WhatsApp par baat karo.",
  /** Chat khulne par dikhne wale quick options. */
  quickReplies: [
    "Aaj ka price / on-road price",
    "Free test ride book karni hai",
    "Service booking + pickup",
    "EMI / finance options",
    "Showroom timing & address",
  ],
  /** ServiBot (ya similar) key — sirf provider = "servibot" hone par chahiye. */
  servibotKey: "",
  /** Kisi bhi vendor widget ka <script src="..."> URL. */
  customScript: "",
};

/* ---------------------------------------------------------------------------
 * 9) HELPERS — inhe change karne ki zaroorat nahi
 * -------------------------------------------------------------------------*/

/** WhatsApp link with a pre-filled message: wa("Hello") */
export function wa(message?: string): string {
  return message
    ? `${CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`
    : CONTACT.whatsappHref;
}

/** Mailto link (email set ho tabhi). */
export function mailto(subject?: string): string {
  return `mailto:${CONTACT.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

/**
 * Absolute URL helper — "/blog" ko "https://www.zaiditvs.in/blog" banata hai.
 * Canonical URLs aur JSON-LD schema me har jagah use hota hai.
 */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
