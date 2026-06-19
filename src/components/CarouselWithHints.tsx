"use client";

import { useRef } from "react";

const SCROLL_STEP = 228;

type CarouselWithHintsProps = {
  children: React.ReactNode;
  trackRef?: React.RefObject<HTMLDivElement>;
  scrollStep?: number;
  grabbing?: boolean;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
};

export default function CarouselWithHints({
  children,
  trackRef: externalRef,
  scrollStep = SCROLL_STEP,
  grabbing = false,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
}: CarouselWithHintsProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const trackRef = externalRef ?? internalRef;

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * scrollStep,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-with-hints">
      <button
        type="button"
        className="carousel-hint carousel-hint--prev"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
      >
        ‹
      </button>

      <div
        ref={trackRef as React.Ref<HTMLDivElement>}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          paddingLeft: "var(--page-pad)",
          paddingRight: "var(--page-pad)",
          paddingBottom: "12px",
          userSelect: onMouseDown ? "none" : undefined,
          WebkitOverflowScrolling: "touch",
        }}
        className={`carousel-track${grabbing ? " is-grabbing" : ""}`}
      >
        {children}
      </div>

      <button
        type="button"
        className="carousel-hint carousel-hint--next"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
      >
        ›
      </button>

      <style suppressHydrationWarning>{`
        .carousel-with-hints {
          position: relative;
        }

        .carousel-hint {
          display: none;
        }

        @media (max-width: 768px) {
          .carousel-with-hints .carousel-track {
            gap: 12px;
          }

          .carousel-hint {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
            width: 36px;
            height: 44px;
            padding: 0;
            border: none;
            background: transparent;
            font-family: 'Satoshi', sans-serif;
            font-size: 22px;
            font-weight: 300;
            color: var(--text-secondary);
            opacity: 0.35;
            cursor: pointer;
            pointer-events: auto;
          }

          .carousel-hint--prev { left: 2px; }
          .carousel-hint--next { right: 2px; }
        }
      `}</style>
    </div>
  );
}
