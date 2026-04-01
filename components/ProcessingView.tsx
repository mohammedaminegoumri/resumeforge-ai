"use client";
import { useEffect, useState } from "react";

const STAGES = [
  { label: "Parsing job description", sub: "Extracting requirements, responsibilities & qualifications", icon: "📋" },
  { label: "Identifying ATS keywords", sub: "Hard skills, soft skills, tools, certifications, industry terms", icon: "🔍" },
  { label: "Mapping your experience", sub: "Semantic alignment between your background and the role", icon: "🧠" },
  { label: "Rewriting content", sub: "Achievement-oriented language with powerful action verbs", icon: "✍️" },
  { label: "Optimizing for ATS", sub: "Keyword density, placement, and 2025–2026 ATS standards", icon: "⚡" },
  { label: "Preserving your design", sub: "Layout, fonts, colors, photo & branding kept intact", icon: "🎨" },
  { label: "Finalizing output", sub: "Quality check, scoring, and preparing your download", icon: "✅" },
];

export default function ProcessingView() {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        const next = prev < STAGES.length - 1 ? prev + 1 : prev;
        if (next > prev) {
          setCompletedStages((c) => [...c, prev]);
        }
        return next;
      });
    }, 3200);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 1.2, 95));
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "60px 24px",
        textAlign: "center",
      }}
      className="fade-in"
    >
      {/* Animated logo/icon */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #0f1729, #1a2540)",
          margin: "0 auto 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxShadow: "0 0 0 12px rgba(232,184,109,0.08), 0 0 0 24px rgba(232,184,109,0.04)",
        }}
      >
        <svg className="spinner" width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ position: "absolute" }}>
          <circle cx="16" cy="16" r="14" stroke="rgba(232,184,109,0.15)" strokeWidth="2" />
          <path d="M16 2a14 14 0 0114 14" stroke="#e8b86d" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 4h16v20H6V4z" stroke="#e8b86d" strokeWidth="1.5" />
          <path d="M10 10h8M10 14h8M10 18h5" stroke="#e8b86d" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <h2
        className="font-display"
        style={{ fontSize: 26, fontWeight: 700, color: "#0f1729", marginBottom: 8 }}
      >
        Optimizing your resume
      </h2>
      <p style={{ fontSize: 15, color: "#718096", marginBottom: 40, lineHeight: 1.6 }}>
        Our AI is analyzing the job description and intelligently <br />
        rewriting your content while preserving your design
      </p>

      {/* Progress bar */}
      <div
        style={{
          height: 6,
          background: "#e2e8f0",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <div
          className="progress-animated"
          style={{
            height: "100%",
            width: `${progress}%`,
            borderRadius: 10,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <p style={{ fontSize: 13, color: "#a0aec0", marginBottom: 40 }}>
        {Math.round(progress)}% complete
      </p>

      {/* Stages */}
      <div style={{ textAlign: "left" }}>
        {STAGES.map((stage, i) => {
          const isDone = completedStages.includes(i);
          const isActive = currentStage === i;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "14px 18px",
                borderRadius: 10,
                marginBottom: 6,
                background: isActive
                  ? "linear-gradient(135deg, rgba(15,23,41,0.05), rgba(232,184,109,0.05))"
                  : "transparent",
                border: isActive ? "1px solid rgba(232,184,109,0.2)" : "1px solid transparent",
                transition: "all 0.3s",
              }}
            >
              {/* Status indicator */}
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                {isDone ? (
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : isActive ? (
                  <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                    <div className="dot-1" style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8b86d" }} />
                    <div className="dot-2" style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8b86d" }} />
                    <div className="dot-3" style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8b86d" }} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "#e2e8f0",
                    }}
                  />
                )}
              </div>

              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    color: isDone ? "#22c55e" : isActive ? "#0f1729" : "#a0aec0",
                    margin: 0,
                    transition: "all 0.3s",
                  }}
                >
                  {stage.label}
                </p>
                {isActive && (
                  <p style={{ fontSize: 12, color: "#718096", margin: "3px 0 0", lineHeight: 1.5 }}>
                    {stage.sub}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 13, color: "#a0aec0", marginTop: 32, fontStyle: "italic" }}>
        This typically takes 15–30 seconds. Please keep this tab open.
      </p>
    </div>
  );
}
