"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import * as Select from "@radix-ui/react-select";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl, getAuthHeaders } from "@/lib/api";

interface CareerInfoSectionProps {
  onBack: () => void;
  onProceed: (careerData: CareerFormData) => void;
  initialData?: any;
}

export interface CareerFormData {
  careerPath: string;
  preferredIndustries: string[];
  preferredJobTitles: string;
  currentJobTitle: string;
  currentCompanyName: string;
  yearsOfExperience: string;
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

const careerPaths = [
  "Data & Analytics",
  "Project & Delivery Management",
  "Cybersecurity & GRC",
  "Healthcare & Support",
  "Lecturing & Research",
  "Design & Creative",
  "Engineering",
  "Others",
];

const industries = [
  "Information Technology (IT)",
  "Data Science and Analytics",
  "Finance and Banking",
  "Healthcare and Pharmaceuticals",
  "E-commerce",
  "Education and EdTech",
  "Engineering and Manufacturing",
  "Marketing and Advertising",
  "Media and Entertainment",
  "Consulting",
  "Telecommunications",
  "Retail and Consumer Goods",
  "Logistics and Supply Chain",
  "Energy and Utilities",
  "Construction and Real Estate",
  "Legal Services",
  "Oil and Gas",
  "Venture Capital and Private Equity",
  "Architecture and Design",
  "Fintech",
  "Arts and Culture",
  "Blockchain and Cryptocurrency",
  "Retail Banking and Financial Services",
  "Supply Chain and Procurement",
  "Space Technology",
  "Renewable Energy and Green Technology",
  "Non-Profit and NGOs",
  "Human Resources and Recruitment",
  "Automotive and Transportation",
  "Aerospace and Defense",
  "Agriculture and Agribusiness",
  "Hospitality and Tourism",
  "Fashion and Apparel",
  "Food and Beverage",
  "Insurance",
  "Cybersecurity",
  "Biotechnology",
  "Sports and Recreation",
  "Environmental and Sustainability",
  "Government and Public Sector",
];

const experienceLevels = [
  "Less than 1 year",
  "1–3 years",
  "4–6 years",
  "7–9 years",
  "10+ years",
];

export default function CareerInfoSection({
  onBack,
  onProceed,
  initialData,
}: CareerInfoSectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CareerFormData>({
    careerPath: initialData?.career_path || "",
    preferredIndustries: initialData?.preferred_industries ?? [],
    preferredJobTitles: initialData?.preferred_job_titles ? initialData.preferred_job_titles.join(", ") : "",
    currentJobTitle: initialData?.current_job_title || "",
    currentCompanyName: initialData?.current_company || "",
    yearsOfExperience: initialData?.years_of_experience || "",
  });
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const industryDropdownRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (industryDropdownRef.current && !industryDropdownRef.current.contains(e.target as Node)) {
        setIndustryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleIndustry = useCallback((industry: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredIndustries: prev.preferredIndustries.includes(industry)
        ? prev.preferredIndustries.filter((i) => i !== industry)
        : [...prev.preferredIndustries, industry],
    }));
  }, []);

  useEffect(() => {
    if (initialData && !seeded.current) {
      seeded.current = true;
      setFormData({
        careerPath: initialData.career_path || "",
        preferredIndustries: initialData.preferred_industries ?? [],
        preferredJobTitles: initialData.preferred_job_titles ? initialData.preferred_job_titles.join(", ") : "",
        currentJobTitle: initialData.current_job_title || "",
        currentCompanyName: initialData.current_company || "",
        yearsOfExperience: initialData.years_of_experience || "",
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
      const response = await fetch(`${getApiUrl()}/api/v1/profile/career-info`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          career_path: formData.careerPath,
          current_job_title: formData.currentJobTitle,
          current_company: formData.currentCompanyName,
          years_of_experience: formData.yearsOfExperience,
          preferred_industries: formData.preferredIndustries,
          preferred_job_titles: formData.preferredJobTitles ? formData.preferredJobTitles.split(",").map(t => t.trim()).filter(Boolean) : [],
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
            title: "Failed to save career info",
            description: firstErrorMessage || data.message || "An error occurred",
          });
        } else {
          toast({
            variant: "error",
            title: "Failed to save career info",
            description: data.message || "An error occurred",
          });
        }
        setLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Career info saved!",
        description: "Your career information has been updated successfully",
      });

      onProceed(formData);
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "An error occurred while saving career info",
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

            {/* Right Section - Career Info */}
            <div className="lg:w-[70%] space-y-6">
              {/* Header with Progress */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl lg:text-3xl font-clash-display font-semibold" style={{ color: "#E8EFF1" }}>
                  Career Info
                </h2>
                <div
                  className="inline-flex items-center justify-center h-[28px] px-4 rounded-[32px]"
                  style={{
                    background: "#00C0630D",
                    border: "1.5px solid #00C06326",
                  }}
                >
                  <span className="text-[#00C063] font-mona-sans text-sm font-semibold">
                    2/6
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="rounded-[24px] p-6 space-y-6" style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Career Path of Interest */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Career Path of Interest
                    </label>
                    <Select.Root value={formData.careerPath} onValueChange={(value) => setFormData({ ...formData, careerPath: value })}>
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
                            {careerPaths.map((path) => (
                              <Select.Item
                                key={path}
                                value={path}
                                className="relative flex items-center px-4 py-2 text-sm text-white rounded-[8px] outline-none cursor-pointer hover:bg-white/10 data-[highlighted]:bg-white/10 data-[state=checked]:bg-white/20"
                              >
                                <Select.ItemText>{path}</Select.ItemText>
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

                  {/* Preferred Industries - Multiselect */}
                  <div className="space-y-3" ref={industryDropdownRef}>
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Preferred Industries
                    </label>
                    <div className="relative">
                      {/* Trigger — tag pills display */}
                      <div
                        onClick={() => setIndustryDropdownOpen((o) => !o)}
                        className="w-full min-h-[56px] rounded-[16px] px-4 py-2 font-sora text-sm text-white cursor-pointer flex flex-wrap items-center gap-2"
                        style={{ background: "transparent", border: "1px solid #FFFFFF1A" }}
                      >
                        {formData.preferredIndustries.length === 0 ? (
                          <span className="text-white/40 flex-1">Select</span>
                        ) : (
                          <div className="flex flex-wrap gap-2 flex-1">
                            {formData.preferredIndustries.map((ind) => (
                              <span
                                key={ind}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-sora"
                                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                              >
                                {ind}
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); toggleIndustry(ind); }}
                                  className="text-white/50 hover:text-white transition-colors leading-none"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 ml-auto transition-transform ${industryDropdownOpen ? "rotate-180" : ""}`}>
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {/* Dropdown */}
                      {industryDropdownOpen && (
                        <div
                          className="absolute left-0 right-0 mt-2 rounded-[12px] shadow-lg z-[9999] overflow-y-auto max-h-[280px]"
                          style={{ background: "#0F1416", border: "1px solid #FFFFFF1A" }}
                        >
                          {industries.map((industry) => {
                            const selected = formData.preferredIndustries.includes(industry);
                            return (
                              <button
                                key={industry}
                                type="button"
                                onClick={() => toggleIndustry(industry)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors"
                              >
                                {/* Square checkbox */}
                                <span
                                  className="flex-shrink-0 w-4 h-4 rounded-[4px] flex items-center justify-center"
                                  style={{
                                    background: selected ? "#A2CE3A" : "transparent",
                                    border: selected ? "none" : "1.5px solid rgba(255,255,255,0.3)",
                                  }}
                                >
                                  {selected && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                      <path d="M1 4L3.5 6.5L9 1" stroke="#0B0D0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </span>
                                <span>{industry}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preferred Job titles */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Preferred Job titles
                    </label>
                    <input
                      type="text"
                      value={formData.preferredJobTitles}
                      placeholder="Enter multiple titles but separate with comma."
                      onChange={(e) => setFormData({ ...formData, preferredJobTitles: e.target.value })}
                      className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                      }}
                    />
                  </div>

                  {/* Current Job title */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Current Job title
                    </label>
                    <input
                      type="text"
                      value={formData.currentJobTitle}
                      onChange={(e) => setFormData({ ...formData, currentJobTitle: e.target.value })}
                      className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                      }}
                    />
                  </div>

                  {/* Current Company Name */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Current Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.currentCompanyName}
                      onChange={(e) => setFormData({ ...formData, currentCompanyName: e.target.value })}
                      className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                      }}
                    />
                  </div>

                  {/* Years of Experience in Desired Field */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Years of Experience in Desired Field
                    </label>
                    <Select.Root value={formData.yearsOfExperience} onValueChange={(value) => setFormData({ ...formData, yearsOfExperience: value })}>
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
                          <Select.Viewport className="p-1">
                            {experienceLevels.map((level) => (
                              <Select.Item
                                key={level}
                                value={level}
                                className="relative flex items-center px-4 py-2 text-sm text-white rounded-[8px] outline-none cursor-pointer hover:bg-white/10 data-[highlighted]:bg-white/10 data-[state=checked]:bg-white/20"
                              >
                                <Select.ItemText>{level}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
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
