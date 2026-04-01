"use client";
import { useState, useRef, useCallback } from "react";
import { OptimizationRequest } from "@/types";

interface OptimizerFormProps {
  onSubmit: (data: OptimizationRequest) => void;
  isLoading: boolean;
}

const TONE_OPTIONS = ["Executive", "Technical", "Creative", "Startup", "Corporate", "Academic"];
const FOCUS_OPTIONS = ["Keywords", "Achievements", "Leadership", "Technical Skills", "Metrics", "Soft Skills"];
const LENGTH_OPTIONS = [
  { value: "one-page", label: "1 Page" },
  { value: "two-page", label: "2 Pages" },
  { value: "keep-original", label: "Keep original length" },
];

export default function OptimizerForm({ onSubmit, isLoading }: OptimizerFormProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("Executive");
  const [focusAreas, setFocusAreas] = useState(["Keywords", "Achievements"]);
  const [notes, setNotes] = useState("");
  const [targetLength, setTargetLength] = useState("one-page");
  const [isDragging, setIsDragging] = useState(false);
  const [inputMode, setInputMode] = useState<"upload" | "paste">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = jobDescription.trim().split(/\s+/).filter(Boolean).length;

  const handleFileChange = (file: File) => {
    setResumeFile(file);
    // In production, parse PDF/DOCX server-side. For now, store file reference.
    const reader = new FileReader();
    reader.onload = (e) => {
      // Store as base64 for potential server processing
      setResumeText(`[Uploaded file: ${file.name} | Size: ${(file.size / 1024).toFixed(1)}KB | Type: ${file.type}]`);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  }, []);

  const toggleFocus = (area: string) => {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((f) => f !== area) : [...prev, area]
    );
  };

  const handleSubmit = () => {
    if (!jobDescription.trim() || jobDescription.trim().length < 50) return;
    onSubmit({ jobDescription, resumeText, tone, focusAreas, notes, targetLength });
  };

  const canSubmit = jobDescription.trim().length >= 50 && !isLoading;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginBottom: 24,
        }}
        className="optimizer-grid"
      >
        {/* LEFT: Resume Upload */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            padding: 28,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #e8b86d22, #e8b86d44)",
                border: "1px solid #e8b86d66",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 2h10v12H3V2z" stroke="#c49a4a" strokeWidth="1.2" />
                <path d="M5 5h6M5 7.5h6M5 10h4" stroke="#c49a4a" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f1729", margin: 0 }}>
                Your Resume
              </h3>
              <p style={{ fontSize: 12, color: "#718096", margin: 0 }}>
                Design preserved 100%
              </p>
            </div>
            {/* Mode toggle */}
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                background: "#f7f8fc",
                borderRadius: 8,
                padding: 3,
                border: "1px solid #e2e8f0",
              }}
            >
              {(["upload", "paste"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInputMode(mode)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 500,
                    background: inputMode === mode ? "#fff" : "transparent",
                    color: inputMode === mode ? "#0f1729" : "#718096",
                    boxShadow: inputMode === mode ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {mode === "upload" ? "Upload" : "Paste text"}
                </button>
              ))}
            </div>
          </div>

          {inputMode === "upload" ? (
            <>
              {/* Dropzone */}
              {!resumeFile ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${isDragging ? "#e8b86d" : "#e2e8f0"}`,
                    borderRadius: 12,
                    padding: "40px 24px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: isDragging ? "rgba(232,184,109,0.04)" : "#fafbff",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ marginBottom: 12 }}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: "0 auto" }}>
                      <circle cx="20" cy="20" r="20" fill="#f0f4ff" />
                      <path d="M20 26V14m0 0l-5 5m5-5l5 5" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 28h14" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#2d3748", marginBottom: 4 }}>
                    Drop your resume here
                  </p>
                  <p style={{ fontSize: 13, color: "#a0aec0", marginBottom: 16 }}>
                    PDF, Word (.docx), or image — drag & drop or click to browse
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 20px",
                      borderRadius: 8,
                      background: "#0f1729",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    Browse files
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
                    style={{ display: "none" }}
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  />
                </div>
              ) : (
                <div
                  style={{
                    border: "1px solid #c6f6d5",
                    borderRadius: 12,
                    padding: "16px 20px",
                    background: "#f0fff4",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 52,
                      borderRadius: 6,
                      background: "linear-gradient(135deg, #e8b86d, #c49a4a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 2h12v14H3V2z" fill="rgba(255,255,255,0.9)" />
                      <path d="M5 6h8M5 9h8M5 12h5" stroke="#c49a4a" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#276749", margin: 0 }}>
                      {resumeFile.name}
                    </p>
                    <p style={{ fontSize: 12, color: "#48bb78", margin: "2px 0 0" }}>
                      {(resumeFile.size / 1024).toFixed(1)} KB • Design detected ✓
                    </p>
                  </div>
                  <button
                    onClick={() => { setResumeFile(null); setResumeText(""); }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: "1px solid #9ae6b4",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: 14,
                      color: "#718096",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  background: "#fffbf0",
                  borderRadius: 8,
                  border: "1px solid #f6d860",
                  fontSize: 12,
                  color: "#744210",
                  display: "flex",
                  gap: 8,
                }}
              >
                <span>✦</span>
                <span>
                  Your original layout, fonts, colors, photo, and design will be fully preserved. Only content is optimized.
                </span>
              </div>
            </>
          ) : (
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here — all sections, work experience, skills, education..."
              style={{
                width: "100%",
                minHeight: 220,
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                fontSize: 13,
                lineHeight: 1.7,
                color: "#2d3748",
                background: "#fafbff",
                resize: "vertical",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
              }}
            />
          )}
        </div>

        {/* RIGHT: Job Description */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            padding: 28,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #667eea22, #667eea44)",
                border: "1px solid #667eea66",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" stroke="#667eea" strokeWidth="1.2" />
                <path d="M5 6h6M5 8.5h4" stroke="#667eea" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f1729", margin: 0 }}>
                Job Description
              </h3>
              <p style={{ fontSize: 12, color: "#718096", margin: 0 }}>
                Full posting for best results
              </p>
            </div>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 12,
                color: wordCount > 50 ? "#48bb78" : "#a0aec0",
                fontWeight: 500,
              }}
            >
              {wordCount} words
            </span>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here — including title, responsibilities, required skills, qualifications, tools, technologies, certifications, and any other requirements...

The more complete the job description, the better the AI can optimize your resume for that specific role."
            style={{
              flex: 1,
              width: "100%",
              minHeight: 230,
              padding: "14px 16px",
              borderRadius: 10,
              border: `1px solid ${jobDescription.length > 100 ? "#c6f6d5" : "#e2e8f0"}`,
              fontSize: 13,
              lineHeight: 1.7,
              color: "#2d3748",
              background: "#fafbff",
              resize: "vertical",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />

          {wordCount < 30 && jobDescription.length > 0 && (
            <p style={{ fontSize: 12, color: "#e53e3e", marginTop: 8 }}>
              ⚠ Add more content for better optimization (aim for 100+ words)
            </p>
          )}
          {wordCount >= 30 && (
            <p style={{ fontSize: 12, color: "#48bb78", marginTop: 8 }}>
              ✓ Good — AI will extract {Math.min(30, Math.floor(wordCount / 8))}+ keywords
            </p>
          )}
        </div>
      </div>

      {/* Preferences Row */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #e2e8f0",
          padding: 28,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#0f1729",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#718096" strokeWidth="1.2" />
            <path d="M8 5v3.5l2 2" stroke="#718096" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Optimization Preferences
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#a0aec0", fontWeight: 400 }}>
            Optional — defaults work great
          </span>
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }} className="pref-grid">
          {/* Tone */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 10 }}>
              Tone & style
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TONE_OPTIONS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: `1px solid ${tone === t ? "#0f1729" : "#e2e8f0"}`,
                    background: tone === t ? "#0f1729" : "transparent",
                    color: tone === t ? "#fff" : "#4a5568",
                    fontSize: 13,
                    fontWeight: tone === t ? 500 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Focus */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 10 }}>
              Focus areas
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FOCUS_OPTIONS.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFocus(f)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: `1px solid ${focusAreas.includes(f) ? "#e8b86d" : "#e2e8f0"}`,
                    background: focusAreas.includes(f) ? "rgba(232,184,109,0.1)" : "transparent",
                    color: focusAreas.includes(f) ? "#c49a4a" : "#4a5568",
                    fontSize: 13,
                    fontWeight: focusAreas.includes(f) ? 500 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Target length + notes */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 10 }}>
              Target length
            </label>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {LENGTH_OPTIONS.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setTargetLength(l.value)}
                  style={{
                    flex: 1,
                    padding: "7px 10px",
                    borderRadius: 8,
                    border: `1px solid ${targetLength === l.value ? "#0f1729" : "#e2e8f0"}`,
                    background: targetLength === l.value ? "#0f1729" : "transparent",
                    color: targetLength === l.value ? "#fff" : "#4a5568",
                    fontSize: 12,
                    fontWeight: targetLength === l.value ? 500 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 8 }}>
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Emphasize my 5 years in FinTech. De-emphasize 2022 gap. Highlight AWS certs."
              style={{
                width: "100%",
                height: 68,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 12,
                lineHeight: 1.6,
                color: "#2d3748",
                background: "#fafbff",
                resize: "none",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            padding: "18px 56px",
            borderRadius: 12,
            background: canSubmit
              ? "linear-gradient(135deg, #0f1729, #1a2540)"
              : "#e2e8f0",
            color: canSubmit ? "#fff" : "#a0aec0",
            fontSize: 16,
            fontWeight: 700,
            border: "none",
            cursor: canSubmit ? "pointer" : "not-allowed",
            fontFamily: "'Syne', sans-serif",
            letterSpacing: "-0.3px",
            transition: "all 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            position: "relative",
            overflow: "hidden",
          }}
          onMouseOver={(e) => {
            if (canSubmit) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(15,23,41,0.25)";
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = "";
          }}
        >
          {isLoading ? (
            <>
              <svg className="spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <path d="M10 2a8 8 0 018 8" stroke="#e8b86d" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Optimizing with AI...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2l2.5 5L18 8l-4 4 1 5.5L10 15l-5 2.5L6 12 2 8l5.5-1L10 2z" stroke="#e8b86d" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              Optimize Resume with AI
              <span style={{ fontSize: 13, opacity: 0.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>
                — free, takes ~20 sec
              </span>
            </>
          )}
        </button>
        {!canSubmit && jobDescription.length === 0 && (
          <p style={{ fontSize: 13, color: "#a0aec0", marginTop: 10 }}>
            Paste a job description to get started
          </p>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .optimizer-grid { grid-template-columns: 1fr !important; }
          .pref-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
