"use client";

import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "After completing several projects on Amdari, I secured a job as a Data Analyst. The hands-on experience made me ready for the role.",
    name: "Imisi Olabode",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    text: "Intrinsicly transform multifunctional communities through world-class markets.",
    name: "Elanor Pera",
    role: "Product Analyst",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    text: "The mock interviews were incredibly realistic. I felt fully prepared and confident walking into my actual interview.",
    name: "David Chen",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    text: "My coach helped me identify gaps in my approach and gave me actionable feedback that made all the difference.",
    name: "Sarah Johnson",
    role: "Business Analyst",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
];

const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.76146 2.44037L11.6731 7.12587L16.7246 7.50006L12.8526 10.7702L14.0646 15.6834L9.76146 13.0153L5.45828 15.6834L6.67033 10.7702L2.79828 7.50006L7.84984 7.12587L9.76146 2.44037Z"
      fill="#FBC02D"
    />
    <path
      d="M9.76146 2.44037L7.84984 7.12587L2.79828 7.50006L6.67033 10.7702L5.45828 15.6834L9.76146 13.0153M9.76146 2.44037L11.6731 7.12587L16.7246 7.50006L12.8526 10.7702L14.0646 15.6834L9.76146 13.0153"
      stroke="#FBC02D"
      strokeWidth="2.78899"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CoachSuccessStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 2;
  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#0B0D0F] py-8 lg:py-12"
    >
      <Fade direction="up" triggerOnce duration={1500}>
        {/* Header: Avatars + Rating */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex -space-x-2">
            {testimonials.slice(0, 3).map((t, i) => (
              <img
                key={i}
                src={t.image}
                alt={t.name}
                className="w-8 h-8 rounded-full border-2 border-[#0B0D0F] object-cover"
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white text-sm font-mona-sans font-medium">
              4.9
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Title with gradient */}
        <h2
          className="text-3xl lg:text-[40px] font-mona-sans font-bold leading-tight mb-8"
          style={{
            background: "linear-gradient(to bottom, #838383, #010A0A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Success Stories
        </h2>

        {/* Testimonial Cards */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 lg:gap-6"
            animate={{ x: `-${currentIndex * (100 / cardsPerView + 2)}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[calc(50%-8px)] lg:w-[calc(50%-12px)]"
              >
                <div className="bg-[#1E1F21] rounded-[16px] p-6 lg:p-8 h-full flex flex-col justify-between min-h-[220px]">
                  <p className="text-white/90 text-sm lg:text-base font-mona-sans leading-relaxed">
                    {testimonial.text}
                  </p>

                  <div className="mt-6">
                    <div className="w-full h-px bg-white/10 mb-4" />
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-white font-mona-sans font-semibold text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-white/50 font-mona-sans text-xs">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors hover:bg-white/5 disabled:opacity-30 cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 rounded-full bg-[#A2CE3A] flex items-center justify-center transition-colors hover:bg-[#8FBB2E] disabled:opacity-30 cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0B0D0F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Fade>
    </motion.section>
  );
}
