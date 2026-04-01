"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getApiUrl, getAuthHeaders } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

/* ─── API Data Interfaces ─── */

interface QuestionOption {
  id: number;
  label: string;
}

interface Question {
  id: number;
  body: string;
  image_path: string | null;
  points: number;
  selection_mode: "single" | "multiple";
  section_id: number;
  section_title: string;
  question_index_in_section: number;
  section_question_count: number;
  options: QuestionOption[];
}

interface AttemptData {
  attempt_id: number;
  assessment_id: number;
  status: string;
  started_at: string;
  deadline_at: string;
  duration_minutes: number;
  server_now: string;
  max_points: number;
  questions: Question[];
}

interface AssessmentData {
  id: number;
  title: string;
  description: string;
  cutoff_percentage: number;
  duration_minutes: number;
}

export default function AssessmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [attemptData, setAttemptData] = useState<AttemptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [startingAssessment, setStartingAssessment] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number | number[] }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  // Fetch current assessment on page load
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${getApiUrl()}/api/coach/assessments/current`, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch assessment");
        }

        const result = await response.json();
        setAssessmentData(result.data);
      } catch (error: any) {
        toast({
          variant: "error",
          title: "Error",
          description: error.message || "Failed to load assessment",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [toast]);

  // Countdown timer
  useEffect(() => {
    if (!started || timeRemaining <= 0 || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit when time runs out
          handleSubmitAssessment();
          toast({
            variant: "error",
            title: "Time's Up!",
            description: "Your assessment has been automatically submitted.",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, showResults]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const questions = attemptData?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleStartAssessment = async () => {
    if (!assessmentData) return;

    setStartingAssessment(true);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(
        `${getApiUrl()}/api/coach/assessments/${assessmentData.id}/attempts`,
        {
          method: "POST",
          headers,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to start assessment");
      }

      const result = await response.json();
      
      // Store attempt data with questions
      setAttemptData(result.data);
      
      // Calculate time remaining in seconds
      const deadline = new Date(result.data.deadline_at).getTime();
      const serverNow = new Date(result.data.server_now).getTime();
      const remainingSeconds = Math.floor((deadline - serverNow) / 1000);
      setTimeRemaining(remainingSeconds);
      
      toast({
        variant: "success",
        title: "Assessment Started",
        description: "Good luck!",
      });

      setStarted(true);
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "Failed to start assessment",
      });
    } finally {
      setStartingAssessment(false);
    }
  };

  const handleSelectOption = (optionId: number) => {
    if (!currentQuestion) return;
    
    if (currentQuestion.selection_mode === "multiple") {
      // Handle multiple selection
      const currentAnswers = (answers[currentQuestion.id] as number[]) || [];
      const isSelected = currentAnswers.includes(optionId);
      
      if (isSelected) {
        setAnswers({ ...answers, [currentQuestion.id]: currentAnswers.filter(id => id !== optionId) });
      } else {
        setAnswers({ ...answers, [currentQuestion.id]: [...currentAnswers, optionId] });
      }
    } else {
      // Handle single selection
      setAnswers({ ...answers, [currentQuestion.id]: optionId });
    }
  };

  const handleNext = () => {
    // Check if current question is answered
    if (!answers[currentQuestion.id]) {
      toast({
        variant: "error",
        title: "Answer Required",
        description: "Please answer the current question before proceeding.",
      });
      return;
    }

    if (isLastQuestion) {
      handleSubmitAssessment();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!attemptData) return;

    // Check if all questions are answered
    const unansweredCount = questions.length - Object.keys(answers).length;
    if (unansweredCount > 0) {
      toast({
        variant: "error",
        title: "Incomplete Assessment",
        description: `Please answer all questions. ${unansweredCount} question${unansweredCount > 1 ? 's' : ''} remaining.`,
      });
      return;
    }

    setSubmitting(true);

    try {
      // Format answers for API - only include answered questions
      const formattedAnswers = questions
        .filter((question) => answers[question.id] !== undefined)
        .map((question) => {
          const answer = answers[question.id];
          return {
            question_id: question.id,
            option_ids: Array.isArray(answer) ? answer : [answer],
          };
        });

      const headers = await getAuthHeaders();
      const response = await fetch(
        `${getApiUrl()}/api/coach/assessments/attempts/${attemptData.attempt_id}/submit`,
        {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers: formattedAnswers }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit assessment");
      }

      // Fetch results
      await fetchResults();
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Submission Failed",
        description: error.message || "Failed to submit assessment",
      });
      setSubmitting(false);
    }
  };

  const fetchResults = async () => {
    if (!attemptData) return;

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(
        `${getApiUrl()}/api/coach/assessments/attempts/${attemptData.attempt_id}/result`,
        {
          method: "GET",
          headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const result = await response.json();
      setResultData(result.data);
      setShowResults(true);
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "Failed to load results",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    const answeredCount = Object.keys(answers).length;
    return questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;
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
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A2CE3A]"></div>
                </div>
              ) : assessmentData ? (
                <>
                  <h1 className="text-white text-4xl lg:text-5xl font-mona-sans font-bold mb-4">
                    {assessmentData.title}
                  </h1>
                  <p className="text-white/70 font-mona-sans text-base lg:text-lg mb-4">
                    {assessmentData.description}
                  </p>
                  <div className="flex items-center justify-center gap-6 mb-8 text-white/60 font-mona-sans text-sm">
                    <span>Duration: {assessmentData.duration_minutes} minutes</span>
                    <span>•</span>
                    <span>Pass mark: {assessmentData.cutoff_percentage}%</span>
                  </div>
                  <button
                    onClick={handleStartAssessment}
                    disabled={startingAssessment}
                    className="px-8 py-3.5 bg-[#A2CE3A] text-[#054711] font-mona-sans font-semibold text-base rounded-[10px] hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {startingAssessment ? "Starting..." : "Start Assessment"}
                  </button>
                </>
              ) : (
                <div className="text-white/70 font-mona-sans">
                  <p>No assessment available at this time.</p>
                </div>
              )}
            </div>
          )}

          {/* Question Screen */}
          {started && !showResults && (
            <div>
              {/* Timer */}
              <div className="flex justify-end mb-4">
                <div className={`px-4 py-2 rounded-lg font-mona-sans font-semibold ${
                  timeRemaining < 300 ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white"
                }`}>
                  Time Remaining: {formatTime(timeRemaining)}
                </div>
              </div>

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
              {currentQuestion && (
                <div className="mb-6">
                  <p className="text-white/60 font-mona-sans text-sm mb-2">
                    {currentQuestion.section_title} — Question {currentQuestion.question_index_in_section} of {currentQuestion.section_question_count}
                  </p>
                  <h2 className="text-white text-2xl lg:text-3xl font-mona-sans font-bold">
                    {currentQuestion.body}
                  </h2>
                </div>
              )}

              {/* Question Options */}
              {currentQuestion && currentQuestion.options && (
                <div className={`mb-8 ${currentQuestion.image_path ? "flex gap-6" : ""}`}>
                {/* Options */}
                <div className="space-y-3 flex-1">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = currentQuestion.selection_mode === "multiple"
                      ? (answers[currentQuestion.id] as number[] || []).includes(option.id)
                      : answers[currentQuestion.id] === option.id;
                    
                    const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(option.id)}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-[10px] border transition-all ${
                          isSelected
                            ? "bg-[#39481478] border-[#A2CE3A]"
                            : "bg-[#151A20] border-[#3D4C5E] hover:border-[#A2CE3A]/50"
                        }`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center ${
                          isSelected ? "bg-[#A2CE3A]" : "bg-[#1D242D]"
                        }`}>
                          {currentQuestion.selection_mode === "multiple" ? (
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isSelected ? "border-[#054711] bg-[#054711]" : "border-white"
                            }`}>
                              {isSelected && (
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                  <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                          ) : (
                            <span className={`font-mona-sans font-semibold text-base ${
                              isSelected ? "text-[#054711]" : "text-white"
                            }`}>
                              {optionLabel}
                            </span>
                          )}
                        </div>
                        <span className="text-white font-mona-sans text-base text-left">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Image on Right */}
                {currentQuestion.image_path && (
                  <div className="flex-shrink-0 w-[280px]">
                    <div className="bg-[#151A20] rounded-[12px] p-4 h-full flex items-center justify-center">
                      <img
                        src={currentQuestion.image_path}
                        alt="Question visual"
                        className="max-h-[205px] w-auto object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            {currentQuestion.selection_mode === "multiple" && (
              <p className="text-white/50 text-sm font-mona-sans mb-4 italic">
                Select all that apply
              </p>
            )}

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
                {submitting ? "Submitting..." : (isLastQuestion ? "Save" : "Next")}
              </button>
            </div>
          </div>
          )}

          {/* Results Screen */}
          {showResults && resultData && (
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
                      stroke={resultData.passed ? "#A2CE3A" : "#EF4444"}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(resultData.percentage / 100) * 565} 565`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-6xl font-mona-sans font-bold ${
                      resultData.passed ? "text-[#A2CE3A]" : "text-red-400"
                    }`}>
                      {Math.round(resultData.percentage)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Message */}
              <h2 className="text-white text-3xl lg:text-4xl font-mona-sans font-bold mb-3">
                {resultData.passed ? "You Passed! 🎉" : "Assessment Complete"}
              </h2>
              <p className="text-white/70 font-mona-sans text-base mb-2">
                Score: {resultData.earned_points}/{resultData.max_points} points
              </p>
              <p className="text-white/70 font-mona-sans text-base mb-8">
                {resultData.passed 
                  ? "Congratulations! Check your email for next steps." 
                  : `You need ${assessmentData?.cutoff_percentage}% to pass. Please try again.`}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => router.push("/manage-your-profile")}
                  className="px-8 py-3.5 bg-white/10 text-white font-mona-sans font-semibold text-base rounded-[10px] hover:bg-white/20 transition-all border border-white/20"
                >
                  Setup Profile
                </button>
                <button
                  onClick={() => router.push("/dashboard?us=coach")}
                  className="px-8 py-3.5 bg-[#A2CE3A] text-[#054711] font-mona-sans font-semibold text-base rounded-[10px] hover:opacity-90 transition-opacity"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}