"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function V1HeroSection() {
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
    <section className="relative min-h-screen pt-20 lg:pt-40 pb-16">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <img 
            src="/Testimonials_header.png" 
            alt="5-star testimonials" 
            className="h-12 object-contain"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-7xl font-mona-sans font-bold leading-tight">
            <span className="text-white">YOU DON'T NEED MORE APPLICATIONS.</span>
            <br />
            <span className="text-[#A2CE3A]">YOU NEED BETTER POSITIONING.</span>
          </h1>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <Link 
            href="/signup?v1=true"
            className="px-8 py-4 text-center rounded-[30px] text-[#090B0E] font-mona-sans text-base font-semibold hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(88.9deg, #A2CE3A 24.91%, #52681D 92.25%)"
            }}
          >
            Start My Career Upgrade
          </Link>
          <Link 
            href="/coaches"
            className="px-8 py-4 text-center rounded-[30px] text-white font-mona-sans text-base font-semibold hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(180deg, #0E0912 0%, #22162B 100%)"
            }}
          >
            Book a Clarity Session
          </Link>
        </motion.div>

        {/* Video Component Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative p-6 lg:p-10 rounded-[30px] border overflow-hidden"
          style={{
            background: "#1563741A",
            borderColor: "#FFFFFF1A"
          }}
        >
          {/* Video Section */}
          <div className="relative w-full rounded-[20px] overflow-hidden aspect-video mb-6">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover brightness-90"
            >
              <source
                src="/homepage/grok-video-8de77170-1bca-4f74-982c-40dafb6e0473.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay Elements */}
            <div className="absolute inset-0 z-10">
              {/* Small Video Thumbnail - Bottom Left */}
              <div className="absolute bottom-4 left-4 w-32 h-24 rounded-xl overflow-hidden border-2 border-white/20">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="/homepage/grok-video-706a8285-b08a-41cb-88c7-f5fe6371771c.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>

              {/* Video Controls - Bottom Center */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <button className="text-white/80 hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                  </svg>
                </button>
                <button className="text-white/80 hover:text-white text-sm">00:18</button>
                <button className="text-white/80 hover:text-white text-sm">Full Screen</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  End Call
                </button>
              </div>
            </div>
          </div>

          {/* Cards Section - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Mock Interview Score Card */}
            <div className="bg-[#0A0F0C] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#A2CE3A]/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white/60 text-sm font-mona-sans">Mock Interview Score</span>
              </div>
              <div className="text-4xl font-bold text-white mb-2">78</div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-[#A2CE3A] h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* Hire Likelihood Card */}
            <div className="bg-[#0A0F0C] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#A2CE3A]/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white/60 text-sm font-mona-sans">Hire Likelihood</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Moderate</div>
              <p className="text-white/50 text-xs">Still needs work for rejection-proof</p>
            </div>

            {/* Key Insights Card */}
            <div className="bg-[#0A0F0C] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#A2CE3A]/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white/60 text-sm font-mona-sans">Key Insights</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A2CE3A]"></div>
                  <span className="text-white/70 text-xs">Strengths</span>
                </div>
                <p className="text-white text-sm font-semibold">Areas to Improve</p>
              </div>
            </div>

            {/* Sign Up Component - 4th Grid Item */}
            <div className="bg-[#0A0F0C] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-white/60 text-sm font-sora mb-4">
                We prep you using the actual CV version submitted, with role-specific coaching and tailored mock sessions until you're ready to compete.
              </p>
              <Link 
                href="/signup?v1=true"
                className="inline-block text-center px-6 py-2.5 bg-[#090B0E] hover:bg-[#0E0912] border border-white/10 rounded-full text-white font-mona-sans text-sm font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
