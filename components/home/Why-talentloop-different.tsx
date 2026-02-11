"use client";

import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { motion, AnimatePresence } from "framer-motion";

const TargetIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="10" fill="white" />
    <path
      d="M20.5961 30.2579L20.5841 30.2599L20.5131 30.2949L20.4931 30.2989L20.4791 30.2949L20.4081 30.2589C20.3975 30.2563 20.3895 30.2583 20.3841 30.2649L20.3801 30.2749L20.3631 30.7029L20.3681 30.7229L20.3781 30.7359L20.4821 30.8099L20.4971 30.8139L20.5091 30.8099L20.6131 30.7359L20.6251 30.7199L20.6291 30.7029L20.6121 30.2759C20.6095 30.2653 20.6041 30.2593 20.5961 30.2579ZM20.8601 30.1449L20.8461 30.1469L20.6621 30.2399L20.6521 30.2499L20.6491 30.2609L20.6671 30.6909L20.6721 30.7029L20.6801 30.7109L20.8811 30.8029C20.8938 30.8063 20.9035 30.8036 20.9101 30.7949L20.9141 30.7809L20.8801 30.1669C20.8768 30.1543 20.8701 30.1469 20.8601 30.1449ZM20.1451 30.1469C20.1407 30.1443 20.1355 30.1434 20.1304 30.1445C20.1254 30.1456 20.121 30.1487 20.1181 30.1529L20.1121 30.1669L20.0781 30.7809C20.0788 30.7929 20.0845 30.8009 20.0951 30.8049L20.1101 30.8029L20.3111 30.7099L20.3211 30.7019L20.3241 30.6909L20.3421 30.2609L20.3391 30.2489L20.3291 30.2389L20.1451 30.1469Z"
      fill="#A2CE3A"
    />
    <path
      d="M22.0021 27C22.2673 27 22.5217 27.1054 22.7092 27.2929C22.8967 27.4804 23.0021 27.7348 23.0021 28C23.0021 28.2652 22.8967 28.5196 22.7092 28.7071C22.5217 28.8946 22.2673 29 22.0021 29H18.0021C17.7369 29 17.4825 28.8946 17.295 28.7071C17.1074 28.5196 17.0021 28.2652 17.0021 28C17.0021 27.7348 17.1074 27.4804 17.295 27.2929C17.4825 27.1054 17.7369 27 18.0021 27H22.0021ZM20.0021 9C21.1781 9 22.3001 9.228 23.3301 9.638C22.9975 10.2925 22.9155 11.0461 23.0997 11.7568C23.2839 12.4675 23.7214 13.0864 24.3301 13.497L24.4361 13.563L24.4961 13.657C24.7707 14.0699 25.1431 14.4085 25.5801 14.6428C26.0171 14.8771 26.5052 14.9998 27.0011 15C27.5571 15 28.0121 14.851 28.3631 14.672C29.1731 16.7062 29.2137 18.966 28.4774 21.028C27.7411 23.09 26.2784 24.8129 24.3631 25.874C24.2147 25.9565 24.0478 25.9998 23.8781 26H16.1261C15.9564 25.9998 15.7894 25.9565 15.6411 25.874C13.8955 24.9076 12.5204 23.3886 11.7322 21.5557C10.9439 19.7227 10.787 17.6798 11.2863 15.748C11.7856 13.8162 12.9126 12.1051 14.4903 10.8836C16.068 9.66212 18.0068 8.99954 20.0021 9ZM20.0021 14C19.7935 14.0001 19.5902 14.0654 19.4205 14.1868C19.2509 14.3082 19.1235 14.4796 19.0561 14.677L18.9261 15.055C18.6261 15.934 17.9361 16.625 17.0561 16.925L16.6791 17.054C16.4819 17.1216 16.3107 17.2491 16.1896 17.4187C16.0684 17.5883 16.0033 17.7915 16.0033 18C16.0033 18.2085 16.0684 18.4117 16.1896 18.5813C16.3107 18.7509 16.4819 18.8784 16.6791 18.946L17.0571 19.076C17.9361 19.376 18.6271 20.066 18.9271 20.946L19.0561 21.323C19.1237 21.5202 19.2512 21.6913 19.4208 21.8125C19.5904 21.9337 19.7936 21.9988 20.0021 21.9988C20.2105 21.9988 20.4138 21.9337 20.5834 21.8125C20.753 21.6913 20.8805 21.5202 20.9481 21.323L21.0781 20.945C21.3781 20.066 22.0681 19.375 22.9481 19.075L23.3251 18.946C23.5223 18.8784 23.6934 18.7509 23.8146 18.5813C23.9358 18.4117 24.0009 18.2085 24.0009 18C24.0009 17.7915 23.9358 17.5883 23.8146 17.4187C23.6934 17.2491 23.5223 17.1216 23.3251 17.054L22.9471 16.924C22.5132 16.7759 22.1191 16.5303 21.7949 16.2062C21.4708 15.882 21.2252 15.4879 21.0771 15.054L20.9481 14.677C20.8807 14.4796 20.7533 14.3082 20.5837 14.1868C20.414 14.0654 20.2107 14.0001 20.0021 14ZM27.0021 9C27.3631 9 27.6001 9.187 27.6961 9.277C27.8121 9.387 27.8941 9.527 27.9651 9.668C28.0593 9.83188 28.198 9.96572 28.3651 10.054C28.4981 10.127 28.6221 10.196 28.7291 10.31C28.9041 10.4971 29.0015 10.7438 29.0015 11C29.0015 11.2562 28.9041 11.5029 28.7291 11.69C28.6221 11.804 28.4991 11.873 28.3641 11.946C28.197 12.0343 28.0583 12.1681 27.9641 12.332C27.8871 12.476 27.8171 12.608 27.6961 12.722C27.5084 12.9 27.2597 12.9991 27.0011 12.9991C26.7425 12.9991 26.4937 12.9 26.3061 12.722C26.1861 12.609 26.1161 12.475 26.0391 12.332C25.9449 12.1681 25.8062 12.0343 25.6391 11.946C25.5039 11.8822 25.3808 11.7956 25.2751 11.69C25.1002 11.5028 25.003 11.256 25.0032 10.9998C25.0033 10.7436 25.1009 10.497 25.2761 10.31C25.3818 10.2044 25.5049 10.1178 25.6401 10.054C25.8072 9.96572 25.9459 9.83188 26.0401 9.668C26.1161 9.525 26.1871 9.391 26.3071 9.278C26.4021 9.186 26.6401 9 27.0021 9Z"
      fill="#A2CE3A"
    />
  </svg>
);

