"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

type ModelKey = "ntorq" | "jupiter" | "raider";

const MODELS: Record<
  ModelKey,
  { name: string; engine: string; type: string; mileage: string; weight: string; price: string }
> = {
  ntorq: {
    name: "TVS Ntorq 125",
    engine: "124.8 cc",
    type: "Sporty Scooter",
    mileage: "Up to 40 km/l*",
    weight: "116 kg*",
    price: "Contact showroom",
  },
  jupiter: {
    name: "TVS Jupiter",
    engine: "113.3 cc",
    type: "Family Scooter",
    mileage: "Up to 50 km/l*",
    weight: "109 kg*",
    price: "Contact showroom",
  },
  raider: {
    name: "TVS Raider",
    engine: "124.8 cc",
    type: "Performance Bike",
    mileage: "Up to 56 km/l*",
    weight: "123 kg*",
    price: "Contact showroom",
  },
};

const COMPARE_ROWS: Array<[string, keyof (typeof MODELS)[ModelKey]]> = [
  ["Engine", "engine"],
  ["Category", "type"],
  ["Mileage", "mileage"],
  ["Kerb Weight", "weight"],
  ["Price", "price"],
];

const ALL_KEYS: ModelKey[] = ["ntorq", "jupiter", "raider"];

export default function ComparePage() {
  const [modelA, setModelA] = useState<ModelKey>("ntorq");
  const [modelB, setModelB] = useState<ModelKey>("jupiter");

  const a = MODELS[modelA];
  const b = MODELS[modelB];

  return (
    <>
      <PageHero
        eyebrow="SMART SHOPPING"
        title="COMPARE TVS MODELS."
        subtitle="Choose any two models and compare the essentials side by side — engine, mileage, weight and more."
      />

      <section className="page-section section-light" style={{ background: "#f5f5f3", color: "#111" }}>
        <Reveal>
          <div className="compare-controls">
            <label className="srOnly" htmlFor="cmpA">
              First model
            </label>
            <select
              id="cmpA"
              value={modelA}
              onChange={(event) => setModelA(event.target.value as ModelKey)}
            >
              {ALL_KEYS.map((key) => (
                <option key={key} value={key}>
                  {MODELS[key].name}
                </option>
              ))}
            </select>
            <span>VS</span>
            <label className="srOnly" htmlFor="cmpB">
              Second model
            </label>
            <select
              id="cmpB"
              value={modelB}
              onChange={(event) => setModelB(event.target.value as ModelKey)}
            >
              {ALL_KEYS.map((key) => (
                <option key={key} value={key}>
                  {MODELS[key].name}
                </option>
              ))}
            </select>
          </div>
          <div className="compare-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">{a.name}</th>
                  <th scope="col">{b.name}</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(([label, key]) => (
                  <tr key={label}>
                    <td>
                      <b>{label}</b>
                    </td>
                    <td>{a[key]}</td>
                    <td>{b[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            style={{
              fontSize: 10,
              color: "#888",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            *Mileage &amp; weight figures are indicative and may vary with usage
            and conditions. Prices on request.
          </p>
        </Reveal>
      </section>
    </>
  );
}
