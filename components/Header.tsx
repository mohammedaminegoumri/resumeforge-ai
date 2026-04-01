"use client";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(15, 23, 41, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(232, 184, 109, 0.15)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "linear-gradient(135deg, #e8b86d, #c49a4a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 3h12v14H4V3z" stroke="#0f1729" strokeWidth="1.5" />
              <path d="M7 7h6M7 10h6M7 13h4" stroke="#0f1729" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="15" cy="15" r="4" fill="#0f1729" />
              <path d="M13.5 15h3M15 13.5v3" stroke="#e8b86d" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span
              className="font-display"
              style={{ color: "#fff", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}
            >
              ResumeForge
            </span>
            <span style={{ color: "#e8b86d", fontWeight: 700, fontSize: 18 }}> AI</span>
          </div>
        </div>

        {/* Nav links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
          className="desktop-nav"
        >
          {["How it Works", "Features", "Free"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 400,
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#e8b86d")}
              onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              {item === "Free" ? (
                <span
                  style={{
                    background: "rgba(232,184,109,0.15)",
                    color: "#e8b86d",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                    border: "1px solid rgba(232,184,109,0.3)",
                  }}
                >
                  100% Free
                </span>
              ) : (
                item
              )}
            </a>
          ))}
          <a
            href="#optimizer"
            style={{
              background: "linear-gradient(135deg, #e8b86d, #c49a4a)",
              color: "#0f1729",
              padding: "8px 20px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Start Free →
          </a>
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
    </header>
  );
}
