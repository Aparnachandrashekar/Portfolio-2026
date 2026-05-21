"use client";

import Script from "next/script";
import { useRef } from "react";


const VALUE_CARDS = [
  {
    label: "People-first thinking",
    description: "Every decision starts with understanding real human behaviour.",
  },
  {
    label: "Structured rigour",
    description: "From PRDs to pitches — clarity and evidence in every output.",
  },
  {
    label: "Cross-domain curiosity",
    description: "Psychology, org design, and product — connected, not siloed.",
  },
];

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const setupAnimation = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gsap = (window as any).gsap;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ST = (window as any).ScrollTrigger;
    if (!gsap || !ST) return;

    gsap.registerPlugin(ST);

    // Set initial hidden states
    gsap.set(leftRef.current, { opacity: 0, x: -48 });
    gsap.set(rightRef.current, { opacity: 0, x: 48 });
    gsap.set(labelRef.current, { clipPath: "inset(0 0 100% 0)" });

    // Section label — bottom-to-top clip-path wipe
    gsap.fromTo(
      labelRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 90%" },
      }
    );

    const sharedTrigger = {
      trigger: leftRef.current,
      start: "top 78%",
    };

    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -48 },
      {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: sharedTrigger,
      }
    );

    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 48 },
      {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: sharedTrigger,
      }
    );
  };

  return (
    <>
      {/* GSAP core may already be loaded by Hero; Next.js deduplicates by src */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        strategy="afterInteractive"
        onReady={setupAnimation}
      />

      <section
        id="about"
        style={{
          paddingTop: "120px",
          paddingBottom: "120px",
          paddingLeft: "clamp(24px, 5vw, 80px)",
          paddingRight: "clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div className="about-grid">
            {/* Left column */}
            <div
              ref={leftRef}
              className="about-left"
            >
              <span
                ref={labelRef}
                style={{
                  display: "block",
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--accent)",
                  marginBottom: "16px",
                }}
              >
                About
              </span>

              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 600,
                  color: "var(--text)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  margin: "0 0 28px 0",
                }}
              >
                People first.
              </h2>

              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "clamp(15px, 2vw, 18px)",
                  fontWeight: 400,
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  margin: 0,
                  maxWidth: "560px",
                }}
              >
                With a background in psychology and organizational development,
                I approach product management by starting with people first. I
                currently build internal tools and analyse consumer products
                through case studies, redesigns and feature deep dives. This
                portfolio showcases my approach to product thinking, having
                product analyses, PRDs and optimization strategies across
                platforms with 150m+ users.
              </p>
            </div>

            {/* Right column */}
            <div
              ref={rightRef}
              className="about-right"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {VALUE_CARDS.map(({ label, description }) => (
                  <ValueCard
                    key={label}
                    label={label}
                    description={description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style suppressHydrationWarning>{`
        .about-grid {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 64px;
        }
        .about-left  { width: 60%; flex-shrink: 0; }
        .about-right { width: 40%; flex-shrink: 0; }

        @media (max-width: 768px) {
          .about-grid {
            flex-direction: column;
            gap: 48px;
          }
          .about-left,
          .about-right {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

function ValueCard({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div
      style={{
        borderLeft: "2px solid var(--accent)",
        padding: "16px 20px",
        background: "var(--surface)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <span
        style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--text)",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "14px",
          fontWeight: 400,
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </span>
    </div>
  );
}
