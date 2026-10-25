"use client";

import { useMemo, useState } from "react";
import {
  COMPARE_FIELDS,
  COMPARE_MODELS,
  TVS_COMPARE,
  searchCompareModels,
  type CompareModel,
} from "@data/compare";
import styles from "./CompareTool.module.css";

const FALLBACK_A = TVS_COMPARE[0]?.id ?? COMPARE_MODELS[0].id;
const FIRST_OTHER = COMPARE_MODELS.find((model) => model.brand !== "TVS");
const FALLBACK_B = FIRST_OTHER?.id ?? COMPARE_MODELS[1]?.id ?? FALLBACK_A;

function ModelSelect({
  id,
  label,
  value,
  models,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  models: CompareModel[];
  onChange: (value: string) => void;
}) {
  const selected = COMPARE_MODELS.find((model) => model.id === value);
  const options = models.some((model) => model.id === value)
    ? models
    : selected
      ? [selected, ...models]
      : models;
  const brands = Array.from(new Set(options.map((model) => model.brand)));

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {brands.map((brand) => (
          <optgroup key={brand} label={brand}>
            {options
              .filter((model) => model.brand === brand)
              .map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default function CompareTool({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [modelA, setModelA] = useState(FALLBACK_A);
  const [modelB, setModelB] = useState(FALLBACK_B);
  const [query, setQuery] = useState("");

  const filteredModels = useMemo(() => searchCompareModels(query), [query]);

  const a = useMemo(
    () => COMPARE_MODELS.find((model) => model.id === modelA) ?? COMPARE_MODELS[0],
    [modelA]
  );
  const b = useMemo(
    () => COMPARE_MODELS.find((model) => model.id === modelB) ?? COMPARE_MODELS[0],
    [modelB]
  );

  const sameModel = a.id === b.id;

  function swap() {
    setModelA(modelB);
    setModelB(modelA);
  }

  return (
    <div className={`${styles.wrap}${compact ? ` ${styles.compact}` : ""}`}>
      <div className={styles.searchRow}>
        <div className={styles.searchField}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>
          <label className={styles.srOnly} htmlFor="compare-search">
            Search any bike or scooter
          </label>
          <input
            id="compare-search"
            className={styles.search}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Activa, Pulsar, Jupiter, iQube..."
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              className={styles.clear}
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          ) : null}
        </div>
        <span className={styles.resultCount} aria-live="polite">
          {filteredModels.length} of {COMPARE_MODELS.length} vehicles
        </span>
      </div>

      <div className={styles.picker}>
        <ModelSelect
          id="compare-model-a"
          label="First vehicle"
          value={modelA}
          models={filteredModels}
          onChange={setModelA}
        />

        <button
          type="button"
          className={styles.swap}
          onClick={swap}
          aria-label="Swap the two vehicles"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M4 8h13m0 0-4-4m4 4-4 4M20 16H7m0 0 4 4m-4-4 4-4" />
          </svg>
          <span>VS</span>
        </button>

        <ModelSelect
          id="compare-model-b"
          label="Second vehicle"
          value={modelB}
          models={filteredModels}
          onChange={setModelB}
        />
      </div>

      <div className={styles.head}>
        <div>
          <span className={styles.brand}>{a.brand}</span>
          <strong>{a.name}</strong>
        </div>
        <span className={styles.versus}>vs</span>
        <div>
          <span className={styles.brand}>{b.brand}</span>
          <strong>{b.name}</strong>
        </div>
      </div>

      {sameModel ? (
        <p className={styles.notice}>Pick two different vehicles to compare.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Spec</th>
                <th scope="col">{a.name}</th>
                <th scope="col">{b.name}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_FIELDS.map((field) => {
                const valueA = a[field.key as keyof CompareModel] as string;
                const valueB = b[field.key as keyof CompareModel] as string;
                return (
                  <tr key={field.key}>
                    <th scope="row">{field.label}</th>
                    <td className={valueA !== valueB ? styles.better : undefined}>
                      {valueA}
                    </td>
                    <td className={valueA !== valueB ? styles.better : undefined}>
                      {valueB}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className={styles.note}>
        *Indicative figures for quick comparison. Actual mileage, range and
        on-road price vary with variant, riding conditions and location. Call us
        for today&apos;s exact price and offers.
      </p>
    </div>
  );
}
