"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0f1729",
        borderTop: "1px solid rgba(232,184,109,0.1)",
        padding: "48px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #e8b86d, #c49a4a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 3h12v14H4V3z" stroke="#0f1729" strokeWidth="1.5" />
                  <path d="M7 7h6M7 10h6M7 13h4" stroke="#0f1729" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-display" style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>
                ResumeForge <span style={{ color: "#e8b86d" }}>AI</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 300 }}>
              The most intelligent resume optimizer. Tailored content, preserved design,
              maximum ATS performance — completely free.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Resume Optimizer", "ATS Checker", "Cover Letter (soon)", "LinkedIn (soon)"],
            },
            {
              title: "Resources",
              links: ["How it Works", "ATS Guide 2025", "Resume Tips", "Blog"],
            },
            {
              title: "Company",
              links: ["About", "Privacy Policy", "Terms of Service", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  marginBottom: 16,
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link} style={{ marginBottom: 10 }}>
                    <a
                      href="#"
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#e8b86d")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>
            © {new Date().getFullYear()} ResumeForge AI. Free forever. No credit card required.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span
              style={{
                fontSize: 12,
                padding: "4px 12px",
                borderRadius: 20,
                background: "rgba(34,197,94,0.1)",
                color: "#22c55e",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              ● All systems operational
            </span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              Powered by Claude AI
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
