"use client";

import { useEffect, useRef } from "react";
import CoachCard from "../coach-card";

const coachesData = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    name: "Abdullah Muhammad",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "SWE Roles",
    specialtyColor: "#FFA500",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    name: "Mary Jane",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Cybersecurity",
    specialtyColor: "#90EE90",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    name: "Andy Jones",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Project Management",
    specialtyColor: "#87CEEB",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    name: "Gifted Isaac",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#FFA500",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop",
    name: "Abdullah Muhammad",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Business Analysis",
    specialtyColor: "#FFB6C1",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    name: "Andy Jones",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Project Management",
    specialtyColor: "#87CEEB",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    name: "Abdullah Muhammad",
    rating: 4.9,
    tag: "Top Human Coach",
    tagColor: "#A2CE3A",
    specialty: "Technical",
    specialtyColor: "#FFA500",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    name: "Abdullah Muhammad",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#FFA500",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    name: "Mary Jane",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Cybersecurity",
    specialtyColor: "#90EE90",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
];

export default function PerfectInterviewSection() {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topRowContainer = topRowRef.current;
    const bottomRowContainer = bottomRowRef.current;
    
    let topScrollInterval: NodeJS.Timeout;
    let bottomScrollInterval: NodeJS.Timeout;

    // Top row - slower scroll
    const startTopRowScrolling = () => {
      topScrollInterval = setInterval(() => {
        if (topRowContainer) {
          topRowContainer.scrollLeft += 1;

          // Reset scroll when reaching the end
          if (
            topRowContainer.scrollLeft >=
            topRowContainer.scrollWidth - topRowContainer.clientWidth
          ) {
            topRowContainer.scrollLeft = 0;
          }
        }
      }, 20); // Slower speed
    };

    // Bottom row - faster scroll
    const startBottomRowScrolling = () => {
      bottomScrollInterval = setInterval(() => {
        if (bottomRowContainer) {
          bottomRowContainer.scrollLeft += 1;

          // Reset scroll when reaching the end
          if (
            bottomRowContainer.scrollLeft >=
            bottomRowContainer.scrollWidth - bottomRowContainer.clientWidth
          ) {
            bottomRowContainer.scrollLeft = 0;
          }
        }
      }, 15); // Faster speed
    };

    startTopRowScrolling();
    startBottomRowScrolling();

    return () => {
      if (topScrollInterval) {
        clearInterval(topScrollInterval);
      }
      if (bottomScrollInterval) {
        clearInterval(bottomScrollInterval);
      }
    };
  }, []);

  // Split coaches data into two rows
  const topRowCoaches = coachesData.slice(0, Math.ceil(coachesData.length / 2));
  const bottomRowCoaches = coachesData.slice(Math.ceil(coachesData.length / 2));

  return (
    <section className="bg-[#0B0D0F] py-7 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-12">
          <h2
            className="text-3xl lg:text-5xl font-mona-sans font-bold"
            style={{
              background: "linear-gradient(to bottom, #FFFFFF 0%, #A2CE3A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Select Your Perfect Interview Coach
          </h2>
          <button className="w-fit px-6 py-3 bg-[#A2CE3A] rounded-[100px] text-[#121212] font-mona-sans text-sm font-semibold hover:bg-[#92BE2A] transition-colors flex items-center gap-2">
            View More
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Top Row - Slower Scrolling */}
        <div
          ref={topRowRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth mb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Duplicate cards for infinite scroll effect */}
          {[...topRowCoaches, ...topRowCoaches].map((coach, index) => (
            <CoachCard key={`top-${index}`} {...coach} />
          ))}
        </div>

        {/* Bottom Row - Faster Scrolling */}
        <div
          ref={bottomRowRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Duplicate cards for infinite scroll effect */}
          {[...bottomRowCoaches, ...bottomRowCoaches].map((coach, index) => (
            <CoachCard key={`bottom-${index}`} {...coach} />
          ))}
        </div>
      </div>
    </section>
  );
}