import WorkCard from "@/components/WorkCard";
import { CERTIFICATIONS } from "@/lib/projects";

export default function Certifications() {
  return (
    <section id="certifications" style={{ paddingBottom: "120px" }}>
      <div style={{ paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)", marginBottom: "48px" }}>
        <span style={{
          display: "block", fontFamily: "'Satoshi', sans-serif", fontSize: "11px",
          fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em",
          color: "var(--accent)", marginBottom: "16px",
        }}>
          Credentials
        </span>

        <h2 style={{
          fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 600, color: "var(--text)", lineHeight: 1.08,
          letterSpacing: "-0.02em", margin: 0,
        }}>
          Certifications.
        </h2>
      </div>

      <div
        className="carousel-track"
        style={{
          display: "flex", gap: "16px", overflowX: "auto",
          paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)",
          paddingBottom: "12px", WebkitOverflowScrolling: "touch",
        }}
      >
        {CERTIFICATIONS.map((p) => <WorkCard key={p.slug} project={p} />)}
      </div>

      <style suppressHydrationWarning>{`
        #certifications .carousel-track { scrollbar-width: none; -ms-overflow-style: none; }
        #certifications .carousel-track::-webkit-scrollbar { display: none; }
        #certifications .proj-card {
          transition: transform 300ms cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 300ms cubic-bezier(0.25,0.46,0.45,0.94);
        }
        #certifications .proj-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.16); }
      `}</style>
    </section>
  );
}
