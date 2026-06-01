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
  },
  {
    id: 2,
    name: "Mary Jane",
    rating: 4.9,
    specialty: "Marketing",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "German"],
  },
  {
    id: 3,
    name: "Andy Jones",
    rating: 4.8,
    specialty: "Engineering",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "Spanish"],
  },
  {
    id: 4,
    name: "Gifted Isaac",
    rating: 4.9,
    specialty: "Design",
    sessions: "90+ Interview Prep Sessions",
    image: "/Image-4.png",
    languages: ["English", "French"],
  },
  {
    id: 5,
    name: "Sarah Williams",
    rating: 5.0,
    specialty: "Product",
    sessions: "120+ Interview Prep Sessions",
    image: "/Image-5.png",
    languages: ["English", "Spanish", "Portuguese"],
  },
  {
    id: 6,
    name: "James Chen",
    rating: 4.8,
    specialty: "Data Science",
    sessions: "85+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "Mandarin"],
  },
  {
    id: 7,
    name: "Emily Rodriguez",
    rating: 4.9,
    specialty: "Sales",
    sessions: "95+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "Spanish"],
  },
  {
    id: 8,
    name: "Michael Brown",
    rating: 5.0,
    specialty: "Operations",
    sessions: "110+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "German", "French"],
  },
  {
    id: 9,
    name: "Lisa Anderson",
    rating: 4.7,
    specialty: "HR",
    sessions: "80+ Interview Prep Sessions",
    image: "/Image-4.png",
    languages: ["English"],
  },
  {
    id: 10,
    name: "David Kim",
    rating: 4.9,
    specialty: "Finance",
    sessions: "105+ Interview Prep Sessions",
    image: "/Image-5.png",
    languages: ["English", "Korean"],
  },
  {
    id: 11,
    name: "Rachel Green",
    rating: 5.0,
    specialty: "Marketing",
    sessions: "115+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "French"],
  },
  {
    id: 12,
    name: "Tom Wilson",
    rating: 4.8,
    specialty: "Engineering",
    sessions: "92+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "Spanish"],
  },
  {
    id: 13,
    name: "Nina Patel",
    rating: 4.9,
    specialty: "Design",
    sessions: "88+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "Hindi"],
  },
  {
    id: 14,
    name: "Chris Taylor",
    rating: 5.0,
    specialty: "Product",
    sessions: "125+ Interview Prep Sessions",
    image: "/Image-4.png",
    languages: ["English", "German"],
  },
  {
    id: 15,
    name: "Amanda Lee",
    rating: 4.8,
    specialty: "Data Science",
    sessions: "78+ Interview Prep Sessions",
    image: "/Image-5.png",
    languages: ["English", "Mandarin"],
  },
  {
    id: 16,
    name: "Robert Martinez",
    rating: 4.9,
    specialty: "Sales",
    sessions: "98+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "Spanish", "Portuguese"],
  },
  {
    id: 17,
    name: "Jennifer White",
    rating: 5.0,
    specialty: "Operations",
    sessions: "108+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "French"],
  },
  {
    id: 18,
    name: "Kevin Johnson",
    rating: 4.7,
    specialty: "HR",
    sessions: "82+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English"],
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
              background: "linear-gradient(188.62deg, #FFFFFF 6.55%, #A2CE3A 82.18%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Meet Our Experts
          </motion.h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white/60 font-mona-sans text-lg">
              Loading experts...
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

              return (
                <Link
                  key={expert.id}
                  href={`/coaches/${expert.id}`}
                  onMouseEnter={() => setHoveredCard(expert.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div
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
                        <div className="w-[85%]">
                          <p className="text-white font-mona-sans text-sm mb-4">
                            {expertSessions}
                          </p>
                        </div>

                        <div className="w-[15%]">
                          <Link href="#" target="_blank">
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
                          </Link>
                        </div>
                      </div>
                  </motion.div>
                </Link>
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
             <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 6.375H0.75M6.375 12L0.75 6.375L6.375 0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 border-[#FFFFFF0F] border-l hover:bg-white/10 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
           <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 6.375H14.5M8.875 12L14.5 6.375L8.875 0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
