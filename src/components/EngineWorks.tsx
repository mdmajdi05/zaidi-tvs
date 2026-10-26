const STAGES = [
  {
    tag: "Intake",
    title: "Air and fuel in",
    desc: "The intake valve opens and the piston drops, pulling a precise air-fuel mix into the cylinder — smooth and metered by the ECU.",
    metric: "11.0:1",
    unit: "Compression ratio",
  },
  {
    tag: "Compression",
    title: "Squeeze the mix",
    desc: "Both valves seal and the piston rises, compressing the charge for a stronger, more efficient burn on every cycle.",
    metric: "124.8 cc",
    unit: "Displacement",
  },
  {
    tag: "Power",
    title: "Spark and punch",
    desc: "The plug fires and the charge ignites, driving the piston down and turning the crankshaft into the thrust you feel at the wheel.",
    metric: "10.3 PS",
    unit: "Power",
  },
  {
    tag: "Exhaust",
    title: "Out and clean",
    desc: "The exhaust valve opens and burnt gases leave through the silencer — tuned for a refined note and the mileage TVS is known for.",
    metric: "56 km/l",
    unit: "Mileage*",
  },
];

export default function EngineWorks() {
  return (
    <section className="ew" aria-label="How a TVS engine works — the four-stroke cycle">
      <div className="ew-inner">
        <header className="ew-head">
          <div>
            <h2>How a TVS engine works.</h2>
          </div>
          <p className="ew-lede">
            Four strokes, one smooth cycle. Here is the heart of every TVS we
            service — explained in the simplest way possible.
          </p>
        </header>

        <div className="ew-body">
          <figure className="ew-visual">
            <svg viewBox="0 0 400 550" role="img" aria-label="Cutaway diagram of a four-stroke TVS engine">
              <defs>
                <linearGradient id="ewBore" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#05070b" />
                  <stop offset="18%" stopColor="#2b3242" />
                  <stop offset="50%" stopColor="#4b5563" />
                  <stop offset="82%" stopColor="#2b3242" />
                  <stop offset="100%" stopColor="#05070b" />
                </linearGradient>
                <linearGradient id="ewFin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e8ebf0" />
                  <stop offset="25%" stopColor="#9aa0ae" />
                  <stop offset="100%" stopColor="#3a4152" />
                </linearGradient>
                <linearGradient id="ewPis" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c8494" />
                  <stop offset="30%" stopColor="#e8ebf0" />
                  <stop offset="55%" stopColor="#c9ced8" />
                  <stop offset="100%" stopColor="#6b7280" />
                </linearGradient>
                <linearGradient id="ewAlu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3a4152" />
                  <stop offset="100%" stopColor="#141821" />
                </linearGradient>
              </defs>

              {/* intake + exhaust ports */}
              <path d="M142,72 C110,66 84,52 66,34" fill="none" stroke="#2b3242" strokeWidth="26" strokeLinecap="round" />
              <path d="M142,72 C110,66 84,52 66,34" fill="none" stroke="#0b0e14" strokeWidth="15" strokeLinecap="round" />
              <path d="M258,72 C290,66 316,52 334,34" fill="none" stroke="#4a3a3a" strokeWidth="26" strokeLinecap="round" />
              <path d="M258,72 C290,66 316,52 334,34" fill="none" stroke="#0b0e14" strokeWidth="15" strokeLinecap="round" />

              {/* crankcase */}
              <rect x="88" y="352" width="224" height="180" rx="36" fill="url(#ewAlu)" stroke="#2b3242" strokeWidth="2" />
              <circle cx="200" cy="445" r="96" fill="#10151f" stroke="#3a4152" strokeWidth="2" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
                const r = (a * Math.PI) / 180;
                return (
                  <circle
                    key={a}
                    cx={+(200 + Math.cos(r) * 84).toFixed(2)}
                    cy={+(445 + Math.sin(r) * 84).toFixed(2)}
                    r="4"
                    fill="#6b7280"
                  />
                );
              })}
              <circle cx="268" cy="492" r="10" fill="#7a4d12" stroke="#3a4152" strokeWidth="2" />
              <circle cx="265" cy="489" r="3" fill="#ffd76b" />

              {/* cylinder block + cooling fins */}
              <rect x="118" y="108" width="164" height="224" fill="#1c2230" stroke="#0b0e14" strokeWidth="2" />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <g key={i}>
                  <rect x="100" y={130 + i * 25} width="200" height="13" rx="3" fill="url(#ewFin)" stroke="#10141b" strokeWidth="1" />
                  <line x1="104" y1={132 + i * 25} x2="296" y2={132 + i * 25} stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
                </g>
              ))}
              <rect x="140" y="100" width="120" height="240" fill="url(#ewBore)" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line key={i} x1={140 + i * 22} y1="100" x2={162 + i * 22} y2="340" stroke="rgba(255,255,255,.08)" strokeWidth="3" />
              ))}
              <line x1="100" y1="110" x2="300" y2="110" stroke="#b98d4f" strokeWidth="3" />
              <line x1="100" y1="332" x2="300" y2="332" stroke="#b98d4f" strokeWidth="3" />

              {/* combustion chamber dome */}
              <path d="M140,110 Q200,58 260,110" fill="#0d1118" stroke="#2b3242" strokeWidth="1.5" />

              {/* head cover */}
              <rect x="112" y="18" width="176" height="60" rx="12" fill="url(#ewAlu)" stroke="#3a4152" strokeWidth="2" />
              <text x="200" y="48" textAnchor="middle" fontSize="17" fontWeight="800" fill="#e8ebf0" fontFamily="Inter, sans-serif" letterSpacing="1">TVS</text>
              <text x="200" y="64" textAnchor="middle" fontSize="9" fill="#8a909e" letterSpacing="2">4-Stroke</text>
              {[[124, 28], [276, 28], [124, 68], [276, 68]].map(([x, y]) => (
                <g key={`${x}-${y}`}>
                  <circle cx={x} cy={y} r="5" fill="#6b7280" stroke="#2b3242" strokeWidth="1.5" />
                  <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke="#2b3242" strokeWidth="1.5" />
                </g>
              ))}

              {/* valves */}
              <ellipse cx="165" cy="112" rx="14" ry="5" fill="#0b0e14" stroke="#4b5563" strokeWidth="1.5" />
              <ellipse cx="235" cy="112" rx="14" ry="5" fill="#0b0e14" stroke="#4b5563" strokeWidth="1.5" />
              <g>
                <rect x="162" y="40" width="6" height="66" fill="#c9ced8" />
                <rect x="156" y="32" width="18" height="9" rx="2" fill="#6b7280" />
                <polyline points="158,96 172,88 158,80 172,72 158,64 172,56 158,48" fill="none" stroke="#8a909e" strokeWidth="2.5" />
                <ellipse cx="165" cy="110" rx="13" ry="6" fill="url(#ewPis)" stroke="#2b3242" strokeWidth="1" />
              </g>
              <g>
                <rect x="232" y="40" width="6" height="66" fill="#c9ced8" />
                <rect x="226" y="32" width="18" height="9" rx="2" fill="#6b7280" />
                <polyline points="228,96 242,88 228,80 242,72 228,64 242,56 228,48" fill="none" stroke="#8a909e" strokeWidth="2.5" />
                <ellipse cx="235" cy="110" rx="13" ry="6" fill="url(#ewPis)" stroke="#2b3242" strokeWidth="1" />
              </g>

              {/* spark plug */}
              <rect x="194" y="6" width="12" height="10" rx="2" fill="#3a4152" />
              <rect x="192" y="16" width="16" height="28" rx="3" fill="#eef1f5" />
              {[22, 30, 38].map((y) => (
                <line key={y} x1="192" y1={y} x2="208" y2={y} stroke="#b9bec8" strokeWidth="1.5" />
              ))}
              <rect x="188" y="44" width="24" height="16" rx="3" fill="#6b7280" stroke="#3a4152" strokeWidth="1.5" />
              <rect x="197" y="60" width="6" height="52" fill="#9aa0ae" />
              <rect x="204" y="100" width="9" height="12" fill="#6b7280" />
              <polygon points="200,108 203,118 213,120 204,126 206,136 200,129 194,136 196,126 187,120 197,118" fill="#fff" />

              {/* piston */}
              <g transform="translate(144 150)">
                <rect x="0" y="0" width="112" height="88" rx="9" fill="url(#ewPis)" stroke="#2b3242" strokeWidth="1.5" />
                <ellipse cx="35" cy="12" rx="14" ry="5" fill="#4b5563" />
                <ellipse cx="77" cy="12" rx="14" ry="5" fill="#4b5563" />
                {[22, 32, 42].map((y) => (
                  <rect key={y} x="3" y={y} width="106" height="4" rx="2" fill="#141821" />
                ))}
                {[20, 40, 60, 80, 94].map((x) => (
                  <line key={x} x1={x} y1="52" x2={x} y2="84" stroke="rgba(20,24,35,.25)" strokeWidth="2" />
                ))}
                <circle cx="56" cy="62" r="11" fill="#0d1117" stroke="#c9ced8" strokeWidth="2" />
                <circle cx="56" cy="62" r="4.5" fill="#4b5563" />
              </g>

              {/* connecting rod */}
              <path d="M200 239 L200 387" fill="none" stroke="#c9ced8" strokeWidth="17" strokeLinecap="round" />
              <path d="M200 239 L200 387" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="5" strokeLinecap="round" />

              {/* crankshaft + flywheel */}
              <g transform="translate(200 445)">
                <circle r="78" fill="none" stroke="#c9ced8" strokeWidth="9" />
                <circle r="87" fill="none" stroke="#4b5563" strokeWidth="5" strokeDasharray="6 5" />
                {[0, 60, 120, 180, 240, 300].map((a) => {
                  const r2 = (a * Math.PI) / 180;
                  return (
                    <line
                      key={a}
                      x1="0"
                      y1="0"
                      x2={+(Math.cos(r2) * 72).toFixed(2)}
                      y2={+(Math.sin(r2) * 72).toFixed(2)}
                      stroke="#8a909e"
                      strokeWidth="7"
                    />
                  );
                })}
                <ellipse cx="0" cy="26" rx="46" ry="48" fill="url(#ewAlu)" stroke="#3a4152" strokeWidth="2" />
                <circle cx="0" cy="-58" r="13" fill="#c9ced8" stroke="#2b3242" strokeWidth="2" />
                <circle cx="0" cy="-58" r="5" fill="#4b5563" />
                <circle r="12" fill="#8a909e" stroke="#2b3242" strokeWidth="2" />
                <circle r="4" fill="#2b3242" />
              </g>
            </svg>
            <figcaption>Four-stroke engine cutaway · TVS commuter engine</figcaption>
          </figure>

          <div className="ew-stages">
            {STAGES.map((stage, index) => (
              <article className="ew-card" key={stage.tag}>
                <span className="ew-num">{String(index + 1).padStart(2, "0")}</span>
                <div className="ew-card-body">
                  <p className="ew-tag">{stage.tag}</p>
                  <h3>{stage.title}</h3>
                  <p className="ew-desc">{stage.desc}</p>
                  <p className="ew-metric">
                    <b>{stage.metric}</b>
                    <small>{stage.unit}</small>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
