"use client";

import { useMemo, useState } from "react";
import { wa } from "@data/site";
import { BIKES, PARTS } from "@/lib/catalog";
import styles from "./PartsFinder.module.css";

const CATEGORIES = [
  "All",
  "Engine",
  "Body",
  "Electrical",
  "Brakes",
  "Tyres",
  "Accessories",
  "Safety",
  "Lubricants",
] as const;
type Category = (typeof CATEGORIES)[number];
type PartCategory = Exclude<Category, "All">;

/** Assign each stocked part to one of the catalogue categories. */
const PART_CATEGORY: Record<string, PartCategory> = {
  "Air Filter": "Engine",
  "Oil Filter": "Engine",
  "Spark Plug": "Electrical",
  "Clutch Plates": "Engine",
  "Chain & Sprocket Kit": "Engine",
  "Brake Pads & Shoes": "Safety",
  "Disc Brake Kit": "Brakes",
  Battery: "Electrical",
  "Headlamp Assembly": "Electrical",
  "Mirror Set": "Body",
  "Tyres & Tubes": "Tyres",
  "Engine Oil & Coolant": "Lubricants",
  "Body Panels & Fairings": "Body",
  "Seat & Seat Cover": "Accessories",
  "Wiring Harness": "Electrical",
  "Shock Absorbers": "Body",
};

function partCategory(name: string): PartCategory {
  return PART_CATEGORY[name] ?? "Accessories";
}

/** Real accessory category shots from /tvs/shop/*.webp. */
const ACCESSORIES: Array<{ title: string; img: string }> = [
  { title: "Protection & Security", img: "/tvs/shop/protection-security.webp" },
  { title: "Style", img: "/tvs/shop/style.webp" },
  { title: "Utility", img: "/tvs/shop/utility.webp" },
  { title: "Touring Accessories", img: "/tvs/shop/touring-accessories.webp" },
  { title: "Vehicle Care", img: "/tvs/shop/vehicle-care.webp" },
  { title: "Helmets", img: "/tvs/shop/helmets.webp" },
  { title: "Riding Gear", img: "/tvs/shop/riding-gear.webp" },
  { title: "Urban Wear", img: "/tvs/shop/urban-wear.webp" },
];

const HEADING_STYLE = {
  fontFamily: "Oswald, Arial, sans-serif",
  fontStyle: "italic",
  fontSize: 26,
  margin: 0,
} as const;

const SUB_STYLE = {
  color: "inherit",
  opacity: 0.68,
  fontSize: 13,
  margin: "8px 0 0",
} as const;

export default function PartsFinder({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [model, setModel] = useState(BIKES[0]?.name ?? "My TVS");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PARTS.filter((part) => {
      const inCategory =
        category === "All" || partCategory(part.name) === category;
      const inQuery =
        !q ||
        part.name.toLowerCase().includes(q) ||
        part.note.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  function singleRequest(partName: string): string {
    return `Hello Zaidi TVS, I would like to enquire about a genuine part.\nPart: ${partName} · Model: ${model}`;
  }

  function bulkRequest(): string {
    const list = results.map((p) => `• ${p.name}`).join("\n");
    return `Hello Zaidi TVS, I would like to enquire about these genuine parts.\nModel: ${model}\nParts:\n${list}`;
  }

  return (
    <div className={styles.wrap}>
      <div className="section-head">
        <div className="eyebrow red">▣ &nbsp; PARTS &amp; ACCESSORIES</div>
        <h2 style={HEADING_STYLE}>FIND YOUR PART</h2>
        <p style={SUB_STYLE}>
          Search genuine TVS parts by name, or pick a category — then send your
          model and we will confirm availability and fitment.
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="parts-search">
            Search parts
          </label>
          <input
            id="parts-search"
            className={styles.input}
            type="search"
            placeholder="e.g. air filter, brake pads, battery"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="parts-model">
            Your model
          </label>
          <select
            id="parts-model"
            className={styles.input}
            value={model}
            onChange={(event) => setModel(event.target.value)}
          >
            {BIKES.map((bike) => (
              <option key={bike.slug} value={bike.name}>
                {bike.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.chips} role="group" aria-label="Filter parts by category">
        {CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            className={`${styles.chip} ${category === item ? styles.chipActive : ""}`.trim()}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={styles.countRow}>
        <span className={styles.count} aria-live="polite">
          {results.length} part{results.length === 1 ? "" : "s"} found
        </span>
        {results.length > 0 && (
          <a
            className="btn ghost"
            href={wa(bulkRequest())}
            target="_blank"
            rel="noopener noreferrer"
          >
            ASK ALL ON WHATSAPP <span aria-hidden="true">→</span>
          </a>
        )}
      </div>

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((part) => (
            <article key={part.name} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">
                {part.icon}
              </span>
              <h3 className={styles.name}>{part.name}</h3>
              <p className={styles.note}>{part.note}</p>
              <div className={styles.cardFoot}>
                <span className={styles.tag}>{partCategory(part.name)}</span>
                <a
                  className={styles.ask}
                  href={wa(singleRequest(part.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ASK ON WHATSAPP <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.empty} role="status">
          <b>No parts matched your search.</b>
          <p>
            Try another word, clear the search — or ask us directly. We stock far
            more than we list online.
          </p>
          <a
            className="btn primary"
            href={wa(
              `Hello Zaidi TVS, I am looking for a part.\nModel: ${model}\nPart: ${query.trim() || "please help me find it"}`
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            ASK US ON WHATSAPP <span aria-hidden="true">→</span>
          </a>
        </div>
      )}

      {!compact && (
        <>
          <div className="section-head" style={{ marginTop: 64 }}>
            <div className="eyebrow red">▣ &nbsp; SHOP ACCESSORIES</div>
            <h2 style={HEADING_STYLE}>GEAR UP YOUR RIDE</h2>
            <p style={SUB_STYLE}>
              Genuine accessories, care products and rider gear — enquire on
              WhatsApp and we will keep it ready.
            </p>
          </div>
          <div className={styles.accGrid}>
            {ACCESSORIES.map((item) => (
              <a
                key={item.title}
                className={styles.accCard}
                href={wa(
                  `Hello Zaidi TVS, I would like to enquire about accessories.\nCategory: ${item.title} · Model: ${model}`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.title} loading="lazy" />
                <span className={styles.accBody}>
                  <b>{item.title}</b>
                  <span className={styles.accCta}>
                    Enquire <span aria-hidden="true">→</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
