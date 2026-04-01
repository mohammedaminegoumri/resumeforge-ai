export interface OptimizationResult {
  ats_score: number;
  job_match_percentage: number;
  keywords_matched: string[];
  keywords_added: string[];
  keywords_missing: string[];
  role_title: string;
  company_type: string;
  industry: string;
  optimized_summary: string;
  optimized_experience: ExperienceItem[];
  optimized_skills: string[];
  optimized_education: string;
  key_achievements: string[];
  changes_summary: ChangeItem[];
  action_verbs_added: string[];
  certifications_recommended: string[];
  full_resume_content: FullResumeContent;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ChangeItem {
  type: "added" | "modified" | "removed" | "enhanced";
  section: string;
  original?: string;
  optimized: string;
}

export interface FullResumeContent {
  name: string;
  title: string;
  contact: string;
  summary: string;
  experience: ExperienceItem[];
  skills: string[];
  education: string;
  certifications: string[];
  additional: string;
}

export interface OptimizationRequest {
  jobDescription: string;
  resumeText: string;
  tone: string;
  focusAreas: string[];
  notes: string;
  targetLength: string;
}

export type AppStep = "upload" | "analyze" | "processing" | "results";
