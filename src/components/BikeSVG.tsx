"use client";

import { useId } from "react";

/**
 * Hand-built TVS sports-bike SVG (Apache-style) — no photos.
 * Realistic shading: rubber tyres (tread + specular highlight), metallic rims,
 * drilled brake rotors with a fixed caliper, gloss bodywork with specular
 * sweeps + rim light, gold USD fork and a heat-shielded exhaust.
 *
 * Parts stay grouped (front-wheel, handle, cowl, tank, seat, exhaust,
 * rear-wheel, engine) so parents can explode / animate them.
 */
export default function BikeSVG({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}${uid}`;

  // SVG arc helper (angles in degrees, 0 = right, clockwise as y grows down)
  const arc = (cx: number, cy: number, r: number, a1: number, a2: number) => {
    const pt = (a: number) => {
      const t = (a * Math.PI) / 180;
      return [cx + Math.cos(t) * r, cy + Math.sin(t) * r] as const;
    };
    const [x1, y1] = pt(a1);
    const [x2, y2] = pt(a2);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };

  const spokes = (cx: number, cy: number) =>
    [0, 72, 144, 216, 288].map((a) => {
      const t = (a * Math.PI) / 180;
      return (
        <line
          key={a}
          x1={+(cx + Math.cos(t) * 5).toFixed(2)}
          y1={+(cy + Math.sin(t) * 5).toFixed(2)}
          x2={+(cx + Math.cos(t) * 19).toFixed(2)}
          y2={+(cy + Math.sin(t) * 19).toFixed(2)}
          stroke={`url(#${id("metal")})`}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      );
    });

  const wheel = (cx: number, cy: number, rotorR: number) => (
    <>
      {/* tyre — rubber with a subtle tread band */}
      <circle cx={cx} cy={cy} r="31.5" fill={`url(#${id("rubber")})`} />
      <circle cx={cx} cy={cy} r="31.5" fill="none" stroke="#04060a" strokeWidth="1.1" />
      <circle
        cx={cx}
        cy={cy}
        r="30.2"
        fill="none"
        stroke="#262c35"
        strokeWidth="1.6"
        strokeDasharray="1.4 3"
        opacity="0.9"
      />
      <circle cx={cx} cy={cy} r="25.6" fill="none" stroke="#0a0d12" strokeWidth="6.5" />
      {/* tyre specular highlight, upper-left sweep */}
      <path
        d={arc(cx, cy, 27.6, 196, 320)}
        fill="none"
        stroke="rgba(255,255,255,.22)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* rim (spins with the wheel) */}
      <g className="wspin">
        <circle cx={cx} cy={cy} r="19.6" fill={`url(#${id("rim")})`} />
        <circle cx={cx} cy={cy} r="19.6" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r="18.4" fill="none" stroke="#4b5563" strokeWidth="1" />
        {spokes(cx, cy)}
        <circle cx={cx} cy={cy} r="6.4" fill="#171c24" stroke={`url(#${id("metal")})`} strokeWidth="1.6" />
        <circle cx={cx} cy={cy} r="2.1" fill="#d7dbe2" />
      </g>
      {/* brake rotor (drilled) */}
      <circle cx={cx} cy={cy} r={rotorR} fill="none" stroke={`url(#${id("disc")})`} strokeWidth="3.2" />
      <circle cx={cx} cy={cy} r={rotorR} fill="none" stroke="#080a0e" strokeWidth="1" strokeDasharray="0.9 2.4" />
      {/* caliper — fixed, does not spin */}
      <rect
        x={cx + rotorR - 4.9}
        y={cy - 9.4}
        width="6.6"
        height="9.6"
        rx="2"
        fill="#2b3242"
        stroke="#9aa0ae"
        strokeWidth="0.8"
        transform={`rotate(20 ${cx} ${cy})`}
      />
      {/* faint red rim light */}
      <circle cx={cx} cy={cy} r="31.5" fill="none" stroke="rgba(239,41,49,.32)" strokeWidth="1" />
    </>
  );

  return (
    <svg viewBox="0 0 340 190" className={`bike-svg ${className}`} role="img" aria-label="TVS sports bike">
      <defs>
        <linearGradient id={id("body")} x1="0.1" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#ff7a52" />
          <stop offset="26%" stopColor="#ef2931" />
          <stop offset="62%" stopColor="#c01a28" />
          <stop offset="100%" stopColor="#7c0f1c" />
        </linearGradient>
        <linearGradient id={id("bodyDark")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a31523" />
          <stop offset="100%" stopColor="#5c0a13" />
        </linearGradient>
        <linearGradient id={id("metal")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2f4f8" />
          <stop offset="45%" stopColor="#b9bfca" />
          <stop offset="100%" stopColor="#5a6170" />
        </linearGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#dfe3ea" />
          <stop offset="42%" stopColor="#8b93a1" />
          <stop offset="100%" stopColor="#2f3541" />
        </linearGradient>
        <linearGradient id={id("disc")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c6ccd6" />
          <stop offset="55%" stopColor="#7d8490" />
          <stop offset="100%" stopColor="#3a404b" />
        </linearGradient>
        <radialGradient id={id("rubber")} cx="0.5" cy="0.42" r="0.62">
          <stop offset="0%" stopColor="#1a1f27" />
          <stop offset="62%" stopColor="#0e1116" />
          <stop offset="100%" stopColor="#05070a" />
        </radialGradient>
        <linearGradient id={id("gold")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f7e08a" />
          <stop offset="45%" stopColor="#d8a93c" />
          <stop offset="100%" stopColor="#8a6a18" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#eaf3ff" />
          <stop offset="45%" stopColor="#9fc4ee" />
          <stop offset="100%" stopColor="#3f5f86" />
        </linearGradient>
        <radialGradient id={id("lamp")} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#fff6d0" />
          <stop offset="100%" stopColor="#f0c56a" stopOpacity="0.12" />
        </radialGradient>
        <linearGradient id={id("beam")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff6d0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff6d0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("shadow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(0,0,0,.55)" />
          <stop offset="70%" stopColor="rgba(0,0,0,.22)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* ground contact shadow */}
      <ellipse cx="170" cy="166" rx="146" ry="11" fill={`url(#${id("shadow")})`} />

      {/* REAR WHEEL */}
      <g className="part p-rear-wheel">{wheel(95, 130, 10)}</g>

      {/* SWINGARM + ENGINE */}
      <g className="part p-engine">
        <path d="M96,128 L176,118 L176,127 L96,139 Z" fill={`url(#${id("metal")})`} opacity="0.85" />
        <path d="M96,128 L176,118 L176,121 L96,131 Z" fill="#eef0f4" opacity="0.5" />
        <rect x="148" y="98" width="58" height="40" rx="9" fill="#1e242f" stroke="#39414f" strokeWidth="1.4" />
        <rect x="152" y="102" width="50" height="16" rx="5" fill="#2a323f" />
        {[110, 117, 124, 131].map((y) => (
          <line key={y} x1="152" y1={y} x2="202" y2={y} stroke="#0b0e14" strokeWidth="1.2" opacity="0.9" />
        ))}
        {[
          [156, 106],
          [196, 106],
          [156, 132],
          [196, 132],
        ].map(([bx, by], i) => (
          <circle key={i} cx={bx} cy={by} r="1.5" fill="#9aa0ae" />
        ))}
        <circle cx="176" cy="120" r="11" fill="#2b3242" stroke={`url(#${id("metal")})`} strokeWidth="1.6" />
        <circle cx="176" cy="120" r="4" fill="#0d1117" />
        <path d="M158,104 C170,100 188,100 199,104" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* EXHAUST */}
      <g className="part p-exhaust">
        <path d="M198,132 C176,148 148,152 122,150" fill="none" stroke={`url(#${id("metal")})`} strokeWidth="7.5" strokeLinecap="round" />
        <path d="M198,130 C176,146 148,150 122,148" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx="92" cy="147" rx="29" ry="10.5" fill={`url(#${id("metal")})`} />
        <ellipse cx="92" cy="147" rx="29" ry="10.5" fill="none" stroke="#2b3242" strokeWidth="1.2" />
        <ellipse cx="92" cy="147" rx="29" ry="10.5" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="0.8" strokeDasharray="2 4" />
        <ellipse cx="64" cy="148" rx="6.5" ry="8.6" fill="#05070a" stroke="#4b5563" strokeWidth="1.4" />
        <rect x="104" y="137" width="6" height="19" rx="2" fill="#39414f" />
        <path d="M150,146 L186,138" stroke="#4b5563" strokeWidth="1.2" strokeDasharray="3 2" />
      </g>

      {/* SEAT + TAIL */}
      <g className="part p-seat">
        <path d="M78,96 L132,96 L124,82 L85,81 Z" fill="#0e1117" stroke="#2b3242" strokeWidth="1.4" />
        <path d="M84,95 L132,95" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
        <path d="M62,92 L86,82 L92,64 L70,60 L57,73 Z" fill={`url(#${id("body")})`} stroke="#4b0a13" strokeWidth="1.1" />
        <path d="M66,88 L86,80 L90,66" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="60" y="75" width="15" height="4.6" rx="2.3" fill="#f3f5f8" opacity="0.92" />
        <circle cx="62" cy="85.5" r="2.6" fill="#ef2931" />
        <path d="M59,78 L67,74 L68,79 L60,83 Z" fill="#ff3b3b" opacity="0.9" />
      </g>

      {/* TANK + PANELS */}
      <g className="part p-tank">
        <path
          d="M118,104 C140,82 175,76 200,86 L226,96 C230,100 228,108 220,110 L150,118 C130,118 118,112 118,104 Z"
          fill={`url(#${id("body")})`}
          stroke="#4b0a13"
          strokeWidth="1.1"
        />
        <path d="M150,118 L220,110 L214,124 L155,130 Z" fill={`url(#${id("bodyDark")})`} opacity="0.92" />
        <path d="M128,98 C150,81 182,77 202,86" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M136,104 C156,90 184,86 204,92" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.4" strokeLinecap="round" />
        <text
          x="168"
          y="104"
          textAnchor="middle"
          fontSize="13.5"
          fontWeight="900"
          fontStyle="italic"
          fill="#ffffff"
          fontFamily="Oswald, sans-serif"
          letterSpacing="1.2"
          opacity="0.96"
        >
          TVS
        </text>
      </g>

      {/* FRONT FAIRING + HEADLIGHT */}
      <g className="part p-cowl">
        <polygon points="268,88 332,66 332,112" fill={`url(#${id("beam")})`} opacity="0.45" />
        <path d="M228,58 L264,56 L272,90 L250,113 L231,104 Z" fill={`url(#${id("body")})`} stroke="#4b0a13" strokeWidth="1.1" />
        <path d="M232,62 L260,60 L259,74 L233,76 Z" fill={`url(#${id("bodyDark")})`} />
        <path d="M236,60 C248,57 258,58 262,60" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M237,58 L259,56 L254,40 L235,43 Z" fill={`url(#${id("glass")})`} stroke="#39414f" strokeWidth="1" opacity="0.9" />
        <path d="M236,78 L266,76 L262,96 L240,100 Z" fill="#0a0d12" stroke="#39414f" strokeWidth="1.2" />
        <ellipse cx="251" cy="88" rx="10.5" ry="9.5" fill={`url(#${id("lamp")})`} />
        <ellipse cx="251" cy="88" rx="10.5" ry="9.5" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="0.8" />
        <path d="M240,79 L263,77" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
        <circle cx="251" cy="88" r="4" fill="#ffffff" opacity="0.95" />
      </g>

      {/* FRONT FORK + WHEEL */}
      <g className="part p-front-wheel">
        <line x1="252" y1="128" x2="256" y2="96" stroke="#0d1117" strokeWidth="7.5" strokeLinecap="round" />
        <line x1="256" y1="96" x2="259" y2="66" stroke="#0d1117" strokeWidth="6" strokeLinecap="round" />
        <line x1="256" y1="94" x2="259" y2="67" stroke={`url(#${id("gold")})`} strokeWidth="6.6" strokeLinecap="round" />
        <line x1="247" y1="70" x2="262" y2="68" stroke="#39414f" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M212,112 A36,36 0 0 1 282,108 L278,118 A28,28 0 0 0 218,120 Z" fill={`url(#${id("body")})`} />
        <path d="M216,114 A32,32 0 0 1 262,110" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.4" strokeLinecap="round" />
        {wheel(245, 130, 12.4)}
      </g>

      {/* HANDLEBAR */}
      <g className="part p-handle">
        <line x1="256" y1="66" x2="275" y2="49" stroke="#0d1117" strokeWidth="6" strokeLinecap="round" />
        <line x1="248" y1="63" x2="258" y2="66" stroke="#1c2230" strokeWidth="9" strokeLinecap="round" />
        <line x1="275" y1="49" x2="288" y2="29" stroke="#525a68" strokeWidth="2.6" />
        <ellipse cx="292" cy="24" rx="12" ry="7.6" fill="#0e1117" stroke="#8f96a3" strokeWidth="1.8" />
        <ellipse cx="289" cy="22.5" rx="7" ry="3.6" fill={`url(#${id("glass")})`} opacity="0.85" />
        <line x1="272" y1="52" x2="288" y2="34" stroke="rgba(255,255,255,.4)" strokeWidth="0.8" />
        <circle cx="275" cy="49" r="3" fill={`url(#${id("metal")})`} />
      </g>
    </svg>
  );
}
