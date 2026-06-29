"use client";

import { useState } from "react";
import Link from "next/link";

const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="#95ACCB" strokeWidth="1.5"/>
    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#95ACCB" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const EyeOpenSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5C5.636 5 2 12 2 12C2 12 5.636 19 12 19C18.364 19 22 12 22 12C22 12 18.364 5 12 5Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="1.5"/>
  </svg>
);

const EyeClosedSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C2 12 5.636 5 12 5C18.364 5 22 12 22 12" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12C2 12 5.636 19 12 19C18.364 19 22 12 22 12" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 3L21 21" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="1.5"/>
  </svg>
);

export default function SuperAdminSignInPage() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) return;
    setLoading(true);
    // TODO: wire up to super-admin auth API when provided
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/bgimg_1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#0B0D0F",
      }}
    >
      {/* Logo */}
      <div className="absolute top-5 left-6 z-10">
        <Link href="/">
          <img src="/logo.svg" alt="TalentLoop logo" className="h-8 w-auto object-contain"/>
        </Link>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-[340px] sm:max-w-[380px] rounded-[20px] px-8 py-10 flex flex-col items-center"
        style={{
          background: "linear-gradient(160deg, #2a2a2e 0%, #1e1e22 100%)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* User avatar circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{
            background: "radial-gradient(circle at 40% 35%, #4a4a50 0%, #2a2a2e 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          <UserIcon />
        </div>

        {/* Heading */}
        <h1 className="font-mona-sans font-bold text-xl text-white mb-1 text-center">
          Login to your account
        </h1>
        <p className="font-mona-sans text-sm text-center mb-6" style={{ color: "#657997" }}>
          Enter your details to login
        </p>

        {/* Email */}
        <div className="w-full mb-4">
          <label className="block font-mona-sans text-sm font-medium text-white mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-4 rounded-[12px] font-mona-sans text-sm outline-none transition-colors"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#E8EFF1",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#A2CE3A")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
          />
        </div>

        {/* Password */}
        <div className="w-full mb-6">
          <label className="block font-mona-sans text-sm font-medium text-white mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
              className="w-full h-11 px-4 pr-11 rounded-[12px] font-mona-sans text-sm outline-none transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#E8EFF1",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#A2CE3A")}
              onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
            >
              {showPassword ? <EyeOpenSVG /> : <EyeClosedSVG />}
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          disabled={loading || !email || !password}
          className="w-full h-12 rounded-[40px] font-mona-sans font-semibold text-sm transition-all"
          style={{
            background:
              email && password ? "#A2CE3A" : "rgba(162,206,58,0.3)",
            color: "#0B0D0F",
            border: "1px solid #FFFFFF1A",
            boxShadow:
              email && password ? "0px -6px 4px 0px #FFFFFF4D inset" : "none",
            cursor: email && password ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Signing in..." : "Sign In With Email"}
        </button>
      </div>
    </div>
  );
}
