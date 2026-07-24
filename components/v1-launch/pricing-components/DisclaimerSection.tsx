"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Select } from "@/components/ui/Select";
import FinalOnboardingCompleteModal from "./FinalOnboardingCompleteModal";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl, getAuthHeaders } from "@/lib/api";

interface DisclaimerSectionProps {
  onBack: () => void;
  onProceed: (disclaimerData: DisclaimerFormData) => void;
  initialData?: any;
}

export interface DisclaimerFormData {
  acknowledgeDisclaimer: boolean;
  openToRelocation: string;
  companiesIndustriesToAvoid: string;
  listOfReferences: string;
  strengthsToHighlight: string;
  weaknessesToAddress: string;
  acceptPrivacyPolicy: boolean;
  acceptTermsAndCondition: boolean;
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

const CheckboxUncheckedSVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" stroke="#FFFFFF99"/>
  </svg>
);

const CheckboxCheckedSVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="18" rx="4" fill="#A2CE3A"/>
    <path d="M5 9L8 12L13 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const relocationOptions = [
  "Yes",
  "No",
];

const weaknessOptions = [
  "Select",
  "Time Management",
  "Public Speaking",
  "Technical Skills",
  "Leadership",
  "Communication",
  "Other",
];

export default function DisclaimerSection({
  onBack,
  onProceed,
  initialData,
}: DisclaimerSectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DisclaimerFormData>({
    acknowledgeDisclaimer: initialData?.acknowledged_visa_disclaimer || false,
    openToRelocation: initialData?.open_to_relocation ? "Yes" : "No",
    companiesIndustriesToAvoid: initialData?.companies_to_avoid || "",
    listOfReferences: initialData?.references || "",
    strengthsToHighlight: initialData?.strengths || "",
    weaknessesToAddress: initialData?.weaknesses || "",
    acceptPrivacyPolicy: initialData?.accepted_privacy_policy || false,
    acceptTermsAndCondition: initialData?.accepted_terms || false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const steps = [
    { number: "1", label: "Checkout", completed: true },
    { number: "2", label: "Personal Details", completed: true },
    { number: "3", label: "Complete profile", completed: false, current: true },
  ];

  const canProceed = formData.acknowledgeDisclaimer && formData.acceptPrivacyPolicy && formData.acceptTermsAndCondition;

  const handleProceed = async () => {
    if (!canProceed) {
      toast({
        variant: "error",
        title: "Required fields missing",
        description: "Please accept all required disclaimers and policies",
      });
      return;
    }

    setLoading(true);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/v1/profile/disclaimer`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          open_to_relocation: formData.openToRelocation === "Yes" ? 1 : 0,
          companies_to_avoid: formData.companiesIndustriesToAvoid,
          references: formData.listOfReferences,
          strengths: formData.strengthsToHighlight,
          weaknesses: formData.weaknessesToAddress,
          accepted_privacy_policy: formData.acceptPrivacyPolicy ? 1 : 0,
          accepted_terms: formData.acceptTermsAndCondition ? 1 : 0,
          acknowledged_visa_disclaimer: formData.acknowledgeDisclaimer ? 1 : 0,
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
            title: "Failed to save disclaimer info",
            description: firstErrorMessage || data.message || "An error occurred",
          });
        } else {
          toast({
            variant: "error",
            title: "Failed to save disclaimer info",
            description: data.message || "An error occurred",
          });
        }
        setLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Profile completed!",
        description: "Your enrollment profile has been completed successfully",
      });

      // Call the onProceed callback
      await onProceed(formData);
      // Show success modal
      setShowSuccessModal(true);
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "An error occurred while saving disclaimer info",
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

            {/* Right Section - Disclaimer */}
            <div className="lg:w-[70%] space-y-6">
              {/* Header with Progress */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl lg:text-3xl font-clash-display font-semibold" style={{ color: "#E8EFF1" }}>
                  Disclaimer
                </h2>
                <span className="text-sm font-plus-jakarta" style={{ color: "#A2CE3A" }}>
                  7/7
                </span>
              </div>

              {/* Content Container */}
              <div className="rounded-[24px] p-6 space-y-6" style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}>

                {/* Disclaimer Text with Checkbox */}
                <div className="space-y-4">
                  <p className="text-sm font-plus-jakarta" style={{ color: "#E8EFF1" }}>
                    I understand that TalentLoop does not guarantee visa sponsorship and does not apply exclusively to companies offering sponsorship except otherwise stated in the packages.
                  </p>
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => setFormData({ ...formData, acknowledgeDisclaimer: !formData.acknowledgeDisclaimer })}
                      className="flex-shrink-0 mt-0.5"
                    >
                      {formData.acknowledgeDisclaimer ? <CheckboxCheckedSVG /> : <CheckboxUncheckedSVG />}
                    </button>
                    <span className="text-sm font-plus-jakarta" style={{ color: "#8E8E93" }}>
                      I acknowledge and agree to this.
                    </span>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Are You Open to Relocation? */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Are You Open to Relocation?
                    </label>
                    <Select
                      value={formData.openToRelocation}
                      onChange={(value) => setFormData({ ...formData, openToRelocation: value })}
                      placeholder="Select"
                      options={relocationOptions.map((option) => ({ value: option, label: option }))}
                    />
                  </div>

                  {/* Any Specific Companies/Industries You Want to Avoid? */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Any Specific Companies/Industries You Want to Avoid?
                    </label>
                    <textarea
                      value={formData.companiesIndustriesToAvoid}
                      onChange={(e) => setFormData({ ...formData, companiesIndustriesToAvoid: e.target.value })}
                      className="w-full rounded-[24px] px-4 py-3 font-sora text-sm text-white outline-none transition-all resize-none"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                        minHeight: "56px",
                      }}
                      rows={1}
                    />
                  </div>

                  {/* List of References (Optional) */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      List of References (Optional)
                    </label>
                    <textarea
                      value={formData.listOfReferences}
                      onChange={(e) => setFormData({ ...formData, listOfReferences: e.target.value })}
                      placeholder="(Name, Email, Phone Number, Address, Relationship)"
                      className="w-full rounded-[24px] px-4 py-3 font-sora text-sm text-white outline-none transition-all resize-none placeholder:text-white/40"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                        minHeight: "56px",
                      }}
                      rows={1}
                    />
                  </div>

                  {/* Any Strengths You'd Like to Highlight? */}
                  <div className="space-y-3">
                    <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                      Any Strengths You'd Like to Highlight?
                    </label>
                    <textarea
                      value={formData.strengthsToHighlight}
                      onChange={(e) => setFormData({ ...formData, strengthsToHighlight: e.target.value })}
                      className="w-full rounded-[24px] px-4 py-3 font-sora text-sm text-white outline-none transition-all resize-none"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                        minHeight: "56px",
                      }}
                      rows={1}
                    />
                  </div>
                </div>

                {/* Any Weaknesses You'd Like to Address (Optional)? - Full Width */}
                <div className="space-y-3">
                  <label className="block text-sm font-plus-jakarta font-medium" style={{ color: "#E8EFF1" }}>
                    Any Weaknesses You'd Like to Address (Optional)?
                  </label>
                  <Select
                    value={formData.weaknessesToAddress}
                    onChange={(value) => setFormData({ ...formData, weaknessesToAddress: value })}
                    placeholder="Select"
                    options={weaknessOptions.map((option) => ({ value: option, label: option }))}
                  />
                </div>

                {/* Privacy Policy and Terms Checkboxes */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => setFormData({ ...formData, acceptPrivacyPolicy: !formData.acceptPrivacyPolicy })}
                      className="flex-shrink-0 mt-0.5"
                    >
                      {formData.acceptPrivacyPolicy ? <CheckboxCheckedSVG /> : <CheckboxUncheckedSVG />}
                    </button>
                    <span className="text-sm font-plus-jakarta" style={{ color: "#8E8E93" }}>
                      I Have Read and Accept the Privacy Policy
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => setFormData({ ...formData, acceptTermsAndCondition: !formData.acceptTermsAndCondition })}
                      className="flex-shrink-0 mt-0.5"
                    >
                      {formData.acceptTermsAndCondition ? <CheckboxCheckedSVG /> : <CheckboxUncheckedSVG />}
                    </button>
                    <span className="text-sm font-plus-jakarta" style={{ color: "#8E8E93" }}>
                      I Have Read and Accept the{" "}
                      <a
                        href="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80 transition-opacity"
                        style={{ color: "#A2CE3A" }}
                      >
                        Terms and Condition
                      </a>
                    </span>
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
                  disabled={!canProceed || loading}
                  className={`w-fit px-8 h-[52px] rounded-[100px] font-sora text-base font-semibold transition-opacity ${
                    canProceed && !loading ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"
                  }`}
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

        {/* Final Onboarding Complete Modal */}
        <FinalOnboardingCompleteModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      </div>
    </div>
  );
}
