"use client";

import { useState } from "react";
import Link from "next/link";
import { ManagerRightSideComponent } from "@/components/auth/manager-right-side-component";

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

export default function ManagerSignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) return;
    setLoading(true);
    // TODO: wire up to manager auth API when provided
    setLoading(false);
  };

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
        {/* Left Side — Sign In Form */}
        <div className="w-full lg:w-[40%]">
          <div className="w-full lg:max-w-[520px] h-full flex items-center py-4">
            <div
              className="rounded-[20px] p-6 lg:p-7 w-full max-h-full flex flex-col lg:scale-[90%] 2xl:scale-[100%]"
              style={{
                background:
                  "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
              }}
            >
              <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-5">
                Sign In
              </h1>

              <div className="flex-1 overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {/* Email */}
                <div className="mb-3">
                  <label className="block text-white font-mona-sans text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 bg-transparent border border-white/20 rounded-[12px] text-white placeholder-white/40 font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="block text-white font-mona-sans text-sm font-medium mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                      className="w-full h-10 px-3 pr-10 bg-transparent border border-white/20 rounded-[12px] text-white placeholder-white/40 font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOpenSVG /> : <EyeClosedSVG />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="mb-4 text-right">
                  <Link
                    href="/managers/forgot-password"
                    className="text-[#A2CE3A] font-mona-sans text-xs font-semibold hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  className={`w-full px-5 py-2.5 rounded-[40px] font-mona-sans text-sm font-semibold transition-all ${
                    loading
                      ? "bg-[#A2CE3A]/50 text-white/50 cursor-not-allowed"
                      : "bg-[#A2CE3A] text-[#0B0D0F] hover:bg-[#92BE2A]"
                  }`}
                  style={{
                    border: "1px solid #FFFFFF1A",
                    boxShadow: loading ? "none" : "0px -6px 4px 0px #FFFFFF4D inset",
                  }}
                >
                  {loading ? "Signing in..." : "Get Started"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-[60%] h-full">
          <ManagerRightSideComponent />
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-4 left-4 lg:left-8 font-mona-sans text-xs" style={{ color: "#657997" }}>
        © 2026 TalentLoop
      </p>
    </div>
  );
}
