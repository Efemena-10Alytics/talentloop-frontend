"use client";

import { useState, useRef, useEffect } from "react";

interface EmailVerificationProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  verifying?: boolean;
}

export default function EmailVerification({
  email,
  onVerify,
  onResend,
  verifying = false,
}: EmailVerificationProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    const nextIndex = Math.min(pastedData.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) return;
    await onVerify(otpString);
  };

  const handleResendClick = async () => {
    await onResend();
    setResendTimer(60);
    setCanResend(false);
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white text-center mb-3">
        Email Verification
      </h1>
      <p className="text-white/50 text-sm font-mona-sans text-center mb-8 max-w-[360px]">
        Check your email, we sent a code to {email}
      </p>

      {/* OTP Inputs */}
      <div className="flex gap-3 mb-8" onPaste={handleOtpPaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              otpRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(i, e)}
            className="w-12 h-14 bg-white rounded-[8px] text-center text-[#121212] text-xl font-mona-sans font-bold outline-none border border-white/10 focus:border-[#A2CE3A] transition-colors"
          />
        ))}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={verifying}
        className={`w-full max-w-[360px] px-8 py-3 rounded-[8px] font-mona-sans text-base font-bold transition-colors ${
          verifying
            ? "bg-[#A2CE3A]/50 text-[#121212]/50 cursor-not-allowed"
            : "bg-[#A2CE3A] text-[#121212] hover:bg-[#92BE2A] cursor-pointer"
        }`}
      >
        {verifying ? "Verifying..." : "Verify"}
      </button>

      {/* Resend */}
      <div className="mt-4 text-sm font-mona-sans text-white/50">
        Didn&apos;t get a code?{" "}
        {canResend ? (
          <button
            onClick={handleResendClick}
            className="text-[#A2CE3A] underline cursor-pointer"
          >
            Resend
          </button>
        ) : (
          <span className="text-white/30">{formatTimer(resendTimer)}</span>
        )}
      </div>
    </div>
  );
}
