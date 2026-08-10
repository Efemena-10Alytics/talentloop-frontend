"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/navbar";
import V1FooterSection from "@/components/v1-launch/v1-footer-section";
import PaymentSelection, { PaymentOption } from "@/components/v1-launch/pricing-components/PaymentSelection";
import EnrollmentConfirmation from "@/components/v1-launch/pricing-components/EnrollmentConfirmation";
import EditPersonalDataModal, { PersonalData } from "@/components/v1-launch/pricing-components/EditPersonalDataModal";
import PersonalInfoModal from "@/components/auth/PersonalInfoModal";
import CareerInfoSection from "@/components/v1-launch/pricing-components/CareerInfoSection";
import EducationalInfoSection from "@/components/v1-launch/pricing-components/EducationalInfoSection";
import JobApplicationInfoSection from "@/components/v1-launch/pricing-components/JobApplicationInfoSection";
import CredentialsUploadSection from "@/components/v1-launch/pricing-components/CredentialsUploadSection";
import DisclaimerSection from "@/components/v1-launch/pricing-components/DisclaimerSection";
import FinalOnboardingCompleteModal from "@/components/v1-launch/pricing-components/FinalOnboardingCompleteModal";
import { getApiUrl, getAuthHeaders, getHeaders } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useProfile, useAuthMe } from "@/hooks/useUserData";
import EmailVerification from "@/components/EmailVerification";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const STEP_MIN = 1;
const STEP_MAX = 8;

function parseStep(raw: string | null): Step {
  const n = parseInt(raw ?? "1");
  if (isNaN(n) || n < STEP_MIN) return 1;
  if (n > STEP_MAX) return STEP_MAX as Step;
  return n as Step;
}

function getPaymentOptionKey(pId: string | null) {
  return `payment_option_${pId ?? "unknown"}`;
}

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

const CompleteYourPaymentContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const hasShownSuccessToast = useRef(false);

  // --- URL params (source of truth) ---
  const pId = searchParams.get("p-id");
  const cancelParam = searchParams.get("cancel");

  // currentStep is derived directly from URL — no useState, no flicker
  const currentStep: Step = parseStep(searchParams.get("step"));

  // Navigate to a step — pushes URL so browser back/forward works
  const goToStep = (step: Step) => {
    router.push(`/complete-your-payment?p-id=${pId}&step=${step}`);
  };

  // --- Payment option: persisted in sessionStorage so it survives step navigation ---
  const [paymentOption, setPaymentOption] = useState<PaymentOption | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = sessionStorage.getItem(getPaymentOptionKey(pId));
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const savePaymentOption = (option: PaymentOption) => {
    setPaymentOption(option);
    try {
      sessionStorage.setItem(getPaymentOptionKey(pId), JSON.stringify(option));
    } catch { /* ignore */ }
  };

  const clearPaymentOption = () => {
    setPaymentOption(null);
    try {
      sessionStorage.removeItem(getPaymentOptionKey(pId));
    } catch { /* ignore */ }
  };

  // --- Modals & form ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  });

  // --- Data fetching ---
  const {
    data: profile,
    refetch: refetchProfile,
    isSuccess: profileLoaded,
  } = useProfile();

  const { data: authMeData, refetch: refetchAuthMe } = useAuthMe();

  const { data: pricingPlan, isLoading: pricingLoading } = useQuery({
    queryKey: ["pricing", pId],
    queryFn: async () => {
      const res = await fetch(`${getApiUrl()}/api/v1/pricing/${pId}`, {
        method: "GET",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch pricing plan");
      const json = await res.json();
      return json.data;
    },
    enabled: !!pId,
    retry: false,
  });

  // Only block the very first render of step 1 until pricing is ready.
  // Profile is NOT needed to render step 1 (PaymentSelection only needs pricing),
  // and gating on profileLoading would unmount PaymentSelection — destroying the
  // open sign-in/OTP modal — whenever a background profile refetch runs.
  const initialLoading = currentStep === 1 && !!pId && pricingLoading;

  const hasProfileData = !!(
    profile?.first_name &&
    profile?.last_name &&
    profile?.country
  );

  // Sync personal data from profile
  useEffect(() => {
    if (profile) {
      setPersonalData({
        firstName: profile.first_name || "",
        middleName: profile.middle_name || "",
        lastName: profile.last_name || "",
        email: session?.user?.email || "",
        phone: profile.phone || "",
        location: profile.country || "",
      });
    }
  }, [profile, session]);

  // Show success toast once after Stripe redirects back to step 3
  useEffect(() => {
    if (currentStep === 3 && !hasShownSuccessToast.current) {
      hasShownSuccessToast.current = true;
      toast({
        variant: "success",
        title: "Payment Successful!",
        description: "Your payment has been processed. Please complete your profile.",
      });
    }
  }, [currentStep]);

  // Show cancellation toast when returning from Stripe with cancel=true
  useEffect(() => {
    if (cancelParam === "true") {
      toast({
        variant: "error",
        title: "Payment Cancelled",
        description: "Your payment was cancelled. You can try again when ready.",
      });
    }
  }, [cancelParam]);

  // Auto-show PersonalInfoModal when an authenticated user has no profile data
  // on step 1.
  //
  // This must wait for the profile query to actually resolve. `profile` is
  // undefined while it's in flight, which reads as "nothing filled in" — that's
  // why the modal used to appear for everyone. `initialLoading` doesn't help
  // here: it deliberately tracks pricing only (see above). Gating on
  // profileLoaded also means a failed request leaves the modal shut rather than
  // prompting someone who has already filled this in.
  useEffect(() => {
    if (!session || currentStep !== 1 || !profileLoaded) return;

    // Reacting to an async query result is exactly the case effects exist for.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowPersonalInfoModal(!hasProfileData);
  }, [session, currentStep, profileLoaded, hasProfileData]);

  // --- Step handlers ---

  // Advance after email is verified: check profile then navigate
  const handleEmailVerified = async () => {
    setShowEmailVerificationModal(false);
    const { data: latestProfile } = await refetchProfile();
    const complete = !!(
      latestProfile?.first_name &&
      latestProfile?.last_name &&
      latestProfile?.country
    );
    if (!complete) {
      setShowPersonalInfoModal(true);
    } else {
      goToStep(2);
    }
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
        toast({
          variant: "error",
          title: "Verification failed",
          description: data.message || "Invalid or expired code",
        });
        setVerifyingOtp(false);
        return;
      }
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }
      toast({
        variant: "success",
        title: "Email verified!",
        description: "Your email has been verified successfully",
      });
      setVerifyingOtp(false);
      await handleEmailVerified();
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Error",
        description: err.message || "Verification failed",
      });
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
      toast({
        variant: "success",
        title: "Code resent",
        description: "A new verification code has been sent to your email",
      });
    } catch {
      toast({
        variant: "error",
        title: "Error",
        description: "Failed to resend code",
      });
    }
  };

  const handlePaymentSelect = async (selectedPayment: PaymentOption) => {
    savePaymentOption(selectedPayment);

    // Always refetch auth/me to get the latest email_verified_at
    const { data: latestAuthMe } = await refetchAuthMe();
    if (!latestAuthMe?.user?.email_verified_at) {
      // Email not verified — send a fresh OTP then show the verification modal
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
    const complete = !!(
      latestProfile?.first_name &&
      latestProfile?.last_name &&
      latestProfile?.country
    );

    if (!complete) {
      setShowPersonalInfoModal(true);
    } else {
      goToStep(2);
    }
  };

  const handlePersonalInfoComplete = async () => {
    setShowPersonalInfoModal(false);
    await refetchProfile();
    if (paymentOption) {
      goToStep(2);
    }
  };

  const handleEnrollmentProceed = async () => {
    if (!pricingPlan?.id) {
      toast({ variant: "error", title: "Error", description: "Pricing plan not found" });
      return;
    }

    // If the user already has a Stripe customer ID, they've paid — skip checkout
    const { data: latestAuthMe } = await refetchAuthMe();
    if (latestAuthMe?.user?.stripe_customer_id) {
      goToStep(3);
      return;
    }

    try {
      setSubmitting(true);

      const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === "DEVELOPMENT";
      const baseUrl = isDevelopment
        ? typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
        : process.env.NEXT_PUBLIC_WEBAPP_URL || "https://www.talentloop.app";

      // Stripe success/cancel URLs — step=3 lands on Career Info, step=1 with cancel=true shows toast
      const successUrl = `${baseUrl}/complete-your-payment?p-id=${pId}&step=3`;
      const cancelUrl  = `${baseUrl}/complete-your-payment?p-id=${pId}&step=1&cancel=true`;

      const paymentOptionNumber = paymentOption?.type === "installments" ? 2 : 1;

      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/v1/payment-plans`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          pricing_id: pricingPlan.id,
          payment_option: paymentOptionNumber,
          success_url: successUrl,
          cancel_url: cancelUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({ variant: "error", title: "Payment Error", description: data.message || "Failed to create payment plan" });
        setSubmitting(false);
        return;
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        toast({ variant: "error", title: "Error", description: "No checkout URL received" });
        setSubmitting(false);
      }
    } catch (error: any) {
      console.error("Payment plan creation error:", error);
      toast({ variant: "error", title: "Error", description: "Failed to initiate payment" });
      setSubmitting(false);
    }
  };

  // --- Render ---
  const renderStep = () => {
    if (initialLoading) return <LoadingScreen />;

    switch (currentStep) {
      case 1:
        return (
          <StepWrapper>
            <PaymentSelection
              planId={pricingPlan?.id || pId || ""}
              planType={pricingPlan?.title || "Premium"}
              planPrice={pricingPlan ? `£${pricingPlan.amount}` : "£250"}
              planAmount={pricingPlan?.amount?.toString() || undefined}
              planInstallments={pricingPlan?.installments || null}
              pricingPlanData={pricingPlan}
              onPaymentSelect={handlePaymentSelect}
            />
          </StepWrapper>
        );

      case 2:
        // Guard: if no payment option (e.g. user typed URL manually), send back to step 1
        if (!paymentOption) {
          goToStep(1);
          return <LoadingScreen />;
        }
        return (
          <StepWrapper>
            <EnrollmentConfirmation
              personalData={personalData}
              paymentPlan={{
                planName: pricingPlan?.title || (paymentOption?.type === "installments" ? "2 Installments" : "Full Payment"),
                paymentType: paymentOption?.type,
                firstPayment: paymentOption?.installmentDetails?.first,
                secondPayment: paymentOption?.installmentDetails?.second,
                nextPaymentDate: "Jun 21, 2026",
                pricingPlanData: pricingPlan,
              }}
              onEditData={() => setShowEditModal(true)}
              onProceed={handleEnrollmentProceed}
              onCompleteOnboarding={() => goToStep(3)}
            />
            <EditPersonalDataModal
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              onSave={(data) => setPersonalData(data)}
              initialData={personalData}
            />
          </StepWrapper>
        );

      case 3:
        return (
          <StepWrapper>
            <CareerInfoSection
              onBack={() => goToStep(2)}
              onProceed={() => goToStep(4)}
              initialData={profile}
            />
          </StepWrapper>
        );

      case 4:
        return (
          <StepWrapper>
            <EducationalInfoSection
              onBack={() => goToStep(3)}
              onProceed={() => goToStep(5)}
              initialData={profile}
            />
          </StepWrapper>
        );

      case 5:
        return (
          <StepWrapper>
            <JobApplicationInfoSection
              onBack={() => goToStep(4)}
              onProceed={() => goToStep(6)}
              initialData={profile}
            />
          </StepWrapper>
        );

      case 6:
        return (
          <StepWrapper>
            <CredentialsUploadSection
              onBack={() => goToStep(5)}
              onProceed={() => {
                clearPaymentOption();
                goToStep(7);
              }}
              initialData={profile}
            />
          </StepWrapper>
        );

      case 7:
        return (
          <StepWrapper>
            <DisclaimerSection
              onBack={() => goToStep(6)}
              onProceed={() => goToStep(8)}
              initialData={profile}
            />
          </StepWrapper>
        );

      case 8:
        return (
          <>
            <StepWrapper>
              <div />
            </StepWrapper>
            <FinalOnboardingCompleteModal
              isOpen={true}
              onClose={() => {}}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderStep()}
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
};

const CompleteYourPaymentPage = () => (
  <Suspense fallback={<LoadingScreen />}>
    <CompleteYourPaymentContent />
  </Suspense>
);

export default CompleteYourPaymentPage;
