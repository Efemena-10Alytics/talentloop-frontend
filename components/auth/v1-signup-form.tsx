"use client";

import Link from "next/link";
import V1SignupFormContent from "./V1SignupFormContent";
import { RightSideComponent } from "./v1-right-side-component";


export default function V1SignupForm() {

  return (
    <div className="h-screen bg-[#101014] flex items-center justify-center relative overflow-hidden">
      {/* Logo */}
     <div className="absolute top-4 left-4 lg:left-8 z-10">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="TalentLoop logo"
            className="h-8 lg:h-12 w-auto object-contain"
          />
        </Link>
      </div>

      <div className="w-full h-full mx-auto px-4 flex items-center justify-center lg:justify-between gap-8">
        {/* Left Side - Sign Up Form */}
                <div className="w-full lg:w-[40%]">
        <div className="w-full max-w-[520px] h-full flex items-center py-4 lg:scale-[90%] 2xl:scale-[100%]">
          <V1SignupFormContent isModal={false} />
        </div>
                </div>

        {/* Right Side - Image */}
        <div className="lg:w-[60%] h-full">
    <RightSideComponent />
        </div>
      </div>
    </div>
  );
}
