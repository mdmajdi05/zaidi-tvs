"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BIKES, vehicleHref } from "@/lib/catalog";
import { ADDRESS_LINE, CONTACT } from "@data/site";
import BrandLogo from "./BrandLogo";

type ProductItem = { name: string; img: string; href: string };

type MegaTab = {
  id: string;
  label: string;
  href?: string;
  items: ProductItem[];
};

/* ---------- Product mega menu data (mirrors tvsmotor.com) ---------- */
const PRODUCT_TABS: MegaTab[] = [
  {
    id: "motorcycles",
    label: "Motorcycles",
    href: "/bikes",
    items: [
      { name: "Apache RTX", img: "/tvs/products/apache-rtx.png", href: "/bikes/apache-rtx-300" },
      { name: "Apache RR 310", img: "/tvs/products/apache-rr-310.webp", href: "/bikes/apache-rr-310" },
      { name: "Apache RTR 310", img: "/tvs/products/apache-rtr-310.webp", href: "/bikes/apache-rtr-310" },
      { name: "Apache RTR 200 4V", img: "/tvs/products/apache-rtr-200-4v.webp", href: "/bikes/apache-rtr-200" },
      { name: "Apache RTR 180", img: "/tvs/products/apache-rtr-180.webp", href: "/bikes/apache-rtr-180" },
      { name: "Apache RTR 160 4V", img: "/tvs/products/apache-rtr-160-4v.webp", href: "/bikes/apache-rtr-160" },
      { name: "Apache RTR 160", img: "/tvs/products/apache-rtr-160.webp", href: "/bikes/apache-rtr-160" },
      { name: "TVS Ronin", img: "/tvs/products/ronin.webp", href: "/bikes/ronin" },
      { name: "TVS Raider", img: "/tvs/products/raider.webp", href: "/bikes/raider" },
      { name: "New Radeon", img: "/tvs/products/radeon-new.webp", href: "/bikes/radeon" },
      { name: "Radeon", img: "/tvs/products/radeon.webp", href: "/bikes/radeon" },
      { name: "TVS Sport", img: "/tvs/products/sport.webp", href: "/bikes/sport" },
    ],
  },
  {
    id: "scooters",
    label: "Scooters",
    href: "/scooters",
    items: [
      { name: "TVS Ntorq 150", img: "/tvs/products/ntorq-150.png", href: vehicleHref("ntorq-150") },
      { name: "TVS Ntorq 125", img: "/tvs/products/ntorq-125.webp", href: vehicleHref("ntorq") },
      { name: "TVS Jupiter", img: "/tvs/products/jupiter.webp", href: vehicleHref("jupiter") },
      { name: "TVS Jupiter 125", img: "/tvs/products/jupiter-125.webp", href: vehicleHref("jupiter-125") },
      { name: "TVS Zest 110", img: "/tvs/products/zest-110.webp", href: vehicleHref("zest-110") },
    ],
  },
  {
    id: "electric",
    label: "Electric",
    href: "/scooters",
    items: [
      { name: "TVS iQube", img: "/tvs/products/iqube.webp", href: vehicleHref("iqube") },
      { name: "TVS X", img: "/tvs/products/tvs-x.webp", href: vehicleHref("tvs-x") },
      { name: "TVS Orbiter", img: "/tvs/products/orbiter.webp", href: vehicleHref("orbiter") },
    ],
  },
  {
    id: "mopeds",
    label: "Mopeds",
    href: "/bikes",
    items: [
      { name: "TVS XL100", img: "/tvs/products/xl100.webp", href: vehicleHref("xl100") },
    ],
  },
];

/* ---------- Shop mega menu data (mirrors tvsmotor.com) ---------- */
const SHOP_TABS: MegaTab[] = [
  {
    id: "accessories",
    label: "Accessories & Merchandise",
    href: "/parts",
    items: [
      { name: "Protection & Security", img: "/tvs/shop/protection-security.webp", href: "/parts" },
      { name: "Style", img: "/tvs/shop/style.webp", href: "/parts" },
      { name: "Utility", img: "/tvs/shop/utility.webp", href: "/parts" },
      { name: "Touring Accessories", img: "/tvs/shop/touring-accessories.webp", href: "/parts" },
      { name: "Vehicle Care", img: "/tvs/shop/vehicle-care.webp", href: "/parts" },
      { name: "Helmets", img: "/tvs/shop/helmets.webp", href: "/parts" },
      { name: "Riding Gear", img: "/tvs/shop/riding-gear.webp", href: "/parts" },
      { name: "Urban Wear", img: "/tvs/shop/urban-wear.webp", href: "/parts" },
    ],
  },
  {
    id: "spares",
    label: "Spares & Oil",
    href: "/parts",
    items: [
      { name: "TVS Genuine Parts", img: "/assets/performance-bike.jpg", href: "/parts" },
      { name: "Tru4 Engine Oil", img: "/assets/city-rider.jpg", href: "/parts" },
    ],
  },
];

