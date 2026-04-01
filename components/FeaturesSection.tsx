"use client";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload your resume",
    desc: "PDF, Word, or image. Our system detects and preserves your exact design — layout, fonts, colors, spacing, icons, and photo.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 3h18v22H5V3z" stroke="#e8b86d" strokeWidth="1.5" />
        <path d="M9 9h10M9 13h10M9 17h7" stroke="#e8b86d" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="21" cy="21" r="6" fill="#0f1729" stroke="#e8b86d" strokeWidth="1.5" />
        <path d="M19.5 21h3M21 19.5v3" stroke="#e8b86d" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Paste the job description",
    desc: "Paste the full job posting. The AI extracts every keyword, skill, tool, technology, certification, and ATS term used by that specific employer.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="3" stroke="#e8b86d" strokeWidth="1.5" />
        <path d="M8 10h12M8 14h8M8 18h5" stroke="#e8b86d" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="20" cy="18" r="1.5" fill="#e8b86d" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "AI optimizes in seconds",
    desc: "Claude AI rewrites your content using powerful action verbs, quantified achievements, and the exact terminology the ATS and recruiter are looking for.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#e8b86d" strokeWidth="1.5" />
        <path d="M10 14l3 3 5-6" stroke="#e8b86d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 3v2M14 23v2M3 14h2M23 14h2" stroke="#e8b86d" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Download & apply",
    desc: "Your tailored resume downloads instantly, ready to send to recruiters. Design unchanged. Content perfectly matched. ATS score maximized.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5v14m0 0l-5-5m5 5l5-5" stroke="#e8b86d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20v3h20v-3" stroke="#e8b86d" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const FEATURES = [
  { icon: "🎨", title: "100% Design Preservation", desc: "Your fonts, colors, layout, photo, icons — all untouched. We only rewrite words." },
  { icon: "🤖", title: "2025–2026 ATS Standards", desc: "Optimized for modern ATS platforms: Workday, Greenhouse, Lever, Taleo, and more." },
  { icon: "⚡", title: "Under 30 Seconds", desc: "Fast AI processing powered by Claude. No waiting, no manual editing required." },
  { icon: "🎯", title: "Deep Semantic Analysis", desc: "Goes beyond keywords — understands context, role fit, industry language, and intent." },
  { icon: "📊", title: "Quantified Achievements", desc: "Transforms vague duties into measurable achievements with realistic metrics and impact." },
  { icon: "🔒", title: "Secure & Private", desc: "Your data is never stored or used for training. Files are processed and immediately discarded." },
  { icon: "♾️", title: "Unlimited & Free", desc: "No paywalls, no limits, no account required. Optimize as many roles as you want." },
  { icon: "🌍", title: "All Industries", desc: "Works for tech, finance, healthcare, marketing, legal, engineering, and every other field." },
];

export default function FeaturesSection() {
  return (
    <>
      {/* How It Works */}
      <section
        style={{
          padding: "80px 24px",
          background: "#fff",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: 20,
                background: "rgba(232,184,109,0.1)",
                color: "#c49a4a",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Simple Process
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 36, fontWeight: 800, color: "#0f1729", margin: 0, letterSpacing: "-0.5px" }}
            >
              How it works
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
            }}
            className="steps-grid"
          >
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 28,
                      right: -16,
                      width: 32,
                      borderTop: "1px dashed #e2e8f0",
                      zIndex: 1,
                    }}
                    className="step-connector"
                  />
                )}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "linear-gradient(135deg, #0f1729, #1a2540)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    position: "relative",
                  }}
                >
                  {step.icon}
                  <span
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#e8b86d",
                      color: "#0f1729",
                      fontSize: 11,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1729", marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "#718096", lineHeight: 1.7, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        style={{
          padding: "80px 24px",
          background: "var(--cream)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: 20,
                background: "rgba(15,23,41,0.06)",
                color: "#4a5568",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Why ResumeForge AI
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 36, fontWeight: 800, color: "#0f1729", margin: 0, letterSpacing: "-0.5px" }}
            >
              Everything you need to land the interview
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
            className="features-grid"
          >
            {FEATURES.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  padding: "24px 20px",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  cursor: "default",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1729", marginBottom: 8 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: "#718096", lineHeight: 1.7, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .step-connector { display: none; }
        }
        @media (max-width: 600px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
