"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const SVG1 = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.01238 3.448C7.61038 1.698 10.0284 1.645 10.7374 3.289L10.7974 3.449L11.6044 5.809C11.7893 6.35023 12.0882 6.84551 12.4808 7.26142C12.8734 7.67734 13.3507 8.00421 13.8804 8.22L14.0974 8.301L16.4574 9.107C18.2074 9.705 18.2604 12.123 16.6174 12.832L16.4574 12.892L14.0974 13.699C13.556 13.8838 13.0605 14.1826 12.6444 14.5753C12.2283 14.9679 11.9013 15.4452 11.6854 15.975L11.6044 16.191L10.7984 18.552C10.2004 20.302 7.78238 20.355 7.07438 18.712L7.01238 18.552L6.20638 16.192C6.02156 15.6506 5.72275 15.1551 5.33012 14.739C4.93749 14.3229 4.46017 13.9959 3.93038 13.78L3.71438 13.699L1.35438 12.893C-0.396622 12.295 -0.449622 9.877 1.19438 9.169L1.35438 9.107L3.71438 8.301C4.25561 8.11606 4.75089 7.81719 5.1668 7.42457C5.58271 7.03195 5.90959 6.55469 6.12538 6.025L6.20638 5.809L7.01238 3.448ZM16.9054 1.80688e-07C17.0925 -2.35972e-07 17.2758 0.0524783 17.4345 0.151472C17.5933 0.250465 17.7211 0.392003 17.8034 0.56L17.8514 0.677L18.2014 1.703L19.2284 2.053C19.4159 2.1167 19.5802 2.23462 19.7006 2.39182C19.821 2.54902 19.892 2.73842 19.9047 2.93602C19.9173 3.13362 19.871 3.33053 19.7716 3.50179C19.6722 3.67304 19.5242 3.81094 19.3464 3.898L19.2284 3.946L18.2024 4.296L17.8524 5.323C17.7886 5.51043 17.6706 5.6747 17.5133 5.79499C17.356 5.91529 17.1666 5.98619 16.969 5.99872C16.7714 6.01125 16.5746 5.96484 16.4034 5.86538C16.2322 5.76591 16.0944 5.61787 16.0074 5.44L15.9594 5.323L15.6094 4.297L14.5824 3.947C14.3949 3.8833 14.2305 3.76538 14.1101 3.60819C13.9898 3.45099 13.9187 3.26158 13.9061 3.06398C13.8935 2.86638 13.9398 2.66947 14.0392 2.49821C14.1385 2.32696 14.2865 2.18906 14.4644 2.102L14.5824 2.054L15.6084 1.704L15.9584 0.677C16.0258 0.479426 16.1534 0.307909 16.3232 0.186499C16.493 0.065089 16.6966 -0.000125281 16.9054 1.80688e-07Z"
        fill="white"
      />
    </svg>
  );
};

const AnimatedPlaceholder = ({ isActive }: { isActive: boolean }) => {
  const placeholderTexts = [
    "Type your prompt here...",
    "Help me prepare for a software engineer interview...",
    "Review my CV and suggest improvements...",
    "Find me interview coaching opportunities...",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isActive) return; // Don't animate if user is typing

    const currentText = placeholderTexts[currentIndex];
    
    // Typing animation
    const controls = animate(count, currentText.length, {
      type: "tween",
      duration: currentText.length * 0.05, // 50ms per character
      ease: "linear",
      onUpdate(latest) {
        setDisplayText(currentText.slice(0, Math.round(latest)));
      },
      onComplete() {
        // Wait 5 seconds then move to next text
        setTimeout(() => {
          // Reset animation
          count.set(0);
          setCurrentIndex((prev) => (prev + 1) % placeholderTexts.length);
        }, 5000);
      },
    });

    return () => controls.stop();
  }, [currentIndex, isActive, count, placeholderTexts]);

  return (
    <span className="text-gray-500">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        |
      </motion.span>
    </span>
  );
};

export default function AIChatInputSection() {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      // Handle file upload logic here
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
      style={{
        background: "url('/Group 16.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-[#0B0D0F] py-7 lg:py-10 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto lg px-3 lg:px-6 relative z-10">
        {/* Orb Image */}
        <div className="flex justify-center mb-8 animate-[spin_3s_linear_infinite]">
          <Image
            src="/img1.svg"
            alt="AI Orb"
            width={150}
            height={150}
            className="w-32 h-32 lg:w-40 lg:h-40"
          />
        </div>

        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-mona-sans font-bold text-center mb-6">
          <span
            className="text-3xl lg:text-5xl font-mona-sans font-bold"
            style={{
              background:
                "linear-gradient(to bottom, #FFFFFF 0%, #A2CE3A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Hello, Jobseeker
          </span>
        </h2>

        {/* Description */}
        <p className="text-white text-center text-base lg:text-lg font-sora mb-12 max-w-3xl mx-auto">
          Use our AI Agent to find the Perfect Interview Coach Prepare for
          interviews, Upload CVs, and get guidance from AI or real
          professionals.
        </p>

        {/* Input Container */}
        <div className="bg-[#F0F0F00A]">
          <div className="z-10 bg-[#F0F0F00A] border-2 border-[#A2CE3A] rounded-[24px] p-3 lg:p-6 mb-6">
            {/* Input Area */}
            <div className="mb-4 relative">
              {!inputValue && (
                <div className="absolute top-0 left-0 pointer-events-none font-sora text-sm">
                  <AnimatedPlaceholder isActive={inputValue.length > 0} />
                </div>
              )}
              <textarea
                className="w-full text-white bg-transparent font-sora text-sm outline-none resize-none"
                rows={4}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between">
              {/* Left Side - Add and Attach Buttons */}
              <div className="flex items-center gap-3 relative">
                {/* Attach CV Button */}

                <button
                  onClick={() => setShowModal(!showModal)}
                  className="text-white"
                >
                  <PlusCircle className="h- w-" />
                </button>
                <button
                  onClick={handleFileUpload}
                  className="px-5 py-2.5 rounded-[100px] border border-white text-white font-mona-sans text-sm flex items-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  Attach CV
                </button>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Right Side - Mic and Start Buttons */}
              <div className="flex items-center gap-3">
                {/* Mic Button */}
                <button className="w-10 h-10 rounded-full bg-[#2A2D31] flex items-center justify-center hover:bg-[#3A3D41] transition-colors">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>

                {/* Start Button */}
                <button className="px-8 py-2.5 rounded-[100px] bg-[#A2CE3A] text-white font-mona-sans text-sm font-semibold flex items-center gap-2 hover:bg-[#92BE2A] transition-colors">
                  <SVG1 />
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature List */}
        {showModal && (
          <div className="flex flex-col gap-3 bg-[#0B0D0FC4] border border-[#FFFFFF]/[10%] w-fit rounded-[10px] p-3">
            <button className="flex items-center gap-2 text-white font-mona-sans text-sm hover:text-[#A2CE3A] transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Career intelligence
            </button>

            <button className="flex items-center gap-2 text-white font-mona-sans text-sm hover:text-[#A2CE3A] transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Auto-Apply
            </button>

            <button className="flex items-center gap-2 text-white font-mona-sans text-sm hover:text-[#A2CE3A] transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              LinkedIn Optimization
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}