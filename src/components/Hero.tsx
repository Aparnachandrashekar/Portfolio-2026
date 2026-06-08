"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const FULL_NAME = "Aparna Chandrashekar";

const HERO_PHOTOS = [
  { src: "/aparna-headshot.png", objectPosition: "center 18%" },
  { src: "/aparna-headshot-2.png", objectPosition: "center 22%" },
] as const;

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
          <div style={{ width: "100%" }}>
            <div className="hero-name-row">
              <h1 className="hero-name">
                {FULL_NAME.split("").map((char, i) => (
                  <span
                    key={i}
                    ref={(el) => { charRefs.current[i] = el; }}
                    style={{ display: "inline-block" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>

              <div ref={photoRef} className="hero-photo">
                <HeroPhotoRotator />
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
        .hero-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: clamp(24px, 5vw, 96px);
          font-size: clamp(40px, 7.5vw, 100px);
        }
        .hero-name {
          font-family: 'Clash Display', sans-serif;
          font-size: 1em;
          font-weight: 600;
          color: var(--text);
          line-height: 1;
          letter-spacing: -0.025em;
          margin: 0;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hero-photo {
          position: relative;
          flex-shrink: 0;
          width: 1em;
          height: 1em;
          margin-left: auto;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--surface);
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
        }
        .hero-photo-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }
        .hero-photo-layer.active {
          opacity: 1;
        }
        @media (max-width: 720px) {
          .hero-name-row {
            font-size: clamp(32px, 9vw, 52px);
            gap: clamp(16px, 4vw, 32px);
          }
        }
      `}</style>
    </>
  );
}

function HeroPhotoRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_PHOTOS.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      {HERO_PHOTOS.map((photo, i) => (
        <div
          key={photo.src}
          className={`hero-photo-layer${i === activeIndex ? " active" : ""}`}
          aria-hidden={i !== activeIndex}
        >
          <Image
            src={photo.src}
            alt="Aparna Chandrashekar"
            width={100}
            height={100}
            priority={i === 0}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: photo.objectPosition,
            }}
          />
        </div>
      ))}
    </>
  );
}
