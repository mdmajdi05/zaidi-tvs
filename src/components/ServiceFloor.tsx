"use client";

import { useEffect, useRef } from "react";

const FSTAGES = [
  {
    tag: "BAY 01 / CHECK-IN",
    title: "ON THE LIFT",
    desc: "Your bike is wheeled in, tagged and lifted. Odometer, fuel and every concern you mentioned get logged before a spanner moves.",
    metric: "2 MIN",
    unit: "CHECK-IN TIME",
    bar: 26,
  },
  {
    tag: "BAY 02 / DIAGNOSTICS",
    title: "CODES READ",
    desc: "The diagnostic unit plugs in and reads live data — battery health, sensors and fault codes — so nothing is left to guesswork.",
    metric: "100%",
    unit: "SYSTEMS SCANNED",
    bar: 55,
  },
  {
    tag: "BAY 03 / SERVICE",
    title: "OIL + TUNE",
    desc: "Genuine oil, filters and plugs go in, the chain is set and every fastener is torque-checked to TVS spec.",
    metric: "Genuine",
    unit: "OEM PARTS ONLY",
    bar: 82,
  },
  {
    tag: "BAY 04 / QUALITY CHECK",
    title: "WASHED + READY",
    desc: "A road test confirms the fix, then a foam wash and polish bring back the shine. Keys back — and a service record for you.",
    metric: "4.9/5",
    unit: "CUSTOMER RATING",
    bar: 100,
  },
];

