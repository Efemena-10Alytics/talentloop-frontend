"use client";

export default function DiamondGuarantee() {
  return (
    <section id="guarantee" className="bg-[#050C0E] text-white py-20 border-b border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, #A2CE3A 0%, transparent 70%)",
          filter: "blur(110px)",
          opacity: 0.12,
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, #156374 0%, transparent 70%)",
          filter: "blur(110px)",
          opacity: 0.2,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-start gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-bold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-[#A2CE3A]/30">
            06 · The guarantee
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight max-w-3xl">
            25–30 interviews in 6 months, or you choose what happens next
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-2xl">
            We put our reputation and revenue behind our execution. Our dual guarantee gives you complete peace of mind.
          </p>
        </div>

        {/* 3 Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-[24px] bg-[#0F1416] border border-white/15 p-7 flex flex-col justify-between hover:border-[#A2CE3A]/50 transition-colors shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#A2CE3A]/20 text-[#A2CE3A] flex items-center justify-center font-mona-sans font-extrabold text-xl mb-4 border border-[#A2CE3A]/30">
                01
              </div>
              <h3 className="text-xl font-bold font-mona-sans text-white mb-2">
                If we miss the range
              </h3>
              <p className="text-sm font-sora text-[#CCCCCC] leading-relaxed">
                If we don't deliver 25–30 genuine interviews, you pick: a <strong className="text-white">20% direct refund</strong>, or <strong className="text-white">3 more months</strong> of intensive service until we hit the range.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] bg-[#0F1416] border border-white/15 p-7 flex flex-col justify-between hover:border-[#A2CE3A]/50 transition-colors shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#A2CE3A]/20 text-[#A2CE3A] flex items-center justify-center font-mona-sans font-extrabold text-xl mb-4 border border-[#A2CE3A]/30">
                02
              </div>
              <h3 className="text-xl font-bold font-mona-sans text-white mb-2">
                Interviews come but no offer
              </h3>
              <p className="text-sm font-sora text-[#CCCCCC] leading-relaxed">
                If you reach the 25–30 interview range but haven't accepted an offer within 6 months, we continue full coaching and application support for <strong className="text-white">another 3 months at zero extra cost</strong>.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] bg-[#0F1416] border border-white/15 p-7 flex flex-col justify-between hover:border-[#A2CE3A]/50 transition-colors shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#A2CE3A]/20 text-[#A2CE3A] flex items-center justify-center font-mona-sans font-extrabold text-xl mb-4 border border-[#A2CE3A]/30">
                03
              </div>
              <h3 className="text-xl font-bold font-mona-sans text-white mb-2">
                Job Placement Guarantee
              </h3>
              <p className="text-sm font-sora text-[#CCCCCC] leading-relaxed">
                Formal legal backing written into your service agreement. We stay in your corner through mock interviews, negotiation, and contract signing until you are placed.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee Legal Clarification */}
        <div className="p-5 rounded-[20px] bg-[#0F1416] border border-white/10 text-xs sm:text-sm font-sora text-[#94A3B8] leading-relaxed">
          <strong className="text-white">What counts:</strong> Interviews and progression assessments with hiring teams; recruiter initial screenings do not count toward your quota. Clock starts the day your Diamond manager is officially assigned. The guarantee remains active while your account is in good standing.
        </div>
      </div>
    </section>
  );
}
