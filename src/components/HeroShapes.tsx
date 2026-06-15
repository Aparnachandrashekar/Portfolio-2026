"use client";

import { gsap } from "@/lib/gsap";
import { floatShape, revealMorphShape } from "@/lib/morphSvg";
import { prefersReducedMotion } from "@/lib/motion";
import { BLOOM_PATHS, ORB_PATHS, RIBBON_PATHS } from "@/lib/shapePaths";
import { useEffect, useRef } from "react";

export default function HeroShapes() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<SVGSVGElement>(null);
  const bloomPathRef = useRef<SVGPathElement>(null);
  const ribbonRef = useRef<SVGSVGElement>(null);
  const ribbonPathRef = useRef<SVGPathElement>(null);
  const orbRef = useRef<SVGSVGElement>(null);
  const orbPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const start = () => {
      const ctx = gsap.context(() => {
        revealMorphShape(bloomRef.current, bloomPathRef.current, BLOOM_PATHS, {
          delay: 0.35,
          y: 14,
        });
        revealMorphShape(ribbonRef.current, ribbonPathRef.current, RIBBON_PATHS, {
          delay: 0.55,
          y: 12,
        });
        revealMorphShape(orbRef.current, orbPathRef.current, ORB_PATHS, {
          delay: 0.7,
          y: 10,
        });

        floatShape(bloomRef.current, { y: -8, duration: 6 });
        floatShape(ribbonRef.current, { y: 6, duration: 7 });
        floatShape(orbRef.current, { y: -5, duration: 5.5 });

        if (!prefersReducedMotion() && wrapRef.current) {
          gsap.to(wrapRef.current, {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.9,
            },
          });
        }
      }, wrapRef);

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
      const fallback = window.setTimeout(run, 2500);
      return () => {
        window.removeEventListener("intro-complete", onIntro);
        window.clearTimeout(fallback);
        cleanup?.();
      };
    }

    return () => cleanup?.();
  }, []);

  return (
    <div ref={wrapRef} className="hero-shapes" aria-hidden>
      <svg
        ref={bloomRef}
        className="hero-shape hero-shape--bloom"
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <linearGradient id="bloom-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path ref={bloomPathRef} d={BLOOM_PATHS[0]} fill="url(#bloom-grad)" />
      </svg>

      <svg
        ref={ribbonRef}
        className="hero-shape hero-shape--ribbon"
        viewBox="0 0 100 80"
        fill="none"
      >
        <path
          ref={ribbonPathRef}
          d={RIBBON_PATHS[0]}
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />
      </svg>

      <svg
        ref={orbRef}
        className="hero-shape hero-shape--orb"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          ref={orbPathRef}
          d={ORB_PATHS[0]}
          fill="var(--accent-2)"
          fillOpacity="0.18"
          stroke="var(--accent-2)"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        />
      </svg>

      <style suppressHydrationWarning>{`
        .hero-shapes {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .hero-shape {
          position: absolute;
          opacity: 0;
        }

        .hero-shape--bloom {
          top: clamp(8%, 12vw, 18%);
          left: clamp(4%, 6vw, 10%);
          width: clamp(56px, 9vw, 110px);
          height: clamp(56px, 9vw, 110px);
        }

        .hero-shape--ribbon {
          right: clamp(2%, 5vw, 8%);
          bottom: clamp(22%, 28vw, 34%);
          width: clamp(72px, 12vw, 140px);
          height: clamp(58px, 9vw, 110px);
        }

        .hero-shape--orb {
          top: clamp(14%, 18vw, 22%);
          right: clamp(10%, 16vw, 22%);
          width: clamp(40px, 6vw, 72px);
          height: clamp(40px, 6vw, 72px);
        }

        @media (max-width: 640px) {
          .hero-shape--bloom {
            width: 48px;
            height: 48px;
            top: 10%;
            left: 6%;
          }

          .hero-shape--ribbon {
            width: 64px;
            height: 52px;
            right: 4%;
            bottom: 30%;
          }

          .hero-shape--orb {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
