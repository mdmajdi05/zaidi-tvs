"use client";

import { useState, type FormEvent } from "react";
import { wa } from "@data/site";
import { BIKES } from "@/lib/catalog";
import styles from "./ServiceBooking.module.css";

const SERVICE_TYPES = [
  "Periodic Service",
  "General Checkup",
  "Repair",
  "Battery & Electrical",
  "Tyre & Wheel",
  "Insurance Renewal",
];

const TIME_SLOTS = ["10-12", "12-2", "2-4", "4-6", "6-8"];

const INFO_CARDS = [
  {
    icon: "🚚",
    title: "Free pickup & drop within city",
    text: "Doorstep collection and return, so you never lose a day.",
  },
  {
    icon: "🔧",
    title: "Trained TVS technicians",
    text: "Factory-guided service by the people who know your ride.",
  },
  {
    icon: "🧩",
    title: "Genuine parts & transparent estimate",
    text: "A clear quote before any work starts — no surprises.",
  },
];

export default function ServiceBooking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState(BIKES[0]?.name ?? "");
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(TIME_SLOTS[0]);
  const [mode, setMode] = useState<"drop" | "doorstep">("drop");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (!name.trim() || digits.length < 10) {
      setError(
        "Please enter your name and a phone number with at least 10 digits."
      );
      setSent(false);
      return;
    }
    if (mode === "doorstep" && !address.trim()) {
      setError("Please add a pickup address for doorstep service.");
      setSent(false);
      return;
    }
    setError("");

    const lines = [
      "Hello Zaidi TVS! I'd like to book a service slot.",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Model: ${model}`,
      `Service type: ${serviceType}`,
      `Preferred date: ${date.trim() || "Any day"}`,
      `Preferred time: ${slot}`,
      `Mode: ${
        mode === "doorstep" ? "Doorstep pickup & drop" : "Drop at showroom"
      }`,
    ];
    if (mode === "doorstep") {
      lines.push(`Address: ${address.trim()}`);
    }
    if (notes.trim()) {
      lines.push(`Notes: ${notes.trim()}`);
    }

    const text = lines.join("\n");
    window.open(wa(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.infoCol}>
        {INFO_CARDS.map((card) => (
          <div key={card.title} className={styles.infoCard}>
            <span className={styles.infoIcon} aria-hidden="true">
              {card.icon}
            </span>
            <div>
              <h3 className={styles.infoTitle}>{card.title}</h3>
              <p className={styles.infoText}>{card.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sb-name">
              Name *
            </label>
            <input
              id="sb-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sb-phone">
              Phone *
            </label>
            <input
              id="sb-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sb-model">
              Model
            </label>
            <select
              id="sb-model"
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
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sb-service">
              Service type
            </label>
            <select
              id="sb-service"
              value={serviceType}
              onChange={(event) => setServiceType(event.target.value)}
            >
              {SERVICE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sb-date">
              Preferred date
            </label>
            <input
              id="sb-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sb-slot">
              Preferred time slot
            </label>
            <select
              id="sb-slot"
              value={slot}
              onChange={(event) => setSlot(event.target.value)}
            >
              {TIME_SLOTS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>Mode</legend>
          <div className={styles.radioRow}>
            <label className={styles.radio}>
              <input
                type="radio"
                name="sb-mode"
                value="drop"
                checked={mode === "drop"}
                onChange={() => setMode("drop")}
              />
              <span>Drop at showroom</span>
            </label>
            <label className={styles.radio}>
              <input
                type="radio"
                name="sb-mode"
                value="doorstep"
                checked={mode === "doorstep"}
                onChange={() => setMode("doorstep")}
              />
              <span>Doorstep pickup &amp; drop</span>
            </label>
          </div>
        </fieldset>

        {mode === "doorstep" ? (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sb-address">
              Pickup address *
            </label>
            <textarea
              id="sb-address"
              rows={2}
              placeholder="House / street / area, Chandpur"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
        ) : null}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="sb-notes">
            Notes (optional)
          </label>
          <textarea
            id="sb-notes"
            rows={2}
            placeholder="Anything we should know about your ride?"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" className={styles.submit}>
          <span>CONFIRM ON WHATSAPP →</span>
        </button>

        {sent ? (
          <p className={styles.success} aria-live="polite">
            ✅ WhatsApp opened with your booking — just press send and we will
            confirm your slot.
          </p>
        ) : null}
      </form>
    </div>
  );
}
