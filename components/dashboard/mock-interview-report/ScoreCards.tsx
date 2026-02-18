"use client";

const StrengthsSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#A2CE3A"/>
  </svg>
);

const AreasToImproveSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F27E14" strokeWidth="2"/>
    <path d="M12 8V12M12 16H12.01" stroke="#F27E14" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export function ScoreCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Overall Score */}
      <div className="bg-[#0547112E] border border-[#0F4F3A] rounded-[20px] p-6">
        <p className="text-white/60 font-mona-sans text-sm mb-1">Overall Score</p>
        <p className="text-white font-mona-sans font-bold text-5xl">78</p>
      </div>

      {/* Hire Likelihood */}
      <div className="bg-[#0547112E] border border-[#0F4F3A] rounded-[20px] p-6">
        <p className="text-white/60 font-mona-sans text-sm mb-1">Hire Likelihood</p>
        <p className="text-white font-mona-sans font-bold text-2xl">Moderate</p>
        <p className="text-white/40 font-mona-sans text-xs mt-1">Strong foundation with room for improvement</p>
      </div>

      {/* Key Insights */}
      <div className="bg-[#0547112E] border border-[#0F4F3A] rounded-[20px] p-6">
        <p className="text-white/60 font-mona-sans text-sm mb-3">Key Insights</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <StrengthsSVG />
            <span className="text-[#A2CE3A] font-mona-sans text-sm font-medium">Strengths</span>
          </div>
          <p className="text-white/50 font-mona-sans text-xs pl-6">Good technical knowledge, confident delivery</p>
          <div className="flex items-center gap-2 mt-2">
            <AreasToImproveSVG />
            <span className="text-[#F27E14] font-mona-sans text-sm font-medium">Areas to improve</span>
          </div>
          <p className="text-white/50 font-mona-sans text-xs pl-6">Communication clarity, structured answers</p>
        </div>
      </div>
    </div>
  );
}
