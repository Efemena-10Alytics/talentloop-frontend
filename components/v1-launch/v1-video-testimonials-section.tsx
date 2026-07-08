"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { useVisibleVideoTestimonials } from "@/lib/hooks/useTestimonials";

export default function V1VideoTestimonialSection() {
  const {
    data: videoTestimonials,
    isLoading,
    isError,
  } = useVisibleVideoTestimonials();

  return (
    <section className="relative py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl lg:text-5xl text-white font-mona-sans font-semibold leading-tight mb-4">
            <span className="text-white font-mona-sans"> Listen To What </span>
            <span className="text-[#A2CE3A] font-mona-sans mr-x">
              Our Clients
            </span>
            Who <br />
            <span className="text-[#A2CE3A] font-mona-sans mx-1">Got Hired</span>
            Have To Say
          </h2>
        </motion.div>{" "}
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
                Loading video testimonials...
              </div>
            </div>
          </div>
        )}
        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 font-mona-sans text-lg">
              Failed to load video testimonials. Please try again later.
            </div>
          </div>
        )}
        {/* Video Grid */}
        {!isLoading &&
          !isError &&
          videoTestimonials &&
          videoTestimonials.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6 mb-10">
              {videoTestimonials.map((video) => (
                <div
                  key={video.id}
                  className="border-t border-x border-b-[0.4px] border-[#F8FAFC] rounded-[10px] flex flex-col gap-5"
                >
                  <div className="rounded-lg overflow-hidden">
                    <ReactPlayer
                      //@ts-ignore
                      url={video.file_url}
                      width="100%"
                      height="420px"
                      controls
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        {/* Empty State */}
        {!isLoading &&
          !isError &&
          (!videoTestimonials || videoTestimonials.length === 0) && (
            <div className="flex items-center justify-center py-20">
              <div className="text-white/60 font-mona-sans text-lg">
                No video testimonials available at the moment.
              </div>
            </div>
          )}
        <div className="lg:pt-5">
          <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full pointer-events-none">
            <img
              src="/blush.png"
              alt=""
              className="w-full max-w-[1400px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
