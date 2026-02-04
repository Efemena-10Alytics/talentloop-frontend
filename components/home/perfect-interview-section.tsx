"use client";

import { useEffect, useRef } from "react";
import { Fade } from "react-awesome-reveal";
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

    if (!topRowContainer || !bottomRowContainer) return;

    // Animation frame for smoother scrolling
    let topAnimationFrame: number;
    let bottomAnimationFrame: number;

    // Speed of scrolling (pixels per frame)
    const scrollSpeed = 0.5;

    // Top row - scrolls LEFT
    const animateTopRow = () => {
      if (topRowContainer) {
        topRowContainer.scrollLeft -= scrollSpeed;

        // When we've scrolled past the first set, jump back
        const maxScroll = topRowContainer.scrollWidth / 3;
        if (topRowContainer.scrollLeft <= 0) {
          topRowContainer.scrollLeft = maxScroll;
        }

        topAnimationFrame = requestAnimationFrame(animateTopRow);
      }
    };

    // Bottom row - scrolls RIGHT
    const animateBottomRow = () => {
      if (bottomRowContainer) {
        bottomRowContainer.scrollLeft += scrollSpeed;

        // When we've scrolled past the first set, jump back
        const maxScroll = bottomRowContainer.scrollWidth / 3;
        if (bottomRowContainer.scrollLeft >= maxScroll) {
          bottomRowContainer.scrollLeft = 0;
        }

        bottomAnimationFrame = requestAnimationFrame(animateBottomRow);
      }
    };

    // Initialize scroll positions and start animations
    const initializeScrolling = () => {
      // Set initial positions
      if (topRowContainer) {
        topRowContainer.scrollLeft = topRowContainer.scrollWidth / 3;
      }
      if (bottomRowContainer) {
        bottomRowContainer.scrollLeft = 0;
      }

      // Start animations
      topAnimationFrame = requestAnimationFrame(animateTopRow);
      bottomAnimationFrame = requestAnimationFrame(animateBottomRow);
    };

    // Wait for layout to be ready
    const timeoutId = setTimeout(initializeScrolling, 100);

    return () => {
      clearTimeout(timeoutId);
      if (topAnimationFrame) {
        cancelAnimationFrame(topAnimationFrame);
      }
      if (bottomAnimationFrame) {
        cancelAnimationFrame(bottomAnimationFrame);
      }
    };
  }, []);

  // Split coaches data into two rows
  const topRowCoaches = coachesData.slice(0, Math.ceil(coachesData.length / 2));
  const bottomRowCoaches = coachesData.slice(Math.ceil(coachesData.length / 2));

  return (
    <section className="relative bg-[#0B0D0F] py-7 lg:py-16 overflow-hidden">
      <img className="absolute -top-20 -right-[520px] w-full h-[800px] object-contain" src="/Group 8.png" alt="" />
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-12">
          <Fade direction="down" triggerOnce duration={2000}>
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
          </Fade>

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

        {/* Top Row - Scrolls LEFT */}
        <div
          ref={topRowRef}
          className="flex gap-6 overflow-x-scroll mb-6"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            scrollBehavior: "auto" // Important: disable smooth scrolling for programmatic control
          }}
        >
          {/* Triplicate cards for infinite scroll effect */}
          {[...topRowCoaches, ...topRowCoaches, ...topRowCoaches].map((coach, index) => (
            <div key={`top-${index}`} className="flex-shrink-0">
              <CoachCard {...coach} />
            </div>
          ))}
        </div>

        {/* Bottom Row - Scrolls RIGHT */}
        <div
          ref={bottomRowRef}
          className="flex gap-6 overflow-x-scroll"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            scrollBehavior: "auto" // Important: disable smooth scrolling for programmatic control
          }}
        >
          {/* Triplicate cards for infinite scroll effect */}
          {[...bottomRowCoaches, ...bottomRowCoaches, ...bottomRowCoaches].map((coach, index) => (
            <div key={`bottom-${index}`} className="flex-shrink-0">
              <CoachCard {...coach} />
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        div[class*="overflow-x-scroll"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}