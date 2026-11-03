"use client";

import { useState } from "react";

export default function DiamondFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How is Diamond different from your standard service?",
      a: "You work with one of our top 3 performers, who take no more than 3 Diamond clients each. You get a tailored CV for every application, 15–30 applications a week, multiple positioning and mock prep sessions, and both an interview and a job guarantee.",
    },
    {
      q: "When do my 6 months start?",
      a: "From the day you're officially assigned your Diamond manager following your clarity call and agreement signing.",
    },
    {
      q: "What counts as an interview?",
      a: "Hiring manager interviews, technical screenings, and assessments that progress you to the next hiring stage. Initial 15-minute recruiter introductory screens don't count toward your quota.",
    },
    {
      q: "What if you don't get me 25–30 interviews?",
      a: "You choose: a 20% direct refund, or 3 more months of active service until we reach the target range. If you hit the range but haven't accepted an offer, we support you for another 3 months at zero extra cost.",
    },
    {
      q: "Which countries do you cover?",
      a: "We've placed clients in the US, UK, Canada, and 4 other countries. Your target market is agreed with you on the clarity call, based on your professional experience, visa status, and where active demand exists.",
    },
    {
      q: "Do you apply for remote roles?",
      a: "Diamond isn't designed for remote-only searches. We target hybrid and onsite roles too. If you're in the UK, we'll also discuss being open to relocating within the country, since some regions have far fewer openings.",
    },
    {
      q: "Can I pay in instalments?",
      a: "Yes: $2,250 at signing, $1,500 at day 30, and $1,250 at day 60 (totaling $5,000). Or pay in full for $4,625 and save $375 (7.5% discount).",
    },
    {
      q: "What if I get hired early?",
      a: "Congratulations! That is our joint goal. Any remaining instalment balance is simply due within 30 days of receiving your written employment offer.",
    },
    {
      q: "How much of my time does it take?",
      a: "We execute the heavy lifting: sourcing vacancies and tailoring applications. You'll need time for initial positioning sessions, weekly syncs, mock interview prep, and attending real interviews (typically 3–5 hours per week).",
    },
    {
      q: "What if I go quiet?",
      a: "To protect our managers' time and maintain search momentum, if we cannot reach you for 30 consecutive days with no prior explanation, placement service and guarantees are paused or terminated.",
    },
  ];

  return (
    <section id="faq" className="bg-[#01090B] py-20 border-b border-white/10">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            12 · Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight">
            Questions people ask before joining
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC]">
            Everything you need to know about eligibility, terms, guarantees, and day-to-day management.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col border-t border-white/15">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border-b border-white/15 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left group"
                >
                  <span className="text-base sm:text-lg font-bold font-mona-sans text-white group-hover:text-[#A2CE3A] transition-colors">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#A2CE3A] text-[#090B0E] rotate-180"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-6 pr-6 text-sm sm:text-base font-sora text-[#CCCCCC] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
