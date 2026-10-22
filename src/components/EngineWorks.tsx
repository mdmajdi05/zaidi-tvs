"use client";

import { useEffect, useRef } from "react";
import BikeSVG from "./BikeSVG";

const ESTAGES = [
  {
    tag: "STAGE 01 / INTAKE",
    title: "AIR + FUEL IN",
    desc: "The intake valve opens and the piston drops, pulling a precise air-fuel mix into the cylinder. Smooth, clean and metered by the ECU.",
    metric: "11.0:1",
    unit: "COMPRESSION RATIO",
    bar: 22,
  },
  {
    tag: "STAGE 02 / COMPRESSION",
    title: "SQUEEZE THE MIX",
    desc: "Both valves seal and the piston rises, compressing the charge for a stronger, more efficient burn on every single cycle.",
    metric: "124.8",
    unit: "CC DISPLACEMENT",
    bar: 55,
  },
  {
    tag: "STAGE 03 / POWER",
    title: "SPARK + PUNCH",
    desc: "The plug fires and the charge ignites — driving the piston down and turning the crankshaft into the thrust you feel at the wheel.",
    metric: "10.3",
    unit: "PS POWER",
    bar: 82,
  },
  {
    tag: "STAGE 04 / EXHAUST",
    title: "OUT + CLEAN",
    desc: "The exhaust valve opens and burnt gases leave through the silencer — tuned for a refined note and the mileage TVS is known for.",
    metric: "56",
    unit: "KM/L MILEAGE*",
    bar: 100,
  },
];

const CARDS = [
  {
    img: "/assets/performance-bike.jpg",
    alt: "TVS performance bike at the showroom",
    no: "ENG — 01",
    title: "Engine & Drivetrain",
    desc: "Regular oil, air-filter and chain care to keep power smooth and fuel figures strong.",
    stat: "Smooth power delivery",
  },
  {
    img: "/assets/featured-bike.jpg",
    alt: "TVS scooter service and diagnostics",
    no: "ENG — 02",
    title: "Computer Diagnostics",
    desc: "Fault codes read and cleared on modern TVS models — the electronics sorted, not guessed.",
    stat: "Accurate fault finding",
  },
  {
    img: "/assets/family-rider.jpg",
    alt: "TVS scooter ready for the road",
    no: "ENG — 03",
    title: "Tune & Road Test",
    desc: "Carb or injection tuned, brakes and tyres checked, then a real road test before handover.",
    stat: "Road-tested handover",
  },
  {
    img: "/assets/city-rider.jpg",
    alt: "TVS rider on the road",
    no: "ENG — 04",
    title: "Mileage Care",
    desc: "Fuel-system cleaning and correct-grade oil to protect the mileage you rely on every day.",
    stat: "Everyday economy",
  },
];

