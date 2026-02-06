"use client";

import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { motion, AnimatePresence } from "framer-motion";

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
        fillOpacity="0.15"
      />
      <path
        d="M14.5524 19.6653H13.7577C11.7256 19.6653 10.7099 19.6653 10.0785 19.022C9.44702 18.3786 9.44702 17.3436 9.44702 15.2725C9.44702 13.202 9.44702 12.1664 10.0785 11.5231C10.7099 10.8797 11.7256 10.8797 13.7577 10.8797H15.9133C17.9453 10.8797 18.9616 10.8797 19.5931 11.5231C20.0788 12.0179 20.1905 12.7451 20.2166 13.9972"
        fill="#A2CE3A"
        fillOpacity="0.15"
      />
      <path
        d="M14.5524 19.6653H13.7577C11.7256 19.6653 10.7099 19.6653 10.0785 19.022C9.44702 18.3786 9.44702 17.3436 9.44702 15.2725C9.44702 13.202 9.44702 12.1664 10.0785 11.5231C10.7099 10.8797 11.7256 10.8797 13.7577 10.8797H15.9133C17.9453 10.8797 18.9616 10.8797 19.5931 11.5231C20.0788 12.0179 20.1905 12.7451 20.2166 13.9972"
        stroke="#A2CE3A"
        strokeWidth="0.70852"
        strokeLinecap="round"
      />
      <path
        d="M19.6594 19.1117L20.7834 20.2323L19.6594 19.1117ZM20.2466 17.6964C20.2511 17.4311 20.2027 17.1675 20.1042 16.9211C20.0058 16.6747 19.8592 16.4503 19.6732 16.2611C19.4871 16.0719 19.2653 15.9216 19.0205 15.819C18.7758 15.7164 18.5131 15.6636 18.2477 15.6636C17.9823 15.6636 17.7196 15.7164 17.4749 15.819C17.2302 15.9216 17.0083 16.0719 16.8222 16.2611C16.6362 16.4503 16.4896 16.6747 16.3912 16.9211C16.2928 17.1675 16.2444 17.4311 16.2488 17.6964C16.2576 18.2207 16.4721 18.7205 16.846 19.0882C17.2199 19.4558 17.7233 19.6619 18.2477 19.6619C18.7721 19.6619 19.2755 19.4558 19.6494 19.0882C20.0233 18.7205 20.2378 18.2207 20.2466 17.6964Z"
        fill="#A2CE3A"
        fillOpacity="0.15"
      />
      <path
        d="M19.6594 19.1117L20.7834 20.2323M20.2466 17.6964C20.2511 17.4311 20.2027 17.1675 20.1042 16.9211C20.0058 16.6747 19.8592 16.4503 19.6732 16.2611C19.4871 16.0719 19.2653 15.9216 19.0205 15.819C18.7758 15.7164 18.5131 15.6636 18.2477 15.6636C17.9823 15.6636 17.7196 15.7164 17.4749 15.819C17.2302 15.9216 17.0083 16.0719 16.8222 16.2611C16.6362 16.4503 16.4896 16.6747 16.3912 16.9211C16.2928 17.1675 16.2444 17.4311 16.2488 17.6964C16.2576 18.2207 16.4721 18.7205 16.846 19.0882C17.2199 19.4558 17.7233 19.6619 18.2477 19.6619C18.7721 19.6619 19.2755 19.4558 19.6494 19.0882C20.0233 18.7205 20.2378 18.2207 20.2466 17.6964Z"
        stroke="#A2CE3A"
        strokeWidth="0.70852"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.3826 10.8798L17.3259 10.7041C17.0454 9.83117 16.9054 9.39473 16.5715 9.14533C16.2371 8.89594 15.7938 8.89594 14.9056 8.89594H14.7565C13.8695 8.89594 13.4257 8.89594 13.0918 9.14533C12.7574 9.39473 12.6174 9.83117 12.3368 10.7041L12.2812 10.8798"
        stroke="#A2CE3A"
        strokeWidth="0.70852"
      />
    </svg>
  );
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("mock-interview");
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-switch between images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const images = ["/homepage/1.png", "/homepage/2.png"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative bg-[#141619] min-h-screen rounded-[10px] pt-24 pb-16"
      style={{
        background: "url('/homepage/bg1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        <div
          className="relative p-4 lg:p-10 lg:pb-20 rounded-3xl overflow-hidden flex flex-col lg:flex-row lg:justify-between gap-12"
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
                The AI Job Search Platform That Doesn't Just Apply for You!!! It
                Actively Makes You a Better Candidate.
              </p>
            </Fade>

            <Fade direction="down" triggerOnce delay={2000} duration={2000}>
              {/* Buttons */}
              <div className="flex flex-col lg:flex-row gap-4">
                <button className="px-8 py-3.5 bg-[#EAFFBA] border-[6px] border-[#272f1568] rounded-2xl text-[#4A4A4A] font-mona-sans text-base font-semibold hover:bg-[#92BE2A] transition-colors">
                  Job Seeker Sign In
                </button>
                <button className="px-8 py-3.5 bg-transparent bg-white border-[6px] border-[#272f1568] rounded-2xl text-[#4A4A4A] font-mona-sans text-base font-semibold hover:bg-white/10 transition-colors">
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
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right Side - Animated Image Carousel */}
          <div className="h-fit relative w-full lg:w-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  rotateY: 15,
                  transition: {
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }
                }}
                className="w-full h-[600px] rounded-[18px] overflow-hidden object-contain"
                style={{ transformStyle: 'preserve-3d' }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}