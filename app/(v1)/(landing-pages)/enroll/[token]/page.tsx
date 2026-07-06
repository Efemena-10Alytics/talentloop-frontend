"use client";

import { useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import V1FooterSection from "@/components/v1-launch/v1-footer-section";
import PaymentSelection, { PaymentOption } from "@/components/v1-launch/pricing-components/PaymentSelection";
import PersonalInfoModal from "@/components/auth/PersonalInfoModal";
import { getApiUrl, getAuthHeaders, getHeaders } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useProfile, useAuthMe } from "@/hooks/useUserData";
import EmailVerification from "@/components/EmailVerification";

const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#01090B] min-h-screen py-14 lg:py-20">
    <div className="p-3">
      <Navbar v1Launch />
      {children}
      <V1FooterSection />
    </div>
  </div>
);

const LoadingScreen = () => (
  <div className="bg-[#01090B] min-h-screen py-14 lg:py-20 flex items-center justify-center">
    <div className="text-white font-mona-sans text-lg">Loading...</div>
  </div>
);

const ErrorScreen = ({ message }: { message: string }) => (
  <StepWrapper>
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-mona-sans font-bold text-white mb-3">{message}</h1>
        <p className="text-white/40 font-sora text-sm">Please contact your manager for a new enrollment link.</p>
      </div>
    </div>
  </StepWrapper>
);

export default function EnrollPage() {
  const params = useParams();
  const token = (params?.token as string) ?? "";
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { toast } = useToast();
  const hasShownCancelToast = useRef(false);

  const cancelParam = searchParams.get("cancel");

  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [pendingPaymentOption, setPendingPaymentOption] = useState<PaymentOption | null>(null);

  const { data: profile, refetch: refetchProfile } = useProfile();
  const { data: authMeData, refetch: refetchAuthMe } = useAuthMe();

  const {
    data: linkData,
    isLoading: linkLoading,
    error: linkError,
  } = useQuery({
    queryKey: ["enroll-link", token],
    queryFn: async () => {
      const res = await fetch(`${getApiUrl()}/api/v1/enroll/${token}`, {
        method: "GET",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("This enrollment link is invalid.");
      const json = await res.json();
      return json.data;
    },
    enabled: !!token,
    retry: false,
  });

  if (cancelParam === "true" && !hasShownCancelToast.current) {
    hasShownCancelToast.current = true;
    toast({
      variant: "error",
      title: "Payment Cancelled",
      description: "Your payment was cancelled. You can try again when ready.",
    });
  }

  const submitPayment = async (option: PaymentOption) => {
    if (!linkData) return;

    const email = authMeData?.user?.email || session?.user?.email || "";
    if (email.toLowerCase() !== linkData.client_email.toLowerCase()) {
      toast({
        variant: "error",
        title: "Wrong account",
        description: `This enrollment link is for ${linkData.client_email}. Please sign in with that email.`,
      });
      return;
    }

    try {
      const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === "DEVELOPMENT";
      const baseUrl = isDevelopment
        ? typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
        : process.env.NEXT_PUBLIC_WEBAPP_URL || "https://www.talentloop.app";

      const successUrl = `${baseUrl}/complete-your-payment?p-id=${linkData.pricing.id}&step=3`;
      const cancelUrl = `${baseUrl}/enroll/${token}?cancel=true`;

      const paymentOptionNumber = option.type === "installments" ? 2 : 1;

      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/v1/enroll/${token}/complete`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          payment_option: paymentOptionNumber,
          success_url: successUrl,
          cancel_url: cancelUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({ variant: "error", title: "Payment Error", description: data.message || "Failed to create payment plan" });
        return;
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        toast({ variant: "error", title: "Error", description: "No checkout URL received" });
      }
    } catch (error: any) {
      toast({ variant: "error", title: "Error", description: "Failed to initiate payment" });
    }
  };

  const handlePaymentSelect = async (option: PaymentOption) => {
    setPendingPaymentOption(option);

    const { data: latestAuthMe } = await refetchAuthMe();
    if (!latestAuthMe?.user?.email_verified_at) {
      const email = latestAuthMe?.user?.email || session?.user?.email || "";
      try {
        await fetch(`${getApiUrl()}/api/v1/auth/verify-email/resend-otp`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ email }),
        });
      } catch { /* non-blocking */ }
      setShowEmailVerificationModal(true);
      return;
    }

    const { data: latestProfile } = await refetchProfile();
    const complete = !!(latestProfile?.first_name && latestProfile?.last_name && latestProfile?.country);

    if (!complete) {
      setShowPersonalInfoModal(true);
      return;
    }

    await submitPayment(option);
  };

  const handleOtpVerify = async (otp: string) => {
    const email = authMeData?.user?.email || session?.user?.email || "";
    setVerifyingOtp(true);
    try {
      const response = await fetch(`${getApiUrl()}/api/v1/auth/verify-email`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast({ variant: "error", title: "Verification failed", description: data.message || "Invalid or expired code" });
        setVerifyingOtp(false);
        return;
      }
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }
      setVerifyingOtp(false);
      setShowEmailVerificationModal(false);

      const { data: latestProfile } = await refetchProfile();
      const complete = !!(latestProfile?.first_name && latestProfile?.last_name && latestProfile?.country);
      if (!complete) {
        setShowPersonalInfoModal(true);
      } else if (pendingPaymentOption) {
        await submitPayment(pendingPaymentOption);
      }
    } catch (err: any) {
      toast({ variant: "error", title: "Error", description: err.message || "Verification failed" });
      setVerifyingOtp(false);
    }
  };

  const handleOtpResend = async () => {
    const email = authMeData?.user?.email || session?.user?.email || "";
    try {
      await fetch(`${getApiUrl()}/api/v1/auth/verify-email/resend-otp`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email }),
      });
      toast({ variant: "success", title: "Code resent", description: "A new verification code has been sent to your email" });
    } catch {
      toast({ variant: "error", title: "Error", description: "Failed to resend code" });
    }
  };

  const handlePersonalInfoComplete = async () => {
    setShowPersonalInfoModal(false);
    await refetchProfile();
    if (pendingPaymentOption) {
      await submitPayment(pendingPaymentOption);
    }
  };

  if (!token || linkLoading) return <LoadingScreen />;

  if (linkError || !linkData) {
    return <ErrorScreen message="This enrollment link is invalid." />;
  }

  if (linkData.status === "cancelled") {
    return <ErrorScreen message="This enrollment link is no longer available." />;
  }

  return (
    <>
      <StepWrapper>
        <PaymentSelection
          planId={linkData.pricing.id}
          planType={linkData.pricing.title}
          planPrice={`£${linkData.pricing.amount}`}
          planAmount={linkData.pricing.amount?.toString()}
          planInstallments={linkData.pricing.installments || null}
          pricingPlanData={linkData.pricing}
          onPaymentSelect={handlePaymentSelect}
        />
      </StepWrapper>

      <PersonalInfoModal
        isOpen={showPersonalInfoModal}
        onComplete={handlePersonalInfoComplete}
      />

      {showEmailVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-[480px] mx-4 rounded-[20px] p-6 lg:p-8"
            style={{
              background:
                "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
            }}
          >
            <EmailVerification
              email={authMeData?.user?.email || session?.user?.email || ""}
              onVerify={handleOtpVerify}
              onResend={handleOtpResend}
              verifying={verifyingOtp}
            />
          </div>
        </div>
      )}
    </>
  );
}
