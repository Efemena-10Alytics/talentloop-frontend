"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="7" fill="#34C759"/>
    <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function getStrengthSegments(password: string): { color: string }[] {
  const hasUpper   = /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasNumber  = /[0-9]/.test(password);
  const hasLength  = password.length >= 8;

  const met = [hasUpper, hasSpecial, hasNumber, hasLength].filter(Boolean).length;

  const colors = ["#FF3B30", "#FF9500", "#FFD60A", "#34C759"];
  const activeColor = met === 0 ? "#FFFFFF1A" : colors[met - 1];

  return Array.from({ length: 4 }, (_, i) => ({
    color: i < met ? activeColor : "#FFFFFF1A",
  }));
}

export default function ManagerForgotPasswordPage() {
  const [newPassword, setNewPassword]       = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew]               = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);
  const [loading, setLoading]               = useState(false);
  const [success, setSuccess]               = useState(false);
  const router = useRouter();

  const hasUpper   = /[A-Z]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const hasNumber  = /[0-9]/.test(newPassword);
  const hasLength  = newPassword.length >= 8;

  const segments = getStrengthSegments(newPassword);
  const isValid  = hasUpper && hasSpecial && hasNumber && hasLength;

  const handleSave = async () => {
    if (!isValid || newPassword !== confirmPassword) return;
    setLoading(true);
    // TODO: wire up to manager password reset API when provided
    // Simulate success for now
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="h-screen bg-[#101014] flex items-center justify-center relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-4 left-4 lg:left-8 z-10">
        <Link href="/">
          <img src="/logo.svg" alt="TalentLoop logo" className="h-8 lg:h-12 w-auto object-contain"/>
        </Link>
      </div>

      <div className="w-full h-full mx-auto px-4 flex items-center justify-center lg:justify-between gap-8">
        {/* Left Side */}
        <div className="w-full lg:w-[40%]">
          <div className="w-full lg:max-w-[520px] h-full flex items-center py-4">
            <div
              className="rounded-[20px] p-6 lg:p-7 w-full flex flex-col lg:scale-[90%] 2xl:scale-[100%]"
              style={{
                background:
                  "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
              }}
            >
              <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-1">
                Update Password
              </h1>
              <p className="font-mona-sans text-sm mb-5" style={{ color: "#95ACCB" }}>
                Create a new password to continue
              </p>

              {/* Create Password */}
              <div className="mb-4">
                <label className="block text-white font-mona-sans text-sm font-medium mb-1.5">
                  Create Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="********"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-10 px-3 pr-10 bg-transparent border border-white/20 rounded-[12px] text-white placeholder-white/40 font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showNew ? <EyeOpenSVG /> : <EyeClosedSVG />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-white font-mona-sans text-sm font-medium mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-10 px-3 pr-10 bg-transparent border border-white/20 rounded-[12px] text-white placeholder-white/40 font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirm ? <EyeOpenSVG /> : <EyeClosedSVG />}
                  </button>
                </div>
              </div>

              {/* Strength bar */}
              <div className="flex gap-1.5 mb-3">
                {segments.map((seg, i) => (
                  <div
                    key={i}
                    className="flex-1 h-1.5 rounded-full transition-all duration-300"
                    style={{ background: seg.color }}
                  />
                ))}
              </div>

              {/* Requirements */}
              <p className="font-mona-sans text-xs mb-2" style={{ color: "#95ACCB" }}>
                Must contain at least:
              </p>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mb-5">
                {[
                  { label: "At least 1 uppercase",        met: hasUpper   },
                  { label: "At least 1 number",           met: hasNumber  },
                  { label: "At least 1 special character",met: hasSpecial },
                  { label: "At least 8 character",        met: hasLength  },
                ].map(({ label, met }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <CheckIcon />
                    <span
                      className="font-mona-sans text-xs"
                      style={{ color: met ? "#E8EFF1" : "#657997" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={loading || !isValid || newPassword !== confirmPassword}
                className="w-full px-5 py-2.5 rounded-[40px] font-mona-sans text-sm font-semibold transition-all"
                style={{
                  background:
                    isValid && newPassword === confirmPassword
                      ? "#A2CE3A"
                      : "rgba(162,206,58,0.3)",
                  color: "#0B0D0F",
                  border: "1px solid #FFFFFF1A",
                  boxShadow:
                    isValid && newPassword === confirmPassword
                      ? "0px -6px 4px 0px #FFFFFF4D inset"
                      : "none",
                  cursor:
                    isValid && newPassword === confirmPassword ? "pointer" : "not-allowed",
                }}
              >
                {loading ? "Saving..." : "Save"}
              </button>
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

      {/* ── Success Modal ── */}
      {success && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-sm mx-4 rounded-2xl px-8 py-10 flex flex-col items-center"
            style={{
              background: "linear-gradient(160deg, #2a2a2e 0%, #1e1e22 100%)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Title */}
            <h2 className="font-mona-sans font-bold text-white text-lg mb-6">
              Successful!
            </h2>

            {/* Green circle check */}
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center mb-7"
              style={{
                border: "3px solid #A2CE3A",
                background: "rgba(162,206,58,0.06)",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24l8 8 16-16" stroke="#A2CE3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Message */}
            <p className="font-mona-sans text-sm text-center mb-7" style={{ color: "#95ACCB", lineHeight: "1.6" }}>
              You have successfully reset your password.<br/>
              Click the button to continue
            </p>

            {/* CTA */}
            <button
              onClick={() => router.push("/v1/manager/dashboard")}
              className="w-full h-12 rounded-[40px] font-mona-sans font-semibold text-sm transition-opacity hover:opacity-90"
              style={{
                background: "#A2CE3A",
                color: "#0B0D0F",
                border: "1px solid #FFFFFF1A",
                boxShadow: "0px -6px 4px 0px #FFFFFF4D inset",
              }}
            >
              See my dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
