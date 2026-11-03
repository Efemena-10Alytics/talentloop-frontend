"use client";

export default function DiamondPricing() {
  const scrollToBooking = () => {
    const el = document.getElementById("book");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="price" className="bg-[#01090B] py-20 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            09 · Price
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight">
            One programme. Two ways to pay.
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-2xl">
            $5,000 for 6 months of Diamond support, from the day you're assigned your manager. Only 9 intakes per year.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Pay in Full */}
          <div className="rounded-[32px] p-8 sm:p-10 bg-[#0F1416] border-2 border-[#A2CE3A] shadow-[0_0_40px_rgba(162,206,58,0.12)] flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-8 px-3.5 py-1 rounded-full text-xs font-mona-sans font-extrabold uppercase tracking-wide bg-[#A2CE3A] text-[#090B0E]">
              Best value · save $375
            </div>

            <div>
              <h3 className="text-2xl font-bold font-mona-sans text-white mb-2 mt-2">
                Pay in full
              </h3>
              <p className="text-sm font-sora text-[#94A3B8] mb-6">
                One-time payment at agreement signing. Includes instant 7.5% discount.
              </p>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl font-extrabold font-mona-sans text-white">
                  $4,625
                </span>
                <span className="text-xl font-sora text-[#64748B] line-through">
                  $5,000
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-sora text-[#CCCCCC] mb-8 leading-relaxed">
                ✓ Full 6 months of managed applications & coaching<br />
                ✓ Backed by 25–30 interview guarantee<br />
                ✓ Priority 1-on-1 manager onboarding
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToBooking}
              className="w-full py-4 rounded-full font-mona-sans font-bold text-sm sm:text-base bg-[#A2CE3A] text-[#090B0E] hover:bg-[#b0df45] transition-colors shadow-lg active:scale-95"
            >
              Book a clarity call
            </button>
          </div>

          {/* Card 2: 3 Instalments */}
          <div className="rounded-[32px] p-8 sm:p-10 bg-[#0F1416] border border-white/15 shadow-xl flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mona-sans font-bold uppercase tracking-wide bg-white/10 text-white/80 border border-white/10 mb-4">
                Spread the cost
              </span>

              <h3 className="text-2xl font-bold font-mona-sans text-white mb-2">
                3 instalments
              </h3>
              <p className="text-sm font-sora text-[#94A3B8] mb-6">
                Flexible payments across the first 60 days of your program.
              </p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-extrabold font-mona-sans text-white">
                  $5,000
                </span>
                <span className="text-sm font-sora text-[#94A3B8]">
                  total investment
                </span>
              </div>

              <div className="flex flex-col gap-3 py-3 border-y border-white/10 text-sm font-sora text-[#CCCCCC] mb-8">
                <div className="flex justify-between items-center">
                  <span>At signing</span>
                  <strong className="font-mona-sans font-bold text-base text-white">
                    $2,250
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Day 30</span>
                  <strong className="font-mona-sans font-bold text-base text-white">
                    $1,500
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Day 60</span>
                  <strong className="font-mona-sans font-bold text-base text-white">
                    $1,250
                  </strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToBooking}
              className="w-full py-4 rounded-full font-mona-sans font-bold text-sm sm:text-base bg-transparent text-white border border-white/20 hover:bg-white/5 transition-colors active:scale-95"
            >
              Book a clarity call
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-sora text-[#94A3B8] text-center max-w-2xl mx-auto mt-8 leading-relaxed">
          * Hired before your plan ends? Congratulations: any remaining balance is due within 30 days of your offer. The guarantee applies while your account is paid and current.
        </p>
      </div>
    </section>
  );
}
