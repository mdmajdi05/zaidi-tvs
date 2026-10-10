"use client";

import { useEffect, useRef } from "react";

const PSTAGES = [
  {
    no: "01",
    short: "ENQUIRY",
    tag: "STEP 01 / ENQUIRY",
    title: "REACH OUT",
    desc: "Call, WhatsApp or walk in. Tell us your bike and what it needs — our desk logs it and gives you a clear, fixed estimate.",
    metric: "1 Min",
    unit: "TO LOG YOUR JOB",
    chips: ["Call / WhatsApp", "Job logged", "Fixed estimate"],
    status: "Enquiry received",
  },
  {
    no: "02",
    short: "BOOKING",
    tag: "STEP 02 / BOOKING",
    title: "SLOT BOOKED",
    desc: "Pick a time that suits you. We reserve a bay and, if you want, arrange doorstep pickup for your ride.",
    metric: "Same Day",
    unit: "SLOTS AVAILABLE",
    chips: ["Pick a slot", "Bay reserved", "Pickup option"],
    status: "Slot booked",
  },
  {
    no: "03",
    short: "SERVICE",
    tag: "STEP 03 / SERVICE",
    title: "IN THE BAY",
    desc: "Diagnostics, genuine parts and a careful service by factory-trained hands — with a call if anything extra is needed.",
    metric: "100%",
    unit: "GENUINE PARTS",
    chips: ["Diagnostics", "Genuine parts", "Transparent bill"],
    status: "In service",
  },
  {
    no: "04",
    short: "DELIVERY",
    tag: "STEP 04 / RIDE OUT",
    title: "READY TO RIDE",
    desc: "Road-tested, washed and polished — handed back with a service record and a reminder for your next visit.",
    metric: "4.9/5",
    unit: "CUSTOMER RATING",
    chips: ["Road test", "Wash & polish", "Service record"],
    status: "Ready to ride",
  },
];

const VW = 1000;
const VH = 430;
const ROAD_SAMPLES = 240;

const ROAD = (() => {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= ROAD_SAMPLES; i++) {
    const t = i / ROAD_SAMPLES;
    pts.push({
      x: 70 + t * (VW - 140),
      y: 290 - t * 150 + Math.sin(t * Math.PI * 5) * 62,
    });
  }
  return pts;
})();

const ROAD_D = "M " + ROAD.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ");

const STATION_T = [0, 1 / 3, 2 / 3, 1];
const STATIONS = STATION_T.map((t, i) => {
  const p = ROAD[Math.round(t * (ROAD.length - 1))];
  return { i, x: p.x, y: p.y };
});

const START = STATIONS[0];
const END = STATIONS[STATIONS.length - 1];

const TREES = [
  { x: 175, y: 388 },
  { x: 320, y: 396 },
  { x: 470, y: 384 },
  { x: 640, y: 392 },
  { x: 800, y: 386 },
];

function ScooterWheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r="9.4" fill="#08080a" />
      <circle cx={cx} cy={cy} r="7.8" fill="#15151a" />
      <circle cx={cx} cy={cy} r="4.6" fill="url(#zjRim)" stroke="#5a5f68" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r="1.5" fill="#c6cad2" stroke="#4c5058" strokeWidth="0.6" />
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(rad) * 4.4}
            y2={cy + Math.sin(rad) * 4.4}
            stroke="#8a909a"
            strokeWidth="0.8"
          />
        );
      })}
    </>
  );
}

