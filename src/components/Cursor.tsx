"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);
  // Track current size for centering offset
  const sizeRef = useRef(12);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = cursorRef.current;
    if (!el) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const updatePos = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const setSize = (size: number, color: string) => {
      sizeRef.current = size;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.marginLeft = `-${size / 2}px`;
      el.style.marginTop = `-${size / 2}px`;
      el.style.background = color;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const card = target.closest("[data-cursor-accent]") as HTMLElement | null;
      const link = target.closest("a, button");

      if (card?.dataset.cursorAccent) {
        setSize(40, card.dataset.cursorAccent);
      } else if (link) {
        setSize(24, "var(--accent)");
      } else {
        setSize(12, "var(--accent)");
      }
    };

    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.15);
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      raf.current = requestAnimationFrame(tick);
    };

    // Initialise centering offset
    setSize(12, "var(--accent)");

    document.addEventListener("mousemove", updatePos);
    document.addEventListener("mouseover", handleOver);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", updatePos);
      document.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(raf.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "12px",
          height: "12px",
          marginLeft: "-6px",
          marginTop: "-6px",
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "multiply",
          transition: "width 200ms ease, height 200ms ease, margin 200ms ease, background 200ms ease",
          willChange: "transform",
        }}
      />
      <style suppressHydrationWarning>{`
        @media (hover: hover) {
          * { cursor: none !important; }
        }
        @media (hover: none) {
          .custom-cursor { display: none; }
        }
      `}</style>
    </>
  );
}
