import { CATEGORY_ACCENT, type Project } from "@/lib/projects";

export default function WorkCard({ project }: { project: Project }) {
  const { title, description, href, category, orientation, issuer, inProgress } = project;
  const accent = CATEGORY_ACCENT[category];
  const isLandscape = orientation === "landscape";
  const isLink = href.startsWith("http");
  const hasDescription = Boolean(description);
  const cardWidth = isLandscape ? "360px" : "280px";
  const orientClass = isLandscape ? "proj-card--landscape" : "proj-card--portrait";
  const descClass = hasDescription ? " proj-card--desc" : "";

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

      <span className="proj-card-badge">
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
          <p className="proj-card-issuer">
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
        .proj-card-badge {
          display: inline-block;
          align-self: flex-start;
          position: relative;
          font-family: 'Satoshi', sans-serif;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: rgba(0,0,0,0.28);
          border-radius: 100px;
          padding: 4px 10px;
          backdrop-filter: blur(8px);
          color: #fff;
        }

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

        .proj-card-issuer {
          font-family: 'Satoshi', sans-serif;
          font-size: 12px;
          font-weight: 500;
          opacity: 0.8;
          margin: 0 0 6px;
        }

        .proj-card-cta {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 700;
          margin-top: 12px;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .proj-card--landscape.proj-card--desc {
            min-height: 204px !important;
          }

          .proj-card--landscape:not(.proj-card--desc) {
            min-height: 180px !important;
          }

          .proj-card--portrait.proj-card--desc {
            min-height: 180px !important;
          }

          .proj-card--portrait:not(.proj-card--desc) {
            min-height: 168px !important;
          }

          .proj-card-badge {
            font-size: 8px;
            padding: 3px 7px;
          }

          .proj-card-title {
            font-size: ${isLandscape ? "12px" : "11px"};
            overflow-wrap: break-word;
          }

          .proj-card-desc {
            font-size: 9px;
            line-height: 1.45;
            overflow-wrap: break-word;
          }

          .proj-card-issuer {
            font-size: 9px;
          }

          .proj-card-cta {
            font-size: 10px;
            margin-top: 8px;
          }
        }
      `}</style>
    </>
  );

  const cardClass = `proj-card ${orientClass}${descClass}`;

  if (isLink) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass} style={cardStyle}>
        {inner}
      </a>
    );
  }

  return (
    <div className={cardClass} style={cardStyle}>
      {inner}
    </div>
  );
}
