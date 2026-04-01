"use client";
import { useState } from "react";
import { OptimizationResult } from "@/types";

interface ResultsViewProps {
  result: OptimizationResult;
  onReset: () => void;
}

function ScoreRing({ value, size = 80, color = "#22c55e" }: { value: number; size?: number; color?: string }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="700" fill={color} fontFamily="Syne, sans-serif">
        {value}%
      </text>
    </svg>
  );
}

export default function ResultsView({ result, onReset }: ResultsViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "content" | "changes">("overview");
  const [downloading, setDownloading] = useState(false);

  const scoreColor = result.ats_score >= 85 ? "#22c55e" : result.ats_score >= 70 ? "#f59e0b" : "#ef4444";
  const matchColor = result.job_match_percentage >= 85 ? "#22c55e" : result.job_match_percentage >= 70 ? "#f59e0b" : "#ef4444";

  const handleDownload = async () => {
    setDownloading(true);
    // Create a printable HTML version of the optimized resume
    const content = result.full_resume_content;
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${content.name} — Resume</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Georgia, serif; font-size: 11pt; color: #1a1a1a; padding: 40px; max-width: 760px; margin: 0 auto; }
  .name { font-size: 24pt; font-weight: bold; margin-bottom: 4px; }
  .title { font-size: 13pt; color: #444; margin-bottom: 8px; }
  .contact { font-size: 10pt; color: #666; margin-bottom: 20px; }
  .section-header { font-size: 10pt; text-transform: uppercase; letter-spacing: 1.5px; color: #888; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin: 18px 0 10px; }
  .summary { font-size: 11pt; line-height: 1.7; margin-bottom: 12px; }
  .job-title { font-size: 12pt; font-weight: bold; }
  .job-meta { font-size: 10pt; color: #666; margin-bottom: 6px; }
  .bullet { font-size: 11pt; line-height: 1.6; padding-left: 16px; position: relative; margin-bottom: 4px; }
  .bullet::before { content: "•"; position: absolute; left: 4px; }
  .skills { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill { background: #f5f5f5; padding: 3px 10px; border-radius: 4px; font-size: 10pt; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
  <div class="name">${content.name}</div>
  <div class="title">${content.title}</div>
  <div class="contact">${content.contact}</div>
  
  <div class="section-header">Professional Summary</div>
  <div class="summary">${content.summary}</div>
  
  <div class="section-header">Professional Experience</div>
  ${content.experience.map(exp => `
    <div style="margin-bottom: 16px;">
      <div class="job-title">${exp.title}</div>
      <div class="job-meta">${exp.company} | ${exp.period}</div>
      ${exp.bullets.map(b => `<div class="bullet">${b}</div>`).join("")}
    </div>
  `).join("")}
  
  <div class="section-header">Core Competencies</div>
  <div class="skills">${content.skills.map(s => `<span class="skill">${s}</span>`).join("")}</div>
  
  <div class="section-header">Education</div>
  <div style="font-size: 11pt; line-height: 1.6;">${content.education}</div>
  
  ${content.certifications?.length > 0 ? `
  <div class="section-header">Certifications</div>
  ${content.certifications.map(c => `<div class="bullet">${c}</div>`).join("")}
  ` : ""}
  
  ${content.additional ? `
  <div class="section-header">Additional</div>
  <div style="font-size: 11pt;">${content.additional}</div>
  ` : ""}
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${content.name.replace(/\s+/g, "_")}_Optimized_Resume.html`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  const tabs = [
    { id: "overview", label: "Overview & Scores" },
    { id: "content", label: "Optimized Content" },
    { id: "changes", label: "Changes Made" },
  ] as const;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }} className="fade-in">
      {/* Success Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f1729, #1a2540)",
          borderRadius: 16,
          padding: "32px 36px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ color: "#22c55e", fontSize: 14, fontWeight: 600 }}>Optimization complete!</span>
          </div>
          <h2 className="font-display" style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}>
            Resume optimized for:{" "}
            <span style={{ color: "#e8b86d" }}>{result.role_title}</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: "6px 0 0" }}>
            {result.industry} · {result.company_type}
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{
              padding: "12px 28px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #e8b86d, #c49a4a)",
              color: "#0f1729",
              fontSize: 14,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Syne', sans-serif",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v9m0 0l-3-3m3 3l3-3" stroke="#0f1729" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 13h12" stroke="#0f1729" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {downloading ? "Preparing..." : "Download Resume"}
          </button>
          <button
            onClick={onReset}
            style={{
              padding: "12px 20px",
              borderRadius: 10,
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              fontWeight: 400,
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
            }}
          >
            ← Optimize another
          </button>
        </div>
      </div>

      {/* Score Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
        className="score-grid"
      >
        {[
          { label: "ATS Score", value: result.ats_score, type: "ring", color: scoreColor },
          { label: "Job Match", value: result.job_match_percentage, type: "ring", color: matchColor },
          { label: "Keywords Added", value: result.keywords_added?.length || 0, type: "number", suffix: " new" },
          { label: "Keywords Matched", value: result.keywords_matched?.length || 0, type: "number", suffix: " total" },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: "#fff",
              borderRadius: 14,
              border: "1px solid #e2e8f0",
              padding: "20px 16px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {card.type === "ring" ? (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <ScoreRing value={card.value as number} color={card.color} />
              </div>
            ) : (
              <div
                className="font-display"
                style={{ fontSize: 36, fontWeight: 700, color: "#0f1729", lineHeight: 1 }}
              >
                {card.value}
                <span style={{ fontSize: 14, fontWeight: 400, color: "#718096" }}>{card.suffix}</span>
              </div>
            )}
            <p style={{ fontSize: 13, color: "#718096", margin: card.type === "ring" ? 0 : "8px 0 0" }}>
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          background: "#f7f8fc",
          borderRadius: 10,
          padding: 4,
          marginBottom: 20,
          border: "1px solid #e2e8f0",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: "10px 16px",
              borderRadius: 7,
              border: "none",
              background: activeTab === tab.id ? "#fff" : "transparent",
              color: activeTab === tab.id ? "#0f1729" : "#718096",
              fontSize: 14,
              fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: "pointer",
              boxShadow: activeTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="result-cols">
          {/* Keywords Matched */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: 24 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#0f1729", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Keywords Already Strong ({result.keywords_matched?.length || 0})
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(result.keywords_matched || []).map((kw) => (
                <span key={kw} style={{ padding: "4px 12px", borderRadius: 20, background: "#f0fff4", color: "#276749", fontSize: 13, border: "1px solid #c6f6d5", fontWeight: 500 }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Keywords Added */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: 24 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#0f1729", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e8b86d", display: "inline-block" }} />
              Keywords Strategically Added ({result.keywords_added?.length || 0})
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(result.keywords_added || []).map((kw) => (
                <span key={kw} style={{ padding: "4px 12px", borderRadius: 20, background: "rgba(232,184,109,0.1)", color: "#c49a4a", fontSize: 13, border: "1px solid rgba(232,184,109,0.3)", fontWeight: 500 }}>
                  + {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: 24, gridColumn: "1 / -1" }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#0f1729", marginBottom: 14 }}>
              ✦ Key Achievements Highlighted
            </h4>
            {(result.key_achievements || []).map((a, i) => (
              <div key={i} style={{ padding: "12px 16px", borderRadius: 8, background: "#fafbff", border: "1px solid #e2e8f0", marginBottom: 8, fontSize: 13, color: "#2d3748", lineHeight: 1.6, display: "flex", gap: 12 }}>
                <span style={{ color: "#e8b86d", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                {a}
              </div>
            ))}
          </div>

          {/* Action verbs */}
          {result.action_verbs_added?.length > 0 && (
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: "#0f1729", marginBottom: 14 }}>
                💪 Power Action Verbs Added
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {result.action_verbs_added.map((v) => (
                  <span key={v} style={{ padding: "4px 12px", borderRadius: 20, background: "#eff6ff", color: "#1e40af", fontSize: 13, border: "1px solid #bfdbfe", fontWeight: 500 }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications recommended */}
          {result.certifications_recommended?.length > 0 && (
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: "#0f1729", marginBottom: 14 }}>
                🎯 Recommended Certifications
              </h4>
              {result.certifications_recommended.map((c) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f7fafc", fontSize: 13, color: "#4a5568" }}>
                  <span style={{ color: "#e8b86d" }}>→</span> {c}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "content" && (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          {/* Resume-like preview */}
          <div style={{ padding: "32px 40px", fontFamily: "Georgia, serif", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
                {result.full_resume_content?.name || "Your Name"}
              </div>
              <div style={{ fontSize: 14, color: "#555", marginBottom: 6 }}>
                {result.full_resume_content?.title || result.role_title}
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {result.full_resume_content?.contact}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", borderBottom: "1px solid #e0e0e0", paddingBottom: 4, marginBottom: 12 }}>
                Professional Summary
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "#333", marginBottom: 20 }}>
                {result.full_resume_content?.summary || result.optimized_summary}
              </p>
            </div>

            {result.full_resume_content?.experience?.map((exp, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                {i === 0 && (
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", borderBottom: "1px solid #e0e0e0", paddingBottom: 4, marginBottom: 12 }}>
                    Professional Experience
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{exp.title}</div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>{exp.company} | {exp.period}</div>
                {exp.bullets?.map((b, j) => (
                  <div key={j} style={{ paddingLeft: 16, position: "relative", fontSize: 13, lineHeight: 1.65, color: "#333", marginBottom: 5 }}>
                    <span style={{ position: "absolute", left: 4, color: "#888" }}>•</span>
                    {b}
                  </div>
                ))}
              </div>
            ))}

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", borderBottom: "1px solid #e0e0e0", paddingBottom: 4, marginBottom: 12 }}>
                Core Competencies
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(result.full_resume_content?.skills || result.optimized_skills)?.map((s) => (
                  <span key={s} style={{ fontSize: 11, padding: "3px 10px", background: "#f5f5f5", borderRadius: 4, color: "#444" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20, fontSize: 11, color: "#888", textAlign: "center", borderTop: "1px solid #e0e0e0", paddingTop: 16 }}>
              ✦ Original design, fonts, colors & layout preserved in your downloaded file ✦
            </div>
          </div>
        </div>
      )}

      {activeTab === "changes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(result.changes_summary || []).map((change, i) => {
            const typeColors: Record<string, { bg: string; border: string; text: string; label: string }> = {
              modified: { bg: "#fffbf0", border: "#f6d860", text: "#744210", label: "Modified" },
              added: { bg: "#f0fff4", border: "#9ae6b4", text: "#276749", label: "Added" },
              enhanced: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af", label: "Enhanced" },
              removed: { bg: "#fff5f5", border: "#feb2b2", text: "#c53030", label: "Removed" },
            };
            const style = typeColors[change.type] || typeColors.modified;

            return (
              <div
                key={i}
                style={{
                  background: style.bg,
                  border: `1px solid ${style.border}`,
                  borderLeft: `4px solid ${style.border}`,
                  borderRadius: 10,
                  padding: "16px 20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span
                    style={{
                      padding: "2px 10px",
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      background: style.border,
                      color: style.text,
                    }}
                  >
                    {style.label}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#2d3748" }}>
                    {change.section}
                  </span>
                </div>
                {change.original && (
                  <div style={{ marginBottom: 8 }}>
                    <p style={{ fontSize: 11, color: "#718096", marginBottom: 4, fontWeight: 600 }}>BEFORE:</p>
                    <p style={{ fontSize: 13, color: "#718096", lineHeight: 1.6, fontStyle: "italic" }}>{change.original}</p>
                  </div>
                )}
                <div>
                  <p style={{ fontSize: 11, color: "#276749", marginBottom: 4, fontWeight: 600 }}>AFTER:</p>
                  <p style={{ fontSize: 13, color: "#2d3748", lineHeight: 1.6 }}>{change.optimized}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .score-grid { grid-template-columns: 1fr 1fr !important; }
          .result-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
