"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVisibleImageTestimonials } from "@/lib/hooks/useTestimonials";

const QuotationIcon = () => (
  <svg width="39" height="28" viewBox="0 0 39 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.78182 27.8182H11.1273L16.6909 16.6909V0H0V16.6909H8.34545L2.78182 27.8182ZM25.0364 27.8182H33.3818L38.9454 16.6909V0H22.2545V16.6909H30.6L25.0364 27.8182Z" fill="#A2CE3A"/>
  </svg>
);

const StarIcon = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.4133 1L9.28 8.68L1 9.29333L7.34667 14.6533L5.36 22.7067L12.4133 18.3333M12.4133 1L15.5467 8.68L23.8267 9.29333L17.48 14.6533L19.4667 22.7067L12.4133 18.3333" stroke="#FDA900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" transform="matrix(-1 0 0 1 48 0)" fill="#A2CE3A"/>
    <g clipPath="url(#clip0_1784_2832)">
      <path fillRule="evenodd" clipRule="evenodd" d="M26.002 16L18.002 24L26.002 32L28.002 30L22.002 24L28.002 18L26.002 16Z" fill="#0D0D0D"/>
    </g>
    <defs>
      <clipPath id="clip0_1784_2832">
        <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 36 12)"/>
      </clipPath>
    </defs>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5229 0 48 4.47715 48 10V38C48 43.5229 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z" fill="#A2CE3A"/>
    <g clipPath="url(#clip0_1784_2826)">
      <path fillRule="evenodd" clipRule="evenodd" d="M21.998 16L29.998 24L21.998 32L19.998 30L25.998 24L19.998 18L21.998 16Z" fill="#0D0D0D"/>
    </g>
    <defs>
      <clipPath id="clip0_1784_2826">
        <rect width="24" height="24" fill="white" transform="translate(12 12)"/>
      </clipPath>
    </defs>
  </svg>
);

export default function V1TestimonialsSection() {
  const { data: testimonials, isLoading, isError } = useVisibleImageTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials && testimonials.length > 0 ? testimonials[currentIndex] : null;

  return (
    <section className="relative py-14 lg:py-20" style={{ background: "#01090BB2" }}>
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Profile Info Badge */}
        {!isLoading && testimonials && testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
          <img src="/Profile Info.png" alt="" className="h-14 object-contain" />
          </motion.div>
        )}

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl text-white font-mona-sans font-semibold mb-4">
            Real Moves, By Real Professionals.
          </h2>
          <p className="text-white/60 font-jakarta-sans text-base">
            Our Happy Clients, Who Shared Her Experience With Us!
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              {/* Spinner */}
              <svg className="animate-spin h-6 w-6 text-[#A2CE3A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div className="text-white/60 font-mona-sans text-lg">Loading testimonials...</div>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 font-mona-sans text-lg">Failed to load testimonials. Please try again later.</div>
          </div>
        )}

        {/* Testimonial Card with Navigation */}
        {!isLoading && !isError && testimonials && testimonials.length > 0 && currentTestimonial && (
          <>
            <div className="relative max-w-4xl mx-auto">
              {/* Left Arrow */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 hover:opacity-80 transition-opacity hidden lg:block"
                aria-label="Previous testimonial"
              >
                <ArrowLeftIcon />
              </button>

              {/* Testimonial Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial!.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-[20px] border-2 border-[#A2CE3A] overflow-hidden"
                >
                    <img src={currentTestimonial!.file_url || ""} alt={currentTestimonial!.title || "Testimonial"} className="h-full w-full object-cover" />
                </motion.div>
              </AnimatePresence>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 hover:opacity-80 transition-opacity hidden lg:block"
                aria-label="Next testimonial"
              >
                <ArrowRightIcon />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-[#A2CE3A]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Mobile Navigation */}
        <div className="flex justify-center gap-4 mt-8 lg:hidden">
          <button
            onClick={handlePrevious}
            className="hover:opacity-80 transition-opacity"
            aria-label="Previous testimonial"
          >
            <ArrowLeftIcon />
          </button>
          <button
            onClick={handleNext}
            className="hover:opacity-80 transition-opacity"
            aria-label="Next testimonial"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
