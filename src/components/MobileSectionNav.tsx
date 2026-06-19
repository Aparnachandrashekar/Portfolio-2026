"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home", href: "#" },
  { id: "about", label: "About", href: "#about" },
  { id: "work", label: "Work", href: "#work" },
  { id: "certifications", label: "Certs", href: "#certifications" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function MobileSectionNav() {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const sectionEls = SECTIONS.filter((s) => s.id !== "home").map((s) =>
      document.getElementById(s.id),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0 && visible[0].target.id) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sectionEls.forEach((el) => {
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (window.scrollY < 120) setActive("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = (id: SectionId) => {
    setActive(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="mobile-section-nav" aria-label="Section navigation">
      {SECTIONS.map(({ id, label, href }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={href}
            className={`mobile-section-nav__link${isActive ? " is-active" : ""}`}
            onClick={() => handleClick(id)}
          >
            {label}
          </a>
        );
      })}

      <style suppressHydrationWarning>{`
        .mobile-section-nav {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-section-nav {
            display: flex;
            position: sticky;
            top: 60px;
            z-index: 45;
            gap: 6px;
            padding: 8px var(--page-pad);
            background: var(--bg);
            border-bottom: 1px solid var(--surface);
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .mobile-section-nav::-webkit-scrollbar {
            display: none;
          }

          .mobile-section-nav__link {
            flex-shrink: 0;
            font-family: 'Satoshi', sans-serif;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.02em;
            text-decoration: none;
            padding: 6px 12px;
            border-radius: 100px;
            border: 1.5px solid transparent;
            color: var(--text-secondary);
            opacity: 0.55;
            transition: opacity 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          }

          .mobile-section-nav__link.is-active {
            opacity: 1;
            color: var(--text);
            border-color: rgba(128, 128, 128, 0.35);
          }
        }
      `}</style>
    </nav>
  );
}
