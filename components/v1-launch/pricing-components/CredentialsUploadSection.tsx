"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as Select from "@radix-ui/react-select";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl, getAuthHeaders } from "@/lib/api";

interface CredentialsUploadSectionProps {
  onBack: () => void;
  onProceed: (credentialsData: CredentialsFormData) => void;
  initialData?: any;
}

export interface CredentialsFormData {
  cvFile: File | null;
  linkedinProfileLink: string;
  needsVisaSponsorship: boolean | null;
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

const visaSponsorshipOptions = [
  "Yes",
  "No",
];

export default function CredentialsUploadSection({
  onBack,
  onProceed,
  initialData,
}: CredentialsUploadSectionProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CredentialsFormData>({
    cvFile: null,
    linkedinProfileLink: initialData?.linkedin_url || "",
    needsVisaSponsorship: initialData?.needs_visa_sponsorship !== undefined ? initialData.needs_visa_sponsorship : null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const seeded = useRef(false);

  useEffect(() => {
    if (initialData && !seeded.current) {
      seeded.current = true;
      setFormData((prev) => ({
        ...prev,
        linkedinProfileLink: initialData.linkedin_url || "",
        needsVisaSponsorship: initialData.needs_visa_sponsorship !== undefined
          ? initialData.needs_visa_sponsorship
          : null,
      }));
    }
  }, [initialData]);

  const steps = [
    { number: "1", label: "Checkout", completed: true },
    { number: "2", label: "Personal Details", completed: true },
    { number: "3", label: "Complete profile", completed: false, current: true },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cvFile: e.target.files[0] });
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
      setFormData({ ...formData, cvFile: e.dataTransfer.files[0] });
    }
  };

  const handleProceed = async () => {
    // Validation
    if (!formData.cvFile) {
      toast({
        variant: "error",
        title: "CV Required",
        description: "Please upload your CV to continue",
      });
      return;
    }

    if (!formData.linkedinProfileLink) {
      toast({
        variant: "error",
        title: "LinkedIn Profile Required",
        description: "Please provide your LinkedIn profile URL",
      });
      return;
    }

    if (formData.needsVisaSponsorship === null) {
      toast({
        variant: "error",
        title: "Visa Sponsorship Required",
        description: "Please indicate if you need visa sponsorship",
      });
      return;
    }

    try {
      setLoading(true);

      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("cv", formData.cvFile);
      formDataToSend.append("category", "cv");
      formDataToSend.append("linkedin_url", formData.linkedinProfileLink);
      formDataToSend.append("needs_visa_sponsorship", formData.needsVisaSponsorship ? "1" : "0");

      // Get auth headers (without Content-Type for FormData)
      const headers = await getAuthHeaders() as Record<string, string>;
      // Remove Content-Type to let browser set it with boundary
      delete headers["Content-Type"];

      const response = await fetch(`${getApiUrl()}/api/v1/profile/credentials`, {
        method: "POST",
        headers,
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];
          toast({
            variant: "error",
            title: "Validation Error",
            description: firstErrorMessage || data.message || "Failed to save credentials",
          });
        } else {
          toast({
            variant: "error",
            title: "Error",
            description: data.message || "Failed to save credentials",
          });
        }
        setLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Credentials Saved!",
        description: "Your credentials have been saved successfully",
      });

      setLoading(false);
      onProceed(formData);
    } catch (error: any) {
      console.error("Error saving credentials:", error);
      toast({
        variant: "error",
        title: "Error",
        description: "Failed to save credentials. Please try again.",
      });
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

            {/* Right Section - Credentials Upload */}
            <div className="lg:w-[70%] space-y-6">
              {/* Header with Progress */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl lg:text-3xl font-clash-display font-semibold" style={{ color: "#E8EFF1" }}>
                  Credentials Upload
                </h2>
                <div
                  className="inline-flex items-center justify-center h-[28px] px-4 rounded-[32px]"
                  style={{
                    background: "#00C0630D",
                    border: "1.5px solid #00C06326",
                  }}
                >
                  <span className="text-[#00C063] font-mona-sans text-sm font-semibold">
                    6/7
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="rounded-[24px] p-6 space-y-6" style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}>

                {/* File Upload Area */}
                <div className="space-y-4">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="relative rounded-[12px] border-2 border-dashed p-12 text-center cursor-pointer transition-all hover:border-[#A2CE3A]/50"
                    style={{
                      borderColor: isDragging ? "#A2CE3A" : "#FFFFFF33",
                      background: isDragging ? "rgba(162, 206, 58, 0.05)" : "transparent",
                    }}
                    onClick={() => document.getElementById("cv-upload")?.click()}
                  >
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    <div className="space-y-2">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto opacity-50">
                        <path d="M40 28V38C40 39.0609 39.5786 40.0783 38.8284 40.8284C38.0783 41.5786 37.0609 42 36 42H12C10.9391 42 9.92172 41.5786 9.17157 40.8284C8.42143 40.0783 8 39.0609 8 38V28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M32 16L24 8L16 16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M24 8V30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-sm font-plus-jakarta font-medium" style={{ color: "#FFFFFF" }}>
                        Click or Drag and drop files here to upload
                      </p>
                      <p className="text-xs font-plus-jakarta" style={{ color: "#FFFFFF99" }}>
                        CV, Cover Letter, or any career document · Max 10MB · .DOCX
                      </p>
                    </div>
                  </div>

                  {/* Uploaded File Display */}
                  {formData.cvFile && (
                    <div
                      className="flex items-center gap-3 p-4 rounded-[12px]"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid #FFFFFF1A",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.667 1.66699H5.00033C4.55829 1.66699 4.13437 1.84259 3.82181 2.15515C3.50925 2.46771 3.33366 2.89163 3.33366 3.33366V16.667C3.33366 17.109 3.50925 17.5329 3.82181 17.8455C4.13437 18.1581 4.55829 18.3337 5.00033 18.3337H15.0003C15.4424 18.3337 15.8663 18.1581 16.1788 17.8455C16.4914 17.5329 16.667 17.109 16.667 16.667V6.66699L11.667 1.66699Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.667 1.66699V6.66699H16.667" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-plus-jakarta text-white flex-1">
                        {formData.cvFile.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Two Column Layout - LinkedIn & Visa Sponsorship */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* LinkedIn Profile Link */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Paste your LinkedIn Profile Link
                    </label>
                    <input
                      type="url"
                      value={formData.linkedinProfileLink}
                      onChange={(e) => setFormData({ ...formData, linkedinProfileLink: e.target.value })}
                      placeholder="https://www.linkedin.com/in/yourprofile"
                      className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                      }}
                    />
                  </div>

                  {/* Visa Sponsorship */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Do You Need Visa Sponsorship?
                    </label>
                  <Select.Root 
                    value={formData.needsVisaSponsorship === null ? "" : formData.needsVisaSponsorship.toString()} 
                    onValueChange={(value) => setFormData({ ...formData, needsVisaSponsorship: value === "true" })}
                  >
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
                        }}
                        position="popper"
                        sideOffset={5}
                      >
                        <Select.Viewport className="p-1">
                          {visaSponsorshipOptions.map((option) => (
                            <Select.Item
                              key={option}
                              value={option === "Yes" ? "true" : "false"}
                              className="relative flex items-center px-4 py-2 text-sm text-white rounded-[8px] outline-none cursor-pointer hover:bg-white/10 data-[highlighted]:bg-white/10 data-[state=checked]:bg-white/20"
                            >
                              <Select.ItemText>{option}</Select.ItemText>
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
