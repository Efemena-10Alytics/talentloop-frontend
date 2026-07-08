"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ExpertDetailsModal from "./ExpertDetailsModal";
import { useVisibleExperts } from "@/lib/hooks/useExperts";
import type { Expert } from "@/lib/services/experts.service";

// Helper function to format sessions count
const formatSessionsCount = (count: number) => {
  return `${count}+ Interview Prep Sessions`;
};

// Random client images pool
const clientImages = [
  "/Image-1.png",
  "/Image-2.png",
  "/Image-3.png",
  "/Image-4.png",
  "/Image-5.png",
];

// Helper function to get random client images
const getRandomClientImages = (count: number = 3) => {
  const shuffled = [...clientImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, 3));
};

// Mock data for experts (keeping as fallback)
const mockExperts = [
  {
    id: 1,
    name: "Abdullahi Muhammad",
    rating: 5.0,
    specialty: "Finance",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "French", "Spanish"],
    clients_counts: 120,
  },
  {
    id: 2,
    name: "Mary Jane",
    rating: 4.9,
    specialty: "Marketing",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "German"],
    clients_counts: 95,
  },
  {
    id: 3,
    name: "Andy Jones",
    rating: 4.8,
    specialty: "Engineering",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "Spanish"],
    clients_counts: 110,
  },
  {
    id: 4,
    name: "Gifted Isaac",
    rating: 4.9,
    specialty: "Design",
    sessions: "90+ Interview Prep Sessions",
    image: "/Image-4.png",
    languages: ["English", "French"],
    clients_counts: 85,
  },
  {
    id: 5,
    name: "Sarah Williams",
    rating: 5.0,
    specialty: "Product",
    sessions: "120+ Interview Prep Sessions",
    image: "/Image-5.png",
    languages: ["English", "Spanish", "Portuguese"],
    clients_counts: 130,
  },
  {
    id: 6,
    name: "James Chen",
    rating: 4.8,
    specialty: "Data Science",
    sessions: "85+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "Mandarin"],
    clients_counts: 78,
  },
  {
    id: 7,
    name: "Emily Rodriguez",
    rating: 4.9,
    specialty: "Sales",
    sessions: "95+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "Spanish"],
    clients_counts: 92,
  },
  {
    id: 8,
    name: "Michael Brown",
    rating: 5.0,
    specialty: "Operations",
    sessions: "110+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "German", "French"],
    clients_counts: 105,
  },
  {
    id: 9,
    name: "Lisa Anderson",
    rating: 4.7,
    specialty: "HR",
    sessions: "80+ Interview Prep Sessions",
    image: "/Image-4.png",
    languages: ["English"],
    clients_counts: 72,
  },
  {
    id: 10,
    name: "David Kim",
    rating: 4.9,
    specialty: "Finance",
    sessions: "105+ Interview Prep Sessions",
    image: "/Image-5.png",
    languages: ["English", "Korean"],
    clients_counts: 98,
  },
  {
    id: 11,
    name: "Rachel Green",
    rating: 5.0,
    specialty: "Marketing",
    sessions: "115+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "French"],
    clients_counts: 112,
  },
  {
    id: 12,
    name: "Tom Wilson",
    rating: 4.8,
    specialty: "Engineering",
    sessions: "92+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "Spanish"],
    clients_counts: 88,
  },
  {
    id: 13,
    name: "Nina Patel",
    rating: 4.9,
    specialty: "Design",
    sessions: "88+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "Hindi"],
    clients_counts: 82,
  },
  {
    id: 14,
    name: "Chris Taylor",
    rating: 5.0,
    specialty: "Product",
    sessions: "125+ Interview Prep Sessions",
    image: "/Image-4.png",
    languages: ["English", "German"],
    clients_counts: 118,
  },
  {
    id: 15,
    name: "Amanda Lee",
    rating: 4.8,
    specialty: "Data Science",
    sessions: "78+ Interview Prep Sessions",
    image: "/Image-5.png",
    languages: ["English", "Mandarin"],
    clients_counts: 70,
  },
  {
    id: 16,
    name: "Robert Martinez",
    rating: 4.9,
    specialty: "Sales",
    sessions: "98+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "Spanish", "Portuguese"],
    clients_counts: 94,
  },
  {
    id: 17,
    name: "Jennifer White",
    rating: 5.0,
    specialty: "Operations",
    sessions: "108+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "French"],
    clients_counts: 102,
  },
  {
    id: 18,
    name: "Kevin Johnson",
    rating: 4.7,
    specialty: "HR",
    sessions: "82+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English"],
    clients_counts: 76,
  },
];

const EXPERTS_PER_PAGE = 6;

// Type for modal expert (matches ExpertDetailsModal interface)
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

