import { CONTACT } from "@data/site";

const SERVICE_STAGES = [
  {
    tag: "Stage 01",
    title: "Check-in & inspection",
    desc: "Your bike is logged, odometer and fuel recorded, and every concern you mention is noted before work begins.",
    time: "15 min",
  },
  {
    tag: "Stage 02",
    title: "Computer diagnostics",
    desc: "A TVS-certified scanner reads live data — battery health, sensors and fault codes — so nothing is left to guesswork.",
    time: "20 min",
  },
  {
    tag: "Stage 03",
    title: "Genuine service",
    desc: "Genuine oil, filters and plugs. Chain set and fasteners torque-checked to exact TVS specification.",
    time: "45 min",
  },
  {
    tag: "Stage 04",
    title: "Road test & delivery",
    desc: "A road test confirms the fix, followed by foam wash and polish. Keys back with a full service record.",
    time: "30 min",
  },
];

const PROMISES = [
  ["Genuine TVS parts only", "No substitutes, ever."],
  ["TVS-trained technicians", "On every service bay."],
  ["Transparent pricing", "Estimate before work starts."],
];

export default function ServiceFloor() {
  return (
    <section className="service-floor sfPro" aria-label="Zaidi TVS service floor">
      <div className="sfPro-inner">
        <div className="sfPro-head">
          <div>
            <p className="eyebrow red">01.8 / Zaidi TVS service floor</p>
            <h2>
              Professional care <span>for your ride.</span>
            </h2>
          </div>
          <p className="sfPro-lede">
            Four clear stages, trained technicians and genuine TVS parts. From a
            quick check-up to a full service, your bike is in expert hands.
          </p>
        </div>

        <div className="sfPro-stats">
          <div>
            <b>4</b>
            <span>stage process</span>
          </div>
          <div>
            <b>100%</b>
            <span>genuine parts</span>
          </div>
          <div>
            <b>Same day</b>
            <span>service slots</span>
          </div>
          <div>
            <b>Pickup</b>
            <span>&amp; drop available</span>
          </div>
        </div>

        <div className="sfPro-grid">
          {SERVICE_STAGES.map((stage, i) => (
            <article key={stage.tag} className="sfPro-card">
              <div className="sfPro-card-top">
                <span className="sfPro-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="sfPro-time">{stage.time}</span>
              </div>
              <h3>{stage.title}</h3>
              <p>{stage.desc}</p>
              <span className="sfPro-tag">{stage.tag}</span>
            </article>
          ))}
        </div>

        <div className="sfPro-foot">
          <ul className="sfPro-promises">
            {PROMISES.map(([title, text]) => (
              <li key={title}>
                <span className="sfPro-check" aria-hidden="true">
                  <svg viewBox="0 0 20 20" focusable="false">
                    <path d="M4 10.5 8 14.5 16 6" />
                  </svg>
                </span>
                <span>
                  <b>{title}</b>
                  <small>{text}</small>
                </span>
              </li>
            ))}
          </ul>
          <div className="sfPro-actions">
            <a className="btn primary" href="/service">
              Book a service <span aria-hidden="true">→</span>
            </a>
            <a className="btn ghost" href={CONTACT.phoneHref}>
              Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
