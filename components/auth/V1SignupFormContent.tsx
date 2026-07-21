"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getApiUrl, getHeaders } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import EmailVerification from "@/components/EmailVerification";
import { socialLogin, openLinkedInOAuth } from "@/lib/social-auth";

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

const GoogleSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.171 8.368H17.5V8.333H10V11.667H14.709C14.022 13.607 12.177 15 10 15C7.239 15 5 12.761 5 10C5 7.239 7.239 5 10 5C11.274 5 12.434 5.481 13.317 6.267L15.674 3.91C14.186 2.522 12.195 1.667 10 1.667C5.398 1.667 1.667 5.398 1.667 10C1.667 14.602 5.398 18.333 10 18.333C14.602 18.333 18.333 14.602 18.333 10C18.333 9.441 18.278 8.897 18.171 8.368Z"
      fill="#FFC107"
    />
    <path
      d="M2.628 6.121L5.366 8.129C6.107 6.295 7.9 5 10 5C11.274 5 12.434 5.481 13.317 6.267L15.674 3.91C14.186 2.522 12.195 1.667 10 1.667C6.946 1.667 4.308 3.474 2.628 6.121Z"
      fill="#FF3D00"
    />
    <path
      d="M10 18.333C12.152 18.333 14.107 17.51 15.579 16.17L13.011 13.987C12.166 14.625 11.117 15 10 15C7.832 15 5.992 13.618 5.299 11.688L2.582 13.783C4.245 16.482 6.901 18.333 10 18.333Z"
      fill="#4CAF50"
    />
    <path
      d="M18.171 8.368H17.5V8.333H10V11.667H14.709C14.382 12.588 13.784 13.382 13.01 13.987L15.579 16.17C15.403 16.332 18.333 14.167 18.333 10C18.333 9.441 18.278 8.897 18.171 8.368Z"
      fill="#1976D2"
    />
  </svg>
);

const LinkedInSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="20" rx="2" fill="#0A66C2" />
    <path
      d="M6.5 8.5V14M6.5 6V6.01M9 14V8.5M11.5 14V11C11.5 9.5 13 9 13.5 10.5V14"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockSVG = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.667 7.333V5.333C4.667 3.492 6.159 2 8 2C9.841 2 11.333 3.492 11.333 5.333V7.333M5.333 14H10.667C12.133 14 12.867 14 13.4 13.636C13.62 13.49 13.81 13.3 13.956 13.08C14.333 12.533 14.333 11.8 14.333 10.333C14.333 8.867 14.333 8.133 13.956 7.587C13.81 7.367 13.62 7.177 13.4 7.031C12.867 6.667 12.133 6.667 10.667 6.667H5.333C3.867 6.667 3.133 6.667 2.587 7.031C2.367 7.177 2.177 7.367 2.031 7.587C1.667 8.133 1.667 8.867 1.667 10.333C1.667 11.8 1.667 12.533 2.031 13.08C2.177 13.3 2.367 13.49 2.587 13.636C3.133 14 3.867 14 5.333 14Z"
      stroke="#888"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
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
  { label: "Contains at least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "One upper case", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One lower case", test: (pw) => /[a-z]/.test(pw) },
  { label: "One special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

interface V1SignupFormContentProps {
  isModal?: boolean;
  onSuccess?: () => void;
  onSwitchToSignin?: () => void;
}

export default function V1SignupFormContent({ 
  isModal = false,
  onSuccess,
  onSwitchToSignin
}: V1SignupFormContentProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "linkedin" | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const passwordTouched = password.length > 0;
  const confirmTouched = confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword;

  const handleSocialSuccess = async (provider: "google" | "linkedin", access_token: string) => {
    setSocialLoading(provider);
    try {
      const result = await socialLogin(provider, access_token);
      localStorage.setItem("auth_token", result.data.token);
      toast({
        variant: "success",
        title: result.message || `${provider} sign up successful`,
        description: `Welcome, ${result.data.user.name || result.data.user.email}!`,
      });
      if (!isModal) {
        if (result.data.user?.stripe_customer_id) {
          router.push("/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Social sign up failed",
        description: err.message || `Failed to sign up with ${provider}`,
      });
    } finally {
      setSocialLoading(null);
    }
  };

  const googleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      toast({ variant: "error", title: "Not configured", description: "Google sign up is not set up yet" });
      return;
    }
    const client = (window as any).google?.accounts?.oauth2?.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: (tokenResponse: any) => {
        if (tokenResponse?.access_token) {
          handleSocialSuccess("google", tokenResponse.access_token);
        }
      },
    });
    client?.requestAccessToken();
  };

  const handleLinkedInSignUp = async () => {
    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID ?? "";
    const redirectUri = `${window.location.origin}/auth/linkedin/callback`;
    try {
      const code = await openLinkedInOAuth(clientId, redirectUri);
      await handleSocialSuccess("linkedin", code);
    } catch (err: any) {
      toast({ variant: "error", title: "Error", description: err.message || "LinkedIn sign up failed" });
    }
  };

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      toast({
        variant: "error",
        title: "Missing fields",
        description: "Please fill in all fields",
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

    if (password !== confirmPassword) {
      toast({
        variant: "error",
        title: "Password mismatch",
        description: "Passwords do not match",
      });
      return;
    }

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

    setLoading(true);

    try {
      const response = await fetch(`${getApiUrl()}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors with specific field messages
        if (data.errors) {
          // Get the first error message from the errors object
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];
          
          toast({
            variant: "error",
            title: "Registration failed",
            description: firstErrorMessage || data.message || "An error occurred during registration",
          });
        } else {
          toast({
            variant: "error",
            title: "Registration failed",
            description: data.message || "An error occurred during registration",
          });
        }
        setLoading(false);
        return;
      }

      // v1 API doesn't return token on registration, only after email verification
      // Store email for verification step

      toast({
        variant: "success",
        title: "Account created!",
        description: "Please check your email for verification code",
      });

      // Show email verification in the same modal/form
      setIsEmailVerification(true);
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Error",
        description: err.message || "An error occurred during registration",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/v1/auth/verify-email/resend-otp`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors with specific field messages
        if (data.errors) {
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];
          
          toast({
            variant: "error",
            title: "Resend failed",
            description: firstErrorMessage || data.message || "Failed to resend verification code",
          });
        } else {
          toast({
            variant: "error",
            title: "Resend failed",
            description: data.message || "Failed to resend verification code",
          });
        }
        return;
      }

      toast({
        variant: "success",
        title: "Code resent",
        description: "A new verification code has been sent to your email",
      });
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "Failed to resend verification code",
      });
    }
  };

  const handleVerifyOtp = async (otpString: string) => {
    setVerifying(true);

    try {
      const response = await fetch(`${getApiUrl()}/api/v1/auth/verify-email`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          email,
          otp: otpString,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors with specific field messages
        if (data.errors) {
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];
          
          toast({
            variant: "error",
            title: "Verification failed",
            description: firstErrorMessage || data.message || "Invalid or expired code",
          });
        } else {
          toast({
            variant: "error",
            title: "Verification failed",
            description: data.message || "Invalid or expired code",
          });
        }
        setVerifying(false);
        return;
      }

      toast({
        variant: "success",
        title: "Email verified!",
        description: "Your email has been verified successfully",
      });

      // v1 API returns token after email verification
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
        
        // Sign in with NextAuth using credentials
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      }

      // Signal signup complete
      setVerifying(false);
      if (onSuccess) {
        onSuccess();
      } else {
        try {
          const meRes = await fetch("/api/user/me");
          const meData = await meRes.json();
          if (meData?.user?.stripe_customer_id) {
            router.push("/dashboard");
          } else {
            router.push("/dashboard");
          }
        } catch {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Error",
        description: err.message || "An error occurred during verification",
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div
      className="rounded-[20px] p-6 lg:p-7 w-full max-h-full flex flex-col"
      style={{
        background: "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
      }}
    >
      {isEmailVerification ? (
        <EmailVerification
          email={email}
          onVerify={handleVerifyOtp}
          onResend={handleResend}
          verifying={verifying}
        />
      ) : (
        <>
          <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-5">
            Sign Up
          </h1>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {/* Social Buttons */}
            <div className="flex flex-col gap-2.5 mb-4">
              <button
                onClick={() => googleLogin()}
                disabled={socialLoading === "google"}
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-transparent border border-white/20 rounded-[12px] text-white font-mona-sans text-sm font-medium hover:border-white/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <GoogleSVG />
                {socialLoading === "google" ? "Connecting..." : "Signup with Google"}
              </button>
              {/* <button
                onClick={handleLinkedInSignUp}
                disabled={socialLoading === "linkedin"}
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-transparent border border-white/20 rounded-[12px] text-white font-mona-sans text-sm font-medium hover:border-white/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <LinkedInSVG />
                {socialLoading === "linkedin" ? "Connecting..." : "Signup with LinkedIn"}
              </button> */}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/50 text-xs font-mona-sans">or Sign Up with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

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

            {/* Create Password */}
            <div className="mb-3">
              <label className="block text-white font-mona-sans text-sm font-medium mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="block text-white font-mona-sans text-sm font-medium mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-10 px-3 pr-10 bg-transparent border border-white/20 rounded-[12px] text-white placeholder-white/40 font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOpenSVG /> : <EyeClosedSVG />}
                </button>
              </div>
              {confirmTouched && !passwordsMatch && (
                <p className="text-red-500 text-xs font-mona-sans mt-1.5">
                  Password doesn&apos;t match!
                </p>
              )}
            </div>

            {/* Password Strength */}
            {passwordTouched && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mb-3"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <LockSVG />
                  <span className="text-white/50 text-xs font-mona-sans">
                    Password hint
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {passwordChecks.map((check, i) => {
                    const passed = check.test(password);
                    return (
                      <div key={i} className="flex items-center gap-2">
                        {passed ? <CheckboxCheckedSVG /> : <CheckboxUncheckedSVG />}
                        <span
                          className={`text-xs font-mona-sans ${
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

            {/* Sign In Link */}
            <p className="text-white/50 font-mona-sans text-xs mb-3">
              Already have an account?{" "}
              {isModal && onSwitchToSignin ? (
                <button
                  type="button"
                  onClick={onSwitchToSignin}
                  className="text-[#A2CE3A] font-semibold hover:underline"
                >
                  Sign in to your account
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="text-[#A2CE3A] font-semibold hover:underline"
                >
                  Sign in to your account
                </Link>
              )}
            </p>

            {/* Get Started Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-[112px] px-5 py-2.5 rounded-[40px] font-mona-sans text-sm font-semibold transition-all ${
                loading
                  ? "bg-[#A2CE3A]/50 text-white/50 cursor-not-allowed"
                  : "bg-[#A2CE3A] text-white hover:bg-[#92BE2A]"
              } w-full`}
              style={{
                border: "1px solid #FFFFFF1A",
                boxShadow: loading ? "none" : "0px -6px 4px 0px #FFFFFF4D inset",
              }}
            >
              {loading ? "Loading..." : "Get Started"}
            </button>

            {/* Terms */}
            <div className="flex items-start gap-2.5 mt-4 mb-2">
              <button
                onClick={() => setAcceptTerms(!acceptTerms)}
                className="flex-shrink-0 mt-0.5"
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
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
