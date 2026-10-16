"use client";

import { useEffect, useRef, useState } from "react";
import {
  ADDRESS_LINE,
  CHATBOT,
  HOURS_SHORT,
  MAPS_URL,
  wa,
} from "@data/site";

type Cta = { label: string; href: string };
type Msg = { id: number; from: "bot" | "user"; text: string; cta?: Cta };
type Reply = { text: string; cta?: Cta };

type ChatData = {
  faqs: Array<{ q: string; a: string }>;
  schemes: Array<{ title: string; rate: string }>;
  offers: Array<{ title: string; text: string }>;
  bikes: Array<{
    name: string;
    shortName: string;
    engine: string;
    power: string;
    mileage: string;
    price?: string;
  }>;
};

/** Lazily loaded only when the chat is first opened (keeps the page light). */
async function loadData(): Promise<ChatData> {
  const [faqsMod, offersMod, catalogMod] = await Promise.all([
    import("@/lib/faqs"),
    import("@/lib/offers"),
    import("@/lib/catalog"),
  ]);
  return {
    faqs: faqsMod.FAQ_GROUPS.flatMap((group) => group.items),
    schemes: offersMod.FINANCE_SCHEMES,
    offers: offersMod.OFFERS,
    bikes: catalogMod.BIKES,
  };
}

function bestFaq(q: string, faqs: Array<{ q: string; a: string }>): string | null {
  const tokens = q.split(/[^a-z0-9]+/).filter((t) => t.length > 3);
  if (!tokens.length) return null;
  let best = { score: 0, a: "" };
  for (const faq of faqs) {
    const hay = `${faq.q} ${faq.a}`.toLowerCase();
    let score = 0;
    for (const token of tokens) if (hay.includes(token)) score++;
    if (score > best.score) best = { score, a: faq.a };
  }
  const need = tokens.length === 1 ? 1 : 2;
  return best.score >= need ? best.a : null;
}

