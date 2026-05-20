"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const testimonials = [
  {
    id: 1,
    name: "Amara O.",
    role: "Talentloop Expert",
    image: "/coaches/coach1.jpg",
    rating: 4.5,
    average: 4.92,
    quote: "Three interviews in the first 11 days after my CV relaunch, including two from companies I'd been rejected from before. The positioning rewrite changed everything.",
    details: "She explained all requirement and provide details feedback. You should work with her."
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Career Switcher",
    image: "/coaches/coach2.jpg",
    rating: 5.0,
    average: 4.95,
    quote: "I went from zero responses to 5 interviews in 3 weeks. The LinkedIn optimization was a game-changer for my profile visibility.",
    details: "Highly professional and results-driven. Worth every penny."
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Senior Developer",
    image: "/coaches/coach3.jpg",
    rating: 4.8,
    average: 4.88,
    quote: "The job application service saved me hours of work. They applied to 50+ positions and I got callbacks from 8 companies.",
    details: "Amazing attention to detail and personalized approach."
  }
];

export default function V1TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-20 lg:py-32" style={{ background: "#01090BB2" }}>
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Profile Info Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-3 bg-[#0B0D0F] rounded-full px-5 py-3 border border-white/10">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <img
                  key={index}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-8 h-8 rounded-full border-2 border-[#0B0D0F] object-cover"
                />
              ))}
            </div>
            <span className="text-white/60 font-sora text-sm">
              Trusted by <span className="text-white font-semibold">600+</span> good customers
            </span>
            <div className="w-8 h-8 rounded-full bg-[#A2CE3A] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#0B0D0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-mona-sans font-bold text-white mb-4">
            Real moves, by real professionals.
          </h2>
          <p className="text-white/60 font-sora text-base">
            Our happy clients, who shared her experience with us!
          </p>
        </motion.div>

        {/* Testimonial Card with Navigation */}
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
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="rounded-[20px] p-8 lg:p-12"
              style={{
                background: "#1563741A",
                boxShadow: "0px 12px 24px 0px #00000005, 0px 8px 16px 0px #00000005, 0px 4px 8px 0px #00000005"
              }}
            >
              {/* Quotation Mark */}
              <div className="mb-6">
                <QuotationIcon />
              </div>

              {/* Profile Section */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white font-mona-sans text-xl font-bold">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-white/60 font-sora text-sm">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>

                {/* Ratings */}
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-white font-mona-sans text-2xl font-bold mb-1">
                      {currentTestimonial.average}
                    </div>
                    <div className="text-white/40 font-sora text-xs">Average</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 mb-1">
                      <StarIcon />
                      <span className="text-white font-mona-sans text-2xl font-bold">
                        {currentTestimonial.rating}
                      </span>
                    </div>
                    <div className="text-white/40 font-sora text-xs">Sarah's rating</div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-white font-sora text-lg mb-6 leading-relaxed">
                "{currentTestimonial.quote}"
              </p>

              {/* Details */}
              <p className="text-white/60 font-sora text-sm">
                {currentTestimonial.details}
              </p>
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
