"use client";

import { useId } from "react";

/**
 * Fully hand-built SVG sports bike (Apache-style) — no photos.
 * Parts are grouped so parents can explode / animate them:
 * front-wheel, handle, cowl, tank, seat, exhaust, rear-wheel, engine.
 */
export default function BikeSVG({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const body = `body${uid}`;
  const metal = `metal${uid}`;
  const beam = `beam${uid}`;

  const spokes = (cx: number, cy: number, r: number) =>
    [0, 72, 144, 216, 288].map((a) => {
      const rad = (a * Math.PI) / 180;
      return (
        <line
          key={a}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(rad) * r}
          y2={cy + Math.sin(rad) * r}
          stroke="#8a909e"
          strokeWidth="2.4"
        />
      );
    });

  const wheel = (cx: number, cy: number, discR: number) => (
    <>
      <circle cx={cx} cy={cy} r="29" fill="#0b0e14" stroke="#10141b" strokeWidth="10" />
      <g className="wspin">
        <circle cx={cx} cy={cy} r="17" fill="#0b0e14" stroke="#c9ced8" strokeWidth="3" />
        <circle cx={cx} cy={cy} r={discR} fill="none" stroke="#6b7280" strokeWidth="3" strokeDasharray="3 2" />
        {spokes(cx, cy, 15)}
        <circle cx={cx} cy={cy} r="4.5" fill="#ef2931" stroke="#fff" strokeWidth="1.4" />
      </g>
      <circle cx={cx} cy={cy} r="29" fill="none" stroke="rgba(239,41,49,.55)" strokeWidth="1.6" />
    </>
  );

  return (
    <svg viewBox="0 0 340 190" className={`bike-svg ${className}`} role="img" aria-label="TVS sports bike">
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff5e3a" />
          <stop offset="55%" stopColor="#ef2931" />
          <stop offset="100%" stopColor="#8f1220" />
        </linearGradient>
        <linearGradient id={metal} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8ebf0" />
          <stop offset="55%" stopColor="#9aa0ae" />
          <stop offset="100%" stopColor="#4b5563" />
        </linearGradient>
        <linearGradient id={beam} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff6d0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff6d0" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="170" cy="168" rx="138" ry="9" fill="rgba(0,0,0,.5)" />

      {/* REAR WHEEL */}
      <g className="part p-rear-wheel">{wheel(95, 130, 10)}</g>

      {/* ENGINE + SWINGARM (stays) */}
      <g className="part p-engine">
        <polygon points="95,130 172,116 172,126 95,140" fill="#232936" />
        <line x1="95" y1="122" x2="176" y2="112" stroke="#4b5563" strokeWidth="2" />
        <rect x="150" y="100" width="52" height="38" rx="8" fill={`url(#${metal})`} stroke="#2b3242" strokeWidth="1.5" />
        {[106, 114, 122].map((y) => (
          <line key={y} x1="154" y1={y} x2="198" y2={y} stroke="#4b5563" strokeWidth="1.6" />
        ))}
        <circle cx="176" cy="119" r="10" fill="#2b3242" stroke="#c9ced8" strokeWidth="1.5" />
        <circle cx="176" cy="119" r="3" fill="#8a909e" />
      </g>

      {/* EXHAUST */}
      <g className="part p-exhaust">
        <path d="M196,134 C170,150 140,152 118,150" fill="none" stroke="#8a909e" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="92" cy="147" rx="28" ry="10.5" fill={`url(#${metal})`} stroke="#2b3242" strokeWidth="1.5" />
        <ellipse cx="65" cy="148" rx="7" ry="9" fill="#0b0e14" stroke="#4b5563" strokeWidth="1.5" />
        <rect x="104" y="138" width="6" height="18" rx="2" fill="#3a4152" />
      </g>

      {/* SEAT + TAIL */}
      <g className="part p-seat">
        <path d="M78,96 L130,96 L123,83 L85,83 Z" fill="#0d1117" stroke="#2b3242" strokeWidth="1.5" />
        <path d="M62,92 L86,82 L90,66 L70,61 L58,74 Z" fill={`url(#${body})`} stroke="#5f0c16" strokeWidth="1.2" />
        <rect x="60" y="76" width="14" height="5" rx="2.5" fill="#fff" opacity="0.9" />
        <circle cx="62" cy="86" r="3" fill="#ef2931" />
      </g>

      {/* TANK + PANELS */}
      <g className="part p-tank">
        <path
          d="M118,104 C140,82 175,76 200,86 L226,96 C230,100 228,108 220,110 L150,118 C130,118 118,112 118,104 Z"
          fill={`url(#${body})`}
          stroke="#5f0c16"
          strokeWidth="1.2"
        />
        <path d="M150,118 L220,110 L214,124 L155,130 Z" fill="#7a1420" opacity="0.85" />
        <text x="166" y="103" textAnchor="middle" fontSize="13" fontWeight="900" fontStyle="italic" fill="#fff" fontFamily="Oswald, sans-serif" letterSpacing="1">
          TVS
        </text>
      </g>

      {/* FRONT COWL + LIGHT */}
      <g className="part p-cowl">
        <polygon points="270,88 332,68 332,110" fill={`url(#${beam})`} opacity="0.5" />
        <path d="M228,60 L262,58 L270,90 L250,112 L232,104 Z" fill="#141821" stroke="#2b3242" strokeWidth="1.5" />
        <path d="M232,64 L260,62 L258,72 L234,74 Z" fill={`url(#${body})`} />
        <path d="M238,58 L258,56 L254,42 L236,44 Z" fill="rgba(160,200,255,.35)" stroke="#4b5563" strokeWidth="1" />
        <rect x="242" y="86" width="17" height="8" rx="4" fill="#fff" />
        <rect x="244" y="87.5" width="13" height="5" rx="2.5" fill="#fffdf4" />
      </g>

      {/* FRONT FORK + WHEEL */}
      <g className="part p-front-wheel">
        <line x1="245" y1="130" x2="258" y2="66" stroke="#d8a93c" strokeWidth="5" strokeLinecap="round" />
        <line x1="252" y1="130" x2="265" y2="66" stroke="#0d1117" strokeWidth="7" strokeLinecap="round" />
        <path d="M212,112 A36,36 0 0 1 282,108 L278,118 A28,28 0 0 0 218,120 Z" fill={`url(#${body})`} />
        {wheel(245, 130, 13)}
      </g>

      {/* HANDLEBAR */}
      <g className="part p-handle">
        <line x1="258" y1="66" x2="277" y2="50" stroke="#0d1117" strokeWidth="6" strokeLinecap="round" />
        <line x1="250" y1="63" x2="259" y2="66" stroke="#1c2230" strokeWidth="9" strokeLinecap="round" />
        <line x1="277" y1="50" x2="289" y2="30" stroke="#3a4152" strokeWidth="3" />
        <ellipse cx="293" cy="25" rx="12" ry="8" fill="#0d1117" stroke="#8a909e" strokeWidth="2" />
        <ellipse cx="290" cy="23" rx="7" ry="4" fill="rgba(160,200,255,.5)" />
        <circle cx="277" cy="50" r="3" fill="#4b5563" />
      </g>
    </svg>
  );
}