function answer(raw: string, data: ChatData): Reply {
  const q = raw.toLowerCase();
  const has = (...words: string[]) => words.some((w) => q.includes(w));
  const handoff = (text: string, msg?: string): Reply => ({
    text,
    cta: { label: "WhatsApp par poochho →", href: wa(msg ?? raw) },
  });

  if (/^(hi|hello|hey|namaste|namaskar|salam|assalam)/.test(q.trim()) || has("namaste")) {
    return { text: CHATBOT.greeting };
  }

  if (has("timing", "time", "hour", "open", "khul", "band", "close", "samay", "address", "location", "kahan", "where", "map", "direction", "pata", "jagah")) {
    return {
      text: `Showroom timings: ${HOURS_SHORT}.\nAddress: ${ADDRESS_LINE}.`,
      cta: { label: "Google Maps par kholein →", href: MAPS_URL },
    };
  }

  if (has("test ride", "test-ride", "testride", "trial")) {
    return handoff(
      "Bilkul! Free test ride available hai — bas valid driving licence laaiye. Slot book karne ke liye WhatsApp karein.",
      "Hi Zaidi TVS! I'd like to book a free test ride."
    );
  }

  if (has("emi", "finance", "loan", "installment", "instalment", "down payment", "down-payment", "interest", "kist")) {
    const list = data.schemes
      .slice(0, 3)
      .map((s) => `• ${s.title} — ${s.rate}`)
      .join("\n");
    return handoff(
      `Haan, finance available hai:\n${list}\nLow down-payment aur 48 months tak tenure. Exact EMI ke liye WhatsApp karein.`,
      "Hi Zaidi TVS! I need EMI / finance details."
    );
  }

  if (has("exchange", "old bike", "purani", "trade")) {
    return handoff(
      "Ji haan — purani gaadi (kisi bhi brand) ki free evaluation karke value naye purchase me adjust ki jaati hai.",
      "Hi Zaidi TVS! I want to exchange my old vehicle."
    );
  }

  if (has("insurance", "policy", "claim")) {
    return handoff(
      "New insurance delivery par, aur renewal + claim me poora support milta hai.",
      "Hi Zaidi TVS! I need insurance help."
    );
  }

  if (has("service", "servicing", "repair", "workshop", "pickup", "pick up", "maintenance")) {
    return handoff(
      "Service booking, genuine parts aur free doorstep pickup/drop available hai. WhatsApp par apna model + address bhejein.",
      "Hi Zaidi TVS! I'd like to book a service."
    );
  }

  if (has("iqube", "electric", "charge", "charging", " ev", "orbiter")) {
    return handoff(
      "TVS iQube aur Orbiter electric scooters available hain. Ghar ke 5A socket se charge hote hain — petrol se kaafi sasta running cost.",
      "Hi Zaidi TVS! I'd like iQube / electric details."
    );
  }

  if (has("document", "aadhaar", "paperwork", "licence", "license")) {
    return handoff(
      "Aam taur par ID (Aadhaar), address proof aur photo chahiye. Finance me thoda extra paperwork — hum poora guide karte hain.",
      "Hi Zaidi TVS! What documents do I need?"
    );
  }

  const bike = data.bikes.find((b) => {
    const short = b.shortName.toLowerCase();
    const full = b.name.toLowerCase();
    return (short.length > 2 && q.includes(short)) || (full.length > 3 && q.includes(full));
  });
  if (bike) {
    return handoff(
      `${bike.name}\n• Engine: ${bike.engine}\n• Power: ${bike.power}\n• Mileage: ${bike.mileage}\n• Price: ${bike.price ?? "on-road price ke liye WhatsApp karein"}`,
      `Hi Zaidi TVS! I'm interested in the ${bike.name}. Please share the price.`
    );
  }

  if (has("price", "cost", "rate", "kitna", "kitne", "on-road", "onroad", "keemat")) {
    return handoff(
      "Price model aur variant par depend karta hai. Aap kaun sa model dekh rahe hain? Exact on-road price WhatsApp par bhej denge.",
      "Hi Zaidi TVS! Please share the price list."
    );
  }

  if (has("offer", "discount", "scheme", "deal", "bonus", "festive")) {
    const list = data.offers
      .slice(0, 3)
      .map((o) => `• ${o.title} — ${o.text}`)
      .join("\n");
    return handoff(`Abhi ke offers:\n${list}`, "Hi Zaidi TVS! What offers are running right now?");
  }

  const faq = bestFaq(q, data.faqs);
  if (faq) return handoff(faq);

  return handoff(
    "Ye sawal main theek se samajh nahi paya. WhatsApp par hamari team se seedha poochho — turant jawab milega."
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function CustomScriptWidget({ src }: { src: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [src]);
  return null;
}

function BuiltinChat() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: 0, from: "bot", text: CHATBOT.greeting },
  ]);
  const dataRef = useRef<ChatData | null>(null);
  const idRef = useRef(1);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setPulse(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, thinking, open]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || thinking) return;
    setInput("");
    setMessages((prev) => [...prev, { id: idRef.current++, from: "user", text }]);
    setThinking(true);
    try {
      if (!dataRef.current) dataRef.current = await loadData();
      const reply = answer(text, dataRef.current);
      await new Promise((r) => setTimeout(r, 420));
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, from: "bot", text: reply.text, cta: reply.cta },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className={`zChat${open ? " is-open" : ""}`}>
      {open && (
        <div className="zChatCard" role="dialog" aria-label={CHATBOT.title}>
          <div className="zChatHead">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="zChatAvatar"
              src="/Favicons/Light_Background_Z_Black_TVS_Red/ZTVS_Favicon_Light_ZBlack_TVSRed_128x128.png"
              alt=""
              width={128}
              height={128}
            />
            <div className="zChatWho">
              <b>{CHATBOT.title}</b>
              <small>{CHATBOT.subtitle}</small>
            </div>
            <button
              type="button"
              className="zChatClose"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="zChatBody" ref={bodyRef}>
            {messages.map((m) => (
              <div key={m.id} className={`zChatRow ${m.from}`}>
                <div className={`zChatBubble ${m.from}`}>
                  {m.text.split("\n").map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                  {m.cta && (
                    <a
                      className="zChatCta"
                      href={m.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon size={15} />
                      {m.cta.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="zChatRow bot">
                <div className="zChatBubble bot zChatTyping" aria-label="Typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>

          <div className="zChatReplies">
            {CHATBOT.quickReplies.map((reply) => (
              <button key={reply} type="button" onClick={() => send(reply)}>
                {reply}
              </button>
            ))}
          </div>

          <form
            className="zChatForm"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Apna sawal likhein…"
              aria-label="Type your message"
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || thinking}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="zChatBtn"
        onClick={() => {
          setOpen((value) => !value);
          setPulse(false);
        }}
        aria-label={open ? "Close chat" : CHATBOT.title}
        aria-expanded={open}
      >
        {pulse && !open && <span className="zChatPing" aria-hidden="true" />}
        {open ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true">
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function ChatWidget() {
  if (!CHATBOT.enabled) return null;
  if (CHATBOT.provider === "custom" && CHATBOT.customScript) {
    return <CustomScriptWidget src={CHATBOT.customScript} />;
  }
  // "builtin" (and "servibot" until a key/vendor is configured) uses the local
  // rule-based assistant built from the FAQ, offers and showroom data.
  return <BuiltinChat />;
}
