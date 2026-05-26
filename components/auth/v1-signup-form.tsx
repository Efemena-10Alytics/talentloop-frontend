"use client";

import Link from "next/link";
import V1SignupFormContent from "./V1SignupFormContent";


export default function V1SignupForm() {

  return (
    <div className="h-screen bg-[#101014] flex items-center justify-center relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-4 left-4 lg:top-6 lg:left-8 z-10">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="TalentLoop logo"
            className="h-8 lg:h-10 w-auto object-contain"
          />
        </Link>
      </div>

      <div className="w-full h-full max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-center lg:justify-between gap-8">
        {/* Left Side - Sign Up Form */}
        <div className="w-full max-w-[420px] h-full flex items-center py-4 lg:scale-[90%] 2xl:scale-[100%]">
          <V1SignupFormContent isModal={false} />
        </div>

        {/* Right Side - Image */}
        <div 
          className="hidden lg:flex flex-1 flex-col items-center justify-center h-full overflow-hidden relative px-6 py-8"
          style={{
            background: "linear-gradient(94.02deg, #222126 0%, #111116 100%)",
          }}
        >
          {/* Tagline */}
          <h2 className=" absolute  2xl:top-28 left-32 text-white text-2xl xl:text-4xl font-mona-sans font-bold leading-tight z-10 max-w-md">
            Apply Faster. Interview Smarter. Get Hired.{" "}
                        <span className="text-white mr-2">With</span>
            <span className="text-[#A2CE3A]">TalentLoop.AI</span>
          </h2>

          {/* Dashboard Image */}
          <div className="flex-1 w-full flex items-center justify-center">
            <img
              src="/Dashboard.svg"
              alt="TalentLoop Dashboard Preview"
              className="max-w-full max-h-full object-contain"
              style={{
                transform: "rotate(-1deg) translateX(-5%)",
                transformOrigin: "center center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
