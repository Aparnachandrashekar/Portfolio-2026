"use client";

import { useState } from "react";

export default function Contact() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <footer
      id="contact"
      style={{
        background: "var(--text)",
        paddingTop: "120px",
        paddingBottom: "64px",
        paddingLeft: "clamp(24px, 5vw, 80px)",
        paddingRight: "clamp(24px, 5vw, 80px)",
      }}
    >
      {/* Centred content block */}
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

        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 400,
            color: "#7A7670",
            lineHeight: 1.65,
            margin: "0 0 44px 0",
            maxWidth: "440px",
          }}
        >
          Open to PM roles at startups and product-led companies.
        </p>

        <a
          href="mailto:your@email.com"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
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

      {/* Bottom row — copyright + social links */}
      <div className="contact-bottom">
        <span className="contact-copy">
          © 2025 Aparna Chandrashekar
        </span>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a
            href="#"
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
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social"
          >
            Resume
          </a>
        </div>
      </div>

      <style suppressHydrationWarning>{`
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
          /* 44px touch target */
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 0 6px;
          transition: color 0.2s ease;
        }
        .contact-social:hover { color: var(--bg); }

        @media (max-width: 560px) {
          .contact-bottom {
            flex-direction: column;
            text-align: center;
            margin-top: 56px;
          }
        }
      `}</style>
    </footer>
  );
}
