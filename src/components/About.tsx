const VALUE_CARDS = [
  {
    label: "Structure",
    description: "Ambiguity gets a framework before it gets an answer.",
  },
  {
    label: "Builder's mindset",
    description: "Brings design thinking and build instinct to the same problem.",
  },
  {
    label: "Curious about what shapes people",
    description: "Products, systems, psychology. Always tracing back to what drives the behaviour.",
  },
];

export default function About() {
  const bodyStyle: React.CSSProperties = {
    fontFamily: "'Satoshi', sans-serif",
    fontSize: "clamp(15px, 2vw, 18px)",
    fontWeight: 400,
    color: "var(--text-secondary)",
    lineHeight: 1.8,
    margin: 0,
    maxWidth: "560px",
  };

  return (
    <>
      <section
        id="about"
        className="section-about"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="about-grid">
            <div className="about-left">
              <span
                className="about-eyebrow"
                style={{
                  display: "block",
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--accent)",
                  marginBottom: "16px",
                }}
              >
                About
              </span>

              <h2
                className="about-heading"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 600,
                  color: "var(--text)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  margin: "0 0 28px 0",
                }}
              >
                People first.
              </h2>

              <div className="about-body-stack" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <p className="about-body" style={bodyStyle}>
                  At the root of every successful product is a person - how they think, what
                  they want, why they do what they do. Scale that up and you have groups,
                  societies and economies, which is why I believe understanding people is the
                  starting point of building impactful products.
                </p>
                <p className="about-body" style={bodyStyle}>
                  My background in psychology and organizational development helps me approach
                  product management with empathy, systems thinking, and a deep focus on human
                  behavior: specifically how and why people interact with the systems they
                  operate in, and what that means for the products we build. I have three years
                  of experience building and shipping tools that put this thinking into practice,
                  from 0 → 1.
                </p>
                <p className="about-body" style={bodyStyle}>
                  One of the key builds here is Thoughtful, a natural language reminder tool
                  that integrates with Google Calendar, WhatsApp, and Google Meet, meeting
                  users where they are. Alongside that, I analyse consumer products through
                  case studies, redesigns, PRDs, and feature deep dives, through a behavioral
                  and analytical lens. This portfolio is that body of work.
                </p>
              </div>
            </div>

            <div className="about-right">
              <div className="about-value-stack" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {VALUE_CARDS.map(({ label, description }) => (
                  <ValueCard key={label} label={label} description={description} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style suppressHydrationWarning>{`
        .section-about {
          padding-top: var(--section-pad-y);
          padding-bottom: var(--section-pad-y);
          padding-left: var(--page-pad);
          padding-right: var(--page-pad);
        }

        .about-grid {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 64px;
        }
        .about-left  { width: 60%; flex-shrink: 0; }
        .about-right { width: 40%; flex-shrink: 0; }

        @media (max-width: 768px) {
          .about-grid {
            flex-direction: column;
            gap: 28px;
            align-items: flex-start;
          }
          .about-left,
          .about-right {
            width: 100%;
            text-align: left;
          }

          .about-eyebrow {
            font-size: 10px !important;
            margin-bottom: 12px !important;
          }

          .about-heading {
            font-size: clamp(33px, 4.5vw, 36px) !important;
            margin-bottom: 20px !important;
          }

          .about-body {
            font-size: clamp(13px, 1.8vw, 16px) !important;
            max-width: 100% !important;
            line-height: 1.65 !important;
          }

          .about-body-stack {
            align-items: flex-start;
            gap: 14px !important;
          }

          .about-value-stack {
            align-items: stretch;
            width: 100%;
            gap: 12px !important;
          }

          .value-card {
            width: 100%;
            box-sizing: border-box;
            min-height: 100px;
            padding: 11px 14px !important;
            border-left: 2px solid var(--accent) !important;
            border-top: none !important;
            text-align: left;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 4px !important;
          }

          .value-card-label {
            font-size: 15px !important;
            font-weight: 700 !important;
            line-height: 1.2 !important;
          }

          .value-card-desc {
            font-size: 11px !important;
            line-height: 1.5 !important;
          }
        }
      `}</style>
    </>
  );
}

function ValueCard({ label, description }: { label: string; description: string }) {
  return (
    <div
      className="value-card"
      style={{
        borderLeft: "2px solid var(--accent)",
        padding: "16px 20px",
        background: "var(--surface)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <span
        className="value-card-label"
        style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--text)",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
      <span
        className="value-card-desc"
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "14px",
          fontWeight: 400,
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </span>
    </div>
  );
}