export default function ServiceFloor() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const liftRef = useRef<HTMLDivElement>(null);
  const armRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const barA = useRef<HTMLElement>(null);
  const barB = useRef<HTMLElement>(null);
  const barC = useRef<HTMLElement>(null);
  const unitsRef = useRef<HTMLElement>(null);
  const utilNumRef = useRef<HTMLElement>(null);
  const utilRingRef = useRef<SVGCircleElement>(null);
  const tempRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const beaconRef = useRef<HTMLDivElement>(null);
  const stageEls = useRef<(HTMLDivElement | null)[]>([]);
  const dotEls = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const t = window.setInterval(() => {
      if (clockRef.current) {
        clockRef.current.textContent = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let current = 0;
    const RING_C = 2 * Math.PI * 26;

    const render = () => {
      const sec = sectionRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const max = sec.offsetHeight - window.innerHeight;
        const raw = max > 0 ? -rect.top / max : 0;
        const target = Math.max(0, Math.min(1, raw));
        current += (target - current) * (reduced ? 1 : 0.09);

        if (bgRef.current) {
          bgRef.current.style.transform = `scale(${1.06 + current * 0.12}) translateX(${(
            -current * 2.5
          ).toFixed(2)}%)`;
        }
        if (scanRef.current) {
          scanRef.current.style.top = `${(8 + current * 78).toFixed(1)}%`;
          scanRef.current.style.opacity = String(0.35 + current * 0.5);
        }
        if (liftRef.current) {
          liftRef.current.style.transform = `translateY(${(-current * 34).toFixed(
            1
          )}px)`;
        }
        if (armRef.current) {
          armRef.current.style.transform = `rotate(${(
            -18 +
            Math.sin(current * Math.PI * 6) * 26
          ).toFixed(1)}deg)`;
        }
        if (sparksRef.current) {
          const flare = Math.max(0, 1 - Math.abs(current - 0.6) / 0.32);
          sparksRef.current.style.opacity = String(0.25 + flare * 0.75);
          sparksRef.current.style.transform = `scale(${(0.7 + flare * 0.6).toFixed(2)})`;
        }
        if (barA.current) barA.current.style.width = `${(40 + current * 55).toFixed(1)}%`;
        if (barB.current) barB.current.style.width = `${(30 + current * 62).toFixed(1)}%`;
        if (barC.current) barC.current.style.width = `${(20 + current * 72).toFixed(1)}%`;

        const idx = Math.min(FSTAGES.length - 1, Math.floor(current * 4));
        if (beaconRef.current) beaconRef.current.dataset.stage = String(idx);
        if (unitsRef.current) {
          unitsRef.current.textContent = Math.floor(6 + current * 38).toString();
        }
        if (utilNumRef.current) {
          utilNumRef.current.textContent = `${(62 + current * 30).toFixed(1)}%`;
        }
        if (utilRingRef.current) {
          const frac = 0.35 + current * 0.6;
          utilRingRef.current.style.strokeDashoffset = String(
            RING_C * (1 - Math.min(0.97, frac))
          );
        }
        if (tempRef.current) {
          tempRef.current.textContent = `${Math.floor(58 + current * 34)}°C`;
        }

        stageEls.current.forEach((el, i) => {
          if (!el) return;
          const active = i === idx;
          el.classList.toggle("active", active);
          el.setAttribute("aria-hidden", active ? "false" : "true");
        });
        dotEls.current.forEach((el, i) => {
          if (!el) return;
          el.classList.toggle("on", i <= idx);
        });
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${current})`;
        }
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="zFloorScroll"
      ref={sectionRef}
      aria-label="Zaidi TVS service floor — live workshop"
    >
      <div className="zFloorPin">
        <div className="zFloorHead">
          <div>
            <div className="eyebrow red">▣ &nbsp; 01.8 / ZAIDI TVS SERVICE FLOOR — LIVE</div>
            <h2>
              SERVICE
              <br />
              <span>NEVER STOPS.</span>
            </h2>
          </div>
          <div className="zFloorHud">
            <div className="zHudBox">
              <small>
                BIKES IN SERVICE · <span ref={clockRef}>--:--:--</span>
              </small>
              <b ref={unitsRef}>6</b>
            </div>
            <div className="zHudBox">
              <small>BAY UTILISATION</small>
              <div className="zUtilWrap">
                <svg viewBox="0 0 64 64" aria-hidden="true">
                  <circle cx="32" cy="32" r="26" className="zUtilBg" />
                  <circle cx="32" cy="32" r="26" className="zUtilFg" ref={utilRingRef} />
                </svg>
                <b ref={utilNumRef}>62.0%</b>
              </div>
            </div>
            <div className="zHudBox">
              <small>ENGINE TEMP</small>
              <b ref={tempRef}>58°C</b>
              <span className="zHudLive">
                <i aria-hidden="true" /> BAY ACTIVE
              </span>
            </div>
            <div className="zHudBeacon" ref={beaconRef} data-stage="0" aria-hidden="true">
              <span className="bl g" />
              <span className="bl y" />
              <span className="bl r" />
            </div>
          </div>
        </div>

        <p className="zFloorSub">
          Scroll to walk the bay — the lift rises, the mechanic works, the
          diagnostics sweep and the bike gets wash-and-ready. This is the floor
          behind every Zaidi TVS service.
        </p>

        <div className="zFloorBody">
          <div className="zScene">
            <div className="zSceneBg" ref={bgRef} aria-hidden="true" />
            <div className="zGrade" aria-hidden="true" />
            <div className="zLamps" aria-hidden="true">
              <i className="zLamp l1" />
              <i className="zLamp l2" />
              <i className="zLamp l3" />
            </div>
            <div className="zScan" ref={scanRef} aria-hidden="true" />

            <div className="zSign" aria-hidden="true">
              <span className="zSignMain">
                ZAIDI <b>TVS</b>
              </span>
              <span className="zSignSub">SERVICE BAY · CHANDPUR</span>
              <i className="zRivet tl" />
              <i className="zRivet tr" />
              <i className="zRivet bl" />
              <i className="zRivet br" />
            </div>

            <div className="zDiag" aria-hidden="true">
              <span className="zDiagHead">DIAGNOSTICS</span>
              <div className="zDiagBar">
                <b ref={barA} />
              </div>
              <div className="zDiagBar">
                <b ref={barB} />
              </div>
              <div className="zDiagBar">
                <b ref={barC} />
              </div>
            </div>

            <div className="zLift" ref={liftRef} aria-hidden="true">
              <div className="zLiftArm" />
              <div className="zBike">
                <span className="zBikeWheel front" />
                <span className="zBikeWheel rear" />
                <span className="zBikeBody" />
                <span className="zBikeSeat" />
                <span className="zBikeBar" />
                <span className="zBikeHead" />
              </div>
            </div>

            <div className="zMech" aria-hidden="true">
              <span className="zMechHead" />
              <span className="zMechTorso" />
              <div className="zMechArm" ref={armRef}>
                <span className="zWrench" />
              </div>
            </div>

            <div className="zWeldSparks" ref={sparksRef} aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className={`zFloorSpark k${(i % 12) + 1}`} />
              ))}
            </div>

            <div className="zToolCart" aria-hidden="true">
              <span className="zToolX" />
              <span className="zToolY" />
              <span className="zToolZ" />
            </div>

            <div className="zReflect" aria-hidden="true" />
            <div className="zVignette" aria-hidden="true" />
            <div className="zGrain" aria-hidden="true" />
          </div>

          <div className="zStageList">
            {FSTAGES.map((s, i) => (
              <div
                key={s.tag}
                ref={(el) => {
                  stageEls.current[i] = el;
                }}
                className={`zFStage${i === 0 ? " active" : ""}`}
              >
                <div className="zFStageTag">{s.tag}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="zFMetric">
                  <b>{s.metric}</b>
                  <small>{s.unit}</small>
                </div>
                <div className="zFBar">
                  <i style={{ width: `${s.bar}%` }} />
                </div>
              </div>
            ))}
            <div className="zFTimeline" aria-hidden="true">
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
            <div className="zFloorProgress">
              <div className="zFloorProgressTrack">
                <div className="zFloorProgressFill" ref={progressRef} />
              </div>
              <span>SCROLL TO RUN THE BAY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
