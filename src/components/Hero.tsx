"use client";

import { gsap } from "@/lib/gsap";
import { MOTION, prefersReducedMotion } from "@/lib/motion";
import HeroShapes from "@/components/HeroShapes";
import { useEffect, useRef } from "react";

const LINE_ONE = "Aparna";
const LINE_TWO = "Chandrashekar";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotEndRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const scrollLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = () => {
      const ctx = gsap.context(() => {
        const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];

        if (prefersReducedMotion()) {
          gsap.set(chars, { opacity: 1, y: 0, clearProps: "all" });
          gsap.set(dotEndRef.current, { opacity: 1, scale: 1, clearProps: "all" });
          gsap.set(taglineRef.current, { opacity: 1, y: 0, clearProps: "all" });
          gsap.set([scrollLabelRef.current, chevronRef.current], { opacity: 1 });
          return;
        }

        gsap.set(chars, { opacity: 0, y: MOTION.y });
        gsap.set(dotEndRef.current, { opacity: 0, scale: 0.6, y: 6 });
        gsap.set(taglineRef.current, { opacity: 0, y: MOTION.y });
        gsap.set([scrollLabelRef.current, chevronRef.current], { opacity: 0 });

        const lineOneChars = chars.slice(0, LINE_ONE.length);
        const lineTwoChars = chars.slice(LINE_ONE.length);

        gsap
          .timeline()
          .to(lineOneChars, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.028,
            ease: MOTION.ease,
            clearProps: "transform",
          })
          .to(
            lineTwoChars,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.022,
              ease: MOTION.ease,
              clearProps: "transform",
            },
            "-=0.45",
          )
          .to(
            dotEndRef.current,
            { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: MOTION.ease, clearProps: "transform" },
            "-=0.2",
          )
          .to(
            taglineRef.current,
            { opacity: 1, y: 0, duration: 0.65, ease: MOTION.ease, clearProps: "transform" },
            "-=0.3",
          )
          .to(
            [scrollLabelRef.current, chevronRef.current],
            { opacity: 1, duration: 0.5, ease: MOTION.ease },
            "-=0.2",
          );
      }, sectionRef);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;

    const run = () => { cleanup = start(); };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).introComplete) {
      run();
    } else {
      const onIntro = () => run();
      window.addEventListener("intro-complete", onIntro, { once: true });

      const fallback = window.setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(window as any).introComplete) run();
      }, 2500);

      return () => {
        window.removeEventListener("intro-complete", onIntro);
        window.clearTimeout(fallback);
        cleanup?.();
      };
    }

    return () => cleanup?.();
  }, []);

  const renderLine = (word: string, offset: number) =>
    word.split("").map((char, ci) => (
      <span
        key={`${offset}-${ci}`}
        ref={(el) => { charRefs.current[offset + ci] = el; }}
        className="hero-char"
      >
        {char}
      </span>
    ));

  return (
    <section ref={sectionRef} className="hero-section">
      <HeroShapes />
      <div className="hero-body">
        <div className="hero-copy">
          <h1 className="hero-title" aria-label={`${LINE_ONE} ${LINE_TWO}`}>
            <span className="hero-line hero-line--one">
              <span className="hero-word">
                {renderLine(LINE_ONE, 0)}
              </span>
            </span>

            <span className="hero-line hero-line--two">
              <span className="hero-word">
                {renderLine(LINE_TWO, LINE_ONE.length)}
                <span ref={dotEndRef} className="hero-dot hero-dot--period" aria-hidden />
              </span>
            </span>
          </h1>

          <p ref={taglineRef} className="hero-tagline">
            At the intersection of people and product is where my strengths,
            aspirations, and problems worth solving meet.
          </p>
        </div>
      </div>

      <div className="hero-scroll">
        <span ref={scrollLabelRef} className="hero-scroll-label">
          scroll
        </span>
        <svg
          ref={chevronRef}
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          aria-hidden
          className="hero-chevron"
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

      <style suppressHydrationWarning>{`
        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .hero-body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 clamp(20px, 4vw, 72px);
        }

        .hero-copy {
          width: 100%;
        }

        .hero-title {
          margin: 0;
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(64px, 13.5vw, 168px);
          font-weight: 700;
          color: var(--text);
          line-height: 0.9;
          letter-spacing: -0.045em;
        }

        .hero-line {
          display: block;
        }

        .hero-line--one {
          text-align: left;
        }

        .hero-line--two {
          text-align: right;
          margin-top: -0.04em;
        }

        .hero-word {
          position: relative;
          display: inline-block;
        }

        .hero-char {
          display: inline-block;
        }

        .hero-dot {
          display: inline-block;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        .hero-dot--period {
          width: clamp(12px, 1.3vw, 20px);
          height: clamp(12px, 1.3vw, 20px);
          margin-left: 0.06em;
          vertical-align: baseline;
          transform: translateY(0.08em);
        }

        .hero-tagline {
          margin: clamp(20px, 3vw, 32px) 0 0;
          max-width: 520px;
          font-family: 'Satoshi', sans-serif;
          font-size: clamp(15px, 1.8vw, 20px);
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .hero-scroll {
          position: relative;
          z-index: 1;
          padding-bottom: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
        }

        .hero-scroll-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-chevron {
          display: block;
        }

        @media (max-width: 640px) {
          .hero-line--two {
            text-align: left;
            margin-top: 0;
          }

          .hero-tagline {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
