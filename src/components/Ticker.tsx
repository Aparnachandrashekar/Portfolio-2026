"use client";

const TICKER_TEXT =
  "Product Thinking · People First · Psychology & Product · PRDs · Case Studies · Redesigns · Strategy · ";

export default function Ticker() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "40px",
        background: "var(--accent)",
        zIndex: 60,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Two copies side-by-side; animation shifts by -50% (one copy width) for seamless loop */}
      <div className="ticker-track">
        <span className="ticker-item" aria-hidden="true">{TICKER_TEXT}</span>
        <span className="ticker-item">{TICKER_TEXT}</span>
      </div>

      <style suppressHydrationWarning>{`
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 35s linear infinite;
        }
        .ticker-item {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--bg);
          white-space: nowrap;
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
