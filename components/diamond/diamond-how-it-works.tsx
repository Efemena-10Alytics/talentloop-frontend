"use client";

export default function DiamondHowItWorks() {
  const steps = [
    {
      num: "01",
      step: "STEP 1",
      title: "Clarity call",
      description:
        "We review your target trajectory, assess visa & location requirements, check background fit, and align on clear targets.",
      duration: "Day 1",
    },
    {
      num: "02",
      step: "STEP 2",
      title: "Meet your manager",
      description:
        "You're paired 1-on-1 with one of our top senior managers. Your dedicated 6-month placement clock officially starts here.",
      duration: "Days 2–3",
    },
    {
      num: "03",
      step: "STEP 3",
      title: "Positioning & Assets",
      description:
        "Deep positioning interview, your master CV rebuilt for UK/US/Canada standards, and your LinkedIn profile fully overhauled.",
      duration: "Weeks 1–2",
    },
    {
      num: "04",
      step: "STEP 4",
      title: "We apply for you",
      description:
        "Your manager submits 15–30 tailored applications each week with customized CVs and cover notes, with weekly tracker reports.",
      duration: "Weeks 3–24",
    },
    {
      num: "05",
      step: "STEP 5",
      title: "Interviews to offer",
      description:
        "Intensive mock interview sessions before every real round, behavioral prep, technical framing, through to salary negotiation.",
      duration: "Until hired",
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#050C0E] py-20 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            04 · How Diamond works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight">
            Your six months, step by step
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-2xl">
            A battle-tested 5-stage placement blueprint executed entirely by your senior manager. You prepare for interviews; we handle the search.
          </p>
        </div>

        {/* 5-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5">
          {steps.map((st) => (
            <div
              key={st.num}
              className="bg-[#0F1416] rounded-[24px] p-6 border border-white/10 shadow-lg hover:border-[#A2CE3A]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold font-mona-sans text-[#090B0E] bg-[#A2CE3A] px-2.5 py-1 rounded-md">
                    {st.step}
                  </span>
                  <span className="text-[11px] font-sora font-semibold text-[#94A3B8]">
                    {st.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-mona-sans text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm font-sora text-[#CCCCCC] leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
