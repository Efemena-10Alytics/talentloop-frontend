"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Expert {
  id: number;
  name: string;
  rating: number;
  specialty: string;
  sessions: string;
  image: string;
  languages: string[];
  bio?: string;
}

interface ExpertDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: Expert | null;
}

export default function ExpertDetailsModal({ isOpen, onClose, expert }: ExpertDetailsModalProps) {
  if (!expert) return null;

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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-[1100px] max-h-[90vh] overflow-y-auto rounded-[24px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            style={{
              background: "#0F1416",
              border: "1px solid #FFFFFF1A",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-8 p-8">
              {/* Left Side - Expert Image */}
              <div className="lg:w-[35%]">
                <div className="rounded-[20px] overflow-hidden">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Right Side - Expert Details */}
              <div className="lg:w-[65%]">
                {/* Header with Name */}
                <div className="mb-6 pr-12">
                  <h2 className="text-3xl lg:text-4xl font-mona-sans font-bold text-white">
                    {expert.name}
                  </h2>
                </div>

                {/* Bio */}
                {expert.bio ? (
                  <p className="text-white/80 font-sora text-base leading-relaxed">
                    {expert.bio}
                  </p>
                ) : (
                  <p className="text-white/50 font-sora text-base leading-relaxed italic">
                    No bio available.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
