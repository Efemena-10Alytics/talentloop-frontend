"use client";

export default function DiamondProblem() {
  const problems = [
    {
      title: "Hundreds of applications, no replies",
      description:
        "Applying on job boards feels like dropping your CV into a black hole. Generic applications get lost among thousands of applicants, leading to months of silence.",
      badge: "High ghosting rate",
      icon: (
        <svg
          className="w-8 h-8 text-[#FB7185]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "A CV that doesn't get past screening",
      description:
        "Modern ATS bots and busy recruiters spend under 6 seconds per resume. Without tailored framing, strategic keywords, and quantified impact, strong talent gets rejected.",
      badge: "ATS filtering",
      icon: (
        <svg
          className="w-8 h-8 text-[#FBBF24]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "No time to search while working",
      description:
        "Juggling a demanding day job, family, and late-night job hunts burns you out. Researching companies, tailoring letters, and networking demands 20+ hours a week.",
      badge: "Search burnout",
      icon: (
        <svg
          className="w-8 h-8 text-[#818CF8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#050C0E] py-20 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            02 · The problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight max-w-2xl">
            You're qualified. The search is what's broken.
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-2xl">
            Talented professionals lose months to broken hiring algorithms and fragmented processes. Diamond replaces guesswork with managed execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#0F1416] rounded-[24px] p-7 border border-white/10 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <span className="text-[11px] font-mona-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-[#94A3B8] border border-white/10">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-mona-sans text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-sm font-sora text-[#CCCCCC] leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
