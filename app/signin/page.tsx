"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── SVGs ─── */

const EyeOpenSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5C5.636 5 2 12 2 12C2 12 5.636 19 12 19C18.364 19 22 12 22 12C22 12 18.364 5 12 5Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="1.5"/>
  </svg>
);

const EyeClosedSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C2 12 5.636 5 12 5C18.364 5 22 12 22 12" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12C2 12 5.636 19 12 19C18.364 19 22 12 22 12" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 3L21 21" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="1.5"/>
  </svg>
);

const GoogleSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.171 8.368H17.5V8.333H10V11.667H14.709C14.022 13.607 12.177 15 10 15C7.239 15 5 12.761 5 10C5 7.239 7.239 5 10 5C11.274 5 12.434 5.481 13.317 6.267L15.674 3.91C14.186 2.522 12.195 1.667 10 1.667C5.398 1.667 1.667 5.398 1.667 10C1.667 14.602 5.398 18.333 10 18.333C14.602 18.333 18.333 14.602 18.333 10C18.333 9.441 18.278 8.897 18.171 8.368Z" fill="#FFC107"/>
    <path d="M2.628 6.121L5.366 8.129C6.107 6.295 7.9 5 10 5C11.274 5 12.434 5.481 13.317 6.267L15.674 3.91C14.186 2.522 12.195 1.667 10 1.667C6.946 1.667 4.308 3.474 2.628 6.121Z" fill="#FF3D00"/>
    <path d="M10 18.333C12.152 18.333 14.107 17.51 15.579 16.17L13.011 13.987C12.166 14.625 11.117 15 10 15C7.832 15 5.992 13.618 5.299 11.688L2.582 13.783C4.245 16.482 6.901 18.333 10 18.333Z" fill="#4CAF50"/>
    <path d="M18.171 8.368H17.5V8.333H10V11.667H14.709C14.382 12.588 13.784 13.382 13.01 13.987L15.579 16.17C15.403 16.332 18.333 14.167 18.333 10C18.333 9.441 18.278 8.897 18.171 8.368Z" fill="#1976D2"/>
  </svg>
);

const LinkedInSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" rx="2" fill="#0A66C2"/>
    <path d="M6.5 8.5V14M6.5 6V6.01M9 14V8.5M11.5 14V11C11.5 9.5 13 9 13.5 10.5V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen lg:max-h-screen bg-[#0B0D0F] relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/img2.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* Logo */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-10 z-10">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="TalentLoop logo"
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Main Layout */}
      <div className="relative z-[1] min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 pt-40 pb-10 lg:py-20 gap-8 lg:gap-16 max-w-[1400px] mx-auto">
        {/* ─── Left Side ─── */}
        <div className="flex-1 hidden lg:flex flex-col items-start justify-center w-full max-w-[480px]">
          <h2 className="text-white text-3xl lg:text-[42px] font-mona-sans font-bold leading-tight">
            Apply Faster. Interview{"\n"}Smarter. Get Hired. With{" "}
            <span className="text-[#A2CE3A]">TalentLoop.AI</span>
          </h2>
          <img
            src="/ChatGPT Image Jan 14, 2026, 02_11_39 AM 1.png"
            alt="TalentLoop AI mascot"
            className="w-[320px] lg:w-[380px] h-[400px] object-contain"
          />
        </div>

        {/* ─── Right Side: Sign In Form ─── */}
        <div className="flex-1 w-full max-w-[520px]">
          <div className="lg:scale-[80%] bg-[#141619] border border-white/10 rounded-[18px] p-6 lg:p-8" style={{ backgroundImage: "url('/img3.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
            <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white text-center mb-8">
              Welcome Back
            </h1>

            {/* Social Sign In */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 py-3 rounded-[10px] border border-white/20 text-white font-mona-sans text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer">
                <GoogleSVG />
                Sign In with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-3 rounded-[10px] border border-white/20 text-white font-mona-sans text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer">
                <LinkedInSVG />
                Sign In with LinkedIn
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/40 font-mona-sans text-xs whitespace-nowrap">
                Or Sign in with a registered account
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] bg-white text-[#0B0D0F] font-mona-sans text-sm placeholder:text-gray-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] bg-white text-[#0B0D0F] font-mona-sans text-sm placeholder:text-gray-500 outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <EyeOpenSVG /> : <EyeClosedSVG />}
              </button>
            </div>

            {/* Don't have an account */}
            <p className="text-white/50 font-mona-sans text-sm text-center mb-5">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#A2CE3A] font-semibold hover:underline">
                Create your account
              </Link>
            </p>

            {/* Sign In Button */}
            <button className="w-full py-3.5 rounded-[10px] bg-[#A2CE3A] text-[#0B0D0F] font-mona-sans font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer mb-5">
              Sign In
            </button>

            {/* Forgot Password */}
            <p className="text-center">
              <Link href="/forgot-password" className="text-[#A2CE3A] font-mona-sans text-sm font-semibold hover:underline">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
