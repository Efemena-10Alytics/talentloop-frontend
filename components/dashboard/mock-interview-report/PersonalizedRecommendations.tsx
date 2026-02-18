"use client";

const CheckSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface RecommendationCardProps {
  title: string;
  description: string;
}

function RecommendationCard({ title, description }: RecommendationCardProps) {
  return (
    <div className="bg-[#FFFFFF0A] backdrop-blur-sm border border-white/10 rounded-[16px] p-5 flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">
        <CheckSVG />
      </div>
      <div>
        <h3 className="text-white font-mona-sans font-bold text-sm mb-1">{title}</h3>
        <p className="text-white/50 font-mona-sans text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

const recommendations: RecommendationCardProps[] = [
  {
    title: "Practice behavioral structure",
    description: "Focus on using the STAR method consistently in your answers.",
  },
  {
    title: "Improve technical depth",
    description: "Review more system design questions and technical deep-dives.",
  },
  {
    title: "Slow speaking pace",
    description: "Take pauses between thoughts to improve clarity and confidence.",
  },
  {
    title: "Highlight achievements",
    description: "Quantify your impact with specific metrics and examples.",
  },
];

export function PersonalizedRecommendations() {
  return (
    <div>
      <h2 className="text-white font-mona-sans font-bold text-xl mb-6">Personalized Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, i) => (
          <RecommendationCard key={i} {...rec} />
        ))}
      </div>
    </div>
  );
}
