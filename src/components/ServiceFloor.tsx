"use client";

const SERVICE_STAGES = [
  {
    tag: "STAGE 01",
    title: "Check-in & Inspection",
    desc: "Every bike is logged, odometer and fuel recorded, and every concern you mentioned is noted before work begins.",
    image: "/assets/hero-bike-clean.jpg",
    time: "15 min",
  },
  {
    tag: "STAGE 02",
    title: "Computer Diagnostics",
    desc: "TVS-certified scanner reads live data — battery health, sensors, fault codes — so nothing is left to guesswork.",
    image: "/assets/performance-bike.jpg",
    time: "20 min",
  },
  {
    tag: "STAGE 03",
    title: "Genuine Service",
    desc: "Genuine oil, filters and plugs. Chain set, fasteners torque-checked to TVS specification.",
    image: "/assets/family-rider.jpg",
    time: "45 min",
  },
  {
    tag: "STAGE 04",
    title: "Road Test & Delivery",
    desc: "Road test confirms the fix, followed by foam wash and polish. Keys back with a full service record.",
    image: "/assets/city-rider.jpg",
    time: "30 min",
  },
];

export default function ServiceFloor() {
  return (
    <section className="service-floor" aria-label="Zaidi TVS service floor">
      <div className="sf-inner">
        <div className="sf-head">
          <div className="sf-eyebrow">▣ &nbsp; 01.8 / ZAIDI TVS SERVICE FLOOR</div>
          <h2>Professional Care<br /><span>For Your Ride.</span></h2>
          <p className="sf-sub">
            Trained technicians, genuine TVS parts and a transparent four-stage
            process — your bike is in expert hands at Zaidi TVS.
          </p>
        </div>

        <div className="sf-grid">
          {SERVICE_STAGES.map((stage, i) => (
            <article key={stage.tag} className="sf-card">
              <div className="sf-stage">
                <span className="sf-tag">{stage.tag}</span>
                <span className="sf-time">{stage.time}</span>
              </div>
              <div className="sf-media">
                <img src={stage.image} alt={stage.title} loading="lazy" />
                <div className="sf-media-overlay" aria-hidden="true" />
              </div>
              <div className="sf-body">
                <h3>{stage.title}</h3>
                <p>{stage.desc}</p>
              </div>
              {i < SERVICE_STAGES.length - 1 && (
                <div className="sf-divider" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>

        <div className="sf-footer">
          <div className="sf-promise">
            <span className="sf-check" aria-hidden="true">✓</span>
            <strong>Genuine TVS parts only</strong> — no substitutes, ever.
          </div>
          <div className="sf-promise">
            <span className="sf-check" aria-hidden="true">✓</span>
            <strong>TVS-trained technicians</strong> on every bay.
          </div>
          <div className="sf-promise">
            <span className="sf-check" aria-hidden="true">✓</span>
            <strong>Transparent pricing</strong> — estimate before work starts.
          </div>
        </div>
      </div>
    </section>
  );
}