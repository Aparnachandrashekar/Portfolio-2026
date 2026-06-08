"use client";

import Image from "next/image";
import Script from "next/script";
import { useRef } from "react";

const NAME_WORDS = ["Aparna", "Chandrashekar"];

export default function Hero() {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const photoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const scrollLabelRef = useRef<HTMLSpanElement>(null);

  const runAnimation = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const start = () => {
      const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];
      const charDuration = 0.5;
      const charStagger = 0.03;

      // Set initial hidden states right before animating (progressive enhancement)
      gsap.set(chars, { opacity: 0, y: 60 });
      gsap.set(photoRef.current, { opacity: 0, scale: 0.92 });
      gsap.set(taglineRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set([scrollLabelRef.current, chevronRef.current], { opacity: 0 });

      gsap
        .timeline()
        .fromTo(
          chars,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: charDuration,
            stagger: charStagger,
            ease: "power3.out",
            clearProps: "transform",
          }
        )
        .fromTo(
          photoRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", clearProps: "transform" },
          "<0.15"
        )
        // Tagline: left-to-right clip-path reveal, 200ms after last char finishes
        .fromTo(
          taglineRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" },
          "+=0.2"
        )
        .fromTo(
          [scrollLabelRef.current, chevronRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "+=0.1"
        )
        .to(chevronRef.current, {
          y: 5,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).introComplete) {
      start();
    } else {
      window.addEventListener("intro-complete", start, { once: true });
    }
  };

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onReady={runAnimation}
      />

      <section style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 clamp(24px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "1000px", width: "100%" }}>
            <div
              className="hero-intro"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(28px, 5vw, 56px)",
                flexWrap: "wrap",
              }}
            >
              <h1
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(52px, 8vw, 100px)",
                  fontWeight: 600,
                  color: "var(--text)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  margin: 0,
                  flex: "1 1 280px",
                }}
              >
                {NAME_WORDS.map((word, wi) => {
                  const offset = NAME_WORDS
                    .slice(0, wi)
                    .reduce((n, w) => n + w.length, 0);
                  return (
                    <div key={wi} style={{ display: "block" }}>
                      {word.split("").map((char, ci) => (
                        <span
                          key={ci}
                          ref={(el) => { charRefs.current[offset + ci] = el; }}
                          style={{ display: "inline-block" }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </h1>

              <div
                ref={photoRef}
                style={{
                  flexShrink: 0,
                  width: "clamp(128px, 18vw, 196px)",
                  height: "clamp(128px, 18vw, 196px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid var(--surface)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                }}
              >
                <Image
                  src="/aparna-headshot.png"
                  alt="Aparna Chandrashekar"
                  width={196}
                  height={196}
                  priority
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </div>

            <p
              ref={taglineRef}
              style={{
                marginTop: "16px",
                marginBottom: 0,
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(16px, 2vw, 22px)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                maxWidth: "640px",
                lineHeight: 1.6,
              }}
            >
              At the intersection of people and product is where my strengths,
              aspirations, and problems worth solving meet.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            paddingBottom: "36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            color: "var(--text-secondary)",
          }}
        >
          <span
            ref={scrollLabelRef}
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <svg
            ref={chevronRef}
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            aria-hidden
            style={{ display: "block" }}
          >
            <path
              d="M1 1L8 8L15 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      <style suppressHydrationWarning>{`
        @media (max-width: 560px) {
          .hero-intro { flex-direction: column-reverse; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}
