"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import TermsConditionsModal from "./TermsConditionsModal";

interface EnrollmentConfirmationProps {
  personalData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
  };
  paymentPlan: {
    planName: string;
    paymentType: "full" | "installments";
    firstPayment?: string;
    secondPayment?: string;
    nextPaymentDate?: string;
    pricingPlanData?: any;
  };
  onEditData: () => void;
  onProceed: () => void;
  onCompleteOnboarding: () => void;
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

export default function EnrollmentConfirmation({
  personalData,
  paymentPlan,
  onEditData,
  onProceed,
  onCompleteOnboarding,
}: EnrollmentConfirmationProps) {
  const [currentStep, setCurrentStep] = useState(2); // Step 2: Personal Details
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const steps = [
    { number: "1", label: "Checkout", completed: true },
    { number: "2", label: "Personal Details", completed: false, current: true },
    { number: "3", label: "Complete profile", completed: false },
  ];

  const canProceed = confirmInfo && acceptTerms;

  const handleTermsCheckboxClick = () => {
    if (!acceptTerms) {
      setShowTermsModal(true);
    } else {
      setAcceptTerms(false);
    }
  };

  const handleTermsAgree = () => {
    setAcceptTerms(true);
    setShowTermsModal(false);
  };

  const handleTermsDecline = () => {
    setAcceptTerms(false);
    setShowTermsModal(false);
  };

  const handleProceedClick = async () => {
    if (canProceed) {
      await onProceed();
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
          <h1 className="text-2xl lg:text-5xl font-clash-display font-bold text-white mb-4">
            Confirm Your Enrollment
          </h1>
          <p className="text-white/60 font-plus-jakarta text-lg">
            Please choose a payment plan that works for you to proceed.
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
            {/* Left Sidebar - Progress Steps */}
            <div
              className="lg:w-[30%] rounded-[24px] p-4 lg:p-7"
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

            {/* Right Section - Personal Details & Payment Plan */}
            <div className="lg:w-[70%] space-y-6">
              {/* Personal Details */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-clash-display font-semibold" style={{ color: "#E8EFF1" }}>
                    Personal data
                  </h2>
                  <button
                    onClick={onEditData}
                    className="px-4 py-2 rounded-[8px] font-plus-jakarta text-sm font-medium transition-opacity hover:opacity-80"
                    style={{
                      background: "#E8EFF1",
                      border: "1px solid #156374",
                      color: "#156374",
                    }}
                  >
                    Edit data
                  </button>
                </div>

                <div
                  className="rounded-[12px] p-4 lg:p-6 space-y-4"
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 100%)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                      First name
                    </span>
                    <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                      {personalData.firstName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                      Last name
                    </span>
                    <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                      {personalData.lastName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                      Email
                    </span>
                    <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                      {personalData.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                      Phone number
                    </span>
                    <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                      {personalData.phone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                      Location
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                        {personalData.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Plan */}
              <div>
                <h2 className="text-xl font-clash-display font-semibold mb-4" style={{ color: "#E8EFF1" }}>
                  Payment plan
                </h2>

                <div
                  className="rounded-[12px] p-4 lg:p-6 space-y-4"
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 100%)",
                  }}
                >
                  {/* Plan Name */}
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                      Plan selected
                    </span>
                    <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                      {paymentPlan.pricingPlanData?.title || paymentPlan.planName}
                    </span>
                  </div>

                  {/* Plan Amount */}
                  {paymentPlan.pricingPlanData?.amount && (
                    <div className="flex items-center justify-between">
                      <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                        Amount
                      </span>
                      <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                        £{paymentPlan.pricingPlanData.amount}
                      </span>
                    </div>
                  )}

                  {/* Plan Description */}
                  {paymentPlan.pricingPlanData?.description && (
                    <div className="flex items-start justify-between">
                      <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                        Description
                      </span>
                      <span className="font-plus-jakarta text-sm font-medium text-right" style={{ color: "#CCCCCC", maxWidth: "60%" }}>
                        {paymentPlan.pricingPlanData.description}
                      </span>
                    </div>
                  )}

                  {/* Plan Tags/Features */}
                  {paymentPlan.pricingPlanData?.tags && paymentPlan.pricingPlanData.tags.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                        Features included
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {paymentPlan.pricingPlanData.tags.map((tag: string, index: number) => (
                          <div
                            key={index}
                            className="px-3 py-1.5 rounded-[24px]"
                            style={{
                              background: "#A2CE3A1A",
                              border: "1px solid #A2CE3A33",
                            }}
                          >
                            <span className="font-plus-jakarta text-xs font-medium" style={{ color: "#A2CE3A" }}>
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Installment Details (if applicable) */}
                  {paymentPlan.paymentType === "installments" && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                          First payment
                        </span>
                        <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                          {paymentPlan.firstPayment}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                          Second payment
                        </span>
                        <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                          {paymentPlan.secondPayment}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-plus-jakarta text-sm" style={{ color: "#CCCCCC" }}>
                          Next payment date
                        </span>
                        <span className="font-plus-jakarta text-sm font-medium" style={{ color: "#CCCCCC" }}>
                          {paymentPlan.nextPaymentDate}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Terms and Agreement */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => setConfirmInfo(!confirmInfo)}
                    className="flex-shrink-0 mt-0.5"
                  >
                    {confirmInfo ? <CheckboxCheckedSVG /> : <CheckboxUncheckedSVG />}
                  </button>
                  <span className="font-plus-jakarta text-sm" style={{ color: "#8E8E93" }}>
                    I confirm that my information is correct
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <button
                    onClick={handleTermsCheckboxClick}
                    className="flex-shrink-0 mt-0.5"
                  >
                    {acceptTerms ? <CheckboxCheckedSVG /> : <CheckboxUncheckedSVG />}
                  </button>
                  <span className="font-plus-jakarta text-sm" style={{ color: "#8E8E93" }}>
                    I accept the{" "}
                    <Link href="/terms" className="text-[#A2CE3A] underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#A2CE3A] underline">
                      Privacy Policy
                    </Link>
                  </span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceedClick}
                disabled={!canProceed}
                className={`w-full rounded-[8px] font-sora text-base font-semibold transition-opacity ${
                  canProceed ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"
                }`}
                style={{
                  background: "#A2CE3A",
                  border: "1px solid #448290",
                  color: "#000000",
                  height: "52px",
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </motion.div>

        {/* Terms & Conditions Modal */}
        <TermsConditionsModal
          isOpen={showTermsModal}
          onClose={handleTermsDecline}
          onAgree={handleTermsAgree}
        />
      </div>
    </div>
  );
}