/* ---------- Company mega menu data ---------- */
const COMPANY_TABS: MegaTab[] = [
  {
    id: "about",
    label: "About Us",
    href: "/about",
    items: [
      { name: "Our Story", img: "/assets/cta-bg.jpg", href: "/about" },
      { name: "Why Zaidi TVS", img: "/assets/family-rider.jpg", href: "/about" },
      { name: "Showroom", img: "/assets/location-bg.jpg", href: "/contact" },
    ],
  },
  {
    id: "support",
    label: "Support",
    href: "/contact",
    items: [
      { name: "Contact Us", img: "/assets/location-bg.jpg", href: "/contact" },
      { name: "Book Test Ride", img: "/assets/hero-bike-clean.jpg", href: "/contact" },
      { name: "Offers & Finance", img: "/assets/city-rider.jpg", href: "/offers" },
      { name: "Service Booking", img: "/assets/performance-bike.jpg", href: "/service" },
      { name: "FAQ & Help", img: "/assets/reference.jpg", href: "/faq" },
      { name: "Showroom & Timings", img: "/assets/family-rider.jpg", href: "/branches" },
      { name: "Customer Reviews", img: "/assets/style-scooter.jpg", href: "/reviews" },
      { name: "Gallery", img: "/assets/featured-bike.jpg", href: "/gallery" },
      { name: "Blog & Tips", img: "/assets/cta-bg.jpg", href: "/blog" },
    ],
  },
];

/* ---------- Top-level nav ---------- */
type NavItem = { label: string; href: string; menu?: MegaTab[]; wide?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/bikes", menu: PRODUCT_TABS, wide: true },
  { label: "Offers", href: "/offers" },
  { label: "Compare", href: "/compare" },
  { label: "Shop", href: "/parts", menu: SHOP_TABS },
  { label: "Service", href: "/service" },
  { label: "Company", href: "/about", menu: COMPANY_TABS },
  { label: "Contact", href: "/contact" },
];

/* Quick links shown as chips in the mobile drawer. */
const DRAWER_MORE: NavItem[] = [
  { label: "Offers & Finance", href: "/offers" },
  { label: "Customer Reviews", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog & Tips", href: "/blog" },
  { label: "FAQ & Help", href: "/faq" },
  { label: "Showroom & Timings", href: "/branches" },
  { label: "HTML Sitemap", href: "/sitemap-html" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoverTab, setHoverTab] = useState<string>("motorcycles");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const openMega = (label: string, firstTab: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
    setHoverTab(firstTab);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Reset menus when the route changes (render-time adjustment, no effect needed)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setActiveMenu(null);
  }

  const closeMenu = () => setOpen(false);

  const renderMega = (tabs: MegaTab[], wide: boolean) => {
    const current = tabs.find((t) => t.id === hoverTab) ?? tabs[0];
    return (
      <div className={`mega${wide ? " mega-wide" : ""}`} role="menu">
        <div className="mega-inner">
          <ul className="mega-tabs">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  className={current.id === tab.id ? "is-active" : undefined}
                  onMouseEnter={() => setHoverTab(tab.id)}
                  onFocus={() => setHoverTab(tab.id)}
                  onClick={() => setHoverTab(tab.id)}
                >
                  {tab.label}
                  <span aria-hidden="true">›</span>
                </button>
              </li>
            ))}
            <li className="mega-tab-all">
              <Link href={tabs[0].href ?? "/bikes"}>
                {wide ? "Explore All Vehicles →" : "Explore Shop →"}
              </Link>
            </li>
          </ul>

          <div className="mega-products">
            <h3>
              All ({current.items.length})
              <Link href={current.href ?? "/bikes"}>
                View all <span aria-hidden="true">→</span>
              </Link>
            </h3>
            <ul>
              {current.items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.name} loading="lazy" />
                    <span className="bike-name">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="top">
      <Link className="brand" href="/" aria-label="Zaidi TVS home">
        {/* theme driven: site dark -> white lockup, light -> black lockup */}
        <BrandLogo />
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

      {/* Desktop nav with TVS-style mega menu */}
      <nav className="nav nav-desktop" aria-label="Primary">
        <div className="nav-wrap">
          {NAV_ITEMS.map((item) => {
            if (!item.menu) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href ? "active" : undefined}
                >
                  {item.label}
                </Link>
              );
            }
            const isOpen = activeMenu === item.label;
            return (
              <div
                key={item.label}
                className={`has-mega${isOpen ? " open" : ""}`}
                onMouseEnter={() => openMega(item.label, item.menu![0].id)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  className={pathname === item.href ? "active" : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onFocus={() => openMega(item.label, item.menu![0].id)}
                >
                  {item.label} <span aria-hidden="true">▾</span>
                </Link>
                {isOpen ? (
                  <div onMouseEnter={() => openMega(item.label, hoverTab)}>
                    {renderMega(item.menu, Boolean(item.wide))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="header-actions">
        <a className="phone" href={CONTACT.phoneHref}>
          ⌕ {CONTACT.phone}
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
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href} style={{ animationDelay: `${40 + index * 45}ms` }}>
                <Link
                  href={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  className={pathname === item.href ? "active" : undefined}
                  onClick={closeMenu}
                  tabIndex={open ? 0 : -1}
                >
                  <b className="drawer-num">{String(index + 1).padStart(2, "0")}</b>
                  <span className="drawer-label">{item.label}</span>
                  <span className="drawer-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="drawer-models">
            <span className="drawer-kicker">POPULAR MODELS</span>
            <div>
              {BIKES.slice(0, 8).map((b) => (
                <Link key={b.slug} href={vehicleHref(b)} onClick={closeMenu} tabIndex={open ? 0 : -1}>
                  {b.shortName}
                </Link>
              ))}
            </div>
          </div>
          <div className="drawer-models">
            <span className="drawer-kicker">MORE</span>
            <div>
              {DRAWER_MORE.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={open ? 0 : -1}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <div className="drawer-foot">
          <a href={CONTACT.phoneHref} tabIndex={open ? 0 : -1}>
            ⌕ {CONTACT.phone}
          </a>
          <span>⌖ {ADDRESS_LINE}</span>
        </div>
      </div>
    </header>
  );
}