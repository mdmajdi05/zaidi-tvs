export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="page-hero">
      <div className="hero-decor" aria-hidden="true">
        <div className="grid-overlay" />
        <span className="orb orb-2" style={{ right: "-120px", top: "-160px", left: "auto" }} />
      </div>
      <div>
        <div className="eyebrow red"> &nbsp; {eyebrow}</div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </section>
  );
}