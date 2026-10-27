/**
 * Zaidi TVS chat brain.
 *
 * A local, dependency-free assistant that reads the *whole* website data set
 * (models, offers, FAQs, branches, reviews) and answers like a salesperson:
 * first it works out what the visitor is asking (intent + model + context),
 * then it matches the right data and replies with useful next steps.
 *
 * No API key, no network calls. `ChatWidget.tsx` lazily calls `loadChatData()`
 * and then `replyTo()` for every message.
 */

import {
  ADDRESS_LINE,
  CONTACT,
  HOURS_SHORT,
  MAPS_URL,
  STATS,
  wa,
} from "@data/site";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ChatCtaKind = "whatsapp" | "call" | "map" | "link";

export type ChatCta = {
  label: string;
  href: string;
  kind: ChatCtaKind;
};

export type ChatReply = {
  text: string;
  ctas?: ChatCta[];
  suggestions?: string[];
};

export type ChatContext = {
  /** Slug of the last model the visitor asked about. */
  lastModel?: string;
  /** Last answered intent (used for gentle follow-ups). */
  lastIntent?: string;
  /** Number of bot answers so far. */
  turns?: number;
};

export type ChatVehicle = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  kind: "Motorcycle" | "Scooter" | "Electric" | "Moped";
  engine: string;
  power: string;
  mileage: string;
  weight: string;
  price?: string;
  desc: string;
  href: string;
};

export type ChatData = {
  vehicles: ChatVehicle[];
  faqs: Array<{ q: string; a: string; group: string }>;
  schemes: Array<{ title: string; rate: string; points: string[] }>;
  offers: Array<{ tag: string; title: string; text: string; valid: string }>;
  exchangeSteps: Array<{ title: string; text: string }>;
  insurance: Array<{ title: string; text: string }>;
  reviews: { rating: number; count: number };
  branches: Array<{
    id: string;
    name: string;
    kind: string;
    phone: string;
    note?: string;
  }>;
  doorstep: { title: string; text: string; steps: string[] };
};

/* -------------------------------------------------------------------------- */
/* Data loading (lazy — keeps the initial page light)                         */
/* -------------------------------------------------------------------------- */

