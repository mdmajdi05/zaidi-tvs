"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";

type Service = {
  no: string;
  icon: string;
  title: string;
  desc: string;
  points: string[];
  href: string;
};

const SERVICES: Service[] = [
  {
    no: "S — 01",
    icon: "🔧",
    title: "Periodic Service",
    desc: "Scheduled maintenance by factory-trained technicians with a clear, upfront estimate.",
    points: ["Engine oil & filter", "Chain / belt care", "Full safety check"],
    href: "/service",
  },
  {
    no: "S — 02",
    icon: "🧩",
    title: "Genuine Spare Parts",
    desc: "OEM TVS parts and accessories, sourced and fitted to keep your ride factory-fresh.",
    points: ["100% genuine parts", "Perfect fitment", "Warranty support"],
    href: "/parts",
  },
  {
    no: "S — 03",
    icon: "📄",
    title: "Insurance Renewal",
    desc: "Quick policy renewal and claim assistance, handled end-to-end at the showroom.",
    points: ["Instant renewal", "Claim help", "Paperwork done"],
    href: "/contact",
  },
  {
    no: "S — 04",
    icon: "🔄",
    title: "Vehicle Exchange",
    desc: "Fair valuation for your old two-wheeler and a smooth upgrade to a new TVS.",
    points: ["Best exchange value", "Same-day process", "New ride upgrade"],
    href: "/contact",
  },
  {
    no: "S — 05",
    icon: "💳",
    title: "Finance & EMI",
    desc: "Low down-payment finance options with quick approvals and simple documentation.",
    points: ["Easy EMI plans", "Fast approval", "Minimal paperwork"],
    href: "/contact",
  },
  {
    no: "S — 06",
    icon: "🚑",
    title: "Roadside Assistance",
    desc: "Stuck on the road? Our team helps you get moving again with quick support.",
    points: ["Rapid response", "On-call support", "Peace of mind"],
    href: "https://wa.me/919009010050",
  },
  {
    no: "S — 07",
    icon: "🧴",
    title: "Wash & Detailing",
    desc: "Deep wash, polish and detailing that brings back the showroom shine.",
    points: ["Foam wash", "Polish & wax", "Showroom finish"],
    href: "/service",
  },
  {
    no: "S — 08",
    icon: "🚚",
    title: "Pickup & Drop",
    desc: "Doorstep pickup and drop for your service appointment — book in a minute.",
    points: ["Doorstep pickup", "Track your job", "On-time drop"],
    href: "/contact",
  },
];

function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 12).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 14).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      className="zSvcCard reveal"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="zSvcGlow" aria-hidden="true" />
      <div className="zSvcTop">
        <span className="zSvcIcon" aria-hidden="true">
          {service.icon}
        </span>
        <span className="zSvcNo">{service.no}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <ul className="zSvcPoints">
        {service.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <Link className="zSvcLink" href={service.href}>
        Explore <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default function ServicesShowcase() {
  return (
    <section className="zServices dark" id="services">
      <div className="zServicesHead reveal">
        <div className="eyebrow red">▣ &nbsp; EVERYTHING YOUR RIDE NEEDS</div>
        <h2>
          ONE SHOWROOM.
          <br />
          <span>FULL SERVICE.</span>
        </h2>
        <p>
          From your first test ride to every service after it — sales, parts,
          finance, insurance and care under one roof at Zaidi TVS.
        </p>
      </div>
      <div className="zSvcGrid">
        {SERVICES.map((service) => (
          <ServiceCard key={service.no} service={service} />
        ))}
      </div>
    </section>
  );
}