export default function V1ExpertsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<ModalExpert | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);

  // Fetch experts from API using Tanstack Query
  const { data: apiExperts, isLoading, isError } = useVisibleExperts();

  // Use API data if available, otherwise fallback to mock data
  const experts =
    apiExperts && apiExperts.length > 0 ? apiExperts : mockExperts;

  const totalPages = Math.ceil(experts.length / EXPERTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EXPERTS_PER_PAGE;
  const currentExperts = experts.slice(
    startIndex,
    startIndex + EXPERTS_PER_PAGE,
  );

  return (
    <section className="relative py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-mona-sans font-bold mb-6 sm:mb-0"
            style={{
              background:
                "linear-gradient(188.62deg, #FFFFFF 6.55%, #A2CE3A 82.18%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Meet Our Experts
          </motion.h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              {/* Spinner */}
              <svg
                className="animate-spin h-6 w-6 text-[#A2CE3A]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <div className="text-white/60 font-mona-sans text-lg">
                Loading experts...
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 font-mona-sans text-lg">
              Failed to load experts. Please try again later.
            </div>
          </div>
        )}

        {/* Experts Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentExperts.map((expert, index) => {
              const isApiExpert = "photo_url" in expert;
              const expertImage = isApiExpert
                ? (expert as Expert).photo_url
                : (expert as (typeof mockExperts)[0]).image;
              const expertSpecialty = isApiExpert
                ? (expert as Expert).job_title
                : (expert as (typeof mockExperts)[0]).specialty;
              const expertSessions = isApiExpert
                ? formatSessionsCount((expert as Expert).interview_prep_counts)
                : (expert as (typeof mockExperts)[0]).sessions;
              const expertRating = isApiExpert
                ? 5.0
                : (expert as (typeof mockExperts)[0]).rating;
              const expertLanguages = isApiExpert
                ? ["English"]
                : (expert as (typeof mockExperts)[0]).languages;
              const clientCounts = isApiExpert
                ? (expert as Expert).clients_counts
                : (expert as (typeof mockExperts)[0]).clients_counts;

              return (
                <motion.div
                  key={expert.id}
                  onClick={() => {
                    const expertBio = isApiExpert
                      ? (expert as Expert).details
                      : undefined;
                    setSelectedExpert({
                      id: expert.id,
                      name: expert.name,
                      rating: expertRating,
                      specialty: expertSpecialty,
                      sessions: expertSessions,
                      image: expertImage,
                      languages: expertLanguages,
                      bio: expertBio,
                    });
                    setShowModal(true);
                  }}
                  onMouseEnter={() => setHoveredCard(expert.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-[24px] p-4 overflow-hidden transition-all duration-500 ease-in-out cursor-pointer"
                    style={{
                      background:
                        hoveredCard === expert.id
                          ? "linear-gradient(0deg, rgba(21, 16, 25, 0.7), rgba(21, 16, 25, 0.7)), radial-gradient(163.24% 100% at 50% 100%, rgba(162, 206, 58, 0.3) 0%, rgba(11, 13, 15, 0.3) 42.49%)"
                          : "#151019B2",
                      border:
                        hoveredCard === expert.id
                          ? "1px solid #FFFFFF0F"
                          : "1px solid transparent",
                    }}
                  >
                    {/* Expert Image */}
                    <div className="relative h-[304px] rounded-[10px] broder border-[#FFFFFF0F] overflow-hidden">
                      <img
                        src={expertImage}
                        alt={expert.name}
                        className="w-full h-full object-cover brightness-75 transition-transform duration-500 ease-in-out"
                        style={{
                          transform:
                            hoveredCard === expert.id
                              ? "scale(1.05)"
                              : "scale(1)",
                        }}
                      />
                      <div className="absolute bottom-4 left-4">
                        {/* Specialty Badge */}
                        <div className="px-3 py-1 w-fit flex items-center bg-[#E7FFAE] rounded-full transition-all duration-300">
                          <span className="text-[#090B0E] font-mona-sans text-[8px] font-semibold">
                            {expertSpecialty}
                          </span>
                        </div>
                        {/* Expert Info */}
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-white font-mona-sans text-lg font-bold">
                            {expert.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                fill="#FBC02D"
                              />
                            </svg>
                            <span className="text-white font-mona-sans text-sm font-semibold">
                              {expertRating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-transparent pt-4 flex items-center w-full">
                      <div className="w-[85%] flex flex-col gap-1">
                        <p className="text-white font-mona-sans text-sm">
                          {expertSessions}
                        </p>

                        <div className="flex items-center">
                          {getRandomClientImages(3).map((imageSrc, index) => (
                            <img
                              key={index}
                              src={imageSrc}
                              alt=""
                              className="h-5 w-5 rounded-full"
                            />
                          ))}
                          <p className="text-white font-mona-sans text-xs m-2">
                            +{clientCounts} more clients handled
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && (
          <div className="mx-auto w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#151019B2] rounded-[100px] border border-[#FFFFFF0F] w-fit flex items-center justify-center gap-2"
            >
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 border-[#FFFFFF0F] border-r hover:bg-white/10 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                <svg
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 6.375H0.75M6.375 12L0.75 6.375L6.375 0.75"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-mona-sans text-sm font-semibold transition-all ${
                      currentPage === page
                        ? "bg-[#A2CE3A] text-[#090B0E]"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 border-[#FFFFFF0F] border-l hover:bg-white/10 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                <svg
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 6.375H14.5M8.875 12L14.5 6.375L8.875 0.75"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Expert Details Modal */}
      <ExpertDetailsModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedExpert(null);
        }}
        expert={selectedExpert}
      />
    </section>
  );
}