export default function EngineWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<SVGGElement>(null);
  const pistonRef = useRef<SVGGElement>(null);
  const rodRef = useRef<SVGPathElement>(null);
  const rodHiRef = useRef<SVGPathElement>(null);
  const burstRef = useRef<SVGGElement>(null);
  const inValveRef = useRef<SVGGElement>(null);
  const exValveRef = useRef<SVGGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const stageEls = useRef<(HTMLDivElement | null)[]>([]);
  const dotEls = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsBarRef = useRef<HTMLDivElement>(null);
  const stagesWrapRef = useRef<HTMLDivElement>(null);
  const ropesRef = useRef<SVGSVGElement[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let current = 0;
    let prevIdx = 0;

    const render = () => {
      const sec = sectionRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const max = sec.offsetHeight - window.innerHeight;
        const raw = max > 0 ? -rect.top / max : 0;
        const target = Math.max(0, Math.min(1, raw));
        current += (target - current) * (reduced ? 1 : 0.1);

        const theta = current * Math.PI * 4; // two crank revolutions
        const deg = (theta * 180) / Math.PI;
        // real slider-crank: R=58 crank, L=210 rod, shaft at (200,445)
        const crankX = 200 + 58 * Math.sin(theta);
        const crankY = 445 - 58 * Math.cos(theta);
        const pinY =
          crankY - Math.sqrt(210 * 210 - (crankX - 200) * (crankX - 200));
        const topY = pinY - 62;

        if (pistonRef.current) {
          pistonRef.current.setAttribute("transform", `translate(144 ${topY.toFixed(1)})`);
        }
        if (flyRef.current) {
          flyRef.current.setAttribute("transform", `rotate(${deg.toFixed(1)})`);
        }
        if (rodRef.current) {
          const d = `M200 ${pinY.toFixed(1)} L${crankX.toFixed(1)} ${crankY.toFixed(1)}`;
          rodRef.current.setAttribute("d", d);
          if (rodHiRef.current) rodHiRef.current.setAttribute("d", d);
        }

        const idx = Math.min(ESTAGES.length - 1, Math.floor(current * 4));
        // zanjir flexible: ends fixed (disconnect impossible), sag scroll-speed se hilta hai
        {
          const nowMs = performance.now() / 1000;
          const vel = Math.abs(target - current);
          const amp = reduced ? 0 : 2.5 + Math.min(9, vel * 800);
          const cy = 17 + Math.sin(nowMs * 3.4) * amp;
          const dAttr = `M4,7 Q50,${cy.toFixed(2)} 96,7`;
          ropesRef.current.forEach((svg) => {
            svg.querySelectorAll("path").forEach((p) => p.setAttribute("d", dAttr));
            const pins = svg.querySelectorAll("circle");
            pins.forEach((c, j) => {
              const t = (j + 1) / (pins.length + 1);
              const mt = 1 - t;
              c.setAttribute("cx", (mt * mt * 4 + 2 * mt * t * 50 + t * t * 96).toFixed(1));
              c.setAttribute("cy", (mt * mt * 7 + 2 * mt * t * cy + t * t * 7).toFixed(1));
            });
          });
        }
        if (idx !== prevIdx) {
          // mini bike kis side se khinch ke layegi
          if (stagesWrapRef.current) {
            stagesWrapRef.current.dataset.from = idx > prevIdx ? "right" : "left";
          }
          prevIdx = idx;
        }
        if (ghostRef.current) {
          ghostRef.current.textContent = `0${idx + 1}`;
        }
        const within = current * 4 - idx;
        const flame = idx === 2 ? Math.sin(within * Math.PI) : 0;
        if (burstRef.current) {
          burstRef.current.style.opacity = String(flame);
          burstRef.current.setAttribute(
            "transform",
            `translate(200 92) scale(${(0.5 + flame * 0.9).toFixed(2)})`
          );
        }
        if (glowRef.current) {
          glowRef.current.style.opacity = String(0.28 + current * 0.6);
          glowRef.current.style.transform = `translate(-50%,-50%) scale(${(
            0.85 +
            current * 0.5
          ).toFixed(2)})`;
        }
        if (inValveRef.current) {
          const open = idx === 0 ? Math.sin(within * Math.PI) : 0;
          inValveRef.current.setAttribute("transform", `translate(0 ${(open * 9).toFixed(1)})`);
        }
        if (exValveRef.current) {
          const open = idx === 3 ? Math.sin(within * Math.PI) : 0;
          exValveRef.current.setAttribute("transform", `translate(0 ${(open * 9).toFixed(1)})`);
        }
        if (engineRef.current) {
          engineRef.current.style.transform = `rotateX(${(10 - current * 6).toFixed(
            1
          )}deg) rotateY(${(-14 + current * 10).toFixed(1)}deg)`;
        }

        const seg = current * 4;
        stageEls.current.forEach((el, i) => {
          if (!el) return;
          const active = i === idx;
          el.classList.toggle("active", active);
          el.setAttribute("aria-hidden", active ? "false" : "true");
          // scrubbed entry/exit: card position scroll se judi hai
          const rel = seg - i;
          const last = i === ESTAGES.length - 1;
          let e = Math.max(0, Math.min(1, rel / 0.35));
          e = 1 - Math.pow(1 - e, 3);
          let xRaw = last ? 0 : Math.max(0, Math.min(1, (rel - 0.65) / 0.35));
          if (i === 0 && rel <= 0.001) {
            e = 1;
            xRaw = 0;
          }
          const op = 1 - xRaw;
          el.style.setProperty("--u", (1 - e).toFixed(3));
          el.style.setProperty("--x", xRaw.toFixed(3));
          el.style.setProperty("--o", Math.max(0, Math.min(1, Math.min(e, op))).toFixed(3));
        });
        dotEls.current.forEach((el, i) => {
          if (!el) return;
          el.classList.toggle("on", i <= idx);
        });
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${current})`;
        }

        // cards strip: vertical scroll -> horizontal slide (right to left)
        const cs = cardsRef.current;
        const tr = trackRef.current;
        if (cs && tr) {
          const cr = cs.getBoundingClientRect();
          const cmax = Math.max(1, cs.offsetHeight - window.innerHeight);
          const cp = Math.max(0, Math.min(1, -cr.top / cmax));
          const maxX = Math.max(0, tr.scrollWidth - window.innerWidth * 0.94);
          tr.style.transform = `translate3d(${(-cp * maxX).toFixed(1)}px, 0, 0)`;
          if (cardsBarRef.current) {
            cardsBarRef.current.style.transform = `scaleX(${cp})`;
          }
        }
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
    <section className="zEngineCards light" ref={cardsRef} aria-label="Engine care at Zaidi TVS">
      <div className="zEngineCardsPin">
          <div className="zEngineCardsHead reveal">
            <div className="eyebrow red">▣ &nbsp; REAL RIDES. REAL CARE.</div>
            <h2>
              BUILT TO PERFORM.
              <br />
              <span>KEPT TO LAST.</span>
            </h2>
          </div>
          <div className="zEngineTrackWrap">
            <div className="zEngineCardGrid" ref={trackRef}>
              {CARDS.map((c) => (
                <article key={c.no} className="zEngineCard">
                  <div className="zEngineImg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.alt} loading="lazy" />
                    <span className="zEngineShine" aria-hidden="true" />
                    <span className="zEngineNo">{c.no}</span>
                  </div>
                  <div className="zEngineCardText">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    <div className="zEngineStat">
                      <i aria-hidden="true" />
                      {c.stat}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="zEngineCardsHint" aria-hidden="true">
            <span>SCROLL — CARDS SLIDE →</span>
            <div className="zEngineCardsBar">
              <i ref={cardsBarRef} />
            </div>
          </div>
      </div>
    </section>

    <section
      className="zEngineScroll"
      ref={sectionRef}
      aria-label="How a TVS engine works — the four-stroke cycle"
    >
      <div className="zEnginePin">
        <div className="zEngineGrid" aria-hidden="true" />
        <div className="zEngineHead">
          <div>
            <div className="eyebrow red">▣ &nbsp; 01.5 / UNDER THE TANK</div>
            <h2>
              WATCH A TVS ENGINE
              <br />
              <span>BREATHE + BURN.</span>
            </h2>
          </div>
          <p>
            Scroll — the piston pumps, the crank spins and the plug fires. A live
            cutaway of the four-stroke heart of every TVS we service.
          </p>
        </div>

        <div className="zEngineBody">
          <div className="zEngineWrap" aria-hidden="true">
            <div className="zEngineGlow" ref={glowRef} />
            <div className="zEngine3d" ref={engineRef}>
              <svg className="zEngineSvg" viewBox="0 0 400 550" role="img" aria-label="TVS four-stroke engine cutaway">
                <defs>
                  <linearGradient id="zeBore" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#05070b" />
                    <stop offset="18%" stopColor="#2b3242" />
                    <stop offset="50%" stopColor="#4b5563" />
                    <stop offset="82%" stopColor="#2b3242" />
                    <stop offset="100%" stopColor="#05070b" />
                  </linearGradient>
                  <linearGradient id="zeFin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e8ebf0" />
                    <stop offset="25%" stopColor="#9aa0ae" />
                    <stop offset="100%" stopColor="#3a4152" />
                  </linearGradient>
                  <linearGradient id="zePis" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c8494" />
                    <stop offset="30%" stopColor="#e8ebf0" />
                    <stop offset="55%" stopColor="#c9ced8" />
                    <stop offset="100%" stopColor="#6b7280" />
                  </linearGradient>
                  <linearGradient id="zeAlu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3a4152" />
                    <stop offset="100%" stopColor="#141821" />
                  </linearGradient>
                  <radialGradient id="zeFlame" cx="0.5" cy="0.65" r="0.6">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="35%" stopColor="#ffd76b" />
                    <stop offset="65%" stopColor="#ff5e3a" />
                    <stop offset="100%" stopColor="#ef2931" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* intake + exhaust ports */}
                <path d="M142,72 C110,66 84,52 66,34" fill="none" stroke="#2b3242" strokeWidth="26" strokeLinecap="round" />
                <path d="M142,72 C110,66 84,52 66,34" fill="none" stroke="#0b0e14" strokeWidth="15" strokeLinecap="round" />
                <path d="M258,72 C290,66 316,52 334,34" fill="none" stroke="#4a3a3a" strokeWidth="26" strokeLinecap="round" />
                <path d="M258,72 C290,66 316,52 334,34" fill="none" stroke="#0b0e14" strokeWidth="15" strokeLinecap="round" />

                {/* crankcase + main cover */}
                <rect x="88" y="352" width="224" height="180" rx="36" fill="url(#zeAlu)" stroke="#2b3242" strokeWidth="2" />
                <circle cx="200" cy="445" r="96" fill="#10151f" stroke="#3a4152" strokeWidth="2" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
                  const r = (a * Math.PI) / 180;
                  return <circle key={a} cx={+(200 + Math.cos(r) * 84).toFixed(2)} cy={+(445 + Math.sin(r) * 84).toFixed(2)} r="4" fill="#6b7280" />;
                })}
                <circle cx="268" cy="492" r="10" fill="#7a4d12" stroke="#3a4152" strokeWidth="2" />
                <circle cx="265" cy="489" r="3" fill="#ffd76b" />

                {/* cylinder block + cooling fins */}
                <rect x="118" y="108" width="164" height="224" fill="#1c2230" stroke="#0b0e14" strokeWidth="2" />
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <g key={i}>
                    <rect x="100" y={130 + i * 25} width="200" height="13" rx="3" fill="url(#zeFin)" stroke="#10141b" strokeWidth="1" />
                    <line x1="104" y1={132 + i * 25} x2="296" y2={132 + i * 25} stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
                  </g>
                ))}
                {/* honed bore barrel */}
                <rect x="140" y="100" width="120" height="240" fill="url(#zeBore)" />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={i} x1={140 + i * 22} y1="100" x2={162 + i * 22} y2="340" stroke="rgba(255,255,255,.08)" strokeWidth="3" />
                ))}
                {/* head + base gaskets */}
                <line x1="100" y1="110" x2="300" y2="110" stroke="#b98d4f" strokeWidth="3" />
                <line x1="100" y1="332" x2="300" y2="332" stroke="#b98d4f" strokeWidth="3" />

                {/* combustion chamber dome */}
                <path d="M140,110 Q200,58 260,110" fill="#0d1118" stroke="#2b3242" strokeWidth="1.5" />

                {/* head cover (sectioned) */}
                <rect x="112" y="18" width="176" height="60" rx="12" fill="url(#zeAlu)" stroke="#3a4152" strokeWidth="2" />
                <text x="200" y="48" textAnchor="middle" fontSize="17" fontWeight="900" fontStyle="italic" fill="#e8ebf0" fontFamily="Oswald, sans-serif" letterSpacing="2">TVS</text>
                <text x="200" y="64" textAnchor="middle" fontSize="9" fill="#8a909e" letterSpacing="3">4-STROKE</text>
                {[[124, 28], [276, 28], [124, 68], [276, 68]].map(([x, y]) => (
                  <g key={`${x}-${y}`}>
                    <circle cx={x} cy={y} r="5" fill="#6b7280" stroke="#2b3242" strokeWidth="1.5" />
                    <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke="#2b3242" strokeWidth="1.5" />
                  </g>
                ))}

                {/* valve seats */}
                <ellipse cx="165" cy="112" rx="14" ry="5" fill="#0b0e14" stroke="#4b5563" strokeWidth="1.5" />
                <ellipse cx="235" cy="112" rx="14" ry="5" fill="#0b0e14" stroke="#4b5563" strokeWidth="1.5" />
                {/* intake + exhaust valves with springs */}
                <g ref={inValveRef}>
                  <rect x="162" y="40" width="6" height="66" fill="#c9ced8" />
                  <rect x="156" y="32" width="18" height="9" rx="2" fill="#6b7280" />
                  <polyline points="158,96 172,88 158,80 172,72 158,64 172,56 158,48" fill="none" stroke="#8a909e" strokeWidth="2.5" />
                  <ellipse cx="165" cy="110" rx="13" ry="6" fill="url(#zePis)" stroke="#2b3242" strokeWidth="1" />
                </g>
                <g ref={exValveRef}>
                  <rect x="232" y="40" width="6" height="66" fill="#c9ced8" />
                  <rect x="226" y="32" width="18" height="9" rx="2" fill="#6b7280" />
                  <polyline points="228,96 242,88 228,80 242,72 228,64 242,56 228,48" fill="none" stroke="#8a909e" strokeWidth="2.5" />
                  <ellipse cx="235" cy="110" rx="13" ry="6" fill="url(#zePis)" stroke="#2b3242" strokeWidth="1" />
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
                <polygon className="zSparkFlash" points="200,108 203,118 213,120 204,126 206,136 200,129 194,136 196,126 187,120 197,118" fill="#fff" />

                {/* combustion flame */}
                <g ref={burstRef} opacity="0">
                  <ellipse cx="0" cy="0" rx="46" ry="54" fill="url(#zeFlame)" />
                  <ellipse cx="0" cy="-6" rx="22" ry="28" fill="#fff" opacity="0.9" />
                </g>

                {/* piston with rings + pin */}
                <g ref={pistonRef} transform="translate(144 150)">
                  <rect x="0" y="0" width="112" height="88" rx="9" fill="url(#zePis)" stroke="#2b3242" strokeWidth="1.5" />
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

                {/* connecting rod (recomputed every frame: pin to crank, no gaps) */}
                <path ref={rodRef} d="M200 239 L200 387" fill="none" stroke="#c9ced8" strokeWidth="17" strokeLinecap="round" />
                <path ref={rodHiRef} d="M200 239 L200 387" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="5" strokeLinecap="round" />

                {/* crankshaft + flywheel (rotating) */}
                <g transform="translate(200 445)">
                  <g ref={flyRef}>
                    <circle r="78" fill="none" stroke="#c9ced8" strokeWidth="9" />
                    <circle r="87" fill="none" stroke="#4b5563" strokeWidth="5" strokeDasharray="6 5" />
                    {[0, 60, 120, 180, 240, 300].map((a) => {
                      const r2 = (a * Math.PI) / 180;
                      return <line key={a} x1="0" y1="0" x2={+(Math.cos(r2) * 72).toFixed(2)} y2={+(Math.sin(r2) * 72).toFixed(2)} stroke="#8a909e" strokeWidth="7" />;
                    })}
                    <ellipse cx="0" cy="26" rx="46" ry="48" fill="url(#zeAlu)" stroke="#3a4152" strokeWidth="2" />
                    <circle cx="0" cy="-58" r="13" fill="#c9ced8" stroke="#2b3242" strokeWidth="2" />
                    <circle cx="0" cy="-58" r="5" fill="#4b5563" />
                  </g>
                  <circle r="12" fill="#8a909e" stroke="#2b3242" strokeWidth="2" />
                  <circle r="4" fill="#2b3242" />
                </g>
              </svg>

              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className={`zParticle p${i + 1}`} />
              ))}
            </div>
            <div className="zEngineBase">
              <span>
                <i /> INTAKE
              </span>
              <span>
                <i /> COMPRESS
              </span>
              <span>
                <i /> POWER
              </span>
              <span>
                <i /> EXHAUST
              </span>
            </div>
          </div>

          <div className="zStages" ref={stagesWrapRef}>
            <div className="zStageGhost" ref={ghostRef} aria-hidden="true">
              01
            </div>
            {ESTAGES.map((s, i) => (
              <div
                key={s.tag}
                ref={(el) => {
                  stageEls.current[i] = el;
                }}
                className={`zStage${i === 0 ? " active" : ""}`}
              >
                <div className="zStageTag">{s.tag}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="zMetric">
                  <b>{s.metric}</b>
                  <small>{s.unit}</small>
                </div>
                <div className="zBar">
                  <i style={{ width: `${s.bar}%` }} />
                </div>
                <span className="zLead" aria-hidden="true">
                  <span className="zLeadBike">
                    <BikeSVG />
                  </span>
                  <svg
                    className="zLeadRope"
                    ref={(el) => {
                      if (el && !ropesRef.current.includes(el)) ropesRef.current.push(el);
                    }}
                    viewBox="0 0 100 30"
                    preserveAspectRatio="none"
                  >
                    <path className="zr1" d="M4,7 Q50,27 96,7" />
                    <path className="zr2" d="M4,7 Q50,27 96,7" />
                    {[[13.2, 11.2], [22.4, 13.8], [31.6, 15.6], [40.8, 16.6], [50, 17], [59.2, 16.6], [68.4, 15.6], [77.6, 13.8], [86.8, 11.2]].map(([x, y]) => (
                      <circle key={x} cx={x} cy={y} r="3.6" className="zp" />
                    ))}
                  </svg>
                  <span className="zLeadHook" />
                  <span className="zLeadLink" />
                </span>
              </div>
            ))}
            <div className="zEngineTimeline" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  ref={(el) => {
                    dotEls.current[i] = el;
                  }}
                  className={i === 0 ? "on" : ""}
                />
              ))}
            </div>
            <div className="zEngineProgress">
              <div className="zEngineProgressTrack">
                <div className="zEngineProgressFill" ref={progressRef} />
              </div>
              <span>SCROLL TO RUN THE CYCLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
