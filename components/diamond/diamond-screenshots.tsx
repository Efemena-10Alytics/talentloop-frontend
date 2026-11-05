"use client";

import { useState } from "react";
import { useVisibleImageTestimonials } from "@/lib/hooks/useTestimonials";

export default function DiamondScreenshots() {
  const { data: imageTestimonials } = useVisibleImageTestimonials();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterTabs = [
    "All",
    "Job secured",
    "Interview wins",
    "Salary increases",
    "Visa sponsorship",
    "Career transitions",
  ];

  const fallbackWins = [
    {
      id: "win-1",
      category: "Job secured",
      platform: "WhatsApp",
      date: "Tuesday, 14:22",
      sender: "Senior Dev Lead",
      message:
        "Adeiza!! I got the contract! £85,000 base + 15% bonus. Signing today! Thank you and Happiness so much, this completely changed our year! 🙏🔥",
    },
    {
      id: "win-2",
      category: "Interview wins",
      platform: "Email",
      date: "Yesterday",
      sender: "Product Manager",
      message:
        "Just finished the final stage panel with Revolut. They told me I was the strongest candidate they've interviewed all quarter! Mock prep paid off 100%.",
    },
    {
      id: "win-3",
      category: "Visa sponsorship",
      platform: "WhatsApp",
      date: "Monday, 09:15",
      sender: "Data Engineer",
      message:
        "CoS (Certificate of Sponsorship) approved this morning!! 🇬🇧 Skilled Worker Visa secured for 5 years! Can't believe it happened in 8 weeks after a year of struggle.",
    },
    {
      id: "win-4",
      category: "Salary increases",
      platform: "Email",
      date: "Friday, 17:40",
      sender: "Finance Analyst",
      message:
        "They came back with $115,000 CAD after Abdullahi coached me on counter-offering. That's $25k more than my initial target! Absolutely thrilled.",
    },
    {
      id: "win-5",
      category: "Career transitions",
      platform: "WhatsApp",
      date: "3 days ago",
      sender: "Project Coordinator",
      message:
        "Officially transitioned into Tech PM! First week went great. The tailored CV was what got me in the door when everyone else filtered me out.",
    },
    {
      id: "win-6",
      category: "Interview wins",
      platform: "Email",
      date: "Last week",
      sender: "Cybersecurity Analyst",
      message:
        "Three interview invites in 48 hours: Barclays, NHS Digital, and a US healthcare firm. The volume and speed is unbelievable compared to applying solo.",
    },
    {
      id: "win-7",
      category: "Job secured",
      platform: "WhatsApp",
      date: "Last week",
      sender: "Operations Manager",
      message:
        "Offer letter in hand! Starting next month. Diamond was the best investment I made. Having Oluwaseun handle the applications took off all the stress.",
    },
    {
      id: "win-8",
      category: "Visa sponsorship",
      platform: "Email",
      date: "2 weeks ago",
      sender: "Solutions Architect",
      message:
        "Relocation package approved and visa application submitted. Moving to Manchester with my family next month. Immensely grateful to the team!",
    },
  ];

  const filtered =
    selectedFilter === "All"
      ? fallbackWins
      : fallbackWins.filter((w) => w.category === selectedFilter);

  return (
    <section className="bg-[#050C0E] py-20 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            08 · Testimonial screenshots
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight">
            The messages we get every week
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-2xl">
            Unfiltered feedback, offer celebrations, and interview invites from active Diamond cohort members.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-10">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mona-sans font-bold transition-all ${
                  isActive
                    ? "bg-[#A2CE3A] text-[#090B0E] shadow-md"
                    : "bg-[#0F1416] text-[#CCCCCC] border border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Dynamic Image Testimonials */}
        {imageTestimonials && imageTestimonials.length > 0 && selectedFilter === "All" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {imageTestimonials.slice(0, 4).map((imgTestimonial, idx) => (
              <div
                key={imgTestimonial.id || idx}
                className="rounded-[20px] overflow-hidden border border-white/10 bg-[#0F1416] shadow-lg"
              >
                <img
                  src={imgTestimonial.file_url}
                  alt={imgTestimonial.title || "Client Testimonial"}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Message Win Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((win) => (
            <div
              key={win.id}
              className="bg-[#0F1416] rounded-[24px] p-5 border border-white/10 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mona-sans font-extrabold uppercase px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10">
                    {win.platform}
                  </span>
                  <span className="text-[11px] font-sora text-[#94A3B8]">
                    {win.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-sora text-[#CCCCCC] leading-relaxed mb-4">
                  "{win.message}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-xs font-bold font-mona-sans text-white">
                  {win.sender}
                </span>
                <span className="text-[11px] font-mona-sans font-semibold text-[#A2CE3A]">
                  {win.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs font-sora text-[#94A3B8] mt-6">
          * Names and personal details blurred with client permission.
        </p>
      </div>
    </section>
  );
}
