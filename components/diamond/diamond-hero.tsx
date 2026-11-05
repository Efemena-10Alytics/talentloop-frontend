"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ReactPlayer from "react-player";

export default function DiamondHero() {
  const searchParams = useSearchParams();
  const variantParam = (searchParams?.get("v") || "a").toLowerCase();
  const [isPlaying, setIsPlaying] = useState(false);

  const heroContent = {
    a: {
      label: "A",
      headline: (
        <>
          25–30 interviews in 6 months.{" "}
          <span className="text-[#A2CE3A]">Guaranteed.</span>
        </>
      ),
      lede: "Work one-to-one with our top performers. They run your whole job search, from positioning and tailored CVs to 15–30 applications a week and mock interviews, until you land the role.",
    },
    b: {
      label: "B",
      headline: (
        <>
          Stop applying alone.{" "}
          <span className="text-[#A2CE3A]">Hand your search to our best.</span>
        </>
      ),
      lede: "Diamond pairs you with one of our top three client managers for six months, with an interview guarantee and a job guarantee written into your agreement.",
    },
    c: {
      label: "C",
      headline: (
        <>
          Our most premium service.{" "}
          <span className="text-[#A2CE3A]">Only 9 intakes a year.</span>
        </>
      ),
      lede: "Six months of done-for-you job search support from our highest-performing managers, backed by an interview and job guarantee.",
    },
  };

  const current =
    variantParam === "b"
      ? heroContent.b
      : variantParam === "c"
      ? heroContent.c
      : heroContent.a;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-[#01090B] pt-10 sm:pt-16 pb-16 border-b border-white/10 overflow-hidden">
      {/* Background ambient accents */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full"
        style={{
          background: "radial-gradient(circle, #A2CE3A 0%, transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.15,
        }}
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, #156374 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.2,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-white/80 border border-white/10">
                01 · Hero — option {current.label}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-bold uppercase tracking-wider bg-[#FEF3C7]/10 text-[#FDE68A] border border-[#FDE68A]/30">
                Only 9 intakes per year
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-mona-sans tracking-tight text-white leading-[1.08]">
              {current.headline}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-sora text-[#CCCCCC] leading-relaxed max-w-2xl">
              {current.lede}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => scrollTo("book")}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-full font-mona-sans font-bold text-sm sm:text-base bg-[#A2CE3A] text-[#090B0E] hover:bg-[#b0df45] transition-all shadow-lg active:scale-95"
              >
                Book your clarity call
              </button>
              <button
                type="button"
                onClick={() => scrollTo("results")}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-full font-mona-sans font-bold text-sm sm:text-base bg-transparent text-white border border-white/20 hover:bg-white/5 transition-all active:scale-95"
              >
                See client results
              </button>
            </div>

            <p className="text-xs sm:text-sm font-sora text-[#94A3B8] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              Only 9 slots available · Applications open 2 Nov
            </p>
          </div>

          {/* Right Column: Video Intro Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[24px] overflow-hidden border border-white/15 bg-[#0F1416] shadow-2xl aspect-[16/10] sm:aspect-video flex items-center justify-center group">
              {isPlaying ? (
                <ReactPlayer
                  src="https://www.youtube.com/watch?v=8Q3-A2CZx-c"
                  playing
                  controls
                  width="100%"
                  height="100%"
                />
              ) : (
                <div
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full h-full cursor-pointer flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-tr from-[#01090B] via-[#0F1416] to-[#151019]"
                >
                  <img
                    src="/homepage/1.png"
                    alt="Founder Intro"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity"
                  />
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[#A2CE3A] text-[#090B0E] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="relative z-10 font-mona-sans font-bold text-base sm:text-lg">
                    Watch Founder Intro (Adeiza)
                  </span>
                  <span className="relative z-10 text-xs font-sora text-[#CCCCCC] mt-1">
                    60–90s overview of the Diamond Package
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mona-sans text-white">
              1,000+
            </div>
            <div className="text-sm font-sora text-[#94A3B8] mt-1">
              interviews and assessments landed for clients in 2026
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mona-sans text-white">
              30+
            </div>
            <div className="text-sm font-sora text-[#94A3B8] mt-1">
              clients hired in 2026
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mona-sans text-white">
              7 countries
            </div>
            <div className="text-sm font-sora text-[#94A3B8] mt-1">
              US, UK, Canada + 4 others
            </div>
          </div>
        </div>

        {/* Hired By Company Logos */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="text-xs sm:text-sm font-sora font-semibold text-[#CCCCCC] uppercase tracking-wider shrink-0">
            Our clients have been hired by:
          </span>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {[
              "NHS",
              "Multiverse",
              "Eclerx",
              "Alstom",
              "Southern Airlines",
              "KPMG",
              "Deloitte",
            ].map((co) => (
              <span
                key={co}
                className="px-3.5 py-1.5 rounded-lg bg-[#0F1416] border border-white/10 text-xs font-mona-sans font-bold text-white/90"
              >
                {co}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
