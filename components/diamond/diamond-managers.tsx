"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useVisibleExperts } from "@/lib/hooks/useExperts";
import type { Expert } from "@/lib/services/experts.service";
import ExpertDetailsModal from "@/components/v1-launch/ExpertDetailsModal";

// Helper function to format sessions count
const formatSessionsCount = (count: number) => {
  return `${count}+ Interview Prep Sessions`;
};

// Fallback mock experts from the main website
const fallbackManagers = [
  {
    id: 1,
    name: "Abdullahi Muhammad",
    rating: 5.0,
    specialty: "Finance & Operations",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "French", "Spanish"],
    clients_counts: 120,
    bio: "Senior Career Strategist and Executive Coach. Specializes in finance, corporate strategy, and operations leadership across UK and North American markets.",
  },
  {
    id: 2,
    name: "Mary Jane",
    rating: 4.9,
    specialty: "Marketing & Growth",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "German"],
    clients_counts: 95,
    bio: "Growth and brand marketing career expert with extensive placement history at venture-backed tech firms and Fortune 500 enterprises.",
  },
  {
    id: 3,
    name: "Andy Jones",
    rating: 4.8,
    specialty: "Engineering & Tech",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "Spanish"],
    clients_counts: 110,
    bio: "Technical recruitment veteran helping software engineers, architects, and engineering managers navigate technical screens and multi-offer rounds.",
  },
];

interface ModalExpert {
  id: number;
  name: string;
  rating: number;
  specialty: string;
  sessions: string;
  image: string;
  languages: string[];
  bio?: string;
}

export default function DiamondManagers() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<ModalExpert | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch experts from API using Tanstack Query (same as main landing page)
  const { data: apiExperts, isLoading, isError } = useVisibleExperts();

  // Pick top 3 experts for the exclusive Diamond managers section
  const managers =
    apiExperts && apiExperts.length > 0
      ? apiExperts.slice(0, 3)
      : fallbackManagers;

  return (
    <section className="bg-[#01090B] py-20 border-b border-white/10 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            07 · Meet the Diamond managers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight">
            Your search, run by our top performers
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-2xl">
            Each Diamond client is matched with a proven senior career specialist who takes on no more than 3 clients simultaneously to ensure undivided attention.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-white/60 font-mona-sans text-base">
              Loading managers...
            </div>
          </div>
        )}

        {/* Managers Grid from Main Website */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {managers.map((manager, index) => {
              const isApiExpert = "photo_url" in manager;
              const managerImage = isApiExpert
                ? (manager as Expert).photo_url
                : (manager as (typeof fallbackManagers)[0]).image;
              const managerSpecialty = isApiExpert
                ? (manager as Expert).job_title
                : (manager as (typeof fallbackManagers)[0]).specialty;
              const managerSessions = isApiExpert
                ? formatSessionsCount((manager as Expert).interview_prep_counts)
                : (manager as (typeof fallbackManagers)[0]).sessions;
              const managerRating = isApiExpert
                ? 5.0
                : (manager as (typeof fallbackManagers)[0]).rating;
              const managerLanguages = isApiExpert
                ? ["English"]
                : (manager as (typeof fallbackManagers)[0]).languages;
              const clientCounts = isApiExpert
                ? (manager as Expert).clients_counts
                : (manager as (typeof fallbackManagers)[0]).clients_counts;
              const managerBio = isApiExpert
                ? (manager as Expert).details
                : (manager as (typeof fallbackManagers)[0]).bio;

              return (
                <motion.div
                  key={manager.id}
                  onClick={() => {
                    setSelectedExpert({
                      id: manager.id,
                      name: manager.name,
                      rating: managerRating,
                      specialty: managerSpecialty,
                      sessions: managerSessions,
                      image: managerImage,
                      languages: managerLanguages,
                      bio: managerBio,
                    });
                    setShowModal(true);
                  }}
                  onMouseEnter={() => setHoveredCard(manager.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-[24px] p-4 overflow-hidden transition-all duration-500 ease-in-out cursor-pointer flex flex-col justify-between"
                  style={{
                    background:
                      hoveredCard === manager.id
                        ? "linear-gradient(0deg, rgba(21, 16, 25, 0.7), rgba(21, 16, 25, 0.7)), radial-gradient(163.24% 100% at 50% 100%, rgba(162, 206, 58, 0.3) 0%, rgba(11, 13, 15, 0.3) 42.49%)"
                        : "#0F1416",
                    border:
                      hoveredCard === manager.id
                        ? "1px solid #A2CE3A50"
                        : "1px solid #FFFFFF1A",
                  }}
                >
                  <div>
                    {/* Manager Image */}
                    <div className="relative h-[320px] rounded-[16px] border border-white/10 overflow-hidden bg-black">
                      <img
                        src={managerImage}
                        alt={manager.name}
                        className="w-full h-full object-cover brightness-90 transition-transform duration-500 ease-in-out"
                        style={{
                          transform:
                            hoveredCard === manager.id ? "scale(1.05)" : "scale(1)",
                        }}
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#090B0E]/80 backdrop-blur-sm text-[#A2CE3A] font-mona-sans font-bold text-[11px] border border-[#A2CE3A]/30">
                        Top Performer
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        {/* Specialty Badge */}
                        <div className="px-3 py-1 w-fit flex items-center bg-[#E7FFAE] rounded-full transition-all duration-300 mb-2">
                          <span className="text-[#090B0E] font-mona-sans text-[10px] font-bold">
                            {managerSpecialty}
                          </span>
                        </div>
                        {/* Manager Name & Rating */}
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-white font-mona-sans text-lg font-bold truncate">
                            {manager.name}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="#FBC02D"
                            >
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                            <span className="text-white font-mona-sans text-xs font-semibold">
                              {managerRating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sessions & Client Counts */}
                    <div className="pt-4 flex flex-col gap-1.5">
                      <p className="text-white font-mona-sans text-sm font-semibold">
                        {managerSessions}
                      </p>
                      <p className="text-[#94A3B8] font-mona-sans text-xs">
                        +{clientCounts} clients successfully guided
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mona-sans text-[#A2CE3A] font-bold">
                    <span>View manager profile</span>
                    <span>→</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Modal for viewing expert details */}
        <ExpertDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          expert={selectedExpert}
        />
      </div>
    </section>
  );
}
