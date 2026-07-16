const NOTCH_COUNT = 12;
const OUTER_RADIUS = 50;
const INNER_RADIUS = 41;

function buildNotchClipPath() {
  const points: string[] = [];

  for (let i = 0; i < NOTCH_COUNT * 2; i++) {
    const angle = (Math.PI * 2 * i) / (NOTCH_COUNT * 2) - Math.PI / 2;
    const radius = i % 2 === 0 ? OUTER_RADIUS : INNER_RADIUS;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  return `polygon(${points.join(", ")})`;
}

const NOTCH_CLIP_PATH = buildNotchClipPath();

export default function TopFellowBadge() {
  return (
    <div className="top-fellow-badge" aria-label="Top Fellow">
      <div className="top-fellow-badge__seal">
        <span className="top-fellow-badge__top">TOP</span>
        <span className="top-fellow-badge__fellow">Fellow</span>
      </div>

      <style suppressHydrationWarning>{`
        .top-fellow-badge {
          position: absolute;
          bottom: 24px;
          right: 24px;
          width: 72px;
          height: 72px;
          pointer-events: none;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
        }

        .top-fellow-badge__seal {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1px;
          clip-path: ${NOTCH_CLIP_PATH};
          background: radial-gradient(circle at 50% 42%, #F5C842 0%, #D4A017 100%);
          box-shadow: inset 0 0 0 3px #B8860B;
        }

        .top-fellow-badge__top,
        .top-fellow-badge__fellow {
          color: #1A1A1A;
          font-family: 'Satoshi', sans-serif;
          font-weight: 700;
          line-height: 1.1;
          text-align: center;
        }

        .top-fellow-badge__top {
          font-size: 11px;
          letter-spacing: 0.06em;
        }

        .top-fellow-badge__fellow {
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}
