"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getApiUrl, getHeaders } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

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

const CheckboxCheckedSVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="18" rx="4" fill="#A2CE3A" />
    <path d="M5 9L8 12L13 6" stroke="#0B0D0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckboxUncheckedSVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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

/* ─── Coach Carousel Slides ─── */

const coachSlides = [
  {
    image: "/Frame 2147239132(1).png",
    caption: "Prep Jobseekers for\nInterviews",
  },
  {
    image: "/Frame 2147239132(2).png",
    caption: "Turn your interview\nexperience into income.",
  },
  {
    image: "/Frame 2147239132(3).png",
    caption: "Set your availability, and build a\nreputation as a trusted career mentor.",
  },
];

/* ─── Main Component ─── */

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showResetForm, setShowResetForm] = useState(false);
  
  // Forgot Password State
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Reset Password State
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const passwordTouched = password.length > 0;
  const confirmTouched = confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword;

  /* Handle forgot password submit */
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
      const response = await fetch(`${getApiUrl()}/api/auth/forgot-password`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          variant: "error",
          title: "Request failed",
          description: data.message || "Failed to send reset link",
        });
        setLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Email sent!",
        description: "Check your email for password reset instructions",
      });

      // Show reset password form
      setShowResetForm(true);
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Error",
        description: err.message || "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  /* Handle reset password submit */
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
    const allChecksPassed = passwordChecks.every((check) => check.test(password));
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
      const response = await fetch(`${getApiUrl()}/api/auth/reset-password`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          email,
          otp,
          password,
          password_confirmation: confirmPassword,
        }),
      });

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
        description: "Your password has been reset successfully",
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

  /* Auto-advance carousel */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % coachSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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
          <img src="/logo.svg" alt="TalentLoop logo" className="h-10 lg:h-12 w-auto object-contain" />
        </Link>
      </div>

      {/* Main Layout */}
      <div className="relative z-[1] min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 pt-40 lg:pt-16 2xl:pt-20 pb-10 lg:py-20 gap-8 lg:gap-16 max-w-[1400px] mx-auto">
        {/* ─── Left Side: Coach Carousel ─── */}
        <div className="flex-1 hidden lg:flex flex-col items-center justify-center w-full max-w-[480px]">
          {/* Carousel Image */}
          <div className="relative w-full h-[500px] 2xl:h-[600px] rounded-[16px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={coachSlides[currentSlide].image}
                alt={`Coach slide ${currentSlide + 1}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-contain rounded-[16px]"
              />
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-32 2xl:bottom-32 3xl:relative left-52 flex items-center gap-2">
            {coachSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-[4px] rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentSlide ? "w-20 bg-[#A2CE3A]" : "w-20 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ─── Right Side: Forgot Password / Reset Password Form ─── */}
        <div className="flex-1 w-full max-w-[520px]">
          <div
            className="lg:scale-[90%] 2xl:scale-[100%] bg-[#141619] border border-white/10 rounded-[18px] p-6 lg:p-8 h-full lg:max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            style={{
              backgroundImage: "url('/img3.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {!showResetForm ? (
              /* ─── Forgot Password Form ─── */
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
              <>
                <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-3">
                  Reset Password
                </h1>
                <p className="text-white/50 text-sm font-mona-sans mb-8">
                  We value your security create a solid password
                </p>

                <div className="mb-4">
                  <label className="block text-white font-mona-sans text-sm font-semibold mb-2">
                    OTP Code
                  </label>
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
                      placeholder="Ric123456#"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOpenSVG /> : <EyeClosedSVG />}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-white/40 font-mona-sans text-xs mb-2 flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="12" height="12" rx="2" fill="#555"/>
                    </svg>
                    Password hint
                  </p>
                  <div className="space-y-1">
                    {passwordChecks.map((check, idx) => {
                      const passed = passwordTouched && check.test(password);
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          {passed ? <CheckboxCheckedSVG /> : <CheckboxUncheckedSVG />}
                          <span className={`text-xs font-mona-sans ${passed ? "text-[#A2CE3A]" : "text-white/40"}`}>
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
                    {acceptTerms ? <CheckboxCheckedSVG /> : <CheckboxUncheckedSVG />}
                  </button>
                  <p className="text-white/50 font-mona-sans text-xs leading-relaxed">
                    I accept the{" "}
                    <Link href="/terms" className="text-[#A2CE3A] underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#A2CE3A] underline">
                      Privacy Policy
                    </Link>
                    , including the coach vetting policy
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
