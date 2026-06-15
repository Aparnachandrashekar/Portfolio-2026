"use client";

import { gsap } from "@/lib/gsap";
import { parallaxCards, refreshScrollTriggers, revealLabel, revealUp } from "@/lib/motion";
import { useEffect, useRef } from "react";
import WorkCard from "@/components/WorkCard";
import { CERTIFICATIONS } from "@/lib/projects";

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLabel(labelRef.current, sectionRef.current);
      revealUp(headingRef.current, { trigger: sectionRef.current, delay: 0.05 });
      const cards = trackRef.current?.querySelectorAll(".proj-card") ?? [];
      revealUp(cards, {
        trigger: sectionRef.current,
        stagger: 0.05,
        delay: 0.1,
      });
      parallaxCards(trackRef.current);
      refreshScrollTriggers();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" style={{ paddingBottom: "120px" }}>
      <div style={{ paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)", marginBottom: "48px" }}>
        <span ref={labelRef} style={{
          display: "block", fontFamily: "'Satoshi', sans-serif", fontSize: "11px",
          fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em",
          color: "var(--accent)", marginBottom: "16px",
        }}>
          Credentials
        </span>

        <h2 ref={headingRef} style={{
          fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 600, color: "var(--text)", lineHeight: 1.08,
          letterSpacing: "-0.02em", margin: 0,
        }}>
          Certifications.
        </h2>
      </div>

      <div
        ref={trackRef}
        className="carousel-track"
        style={{
          display: "flex", gap: "16px", overflowX: "auto",
          paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)",
          paddingBottom: "12px", WebkitOverflowScrolling: "touch",
        }}
      >
        {CERTIFICATIONS.map((p) => <WorkCard key={p.slug} project={p} />)}
      </div>

      <style suppressHydrationWarning>{`
        #certifications .carousel-track { scrollbar-width: none; -ms-overflow-style: none; }
        #certifications .carousel-track::-webkit-scrollbar { display: none; }
        #certifications .proj-card {
          transition: transform 300ms cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 300ms cubic-bezier(0.25,0.46,0.45,0.94);
        }
        #certifications .proj-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.16); }
      `}</style>
    </section>
  );
}
