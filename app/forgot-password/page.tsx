"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getApiUrl, getHeaders } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { RightSideComponent } from "@/components/auth/v1-right-side-component";

/* ─── SVGs ─── */

const EyeOpenSVG = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5C5.636 5 2 12 2 12C2 12 5.636 19 12 19C18.364 19 22 12 22 12C22 12 18.364 5 12 5Z"
      stroke="#888"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="1.5" />
  </svg>
);

const EyeClosedSVG = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 12C2 12 5.636 5 12 5C18.364 5 22 12 22 12"
      stroke="#888"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M2 12C2 12 5.636 19 12 19C18.364 19 22 12 22 12"
      stroke="#888"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 3L21 21"
      stroke="#888"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="1.5" />
  </svg>
);

const CheckboxCheckedSVG = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="18" height="18" rx="4" fill="#A2CE3A" />
    <path
      d="M5 9L8 12L13 6"
      stroke="#0B0D0F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckboxUncheckedSVG = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" stroke="#555" />
  </svg>
);

/* ─── Password Strength ─── */

interface PasswordCheck {
  label: string;
  test: (pw: string) => boolean;
}

const passwordChecks: PasswordCheck[] = [
  { label: "Contains at least 8 character", test: (pw) => pw.length >= 8 },
  { label: "One upper case", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One lower case", test: (pw) => /[a-z]/.test(pw) },
  { label: "One special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

/* ─── Main Component ─── */

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showResetForm, setShowResetForm] = useState(false);

  // Forgot Password State (step 1: collect email, send OTP)
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset Password State (step 2: OTP + new password)
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Resend OTP state
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const passwordTouched = password.length > 0;

  /* Countdown for resend cooldown */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  /* Shared: call the resend-otp endpoint (used both for the initial
     send when the user submits their email, and for the "Resend OTP"
     action on the reset password screen) */
  const sendOtp = useCallback(
    async (targetEmail: string) => {
      const response = await fetch(
        `${getApiUrl()}/api/v1/auth/forgot-password/resend-otp`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ email: targetEmail }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset OTP");
      }

      return data as { message: string };
    },
    [],
  );

  /* Step 1: Submit email -> request OTP */
  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        variant: "error",
        title: "Missing email",
        description: "Please enter your email address",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        variant: "error",
        title: "Invalid email",
        description: "Please enter a valid email address",
      });
      return;
    }

    setLoading(true);

    try {
      const data = await sendOtp(email);

      toast({
        variant: "success",
        title: "Email sent!",
        description: data.message || "Check your email for the reset OTP",
      });

      // Move to the OTP + new password step
      setShowResetForm(true);
      setResendCooldown(30);
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Request failed",
        description: err.message || "Failed to send reset OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  /* Resend OTP from the reset password screen */
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || resendLoading) return;

    setResendLoading(true);

    try {
      const data = await sendOtp(email);

      toast({
        variant: "success",
        title: "OTP resent",
        description: data.message || "A new OTP has been sent to your email",
      });

      setResendCooldown(30);
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Resend failed",
        description: err.message || "Failed to resend OTP",
      });
    } finally {
      setResendLoading(false);
    }
  };

  /* Step 2: Submit OTP + new password -> reset password */
  const handleResetPassword = async () => {
    if (!otp || !password || !confirmPassword) {
      toast({
        variant: "error",
        title: "Missing fields",
        description: "Please fill in all fields",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "error",
        title: "Password mismatch",
        description: "Passwords do not match",
      });
      return;
    }

    // Check password requirements
    const allChecksPassed = passwordChecks.every((check) =>
      check.test(password),
    );
    if (!allChecksPassed) {
      toast({
        variant: "error",
        title: "Weak password",
        description: "Password does not meet all requirements",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        variant: "error",
        title: "Terms required",
        description: "Please accept the Terms of Service and Privacy Policy",
      });
      return;
    }

    setResetLoading(true);

    try {
      const response = await fetch(
        `${getApiUrl()}/api/v1/auth/reset-password`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            email,
            otp,
            password,
            password_confirmation: confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast({
          variant: "error",
          title: "Reset failed",
          description: data.message || "Failed to reset password",
        });
        setResetLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Password reset!",
        description: data.message || "Your password has been reset successfully",
      });

      // Redirect to signin
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Error",
        description: err.message || "An error occurred",
      });
    } finally {
      setResetLoading(false);
    }
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
        {/* Left Side - Form */}
        <div className="w-full flex justify-center lg:w-[40%]">
          <div className="flex-1 w-full max-w-[520px]">
            <div
              className="lg:scale-[90%] 2xl:scale-[100%] bg-[#141619] border border-white/10 rounded-[18px] p-6 lg:p-8 h-full lg:max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
              style={{
                background:
                  "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
              }}
            >
              {!showResetForm ? (
                /* ─── Step 1: Forgot Password Form ─── */
                <>
                  <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-3">
                    Forgot password?
                  </h1>
                  <p className="text-white/50 text-sm font-mona-sans mb-8">
                    Enter your email address to reset your password
                  </p>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-white font-mona-sans text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleForgotPassword();
                      }}
                      className="w-full px-4 py-3 bg-white rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none"
                    />
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className={`w-full py-3 rounded-[8px] font-mona-sans text-base font-bold transition-colors ${
                      loading
                        ? "bg-[#A2CE3A]/50 text-[#121212]/50 cursor-not-allowed"
                        : "bg-[#A2CE3A] text-[#121212] hover:bg-[#92BE2A] cursor-pointer"
                    }`}
                  >
                    {loading ? "Sending..." : "Continue"}
                  </button>
                </>
              ) : (
                /* ─── Step 2: OTP + Reset Password Form ─── */
                <>
                  <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-3">
                    Reset Password
                  </h1>
                  <p className="text-white/50 text-sm font-mona-sans mb-1">
                    We value your security create a solid password
                  </p>
                  <p className="text-white/30 text-xs font-mona-sans mb-8">
                    OTP sent to {email}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-white font-mona-sans text-sm font-semibold">
                        OTP Code
                      </label>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0 || resendLoading}
                        className={`text-xs font-mona-sans font-semibold ${
                          resendCooldown > 0 || resendLoading
                            ? "text-white/30 cursor-not-allowed"
                            : "text-[#A2CE3A] hover:underline cursor-pointer"
                        }`}
                      >
                        {resendLoading
                          ? "Resending..."
                          : resendCooldown > 0
                            ? `Resend OTP (${resendCooldown}s)`
                            : "Resend OTP"}
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter OTP from your email"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-white font-mona-sans text-sm font-semibold mb-2">
                      Create password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? <EyeOpenSVG /> : <EyeClosedSVG />}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-white font-mona-sans text-sm font-semibold mb-2">
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none pr-12"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOpenSVG />
                        ) : (
                          <EyeClosedSVG />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="space-y-1">
                      {passwordChecks.map((check, idx) => {
                        const passed = passwordTouched && check.test(password);
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            {passed ? (
                              <CheckboxCheckedSVG />
                            ) : (
                              <CheckboxUncheckedSVG />
                            )}
                            <span
                              className={`text-xs font-mona-sans ${passed ? "text-[#A2CE3A]" : "text-white/40"}`}
                            >
                              {check.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleResetPassword}
                    disabled={resetLoading}
                    className={`w-full py-3 rounded-[8px] font-mona-sans text-base font-bold transition-colors mb-4 ${
                      resetLoading
                        ? "bg-[#A2CE3A]/50 text-[#121212]/50 cursor-not-allowed"
                        : "bg-[#A2CE3A] text-[#121212] hover:bg-[#92BE2A] cursor-pointer"
                    }`}
                  >
                    {resetLoading ? "Resetting..." : "Continue"}
                  </button>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-2">
                    <button
                      type="button"
                      onClick={() => setAcceptTerms(!acceptTerms)}
                      className="mt-0.5 cursor-pointer"
                    >
                      {acceptTerms ? (
                        <CheckboxCheckedSVG />
                      ) : (
                        <CheckboxUncheckedSVG />
                      )}
                    </button>
                    <p className="text-white/50 font-mona-sans text-xs leading-relaxed">
                      I accept the{" "}
                      <Link href="/terms" className="text-[#A2CE3A] underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-[#A2CE3A] underline"
                      >
                        Privacy Policy
                      </Link>
                      , including the coach vetting policy
                    </p>
                  </div>

                  {/* Back to email step */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetForm(false);
                      setOtp("");
                      setPassword("");
                      setConfirmPassword("");
                      setAcceptTerms(false);
                    }}
                    className="w-full text-center text-white/40 font-mona-sans text-xs mt-4 hover:text-white/60 cursor-pointer"
                  >
                    ← Use a different email
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-[60%] h-full">
          <RightSideComponent />
        </div>
      </div>
    </div>
  );
}