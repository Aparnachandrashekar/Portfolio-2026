"use client";

import { useState } from "react";
import { LINKEDIN_URL, RESUME_URL } from "@/lib/projects";

export default function Contact() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <footer
      id="contact"
      className="section-contact"
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 600,
            color: "var(--bg)",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            margin: "0 0 20px 0",
          }}
        >
          Let&apos;s build something.
        </h2>

        <a
          href="mailto:aparnacs008@gmail.com"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            marginTop: "44px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            border: "1px solid var(--bg)",
            color: ctaHovered ? "var(--text)" : "var(--bg)",
            background: ctaHovered ? "var(--bg)" : "transparent",
            padding: "0 32px",
            height: "52px",
            minWidth: "44px",
            borderRadius: "100px",
            textDecoration: "none",
            letterSpacing: "0.01em",
            transition: "background 300ms ease, color 300ms ease",
            cursor: "pointer",
          }}
        >
          Get in touch →
        </a>
      </div>

      <div className="contact-bottom">
        <span className="contact-copy">
          © 2026 Aparna Chandrashekar
        </span>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social"
          >
            LinkedIn
          </a>
          <span style={{ color: "#3A3835", fontSize: "13px", userSelect: "none" }}>
            /
          </span>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social"
          >
            Resume
          </a>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .section-contact {
          background: var(--text);
          padding-top: var(--section-pad-y);
          padding-bottom: 64px;
          padding-left: var(--page-pad);
          padding-right: var(--page-pad);
        }

        .contact-bottom {
          max-width: 800px;
          margin: 80px auto 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .contact-copy {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #7A7670;
        }

        .contact-social {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #7A7670;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 0 6px;
          transition: color 0.2s ease;
        }
        .contact-social:hover { color: var(--bg); }

        @media (max-width: 768px) {
          .section-contact {
            padding-bottom: max(40px, env(safe-area-inset-bottom));
          }

          .section-contact h2 {
            font-size: clamp(26px, 7vw, 36px) !important;
          }

          .contact-bottom {
            margin-top: 40px;
          }
        }

        @media (max-width: 560px) {
          .contact-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
