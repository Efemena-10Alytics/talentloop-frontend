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
    languages: ["English", "French", "Spanish"]
  },
  {
    id: 2,
    name: "Mary Jane",
    rating: 4.9,
    specialty: "Marketing",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "German"]
  },
  {
    id: 3,
    name: "Andy Jones",
    rating: 4.8,
    specialty: "Engineering",
    sessions: "100+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "Spanish"]
  },
  {
    id: 4,
    name: "Gifted Isaac",
    rating: 4.9,
    specialty: "Design",
    sessions: "90+ Interview Prep Sessions",
    image: "/Image-4.png",
    languages: ["English", "French"]
  },
  {
    id: 5,
    name: "Sarah Williams",
    rating: 5.0,
    specialty: "Product",
    sessions: "120+ Interview Prep Sessions",
    image: "/Image-5.png",
    languages: ["English", "Spanish", "Portuguese"]
  },
  {
    id: 6,
    name: "James Chen",
    rating: 4.8,
    specialty: "Data Science",
    sessions: "85+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "Mandarin"]
  },
  {
    id: 7,
    name: "Emily Rodriguez",
    rating: 4.9,
    specialty: "Sales",
    sessions: "95+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "Spanish"]
  },
  {
    id: 8,
    name: "Michael Brown",
    rating: 5.0,
    specialty: "Operations",
    sessions: "110+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "German", "French"]
  },
  {
    id: 9,
    name: "Lisa Anderson",
    rating: 4.7,
    specialty: "HR",
    sessions: "80+ Interview Prep Sessions",
    image: "/Image-4.png",
    languages: ["English"]
  },
  {
    id: 10,
    name: "David Kim",
    rating: 4.9,
    specialty: "Finance",
    sessions: "105+ Interview Prep Sessions",
    image: "/Image-5.png",
    languages: ["English", "Korean"]
  },
  {
    id: 11,
    name: "Rachel Green",
    rating: 5.0,
    specialty: "Marketing",
    sessions: "115+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "French"]
  },
  {
    id: 12,
    name: "Tom Wilson",
    rating: 4.8,
    specialty: "Engineering",
    sessions: "92+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "Spanish"]
  },
  {
    id: 13,
    name: "Nina Patel",
    rating: 4.9,
    specialty: "Design",
    sessions: "88+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English", "Hindi"]
  },
  {
    id: 14,
    name: "Chris Taylor",
    rating: 5.0,
    specialty: "Product",
    sessions: "125+ Interview Prep Sessions",
    image: "/Image-4.png",
    languages: ["English", "German"]
  },
  {
    id: 15,
    name: "Amanda Lee",
    rating: 4.8,
    specialty: "Data Science",
    sessions: "78+ Interview Prep Sessions",
    image: "/Image-5.png",
    languages: ["English", "Mandarin"]
  },
  {
    id: 16,
    name: "Robert Martinez",
    rating: 4.9,
    specialty: "Sales",
    sessions: "98+ Interview Prep Sessions",
    image: "/Image-1.png",
    languages: ["English", "Spanish", "Portuguese"]
  },
  {
    id: 17,
    name: "Jennifer White",
    rating: 5.0,
    specialty: "Operations",
    sessions: "108+ Interview Prep Sessions",
    image: "/Image-2.png",
    languages: ["English", "French"]
  },
  {
    id: 18,
    name: "Kevin Johnson",
    rating: 4.7,
    specialty: "HR",
    sessions: "82+ Interview Prep Sessions",
    image: "/Image-3.png",
    languages: ["English"]
  }
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
  const [selectedExpert, setSelectedExpert] = useState<ModalExpert | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch experts from API using Tanstack Query
  const { data: apiExperts, isLoading, isError } = useVisibleExperts();

  // Use API data if available, otherwise fallback to mock data
  const experts = apiExperts && apiExperts.length > 0 ? apiExperts : mockExperts;

  const totalPages = Math.ceil(experts.length / EXPERTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EXPERTS_PER_PAGE;
  const currentExperts = experts.slice(startIndex, startIndex + EXPERTS_PER_PAGE);

  return (
    <section className="relative py-20 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-mona-sans font-bold text-[#A2CE3A] mb-6 sm:mb-0"
          >
            Meet Our Experts
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              href="#"
              className="px-8 py-3.5 rounded-[30px] text-white font-mona-sans text-sm font-semibold hover:opacity-90 transition-opacity inline-block"
              style={{
                background: "linear-gradient(90deg, #071522 25%, #A2CE3A 100%)",
                boxShadow: "0px -6px 4px 0px #FFFFFF4D inset"
              }}
            >
              View More
            </Link>
          </motion.div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white/60 font-mona-sans text-lg">Loading experts...</div>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 font-mona-sans text-lg">Failed to load experts. Please try again later.</div>
          </div>
        )}

        {/* Experts Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentExperts.map((expert, index) => {
              const isApiExpert = 'photo_url' in expert;
              const expertImage = isApiExpert ? (expert as Expert).photo_url : (expert as typeof mockExperts[0]).image;
              const expertSpecialty = isApiExpert ? (expert as Expert).job_title : (expert as typeof mockExperts[0]).specialty;
              const expertSessions = isApiExpert 
                ? formatSessionsCount((expert as Expert).interview_prep_counts)
                : (expert as typeof mockExperts[0]).sessions;
              const expertRating = isApiExpert ? 5.0 : (expert as typeof mockExperts[0]).rating;
              const expertLanguages = isApiExpert ? ['English'] : (expert as typeof mockExperts[0]).languages;

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
                    className="rounded-[24px] overflow-hidden transition-all duration-500 ease-in-out cursor-pointer"
                    style={{
                      background: hoveredCard === expert.id
                        ? "linear-gradient(0deg, rgba(21, 16, 25, 0.7), rgba(21, 16, 25, 0.7)), radial-gradient(163.24% 100% at 50% 100%, rgba(162, 206, 58, 0.3) 0%, rgba(11, 13, 15, 0.3) 42.49%)"
                        : "#151019B2",
                      border: hoveredCard === expert.id ? "1px solid #FFFFFF0F" : "1px solid transparent"
                    }}
                  >
                    {/* Expert Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={expertImage}
                        alt={expert.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                        style={{
                          transform: hoveredCard === expert.id ? "scale(1.05)" : "scale(1)"
                        }}
                      />
                      {/* Specialty Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#A2CE3A] rounded-full transition-all duration-300">
                        <span className="text-[#090B0E] font-mona-sans text-xs font-semibold">
                          {expertSpecialty}
                        </span>
                      </div>
                    </div>

                {/* Expert Info */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-mona-sans text-xl font-bold">
                        {expert.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#A2CE3A"/>
                        </svg>
                        <span className="text-white font-mona-sans text-sm font-semibold">
                          {expertRating}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/60 font-sora text-sm mb-4">
                      {expertSessions}
                    </p>

                    {/* Languages */}
                    <div className="flex items-center gap-2 mb-4">
                      {expertLanguages.slice(0, 4).map((lang, idx) => (
                        <div key={idx} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                          <span className="text-white/60 text-xs font-mona-sans">
                            {lang.charAt(0)}
                          </span>
                        </div>
                      ))}
                      {expertLanguages.length > 4 && (
                        <span className="text-white/60 text-xs font-mona-sans">
                          +{expertLanguages.length - 4}
                        </span>
                      )}
                    </div>

                    {/* More Details Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Convert to ModalExpert type
                        const modalExpert: ModalExpert = {
                          id: expert.id,
                          name: expert.name,
                          rating: expertRating,
                          specialty: expertSpecialty,
                          sessions: expertSessions,
                          image: expertImage,
                          languages: expertLanguages,
                        };
                        setSelectedExpert(modalExpert);
                        setShowModal(true);
                      }}
                      className="w-fit px-6 py-3 rounded-[30px] font-mona-sans text-sm font-semibold transition-all duration-500 ease-in-out"
                      style={{
                        background: hoveredCard === expert.id
                          ? "linear-gradient(90deg, #A2CE3A 0%, #52681D 100%)"
                          : "linear-gradient(180deg, #0E0912 0%, #22162B 100%)",
                        border: "1px solid #FFFFFF0F",
                        color: "#FFFFFF"
                      }}
                    >
                      {hoveredCard === expert.id ? "View More Details" : "More Details"}
                    </button>
                  </div>
                </motion.div>
              </Link>
            );
            })}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2"
        >
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          </motion.div>
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
