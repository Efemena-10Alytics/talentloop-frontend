"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function DiamondNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80; // Offset for sticky navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#01090B]/95 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-[#01090B] border-b border-white/10"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo & Diamond Badge */}
        <div className="flex items-center gap-3">
          <Link href="#" className="inline-flex items-center">
            <img
              src="/logo.svg"
              alt="TalentLoop"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mona-sans font-bold uppercase tracking-wider bg-[#A2CE3A]/20 text-[#A2CE3A] border border-[#A2CE3A]/30">
            Diamond
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-sora font-medium text-[#CCCCCC]">
          <a
            href="#results"
            onClick={(e) => handleNavClick(e, "results")}
            className="hover:text-white transition-colors"
          >
            Results
          </a>
          <a
            href="#offer"
            onClick={(e) => handleNavClick(e, "offer")}
            className="hover:text-white transition-colors"
          >
            What you get
          </a>
          <a
            href="#guarantee"
            onClick={(e) => handleNavClick(e, "guarantee")}
            className="hover:text-white transition-colors"
          >
            Guarantee
          </a>
          <a
            href="#price"
            onClick={(e) => handleNavClick(e, "price")}
            className="hover:text-white transition-colors"
          >
            Price
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, "faq")}
            className="hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <a
          href="#book"
          onClick={(e) => handleNavClick(e, "book")}
          className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-mona-sans font-bold bg-[#A2CE3A] text-[#090B0E] hover:bg-[#b0df45] transition-all shadow-md active:scale-95"
        >
          Book a clarity call
        </a>
      </div>
    </header>
  );
}