// Each feature corresponds to a progress bar position
const features = [
  {
    id: 1,
    title: "Forces accountability",
    barIndex: 0, // Shows when first bar fills
  },
  {
    id: 2,
    title: "Guides real skill growth",
    barIndex: 1, // Shows when second bar fills
  },
  {
    id: 3,
    title: "Aligns your profile with market reality",
    barIndex: 2, // Shows when third bar fills
  },
  {
    id: 4,
    title: "Identifies experience gaps",
    barIndex: 3, // Shows when fourth bar fills
  },
];

// Progress bar colors for each position
const progressBarColors = ["#A2CE3A", "#FF8C42", "#4A90E2", "#A2CE3A"];

export default function WhyTalentLoopDifferent() {
  const [activeBarIndex, setActiveBarIndex] = useState(0);

  useEffect(() => {
    const barInterval = setInterval(() => {
      setActiveBarIndex((prev) => {
        // After all 4 bars are filled, reset to start
        if (prev >= 3) {
          return 0;
        }
        return prev + 1;
      });
    }, 2000); // Each bar fills in 2 seconds

    return () => clearInterval(barInterval);
  }, []);

  // Get the current feature based on active bar
  const currentFeature = features[activeBarIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative bg-[#0B0D0F] py-7 lg:pt-10 lg:mt-7 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Main Heading */}
            <Fade direction="down" triggerOnce duration={2000}>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-mona-sans font-bold text-white leading-tight">
                WHY TALENTLOOP.AI IS DIFFERENT
              </h1>
            </Fade>

            {/* Subheading */}
            <div className="space-y-2">
              <Fade direction="down" triggerOnce duration={2000}>
                <p className="text-xl lg:text-2xl font-mona-sans font-semibold">
                  <span className="text-white">
                    We Don't Just Make You Look Good.{" "}
                  </span>
                  <span className="text-[#A2CE3A]">We Make You Better.</span>
                </p>
              </Fade>
            </div>

            {/* Description */}
            <p className="text-white font-sora text-base lg:text-lg">
              Most platforms stop at, CV rewriting, Job applications
            </p>
          </div>

          {/* Right Side - Animated Feature Card */}
          <div className="space-y-4">
            <Fade direction="down" triggerOnce duration={2000}>
              <h2 className="text-2xl lg:text-3xl font-mona-sans font-medium text-[#A2CE3A]">
                TalentLoop goes further:
              </h2>
            </Fade>

            {/* Feature Card */}
            <div className="relative">
              <div className="bg-[#FFFFFF1A] backdrop-blur-lg border border-[#FFFFFF] rounded-[24px] p-6 lg:p-8 transition-all duration-500">
                {/* Icon and Title with AnimatePresence */}

                <div className="flex items-center gap-4 mb-6">
                  <TargetIcon />
                  <motion.div
                    key={activeBarIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className=""
                  >
                    <h3 className="text-xl lg:text-2xl font-mona-sans font-semibold text-white">
                      {currentFeature.title}
                    </h3>
                  </motion.div>
                </div>

                {/* Progress Bars */}
                <div className="flex gap-3 lg:gap-4">
                  {progressBarColors.map((color, index) => {
                    const shouldFill = index <= activeBarIndex;

                    return (
                      <div
                        key={index}
                        className="flex-1 h-[8px] rounded-full overflow-hidden border-2 border-white bg-[#E5E7EB]"
                      >
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: "0%" }}
                          animate={{
                            width: shouldFill ? "100%" : "0%",
                            backgroundColor: shouldFill ? color : "#E5E7EB",
                          }}
                          transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Optional: All Features List (for mobile) */}
            <div className="lg:hidden space-y-3 mt-8">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => {
                    setActiveBarIndex(index);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    index === activeBarIndex
                      ? "bg-[#A2CE3A]/10 border border-[#A2CE3A]/30"
                      : "bg-[#1A1D21]/50 border border-transparent"
                  }`}
                >
                  <p className="text-white font-sora text-sm">
                    {feature.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 lg:w-96 lg:h-96 bg-[#A2CE3A] rounded-full opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-64 h-64 lg:w-96 lg:h-96 bg-[#A2CE3A] rounded-full opacity-5 blur-3xl pointer-events-none" />
    </motion.section>
  );
}
