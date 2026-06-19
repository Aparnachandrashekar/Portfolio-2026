"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LINKEDIN_URL, RESUME_URL } from "@/lib/projects";

type NavLink = { label: string; href: string; external?: boolean };

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: RESUME_URL, external: true },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="site-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px, 4vw, 32px)",
          backgroundColor: scrolled ? "var(--bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--surface)" : "1px solid transparent",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          AC
        </Link>

        <nav className="nav-right" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {NAV_LINKS.map(({ label, href, external }) => (
            <DesktopLink key={label} href={href} external={external}>
              {label}
            </DesktopLink>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            minWidth: "44px",
            minHeight: "44px",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            color: "var(--text)",
          }}
          className="hamburger"
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </header>

      <div
        className={`mobile-nav-backdrop${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`mobile-nav-drawer${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            onClick={() => setMenuOpen(false)}
            className="mobile-nav-drawer__link"
          >
            {label}
          </a>
        ))}
      </aside>

      <style suppressHydrationWarning>{`
        .mobile-nav-backdrop,
        .mobile-nav-drawer {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-right { display: none !important; }
          .hamburger { display: flex !important; }

          .site-header {
            padding-left: max(7px, env(safe-area-inset-left)) !important;
            padding-right: max(7px, env(safe-area-inset-right)) !important;
          }

          .mobile-nav-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 40;
            background: rgba(26, 26, 26, 0.2);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease;
          }

          .mobile-nav-backdrop.is-open {
            opacity: 1;
            pointer-events: all;
          }

          .mobile-nav-drawer {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 45;
            width: min(280px, 78vw);
            height: 100%;
            padding: 80px 28px 32px;
            gap: 8px;
            background: var(--bg);
            border-left: 1px solid var(--surface);
            transform: translateX(100%);
            transition: transform 0.28s ease;
            box-shadow: -8px 0 32px rgba(0, 0, 0, 0.06);
          }

          .mobile-nav-drawer.is-open {
            transform: translateX(0);
          }

          .mobile-nav-drawer__link {
            font-family: 'Satoshi', sans-serif;
            font-size: 22px;
            font-weight: 500;
            color: var(--text);
            text-decoration: none;
            letter-spacing: -0.02em;
            display: flex;
            align-items: center;
            min-height: 48px;
            padding: 4px 0;
          }
        }
      `}</style>
    </>
  );
}

function DesktopLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  const sharedStyle: React.CSSProperties = {
    fontFamily: "'Satoshi', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: hovered ? "var(--text)" : "var(--text-secondary)",
    textDecoration: "none",
    transition: "color 0.2s ease",
    cursor: "pointer",
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={sharedStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      style={sharedStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      style={{ transition: "transform 0.2s ease" }}
    >
      {open ? (
        <>
          <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
