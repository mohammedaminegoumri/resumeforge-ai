import Anthropic from "@anthropic-ai/sdk";
import { OptimizationRequest, OptimizationResult } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function optimizeResume(
  request: OptimizationRequest
): Promise<OptimizationResult> {
  const { jobDescription, resumeText, tone, focusAreas, notes, targetLength } = request;

  const systemPrompt = `You are the world's leading expert in resume optimization, ATS systems, and technical recruiting for 2025-2026. You have deep expertise in:
- Modern ATS systems (Workday, Greenhouse, Lever, iCIMS, Taleo, SmartRecruiters)
- Semantic keyword matching and NLP used by modern ATS
- Industry-specific terminology and required credentials
- Achievement-oriented resume writing with quantified impact
- Executive, technical, and creative resume styles

Your task: Analyze the job description deeply, then rewrite the resume content to maximize ATS ranking and recruiter impact, while preserving the user's authentic experience.

CRITICAL RULES:
1. Only infer/enhance what's already in the resume — never fabricate experience or credentials
2. Quantify achievements where possible using realistic metrics
3. Use strong action verbs at the start of every bullet
4. Mirror exact terminology from the job description
5. Optimize for both ATS parsing AND human readability
6. Maintain professional authenticity — no over-inflation

Respond ONLY with valid JSON, no markdown fences, no preamble.`;

  const userPrompt = `OPTIMIZATION REQUEST:

=== JOB DESCRIPTION ===
${jobDescription}

=== CANDIDATE'S CURRENT RESUME ===
${resumeText || "[Resume uploaded as file — extract and optimize based on the content structure. Create example content that would be realistic for this role.]"}

=== PREFERENCES ===
- Tone: ${tone}
- Focus areas: ${focusAreas.join(", ")}
- Target length: ${targetLength}
- Additional notes: ${notes || "None"}

=== REQUIRED OUTPUT (JSON) ===
Return this exact JSON structure:
{
  "ats_score": <number 60-98, based on keyword match after optimization>,
  "job_match_percentage": <number 65-96>,
  "role_title": "<exact job title from description>",
  "company_type": "<startup|scaleup|enterprise|agency|nonprofit>",
  "industry": "<e.g. FinTech, HealthTech, SaaS, E-commerce>",
  "keywords_matched": ["<8-12 keywords already strong in resume>"],
  "keywords_added": ["<8-12 keywords strategically added from JD>"],
  "keywords_missing": ["<3-5 keywords hard to add without fabricating>"],
  "optimized_summary": "<2-3 sentences, role-specific, keyword-rich, achievement-focused>",
  "optimized_experience": [
    {
      "title": "<job title>",
      "company": "<company name>",
      "period": "<date range>",
      "bullets": [
        "<Strong action verb + achievement + quantified impact + relevant to JD>",
        "<Strong action verb + achievement + quantified impact + relevant to JD>",
        "<Strong action verb + achievement + quantified impact + relevant to JD>",
        "<Strong action verb + achievement + quantified impact + relevant to JD>"
      ]
    }
  ],
  "optimized_skills": ["<20-25 skills prioritized by JD relevance>"],
  "optimized_education": "<Degree, Institution, Year — add relevant coursework if applicable>",
  "key_achievements": [
    "<Top achievement 1 with metrics>",
    "<Top achievement 2 with metrics>",
    "<Top achievement 3 with metrics>"
  ],
  "action_verbs_added": ["<8 powerful action verbs used>"],
  "certifications_recommended": ["<2-3 certs that would strengthen this application>"],
  "changes_summary": [
    {"type": "modified", "section": "Professional Summary", "original": "<brief original>", "optimized": "<brief new>"},
    {"type": "enhanced", "section": "Experience Bullets", "original": "<example original bullet>", "optimized": "<example optimized bullet>"},
    {"type": "added", "section": "Skills", "original": "", "optimized": "<skills added from JD>"},
    {"type": "modified", "section": "Achievement Quantification", "original": "<vague original>", "optimized": "<quantified version>"}
  ],
  "full_resume_content": {
    "name": "<Candidate Name>",
    "title": "<Target Role Title>",
    "contact": "<email | phone | LinkedIn | location>",
    "summary": "<Full optimized professional summary>",
    "experience": [<same as optimized_experience array>],
    "skills": [<same as optimized_skills>],
    "education": "<Full education section>",
    "certifications": ["<current and recommended certs>"],
    "additional": "<Languages, publications, volunteer work if relevant>"
  }
}`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  // Clean and parse JSON
  const cleanJson = responseText
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  try {
    const result = JSON.parse(cleanJson) as OptimizationResult;
    return result;
  } catch (e) {
    // Fallback: extract JSON from response
    const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as OptimizationResult;
    }
    throw new Error("Failed to parse AI response as JSON");
  }
}
