"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import SignupModal from "@/components/auth/SignupModal";

interface PaymentSelectionProps {
  planId: string;
  planType: string;
  planPrice: string;
  onPaymentSelect: (paymentOption: PaymentOption) => void;
}

export interface PaymentOption {
  type: "full" | "installments";
  amount: string;
  installmentDetails?: {
    first: string;
    second: string;
  };
}

const paymentPlans = {
  basic: { price: "£70", fullAmount: "£70" },
  premium: { price: "£250", fullAmount: "£250", installment1: "£160", installment2: "£90" },
  comprehensive: { price: "£350", fullAmount: "£350", installment1: "£225", installment2: "£125" },
  platinum: { price: "£200", fullAmount: "£200", installment1: "£130", installment2: "£70" },
};

export default function PaymentSelection({
  planId,
  planType,
  planPrice,
  onPaymentSelect,
}: PaymentSelectionProps) {
  const { data: session, status } = useSession();
  const [selectedPayment, setSelectedPayment] = useState<"full" | "installments">("full");
  const [showSignupModal, setShowSignupModal] = useState(false);
  // TEMPORARY: Simulating authenticated user for testing registered user flow
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const planDetails = paymentPlans[planId as keyof typeof paymentPlans] || paymentPlans.premium;

  useEffect(() => {
    // TEMPORARY: Commented out to simulate authenticated user
    // if (status === "authenticated" && session) {
    //   setIsAuthenticated(true);
    // } else if (status === "unauthenticated") {
    //   setIsAuthenticated(false);
    // }
  }, [session, status]);

  const handlePaymentChange = (type: "full" | "installments") => {
    setSelectedPayment(type);
  };

  const handleProceed = () => {
    // Check if user is authenticated
    if (!isAuthenticated && status !== "loading") {
      // Show signup modal for unregistered users
      setShowSignupModal(true);
      return;
    }

    // User is authenticated, proceed with payment
    const paymentOption: PaymentOption = {
      type: selectedPayment,
      amount: planDetails.fullAmount,
      ...(selectedPayment === "installments" && "installment1" in planDetails && {
        installmentDetails: {
          first: planDetails.installment1,
          second: planDetails.installment2,
        },
      }),
    };
    onPaymentSelect(paymentOption);
  };

  const handleSignupSuccess = () => {
    // Close modal and set authenticated state
    setShowSignupModal(false);
    setIsAuthenticated(true);
    
    // Automatically proceed to payment after successful signup
    const paymentOption: PaymentOption = {
      type: selectedPayment,
      amount: planDetails.fullAmount,
      ...(selectedPayment === "installments" && "installment1" in planDetails && {
        installmentDetails: {
          first: planDetails.installment1,
          second: planDetails.installment2,
        },
      }),
    };
    onPaymentSelect(paymentOption);
  };

  return (
    <div className="min-h-screen bg-[#01090B] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-mona-sans font-bold text-white mb-4">
            Confirm Your Enrollment
          </h1>
          <p className="text-white/40 font-sora text-sm">
            Please choose a payment plan that works for you to proceed.
          </p>
        </motion.div>

        {/* Payment Container */}
        <div className="flex flex-col lg:flex-row gap-8 bg-[#1E1F2180] rounded-[24px] p-4 lg:p-6">
          {/* Left Side - Payment Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="lg:w-[65%] text-white font-mona-sans font-bold text-2xl mb-6">
              Payment Options
            </h2>

            <div className="space-y-4">
              {/* Full Payment Option */}
              <button
                onClick={() => handlePaymentChange("full")}
                className="w-full rounded-[24px] p-6 transition-all duration-300"
                style={{
                  background: selectedPayment === "full" 
                    ? "linear-gradient(135deg, #2D3A2E 0%, #1A2420 100%)"
                    : "linear-gradient(135deg, #FFFFFF0F, #FFFFFF1A 100%)",
                  border: selectedPayment === "full" 
                    ? "1px solid #A2CE3A" 
                    : "1px solid #FFFFFF1A",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-white font-mona-sans font-bold text-xl mb-1">
                      Full Payment
                    </h3>
                    <p className="text-white/50 font-sora text-sm">
                      Make one time payment now
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-mona-sans font-bold text-3xl">
                      {planDetails.fullAmount}
                    </span>
                    <div
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: selectedPayment === "full" ? "#A2CE3A" : "#FFFFFF4D",
                        background: selectedPayment === "full" ? "#A2CE3A" : "transparent",
                      }}
                    >
                      {selectedPayment === "full" && (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* 2 Installments Option */}
              <button
                onClick={() => handlePaymentChange("installments")}
                className="w-full rounded-[24px] p-6 transition-all duration-300"
                style={{
                  background: selectedPayment === "installments" 
                    ? "linear-gradient(135deg, #2D3A2E 0%, #1A2420 100%)"
                    : "linear-gradient(135deg, #FFFFFF0F, #FFFFFF1A 100%)",
                  border: selectedPayment === "installments" 
                    ? "1px solid #A2CE3A" 
                    : "1px solid #FFFFFF1A",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-white font-mona-sans font-bold text-xl mb-1">
                      2 Installments
                    </h3>
                    <p className="text-white/50 font-sora text-sm">
                      Pay in two installments
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-mona-sans font-bold text-3xl">
                      {planDetails.fullAmount}
                    </span>
                    <div
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: selectedPayment === "installments" ? "#A2CE3A" : "#FFFFFF4D",
                        background: selectedPayment === "installments" ? "#A2CE3A" : "transparent",
                      }}
                    >
                      {selectedPayment === "installments" && (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Right Side - Plan Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-[35%] rounded-[32px] p-8"
         style={{
                background: "linear-gradient(135deg, #FFFFFF0F, #FFFFFF1A 100%)"
              }}
          >
            {/* Most Popular Badge */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-mona-sans font-bold text-2xl">
                {planType.charAt(0).toUpperCase() + planType.slice(1)}
              </h3>
              <div
                className="px-4 py-2 rounded-full flex items-center gap-2"
                style={{
                  background: "linear-gradient(90deg, #A2CE3A 0%, #156374 100%)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1L10.163 5.38L15 6.12L11.5 9.53L12.326 14.34L8 12.08L3.674 14.34L4.5 9.53L1 6.12L5.837 5.38L8 1Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white font-mona-sans font-semibold text-xs">
                  Most Popular
                </span>
              </div>
            </div>

            <p className="text-white/60 font-sora text-sm mb-6">
              For professionals tired of applying blindly.
            </p>

            {/* Price Display */}
            <div className="mb-6">
              <div className="text-white font-mona-sans font-bold text-5xl mb-2">
                {planDetails.price}
              </div>
            </div>

            {/* Installment Breakdown */}
            {selectedPayment === "installments" && "installment1" in planDetails && (
              <div 
                className="space-y-2 mb-6 p-4 rounded-[10px]"
                style={{
                  background: "#7676801F",
                  border: "1px solid #FFFFFF1A",
                }}
              >
                <div className="flex items-center justify-between font-sora text-sm" style={{ color: "#CCCCCC" }}>
                  <span>First installment-</span>
                  <span className="font-semibold">{'installment1' in planDetails ? planDetails.installment1 : ''}</span>
                </div>
                <div className="flex items-center justify-between font-sora text-sm" style={{ color: "#CCCCCC" }}>
                  <span>Second installment-</span>
                  <span className="font-semibold">{'installment2' in planDetails ? planDetails.installment2 : ''}</span>
                </div>
              </div>
            )}

            {/* Proceed Button */}
            <button
              onClick={handleProceed}
               className="w-full px-8 py-4 rounded-[16px] font-mona-sans text-base font-semibold text-white hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(90deg, #071522 25%, #A2CE3A 100%)",
                  boxShadow: "0px -6px 4px 0px #FFFFFF4D inset"
                }}
            >
              Proceed to Payment
            </button>
          </motion.div>
        </div>
      </div>

      {/* Signup Modal for Unregistered Users */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSuccess={handleSignupSuccess}
      />
    </div>
  );
}
