"use client";

export default function DiamondFit() {
  const forYou = [
    "You have active work experience in the career you want to move into",
    "You have up to 3 years of combined work experience",
    "Your visa is valid for up to a year (if you're currently on one)",
    "You're open on target market — we agree targets together on your clarity call",
    "You want seasoned experts to handle application volume and positioning for you",
    "You have time to attend intensive mock prep sessions before real interviews",
  ];

  const notForYou = [
    "You are strictly looking for 100% remote-only roles (Diamond targets hybrid & onsite too)",
    "You're set on one narrow location with few openings and aren't open to relocating within country",
    "You plan to switch target career tracks mid-program without resetting the placement roadmap",
    "You are looking for entry-level internships without any prior experience",
  ];

  return (
    <section className="bg-[#050C0E] py-20 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            10 · Is Diamond right for you?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight">
            Clear expectations. Mutual fit.
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-2xl">
            Because our managers commit personal hours and back our work with guarantees, we only accept clients when mutual fit is established.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: For You */}
          <div className="rounded-[32px] p-8 bg-[#0F1416] border border-[#00C063]/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00C063]/20 text-[#00C063] flex items-center justify-center font-bold border border-[#00C063]/30">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-mona-sans text-white">
                  Diamond is for you if…
                </h3>
              </div>

              <div className="flex flex-col gap-4 text-sm font-sora text-[#CCCCCC]">
                {forYou.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#00C063] font-bold text-base shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Not For You */}
          <div className="rounded-[32px] p-8 bg-[#0F1416] border border-[#FB7185]/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FB7185]/20 text-[#FB7185] flex items-center justify-center font-bold border border-[#FB7185]/30">
                  ✕
                </div>
                <h3 className="text-2xl font-bold font-mona-sans text-white">
                  It's not for you if…
                </h3>
              </div>

              <div className="flex flex-col gap-4 text-sm font-sora text-[#CCCCCC]">
                {notForYou.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#FB7185] font-bold text-base shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
