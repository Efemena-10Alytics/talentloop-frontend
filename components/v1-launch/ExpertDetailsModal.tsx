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
            {/* LinkedIn Icon */}
            <div className="absolute top-6 right-6 z-20">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                  fill="white"
                />
              </svg>
            </div>

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
