"use client";

import { useState } from "react";
import { Fade } from "react-awesome-reveal";

const SVG1 = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="29.7578"
        height="29.7578"
        rx="14.8789"
        fill="#A2CE3A"
        fill-opacity="0.15"
      />
      <path
        d="M14.5524 19.6653H13.7577C11.7256 19.6653 10.7099 19.6653 10.0785 19.022C9.44702 18.3786 9.44702 17.3436 9.44702 15.2725C9.44702 13.202 9.44702 12.1664 10.0785 11.5231C10.7099 10.8797 11.7256 10.8797 13.7577 10.8797H15.9133C17.9453 10.8797 18.9616 10.8797 19.5931 11.5231C20.0788 12.0179 20.1905 12.7451 20.2166 13.9972"
        fill="#A2CE3A"
        fill-opacity="0.15"
      />
      <path
        d="M14.5524 19.6653H13.7577C11.7256 19.6653 10.7099 19.6653 10.0785 19.022C9.44702 18.3786 9.44702 17.3436 9.44702 15.2725C9.44702 13.202 9.44702 12.1664 10.0785 11.5231C10.7099 10.8797 11.7256 10.8797 13.7577 10.8797H15.9133C17.9453 10.8797 18.9616 10.8797 19.5931 11.5231C20.0788 12.0179 20.1905 12.7451 20.2166 13.9972"
        stroke="#A2CE3A"
        stroke-width="0.70852"
        stroke-linecap="round"
      />
      <path
        d="M19.6594 19.1117L20.7834 20.2323L19.6594 19.1117ZM20.2466 17.6964C20.2511 17.4311 20.2027 17.1675 20.1042 16.9211C20.0058 16.6747 19.8592 16.4503 19.6732 16.2611C19.4871 16.0719 19.2653 15.9216 19.0205 15.819C18.7758 15.7164 18.5131 15.6636 18.2477 15.6636C17.9823 15.6636 17.7196 15.7164 17.4749 15.819C17.2302 15.9216 17.0083 16.0719 16.8222 16.2611C16.6362 16.4503 16.4896 16.6747 16.3912 16.9211C16.2928 17.1675 16.2444 17.4311 16.2488 17.6964C16.2576 18.2207 16.4721 18.7205 16.846 19.0882C17.2199 19.4558 17.7233 19.6619 18.2477 19.6619C18.7721 19.6619 19.2755 19.4558 19.6494 19.0882C20.0233 18.7205 20.2378 18.2207 20.2466 17.6964Z"
        fill="#A2CE3A"
        fill-opacity="0.15"
      />
      <path
        d="M19.6594 19.1117L20.7834 20.2323M20.2466 17.6964C20.2511 17.4311 20.2027 17.1675 20.1042 16.9211C20.0058 16.6747 19.8592 16.4503 19.6732 16.2611C19.4871 16.0719 19.2653 15.9216 19.0205 15.819C18.7758 15.7164 18.5131 15.6636 18.2477 15.6636C17.9823 15.6636 17.7196 15.7164 17.4749 15.819C17.2302 15.9216 17.0083 16.0719 16.8222 16.2611C16.6362 16.4503 16.4896 16.6747 16.3912 16.9211C16.2928 17.1675 16.2444 17.4311 16.2488 17.6964C16.2576 18.2207 16.4721 18.7205 16.846 19.0882C17.2199 19.4558 17.7233 19.6619 18.2477 19.6619C18.7721 19.6619 19.2755 19.4558 19.6494 19.0882C20.0233 18.7205 20.2378 18.2207 20.2466 17.6964Z"
        stroke="#A2CE3A"
        stroke-width="0.70852"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.3826 10.8798L17.3259 10.7041C17.0454 9.83117 16.9054 9.39473 16.5715 9.14533C16.2371 8.89594 15.7938 8.89594 14.9056 8.89594H14.7565C13.8695 8.89594 13.4257 8.89594 13.0918 9.14533C12.7574 9.39473 12.6174 9.83117 12.3368 10.7041L12.2812 10.8798"
        stroke="#A2CE3A"
        stroke-width="0.70852"
      />
    </svg>
  );
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("mock-interview");

  return (
    <>
      <section
        className="relative bg-[#141619] min-h-screen rounded-[10px] pt-24 pb-16"
        style={{
          background: "url('/homepage/bg1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
          <div
            className="relative p-4 lg:p-10 lg:pb-0 rounded-3xl overflow-hidden flex flex-col lg:flex-row lg:justify-between gap-12"
            style={{
              background:
                "url('/homepage/medium-shot-smiley-woman-recording-lesson (1) 1.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src="/homepage/Frame 1321318297.png"
              alt=""
              className="absolute bottom-10 lg:left-[30%] z-10 hidden h-20 lg:block object-contain"
            />

            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 brightness-75"
            >
              <source
                src="/homepage/grok-video-8de77170-1bca-4f74-982c-40dafb6e0473.mp4"
                type="video/mp4"
              />
              {/* Fallback message if video doesn't load */}
              Your browser does not support the video tag.
            </video>

            {/* Left Side - Content */}
            <div className="z-10 space-y-5 lg:space-y-8">
              {/* Heading */}
              <Fade direction="down" triggerOnce duration={2000}>
              <h1 className="text-3xl lg:text-5xl font-mona-sans font-bold leading-tight">
                <span className="text-white">Get </span>
                <span className="text-[#A2CE3A]">Interview Prepped</span>
                <br />
                <span className="text-white">and Let </span>
                <span className="text-[#A2CE3A]">AI Do Your</span>
                <br />
                <span className="text-[#A2CE3A]">Job Application</span>
                <span className="text-white"> For You.</span>
              </h1>
              </Fade>

              {/* Subheading */}
                            <Fade direction="down" triggerOnce delay={1000} duration={2000}>
                <p className="text-[#FFFFFF] text-lg font-sora max-w-xl">
                  The AI Job Search Platform That Doesn’t Just Apply for You!!! It
                  Actively Makes You a Better Candidate.
                </p>
              </Fade>

                            <Fade direction="down" triggerOnce delay={2000} duration={2000}>
              {/* Buttons */}
              <div className="flex flex-col lg:flex-row gap-4">
                <button className="px-8 py-3.5 bg-[#A2CE3A] rounded-[100px] text-[#121212] font-mona-sans text-base font-semibold hover:bg-[#92BE2A] transition-colors">
                  Job Seeker Sign In
                </button>
                <button className="px-8 py-3.5 bg-transparent bg-white rounded-[100px] text-[#121212] font-mona-sans text-base font-semibold hover:bg-white/10 transition-colors">
                  Interview Coach Sign In
                </button>
              </div>
                            </Fade>

              <div className="absolute bottom-10 lg:left-10 hidden lg:block h-[180px] w-full lg:w-[200px] rounded-xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0 brightness-75"
                >
                  <source
                    src="/homepage/grok-video-706a8285-b08a-41cb-88c7-f5fe6371771c.mp4"
                    type="video/mp4"
                  />
                  {/* Fallback message if video doesn't load */}
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Right Side - Mock Interview Score Card */}
            <div className="lg:pl-8 scale-[80%]">
              <div className="bg-[#0B0D0F66] border border-[#A2CE3AB2] rounded-[18px] p-3 lg:p-6 backdrop-blur-sm">
                {/* Tabs */}
                <div className="w-full">
                  <div className="mx-auto w-fit flex space-x-2 mb-6">
                    <button
                      onClick={() => setActiveTab("mock-interview")}
                      className={`flex-1 px-3 py-1 rounded-[16px] font-mona-sans w-[100px] text-[10px] font-medium transition-colors ${
                        activeTab === "mock-interview"
                          ? "bg-[#A2CE3A8C] text-white"
                          : "bg-[#FFFFFF33] text-white"
                      }`}
                    >
                      Mock Interview
                    </button>
                    <button
                      onClick={() => setActiveTab("other")}
                      className={`flex-1 px-3 py-1 rounded-[16px] font-mona-sans w-[100px] text-[10px] font-medium transition-colors ${
                        activeTab === "other"
                          ? "bg-[#A2CE3A8C] text-white"
                          : "bg-[#FFFFFF33] text-white"
                      }`}
                    >
                      Live Chat
                    </button>
                  </div>
                </div>

                {/* Score Display */}
                <div className="bg-[#141619E3] rounded-[12px] p-3 lg:p-6 mb-4">
                  <div className="flex gap-2">
                    <SVG1 />
                    <div className="flex flex-col">
                      <p className="text-xl font-semibold text-white font-sans">
                        Mock Interview Score{" "}
                      </p>
                      <p className="text-[#ACACAC] text-sm font-sora"></p>
                      <span className="text-[#ACACAC] font-sora text-sm">
                        Out of 100
                      </span>
                    </div>
                  </div>
                  <div className="flex mt-5 mb-3">
                    <span className="text-6xl font-bold text-white font-sans">
                      78
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-[#A2CE3A] h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="bg-[#141619E3] rounded-[12px] p-3 lg:p-6 mb-4">
                  <div className="flex gap-2">
                    <SVG1 />
                    <div className="flex flex-col">
                      <p className="text-xl font-semibold text-white font-sans">
                        Hire Likelihood
                      </p>
                      <p className="text-[#ACACAC] text-sm font-sora"></p>
                      <span className="text-[#ACACAC] font-sora text-sm">
                        Based on performance
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-5">
                    <span className="text-2xl lg:text-3xl font-bold text-white font-sans">
                      Moderate
                    </span>
                    <span className="text-[#ACACAC] font-sora text-sm">
                      Strong foundation with room for improvement
                    </span>
                  </div>
                </div>

                {/* Strengths */}
                <div className="bg-[#141619E3] rounded-[12px] p-3 lg:p-6 mb-4">
                  <div className="flex gap-2">
                    <SVG1 />
                    <div className="flex flex-col">
                      <p className="text-xl font-semibold text-white font-sans">
                        Key Insights
                      </p>
                      <p className="text-[#ACACAC] text-sm font-sora"></p>
                      <span className="text-[#ACACAC] font-sora text-sm">
                        Based on performance
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className="text-sm font-bold text-white font-sans">
                      Strengths
                    </span>
                    <span className="text-[#ACACAC] font-sora text-[12px]">
                      Technical Knowledge
                    </span>
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className="text-sm font-bold text-white font-sans">
                      Areas to Improve
                    </span>
                    <span className="text-[#ACACAC] font-sora text-[12px]">
                      STAR structure, Communication clarity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
