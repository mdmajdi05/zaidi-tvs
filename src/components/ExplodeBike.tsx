"use client";

import { useState } from "react";
import BikeSVG from "./BikeSVG";

/**
 * Hand-built SVG bike that BREAKS into parts on click:
 * front wheel, handle, cowl, tank, seat, exhaust, rear wheel
 * fly apart — click again to assemble back.
 */
export default function ExplodeBike() {
  const [boom, setBoom] = useState(false);

  return (
    <div
      className={`xplode${boom ? " boom" : ""}`}
      onClick={() => setBoom((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setBoom((v) => !v);
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={boom}
      aria-label={boom ? "Assemble the bike back" : "Explode the bike into parts"}
    >
      <BikeSVG />
      <span className="xplode-hint" aria-hidden="true">
        {boom ? "CLICK — ASSEMBLE ⚙" : "CLICK — EXPLODE 💥"}
      </span>
    </div>
  );
}
