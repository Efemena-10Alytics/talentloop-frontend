"use client";

import { useEffect, useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "Mid-level professionals aiming higher",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    text: "Early-career professionals",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    text: "Career changers seeking new opportunities",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    text: "Senior professionals looking to level up",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    text: "Recent graduates entering the job market",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
];

export default function WhoTalentLoopIsFor() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused && scrollContainer) {
          // Scroll by 1px for smooth animation
          scrollContainer.scrollLeft += 1;

          // Reset to beginning when reaching the end
          if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          ) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 20);
    };

    startScrolling();

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [isPaused]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="overflow-hidden pb-12 lg:py-10">
        {/* Large Background Logo */}
        <div className="relative w-full mx-auto max-w-[1400px] overflow-hidden py-7 lg:py-12">
          <div className="hidden lg:block relative w-full h-24 lg:h-32">
            <img
              src="/talentloop-footer.svg"
              alt="TalentLoop.ai"
              className="object-contain"
            />
          </div>
        </div>
        <section 
        className="relative bg-[#FFFFFF1A] border-2 border-white/10 rounded-[32px] p-3 lg:px-3 lg:py-6">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-start justify-center  overflow-hidden">
            <Fade direction="down" triggerOnce duration={2000}>
              <h2
                className="text-[120px] lg:text-[200px] xl:text-[280px] font-mona-sans font-bold opacity-5 text-white whitespace-nowrap"
                style={{ letterSpacing: "-0.02em" }}
              >
                TalentLoop.ai
              </h2>
            </Fade>
          </div>

          <div className="relative max-w-[1400px] mx-auto px-3 lg:px-6">
            {/* Content Container */}
            <div className="relative bg-[#000000]/40 backdrop-blur-3xl border-2 border-white/10 rounded-[32px] p-8 lg:p-16 overflow-hidden">
              {/* Dark Gradient Overlay */}
              <div
                className="absolute inset-0 rounded-[32px]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 100%, rgba(94, 119, 49, 0.3) 0%, rgba(0, 0, 0, 0) 60%)",
                }}
              />

              <div className="relative">
                {/* Main Heading */}
                <div className="text-center mb-12 lg:mb-16 space-y-4 ">
                  <Fade direction="down" triggerOnce duration={2000}>
                    <h1 className="text-4xl lg:text-6xl xl:text-7xl font-mona-sans font-bold text-white">
                      WHO TALENTLOOP.AI
                      <br />
                      IS FOR
                    </h1>
                  </Fade>
                  <Fade direction="down" triggerOnce duration={2000}>
                    <p className="text-lg lg:text-xl font-sora text-white">
                      TalentLoop is for:
                    </p>
                  </Fade>
                </div>

                {/* Stars Rating */}
                <div className="relative flex justify-center items-center gap-2 mb-4 z-20">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 lg:w-8 lg:h-8"
                      viewBox="0 0 24 24"
                      fill="#FFFFFF"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>

                {/* Trusted Text */}
                <p className="relative text-center text-white font-sora text-sm lg:text-base mb-8 lg:mb-12 z-20">
                  Trusted by hundreds of
                </p>

                {/* Scrolling Testimonials Container */}
                <div
                  className="relative z-20"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Gradient Overlays for fade effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />

                  {/* Scrolling Container */}
                  <div
                    ref={scrollContainerRef}
                    className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {/* Duplicate testimonials for infinite scroll effect */}
                    {[...testimonials, ...testimonials, ...testimonials].map(
                      (testimonial, index) => (
                        <div
                          key={`${testimonial.id}-${index}`}
                          className="flex items-center gap-2"
                        >
                          {/* Avatar */}
                          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-4 border-[#A2CE3A] bg-gradient-to-br from-[#A2CE3A] to-[#7A9E2A] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {/* Placeholder for person image */}
                            <img
                              src={testimonial.image}
                              alt=""
                              className="h-20 w-20 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-3 lg:gap-4 bg-white/90 backdrop-blur-sm rounded-full px-4 lg:px-6 py-3 lg:py-4 min-w-[280px] lg:min-w-[400px]">
                            {/* Text */}
                            <p className="text-[#1A1D21] font-sora text-sm lg:text-base font-medium">
                              {testimonial.text}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Decorative Orb at bottom (optional) */}
                <div className="absolute hidden lg:block lg:-bottom-12 left-1/2 lg:left-[0%] z-0">
                 <img src="/homepage/Ellipse 209.png" alt="" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Hide scrollbar globally for this component */}
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </section>
      </div>
    </motion.section>
  );
}
