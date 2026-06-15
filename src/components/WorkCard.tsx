import { CATEGORY_ACCENT, type Project } from "@/lib/projects";

export default function WorkCard({ project }: { project: Project }) {
  const { title, description, href, category, orientation, issuer, inProgress } = project;
  const accent      = CATEGORY_ACCENT[category];
  const isLandscape = orientation === 'landscape';
  const isLink      = href.startsWith('http');
  const hasDescription = Boolean(description);

  const cardStyle: React.CSSProperties = {
    flex: `0 0 ${isLandscape ? '360px' : '280px'}`, minHeight: hasDescription ? '340px' : '300px', height: 'auto', borderRadius: '22px',
    background: accent, position: 'relative', overflow: 'hidden',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    padding: '22px', textDecoration: 'none', color: '#fff',
    cursor: isLink ? 'pointer' : 'default',
    opacity: inProgress ? 0.92 : 1,
  };

  const inner = (
    <>
      <div className="proj-card-shine" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.14) 0%, transparent 65%)',
      }} />

      <span style={{
        display: 'inline-block', alignSelf: 'flex-start', position: 'relative',
        fontFamily: "'Satoshi', sans-serif", fontSize: '10px', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.1em',
        background: 'rgba(0,0,0,0.28)', borderRadius: '100px',
        padding: '4px 10px', backdropFilter: 'blur(8px)',
        color: '#fff',
      }}>
        {inProgress ? 'In progress' : category}
      </span>

      <div style={{ position: 'relative' }}>
        <p style={{
          fontFamily: "'Clash Display', sans-serif", fontSize: isLandscape ? '20px' : '17px',
          fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.01em', margin: '0 0 6px',
        }}>
          {title}
        </p>
        {description && (
          <p className="proj-card-desc" style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: '12px', fontWeight: 400,
            lineHeight: 1.55, opacity: 0.88, margin: '0 0 8px',
          }}>
            {description}
          </p>
        )}
        {issuer && (
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: '12px', fontWeight: 500,
            opacity: 0.8, margin: '0 0 6px',
          }}>
            {issuer}
          </p>
        )}
        {inProgress ? (
          <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '12px', fontWeight: 500, opacity: 0.75 }}>
            March – June 2026
          </span>
        ) : isLink ? (
          <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '12px', fontWeight: 500, opacity: 0.75 }}>
            View ↗
          </span>
        ) : null}
      </div>
    </>
  );

  if (isLink) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="proj-card" style={cardStyle}>{inner}</a>;
  }
  return <div className="proj-card" style={cardStyle}>{inner}</div>;
}
