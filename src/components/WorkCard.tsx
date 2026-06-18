import { CATEGORY_ACCENT, type Project } from "@/lib/projects";

export default function WorkCard({ project }: { project: Project }) {
  const { title, description, href, category, orientation, issuer, inProgress } = project;
  const accent = CATEGORY_ACCENT[category];
  const isLandscape = orientation === "landscape";
  const isLink = href.startsWith("http");
  const hasDescription = Boolean(description);
  const cardWidth = isLandscape ? "360px" : "280px";

  const cardStyle = {
    "--card-width": cardWidth,
    minHeight: hasDescription ? "340px" : "300px",
    borderRadius: "22px",
    background: accent,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "22px",
    textDecoration: "none",
    color: "#fff",
    cursor: isLink ? "pointer" : "default",
    opacity: inProgress ? 0.92 : 1,
  } as React.CSSProperties;

  const inner = (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.14) 0%, transparent 65%)",
        }}
      />

      <span
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          position: "relative",
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          background: "rgba(0,0,0,0.28)",
          borderRadius: "100px",
          padding: "4px 10px",
          backdropFilter: "blur(8px)",
          color: "#fff",
        }}
      >
        {inProgress ? "In progress" : category}
      </span>

      <div style={{ position: "relative" }}>
        <p className="proj-card-title">
          {title}
        </p>

        {description && (
          <p className="proj-card-desc">
            {description}
          </p>
        )}

        {issuer && (
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              opacity: 0.8,
              margin: "0 0 6px",
            }}
          >
            {issuer}
          </p>
        )}

        {inProgress ? (
          <span className="proj-card-cta">
            March – June 2026
          </span>
        ) : isLink ? (
          <span className="proj-card-cta">
            View ↗
          </span>
        ) : null}
      </div>

      <style suppressHydrationWarning>{`
        .proj-card-title {
          font-family: 'Clash Display', sans-serif;
          font-size: ${isLandscape ? "20px" : "17px"};
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin: 0 0 6px;
        }

        .proj-card-desc {
          font-family: 'Satoshi', sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.55;
          opacity: 0.88;
          margin: 0 0 8px;
        }

        .proj-card-cta {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 700;
          margin-top: 12px;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .proj-card-title {
            font-size: ${isLandscape ? "18px" : "16px"};
            overflow-wrap: break-word;
          }

          .proj-card-desc {
            font-size: 13px;
            line-height: 1.5;
            overflow-wrap: break-word;
          }
        }
      `}</style>
    </>
  );

  if (isLink) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="proj-card" style={cardStyle}>
        {inner}
      </a>
    );
  }

  return (
    <div className="proj-card" style={cardStyle}>
      {inner}
    </div>
  );
}