export async function loadChatData(): Promise<ChatData> {
  const [catalog, faqs, offers, reviews, branches] = await Promise.all([
    import("@/lib/catalog"),
    import("@/lib/faqs"),
    import("@/lib/offers"),
    import("@/lib/reviews"),
    import("@/lib/branches"),
  ]);

  return {
    vehicles: catalog.BIKES.map((v) => ({
      slug: v.slug,
      name: v.name,
      shortName: v.shortName,
      tagline: v.tagline,
      kind: v.kind,
      engine: v.engine,
      power: v.power,
      mileage: v.mileage,
      weight: v.weight,
      price: v.price,
      desc: v.desc,
      href: catalog.vehicleHref(v),
    })),
    faqs: faqs.FAQ_GROUPS.flatMap((group) =>
      group.items.map((item) => ({ ...item, group: group.label }))
    ),
    schemes: offers.FINANCE_SCHEMES.map((s) => ({
      title: s.title,
      rate: s.rate,
      points: s.points,
    })),
    offers: offers.OFFERS.map((o) => ({
      tag: o.tag,
      title: o.title,
      text: o.text,
      valid: o.valid,
    })),
    exchangeSteps: offers.EXCHANGE_STEPS.map((s) => ({
      title: s.title,
      text: s.text,
    })),
    insurance: offers.INSURANCE.map((i) => ({
      title: i.title,
      text: i.text,
    })),
    reviews: {
      rating: reviews.AGGREGATE.rating,
      count: reviews.AGGREGATE.count,
    },
    branches: branches.BRANCHES.map((b) => ({
      id: b.id,
      name: b.name,
      kind: b.kind,
      phone: b.phone,
      note: b.note,
    })),
    doorstep: branches.DOORSTEP,
  };
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function norm(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘`]/g, "")
    .replace(/[^a-z0-9+]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Whole-word/phrase match score. Phrases are worth more than single words. */
function hit(q: string, keyword: string): number {
  const k = norm(keyword);
  if (!k) return 0;
  const padded = ` ${q} `;
  if (k.includes(" ")) return padded.includes(` ${k} `) ? 3 : 0;
  if (padded.includes(` ${k} `)) return 2;
  if (k.length >= 4 && padded.includes(` ${k}s `)) return 1;
  return 0;
}

function money(price?: string): string | null {
  if (!price) return null;
  const clean = price.replace(/^\s*[?₹]\s*/, "₹").replace(/\s+/g, " ").trim();
  return clean.startsWith("₹") ? clean : `₹${clean}`;
}

/** Strip the common `*` disclaimer for inline sentences. */
function plainPrice(price?: string): string | null {
  const m = money(price);
  return m ? m.replace(/\*$/, "") : null;
}

/* -------------------------------------------------------------------------- */
/* CTAs                                                                       */
/* -------------------------------------------------------------------------- */

const CALL_SALES: ChatCta = {
  label: `Call sales · ${CONTACT.salesPhone}`,
  href: CONTACT.salesPhoneHref,
  kind: "call",
};

const CALL_SERVICE: ChatCta = {
  label: `Call service · ${CONTACT.servicePhone}`,
  href: CONTACT.servicePhoneHref,
  kind: "call",
};

function waCta(label: string, message: string): ChatCta {
  return { label, href: wa(message), kind: "whatsapp" };
}

const MAP_CTA: ChatCta = {
  label: "Open Google Maps →",
  href: MAPS_URL,
  kind: "map",
};

function linkCta(label: string, href: string): ChatCta {
  return { label, href, kind: "link" };
}

const SALES_MESSAGE = "Hello Zaidi TVS! I have a question about a TVS model.";

/* -------------------------------------------------------------------------- */
/* Models & aliases                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Extra ways riders type each model. The catalogue name / shortName / slug are
 * always matched too, so this list only adds common misspellings and slang.
 */
const MODEL_ALIASES: Record<string, string[]> = {
  "apache-rtr-160": ["apache rtr 160", "apache 160", "rtr 160", "160 4v", "apache160", "rtr160"],
  "apache-rtr-180": ["apache rtr 180", "apache 180", "rtr 180", "180 4v", "apache180", "rtr180"],
  "apache-rtr-200": ["apache rtr 200", "apache 200", "rtr 200", "200 4v", "apache200", "rtr200"],
  "apache-rtr-310": ["apache rtr 310", "apache 310", "rtr 310", "apache310", "rtr310"],
  "apache-rr-310": ["apache rr 310", "rr 310", "rr310", "apache rr", "rr 300"],
  "apache-rtx-300": ["apache rtx 300", "rtx 300", "rtx300", "rtx", "apache rtx"],
  ronin: ["ronin", "tvs ronin", "modern retro"],
  raider: ["raider", "raider 125", "tvs raider"],
  radeon: ["radeon", "tvs radeon"],
  sport: ["tvs sport", "sport bike", "sport 110"],
  "star-city-plus": ["star city", "starcity", "star city plus", "star city +"],
  jupiter: ["jupiter", "tvs jupiter", "jupiter 110"],
  "jupiter-125": ["jupiter 125", "jupiter125", "new jupiter"],
  ntorq: ["ntorq", "ntorque", "ntorq 125", "ntorq125", "tvs ntorq"],
  "ntorq-150": ["ntorq 150", "ntorq150", "ntorque 150"],
  "zest-110": ["zest", "zest 110", "zest110", "tvs zest"],
  iqube: ["iqube", "i qube", "iqoob", "i cub", "tvs iqube"],
  orbiter: ["orbiter", "tvs orbiter"],
  "tvs-x": ["tvs x", "tvsx", "tvs x electric"],
  xl100: ["xl100", "xl 100", "tvs xl", "moped"],
};

function buildAliasIndex(data: ChatData): Map<string, string[]> {
  const index = new Map<string, string[]>();
  for (const vehicle of data.vehicles) {
    const aliases = new Set<string>([
      vehicle.name,
      vehicle.shortName,
      vehicle.slug.replace(/-/g, " "),
      ...(MODEL_ALIASES[vehicle.slug] ?? []),
    ]);
    index.set(
      vehicle.slug,
      [...aliases].map(norm).filter(Boolean)
    );
  }
  return index;
}

type ModelMatch = { slug: string; score: number; index: number; alias: string };

function detectModels(q: string, data: ChatData): ModelMatch[] {
  const index = buildAliasIndex(data);
  const padded = ` ${q} `;
  const compact = q.replace(/\s+/g, "");
  const found = new Map<string, ModelMatch>();

  for (const [slug, aliases] of index) {
    for (const alias of aliases) {
      let score = 0;
      if (alias.includes(" ")) {
        if (padded.includes(` ${alias} `)) score = alias.length + 10;
      } else if (padded.includes(` ${alias} `)) {
        score = alias.length + 4;
      } else if (alias.length >= 4 && /[0-9]/.test(alias) && compact.includes(alias)) {
        // "ntorq125", "rtr160" typed without a space.
        score = alias.length + 2;
      }
      if (!score) continue;
      const current = found.get(slug);
      if (!current || score > current.score) {
        found.set(slug, {
          slug,
          score,
          index: padded.indexOf(` ${alias}`),
          alias,
        });
      }
    }
  }

  // Apache shorthand: "apache 160 vs 180" / "apache 200 price". Only the
  // first variant is spelled out, so resolve the bare numbers too.
  if (hit(q, "apache")) {
    const hasRR = /\brr\b/.test(q);
    const variants: Record<string, string> = {
      "160": "apache-rtr-160",
      "180": "apache-rtr-180",
      "200": "apache-rtr-200",
      "310": "apache-rtr-310",
      "300": "apache-rtx-300",
    };
    for (const [number, slug] of Object.entries(variants)) {
      if (!padded.includes(` ${number} `) && !compact.includes(number)) continue;
      if (number === "310" && hasRR) continue;
      const existing = found.get(slug);
      const candidate: ModelMatch = {
        slug,
        score: 14,
        index: padded.indexOf(` ${number}`),
        alias: number,
      };
      if (!existing || candidate.score > existing.score) found.set(slug, candidate);
    }
  }

  const matches = [...found.values()].sort(
    (a, b) => a.index - b.index || b.score - a.score
  );

  // Drop a generic short match when a longer, more specific match covers it:
  // "Ntorq 150" should not also match the base Ntorq 125 via "ntorq".
  return matches.filter(
    (m) =>
      !matches.some(
        (other) =>
          other.slug !== m.slug &&
          other.alias !== m.alias &&
          other.alias.startsWith(`${m.alias} `) &&
          other.score > m.score
      )
  );
}

/* -------------------------------------------------------------------------- */
/* Intents                                                                    */
/* -------------------------------------------------------------------------- */

function byName(data: ChatData, slug?: string): ChatVehicle | undefined {
  if (!slug) return undefined;
  return data.vehicles.find((v) => v.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Intents                                                                    */
/* -------------------------------------------------------------------------- */

type IntentId =
  | "greeting"
  | "thanks"
  | "bye"
  | "price"
  | "emi"
  | "offers"
  | "testride"
  | "service"
  | "parts"
  | "exchange"
  | "insurance"
  | "documents"
  | "delivery"
  | "warranty"
  | "timings"
  | "address"
  | "contact"
  | "reviews"
  | "gallery"
  | "blog"
  | "about"
  | "electric"
  | "mileage"
  | "models"
  | "recommend"
  | "payments"
  | "specs"
  | "help";

type IntentRule = { id: IntentId; words: string[] };

/** Ordered roughly by conversational priority (used to break score ties). */
const INTENT_RULES: IntentRule[] = [
  {
    id: "greeting",
    words: ["hi", "hello", "hey", "namaste", "namaskar", "salam", "assalam", "salaam", "hola", "good morning", "good evening", "good afternoon"],
  },
  {
    id: "thanks",
    words: ["thank", "thanks", "thank you", "shukriya", "dhanyavad", "dhanyawad", "thanx", "thnx", "shukria"],
  },
  {
    id: "bye",
    words: ["bye", "goodbye", "good bye", "see you", "alvida", "khuda hafiz", "ok bye", "chalta hoon"],
  },
  {
    id: "timings",
    words: ["timing", "timings", "time", "hours", "open", "opening", "close", "closing", "khulta", "khulte", "band", "samay", "kitne baje", "kab khulta", "kab band", "sunday", "holiday", "chhutti"],
  },
  {
    id: "address",
    words: ["address", "location", "kahan", "where", "map", "maps", "direction", "directions", "pata", "jagah", "reach", "kaise pahuche", "landmark", "chandpur", "showroom", "showroom kahan", "dukan"],
  },
  {
    id: "contact",
    words: ["contact", "number", "phone", "call", "whatsapp", "mobile", "sales number", "service number", "baat karni", "talk to", "helpline", "customer care", "phone number"],
  },
  {
    id: "testride",
    words: ["test ride", "testride", "test-ride", "trial", "ride kar", "ride lena", "chala ke dekh", "chala kar dekh", "drive", "test drive", "book ride"],
  },
  {
    id: "price",
    words: ["price", "prices", "cost", "rate", "on road", "onroad", "ex showroom", "exshowroom", "kitna", "kitne", "keemat", "daam", "rupees", "how much", "budget", "kimat", "paise", "price list", "kitne ka"],
  },
  {
    id: "emi",
    words: ["emi", "finance", "financing", "loan", "installment", "instalment", "kist", "kisti", "down payment", "downpayment", "interest", "tenure", "bank", "nbfc", "udhaar", "finence", "finance calculator"],
  },
  {
    id: "offers",
    words: ["offer", "offers", "discount", "scheme", "deal", "bonus", "festive", "festival", "cashback", "sasta", "sale", "savings", "exchange offer", "running offer", "aaj ka offer"],
  },
  {
    id: "service",
    words: ["service", "servicing", "servis", "repair", "repairs", "workshop", "maintenance", "pickup", "pick up", "drop", "doorstep", "mechanic", "oil change", "periodic service", "servicing karana", "gaadi theek", "foam wash", "washing", "denting", "painting"],
  },
  {
    id: "parts",
    words: ["part", "parts", "spare", "spares", "spare part", "accessory", "accessories", "accesories", "helmet", "tyre", "tire", "battery", "engine oil", "genuine part", "modification", "mudguard", "mirror"],
  },
  {
    id: "exchange",
    words: ["exchange", "purani", "purana", "old bike", "old scooter", "trade in", "tradein", "bechna", "bech", "swap", "adjust", "old vehicle", "exchange value"],
  },
  {
    id: "insurance",
    words: ["insurance", "policy", "claim", "cover", "renewal", "premium", "bima", "insured", "accident"],
  },
  {
    id: "documents",
    words: ["document", "documents", "documentation", "aadhaar", "adhar", "pan card", "address proof", "paper", "papers", "paperwork", "licence", "license", "driving licence", "driving license", "rc book", "kagaz", "loan documents", "documents for loan", "finance documents"],
  },
  {
    id: "delivery",
    words: ["delivery", "deliver", "same day", "kitne din", "how long", "how many days", "registration", "rto", "registration number", "registration time", "temporary number", "temp number", "number plate", "waiting period", "ready stock", "kab milegi"],
  },
  {
    id: "warranty",
    words: ["warranty", "guarantee", "guaranty", "warranty period", "battery warranty", "extended warranty"],
  },
  {
    id: "reviews",
    words: ["review", "reviews", "rating", "feedback", "testimonial", "customers", "google rating", "log kya kehte", "acha hai kya", "trusted", "reputation"],
  },
  {
    id: "gallery",
    words: ["gallery", "photo", "photos", "picture", "pictures", "image", "images", "dekhu", "look", "colour", "color", "design", "showroom photo"],
  },
  {
    id: "blog",
    words: ["blog", "article", "articles", "news", "guide", "read", "latest news", "tips", "stories"],
  },
  {
    id: "about",
    words: ["about", "company", "who are you", "zaidi kya", "history", "story", "owner", "established", "since when", "years", "authorized", "dealership", "tum kaun"],
  },
  {
    id: "electric",
    words: ["electric", "ev", "iqube", "i qube", "charge", "charging", "charger", "running cost", "range", "zero emission", "orbiter", "tvs x", "battery scooter"],
  },
  {
    id: "mileage",
    words: ["mileage", "milage", "average", "avg", "kitna deti", "kitna deta", "km l", "kmpl", "fuel", "petrol", "consumption", "economy"],
  },
  {
    id: "models",
    words: ["model", "models", "kitne models", "range", "lineup", "line up", "gama", "kaunsi", "kaun kaun", "which bikes", "available", "kya kya hai", "list", "collection", "full range", "tvs", "scooter", "scooters", "scooty", "bike", "bikes", "motorcycle", "motorcycles", "moped"],
  },
  {
    id: "recommend",
    words: ["recommend", "recommendation", "suggest", "suggestion", "best", "which one", "konsi", "konsa", "kaunsi lu", "kaunsa lu", "kya lu", "ideal", "perfect", "beginner", "family", "college", "ladies", "short height", "tall", "daily commute", "commute"],
  },
  {
    id: "payments",
    words: ["payment", "payments", "pay", "cash", "card", "upi", "online payment", "booking amount", "advance", "full payment", "payment mode"],
  },
  {
    id: "specs",
    words: ["spec", "specs", "specification", "specifications", "engine", "cc", "power", "ps", "bhp", "torque", "weight", "features", "feature", "top speed", "suspension", "brakes", "abs", "details", "full details", "jankari"],
  },
  {
    id: "help",
    words: ["website", "site", "page", "link", "section", "where on site", "web", "online", "kya kar sakte", "help", "madad", "what can you do", "kya pooch sakta"],
  },
];

type ScoredIntent = { id: IntentId; score: number; order: number };

function scoreIntents(q: string): ScoredIntent[] {
  const rank = (intent: ScoredIntent) => (intent.id === "recommend" ? -1 : intent.order);
  return INTENT_RULES.map((rule, order) => {
    let score = 0;
    for (const word of rule.words) score += hit(q, word);
    return { id: rule.id, score, order };
  })
    .filter((i) => i.score > 0)
    .sort((a, b) => b.score - a.score || rank(a) - rank(b));
}

function topIntent(q: string): { id: IntentId | null; score: number } {
  const scored = scoreIntents(q);
  const best = scored[0];
  if (!best || best.score < 2) return { id: null, score: 0 };
  return { id: best.id, score: best.score };
}

/* -------------------------------------------------------------------------- */
/* FAQ fallback                                                               */
/* -------------------------------------------------------------------------- */

const STOPWORDS = new Set([
  "the", "and", "for", "you", "your", "are", "how", "what", "when", "where",
  "which", "can", "does", "did", "with", "from", "this", "that", "have", "has",
  "hai", "hain", "ka", "ki", "ke", "ko", "me", "mein", "se", "par", "aur",
  "kya", "kaun", "kaise", "kab", "kahan", "kitna", "kitne", "karna", "kar",
  "mujhe", "mera", "meri", "aap", "apna", "koi", "bhi", "to", "ho", "na",
]);

function tokens(value: string): string[] {
  return norm(value)
    .split(" ")
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

function bestFaq(q: string, data: ChatData): { q: string; a: string; score: number } | null {
  const qTokens = [...new Set(tokens(q))];
  if (!qTokens.length) return null;
  let best = { q: "", a: "", score: 0 };

  for (const faq of data.faqs) {
    const question = norm(faq.q);
    const answer = norm(faq.a);
    let score = 0;
    for (const token of qTokens) {
      if (question.includes(token)) score += 3;
      if (answer.includes(token)) score += 1;
    }
    if (score > best.score) best = { q: faq.q, a: faq.a, score };
  }

  const need = qTokens.length === 1 ? 3 : 4;
  return best.score >= need ? best : null;
}

/* -------------------------------------------------------------------------- */
/* Reply pieces                                                               */
/* -------------------------------------------------------------------------- */

function modelSummary(v: ChatVehicle): string {
  const price = plainPrice(v.price);
  const lines = [
    `${v.name}`,
    `${v.kind} · ${v.engine}${v.engine === "Electric" ? "" : " engine"} · ${v.power}`,
    `Mileage: ${v.mileage}`,
  ];
  if (price) lines.push(`Ex-showroom from ${price}*`);
  lines.push("", v.desc);
  return lines.join("\n");
}

function modelCtas(v: ChatVehicle): ChatCta[] {
  return [
    linkCta(`View ${v.shortName} page →`, v.href),
    waCta("WhatsApp price", `Hello Zaidi TVS! Please share the on-road price and offers for the ${v.name}.`),
    CALL_SALES,
  ];
}

function allModelsText(data: ChatData): string {
  const groups: Array<[string, string[]]> = [
    ["Motorcycles", []],
    ["Scooters", []],
    ["Electric", []],
    ["Moped", []],
  ];
  for (const v of data.vehicles) {
    const key =
      v.kind === "Motorcycle"
        ? "Motorcycles"
        : v.kind === "Moped"
          ? "Moped"
          : v.kind === "Electric"
            ? "Electric"
            : "Scooters";
    groups.find(([label]) => label === key)?.[1].push(v.shortName);
  }
  return groups
    .filter(([, items]) => items.length)
    .map(([label, items]) => `${label}:\n• ${items.join("\n• ")}`)
    .join("\n\n");
}

function compareReply(a: ChatVehicle, b: ChatVehicle): ChatReply {
  const priceA = plainPrice(a.price);
  const priceB = plainPrice(b.price);
  const rows = [
    `${a.shortName}  vs  ${b.shortName}`,
    "",
    `Engine — ${a.engine} vs ${b.engine}`,
    `Power — ${a.power} vs ${b.power}`,
    `Mileage — ${a.mileage} vs ${b.mileage}`,
    `Weight — ${a.weight} vs ${b.weight}`,
    `Price — ${priceA ? `${priceA}*` : "on request"} vs ${priceB ? `${priceB}*` : "on request"}`,
    "",
    `Quick take: ${a.shortName} — ${a.desc}`,
    `${b.shortName} — ${b.desc}`,
  ];
  return {
    text: rows.join("\n"),
    ctas: [
      waCta("Compare on WhatsApp", `Hello Zaidi TVS! Please compare the ${a.name} and ${b.name} — price, mileage and which one suits me.`),
      linkCta(`View ${a.shortName} →`, a.href),
      linkCta(`View ${b.shortName} →`, b.href),
    ],
    suggestions: ["Aaj ka on-road price", "Free test ride", "EMI options"],
  };
}

function recommendReply(q: string, data: ChatData): ChatReply {
  const wants = (words: string[]) => words.some((w) => hit(q, w) > 0);
  let picks: string[] = [];
  let reason = "";

  if (wants(["electric", "ev", "charge", "charging", "range"])) {
    picks = ["iqube", "orbiter", "tvs-x"];
    reason = "Electric chahiye — iQube sabse practical hai, Orbiter naya city option, aur TVS X performance electric.";
  } else if (wants(["family", "ladies", "aunty", "ghar", "wife", "scooty", "scooter"])) {
    picks = ["jupiter-125", "jupiter", "zest-110"];
    reason = "Family aur easy riding ke liye Jupiter 125 best hai — bada boot, comfortable seat aur smooth 125 cc engine.";
  } else if (wants(["mileage", "average", "petrol", "commute", "daily", "college", "student", "sasta"])) {
    picks = ["sport", "raider", "radeon"];
    reason = "Mileage aur daily running ke liye Sport/Radeon sabse frugal hain; thoda style chahiye to Raider 125.";
  } else if (wants(["sport", "fast", "power", "speed", "racing", "performance", "style"])) {
    picks = ["apache-rtr-200", "apache-rtr-310", "ntorq-150"];
    reason = "Performance aur street presence ke liye Apache RTR 200/310 ya Ntorq 150 — aapki riding style par depend karta hai.";
  } else if (wants(["highway", "tour", "touring", "long ride", "trip", "adventure", "off road"])) {
    picks = ["apache-rtx-300", "ronin", "apache-rtr-310"];
    reason = "Highway aur touring ke liye RTX 300 sabse comfortable hai; retro style chahiye to Ronin.";
  } else if (wants(["beginner", "new rider", "first bike", "pehli", "easy", "short"])) {
    picks = ["jupiter", "raider", "xl100"];
    reason = "Naye rider ke liye light aur easy controls — Jupiter scooter sabse simple, Raider 125 balanced bike, XL100 sabse halka.";
  } else if (wants(["budget", "cheap", "kam paisa", "under", "low price"])) {
    picks = ["sport", "radeon", "xl100"];
    reason = "Budget-friendly options — Sport, Radeon aur XL100, sabhi low running cost ke saath.";
  } else {
    picks = ["raider", "jupiter-125", "apache-rtr-200"];
    reason = "Sabse popular all-rounders — Raider 125, Jupiter 125 aur Apache RTR 200.";
  }

  const models = picks.map((slug) => byName(data, slug)).filter((v): v is ChatVehicle => Boolean(v));
  const lines = [reason, ""];
  for (const v of models) {
    const price = plainPrice(v.price);
    lines.push(`• ${v.name} — ${v.engine}, ${v.power}${price ? `, ${price}*` : ""}`);
  }
  lines.push("", "Apni daily running, height aur budget bata dein to main aur exact suggest kar dunga.");

  return {
    text: lines.join("\n"),
    ctas: [
      waCta("Get a personal recommendation", "Hello Zaidi TVS! Please suggest the best TVS model for me. My daily running, budget and height are:"),
      ...models.slice(0, 1).map((v) => linkCta(`View ${v.shortName} →`, v.href)),
    ],
    suggestions: models.slice(0, 4).map((v) => v.shortName),
  };
}

function clarifyReply(data: ChatData, reason = "Main aapka sawal theek se samajh nahi paya."): ChatReply {
  return {
    text: `${reason}\n\nAap in me se koi cheez poochh sakte hain — main pura jawab dunga.`,
    ctas: [waCta("Ask on WhatsApp", "Hello Zaidi TVS! I have a question:")],
    suggestions: [
      "Saare TVS models",
      "Free test ride",
      "EMI / finance",
      "Service booking",
      "Showroom timing & address",
      "Aaj ke offers",
    ],
  };
}

/* -------------------------------------------------------------------------- */
/* Model-specific answers                                                     */
/* -------------------------------------------------------------------------- */

function modelReply(
  intent: IntentId | null,
  v: ChatVehicle,
  data: ChatData
): ChatReply {
  const price = plainPrice(v.price);

  switch (intent) {
    case "price":
      return {
        text: [
          `${v.name} ka price`,
          price
            ? `Ex-showroom from ${price}* (indicative).`
            : "Ex-showroom price model/variant par depend karta hai — WhatsApp par exact bhej denge.",
          "On-road price me registration, insurance aur accessories add hote hain. Aaj ka final breakup aur running offers ke liye message karein.",
        ].join("\n"),
        ctas: [
          waCta("Get on-road price", `Hello Zaidi TVS! Please share the on-road price and current offers for the ${v.name}.`),
          CALL_SALES,
          linkCta(`View ${v.shortName} page →`, v.href),
        ],
        suggestions: ["EMI kitni hogi?", "Test ride book karni hai", "Exchange value"],
      };

    case "emi":
      return {
        text: [
          `${v.name} ke liye finance available hai.`,
          `Ex-showroom${price ? ` ${price}*` : ""} par bank/NBFC se loan ho jata hai.`,
          "Low down payment, flexible tenure (48 months tak) aur quick approval. Exact EMI monthly budget ke hisaab se banegi.",
        ].join("\n"),
        ctas: [
          waCta("Calculate my EMI", `Hello Zaidi TVS! Please tell me the EMI options for the ${v.name}. My down payment budget is:`),
          linkCta("Open finance calculator →", "/#finance"),
          CALL_SALES,
        ],
        suggestions: ["Down payment kitna?", "Documents for loan", "Aaj ke offers"],
      };

    case "mileage":
      return {
        text: [
          `${v.name} ki claimed mileage: ${v.mileage}.`,
          "Real-world mileage riding style, traffic aur maintenance par depend karti hai.",
          v.kind === "Electric"
            ? "Electric hone ki wajah se petrol kharch zero — charging cost petrol se kaafi kam hai."
            : "Regular servicing aur correct tyre pressure se best average milti hai.",
        ].join("\n"),
        ctas: [linkCta(`View ${v.shortName} →`, v.href), waCta("Ask about real mileage", `Hello Zaidi TVS! What real-world mileage do owners get on the ${v.name}?`)],
        suggestions: ["Service booking", "Aaj ka price", "Test ride"],
      };

    case "electric":
      return {
        text: [
          `${v.name} — electric details`,
          `• Range: ${v.mileage}`,
          `• Motor: ${v.power}`,
          `• Weight: ${v.weight}`,
          "",
          "Ghar ke normal 5A socket se charge hota hai — koi special wiring nahi chahiye.",
          "Petrol kharch zero, aur engine oil/filter ki maintenance bhi nahi. Charging cost petrol se kaafi kam padti hai.",
        ].join("\n"),
        ctas: [
          waCta("EV details", `Hello Zaidi TVS! I want details about the ${v.name}.`),
          linkCta(`View ${v.shortName} →`, v.href),
          CALL_SALES,
        ],
        suggestions: ["Aaj ka price", "Range kitni hai?", "Test ride", "Battery warranty"],
      };

    case "specs":
      return {
        text: [
          `${v.name} — full details`,
          `• Type: ${v.kind}`,
          `• Engine: ${v.engine}`,
          `• Power: ${v.power}`,
          `• Mileage: ${v.mileage}`,
          `• Weight: ${v.weight}`,
          price ? `• Ex-showroom: ${price}*` : "• Price: on request",
          "",
          v.desc,
        ].join("\n"),
        ctas: [linkCta(`Full ${v.shortName} specs →`, v.href), waCta("Ask a question", `Hello Zaidi TVS! I have a question about the ${v.name}.`)],
        suggestions: ["Aaj ka price", "Mileage kitni hai?", "Test ride"],
      };

    case "testride":
      return {
        text: [
          `${v.name} ka free test ride Chandpur showroom par available hai.`,
          `Timings: ${HOURS_SHORT}.`,
          "Sirf valid driving licence saath laaiye — slot WhatsApp par book kar sakte hain.",
        ].join("\n"),
        ctas: [
          waCta("Book test ride", `Hello Zaidi TVS! I want to book a free test ride of the ${v.name}.`),
          CALL_SALES,
          MAP_CTA,
        ],
        suggestions: ["Aaj ka price", "EMI options", "Exchange value"],
      };

    case "service":
      return {
        text: [
          `${v.name} ki servicing hamare in-house workshop me hoti hai.`,
          "Genuine TVS parts, trained technicians, transparent estimate aur free doorstep pickup/drop available hai.",
          `Service desk: ${CONTACT.servicePhone}.`,
        ].join("\n"),
        ctas: [
          waCta("Book service", `Hello Zaidi TVS! I want to book a service for my ${v.name}.`),
          CALL_SERVICE,
        ],
        suggestions: ["Service pickup", "Parts & accessories", "Service timing"],
      };

    case "insurance":
      return {
        text: [
          `${v.name} ke saath new insurance delivery par arrange ho jata hai.`,
          "Renewal reminders, claim paperwork aur workshop coordination — sab yahin se ho jata hai.",
        ].join("\n"),
        ctas: [waCta("Insurance help", `Hello Zaidi TVS! I need insurance help for the ${v.name}.`), CALL_SALES],
        suggestions: ["On-road price breakup", "Documents needed"],
      };

    case "offers":
      return {
        text: [
          `${v.name} par current offers aur benefits ke liye WhatsApp karein.`,
          "Festive bonus, free first service, accessory pack aur exchange benefit — availability model aur date par depend karti hai.",
        ].join("\n"),
        ctas: [
          waCta("Check today's offer", `Hello Zaidi TVS! What offers are running on the ${v.name} today?`),
          CALL_SALES,
        ],
        suggestions: ["EMI options", "Exchange value", "Test ride"],
      };

    case "exchange":
      return {
        text: [
          `Purani gaadi (kisi bhi brand) exchange karke ${v.name} le sakte hain.`,
          "Free evaluation, fair market-value quote aur RC/transfer paperwork hum handle karte hain.",
        ].join("\n"),
        ctas: [waCta("Get exchange value", `Hello Zaidi TVS! I want to exchange my old vehicle for the ${v.name}.`), CALL_SALES],
        suggestions: ["Evaluation kaise hota hai?", "Aaj ka price", "EMI options"],
      };

    case "timings":
    case "address":
    case "contact":
      return generalReply(intent, data);

    default:
      return {
        text: modelSummary(v),
        ctas: modelCtas(v),
        suggestions: [
          "Aaj ka on-road price",
          "EMI kitni hogi?",
          "Mileage kitni hai?",
          "Test ride book karni hai",
        ],
      };
  }
}

/* -------------------------------------------------------------------------- */
/* General (no model) answers                                                 */
/* -------------------------------------------------------------------------- */

function generalReply(intent: IntentId, data: ChatData): ChatReply {
  switch (intent) {
    case "timings":
      return {
        text: [
          "Showroom timings:",
          `${HOURS_SHORT}.`,
          "Sales aur service counter dono inhi hours me khulte hain.",
          "",
          `Address: ${ADDRESS_LINE}.`,
        ].join("\n"),
        ctas: [MAP_CTA, CALL_SALES],
        suggestions: ["Directions bhejo", "Sales number", "Service number"],
      };

    case "address":
      return {
        text: [
          "Zaidi TVS, Chandpur",
          ADDRESS_LINE,
          "",
          `Timings: ${HOURS_SHORT}.`,
          "Gajraula Road par 1 km milestone ke paas — test ride ke liye seedha aa sakte hain.",
        ].join("\n"),
        ctas: [MAP_CTA, CALL_SALES],
        suggestions: ["Showroom timing", "Sales number", "Test ride book"],
      };

    case "contact":
      return {
        text: [
          "Aap humse is tarah baat kar sakte hain:",
          `• Sales & test rides: ${CONTACT.salesPhone}`,
          `• Service & spare parts: ${CONTACT.servicePhone}`,
          "• WhatsApp: same service number par message karein.",
          "",
          `Timings: ${HOURS_SHORT}.`,
        ].join("\n"),
        ctas: [CALL_SALES, CALL_SERVICE, waCta("Chat on WhatsApp", SALES_MESSAGE)],
        suggestions: ["Showroom address", "Aaj ka price", "Service booking"],
      };

    case "price":
      return {
        text: [
          "Price model aur variant par depend karta hai — main exact on-road price bata sakta hoon.",
          "Aap kaun sa model dekh rahe hain? Ya apna budget bata dein, main options suggest kar dunga.",
          "",
          "Note: ex-showroom price ke upar registration, insurance aur accessories add hote hain.",
        ].join("\n"),
        ctas: [
          waCta("Get price list", "Hello Zaidi TVS! Please share the latest price list."),
          CALL_SALES,
          linkCta("See all models →", "/#ride"),
        ],
        suggestions: ["Raider 125 ka price", "Jupiter 125 ka price", "Apache 160 ka price", "Budget me options"],
      };

    case "emi":
      return {
        text: [
          "Finance / EMI available hai:",
          ...data.schemes.slice(0, 3).map((s) => `• ${s.title} — ${s.rate}`),
          "",
          "Low down payment, 48 months tak tenure aur quick approval. Kisi bhi model ke liye exact EMI calculate kar sakte hain.",
        ].join("\n"),
        ctas: [
          waCta("Calculate my EMI", "Hello Zaidi TVS! Please help me with EMI / finance. My budget is:"),
          linkCta("Open finance calculator →", "/#finance"),
          CALL_SALES,
        ],
        suggestions: ["Down payment kitna?", "Documents for loan", "Aaj ke offers"],
      };

    case "offers": {
      const top = data.offers.slice(0, 4);
      return {
        text: [
          "Abhi ke offers (indicative):",
          ...top.map((o) => `• ${o.title} — ${o.text}`),
          "",
          "Exact running offer aaj ke date aur model par depend karta hai — WhatsApp par confirm kar lein.",
        ].join("\n"),
        ctas: [
          waCta("Check today's offers", "Hello Zaidi TVS! What offers are running right now?"),
          CALL_SALES,
          linkCta("See all offers →", "/offers"),
        ],
        suggestions: ["Festive bonus", "Exchange offer", "EMI options"],
      };
    }

    case "testride":
      return {
        text: [
          "Bilkul! Free test ride available hai — most models par, during showroom hours.",
          `Timings: ${HOURS_SHORT}.`,
          "Sirf valid driving licence laaiye. Slot pehle book kar lein to waiting nahi hogi.",
        ].join("\n"),
        ctas: [
          waCta("Book a free test ride", "Hello Zaidi TVS! I want to book a free test ride."),
          CALL_SALES,
          MAP_CTA,
        ],
        suggestions: ["Kaunse models available?", "Showroom timing", "Aaj ka price"],
      };

    case "service":
      return {
        text: [
          "Service, repair aur genuine spare parts — sab ek hi counter par.",
          "",
          data.doorstep.text,
          "",
          `Service desk: ${CONTACT.servicePhone}.`,
        ].join("\n"),
        ctas: [
          waCta("Book service", "Hello Zaidi TVS! I want to book a service. My vehicle and address:"),
          CALL_SERVICE,
          linkCta("Service page →", "/service"),
        ],
        suggestions: ["Doorstep pickup", "Genuine parts", "Service timing & address"],
      };

    case "parts":
      return {
        text: [
          "Genuine TVS spare parts aur accessories available hain —",
          "• Engine oil, filters, brake pads, chain sets",
          "• Batteries, tyres, mirrors, guards, mats",
          "• Helmets aur safety gear",
          "",
          "Model ka naam bata dein to availability aur price confirm kar dunga.",
        ].join("\n"),
        ctas: [
          waCta("Ask for a part", "Hello Zaidi TVS! I need a spare part / accessory for my TVS:"),
          CALL_SERVICE,
          linkCta("Parts & accessories →", "/parts"),
        ],
        suggestions: ["Helmet available?", "Battery price", "Service booking"],
      };

    case "exchange":
      return {
        text: [
          "Purani gaadi exchange karna easy hai:",
          ...data.exchangeSteps.map((s, i) => `${i + 1}. ${s.title} — ${s.text}`),
        ].join("\n"),
        ctas: [
          waCta("Get exchange value", "Hello Zaidi TVS! I want to exchange my old vehicle."),
          CALL_SALES,
        ],
        suggestions: ["Aaj ka price", "EMI options", "Test ride"],
      };

    case "insurance":
      return {
        text: [
          "Insurance support:",
          ...data.insurance.map((i) => `• ${i.title} — ${i.text}`),
        ].join("\n"),
        ctas: [waCta("Insurance help", "Hello Zaidi TVS! I need insurance help."), CALL_SALES],
        suggestions: ["Renewal kaise karu?", "Claim process", "On-road price breakup"],
      };

    case "documents":
      return {
        text: [
          "Two-wheeler kharidne ke liye aam taur par:",
          "• ID proof (Aadhaar)",
          "• Address proof",
          "• Passport-size photograph",
          "",
          "Finance me bank details aur thode extra documents lag sakte hain. Hum exact checklist bata dete hain.",
        ].join("\n"),
        ctas: [waCta("Ask document checklist", "Hello Zaidi TVS! What documents do I need to buy a two-wheeler?"), CALL_SALES],
        suggestions: ["Loan documents", "Registration process", "Delivery time"],
      };

    case "delivery":
      return {
        text: [
          "Delivery aur registration:",
          "• Ready stock + full payment par often same-day delivery.",
          "• Finance ya registration involve ho to kuch working days lag sakte hain.",
          "• RTO paperwork hum handle karte hain; temporary number par ride kar sakte hain.",
        ].join("\n"),
        ctas: [waCta("Check delivery date", "Hello Zaidi TVS! When can I get delivery of my new TVS?"), CALL_SALES],
        suggestions: ["Documents needed", "Registration process", "Aaj ka price"],
      };

    case "warranty":
      return {
        text: [
          "Har naye TVS par manufacturer warranty milti hai.",
          "Battery (electric) aur extended warranty ki exact coverage model aur year par depend karti hai — hum current terms confirm kar denge.",
          "Warranty ke andar repairs genuine parts se hamare workshop me hote hain.",
        ].join("\n"),
        ctas: [waCta("Ask warranty details", "Hello Zaidi TVS! Please share warranty details."), CALL_SERVICE],
        suggestions: ["Extended warranty", "Service booking", "iQube battery warranty"],
      };

    case "reviews":
      return {
        text: [
          `${data.reviews.rating}★ average rating · ${data.reviews.count}+ happy riders.`,
          "Riders hamare yahan test ride, transparent pricing, finance support aur service ke liye aate hain — aur wapas aate hain.",
          "Google par reviews dekh sakte hain ya showroom par khud aa kar experience le sakte hain.",
        ].join("\n"),
        ctas: [linkCta("Read customer reviews →", "/reviews"), MAP_CTA],
        suggestions: ["Showroom address", "Test ride book", "Aaj ka price"],
      };

    case "gallery":
      return {
        text: [
          "Showroom, models aur delivery moments ki photos gallery me hain.",
          "Kisi specific model ke colours ya look dekhne hain to uska naam bata dein.",
        ].join("\n"),
        ctas: [linkCta("Open gallery →", "/gallery"), MAP_CTA],
        suggestions: ["Apache ki photos", "Jupiter 125 photos", "Showroom photos"],
      };

    case "blog":
      return {
        text: [
          "Blog me buying guides, service tips aur TVS model comparisons milte hain.",
          "Koi specific topic chahiye to bata dein — main sahi article bhej dunga.",
        ].join("\n"),
        ctas: [linkCta("Read the blog →", "/blog")],
        suggestions: ["Buying guide", "Service tips", "Best scooter"],
      };

    case "about":
      return {
        text: [
          "Zaidi TVS ek authorized TVS dealership hai — Chandpur, District Bijnor (UP) me.",
          "Family-run showroom, complete TVS range, genuine spare parts, in-house workshop aur finance/exchange support.",
          "",
          `• ${STATS[0].value} ${STATS[0].label}`,
          `• ${STATS[1].value} ${STATS[1].label}`,
          `• ${STATS[2].value} ${STATS[2].label}`,
          `• ${STATS[3].value} ${STATS[3].label}`,
          "",
          `Address: ${ADDRESS_LINE}.`,
        ].join("\n"),
        ctas: [linkCta("About Zaidi TVS →", "/about"), MAP_CTA],
        suggestions: ["Showroom timing", "Customer reviews", "TVS models"],
      };

    case "electric": {
      const electrics = data.vehicles.filter((v) => v.kind === "Electric");
      return {
        text: [
          "Electric options available:",
          ...electrics.map((v) => `• ${v.name} — ${v.mileage}, ${v.power}`),
          "",
          "Ghar ke normal 5A socket se charge hote hain. Petrol se running cost kaafi kam, aur engine oil/filter kharch nahi.",
          "Battery warranty aur charging setup ke liye hum guide kar denge.",
        ].join("\n"),
        ctas: [
          waCta("iQube details", "Hello Zaidi TVS! I want details about the TVS iQube."),
          linkCta("iQube page →", "/scooters/iqube"),
          CALL_SALES,
        ],
        suggestions: electrics.slice(0, 3).map((v) => v.shortName).concat(["Charging kaise hoti hai?"]),
      };
    }

    case "mileage":
      return {
        text: [
          "Mileage sabse zyada chahiye to:",
          "• TVS Sport — up to 70 km/l*",
          "• Star City+ — up to 70 km/l*",
          "• Raider 125 — up to 67 km/l*",
          "• Radeon — up to 65 km/l*",
          "",
          "Scooters me Jupiter 125 ~57 km/l* aur Zest 110 ~62 km/l* dete hain.",
          "Electric chahiye to iQube ~145 km/charge* — petrol kharch zero.",
        ].join("\n"),
        ctas: [linkCta("See all models →", "/#ride"), waCta("Best mileage for me", "Hello Zaidi TVS! Which TVS model gives the best mileage for my daily running?")],
        suggestions: ["Sport ka price", "Raider 125", "iQube details"],
      };

    case "models":
      return {
        text: ["Hamare paas ye TVS range available hai:", "", allModelsText(data)].join("\n"),
        ctas: [linkCta("Browse bikes →", "/#ride"), linkCta("Browse scooters →", "/scooters"), CALL_SALES],
        suggestions: ["Aaj ka price list", "Best for family", "Electric models"],
      };

    case "recommend":
      return recommendReply("", data);

    case "payments":
      return {
        text: [
          "Payment options:",
          "• Cash, card aur UPI — showroom par.",
          "• Finance/EMI se purchase — bank ya NBFC ke through.",
          "• Booking ke liye chhota advance, baaki delivery par.",
          "",
          "Exact booking amount model par depend karta hai; hum receipt ke saath sab clear rakhte hain.",
        ].join("\n"),
        ctas: [CALL_SALES, waCta("Payment question", "Hello Zaidi TVS! I have a question about payment / booking amount.")],
        suggestions: ["EMI options", "Aaj ka price", "Test ride"],
      };

    case "specs":
      return {
        text: [
          "Kis model ki details chahiye?",
          "Main engine, power, mileage, features aur price — sab bata dunga.",
        ].join("\n"),
        ctas: [linkCta("See all models →", "/#ride")],
        suggestions: ["Apache RTR 200 details", "Jupiter 125 details", "iQube details"],
      };

    case "help":
      return {
        text: [
          "Main Zaidi TVS ka assistant hoon. Aap mujhse poochh sakte hain:",
          "• Models, on-road price aur EMI",
          "• Test ride booking aur offers",
          "• Service, pickup aur spare parts",
          "• Exchange, insurance aur documents",
          "• Showroom timing, address aur numbers",
          "",
          "Bas apna sawal normal language me likh dein — main samajh kar jawab dunga.",
        ].join("\n"),
        suggestions: [
          "Saare TVS models",
          "Free test ride",
          "EMI / finance",
          "Service booking",
          "Showroom timing & address",
        ],
      };

    default:
      return clarifyReply(data);
  }
}

/* -------------------------------------------------------------------------- */
/* Main entry point                                                           */
/* -------------------------------------------------------------------------- */

export function replyTo(raw: string, ctx: ChatContext, data: ChatData): ChatReply {
  const q = norm(raw);
  const rawClean = raw.trim();

  if (!q) return clarifyReply(data, "Sawal khaali hai.");

  ctx.turns = (ctx.turns ?? 0) + 1;

  // Greetings / thanks / bye — only when the message is *just* that.
  const onlyRule = (index: number) => {
    const allowed = new Set(
      INTENT_RULES[index].words.flatMap((w) => norm(w).split(" ")).filter(Boolean)
    );
    return q.split(" ").every((word) => allowed.has(word));
  };

  if (q.length <= 24 && q.split(" ").length <= 3 && onlyRule(0)) {
    return {
      text: [
        "Namaste! 🙏 Main Zaidi TVS assistant hoon.",
        "Price, test ride, EMI, service ya showroom timing — kya jaanna chahenge?",
      ].join("\n"),
      suggestions: [
        "Saare TVS models",
        "Free test ride",
        "EMI / finance",
        "Service booking",
        "Showroom timing & address",
      ],
    };
  }
  if (q.split(" ").length <= 3 && onlyRule(1)) {
    return {
      text: "Aapka swagat hai! 🙏 Koi aur sawal ho to zaroor poochhiye — main yahin hoon.",
      suggestions: ["Aaj ka price", "Test ride", "Service booking"],
      ctas: [waCta("Chat on WhatsApp", SALES_MESSAGE)],
    };
  }
  if (q.split(" ").length <= 3 && onlyRule(2)) {
    return {
      text: "Shukriya! Zaidi TVS se baat karke aapka din shubh ho. Ride safe! 🏍️",
      suggestions: ["Showroom timing", "Call sales", "WhatsApp"],
      ctas: [CALL_SALES],
    };
  }

  if (/^(haan|han|yes|ok|okay|acha|achha|theek|thik|hmm|hm)$/.test(q)) {
    return {
      text: "Theek hai! 🙌 Aap kya jaanna chahenge — model, price, test ride, EMI ya service?",
      suggestions: [
        "Aaj ka price",
        "Free test ride",
        "EMI / finance",
        "Service booking",
        "Showroom timing",
      ],
    };
  }

  const matched = detectModels(q, data);

  // Two or more models mentioned → compare.
  if (matched.length >= 2) {
    const a = byName(data, matched[0].slug);
    const b = byName(data, matched[1].slug);
    if (a && b) {
      ctx.lastModel = b.slug;
      ctx.lastIntent = "compare";
      return compareReply(a, b);
    }
  }

  let vehicle = matched.length === 1 ? byName(data, matched[0].slug) : undefined;
  let intent = topIntent(q).id;

  // "loan ke liye documents?" is a documents question even though it also
  // scores as finance.
  if (intent === "emi" && hit(q, "document") > 0) intent = "documents";

  // "Apache" without a variant, or "Apache vs Ronin" → list the Apache range
  // so the visitor can pick the exact model instead of guessing.
  const apacheNamed = hit(q, "apache") > 0;
  const apacheMatched = matched.some((m) => m.slug.startsWith("apache"));
  if (apacheNamed && !apacheMatched) {
    const apaches = data.vehicles.filter((v) => v.slug.startsWith("apache"));
    return {
      text: [
        "Apache family me ye models hain:",
        ...apaches.map((v) => `• ${v.name} — ${v.engine}, ${v.power}`),
        "",
        "Kaun sa Apache dekh rahe hain? Main uska price aur details bata dunga.",
      ].join("\n"),
      suggestions: apaches.slice(0, 5).map((v) => v.shortName),
      ctas: [
        waCta("Ask about Apache", "Hello Zaidi TVS! I'm interested in a TVS Apache."),
        linkCta("Browse Apache models →", "/#ride"),
      ],
    };
  }

  // Follow-up: "iska price?", "mileage?", "service?" → use the last model.
  if (!vehicle && ctx.lastModel) {
    const wantsFollowUp =
      intent === "price" ||
      intent === "mileage" ||
      intent === "emi" ||
      intent === "specs" ||
      intent === "testride" ||
      intent === "service" ||
      intent === "offers" ||
      intent === "insurance" ||
      intent === "exchange" ||
      /\b(iska|uska|iske|uske|isme|usme|batao|bata do|aur)\b/.test(q);
    if (wantsFollowUp) vehicle = byName(data, ctx.lastModel);
  }

  if (vehicle) {
    const resolved: IntentId | null = intent === "models" || intent === "recommend" ? null : intent;
    ctx.lastModel = vehicle.slug;
    ctx.lastIntent = resolved ?? "overview";
    return modelReply(resolved, vehicle, data);
  }

  // No specific model, but a family was named → ask which one (or list them).
  const family = familyIntent(q);
  if (family) {
    if (family === "ntorq") {
      const ntorqs = data.vehicles.filter((v) => v.slug.startsWith("ntorq"));
      return {
        text: [
          "Ntorq ke do options hain:",
          ...ntorqs.map((v) => `• ${v.name} — ${v.engine}, ${v.power}, ${v.mileage}`),
          "125 daily riding ke liye balanced hai; 150 zyada performance deta hai.",
        ].join("\n"),
        suggestions: ntorqs.map((v) => v.shortName),
        ctas: [waCta("Compare Ntorq 125 vs 150", "Hello Zaidi TVS! Please compare the Ntorq 125 and Ntorq 150.")],
      };
    }
    if (family === "jupiter") {
      const jupiters = data.vehicles.filter((v) => v.slug.startsWith("jupiter"));
      return {
        text: [
          "Jupiter ke do options hain:",
          ...jupiters.map((v) => `• ${v.name} — ${v.engine}, ${v.power}, ${v.mileage}`),
          "Jupiter 125 me zyada power aur bada boot hai; base Jupiter budget-friendly hai.",
        ].join("\n"),
        suggestions: jupiters.map((v) => v.shortName),
        ctas: [waCta("Compare Jupiter models", "Hello Zaidi TVS! Please compare the Jupiter and Jupiter 125.")],
      };
    }
  }

  // Intent-driven general answers.
  if (intent && intent !== "models" && intent !== "recommend") {
    ctx.lastIntent = intent;
    return generalReply(intent, data);
  }
  if (intent === "recommend") {
    ctx.lastIntent = "recommend";
    return recommendReply(q, data);
  }
  if (intent === "models") {
    ctx.lastIntent = "models";
    return generalReply("models", data);
  }

  // FAQ fuzzy match.
  const faq = bestFaq(q, data);
  if (faq) {
    ctx.lastIntent = "faq";
    return {
      text: faq.a,
      ctas: [
        waCta("Ask on WhatsApp", `Hello Zaidi TVS! ${rawClean}`),
        CALL_SALES,
      ],
      suggestions: ["Aaj ka price", "Free test ride", "EMI options", "Service booking"],
    };
  }

  // Nothing matched → AI-style clarification instead of a dead end.
  return clarifyReply(
    data,
    "Ye sawal mujhe thoda different laga, isliye main confirm karna chahta hoon."
  );
}

function familyIntent(q: string): "apache" | "ntorq" | "jupiter" | null {
  if (hit(q, "apache") && !/\b(160|180|200|310|300|rr|rtx)\b/.test(q)) return "apache";
  if (hit(q, "ntorq") && !/\b(125|150)\b/.test(q)) return "ntorq";
  if (hit(q, "jupiter") && !/\b125\b/.test(q)) return "jupiter";
  return null;
}
