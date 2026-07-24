"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl, getAuthHeaders } from "@/lib/api";

interface EducationalInfoSectionProps {
  onBack: () => void;
  onProceed: (educationData: EducationFormData) => void;
  initialData?: any;
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
  "Bachelor's Degree",
  "Master's Degree",
  "Ph.D.",
  "Certification (e.g., Scrum Master, Data Analytics)",
  "Other",
];

// Generate years from current year back to 1960
const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: currentYear - 1959 }, (_, i) => String(currentYear - i));

export default function EducationalInfoSection({
  onBack,
  onProceed,
  initialData,
}: EducationalInfoSectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EducationFormData>({
    highestDegree: initialData?.highest_degree || "",
    institutionName: initialData?.institution_name || "",
    graduationYear: initialData?.graduation_year || "",
  });
  const seeded = useRef(false);

  useEffect(() => {
    if (initialData && !seeded.current) {
      seeded.current = true;
      setFormData({
        highestDegree: initialData.highest_degree || "",
        institutionName: initialData.institution_name || "",
        graduationYear: initialData.graduation_year || "",
      });
    }
  }, [initialData]);

  const steps = [
    { number: "1", label: "Checkout", completed: true },
    { number: "2", label: "Personal Details", completed: true },
    { number: "3", label: "Complete profile", completed: false, current: true },
  ];

  const handleProceed = async () => {
    setLoading(true);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/v1/profile/education-info`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          highest_degree: formData.highestDegree,
          institution_name: formData.institutionName,
          graduation_year: formData.graduationYear,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors with specific field messages
        if (data.errors) {
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];
          
          toast({
            variant: "error",
            title: "Failed to save education info",
            description: firstErrorMessage || data.message || "An error occurred",
          });
        } else {
          toast({
            variant: "error",
            title: "Failed to save education info",
            description: data.message || "An error occurred",
          });
        }
        setLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Education info saved!",
        description: "Your educational information has been updated successfully",
      });

      onProceed(formData);
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "An error occurred while saving education info",
      });
    } finally {
      setLoading(false);
    }
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
                <div
                  className="inline-flex items-center justify-center h-[28px] px-4 rounded-[32px]"
                  style={{
                    background: "#00C0630D",
                    border: "1.5px solid #00C06326",
                  }}
                >
                  <span className="text-[#00C063] font-mona-sans text-sm font-semibold">
                    3/6
                  </span>
                </div>
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
                  <Select
                    value={formData.highestDegree}
                    onChange={(value) => setFormData({ ...formData, highestDegree: value })}
                    placeholder="Select"
                    options={degrees.map((degree) => ({ value: degree, label: degree }))}
                  />
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
                  <Select
                    value={formData.graduationYear}
                    onChange={(value) => setFormData({ ...formData, graduationYear: value })}
                    placeholder="Select"
                    options={graduationYears.map((year) => ({ value: year, label: year }))}
                  />
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
                  disabled={loading}
                  className="w-fit px-8 h-[52px] rounded-[100px] font-sora text-base font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "#A2CE3A",
                    border: "1px solid #448290",
                    color: "#000000",
                  }}
                >
                  {loading ? "Saving..." : "Proceed"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
