"use client";

import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useVisibleVideoTestimonials } from "@/lib/hooks/useTestimonials";

export default function DiamondVideoTestimonials() {
  const { data: videoTestimonials, isLoading, isError } =
    useVisibleVideoTestimonials();
  const [playerHeight, setPlayerHeight] = useState("380px");

  useEffect(() => {
    const handleResize = () => {
      setPlayerHeight(window.innerWidth < 1024 ? "240px" : "380px");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fallback videos mirroring the main landing page structure
  const fallbackVideos = [
    {
      id: 101,
      title: "Samuel O. — Landed Cloud DevOps Role in UK",
      file_url: "https://www.youtube.com/watch?v=8Q3-A2CZx-c",
      tag: "Job secured",
      story: "6 months searching alone → 28 interviews and landed £72k offer in 9 weeks.",
    },
    {
      id: 102,
      title: "Adaeze N. — Skilled Worker Visa Sponsorship",
      file_url: "https://www.youtube.com/watch?v=8Q3-A2CZx-c",
      tag: "Visa sponsorship",
      story: "Targeted UK companies licensed for sponsorship before visa expiry → hired in 11 weeks.",
    },
  ];

  const videosToDisplay =
    videoTestimonials && videoTestimonials.length > 0
      ? videoTestimonials
      : fallbackVideos;

  return (
    <section id="results" className="relative bg-[#01090B] py-20 border-b border-white/10 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, #A2CE3A 0%, transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.12,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-start gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            03 · Testimonial videos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight">
            Hear it from people who got hired
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-2xl">
            Real clients, real offers across the UK, US, and Canada. Watch how dedicated Diamond management turned searches into signed employment offers.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <div className="text-white/60 font-mona-sans text-base">
                Loading client testimonial videos...
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videosToDisplay.map((video) => (
              <div
                key={video.id}
                className="rounded-[24px] border border-white/10 bg-[#0F1416] p-4 sm:p-5 flex flex-col gap-4 shadow-xl hover:border-white/20 transition-all"
              >
                <div className="rounded-[16px] overflow-hidden bg-black aspect-video flex items-center justify-center">
                  <ReactPlayer
                    src={video.file_url}
                    width="100%"
                    height="100%"
                    controls
                  />
                </div>
                <div className="flex flex-col gap-1.5 px-1 pb-1">
                  <div className="flex items-center justify-between">
                    <span className="inline-block text-[11px] font-mona-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#A2CE3A]/20 text-[#A2CE3A] border border-[#A2CE3A]/30">
                      {"tag" in video && typeof video.tag === "string"
                        ? video.tag
                        : "Verified Placement"}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-mona-sans text-white mt-1">
                    {video.title || "TalentLoop Client Story"}
                  </h3>
                  {"story" in video && typeof video.story === "string" && (
                    <p className="text-xs sm:text-sm font-sora text-[#94A3B8]">
                      {video.story}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
