import Link from "next/link";
import type { ReactElement } from "react";
import {
  ADDRESS_LINE,
  CONTACT,
  HOURS_SHORT,
  MAPS_URL,
  SITE,
  SOCIAL,
} from "@data/site";
import BrandLogo from "./BrandLogo";

type FooterLink = { href: string; label: string };

const FOOTER_GROUPS: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/bikes", label: "Our Bikes" },
      { href: "/scooters", label: "Our Scooters" },
      { href: "/compare", label: "Compare Models" },
      { href: "/offers", label: "Offers & Finance" },
    ],
  },
  {
    title: "Shop & Care",
    links: [
      { href: "/parts", label: "Parts & Accessories" },
      { href: "/service", label: "Service & Care" },
      { href: "/reviews", label: "Customer Reviews" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog & Tips" },
      { href: "/faq", label: "FAQ & Help" },
      { href: "/branches", label: "Showroom & Timings" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

/* ---------------- Social icons (inline SVG — koi dependency nahi) ---------------- */

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2.4" y="5.6" width="19.2" height="12.8" rx="4" />
      <path d="M10.6 9.4 15.3 12l-4.7 2.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Sirf wahi icons dikhte hain jinka link `data/site.ts` ke SOCIAL me bhara ho. */
const SOCIALS: Array<{ key: keyof typeof SOCIAL; label: string; Icon: () => ReactElement }> = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
];

export default function Footer() {
  const socials = SOCIALS.filter((social) => Boolean(SOCIAL[social.key]));

  return (
    <>
      <div className="footer-strip" aria-hidden="true">
        <b>
          {SITE.name} — {SITE.tagline}
        </b>
      </div>

      <footer className="footer">
        <div className="footer-brand">
          <BrandLogo />

          <p className="footer-tag">
            <b>Authorized TVS dealership</b>
            <br />
            {ADDRESS_LINE}
          </p>

          <p className="footer-about">{SITE.about}</p>

          {socials.length > 0 && (
            <div className="footer-social">
              {socials.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={SOCIAL[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {FOOTER_GROUPS.map((group) => (
            <div className="footer-col" key={group.title}>
              <h2 className="footer-col-title">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="footer-contact">
          <h2 className="footer-col-title">Contact</h2>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-ico" aria-hidden="true">
                ⌖
              </span>
              <span>{ADDRESS_LINE}</span>
            </li>
            <li>
              <span className="footer-ico" aria-hidden="true">
                ⌕
              </span>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
            <li>
              <span className="footer-ico" aria-hidden="true">
                ◷
              </span>
              <span>{HOURS_SHORT}</span>
            </li>
          </ul>

          <a
            className="footer-directions"
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions <span aria-hidden="true">→</span>
          </a>
        </div>
      </footer>

      <div className="footer-bottom">
        <span>© 2026 {SITE.name}. All rights reserved.</span>
        <span className="footer-bottom-links">
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </span>
      </div>
    </>
  );
}
