"use client";

import { motion, AnimatePresence } from "framer-motion";

interface OnboardingCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteOnboarding: () => void;
}

export default function OnboardingCompleteModal({
  isOpen,
  onClose,
  onCompleteOnboarding,
}: OnboardingCompleteModalProps) {
  const handleCompleteOnboarding = () => {
    onClose();
    onCompleteOnboarding();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-[600px] rounded-[24px] p-8 lg:p-12 text-center"
            style={{
              background: "linear-gradient(180deg, #0A3A3F 0%, #051E21 100%)",
            }}
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-8"
            >
              Payment Successful!
            </motion.h2>

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="relative">
                {/* Outer Circle */}
                <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="80" cy="80" r="78" stroke="#4ADE80" strokeWidth="4" strokeOpacity="0.3"/>
                  <circle cx="80" cy="80" r="78" stroke="#4ADE80" strokeWidth="4" strokeDasharray="490" strokeDashoffset="0">
                    <animate attributeName="stroke-dashoffset" from="490" to="0" dur="1s" fill="freeze"/>
                  </circle>
                </svg>
                
                {/* Checkmark */}
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: "easeInOut" }}
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.path
                    d="M20 40L35 55L60 25"
                    stroke="#4ADE80"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: "easeInOut" }}
                  />
                </motion.svg>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-white/70 font-plus-jakarta text-base mb-8"
            >
              Your payment receipt has been sent to your mail
            </motion.p>

            {/* Onboarding Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleCompleteOnboarding}
              className="w-full h-12 px-6 rounded-[12px] font-mona-sans text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                background: "#00A896",
                border: "1px solid #FFFFFF1A",
                color: "#FFFFFF",
              }}
            >
              Complete Your Onboarding
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
