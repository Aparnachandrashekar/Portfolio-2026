"use client";

import Script from "next/script";
import { useRef } from "react";

const VALUE_CARDS = [
  {
    label: "Structure",
    description: "Ambiguity gets a framework before it gets an answer.",
  },
  {
    label: "Builder's mindset",
    description: "Brings design thinking and build instinct to the same problem.",
  },
  {
    label: "Curious about what shapes people",
    description: "Products, systems, psychology. Always tracing back to what drives the behaviour.",
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

    gsap.set(leftRef.current, { opacity: 0, x: -48 });
    gsap.set(rightRef.current, { opacity: 0, x: 48 });
    gsap.set(labelRef.current, { clipPath: "inset(0 0 100% 0)" });

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

  const bodyStyle: React.CSSProperties = {
    fontFamily: "'Satoshi', sans-serif",
    fontSize: "clamp(15px, 2vw, 18px)",
    fontWeight: 400,
    color: "var(--text-secondary)",
    lineHeight: 1.8,
    margin: 0,
    maxWidth: "560px",
  };

  return (
    <>
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
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="about-grid">
            <div ref={leftRef} className="about-left">
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

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <p style={bodyStyle}>
                  At the root of every successful product is a person. How they think, what
                  they want, why they do what they do. Scale that up and you have groups,
                  societies, economies, which is why I believe understanding people is the
                  start.
                </p>
                <p style={bodyStyle}>
                  My background in psychology and organizational development helps me approach
                  product management with empathy, systems thinking, and a deep focus on human
                  behavior: specifically how and why people interact with the systems they
                  operate in, and what that means for the products we build. I have three years
                  of experience building and shipping tools that put this thinking into practice,
                  from 0 → 1.
                </p>
                <p style={bodyStyle}>
                  One of the key builds here is Thoughtful, a natural language reminder tool
                  that integrates with Google Calendar, WhatsApp, and Google Meet, meeting
                  users where they are. Alongside that, I analyse consumer products through
                  case studies, redesigns, PRDs, and feature deep dives, through a behavioral
                  and analytical lens. This portfolio is that body of work.
                </p>
              </div>
            </div>

            <div ref={rightRef} className="about-right">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {VALUE_CARDS.map(({ label, description }) => (
                  <ValueCard key={label} label={label} description={description} />
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
