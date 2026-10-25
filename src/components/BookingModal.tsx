"use client";

import { useEffect, useState, type FormEvent } from "react";

import { wa } from "@data/site";

import styles from "./BookingModal.module.css";

export type BookingBike = {
  slug: string;
  name: string;
  image: string;
  engine?: string;
  power?: string;
  price?: string;
};

type BookingModalProps = {
  open: boolean;
  bikes: BookingBike[];
  initialSlug?: string | null;
  onClose: () => void;
};

export default function BookingModal({
  open,
  bikes,
  initialSlug,
  onClose,
}: BookingModalProps) {
  const [selectedSlug, setSelectedSlug] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Reset the form whenever the modal opens (or targets another bike).
  // Adjusting state during render is the recommended alternative to a
  // setState-in-effect here: https://react.dev/learn/you-might-not-need-an-effect
  const resetKey = `${open ? "open" : "closed"}::${initialSlug ?? ""}`;
  const [lastResetKey, setLastResetKey] = useState(resetKey);
  if (resetKey !== lastResetKey) {
    setLastResetKey(resetKey);
    if (open) {
      setSelectedSlug(initialSlug ?? bikes[0]?.slug ?? "");
      setError("");
    }
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const selectedBike =
    bikes.find((bike) => bike.slug === selectedSlug) ?? bikes[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const digits = phone.replace(/\D/g, "");
    if (!name.trim() || digits.length < 10) {
      setError("Please enter your name and a valid phone number (at least 10 digits).");
      return;
    }

    setError("");

    const text = [
      "Hello Zaidi TVS! I would like to book a ride / test ride.",
      "",
      `Model: ${selectedBike?.name ?? "-"} (${selectedBike?.engine ?? "-"})`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim() || "-"}`,
      `Message: ${message.trim() || "-"}`,
    ].join("\n");

    window.open(wa(text), "_blank");
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-label="Book a test ride"
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Close booking form"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className={styles.title}>Book a Test Ride</h2>

        {selectedBike ? (
          <div className={styles.bikeRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selectedBike.image} alt={selectedBike.name} />
            <div>
              <div className={styles.bikeName}>{selectedBike.name}</div>
              <div className={styles.bikeMeta}>
                {selectedBike.engine ?? "-"}
                {selectedBike.price ? ` \u00b7 ${selectedBike.price}` : ""}
              </div>
            </div>
          </div>
        ) : null}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="bm-bike">
              Model
            </label>
            <select
              id="bm-bike"
              value={selectedSlug}
              onChange={(event) => setSelectedSlug(event.target.value)}
            >
              {bikes.map((bike) => (
                <option key={bike.slug} value={bike.slug}>
                  {bike.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="bm-name">
              Name
            </label>
            <input
              id="bm-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="bm-phone">
              Phone
            </label>
            <input
              id="bm-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 XXXXX XXXXX"
              pattern={"[0-9+\\- ]{10,15}"}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="bm-email">
              Email (optional)
            </label>
            <input
              id="bm-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="bm-message">
              Message (optional)
            </label>
            <textarea
              id="bm-message"
              rows={3}
              placeholder="Anything we should know?"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>

          {error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className={styles.submit}>
            <span>Submit</span>
          </button>

          <p className={styles.note}>
            We&apos;ll confirm your slot on WhatsApp. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}
