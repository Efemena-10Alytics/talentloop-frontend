"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface FinalOnboardingCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FinalOnboardingCompleteModal({
  isOpen,
  onClose,
}: FinalOnboardingCompleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md rounded-[24px] p-8 text-center"
            style={{
              background: "linear-gradient(135deg, #0A4A4F 0%, #0D2D30 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-mona-sans font-bold text-white mb-8"
            >
              Onboarding Complete
            </motion.h2>

            {/* Animated Checkmark Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="flex items-center justify-center mb-8"
            >
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="58"
                  stroke="#A2CE3A"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                />
                {/* Checkmark */}
                <motion.path
                  d="M35 60L52 77L85 44"
                  stroke="#A2CE3A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-white/70 font-plus-jakarta text-base mb-8"
            >
              You're all set. a Manager will be assigned to you
            </motion.p>

            {/* Dashboard Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Link
                href="/v1/dashboard"
                className="flex items-center justify-center w-full h-12 px-6 rounded-[12px] font-mona-sans text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "#A2CE3A",
                  border: "1px solid #FFFFFF1A",
                  color: "#000000",
                }}
              >
                See my dashboard
              </Link>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
