import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeForge AI — ATS-Optimized Resumes in Seconds",
  description: "Upload your resume, paste a job description, and get a perfectly tailored, ATS-optimized resume that preserves your original design — in under 30 seconds.",
  keywords: "resume optimizer, ATS resume, AI resume builder, job application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
        {/* Google AdSense: replace XXXXXXXX with your publisher ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
