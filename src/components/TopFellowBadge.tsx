export default function TopFellowBadge() {
  return (
    <div className="top-fellow-badge" aria-label="Top Fellow">
      <svg
        viewBox="0 0 120 120"
        width="88"
        height="88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id="sealGold" cx="50%" cy="42%" r="58%">
            <stop offset="0%" stopColor="#FFE566" />
            <stop offset="55%" stopColor="#F5C518" />
            <stop offset="100%" stopColor="#D4A017" />
          </radialGradient>
          <filter id="sealGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFE566" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Scalloped seal edge */}
        <circle cx="60" cy="60" r="54" fill="url(#sealGold)" filter="url(#sealGlow)" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const cx = 60 + Math.cos(rad) * 50;
          const cy = 60 + Math.sin(rad) * 50;
          return <circle key={i} cx={cx} cy={cy} r="7.5" fill="url(#sealGold)" />;
        })}

        {/* Inner ring */}
        <circle cx="60" cy="60" r="42" fill="none" stroke="#1A1A1A" strokeWidth="1.2" opacity="0.35" />

        {/* Top stars arc */}
        {[ -32, -16, 0, 16, 32 ].map((dx, i) => (
          <polygon
            key={i}
            points={`${60 + dx},28 ${60 + dx + 2.2},33.5 ${60 + dx + 5.5},33.5 ${60 + dx + 3.2},36.5 ${60 + dx + 4.2},40 ${60 + dx},37.5 ${60 + dx - 4.2},40 ${60 + dx - 3.2},36.5 ${60 + dx - 5.5},33.5 ${60 + dx - 2.2},33.5`}
            fill="#1A1A1A"
            opacity="0.85"
            transform={i === 2 ? "scale(1.15) translate(-9 -4.8)" : undefined}
            transformOrigin={`${60 + dx} 34`}
          />
        ))}

        {/* Laurel left */}
        <path
          d="M38 72 C34 66 32 58 34 50 C36 58 38 64 42 70"
          stroke="#1A1A1A"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M42 74 C38 68 37 60 40 52 C42 60 43 66 46 72"
          stroke="#1A1A1A"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* Laurel right */}
        <path
          d="M82 72 C86 66 88 58 86 50 C84 58 82 64 78 70"
          stroke="#1A1A1A"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M78 74 C82 68 83 60 80 52 C78 60 77 66 74 72"
          stroke="#1A1A1A"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* Bottom star */}
        <polygon
          points="60,88 62.2,93.5 68,93.5 63.2,97 65,102.5 60,99 55,102.5 56.8,97 52,93.5 57.8,93.5"
          fill="#1A1A1A"
          opacity="0.85"
        />

        {/* Text */}
        <text
          x="60"
          y="58"
          textAnchor="middle"
          fill="#1A1A1A"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="1"
        >
          TOP
        </text>
        <text
          x="60"
          y="76"
          textAnchor="middle"
          fill="#1A1A1A"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="14"
          fontWeight="600"
        >
          Fellow
        </text>
      </svg>

      <style suppressHydrationWarning>{`
        .top-fellow-badge {
          flex-shrink: 0;
          line-height: 0;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.18));
        }

        @media (max-width: 768px) {
          .top-fellow-badge svg {
            width: 72px;
            height: 72px;
          }
        }
      `}</style>
    </div>
  );
}
