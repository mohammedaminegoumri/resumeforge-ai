"use client";
import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OptimizerForm from "@/components/OptimizerForm";
import ProcessingView from "@/components/ProcessingView";
import ResultsView from "@/components/ResultsView";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import { OptimizationRequest, OptimizationResult } from "@/types";

type AppState = "landing" | "form" | "processing" | "results";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const optimizerRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setAppState("form");
    setTimeout(() => {
      optimizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSubmit = async (data: OptimizationRequest) => {
    setIsLoading(true);
    setError(null);
    setAppState("processing");
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Optimization failed. Please try again.");
      }

      setResult(json.data);
      setAppState("results");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
      setAppState("form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setAppState("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero — always shown on landing, hidden when in form/results */}
        {appState === "landing" && (
          <Hero onStart={handleStart} />
        )}

        {/* Features — shown on landing */}
        {appState === "landing" && (
          <>
            {/* Ad placement: leaderboard banner above optimizer */}
            <div style={{ background: "#fff", padding: "24px", textAlign: "center", borderBottom: "1px solid #e2e8f0" }}>
              {/* Google AdSense leaderboard (728x90) — uncomment after approval */}
              {/* <ins className="adsbygoogle" style={{display:"block"}} data-ad-client="ca-pub-XXXXX" data-ad-slot="XXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins> */}
              <div style={{ height: 90, maxWidth: 728, margin: "0 auto", background: "#f7f8fc", border: "1px dashed #e2e8f0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#a0aec0" }}>
                Advertisement (728×90) — Add your Google AdSense code here
              </div>
            </div>
          </>
        )}

        {/* Optimizer Section */}
        <div
          id="optimizer"
          ref={optimizerRef}
          style={{
            padding: appState === "landing" ? "80px 0 60px" : "48px 0 60px",
            background: appState === "landing" ? "#fff" : "var(--cream)",
          }}
        >
          {appState === "landing" && (
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2
                className="font-display"
                style={{ fontSize: 36, fontWeight: 800, color: "#0f1729", letterSpacing: "-0.5px", marginBottom: 12 }}
              >
                Start optimizing your resume
              </h2>
              <p style={{ fontSize: 16, color: "#718096" }}>
                Free, instant, and no account required
              </p>
            </div>
          )}

          {(appState === "landing" || appState === "form") && (
            <>
              {error && (
                <div
                  style={{
                    maxWidth: 700,
                    margin: "0 auto 24px",
                    padding: "14px 20px",
                    background: "#fff5f5",
                    border: "1px solid #fed7d7",
                    borderRadius: 10,
                    color: "#c53030",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span>⚠</span> {error}
                </div>
              )}
              <OptimizerForm onSubmit={handleSubmit} isLoading={isLoading} />
            </>
          )}

          {appState === "processing" && <ProcessingView />}
          {appState === "results" && result && (
            <>
              {/* Ad above results */}
              <div style={{ maxWidth: 1100, margin: "0 auto 24px", padding: "0 24px" }}>
                {/* <ins className="adsbygoogle" ... ></ins> */}
                <div style={{ height: 90, background: "#f7f8fc", border: "1px dashed #e2e8f0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#a0aec0" }}>
                  Advertisement — AdSense goes here
                </div>
              </div>
              <ResultsView result={result} onReset={handleReset} />
            </>
          )}
        </div>

        {/* Features only on landing */}
        {appState === "landing" && <FeaturesSection />}

        {/* Ad in sidebar/below content on results */}
        {appState === "results" && (
          <div style={{ padding: "0 24px 40px", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ height: 280, background: "#f7f8fc", border: "1px dashed #e2e8f0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#a0aec0" }}>
              Advertisement (300×250 or 336×280) — Add your Google AdSense code here
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
