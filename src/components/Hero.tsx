const LINE_ONE = "Aparna";
const LINE_TWO = "Chandrashekar";

export default function Hero() {
  return (
    <section id="home" className="hero-section">
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

      <a href="#about" className="hero-dive-in">
        <span className="hero-dive-in__label">Dive in</span>
        <svg
          className="hero-dive-in__arrow"
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 1 L5 10 M5 10 L2 7 M5 10 L8 7"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

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

        .hero-dive-in {
          display: none;
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
            min-height: calc(100svh - 60px);
            justify-content: space-between;
          }

          .hero-body {
            flex: 1;
            display: flex;
            align-items: center;
            padding: 16px 7px 0;
          }

          .hero-copy {
            width: 100%;
          }

          .hero-title {
            font-size: inherit;
            line-height: 0.92;
            letter-spacing: -0.04em;
          }

          .hero-line {
            white-space: nowrap;
            font-size: clamp(36px, 11.8vw, 52px);
            font-weight: 700;
          }

          .hero-line--two {
            font-size: clamp(32px, 10.6vw, 48px);
          }

          .hero-indent {
            margin-left: 0;
          }

          .hero-tagline {
            margin-top: 16px;
            font-size: clamp(15px, 3.9vw, 17px);
            line-height: 1.5;
            text-wrap: pretty;
          }

          .hero-dot {
            width: clamp(7px, 1.8vw, 9px);
            height: clamp(7px, 1.8vw, 9px);
          }

          .hero-scroll {
            display: none;
          }

          .hero-dive-in {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            gap: 6px;
            margin: 0 7px 28px;
            padding: 0;
            text-decoration: none;
            color: var(--text-secondary);
            align-self: flex-start;
          }

          .hero-dive-in__label {
            font-family: 'Satoshi', sans-serif;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .hero-dive-in__arrow {
            opacity: 0.35;
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}
