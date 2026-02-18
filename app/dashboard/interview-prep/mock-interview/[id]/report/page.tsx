"use client";

import { useRouter } from "next/navigation";
import { ScoreCards } from "@/components/dashboard/mock-interview-report/ScoreCards";
import { ConfidenceChart } from "@/components/dashboard/mock-interview-report/ConfidenceChart";
import { QuestionAnalysis } from "@/components/dashboard/mock-interview-report/QuestionAnalysis";
import { SkillGapAnalysis } from "@/components/dashboard/mock-interview-report/SkillGapAnalysis";
import { PersonalizedRecommendations } from "@/components/dashboard/mock-interview-report/PersonalizedRecommendations";
import { ReportActions } from "@/components/dashboard/mock-interview-report/ReportActions";

const DownloadSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BackArrowSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function MockInterviewReportPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/interview-prep")}
          className="flex items-center gap-2 text-white/70 font-mona-sans text-sm cursor-pointer hover:text-white transition-colors"
        >
          <BackArrowSVG />
          Back to Interview Prep
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#FFFFFF0A] border border-white/10 text-white font-mona-sans font-semibold text-sm cursor-pointer hover:bg-white/10 transition-colors">
          <DownloadSVG />
          Download
        </button>
      </div>

      {/* Score Cards */}
      <ScoreCards />

      {/* Confidence Over Time */}
      <ConfidenceChart />

      {/* Question-by-Question Analysis */}
      <QuestionAnalysis />

      {/* Skill Gap Analysis */}
      <SkillGapAnalysis />

      {/* Personalized Recommendations */}
      <PersonalizedRecommendations />

      {/* Bottom Actions */}
      <ReportActions />
    </div>
  );
}
