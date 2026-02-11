"use client";

import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

const CheckmarkSmallSVG = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <path
      d="M15.75 2.08801C14.2306 1.20874 12.5055 0.747119 10.75 0.750014C5.227 0.750014 0.75 5.22701 0.75 10.75C0.75 16.273 5.227 20.75 10.75 20.75C16.273 20.75 20.75 16.273 20.75 10.75C20.7487 10.0633 20.682 9.39668 20.55 8.75001"
      stroke="#A2CE3A"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.75 11.25C6.75 11.25 8.25 11.25 10.25 14.75C10.25 14.75 15.809 5.583 20.75 3.75"
      stroke="#A2CE3A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const helpItems = [
  "Behavioral & situational interviews",
  "Case-based and scenario questions",
  "Storytelling using STAR & CAR frameworks",
  "Interview mindset and pressure handling",
  "Communication clarity and confidence",
  "Market-specific interview expectations (UK / US / Canada)",
];

export default function CoachHelpsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#1E1F21] rounded-[16px] px-6 lg:px-10 py-8 lg:py-10"
    >
      <Fade direction="up" triggerOnce duration={1500}>
        <h2 className="text-white text-2xl lg:text-[28px] font-mona-sans font-bold leading-tight mb-6">
          What this Coach Helps You With
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-[#ECF8C7] rounded-[12px] p-5 lg:p-6"
            >
              <CheckmarkSmallSVG />
              <p className="text-[#0B0D0F] text-sm lg:text-base font-mona-sans font-medium mt-3 leading-snug">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </Fade>
    </motion.section>
  );
}
