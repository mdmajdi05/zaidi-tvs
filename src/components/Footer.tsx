import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/bikes", label: "Our Bikes" },
  { href: "/scooters", label: "Our Scooters" },
  { href: "/parts", label: "Parts" },
  { href: "/service", label: "Service & Care" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <>
      <div className="footer-strip" aria-hidden="true">
        <b>Zaidi TVS — Your Ride. Your Style.</b>
      </div>
      <footer className="footer">
        <div className="footer-brand">
          ZAIDI TVS <i aria-hidden="true" />
        </div>
        <div className="footer-links">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <a href="tel:+919009010050">+91 90090 10050</a>
          <span>© 2026 Zaidi TVS. All rights reserved.</span>
        </div>
      </footer>

      <div className="floating">
        <a
          className="float-wa"
          href="https://wa.me/919009010050"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          ◉
        </a>
        <a className="float-call" href="tel:+919009010050" aria-label="Call Zaidi TVS">
          ⌕
        </a>
      </div>
    </>
  );
}