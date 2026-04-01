import { NextRequest, NextResponse } from "next/server";
import { optimizeResume } from "@/lib/optimizer";
import { OptimizationRequest } from "@/types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobDescription, resumeText, tone, focusAreas, notes, targetLength } =
      body as OptimizationRequest;

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        { error: "Please provide a complete job description (minimum 50 characters)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const result = await optimizeResume({
      jobDescription,
      resumeText: resumeText || "",
      tone: tone || "Professional",
      focusAreas: focusAreas || ["Keywords", "Achievements"],
      notes: notes || "",
      targetLength: targetLength || "one-page",
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    console.error("Optimization error:", error);
    const message = error instanceof Error ? error.message : "Optimization failed";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
