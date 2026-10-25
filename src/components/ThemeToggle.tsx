"use client";

import { useSyncExternalStore } from "react";

const EVENT = "zaidi-theme-change";

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function isDark() {
  return document.documentElement.dataset.theme === "dark";
}

function isDarkOnServer() {
  return false;
}

/** Day / night switch. Saves the choice so it survives reloads. */
export default function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, isDarkOnServer);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("zaidi-theme", next);
    } catch {
      /* private mode — the theme still changes for this visit */
    }
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <button
      type="button"
      className={`theme-toggle${className ? ` ${className}` : ""}`}
      onClick={toggle}
      aria-label={`Switch to ${dark ? "day" : "night"} mode`}
      title={`Switch to ${dark ? "day" : "night"} mode`}
    >
      {dark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        </svg>
      )}
    </button>
  );
}
