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
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 text-white/60 hover:text-white transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 8L8 24M8 8L24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

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
                {/* Header with Name and LinkedIn */}
                <div className="flex items-start justify-between mb-6 pr-12">
                  <h2 className="text-3xl lg:text-4xl font-mona-sans font-bold text-white pr-4">
                    {expert.name}
                  </h2>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-white transition-colors flex-shrink-0"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2"/>
                      <path
                        d="M8 10V16M8 8V8.01M11 16V10M14 16V12.5C14 11.5 15 11 15.5 12V16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Bio */}
                <p className="text-white/80 font-sora text-base leading-relaxed mb-6">
                  {expert.bio || `Gabby is a Certified Career Coach with over 3 years of experience helping professionals navigate every stage of their career journey.`}
                </p>

                <p className="text-white/80 font-sora text-base leading-relaxed mb-6">
                  She specialises in CV writing, job applications, interview preparation, LinkedIn profile optimisation and career transition coaching — providing each client with tailored, practical support that delivers real results.
                </p>

                <p className="text-white/80 font-sora text-base leading-relaxed mb-6">
                  Gabby's approach is refreshingly straightforward. She combines honesty with strategy, ensuring clients don't just find jobs but find the right ones — and walk into every opportunity with clarity and confidence.
                </p>

                <p className="text-white/80 font-sora text-base leading-relaxed mb-6">
                  From first-time job seekers to seasoned professionals looking for a change, Gabby has a proven track record of helping people cut through the noise, position themselves effectively and land roles they are genuinely excited about.
                </p>

                <p className="text-white/80 font-sora text-base leading-relaxed">
                  When you work with Gabby, you don't just get advice, you get a clear plan, expert execution and a coach who is fully invested in your success.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
