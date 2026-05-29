"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Select from "@radix-ui/react-select";

interface EducationalInfoSectionProps {
  onBack: () => void;
  onProceed: (educationData: EducationFormData) => void;
}

export interface EducationFormData {
  highestDegree: string;
  institutionName: string;
  graduationYear: string;
}

const CheckedSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" rx="10" fill="#A2CE3A"/>
    <path d="M15.25 6.39062L8.03125 13.6094L4.75 10.3281" stroke="#F6FAEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CurrentStepSVG = ({ number }: { number: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" rx="10" fill="#F6FAEB"/>
    <text x="10" y="14" textAnchor="middle" fill="#7A9B2C" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans">
      {number}
    </text>
  </svg>
);

const InactiveSVG = ({ number }: { number: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" rx="10" fill="#F6FAEB"/>
    <text x="10" y="14" textAnchor="middle" fill="#7A9B2C" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans">
      {number}
    </text>
  </svg>
);

const degrees = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
  "Professional Certification",
  "Bootcamp Certificate",
  "Online Course Certificate",
  "Other",
];

// Generate years from current year back to 1960
const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: currentYear - 1959 }, (_, i) => String(currentYear - i));

export default function EducationalInfoSection({
  onBack,
  onProceed,
}: EducationalInfoSectionProps) {
  const [formData, setFormData] = useState<EducationFormData>({
    highestDegree: "",
    institutionName: "",
    graduationYear: "",
  });

  const steps = [
    { number: "1", label: "Checkout", completed: true },
    { number: "2", label: "Personal Details", completed: true },
    { number: "3", label: "Complete profile", completed: false, current: true },
  ];

  const handleProceed = () => {
    onProceed(formData);
  };

  return (
    <div className="min-h-screen bg-[#01090B] py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-mona-sans font-bold text-white mb-3">
            Complete Profile To Confirm Enrollment
          </h1>
          <p className="text-white/60 font-plus-jakarta text-base">
            Complete your enrollment profile
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[24px] p-4 lg:p-6"
          style={{
            background: "#1E1F2180",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section - Progress Steps */}
            <div
              className="lg:w-[30%] h-fit rounded-[24px] p-4 lg:p-7"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}
            >
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {step.completed ? (
                      <CheckedSVG />
                    ) : step.current ? (
                      <CurrentStepSVG number={step.number} />
                    ) : (
                      <InactiveSVG number={step.number} />
                    )}
                    <span
                      className="font-plus-jakarta text-sm font-medium"
                      style={{
                        color: "#F1F8E1",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Educational Info */}
            <div className="lg:w-[70%] space-y-6">
              {/* Header with Progress */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl lg:text-3xl font-clash-display font-semibold" style={{ color: "#E8EFF1" }}>
                  Educational Info
                </h2>
                <span className="text-sm font-plus-jakarta" style={{ color: "#A2CE3A" }}>
                  4/7
                </span>
              </div>

              {/* Content Container */}
              <div className="rounded-[24px] p-6 space-y-6" style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}>

                {/* Highest Degree or Certification Achieved */}
                <div className="space-y-3">
                  <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                    Highest Degree or Certification Achieved
                  </label>
                  <Select.Root value={formData.highestDegree} onValueChange={(value) => setFormData({ ...formData, highestDegree: value })}>
                    <Select.Trigger
                      className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all flex items-center justify-between"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                      }}
                    >
                      <Select.Value placeholder="Select" />
                      <Select.Icon>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content
                        className="overflow-hidden rounded-[12px] shadow-lg z-[9999]"
                        style={{
                          background: "#0F1416",
                          border: "1px solid #FFFFFF1A",
                          maxHeight: "300px",
                        }}
                        position="popper"
                        sideOffset={5}
                      >
                        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white/5 text-white cursor-default">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6.5L6 1.5L1 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Select.ScrollUpButton>
                        <Select.Viewport className="p-1">
                          {degrees.map((degree) => (
                            <Select.Item
                              key={degree}
                              value={degree}
                              className="relative flex items-center px-4 py-2 text-sm text-white rounded-[8px] outline-none cursor-pointer hover:bg-white/10 data-[highlighted]:bg-white/10 data-[state=checked]:bg-white/20"
                            >
                              <Select.ItemText>{degree}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                        <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white/5 text-white cursor-default">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>

                {/* Institution Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                    Institution Name
                  </label>
                  <input
                    type="text"
                    value={formData.institutionName}
                    onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                    className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                    style={{
                      background: "transparent",
                      border: "1px solid #FFFFFF1A",
                    }}
                  />
                </div>

                {/* Graduation Year */}
                <div className="space-y-3">
                  <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                    Graduation Year
                  </label>
                  <Select.Root value={formData.graduationYear} onValueChange={(value) => setFormData({ ...formData, graduationYear: value })}>
                    <Select.Trigger
                      className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all flex items-center justify-between"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                      }}
                    >
                      <Select.Value placeholder="Select" />
                      <Select.Icon>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content
                        className="overflow-hidden rounded-[12px] shadow-lg z-[9999]"
                        style={{
                          background: "#0F1416",
                          border: "1px solid #FFFFFF1A",
                          maxHeight: "300px",
                        }}
                        position="popper"
                        sideOffset={5}
                      >
                        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white/5 text-white cursor-default">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6.5L6 1.5L1 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Select.ScrollUpButton>
                        <Select.Viewport className="p-1">
                          {graduationYears.map((year) => (
                            <Select.Item
                              key={year}
                              value={year}
                              className="relative flex items-center px-4 py-2 text-sm text-white rounded-[8px] outline-none cursor-pointer hover:bg-white/10 data-[highlighted]:bg-white/10 data-[state=checked]:bg-white/20"
                            >
                              <Select.ItemText>{year}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                        <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white/5 text-white cursor-default">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center gap-4 pt-6">
                <button
                  onClick={onBack}
                  className="px-8 h-[52px] rounded-[100px] font-sora text-base font-semibold transition-opacity hover:opacity-80"
                  style={{
                    background: "transparent",
                    border: "1px solid #FFFFFF33",
                    color: "#FFFFFF",
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleProceed}
                  className="w-fit px-8 h-[52px] rounded-[100px] font-sora text-base font-semibold transition-opacity hover:opacity-90"
                  style={{
                    background: "#A2CE3A",
                    border: "1px solid #448290",
                    color: "#000000",
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