export default function RideJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const scooterRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const wheelARef = useRef<SVGGElement>(null);
  const wheelBRef = useRef<SVGGElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const nodeEls = useRef<(SVGGElement | null)[]>([]);
  const stageEls = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = PSTAGES.length;
    let frame = 0;
    let current = 0;
    let spin = 0;

    const render = () => {
      const sec = sectionRef.current;
      const path = pathRef.current;
      const scooter = scooterRef.current;

      if (sec && path && scooter) {
        const rect = sec.getBoundingClientRect();
        const max = sec.offsetHeight - window.innerHeight;
        const raw = max > 0 ? -rect.top / max : 0;
        const target = Math.max(0, Math.min(1, raw));
        current += (target - current) * (reduced ? 1 : 0.085);

        const idx = Math.min(N - 1, Math.floor(current * N));

        const len = path.getTotalLength();
        const at = current * len;
        const pt = path.getPointAtLength(at);
        const ahead = path.getPointAtLength(Math.min(len, at + 3));
        const ang = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
        scooter.setAttribute(
          "transform",
          `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${ang.toFixed(2)})`
        );

        if (!reduced) spin = (spin + 6) % 36000;
        wheelARef.current?.setAttribute("transform", `rotate(${spin} 30 7)`);
        wheelBRef.current?.setAttribute("transform", `rotate(${spin} -30 7)`);

        nodeEls.current.forEach((el, i) => {
          if (!el) return;
          el.classList.toggle("done", current * N >= i + 0.5);
          el.classList.toggle("now", i === idx);
        });

        if (ghostRef.current) ghostRef.current.textContent = PSTAGES[idx].no;
        if (statusRef.current) statusRef.current.textContent = PSTAGES[idx].status;
        stageEls.current.forEach((el, i) => {
          if (!el) return;
          const active = i === idx;
          el.classList.toggle("active", active);
          el.setAttribute("aria-hidden", active ? "false" : "true");
        });
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${current})`;
        }
        if (pctRef.current) {
          pctRef.current.textContent = `${Math.round(current * 100)}%`;
        }
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="zJourneyScroll"
      ref={sectionRef}
      aria-label="How Zaidi TVS service works — from enquiry to ride-out"
    >
      <div className="zJourneyPin">
        <div className="zJourneyGrid" aria-hidden="true" />
        <div className="zGhostNo" ref={ghostRef} aria-hidden="true">
          01
        </div>

        <div className="zJourneyHead">
          <div>
            <div className="eyebrow red">▣ &nbsp; 03 / HOW IT WORKS</div>
            <h2>
              ENQUIRY TO
              <br />
              <span>RIDE-OUT.</span>
            </h2>
          </div>
          <p>
            Scroll — your ride rolls from booking to handover, clearing every
            checkpoint with Zaidi TVS on the way.
          </p>
        </div>

        <div className="zJourneyBody">
          <div className="zPStageWrap">
            {PSTAGES.map((s, i) => (
              <div
                key={s.no}
                ref={(el) => {
                  stageEls.current[i] = el;
                }}
                className={`zPStage${i === 0 ? " active" : ""}`}
              >
                <div className="zPStageTag">{s.tag}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="zPChips">
                  {s.chips.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                <div className="zPMetric">
                  <b>{s.metric}</b>
                  <small>{s.unit}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="zJourneyMapWrap">
            <div className="zJobHud" aria-hidden="true">
              <span className="zJobDot" />
              <b>ZTVS-JOB-2026-0426</b>
              <span className="zJobStatus" ref={statusRef}>
                Enquiry received
              </span>
            </div>

            <svg
              className="zJourneyMap"
              viewBox={`0 0 ${VW} ${VH}`}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="zjHeadGlow">
                  <stop offset="0%" stopColor="#fffdf2" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#ffe680" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#ffd36b" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="zjBeam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff4c2" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ffd36b" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="zjRim" cx="0.38" cy="0.32" r="0.8">
                  <stop offset="0%" stopColor="#f4f6f9" />
                  <stop offset="45%" stopColor="#c4c8d1" />
                  <stop offset="100%" stopColor="#787d86" />
                </radialGradient>
                <linearGradient id="zjBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbfcfe" />
                  <stop offset="55%" stopColor="#eceef3" />
                  <stop offset="100%" stopColor="#d2d7df" />
                </linearGradient>
              </defs>

              <g className="zScenery">
                {TREES.map((t) => (
                  <g key={`${t.x}-${t.y}`} transform={`translate(${t.x} ${t.y})`}>
                    <rect x="-2" y="-7" width="4" height="10" fill="#3a2c1e" />
                    <path d="M 0 -32 L 11 -7 L -11 -7 Z" fill="#1f3a2a" />
                    <path d="M 0 -22 L 8 -7 L -8 -7 Z" fill="#274a35" />
                  </g>
                ))}
              </g>

              <path className="zRoadBase" d={ROAD_D} />
              <path className="zRoad" ref={pathRef} d={ROAD_D} />
              <path className="zRoadDash" d={ROAD_D} />

              {/* showroom (start) */}
              <circle className="zStartPulse" cx={START.x} cy={START.y} r="20" />
              <g className="zDepot now" transform={`translate(${START.x} ${START.y})`}>
                <rect x="-40" y="-56" width="80" height="56" fill="#262734" stroke="#4a4b58" strokeWidth="1.6" />
                <rect x="-44" y="-60" width="88" height="6" rx="1" fill="#1b1c24" stroke="#4a4b58" strokeWidth="1.2" />
                <rect x="-30" y="-64" width="3" height="8" fill="#4a4b58" />
                <rect x="27" y="-64" width="3" height="8" fill="#4a4b58" />
                <rect x="-37" y="-86" width="74" height="24" rx="2" fill="#f4f4f1" stroke="#c4c4cc" strokeWidth="1.2" />
                <rect x="-37" y="-86" width="74" height="4" rx="1" fill="#ef2931" />
                <rect x="-37" y="-66" width="74" height="4" rx="1" fill="#ef2931" opacity="0.85" />
                <text x="0" y="-70.5" textAnchor="middle" fontSize="11" fontWeight="900" letterSpacing="0.6" fill="#141416">
                  ZAIDI TVS
                </text>
                <rect x="-33" y="-50" width="13" height="11" fill="#8fd0ff" opacity="0.8" />
                <rect x="-6.5" y="-50" width="13" height="11" fill="#8fd0ff" opacity="0.8" />
                <rect x="20" y="-50" width="13" height="11" fill="#8fd0ff" opacity="0.8" />
                <rect x="-11" y="-20" width="22" height="20" fill="#0d0d10" stroke="#4a4b58" />
                <rect x="-15" y="-23" width="30" height="4" rx="1" fill="#ef2931" />
              </g>

              {/* checkpoint pins */}
              {STATIONS.map((s, i) =>
                i === 0 || i === STATIONS.length - 1 ? null : (
                  <g
                    key={s.i}
                    ref={(el) => {
                      nodeEls.current[i] = el;
                    }}
                    className="zNode"
                    transform={`translate(${s.x} ${s.y - 30})`}
                  >
                    <path d="M 0 20 L -7 8 L 7 8 Z" fill="#141416" stroke="#3a3a40" strokeWidth="1.5" />
                    <circle className="zPin" cx="0" cy="0" r="11" />
                    <text className="zNo" x="0" y="3.5" textAnchor="middle">
                      {PSTAGES[i].no}
                    </text>
                    <text className="zLbl" x="0" y="-22" textAnchor="middle">
                      {PSTAGES[i].short}
                    </text>
                    <g className="zCheck">
                      <circle cx="9" cy="-9" r="6.5" fill="#1f9d55" />
                      <path d="M 6 -9 l2.2 2.4 4 -4.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </g>
                )
              )}

              {/* rider destination */}
              <g className="zClient" transform={`translate(${END.x} ${END.y})`}>
                <rect x="-42" y="-58" width="84" height="58" fill="#232a2e" stroke="#3f4a50" strokeWidth="1.6" />
                <rect x="-46" y="-62" width="92" height="6" rx="1" fill="#1a1f22" stroke="#3f4a50" strokeWidth="1.2" />
                <rect x="-41" y="-87" width="82" height="24" rx="2" fill="#eef1f4" stroke="#c7ccd2" strokeWidth="1.2" />
                <rect x="-41" y="-87" width="82" height="4" rx="1" fill="#1f9d55" />
                <text x="0" y="-70.5" textAnchor="middle" fontSize="10.5" fontWeight="900" letterSpacing="0.6" fill="#141416">
                  YOUR RIDE
                </text>
                <text x="0" y="-94" textAnchor="middle" fontSize="9" fontWeight="800" letterSpacing="1.6" fill="#7fd6a2">
                  RIDE-OUT
                </text>
                <rect x="-34" y="-52" width="13" height="11" fill="#8fd0ff" opacity="0.7" />
                <rect x="-6.5" y="-52" width="13" height="11" fill="#8fd0ff" opacity="0.7" />
                <rect x="21" y="-52" width="13" height="11" fill="#8fd0ff" opacity="0.7" />
                <rect x="-11" y="-20" width="22" height="20" fill="#0d0d10" stroke="#3f4a50" />
                <rect x="-15" y="-23" width="30" height="4" rx="1" fill="#1f9d55" />
              </g>

              {/* scooter */}
              <g className="zScooter" ref={scooterRef} transform={`translate(${START.x} ${START.y})`}>
                <g transform="translate(0 -12)">
                  <ellipse cx="0" cy="16" rx="52" ry="6" fill="rgba(0,0,0,0.42)" />
                  {/* beam */}
                  <polygon points="34 -8 34 -2 66 -16 66 4" fill="url(#zjBeam)" />
                  <circle cx="34" cy="-5" r="5.5" fill="url(#zjHeadGlow)" />
                  {/* body */}
                  <path
                    d="M -30 -6 Q -34 -30 -10 -32 L 16 -30 Q 30 -28 34 -8 Z"
                    fill="url(#zjBody)"
                    stroke="#c3c8d0"
                    strokeWidth="1.1"
                  />
                  <path d="M -30 -6 Q -34 -30 -10 -32 L 16 -30 Q 30 -28 34 -8 Z" fill="none" stroke="#ef2931" strokeWidth="2.2" opacity="0.9" />
                  {/* seat */}
                  <path d="M -30 -30 Q -16 -38 4 -34 L 8 -28 Q -14 -30 -28 -24 Z" fill="#1b1b22" stroke="#3d3d49" strokeWidth="1" />
                  {/* front shield + handlebar */}
                  <path d="M 20 -30 Q 34 -34 34 -8 L 24 -8 Z" fill="#e8ebf0" stroke="#c3c8d0" strokeWidth="1" />
                  <rect x="30" y="-40" width="2.6" height="12" rx="1" fill="#0f0f14" />
                  <rect x="24" y="-42" width="14" height="3" rx="1.4" fill="#0f0f14" />
                  {/* mirrors */}
                  <rect x="26" y="-50" width="1.6" height="9" fill="#0f0f14" />
                  <circle cx="26.8" cy="-51" r="2.4" fill="#0f0f14" stroke="#3d3d49" strokeWidth="0.7" />
                  {/* headlight */}
                  <rect x="31" y="-18" width="5" height="7" rx="1.6" fill="#fff6d0" />
                  <rect x="31.6" y="-17" width="3" height="3" rx="1" fill="#fffdf4" />
                  {/* brand sticker */}
                  <text x="-14" y="-12" textAnchor="middle" fontSize="7" fontWeight="900" letterSpacing="0.4" fill="#ef2931">
                    TVS
                  </text>
                  {/* wheels */}
                  <g ref={wheelBRef}>
                    <ScooterWheel cx={-30} cy={7} />
                  </g>
                  <g ref={wheelARef}>
                    <ScooterWheel cx={30} cy={7} />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="zJourneyProgress">
          <span>SCROLL TO RIDE OUT</span>
          <div className="zJourneyProgressTrack">
            <div className="zJourneyProgressFill" ref={progressRef} />
          </div>
          <span className="zJourneyProgressPct" ref={pctRef}>
            0%
          </span>
        </div>
      </div>
    </section>
  );
}
