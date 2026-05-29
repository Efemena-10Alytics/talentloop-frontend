"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CompleteProfileSectionProps {
  packageName: string;
  onBack: () => void;
  onProceed: (receiptFile: File | null) => void;
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

export default function CompleteProfileSection({
  packageName,
  onBack,
  onProceed,
}: CompleteProfileSectionProps) {
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const steps = [
    { number: "1", label: "Checkout", completed: true },
    { number: "2", label: "Personal Details", completed: true },
    { number: "3", label: "Complete profile", completed: false, current: true },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setReceiptFile(e.dataTransfer.files[0]);
    }
  };

  const handleProceed = () => {
    onProceed(receiptFile);
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

            {/* Right Section - Payment Info */}
            <div className="lg:w-[70%] space-y-6">
              {/* Header with Progress */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl lg:text-3xl font-clash-display font-semibold" style={{ color: "#E8EFF1" }}>
                  Payment Info
                </h2>
                <span className="text-sm font-plus-jakarta" style={{ color: "#A2CE3A" }}>
                  2/7
                </span>
              </div>

              {/* Content Container */}
              <div className="rounded-[24px] p-6 space-y-6" style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}>

                {/* Package Registered For */}
                <div className="space-y-3">
                  <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                    Package Registered For:
                  </label>
                  <div
                    className="w-full rounded-[40px] px-4 h-[56px] flex items-center font-sora text-sm"
                    style={{
                      background: "transparent",
                      border: "1px solid #FFFFFF1A",
                      color: "#FFFFFF",
                    }}
                  >
                    {packageName}
                  </div>
                </div>

                {/* Payment Receipt Upload */}
                <div className="space-y-3">
                  <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                    Kindly upload your payment receipt (please use an image format)
                  </label>
                  <p className="text-xs font-plus-jakarta" style={{ color: "#FFFFFF99" }}>
                    You can upload a SCREENSHOT
                  </p>

                  {/* File Upload Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="relative rounded-[12px] border-2 border-dashed p-12 text-center cursor-pointer transition-all hover:border-[#A2CE3A]/50"
                    style={{
                      borderColor: isDragging ? "#A2CE3A" : "#FFFFFF33",
                      background: isDragging ? "rgba(162, 206, 58, 0.05)" : "transparent",
                    }}
                    onClick={() => document.getElementById("receipt-upload")?.click()}
                  >
                    <input
                      id="receipt-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  
                    {receiptFile ? (
                      <div className="space-y-2">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                        <path d="M38 18L24 32L10 18" stroke="#A2CE3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M24 32V8" stroke="#A2CE3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M40 40H8" stroke="#A2CE3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-sm font-plus-jakarta font-medium" style={{ color: "#A2CE3A" }}>
                        {receiptFile.name}
                      </p>
                      <p className="text-xs font-plus-jakarta" style={{ color: "#FFFFFF99" }}>
                        {(receiptFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto opacity-50">
                        <path d="M40 28V38C40 39.0609 39.5786 40.0783 38.8284 40.8284C38.0783 41.5786 37.0609 42 36 42H12C10.9391 42 9.92172 41.5786 9.17157 40.8284C8.42143 40.0783 8 39.0609 8 38V28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M32 16L24 8L16 16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M24 8V30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-sm font-plus-jakarta font-medium" style={{ color: "#FFFFFF" }}>
                        Click here to upload
                      </p>
                      <p className="text-xs font-plus-jakarta" style={{ color: "#FFFFFF99" }}>
                        JPEG, PNG, PDF · Max 10MB
                      </p>
                    </div>
                  )}
                  </div>
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
