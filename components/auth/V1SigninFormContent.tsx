"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl, getHeaders, getAuthHeaders } from "@/lib/api";
import EmailVerification from "@/components/EmailVerification";
import { beginSocialRedirect, type SocialProvider } from "@/lib/social-auth";

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

interface V1SigninFormContentProps {
  isModal?: boolean;
  isEmailVerification?: boolean;
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
}

export default function V1SigninFormContent({
  isModal = false,
  isEmailVerification = false,
  onSuccess,
  onSwitchToSignup,
}: V1SigninFormContentProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "linkedin" | null
  >(null);
  const [verifying, setVerifying] = useState(false);
  const [showVerification, setShowVerification] = useState(isEmailVerification);

  const sendVerificationOtp = async () => {
    try {
      await fetch(`${getApiUrl()}/api/v1/auth/verify-email/resend-otp`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      // Non-blocking: the user can still trigger "Resend" manually
    }
  };

  const handleAuthenticated = (hasEnrollment?: boolean) => {
    if (isModal && onSuccess) {
      onSuccess();
    } else if (hasEnrollment) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  const handleCredentialSignIn = async () => {
    if (!email || !password) {
      toast({
        variant: "error",
        title: "Missing fields",
        description: "Please enter your email and password",
      });
      return;
    }

    setLoading(true);

    try {
      // Step 1: Call backend login directly to get the token and check
      // email_verified_at — before involving NextAuth (which has a session
      // propagation delay that can cause the auth/me check to return 401).
      const loginResponse = await fetch(`${getApiUrl()}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        const firstError = loginData.errors
          ? loginData.errors[Object.keys(loginData.errors)[0]]?.[0]
          : null;
        toast({
          variant: "error",
          title: "Sign in failed",
          description:
            firstError || loginData.message || "Invalid email or password",
        });
        setLoading(false);
        return;
      }

      // Step 2: Check email verification status from the login response
      if (!loginData.user?.email_verified_at) {
        // Store token so resend-otp works while user is on the OTP screen
        if (loginData.token) {
          localStorage.setItem("auth_token", loginData.token);
        }
        await sendVerificationOtp();
        setShowVerification(true);
        setLoading(false);
        toast({
          variant: "success",
          title: "Verify your email",
          description: "We've sent a verification code to your email",
        });
        return;
      }

      // Step 3: Email is verified — store token and create NextAuth session
      if (loginData.token) {
        localStorage.setItem("auth_token", loginData.token);
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "error",
          title: "Sign in failed",
          description: result.error || "Invalid email or password",
        });
        setLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Welcome back!",
        description: "You have successfully signed in",
      });

      setLoading(false);
      handleAuthenticated(!!loginData.current_enrollment?.id);
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "An error occurred during sign in",
      });
      setLoading(false);
    }
  };

  /**
   * Hands the whole tab to the provider. Everything after the consent screen —
   * the code exchange, the session, the redirect onwards — happens on
   * /auth/{provider}/callback, so nothing here needs to await a result.
   */
  const startSocialSignIn = (provider: SocialProvider) => {
    setSocialLoading(provider);
    try {
      beginSocialRedirect(provider, window.location.pathname + window.location.search);
    } catch (err: any) {
      setSocialLoading(null);
      toast({
        variant: "error",
        title: "Error",
        description: err.message || "Social sign in failed",
      });
    }
  };

  const googleLogin = () => startSocialSignIn("google");

  const handleLinkedInSignIn = () => startSocialSignIn("linkedin");

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
        if (data.errors) {
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];

          toast({
            variant: "error",
            title: "Verification failed",
            description:
              firstErrorMessage || data.message || "Invalid or expired code",
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

      // Persist the fresh token and refresh the NextAuth session so the app
      // sees the now-verified user, then continue to the destination.
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }
      if (password) {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      }

      setVerifying(false);
      handleAuthenticated();
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Error",
        description: err.message || "An error occurred during verification",
      });
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch(
        `${getApiUrl()}/api/v1/auth/verify-email/resend-otp`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];

          toast({
            variant: "error",
            title: "Resend failed",
            description:
              firstErrorMessage ||
              data.message ||
              "Failed to resend verification code",
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

  return (
    <div
      className="rounded-[20px] p-6 lg:p-7 w-full max-h-full flex flex-col"
      style={{
        background:
          "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
      }}
    >
      {showVerification ? (
        <EmailVerification
          email={email}
          onVerify={handleVerifyOtp}
          onResend={handleResend}
          verifying={verifying}
        />
      ) : (
        <>
          <h1 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-5">
            Sign In
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
                {socialLoading === "google"
                  ? "Connecting..."
                  : "Sign In with Google"}
              </button>
              <button
                onClick={handleLinkedInSignIn}
                disabled={socialLoading === "linkedin"}
                className=" items-center justify-center gap-2.5 px-4 py-2.5 bg-transparent border border-white/20 rounded-[12px] text-white font-mona-sans text-sm font-medium hover:border-white/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed hidden"
              >
                <LinkedInSVG />
                {socialLoading === "linkedin"
                  ? "Connecting..."
                  : "Sign In with LinkedIn"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/50 text-xs font-mona-sans">
                or Sign In with
              </span>
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
                href="/forgot-password"
                className="text-[#A2CE3A] font-mona-sans text-xs font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign Up Link */}
            <p className="text-white/50 font-mona-sans text-xs mb-3">
              Don&apos;t have an account?{" "}
              {isModal && onSwitchToSignup ? (
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-[#A2CE3A] font-semibold hover:underline"
                >
                  Create your account
                </button>
              ) : (
                <Link
                  href="/clarity-session"
                  className="text-[#A2CE3A] font-semibold hover:underline"
                >
                  Create your account
                </Link>
              )}
            </p>

            {/* Sign In Button */}
            <button
              onClick={handleCredentialSignIn}
              disabled={loading}
              className={`w-full px-5 py-2.5 rounded-[40px] font-mona-sans text-sm font-semibold transition-all ${
                loading
                  ? "bg-[#A2CE3A]/50 text-white/50 cursor-not-allowed"
                  : "bg-[#A2CE3A] text-white hover:bg-[#92BE2A]"
              }`}
              style={{
                border: "1px solid #FFFFFF1A",
                boxShadow: loading
                  ? "none"
                  : "0px -6px 4px 0px #FFFFFF4D inset",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
