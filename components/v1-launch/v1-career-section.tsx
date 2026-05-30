"use client";

import { motion } from "framer-motion";

const SeparatorDot = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1782_3041)">
      <rect x="8" y="8" width="16" height="16" rx="8" fill="#A2CE3A"/>
    </g>
    <defs>
      <filter id="filter0_d_1782_3041" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feMorphology radius="8" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1782_3041"/>
        <feOffset/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.635294 0 0 0 0 0.807843 0 0 0 0 0.227451 0 0 0 0.2 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1782_3041"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1782_3041" result="shape"/>
      </filter>
    </defs>
  </svg>
);

const steps = [
  {
    number: "01",
    title: "Upload your existing CV",
    description: "We assess positioning, ATS compatibility, market competitiveness, visa eligibility, and career alignment in a single audit."
  },
  {
    number: "02",
    title: "Rebuild your CV",
    description: "We rebuild your CV, LinkedIn, cover letters, and application strategy with sharp, role-specific language designed to convert."
  },
  {
    number: "03",
    title: "Targeted applications",
    description: "For Premium and above, dedicated managers apply on your behalf strategically targeted, professionally tracked, interview-focused."
  },
  {
    number: "04",
    title: "Interview support",
    description: "We prep you using the actual CV version submitted, with role-specific coaching and tailored mock sessions until you're ready to compete."
  }
];

export default function V1CareerSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-6xl font-mona-sans font-bold leading-tight">
            <span className="text-white">An Operating System For </span>
            <br />
            <span className="text-[#A2CE3A]">Your Career.</span>
          </h2>
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
              className="relative flex gap-8 mb-16 last:mb-0"
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
                    Step {step.number}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-white/60 font-sora text-base leading-relaxed">
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
