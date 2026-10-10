"use client";

import { useEffect, useRef } from "react";

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
  const flyRef = useRef<HTMLDivElement>(null);
  const pistonRef = useRef<HTMLDivElement>(null);
  const rodRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const inValveRef = useRef<HTMLDivElement>(null);
  const exValveRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const stageEls = useRef<(HTMLDivElement | null)[]>([]);
  const dotEls = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let current = 0;

    const render = () => {
      const sec = sectionRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const max = sec.offsetHeight - window.innerHeight;
        const raw = max > 0 ? -rect.top / max : 0;
        const target = Math.max(0, Math.min(1, raw));
        current += (target - current) * (reduced ? 1 : 0.1);

        const theta = current * Math.PI * 4; // two crank revolutions

        // piston rides between TDC and BDC
        const pistonY = 64 - Math.cos(theta) * 62;
        if (pistonRef.current) {
          pistonRef.current.style.transform = `translate(-50%, ${pistonY.toFixed(
            1
          )}px)`;
        }
        if (flyRef.current) {
          flyRef.current.style.transform = `rotate(${(current * 1440).toFixed(1)}deg)`;
        }
        if (rodRef.current) {
          rodRef.current.style.transform = `translate(-50%,0) rotate(${(
            Math.sin(theta) * 20
          ).toFixed(2)}deg)`;
        }

        const idx = Math.min(ESTAGES.length - 1, Math.floor(current * 4));
        const within = current * 4 - idx;
        const flame = idx === 2 ? Math.sin(within * Math.PI) : 0;
        if (burstRef.current) {
          burstRef.current.style.opacity = String(flame);
          burstRef.current.style.transform = `translate(-50%,-50%) scale(${(
            0.5 +
            flame * 0.9
          ).toFixed(2)})`;
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
          inValveRef.current.style.transform = `translateX(-50%) translateY(${(
            open * 9
          ).toFixed(1)}px)`;
        }
        if (exValveRef.current) {
          const open = idx === 3 ? Math.sin(within * Math.PI) : 0;
          exValveRef.current.style.transform = `translateX(-50%) translateY(${(
            open * 9
          ).toFixed(1)}px)`;
        }
        if (engineRef.current) {
          engineRef.current.style.transform = `rotateX(${(10 - current * 6).toFixed(
            1
          )}deg) rotateY(${(-14 + current * 10).toFixed(1)}deg)`;
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
              <div className="zBlock">
                <div className="zFins" />
                <div className="zBore">
                  <div className="zValve vIn" ref={inValveRef} />
                  <div className="zValve vEx" ref={exValveRef} />
                  <div className="zSparkPlug">
                    <i className="zSpark" />
                  </div>
                  <div className="zBurst" ref={burstRef} />
                  <div className="zPiston" ref={pistonRef}>
                    <span className="zRing1" />
                    <span className="zRing2" />
                    <span className="zPistonPin" />
                  </div>
                </div>
              </div>

              <div className="zRod" ref={rodRef} />

              <div className="zCrankWrap">
                <div className="zFlywheel" ref={flyRef}>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <span
                      key={deg}
                      className="zFWSpoke"
                      style={{ transform: `rotate(${deg}deg)` }}
                    />
                  ))}
                  <span className="zFWHub" />
                  <span className="zFWPin" />
                </div>
              </div>

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

          <div className="zStages">
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

      <div className="zEngineCards">
        <div className="zEngineCardsHead reveal">
          <div className="eyebrow red">▣ &nbsp; REAL RIDES. REAL CARE.</div>
          <h2>
            BUILT TO PERFORM.
            <br />
            KEPT TO LAST.
          </h2>
        </div>
        <div className="zEngineCardGrid">
          {CARDS.map((c) => (
            <article key={c.no} className="zEngineCard reveal">
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
    </section>
  );
}
