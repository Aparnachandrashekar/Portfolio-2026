import { CATEGORY_ACCENT, type Project } from "@/lib/projects";
import TopFellowBadge from "@/components/TopFellowBadge";

export default function WorkCard({ project }: { project: Project }) {
  const { slug, title, description, href, category, orientation, issuer, inProgress, series, honor } = project;
  const accent = CATEGORY_ACCENT[category];
  const isLandscape = orientation === "landscape";
  const isExternalLink = Boolean(href) && (href.startsWith("http") || (href.startsWith("/") && !href.startsWith("/#")));
  const isAnchorLink = Boolean(href) && href.startsWith("#");
  const isLink = isExternalLink || isAnchorLink;
  const hasDescription = Boolean(description);
  const showTopFellow = honor === "Top Fellow";
  const cardWidth = isLandscape ? "360px" : "280px";

  const cardStyle = {
    "--card-width": cardWidth,
    minHeight: hasDescription ? "340px" : showTopFellow ? "320px" : "300px",
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

      <div className="proj-card-badges">
        <span className="proj-card-badge">
          {inProgress ? "In progress" : category}
        </span>
        {series && (
          <span className="proj-card-badge proj-card-badge--series">
            {series}
          </span>
        )}
      </div>

      <div className="proj-card-body">
        <div className="proj-card-copy">
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

          {honor && !showTopFellow && (
            <span className="proj-card-honor-label">{honor}</span>
          )}

          {inProgress ? (
            <span className="proj-card-cta">
              March – June 2026
            </span>
          ) : isLink ? (
            <span className="proj-card-cta">
              {isAnchorLink ? "See certificate ↓" : "View ↗"}
            </span>
          ) : null}
        </div>
      </div>

      {showTopFellow && <TopFellowBadge />}

      <style suppressHydrationWarning>{`
        .proj-card-badges {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          position: relative;
        }

        .proj-card-badge {
          display: inline-block;
          align-self: flex-start;
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

        .proj-card-badge--series {
          text-transform: none;
          letter-spacing: 0.04em;
          font-weight: 500;
          background: rgba(0,0,0,0.18);
          opacity: 0.9;
        }

        .proj-card-body {
          position: relative;
        }

        .proj-card-copy {
          flex: 1;
          min-width: 0;
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

        .proj-card-honor-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 11px;
          font-weight: 600;
          opacity: 0.9;
          display: block;
          margin-top: 4px;
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
      <a
        id={slug}
        href={href}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
        className="proj-card"
        style={cardStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <div id={slug} className="proj-card" style={cardStyle}>
      {inner}
    </div>
  );
}
