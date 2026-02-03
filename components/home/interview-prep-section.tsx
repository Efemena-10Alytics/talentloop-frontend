"use client";

import { useState } from "react";
import Image from "next/image";

export default function InterviewPrepSection() {
  const [selectedCompany, setSelectedCompany] = useState("Google");
  const [selectedInterviewType, setSelectedInterviewType] =
    useState("Behavioral");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Junior");
  const [role, setRole] = useState("");

  return (
    <section className="relative bg-[#0B0D0F] min-h-screen py-7 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="flex-1 space-y-8">
            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-mona-sans font-bold leading-tight">
                <span className="text-white">INTERVIEW PREP: AI or</span>
                <br />
                <span className="text-white">HUMAN, </span>
                <span className="text-[#A2CE3A]">YOUR CHOICE</span>
              </h1>
              <p className="text-white text-lg font-sora">
                Interview Prep That Actually Prepares You
              </p>
            </div>

            {/* Choice Section */}
            <div className="relative bg-[#0B0D0F] border-2 border-[#A2CE3A] rounded-[24px] p-8 lg:p-10">
              {/* Wireframe Background Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 600 600"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="300"
                    cy="100"
                    r="150"
                    stroke="#A2CE3A"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="300"
                    cy="100"
                    r="175"
                    stroke="#A2CE3A"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="300"
                    cy="100"
                    r="200"
                    stroke="#A2CE3A"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>

              <div className="relative flex flex-col lg:flex-row items-center justify-around gap-8">
                {/* AI Copilot */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-[#A2CE3A]/20 to-transparent p-1 border-2 border-white">
                      <div className="w-full h-full rounded-full bg-[#141619] flex items-center justify-center overflow-hidden">
                        {/* AI Robot Icon/Image */}
                        <img
                          src="/ai-coach.svg"
                          alt=""
                          className="h-[180px] w-[180px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-[#1A1D21] border border-white/20 rounded-[8px] text-white font-mona-sans text-base font-semibold hover:bg-[#2A2D31] transition-colors">
                    AI Copilot
                  </button>
                </div>

                {/* OR Divider */}
                <div className="text-white font-mona-sans text-3xl lg:text-4xl font-bold">
                  or
                </div>

                {/* Human Coach */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-[#A2CE3A]/20 to-transparent p-1 border-2 border-white">
                      <div className="w-full h-full rounded-full bg-[#141619] flex items-center justify-center overflow-hidden">
                        <img
                          src="/human-coach.svg"
                          alt=""
                          className="h-[180px] w-[180px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-[#1A1D21] border border-white/20 rounded-[8px] text-white font-mona-sans text-base font-semibold hover:bg-[#2A2D31] transition-colors">
                    Human Coach
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Mock Interview Configuration */}
          <div className="flex-1 w-full lg:max-w-[500px]">
            <div className="bg-[#141619] border border-[#A2CE3A]/30 rounded-[18px] p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6 flex flex-col items-center">
                <h2 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-2">
                  Mock Interview
                </h2>
                <p className="text-sm text-[#ACACAC] font-sora">
                  Configure your AI Copilot for Practice Sessions
                </p>
              </div>

              {/* Role Input */}
              <div className="mb-6">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">
                  Role
                </label>
                <input
                  type="text"
                  placeholder="Enter role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                />
                <p className="text-xs text-[#ACACAC] font-sora mt-1">
                  The role you want to prep for
                </p>
              </div>

              {/* Select Company */}
              <div className="mb-6">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-3">
                  Select Company
                </label>
                <div className="flex gap-3">
                  {["Google", "Meta", "Start Up"].map((company) => (
                    <button
                      key={company}
                      onClick={() => setSelectedCompany(company)}
                      className={`flex-1 px-4 py-3 rounded-[8px] font-mona-sans text-sm font-medium transition-all ${
                        selectedCompany === company
                          ? "bg-[#A2CE3A] text-[#121212]"
                          : "bg-[#2A2D31] text-white hover:bg-[#3A3D41]"
                      }`}
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Interview Type */}
              <div className="mb-6">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-3">
                  Select Interview Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Behavioral",
                    "Technical",
                    "System Design",
                    "Cultural Fit",
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedInterviewType(type)}
                      className={`px-4 py-3 rounded-[8px] font-mona-sans text-sm font-medium transition-all ${
                        selectedInterviewType === type
                          ? "bg-[#A2CE3A] text-[#121212]"
                          : "bg-[#2A2D31] text-white hover:bg-[#3A3D41]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Difficulty */}
              <div className="mb-8">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-3">
                  Select Difficulty
                </label>
                <div className="flex gap-3">
                  {["Junior", "Mid-level", "Senior"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(level)}
                      className={`flex-1 px-4 py-3 rounded-[8px] font-mona-sans text-sm font-medium transition-all ${
                        selectedDifficulty === level
                          ? "bg-[#A2CE3A] text-[#121212]"
                          : "bg-[#2A2D31] text-white hover:bg-[#3A3D41]"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <button className="w-full px-8 py-4 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-base font-bold hover:bg-[#92BE2A] transition-colors">
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
