"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import WorkCard from "@/components/WorkCard";
import {
  WORK_ITEMS, WORK_FILTER_ORDER, CATEGORY_LABEL,
  type WorkFilter,
} from "@/lib/projects";

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('All');
  const [grabbing, setGrabbing]         = useState(false);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);

  const filtered = useMemo(
    () => activeFilter === 'All' ? WORK_ITEMS : WORK_ITEMS.filter(p => p.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [activeFilter]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setGrabbing(true);
    startX.current     = e.pageX;
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - (e.pageX - startX.current) * 1.5;
    }
  };

  const stopDrag = () => { isDragging.current = false; setGrabbing(false); };

  return (
    <>
      <section id="work" className="section-work">

        <div className="section-head">
          <span style={{
            display: "block", fontFamily: "'Satoshi', sans-serif", fontSize: "11px",
            fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em",
            color: "var(--accent)", marginBottom: "16px",
          }}>
            Work
          </span>

          <h2 style={{
            fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 600, color: "var(--text)", lineHeight: 1.08,
            letterSpacing: "-0.02em", margin: "0 0 36px",
          }}>
            Featured Projects
          </h2>

          <div className="work-filters">
            {WORK_FILTER_ORDER.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: "12px", fontWeight: 500,
                  padding: "7px 18px", borderRadius: "100px",
                  border: `1.5px solid ${activeFilter === f ? "var(--accent)" : "rgba(128,128,128,0.25)"}`,
                  background: activeFilter === f ? "var(--accent)" : "transparent",
                  color: activeFilter === f ? "#fff" : "var(--text-secondary)",
                  cursor: "pointer", transition: "all 180ms ease", letterSpacing: "0.02em",
                }}
              >
                {f === 'All' ? 'All' : CATEGORY_LABEL[f]}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          style={{
            display: "flex", gap: "16px", overflowX: "auto",
            paddingLeft: "var(--page-pad)", paddingRight: "var(--page-pad)",
            paddingBottom: "12px",
            userSelect: "none", WebkitOverflowScrolling: "touch",
          }}
          className={`carousel-track${grabbing ? " is-grabbing" : ""}`}
        >
          {filtered.map((p) => <WorkCard key={p.slug} project={p} />)}
        </div>
      </section>

      <style suppressHydrationWarning>{`
        .section-work {
          padding-top: var(--section-pad-y);
          padding-bottom: var(--section-pad-y);
        }

        .section-head {
          padding-left: var(--page-pad);
          padding-right: var(--page-pad);
          margin-bottom: 48px;
        }

        .work-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .carousel-track { scrollbar-width: none; -ms-overflow-style: none; }
        .carousel-track::-webkit-scrollbar { display: none; }

        .carousel-track { cursor: grab; }
        .carousel-track.is-grabbing { cursor: grabbing; }

        .proj-card {
          transition: transform 300ms cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 300ms cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .proj-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.16); }

        @media (max-width: 768px) {
          .section-head { margin-bottom: 24px; }
        }
      `}</style>
    </>
  );
}
