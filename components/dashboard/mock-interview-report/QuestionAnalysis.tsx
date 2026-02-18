"use client";

interface QuestionCardProps {
  questionNumber: number;
  badge: string;
  badgeColor: "green" | "orange";
  question: string;
  answer: string;
  enhancedAnswer: string;
  missedKeywords: string[];
  improvementTips: string[];
}

function QuestionCard({
  questionNumber,
  badge,
  badgeColor,
  question,
  answer,
  enhancedAnswer,
  missedKeywords,
  improvementTips,
}: QuestionCardProps) {
  const badgeStyles =
    badgeColor === "green"
      ? "bg-[#A2CE3A]/15 text-[#A2CE3A]"
      : "bg-[#F27E1426] text-[#F27E14]";

  return (
    <div className="bg-[#FFFFFF0A] backdrop-blur-sm border border-white/10 rounded-[20px] p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-white/50 font-mona-sans text-sm">Question {questionNumber}</span>
        <span className={`px-3 py-0.5 rounded-full text-xs font-mona-sans font-medium ${badgeStyles}`}>
          {badge}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-white font-mona-sans font-bold text-lg mb-4">{question}</h3>

      {/* Your Answer */}
      <div className="mb-5">
        <p className="text-white/50 font-mona-sans text-sm mb-2">Your Answer</p>
        <div className="bg-[#2B2D30] rounded-[12px] p-4">
          <p className="text-white/70 font-mona-sans text-sm leading-relaxed">{answer}</p>
        </div>
      </div>

      {/* Enhanced Answer Example */}
      <div className="mb-5">
        <p className="text-white/50 font-mona-sans text-sm mb-2">Enhanced Answer Example</p>
        <div className="bg-[#2B2D30] rounded-[12px] p-4">
          <p className="text-white/70 font-mona-sans text-sm leading-relaxed">{enhancedAnswer}</p>
        </div>
      </div>

      {/* Missed Keywords */}
      <div className="mb-5">
        <p className="text-white/50 font-mona-sans text-sm mb-2">Missed Keywords</p>
        <div className="flex flex-wrap gap-2">
          {missedKeywords.map((keyword, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-[#F27E1426] text-[#F27E14] text-xs font-mona-sans font-medium"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Improvement Tips */}
      <div>
        <p className="text-white/50 font-mona-sans text-sm mb-2">Improvement Tips</p>
        <div className="space-y-2">
          {improvementTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#A2CE3A] flex-shrink-0" />
              <p className="text-white/70 font-mona-sans text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mockQuestions: QuestionCardProps[] = [
  {
    questionNumber: 1,
    badge: "Good Answer",
    badgeColor: "green",
    question: "Tell me about yourself",
    answer:
      "I'm currently a Frontend Engineer with 6 years of experience...",
    enhancedAnswer:
      "I'm currently a Senior Frontend Engineer specializing in React and TypeScript with 6 years building scalable web applications. In my current role at TechCo, I led the redesign of our dashboard that increased user engagement by 47%. Previously, I worked at StartUp Co where I built their mobile-first web platform from scratch. I'm particularly drawn to the role because of you, I focus on accessibility and performance, which aligns with my passion for creating inclusive, fast web experiences.",
    missedKeywords: ["Scalable", "Performance", "Accessibility"],
    improvementTips: [
      "Include more quantifiable achievements",
      "Connect past experience to the role you're applying for",
      "Keep it under 90 seconds",
    ],
  },
  {
    questionNumber: 2,
    badge: "Needs Work",
    badgeColor: "orange",
    question: "Tell me about yourself",
    answer:
      "I'm currently a Frontend Engineer with 6 years of experience...",
    enhancedAnswer:
      "I'm currently a Senior Frontend Engineer specializing in React and TypeScript with 6 years building scalable web applications. In my current role at TechCo, I led the redesign of our dashboard that increased user engagement by 47%. Previously, I worked at StartUp Co where I built their mobile-first web platform from scratch. I'm particularly drawn to the role because of you, I focus on accessibility and performance, which aligns with my passion for creating inclusive, fast web experiences.",
    missedKeywords: ["Scalable", "Performance", "Accessibility"],
    improvementTips: [
      "Include more quantifiable achievements",
      "Connect past experience to the role you're applying for",
      "Keep it under 90 seconds",
    ],
  },
  {
    questionNumber: 3,
    badge: "Needs Improvement",
    badgeColor: "orange",
    question: "Tell me about yourself",
    answer:
      "I'm currently a Frontend Engineer with 6 years of experience...",
    enhancedAnswer:
      "I'm currently a Senior Frontend Engineer specializing in React and TypeScript with 6 years building scalable web applications. In my current role at TechCo, I led the redesign of our dashboard that increased user engagement by 47%. Previously, I worked at StartUp Co where I built their mobile-first web platform from scratch. I'm particularly drawn to the role because of you, I focus on accessibility and performance, which aligns with my passion for creating inclusive, fast web experiences.",
    missedKeywords: ["Quantifiable results", "STAR method"],
    improvementTips: [
      "Include more quantifiable achievements",
      "Connect past experience to the role you're applying for",
      "Keep it under 90 seconds",
    ],
  },
];

export function QuestionAnalysis() {
  return (
    <div>
      <h2 className="text-white font-mona-sans font-bold text-xl mb-6">
        Question - by - Question Analysis
      </h2>
      <div className="space-y-6">
        {mockQuestions.map((q, i) => (
          <QuestionCard key={i} {...q} />
        ))}
      </div>
    </div>
  );
}
