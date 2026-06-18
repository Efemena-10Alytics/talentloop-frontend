"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl, getHeaders, getAuthHeaders } from "@/lib/api";
import EmailVerification from "@/components/EmailVerification";
import { RightSideComponent } from "./v1-right-side-component";
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

interface V1SigninFormProps {
  isEmailVerification: boolean;
}

export default function V1SigninForm({
  isEmailVerification,
}: V1SigninFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "linkedin" | null>(null);
  const [verifying, setVerifying] = useState(false);

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

      const headers = await getAuthHeaders();
      const userResponse = await fetch(`${getApiUrl()}/api/v1/auth/me`, {
        method: "GET",
        headers,
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();

        if (!userData.data?.user?.email_verified_at) {
          router.push("/signin?e_v=true&v1=true");
          setLoading(false);
          toast({
            variant: "error",
            title: "Email not verified",
            description: "Please verify your email to continue",
          });
          return;
        }
      }

      toast({
        variant: "success",
        title: "Welcome back!",
        description: "You have successfully signed in",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "An error occurred during sign in",
      });
      setLoading(false);
    }
  };

  const handleSocialSuccess = async (provider: "google" | "linkedin", access_token: string) => {
    setSocialLoading(provider);
    try {
      const result = await socialLogin(provider, access_token);
      localStorage.setItem("auth_token", result.data.token);
      toast({
        variant: "success",
        title: result.message || "Welcome back!",
        description: `Signed in as ${result.data.user.name || result.data.user.email}`,
      });
      router.push("/dashboard");
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Social sign in failed",
        description: err.message || `Failed to sign in with ${provider}`,
      });
    } finally {
      setSocialLoading(null);
    }
  };

  const googleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      toast({ variant: "error", title: "Not configured", description: "Google sign in is not set up yet" });
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

  const handleLinkedInSignIn = async () => {
    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID ?? "";
    const redirectUri = `${window.location.origin}/auth/linkedin/callback`;
    try {
      const code = await openLinkedInOAuth(clientId, redirectUri);
      await handleSocialSuccess("linkedin", code);
    } catch (err: any) {
      toast({ variant: "error", title: "Error", description: err.message || "LinkedIn sign in failed" });
    }
  };

  const handleVerifyOtp = async (otpString: string) => {
    setVerifying(true);

    try {
      const response = await fetch(`${getApiUrl()}/api/auth/verify-email`, {
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

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
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

  const handleResend = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/auth/resend-otp`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({
          email,
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
        {/* Left Side - Sign In Form */}
           <div className="w-full flex justify-center lg:w-[40%]">
        <div className="w-full lg:max-w-[520px] h-full flex items-center py-4">
          <div
            className="rounded-[20px] p-6 lg:p-7 w-full max-h-full flex flex-col lg:scale-[90%] 2xl:scale-[100%]"
            style={{
              background:
                "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
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
                      {socialLoading === "google" ? "Connecting..." : "Sign In with Google"}
                    </button>
                    <button
                      onClick={handleLinkedInSignIn}
                      disabled={socialLoading === "linkedin"}
                      className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-transparent border border-white/20 rounded-[12px] text-white font-mona-sans text-sm font-medium hover:border-white/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <LinkedInSVG />
                      {socialLoading === "linkedin" ? "Connecting..." : "Sign In with LinkedIn"}
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
                    <Link
                      href="/signup?v1=true"
                      className="text-[#A2CE3A] font-semibold hover:underline"
                    >
                      Create your account
                    </Link>
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
        </div>
           </div>

        <div className="lg:w-[60%] h-full">
    <RightSideComponent />
        </div>
      </div>
    </div>
  );
}
