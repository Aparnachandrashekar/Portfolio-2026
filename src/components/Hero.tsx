const LINE_ONE = "Aparna";
const LINE_TWO = "Chandrashekar";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-body">
        <div className="hero-copy">
          <h1 className="hero-title" aria-label={`${LINE_ONE} ${LINE_TWO}`}>
            <span className="hero-line hero-line--one">{LINE_ONE}</span>
            <span className="hero-line hero-line--two hero-indent">
              {LINE_TWO}
              <span className="hero-dot hero-dot--period" aria-hidden />
            </span>
          </h1>

          <p className="hero-tagline hero-indent">
            At the intersection of people and product is where my strengths, aspirations, and problems worth solving meet.
          </p>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-label">scroll</span>
        <svg
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          aria-hidden
          className="hero-chevron"
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style suppressHydrationWarning>{`
        .hero-section {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .hero-body {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 clamp(20px, 4vw, 72px);
        }

        .hero-copy {
          width: 100%;
        }

        .hero-title {
          margin: 0;
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(64px, 13.5vw, 168px);
          font-weight: 700;
          color: var(--text);
          line-height: 0.9;
          letter-spacing: -0.045em;
        }

        .hero-line {
          display: block;
        }

        .hero-line--one {
          text-align: left;
        }

        .hero-line--two {
          margin-top: -0.04em;
        }

        .hero-indent {
          margin-left: clamp(56px, 9.5vw, 132px);
        }

        .hero-dot {
          display: inline-block;
          border-radius: 50%;
          background: var(--accent);
          width: clamp(12px, 1.3vw, 20px);
          height: clamp(12px, 1.3vw, 20px);
          margin-left: 0.06em;
          vertical-align: baseline;
          transform: translateY(0.08em);
        }

        .hero-tagline {
          margin: clamp(18px, 2.5vw, 28px) 0 0;
          padding: 0;
          font-family: 'Satoshi', sans-serif;
          font-size: clamp(18px, 2.4vw, 28px);
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: 0;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .hero-scroll {
          padding-bottom: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
        }

        .hero-scroll-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-chevron {
          display: block;
        }

        @media (max-width: 900px) {
          .hero-tagline {
            white-space: normal;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            height: auto;
            min-height: 100svh;
          }

          .hero-body {
            align-items: flex-start;
            padding-top: 28px;
            padding-left: max(20px, env(safe-area-inset-left));
            padding-right: max(20px, env(safe-area-inset-right));
          }

          .hero-title {
            font-size: clamp(38px, 10.5vw, 64px);
            line-height: 0.92;
            letter-spacing: -0.04em;
            overflow-wrap: break-word;
          }

          .hero-indent {
            margin-left: clamp(28px, 8vw, 56px);
          }

          .hero-tagline {
            font-size: clamp(15px, 4.1vw, 18px);
            line-height: 1.55;
            text-wrap: pretty;
          }

          .hero-dot {
            width: 10px;
            height: 10px;
          }

          .hero-scroll {
            padding-bottom: max(28px, env(safe-area-inset-bottom));
          }
        }

        @media (max-width: 390px) {
          .hero-title {
            font-size: clamp(34px, 9.8vw, 42px);
          }

          .hero-indent {
            margin-left: 24px;
          }

          .hero-tagline {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
