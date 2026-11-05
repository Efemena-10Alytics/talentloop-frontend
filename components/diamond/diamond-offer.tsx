"use client";

export default function DiamondOffer() {
  const inclusions = [
    {
      num: "1",
      title: "Work with our top performers",
      desc: "Paired directly with one of our top 3 managers, each restricted to a maximum of 3 Diamond clients at any one time.",
    },
    {
      num: "2",
      title: "Multiple positioning sessions",
      desc: "We sharpen your personal brand narrative, define target sectors, and iteratively recalibrate as recruiter feedback rolls in.",
    },
    {
      num: "3",
      title: "A tailored CV for every application",
      desc: "Never submit a generic template: each vacancy gets a bespoke CV mapped to ATS keywords and recruiter hiring rubrics.",
    },
    {
      num: "4",
      title: "LinkedIn & online presence coverage",
      desc: "Headline, about section, and experience bullet points overhauled so inbound recruiters source you directly.",
    },
    {
      num: "5",
      title: "15–30 applications per week",
      desc: "Completely done for you with weekly spreadsheet tracking, application links, notes, and response auditing.",
    },
    {
      num: "6",
      title: "Multiple mock prep sessions",
      desc: "Live roleplay sessions with your manager prior to crucial recruiter screens, technical assessments, and panel rounds.",
    },
    {
      num: "7",
      title: "Interview & job guarantee",
      desc: "25–30 interviews in 6 months, or your choice of a 20% refund or 3 additional months of active service until landed.",
      isGuarantee: true,
    },
    {
      num: "★",
      title: "Bonus: Salary & counter-offer negotiation",
      desc: "Expert guidance during offer stages to optimize base compensation, bonuses, remote flexibility, and relocation packages.",
      isBonus: true,
    },
  ];

  return (
    <section id="offer" className="bg-[#01090B] py-20 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            05 · The offer — what's included
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight">
            Everything in Diamond
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-2xl">
            Our most comprehensive, white-glove career management tier. From positioning to applications and interview coaching, everything is executed for you.
          </p>
        </div>

        {/* 2 Column Offer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inclusions.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-[24px] p-6 sm:p-7 border transition-all flex items-start gap-4 ${
                item.isGuarantee
                  ? "bg-[#1563741A] border-[#00C063]/40 shadow-lg"
                  : item.isBonus
                  ? "bg-[#FEFCE8]/5 border-[#FDE047]/30 shadow-lg"
                  : "bg-[#0F1416] border-white/10 hover:border-white/25"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-mona-sans font-extrabold text-sm shrink-0 ${
                  item.isGuarantee
                    ? "bg-[#00C063]/20 text-[#00C063] border border-[#00C063]/30"
                    : item.isBonus
                    ? "bg-[#FDE047]/20 text-[#FDE047] border border-[#FDE047]/30"
                    : "bg-white/10 text-[#A2CE3A] border border-white/10"
                }`}
              >
                {item.num}
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base sm:text-lg font-bold font-mona-sans text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-sora text-[#CCCCCC] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
