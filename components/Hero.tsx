"use client";

const stats = [
  { value: "94%", label: "Avg ATS Score" },
  { value: "< 30s", label: "Generation time" },
  { value: "100%", label: "Design preserved" },
  { value: "Free", label: "Always & forever" },
];

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section
      style={{
        background: "linear-gradient(160deg, #0f1729 0%, #1a2540 50%, #0f1729 100%)",
        padding: "80px 24px 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,184,109,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,184,109,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
        {/* Badge */}
        <div
          className="fade-in"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(232,184,109,0.1)",
            border: "1px solid rgba(232,184,109,0.3)",
            padding: "6px 16px",
            borderRadius: 20,
            marginBottom: 32,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ color: "#e8b86d", fontSize: 13, fontWeight: 500 }}>
            ATS-Optimized for 2025–2026 Standards
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display fade-in-1"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            marginBottom: 24,
          }}
        >
          Your Resume, Perfectly Tailored.{" "}
          <span className="gradient-text">Design Untouched.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="fade-in-2"
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            maxWidth: 680,
            margin: "0 auto 48px",
            fontWeight: 300,
          }}
        >
          Upload your resume, paste the job description, and let AI rewrite your
          content for maximum ATS ranking — while keeping your original design,
          fonts, colors, and layout{" "}
          <strong style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>exactly as-is</strong>.
        </p>

        {/* CTA */}
        <div className="fade-in-3" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={onStart}
            style={{
              background: "linear-gradient(135deg, #e8b86d, #c49a4a)",
              color: "#0f1729",
              padding: "16px 36px",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "-0.3px",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,184,109,0.35)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            ✦ Optimize My Resume — Free
          </button>
          <button
            onClick={onStart}
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.8)",
              padding: "16px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 400,
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "rgba(232,184,109,0.5)";
              e.currentTarget.style.color = "#e8b86d";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
          >
            Watch how it works →
          </button>
        </div>

        {/* Trust indicators */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 72,
            paddingTop: 48,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                className="font-display"
                style={{ fontSize: 32, fontWeight: 700, color: "#e8b86d", lineHeight: 1 }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
