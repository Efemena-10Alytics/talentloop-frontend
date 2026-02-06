"use client";

import { useState } from "react";
import Image from "next/image";

const TwitterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-3 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Logo and Description */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo.svg" className="scale-[120%] object-contain" />
            </div>

            {/* Description */}
            <p className="text-[#ACACAC] font-sora text-sm leading-relaxed">
              Apply Faster. Interview Smarter. Get Hired. The AI Job Search
              Platform that actively makes you a better candidate.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#2A2D31] flex items-center justify-center text-white hover:bg-[#A2CE3A] hover:text-black transition-all duration-300"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#2A2D31] flex items-center justify-center text-white hover:bg-[#A2CE3A] hover:text-black transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#2A2D31] flex items-center justify-center text-white hover:bg-[#A2CE3A] hover:text-black transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#2A2D31] flex items-center justify-center text-white hover:bg-[#A2CE3A] hover:text-black transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Column 2 - Platform */}
          <div className="space-y-4">
            <h3 className="text-white font-mona-sans text-lg font-bold">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#ACACAC] font-sora text-sm hover:text-[#A2CE3A] transition-colors"
                >
                  Auto Apply
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#ACACAC] font-sora text-sm hover:text-[#A2CE3A] transition-colors"
                >
                  AI Copilot
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#ACACAC] font-sora text-sm hover:text-[#A2CE3A] transition-colors"
                >
                  Career Intelligence
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#ACACAC] font-sora text-sm hover:text-[#A2CE3A] transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div className="space-y-4">
            <h3 className="text-white font-mona-sans text-lg font-bold">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#ACACAC] font-sora text-sm hover:text-[#A2CE3A] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#ACACAC] font-sora text-sm hover:text-[#A2CE3A] transition-colors"
                >
                  Testimonial
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#ACACAC] font-sora text-sm hover:text-[#A2CE3A] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#ACACAC] font-sora text-sm hover:text-[#A2CE3A] transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-mona-sans text-lg font-bold">
              Contact
            </h3>
            <p className="text-[#ACACAC] font-sora text-sm leading-relaxed">
              Apply Faster. Interview Smarter. Get Hired. The AI Job Search
              Platform that actively makes you a better candidate.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#A2CE3A] rounded-full text-black font-mona-sans text-sm font-semibold hover:bg-[#92BE2A] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section with Large Logo */}
      <div className="relative border-t border-white/10">
        {/* Large Background Logo */}
        <div className="relative w-full mx-auto max-w-[1400px] overflow-hidden py-8 lg:py-12">
          <div className="relative w-full h-24 lg:h-32">
            <img
              src="/talentloop-footer.svg"
              alt="TalentLoop.ai"
              className="object-contain"
            />
          </div>
        </div>

        {/* Copyright and Legal Links */}
        {/* <div className="max-w-[1400px] mx-auto px-3 lg:px-6 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#ACACAC] font-sora text-xs">
            <p>© 2024 TalentLoop.ai. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#A2CE3A] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#A2CE3A] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#A2CE3A] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
}