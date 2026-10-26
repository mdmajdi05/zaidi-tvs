"use client";

import { useEffect, useRef, useState } from "react";
import { CHATBOT } from "@data/site";
import {
  loadChatData,
  replyTo,
  type ChatContext,
  type ChatCta,
  type ChatData,
} from "@/lib/chatBrain";

type Msg = { id: number; from: "bot" | "user"; text: string; ctas?: ChatCta[] };

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function PhoneIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
    </svg>
  );
}

function PinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CtaIcon({ kind }: { kind: ChatCta["kind"] }) {
  if (kind === "whatsapp") return <WhatsAppIcon size={14} />;
  if (kind === "call") return <PhoneIcon />;
  if (kind === "map") return <PinIcon />;
  return <ArrowIcon />;
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
  const [suggestions, setSuggestions] = useState<string[]>(CHATBOT.quickReplies);
  const dataRef = useRef<ChatData | null>(null);
  const ctxRef = useRef<ChatContext>({});
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
      if (!dataRef.current) dataRef.current = await loadChatData();
      const reply = replyTo(text, ctxRef.current, dataRef.current);
      await new Promise((r) => setTimeout(r, 360));
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, from: "bot", text: reply.text, ctas: reply.ctas },
      ]);
      if (reply.suggestions?.length) setSuggestions(reply.suggestions);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          from: "bot",
          text: "Sorry, ek technical issue aa gaya. Aap seedha WhatsApp par poochh sakte hain.",
        },
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
                  {m.ctas && m.ctas.length > 0 && (
                    <span className="zChatCtas">
                      {m.ctas.map((cta) => {
                        const newTab = cta.kind === "whatsapp" || cta.kind === "map";
                        return (
                          <a
                            key={`${cta.label}-${cta.href}`}
                            className={`zChatCta ${cta.kind}`}
                            href={cta.href}
                            {...(newTab
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                          >
                            <CtaIcon kind={cta.kind} />
                            {cta.label}
                          </a>
                        );
                      })}
                    </span>
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
            {suggestions.map((reply) => (
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
  // intent-based assistant built from the site data.
  return <BuiltinChat />;
}
