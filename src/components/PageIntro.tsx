"use client";

import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useEffect, useRef } from "react";

export default function PageIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const complete = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).introComplete = true;
      window.dispatchEvent(new CustomEvent("intro-complete"));
    };

    if (sessionStorage.getItem("intro-played")) {
      if (overlayRef.current) overlayRef.current.style.display = "none";
      complete();
      return;
    }

    sessionStorage.setItem("intro-played", "1");

    if (prefersReducedMotion()) {
      if (overlayRef.current) overlayRef.current.style.display = "none";
      complete();
      return;
    }

    gsap
      .timeline({ onComplete: complete })
      .fromTo(logoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(logoRef.current, { opacity: 1, duration: 0.3 })
      .to(overlayRef.current, {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.7,
        ease: "power2.inOut",
      });
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "var(--text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "inset(0 0 0 0)",
        pointerEvents: "none",
      }}
    >
      <span
        ref={logoRef}
        style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: "80px",
          fontWeight: 600,
          color: "var(--bg)",
          letterSpacing: "-0.02em",
          opacity: 0,
        }}
      >
        AC
      </span>
    </div>
  );
}
