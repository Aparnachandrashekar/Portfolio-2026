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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
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
        {/* Logo */}
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

        {/* Desktop links */}
        <nav className="nav-right" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {NAV_LINKS.map(({ label, href, external }) => (
            <DesktopLink key={label} href={href} external={external}>
              {label}
            </DesktopLink>
          ))}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            /* 44×44 touch target */
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

      {/* Mobile overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.25s ease",
        }}
      >
        {NAV_LINKS.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(28px, 8vw, 36px)",
              fontWeight: 500,
              color: "var(--text)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              minHeight: "56px",
            }}
          >
            {label}
          </a>
        ))}
      </div>

      <style suppressHydrationWarning>{`
        @media (max-width: 640px) {
          .nav-right { display: none !important; }
          .hamburger { display: flex !important; }
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
        /* X icon */
        <>
          <line
            x1="3" y1="3" x2="19" y2="19"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
            style={{ transition: "all 0.2s ease" }}
          />
          <line
            x1="19" y1="3" x2="3" y2="19"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
            style={{ transition: "all 0.2s ease" }}
          />
        </>
      ) : (
        /* Hamburger */
        <>
          <line
            x1="3" y1="6" x2="19" y2="6"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
          />
          <line
            x1="3" y1="11" x2="19" y2="11"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
          />
          <line
            x1="3" y1="16" x2="19" y2="16"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
