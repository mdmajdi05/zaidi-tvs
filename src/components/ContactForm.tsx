"use client";

import { useState, type FormEvent } from "react";
import { wa } from "@data/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }
    setError("");
    const text = `Hello Zaidi TVS! I'm ${name.trim()} (${phone.trim()}). I'd like to enquire about: ${
      model.trim() || "TVS vehicles"
    }. ${message.trim()}`;
    window.open(wa(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="cf-name">Name</label>
      <input
        id="cf-name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="cf-phone">Phone</label>
      <input
        id="cf-phone"
        type="tel"
        autoComplete="tel"
        placeholder="+91 XXXXX XXXXX"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      <label htmlFor="cf-model">Model interested in</label>
      <input
        id="cf-model"
        type="text"
        placeholder="e.g. TVS Ntorq 125"
        value={model}
        onChange={(event) => setModel(event.target.value)}
      />
      <label htmlFor="cf-message">Message</label>
      <textarea
        id="cf-message"
        placeholder="Tell us how we can help — test ride, price, finance…"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      {error ? (
        <p role="alert" style={{ color: "#e7282e", fontSize: 11, margin: 0 }}>
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn primary">
        SEND ENQUIRY <span>→</span>
      </button>
      {sent ? (
        <p aria-live="polite" style={{ color: "#5de38d", fontSize: 11, margin: 0 }}>
           WhatsApp opened with your enquiry — just press send!
        </p>
      ) : null}
    </form>
  );
}