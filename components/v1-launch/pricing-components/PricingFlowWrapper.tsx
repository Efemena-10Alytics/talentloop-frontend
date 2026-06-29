"use client";

import BookingFlow from "./BookingFlow";
import { motion, AnimatePresence } from "framer-motion";

interface PricingFlowWrapperProps {
  isOpen: boolean;
  selectedPlan: string | null;
  onClose: () => void;
}

export default function PricingFlowWrapper({
  isOpen,
  selectedPlan,
  onClose,
}: PricingFlowWrapperProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(11, 13, 15, 0.95)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl"
          >
            <BookingFlow onBackToPricing={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
