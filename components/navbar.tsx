"use client";

import { useState, useEffect } from "react";

const navLinks = ["Find Interview Coach", "Auto Apply", "AI Copilot"];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the hero section (adjust threshold as needed)
      const heroHeight = window.innerHeight; // Assuming hero section is full viewport height
      const scrollPosition = window.scrollY;

      setIsScrolled(scrollPosition > heroHeight * 0.1); 
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="relative w-full">
        {/* Background layer with fade animation */}
        <div
          className={`absolute inset-0 bg-[url('/homepage/bg1.svg')] bg-cover bg-center shadow-lg transition-opacity duration-700 ease-in-out ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        
        {/* Content layer */}
        <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-6 py-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="Talentloop logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          <nav className="hidden items-center gap-3 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link}
                className="rounded-full bg-[#FFFFFF26] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#FFFFFF33] font-mona-sans"
              >
                {link}
              </button>
            ))}
          </nav>

          <button className="rounded-full bg-[#A2CE3A] px-9 py-2 text-sm font-semibold text-[#121212] transition-transform hover:scale-[1.02] font-mona-sans">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}