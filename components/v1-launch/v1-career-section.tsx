"use client";

import { motion } from "framer-motion";

const SeparatorDot = () => (
 <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_1458)">
<rect x="8" y="8" width="16" height="16" rx="8" fill="#A2CE3A"/>
</g>
<defs>
<filter id="filter0_d_1_1458" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="8" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1_1458"/>
<feOffset/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.635294 0 0 0 0 0.807843 0 0 0 0 0.227451 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_1458"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_1458" result="shape"/>
</filter>
</defs>
</svg>

);

const steps = [
  {
    number: "01",
    title: "Optimization and positioning:",
    description: "Build a market-ready professional profile. Before opportunities can find you, your career story must be clear, compelling, and aligned with the roles you're targeting."
  },
  {
    number: "02",
    title: "Launch a strategic job search:",
    description: "We help clients execute a structured and targeted search designed to generate traction."
  },
  {
    number: "03",
    title: "Turn opportunities into interviews and offers:",
    description: "This phase focuses on helping clients perform confidently throughout the hiring process."
  },
  {
    number: "04",
    title: "Build long-term career momentum:",
    description: "The goal isn't just securing one opportunity; it's building a stronger career trajectory and ensuring success after placement."
  }
];

export default function V1CareerSection() {
  return (
    <section className="relative py-10 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-5 mb-5 lg:mb-10"
        >
          <h2 className="text-[22px] lg:text-5xl font-semibold leading-tight mb-5">
            <span className="text-white font-mona-sans">An Operating System For </span>
            <br />
            <span className="text-[#A2CE3A] font-mona-sans">Your Career.</span>
          </h2>
 <span className="text-sm lg:text-lg font-mona-sans text-white leading-tight">
          Four deliberate steps that take you from generic applicant to strategically 
          <br/>
          positioned candidate.
          </span>
        </motion.div>


        {/* Timeline Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative flex gap-5 last:mb-0"
            >
              {/* Left Side - Separator Dot and Line */}
              <div className="flex flex-col items-center">
                <SeparatorDot />
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-[#A2CE3A]/30 mt-2"></div>
                )}
              </div>

              {/* Right Side - Content */}
              <div className="flex-1 pb-8">
                <div className="mb-3">
                  <span className="text-[#A2CE3A] font-mona-sans text-sm font-semibold">
                    Phase {step.number}
                  </span>
                </div>
                <h3 className="text-lg lg:text-3xl font-mona-sans font-bold text-[#F3F4F6] mb-1">
                  {step.title}
                </h3>
                <p className="text-[#9CA3AF] font-jakarta-sans text-sm lg:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
