"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home", short: "Home" },
  { href: "/bikes", label: "Our Bikes", short: "Bikes" },
  { href: "/scooters", label: "Our Scooters", short: "Scooters" },
  { href: "/parts", label: "Parts & Accessories", short: "Parts" },
  { href: "/ride", label: "Build Your Ride", short: "Ride" },
  { href: "/compare", label: "Compare", short: "Compare" },
  { href: "/service", label: "Service & Care", short: "Service" },
  { href: "/about", label: "About Us", short: "About" },
  { href: "/contact", label: "Contact", short: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape close + focus return; focus first link when drawer opens
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
          buttonRef.current?.focus();
        }
      };
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Close drawer on navigation / large screen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="top">
      <Link className="brand" href="/" aria-label="Zaidi TVS home">
        <span>ZAIDI TVS</span>
        <i aria-hidden="true" />
      </Link>

      <button
        type="button"
        className={`menu-toggle${open ? " open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="primary-navigation"
        ref={buttonRef}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Desktop pill nav */}
      <nav className="nav nav-desktop" aria-label="Primary">
        <div className="nav-wrap">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
            >
              {link.short}
            </Link>
          ))}
        </div>
      </nav>

      <div className="header-actions">
        <a className="phone" href="tel:+919009010050">
          ⌕ +91 90090 10050
        </a>
        <a
          className="wa"
          href="https://wa.me/919009010050"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <Link className="book-mini" href="/contact">
          Book Test Ride
        </Link>
      </div>

      {/* Mobile full-screen drawer */}
      <div
        className={`mobile-drawer${open ? " open" : ""}`}
        id="primary-navigation"
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <span className="drawer-kicker">MENU</span>
          <ul className="drawer-links">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.href}
                style={{ animationDelay: `${40 + index * 45}ms` }}
              >
                <Link
                  href={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  className={pathname === link.href ? "active" : undefined}
                  onClick={closeMenu}
                  tabIndex={open ? 0 : -1}
                >
                  <b className="drawer-num">{String(index + 1).padStart(2, "0")}</b>
                  <span className="drawer-label">{link.label}</span>
                  <span className="drawer-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer-foot">
          <a
            href="https://wa.me/919009010050"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
          >
            ◉ WhatsApp Us
          </a>
          <a href="tel:+919009010050" tabIndex={open ? 0 : -1}>
            ⌕ +91 90090 10050
          </a>
          <span>⌖ Main Road, Chandpur</span>
        </div>
      </div>
    </header>
  );
}