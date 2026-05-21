"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

export default function PageIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);

  // Runs before GSAP loads — on return visits, hide the overlay immediately
  // so the page is never blocked by a CDN-dependent animation
  useEffect(() => {
    const complete = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).introComplete = true;
      window.dispatchEvent(new CustomEvent("intro-complete"));
    };

    if (sessionStorage.getItem("intro-played")) {
      if (overlayRef.current) overlayRef.current.style.display = "none";
      complete();
    }
    // First visit: overlay stays; GSAP onReady will animate it away
  }, []);

  const runIntro = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const complete = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).introComplete = true;
      window.dispatchEvent(new CustomEvent("intro-complete"));
    };

    // Return visits already handled by useEffect above
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).introComplete) return;

    sessionStorage.setItem("intro-played", "1");

    gsap
      .timeline({ onComplete: complete })
      .fromTo(logoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(logoRef.current, { opacity: 1, duration: 0.3 })
      .to(overlayRef.current, {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.7,
        ease: "power2.inOut",
      });
  };

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onReady={runIntro}
      />
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
    </>
  );
}
