"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ─── Fake Assessment Data ─── */

interface Question {
  id: number;
  category: string;
  questionNumber: number;
  totalInCategory: number;
  type: "objective" | "text";
  question: string;
  image?: string;
  options?: { label: string; text: string }[];
}

const ASSESSMENT_DATA: Question[] = [
  {
    id: 1,
    category: "Technical",
    questionNumber: 1,
    totalInCategory: 5,
    type: "objective",
    question: "Which data structure uses LIFO (Last In, First Out)?",
    options: [
      { label: "A", text: "Queue" },
      { label: "B", text: "Array" },
      { label: "C", text: "Stack" },
      { label: "D", text: "Linked List" },
    ],
  },
  {
    id: 2,
    category: "Technical",
    questionNumber: 2,
    totalInCategory: 5,
    type: "text",
    question: "How would you approach testing for vulnerabilities in a company's web application, focusing on OWASP Top 10 vulnerabilities?",
  },
  {
    id: 3,
    category: "Technical",
    questionNumber: 3,
    totalInCategory: 5,
    type: "objective",
    question: "What is the time complexity of binary search?",
    options: [
      { label: "A", text: "O(n)" },
      { label: "B", text: "O(log n)" },
      { label: "C", text: "O(n²)" },
      { label: "D", text: "O(1)" },
    ],
  },
  {
    id: 4,
    category: "Technical",
    questionNumber: 4,
    totalInCategory: 5,
    type: "objective",
    question: "Which data structure uses LIFO (Last In, First Out)?",
    image: "/forecast_vs_actual_sales 1.png",
    options: [
      { label: "A", text: "Queue" },
      { label: "B", text: "Linked List" },
      { label: "C", text: "Stack" },
      { label: "D", text: "Array" },
    ],
  },
  {
    id: 5,
    category: "Technical",
    questionNumber: 5,
    totalInCategory: 5,
    type: "text",
    question: "Explain the concept of RESTful APIs and how they differ from GraphQL.",
    image: "/forecast_vs_actual_sales.png",
  },
  {
    id: 6,
    category: "Behavioral",
    questionNumber: 1,
    totalInCategory: 5,
    type: "text",
    question: "Describe a time when you had to work with a difficult team member. How did you handle the situation?",
  },
  {
    id: 7,
    category: "Behavioral",
    questionNumber: 2,
    totalInCategory: 5,
    type: "objective",
    question: "What is your preferred approach to handling tight deadlines?",
    options: [
      { label: "A", text: "Prioritize tasks and focus on high-impact items" },
      { label: "B", text: "Work overtime to complete everything" },
      { label: "C", text: "Delegate tasks to team members" },
      { label: "D", text: "Request deadline extension" },
    ],
  },
  {
    id: 8,
    category: "Behavioral",
    questionNumber: 3,
    totalInCategory: 5,
    type: "text",
    question: "Tell us about a project where you demonstrated leadership skills.",
  },
  {
    id: 9,
    category: "Behavioral",
    questionNumber: 4,
    totalInCategory: 5,
    type: "objective",
    question: "How do you handle constructive criticism?",
    options: [
      { label: "A", text: "Take it personally and feel discouraged" },
      { label: "B", text: "Listen carefully and use it to improve" },
      { label: "C", text: "Ignore it and continue as before" },
      { label: "D", text: "Defend my position immediately" },
    ],
  },
  {
    id: 10,
    category: "Behavioral",
    questionNumber: 5,
    totalInCategory: 5,
    type: "text",
    question: "What motivates you to perform at your best in a professional setting?",
  },
  {
    id: 11,
    category: "Technical",
    questionNumber: 6,
    totalInCategory: 5,
    type: "text",
    question: "What is the difference between a monolithic architecture and a microservices architecture?",
    image: "/forecast_vs_actual_sales.png",
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = ASSESSMENT_DATA[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === ASSESSMENT_DATA.length - 1;
  const progress = ((currentQuestionIndex + 1) / ASSESSMENT_DATA.length) * 100;

  const handleStartAssessment = () => {
    setStarted(true);
  };

  const handleSelectOption = (optionText: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionText });
  };

  const handleTextAnswer = (text: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: text });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    const answeredCount = Object.keys(answers).length;
    return Math.round((answeredCount / ASSESSMENT_DATA.length) * 100);
  };

  const score = calculateScore();

  return (
    <div className="min-h-screen bg-[#0B0D0F] relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/img2.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* Logo */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-10 z-10">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="TalentLoop logo"
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-[1] min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-[800px]">
          {/* Start Screen */}
          {!started && !showResults && (
            <div className="text-center">
              <h1 className="text-white text-4xl lg:text-5xl font-mona-sans font-bold mb-4">
                Interview Assessment
              </h1>
              <p className="text-white/70 font-mona-sans text-base lg:text-lg mb-8">
                {ASSESSMENT_DATA.length} questions across 2 categories. Score 70% or higher to pass.
              </p>
              <button
                onClick={handleStartAssessment}
                className="px-8 py-3.5 bg-[#A2CE3A] text-[#054711] font-mona-sans font-semibold text-base rounded-[10px] hover:opacity-90 transition-opacity"
              >
                Start Assessment
              </button>
            </div>
          )}

          {/* Question Screen */}
          {started && !showResults && (
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A2CE3A] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question Header */}
              <div className="mb-6">
                <p className="text-white/60 font-mona-sans text-sm mb-2">
                  {currentQuestion.category} — Question {currentQuestion.questionNumber} of {currentQuestion.totalInCategory}
                </p>
                <h2 className="text-white text-2xl lg:text-3xl font-mona-sans font-bold">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Objective Question Options */}
              {currentQuestion.type === "objective" && currentQuestion.options && (
                <div className={`mb-8 ${currentQuestion.image ? "flex gap-6" : ""}`}>
                  {/* Options */}
                  <div className="space-y-3 flex-1">
                    {currentQuestion.options.map((option) => {
                      const isSelected = answers[currentQuestion.id] === option.text;
                      return (
                        <button
                          key={option.label}
                          onClick={() => handleSelectOption(option.text)}
                          className={`w-full flex items-center gap-4 px-5 py-4 rounded-[10px] border transition-all ${
                            isSelected
                              ? "bg-[#39481478] border-[#A2CE3A] h-[68px]"
                              : "bg-[#151A20] border-[#3D4C5E] hover:border-[#A2CE3A]/50"
                          }`}
                        >
                          <div className={`flex-shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center ${
                            isSelected ? "bg-[#A2CE3A]" : "bg-[#1D242D]"
                          }`}>
                            <span className={`font-mona-sans font-semibold text-base ${
                              isSelected ? "text-[#054711]" : "text-white"
                            }`}>
                              {option.label}
                            </span>
                          </div>
                          <span className="text-white font-mona-sans text-base text-left">
                            {option.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Image on Right */}
                  {currentQuestion.image && (
                    <div className="flex-shrink-0 w-[280px]">
                      <div className="bg-[#151A20] rounded-[12px] p-4 h-full flex items-center justify-center">
                        <img
                          src={currentQuestion.image}
                          alt="Question visual"
                          className="max-h-[205px] w-auto object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Text Answer Question */}
              {currentQuestion.type === "text" && (
                <div className={`mb-8 ${currentQuestion.image ? "flex gap-6" : ""}`}>
                  {/* Textarea */}
                  <div className="flex-1">
                    <textarea
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleTextAnswer(e.target.value)}
                      placeholder="Your answer..."
                      rows={6}
                      className="w-full px-5 py-4 bg-[#151A20] border border-[#3D4C5E] rounded-[10px] text-white placeholder:text-white/40 font-mona-sans text-base outline-none focus:border-[#A2CE3A] transition-colors resize-none"
                    />
                  </div>

                  {/* Image on Right */}
                  {currentQuestion.image && (
                    <div className="flex-shrink-0 w-[280px]">
                      <div className="bg-[#151A20] rounded-[12px] p-4 h-full flex items-center justify-center">
                        <img
                          src={currentQuestion.image}
                          alt="Question visual"
                          className="max-h-[205px] w-auto object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center gap-4">
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="flex-1 px-6 py-3.5 bg-[#E2F0C2] text-[#054711] font-mona-sans font-semibold text-base rounded-[10px] hover:opacity-90 transition-opacity"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className={`px-6 py-3.5 bg-[#A2CE3A] text-[#054711] font-mona-sans font-semibold text-base rounded-[10px] hover:opacity-90 transition-opacity ${
                    currentQuestionIndex === 0 ? "flex-1" : "flex-1"
                  }`}
                >
                  {isLastQuestion ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

          {/* Results Screen */}
          {showResults && (
            <div className="text-center">
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#A2CE3A] w-full" />
                </div>
              </div>

              {/* Score Circle */}
              <div className="mb-8 flex justify-center">
                <div className="relative w-[200px] h-[200px]">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      stroke="#3D4C5E"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      stroke="#A2CE3A"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(score / 100) * 565} 565`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#A2CE3A] text-6xl font-mona-sans font-bold">
                      {score}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Message */}
              <h2 className="text-white text-3xl lg:text-4xl font-mona-sans font-bold mb-3">
                You Passed! 🎉
              </h2>
              <p className="text-white/70 font-mona-sans text-base mb-8">
                {Math.round((score / 100) * ASSESSMENT_DATA.length)}/{ASSESSMENT_DATA.length} correct. You&apos;re interview ready. Check your email for more details on the next phase
              </p>

              {/* Action Button */}
              <button
                onClick={() => router.push("/dashboard?us=jobseeker")}
                className="px-8 py-3.5 bg-[#A2CE3A] text-[#054711] font-mona-sans font-semibold text-base rounded-[10px] hover:opacity-90 transition-opacity"
              >
                Go back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}