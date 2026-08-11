"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function V1FooterSection() {
  return (
    <footer className="relative py-10 lg:py-16 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Left Side - Logo and Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {/* Logo */}
            <Link href="/">
              <img
                src="/logo.svg"
                alt="TalentLoop logo"
                className="h-8 w-auto object-contain"
              />
            </Link>

            {/* Tagline */}
            <p className="text-white/60 font-sora text-sm max-w-md">
              Apply Faster. Interview Smarter. Get Hired. The AI Job Search Platform that
              actively makes you a better candidate.
            </p>

            {/* Copyright */}
            <p className="text-white/40 font-sora text-xs mt-7 lg:mt-14">
              © 2025 All rights reserved
            </p>
          </motion.div>

          {/* Right Side - Social Media Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@talentloop.inc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="TikTok"
            >
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" rx="28" fill="white" fillOpacity="0.1"/>
                <path d="M31.3208 16H27.6852V32.3243C27.6852 34.0541 26.309 35.4865 24.5926 35.4865C22.8763 35.4865 21.5001 34.0541 21.5001 32.3243C21.5001 30.6262 22.8446 29.2261 24.5292 29.1622V25.4595C20.8302 25.5234 17.8643 28.5405 17.8643 32.3243C17.8643 36.1396 20.9037 39.1892 24.6242 39.1892C28.3446 39.1892 31.3843 36.108 31.3843 32.3243V23.1622C32.7605 24.1622 34.4451 24.7568 36.2249 24.7887V21.0861C33.4525 20.9899 31.3208 18.7147 31.3208 16Z" fill="white"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/183wJNuVeL/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" rx="28" fill="white" fillOpacity="0.1"/>
                <g clipPath="url(#clip0_39_531)">
                  <path d="M20.3823 16C17.9547 16 16 17.9547 16 20.3823V35.6178C16 38.0453 17.9547 40 20.3823 40H28.6398V30.6175H26.1588V27.2395H28.6398V24.3535C28.6398 22.0861 30.1057 20.0043 33.4825 20.0043C34.8497 20.0043 35.8608 20.1355 35.8608 20.1355L35.7813 23.29C35.7813 23.29 34.7501 23.2803 33.625 23.2803C32.4073 23.2803 32.212 23.8414 32.212 24.7728V27.2395H35.878L35.7183 30.6175H32.212V40H35.6177C38.0453 40 40 38.0454 40 35.6178V20.3823C40 17.9547 38.0453 16 35.6177 16H20.3822L20.3823 16Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_39_531">
                    <rect width="24" height="24" fill="white" transform="translate(16 16)"/>
                  </clipPath>
                </defs>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/talentloop-io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" rx="28" fill="white" fillOpacity="0.1"/>
                <path d="M36.8205 17.5H19.2944C18.3367 17.5 17.5 18.1891 17.5 19.1355V36.7005C17.5 37.652 18.3367 38.5 19.2944 38.5H36.8153C37.7781 38.5 38.5 37.6464 38.5 36.7005V19.1355C38.5056 18.1891 37.7781 17.5 36.8205 17.5ZM24.0095 35.0045H21.0011V25.6506H24.0095V35.0045ZM22.6094 24.2284H22.5878C21.625 24.2284 21.0016 23.5117 21.0016 22.6145C21.0016 21.7009 21.6414 21.0011 22.6258 21.0011C23.6102 21.0011 24.2125 21.6958 24.2341 22.6145C24.2336 23.5117 23.6102 24.2284 22.6094 24.2284ZM35.0045 35.0045H31.9961V29.89C31.9961 28.6647 31.5583 27.8275 30.4698 27.8275C29.6383 27.8275 29.1461 28.39 28.9272 28.938C28.8452 29.1348 28.8231 29.403 28.8231 29.6767V35.0045H25.8147V25.6506H28.8231V26.9523C29.2609 26.3289 29.9448 25.4317 31.5363 25.4317C33.5111 25.4317 35.005 26.7334 35.005 29.5398L35.0045 35.0045Z" fill="white"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@talentloop"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" rx="28" fill="white" fillOpacity="0.1"/>
                <path d="M39.4118 20.4337C39.1198 19.3038 38.2372 18.4098 37.1198 18.1145C35.0958 17.5789 28 17.5789 28 17.5789C28 17.5789 20.9042 17.5789 18.8802 18.1145C17.7628 18.4098 16.8802 19.3038 16.5882 20.4337C16.0588 22.4805 16.0588 26.7526 16.0588 26.7526C16.0588 26.7526 16.0588 31.0247 16.5882 33.0716C16.8802 34.2014 17.7628 35.0602 18.8802 35.3554C20.9042 35.8911 28 35.8911 28 35.8911C28 35.8911 35.0958 35.8911 37.1198 35.3554C38.2372 35.0602 39.1198 34.2014 39.4118 33.0716C39.9412 31.0247 39.9412 26.7526 39.9412 26.7526C39.9412 26.7526 39.9412 22.4805 39.4118 20.4337ZM25.5882 30.9068V22.5985L32.4706 26.7526L25.5882 30.9068Z" fill="white"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
