"use client";

import Link from "next/link";

export default function DiamondFooter() {
  const scrollToBooking = () => {
    const el = document.getElementById("book");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#050C0E] text-white pt-20 pb-12 relative overflow-hidden border-t border-white/10">
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, #A2CE3A 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.12,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
        {/* Urgency Final CTA Box */}
        <div className="flex flex-col items-center text-center gap-6 pb-16 border-b border-white/10">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mona-sans font-bold uppercase tracking-wider bg-[#FEF3C7]/15 text-[#FDE68A] border border-[#FDE68A]/30">
            Limited Cohort Capacity
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-mona-sans tracking-tight max-w-3xl leading-tight">
            Only 9 intakes a year. Is one of them yours?
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-xl">
            Don't navigate another 6 months of silent rejections alone. Partner with our top performers and land the offer you deserve.
          </p>

          <button
            type="button"
            onClick={scrollToBooking}
            className="px-8 sm:px-10 py-4 rounded-full font-mona-sans font-bold text-base sm:text-lg bg-[#A2CE3A] text-[#090B0E] hover:bg-[#b0df45] transition-all shadow-lg active:scale-95"
          >
            Book your clarity call
          </button>
        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-sora text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="Talentloop"
              className="h-7 w-auto object-contain"
            />
            <span>© {new Date().getFullYear()} TalentLoop. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms & guarantee T&Cs
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
