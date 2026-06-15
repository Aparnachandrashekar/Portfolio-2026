"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, revealUp } from "@/lib/motion";
import { PROJECTS, CATEGORY_ACCENT, CATEGORY_LABEL } from "@/lib/projects";

// ─── section data ─────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "hook",
    label: "The Hook",
    body: "Why does this product matter? What's the real problem being solved?",
  },
  {
    id: "lens",
    label: "My Lens",
    body: "The psychological or behavioural insight that shaped my approach.",
  },
  {
    id: "problem",
    label: "The Problem",
    body: "A precise definition of the gap or failure in the current experience.",
  },
  {
    id: "process",
    label: "My Process",
    body: "Discovery → Definition → Solution. How I moved from insight to output.",
  },
  {
    id: "output",
    label: "The Output",
    body: "The deliverable — PRD, redesign, pitch, or prototype.",
  },
  {
    id: "reflection",
    label: "Reflection",
    body: "What I'd do differently. What I learned.",
  },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

// ─── helpers ──────────────────────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const { title, category } = project;
  const accent = CATEGORY_ACCENT[category];
  const tags = [CATEGORY_LABEL[category]];

  const pageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backLinkRef = useRef<HTMLAnchorElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState<SectionId>(SECTIONS[0].id);

  useEffect(() => {
    const observers = SECTIONS.map((section, i) => {
      const el = sectionRefs.current[i];
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(backLinkRef.current);
      revealUp(titleRef.current, { delay: 0.05 });
      revealUp(tagsRef.current?.querySelectorAll("span") ?? [], {
        delay: 0.1,
        stagger: 0.05,
      });

      if (heroContentRef.current && !prefersReducedMotion()) {
        gsap.fromTo(
          heroContentRef.current,
          { y: 0 },
          {
            y: -8,
            ease: "none",
            scrollTrigger: {
              trigger: heroContentRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }

      sectionRefs.current.forEach((el) => {
        if (!el) return;
        revealUp(el, { trigger: el });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <div
        style={{
          width: "100%",
          height: "280px",
          background: hexToRgba(accent, 0.15),
          borderBottom: `1px solid ${hexToRgba(accent, 0.3)}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: `28px clamp(24px, 5vw, 80px) 36px`,
        }}
      >
        <Link ref={backLinkRef} href="/#work" className="back-link" style={{ opacity: 0 }}>
          ← All work
        </Link>

        <div ref={heroContentRef}>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--text-secondary)",
              margin: "0 0 10px 0",
            }}
          >
            Work / {title}
          </p>

          <h1
            ref={titleRef}
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 600,
              color: "var(--text)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              margin: "0 0 16px 0",
              opacity: 0,
            }}
          >
            {title}
          </h1>

          <div ref={tagsRef} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "var(--text-secondary)",
                  background: "var(--bg)",
                  borderRadius: "100px",
                  padding: "4px 10px",
                  opacity: 0,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <nav aria-label="Page sections" className="case-sidebar">
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className="sidebar-link"
              style={{
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                fontWeight: isActive ? 500 : 400,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: isActive ? "var(--accent)" : "transparent",
                  border: `1.5px solid ${isActive ? "var(--accent)" : "var(--text-secondary)"}`,
                  flexShrink: 0,
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
              />
              {label}
            </a>
          );
        })}
      </nav>

      <div
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          paddingTop: "80px",
          paddingBottom: "120px",
          paddingLeft: "clamp(24px, 5vw, 80px)",
          paddingRight: "clamp(24px, 5vw, 80px)",
        }}
      >
        {SECTIONS.map(({ id, label, body }, i) => (
          <section
            key={id}
            id={id}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            style={{ opacity: 0 }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--accent)",
                marginBottom: "8px",
              }}
            >
              {label}
            </span>

            <h2
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "28px",
                fontWeight: 600,
                color: "var(--text)",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                margin: "0 0 20px 0",
              }}
            >
              {label}
            </h2>

            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "17px",
                fontWeight: 400,
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {body}
            </p>

            {i < SECTIONS.length - 1 && (
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid var(--surface)",
                  margin: "64px 0",
                }}
              />
            )}
          </section>
        ))}
      </div>

      <style suppressHydrationWarning>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: var(--text-secondary);
          text-decoration: none;
          width: fit-content;
          transition: color 0.2s ease;
        }
        .back-link:hover { color: var(--text); }

        .case-sidebar {
          position: fixed;
          left: 40px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 16px;
          z-index: 40;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Satoshi', sans-serif;
          font-size: 12px;
          text-decoration: none;
          line-height: 1.4;
          transition: color 0.2s ease, font-weight 0s;
          white-space: nowrap;
        }

        .sidebar-link:hover {
          color: var(--text) !important;
        }

        @media (max-width: 1180px) {
          .case-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
}
