"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

const LockSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.667 7.333V5.333C4.667 3.492 6.159 2 8 2C9.841 2 11.333 3.492 11.333 5.333V7.333M5.333 14H10.667C12.133 14 12.867 14 13.4 13.636C13.62 13.49 13.81 13.3 13.956 13.08C14.333 12.533 14.333 11.8 14.333 10.333C14.333 8.867 14.333 8.133 13.956 7.587C13.81 7.367 13.62 7.177 13.4 7.031C12.867 6.667 12.133 6.667 10.667 6.667H5.333C3.867 6.667 3.133 6.667 2.587 7.031C2.367 7.177 2.177 7.367 2.031 7.587C1.667 8.133 1.667 8.867 1.667 10.333C1.667 11.8 1.667 12.533 2.031 13.08C2.177 13.3 2.367 13.49 2.587 13.636C3.133 14 3.867 14 5.333 14Z" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const CheckboxCheckedSVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="18" rx="4" fill="#A2CE3A"/>
    <path d="M5 9L8 12L13 6" stroke="#0B0D0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckboxUncheckedSVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" stroke="#555"/>
  </svg>
);

/* ─── Password Strength ─── */

interface PasswordCheck {
  label: string;
  test: (pw: string) => boolean;
}

const passwordChecks: PasswordCheck[] = [
  { label: "Contains at least 8 characters", test: (pw) => pw.length >= 8 },
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

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D0F]" />}>
      <SignUpContent />
    </Suspense>
  );
}

function SignUpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "coach";
  const isEmailVerification = searchParams.get("e_v") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* OTP State */
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const passwordTouched = password.length > 0;
  const confirmTouched = confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword;

  /* Handle form submit → navigate to e_v=true */
  const handleSubmit = () => {
    router.push(`/signup?type=${type}&e_v=true`);
  };

  /* OTP input handlers */
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    const focusIndex = Math.min(pasted.length, 5);
    otpRefs.current[focusIndex]?.focus();
  };

  /* Resend timer */
  useEffect(() => {
    if (!isEmailVerification) return;
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isEmailVerification, resendTimer]);

  const handleResend = () => {
    setResendTimer(60);
    setCanResend(false);
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  /* Auto-advance carousel */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % coachSlides.length);
  }, []);

  useEffect(() => {
    if (type !== "coach") return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [type, nextSlide]);

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
        {/* ─── Left Side: Coach Carousel ─── */}
        {type === "coach" && (
          <div className="flex-1 hidden lg:flex flex-col items-center justify-center w-full max-w-[480px]">
            {/* Carousel Image */}
            <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden">
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

            {/* Caption */}
            {/* <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-white text-xl lg:text-2xl font-mona-sans font-bold text-center mt-6 whitespace-pre-line leading-snug"
              >
                {coachSlides[currentSlide].caption}
              </motion.p>
            </AnimatePresence> */}

            {/* Slide Indicators */}
            <div className="flex items-center gap-2 mt-5">
              {coachSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-[4px] rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentSlide
                      ? "w-20 bg-[#A2CE3A]"
                      : "w-20 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── Left Side: Jobseeker Fixed Image ─── */}
        {type === "jobseeker" && (
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
        )}

        {/* ─── Right Side: Sign Up Form / Email Verification ─── */}
        <div className="flex-1 w-full max-w-[520px]">
          <div className="lg:scale-[80%] bg-[#141619] border border-white/10 rounded-[18px] p-6 lg:p-8 h-full lg:max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent" style={{ backgroundImage: "url('/img3.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>

            {/* ─── Email Verification View ─── */}
            {isEmailVerification ? (
              <div className="flex flex-col items-center">
                <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white text-center mb-3">
                  Email Verification
                </h1>
                <p className="text-white/50 text-sm font-mona-sans text-center mb-8 max-w-[360px]">
                  Check your email, we sent a code to {email || "@jimberino"}.io. If this is not your
                  mail,{" "}
                  <button
                    onClick={() => router.push(`/signup?type=${type}`)}
                    className="text-[#A2CE3A] underline cursor-pointer"
                  >
                    Change email
                  </button>
                </p>

                {/* OTP Inputs */}
                <div className="flex gap-3 mb-8" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
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
                <button className="w-full max-w-[360px] px-8 py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-base font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer">
                  Verify
                </button>

                {/* Resend */}
                <div className="mt-4 text-sm font-mona-sans text-white/50">
                  Didn&apos;t get a code?{" "}
                  {canResend ? (
                    <button
                      onClick={handleResend}
                      className="text-[#A2CE3A] underline cursor-pointer"
                    >
                      Resend
                    </button>
                  ) : (
                    <span className="text-white/30">{formatTimer(resendTimer)}</span>
                  )}
                </div>
              </div>
            ) : (
              /* ─── Sign Up Form ─── */
              <>
            {/* Header */}
            <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white text-center mb-5">
              Sign Up
            </h1>

            {/* Social Buttons */}
            <div className="flex flex-col lg:flex-row gap-3 mb-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-white/20 rounded-[8px] text-white font-mona-sans text-sm font-medium hover:border-white/40 transition-colors cursor-pointer">
                <GoogleSVG />
                Sign Up with Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-white/20 rounded-[8px] text-white font-mona-sans text-sm font-medium hover:border-white/40 transition-colors cursor-pointer">
                <LinkedInSVG />
                Sign Up with LinkedIn
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/50 text-sm font-mona-sans">Or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="block text-white font-mona-sans text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
              />
            </div>

            {/* Create Password */}
            <div className="mb-3">
              <label className="block text-white font-mona-sans text-sm font-semibold mb-2">
                Create password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-4 pr-12 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
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

            {/* Confirm Password */}
            <div className="mb-1">
              <label className="block text-white font-mona-sans text-sm font-semibold mb-2">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 px-4 pr-12 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOpenSVG /> : <EyeClosedSVG />}
                </button>
              </div>
              {/* Mismatch error */}
              {confirmTouched && !passwordsMatch && (
                <p className="text-red-500 text-xs font-mona-sans mt-1.5">
                  Password doesn&apos;t match!
                </p>
              )}
            </div>

            {/* Password Strength (shown when password is being typed) */}
            {passwordTouched && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mb-3 mt-2"
              >
                <div className="flex items-center gap-2 mb-2">
                  <LockSVG />
                  <span className="text-white/50 text-sm font-mona-sans">
                    Password hint
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {passwordChecks.map((check, i) => {
                    const passed = check.test(password);
                    return (
                      <div key={i} className="flex items-center gap-2">
                        {passed ? (
                          <CheckboxCheckedSVG />
                        ) : (
                          <CheckboxUncheckedSVG />
                        )}
                        <span
                          className={`text-sm font-mona-sans ${
                            passed ? "text-[#A2CE3A]" : "text-white/50"
                          }`}
                        >
                          {check.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-3 px-8 py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-base font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer">
              Continue
            </button>

            {/* Terms */}
            <div className="flex items-start gap-3 mt-4">
              <button
                onClick={() => setAcceptTerms(!acceptTerms)}
                className="flex-shrink-0 mt-0.5 cursor-pointer"
              >
                {acceptTerms ? <CheckboxCheckedSVG /> : <CheckboxUncheckedSVG />}
              </button>
              <p className="text-white/60 text-xs font-mona-sans leading-relaxed">
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
