"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/navbar";
import V1FooterSection from "@/components/v1-launch/v1-footer-section";
import PaymentSelection, { PaymentOption } from "@/components/v1-launch/pricing-components/PaymentSelection";
import EnrollmentConfirmation from "@/components/v1-launch/pricing-components/EnrollmentConfirmation";
import EditPersonalDataModal, { PersonalData } from "@/components/v1-launch/pricing-components/EditPersonalDataModal";
import PersonalInfoModal from "@/components/auth/PersonalInfoModal";
import CareerInfoSection, { CareerFormData } from "@/components/v1-launch/pricing-components/CareerInfoSection";
import EducationalInfoSection, { EducationFormData } from "@/components/v1-launch/pricing-components/EducationalInfoSection";
import JobApplicationInfoSection, { JobApplicationFormData } from "@/components/v1-launch/pricing-components/JobApplicationInfoSection";
import CredentialsUploadSection, { CredentialsFormData } from "@/components/v1-launch/pricing-components/CredentialsUploadSection";
import DisclaimerSection, { DisclaimerFormData } from "@/components/v1-launch/pricing-components/DisclaimerSection";
import { getApiUrl, getAuthHeaders, getHeaders } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/hooks/useUserData";

const CompleteYourPaymentContent = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { toast } = useToast();
  const hasShownSuccessToast = useRef(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [paymentOption, setPaymentOption] = useState<PaymentOption | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  });

  // Extract URL parameters
  const token = searchParams.get('token');
  const pId = searchParams.get('p-id'); // Pricing plan ID
  const stepParam = searchParams.get('step'); // Step to navigate to after payment
  const cancelParam = searchParams.get('cancel'); // Payment cancelled
  const planType = searchParams.get('planType') || 'full'; // 'full' or 'installments'
  const planId = searchParams.get('planId') || 'premium';
  const planPrice = searchParams.get('planPrice') || '£250';
  const planAmount = searchParams.get('planAmount');
  
  // Parse installments if provided
  const installmentsParam = searchParams.get('installments');
  const planInstallments = installmentsParam ? JSON.parse(installmentsParam) : null;

  // Profile data via TanStack Query (shared/cached, no session-driven refetch loop)
  const {
    data: profile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useProfile();

  // Pricing plan via TanStack Query (unauthenticated endpoint)
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
  });

  const initialLoading = profileLoading || (!!pId && pricingLoading);
  const hasProfileData = !!(
    profile?.first_name &&
    profile?.last_name &&
    profile?.country
  );

  // Keep editable personal data in sync with the fetched profile
  useEffect(() => {
    if (profile) {
      setPersonalData({
        firstName: profile.first_name || "",
        middleName: profile.middle_name || "",
        lastName: profile.last_name || "",
        email: session?.user?.email || "",
        phone: profile.phone || "",
        location: profile.country || "",
        city: profile.city || "",
      });
    }
  }, [profile, session]);

  // Handle step navigation from URL (after payment success)
  useEffect(() => {
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= 1 && step <= 6) {
        setCurrentStep(step as 1 | 2 | 3 | 4 | 5 | 6);
        
        // Show success toast only when returning from Stripe (step=3) and only once
        if (step === 3 && !hasShownSuccessToast.current) {
          hasShownSuccessToast.current = true;
          toast({
            variant: "success",
            title: "Payment Successful!",
            description: "Your payment has been processed. Please complete your profile.",
          });
        }
      }
    }
  }, [stepParam]);

  // Handle payment cancellation
  useEffect(() => {
    if (cancelParam === 'true') {
      toast({
        variant: "error",
        title: "Payment Cancelled",
        description: "Your payment was cancelled. You can try again when ready.",
      });
    }
  }, [cancelParam]);

  // Auto-show PersonalInfoModal when authenticated user has no profile data
  useEffect(() => {
    if (!initialLoading && session && !hasProfileData && currentStep === 1) {
      setShowPersonalInfoModal(true);
    }
  }, [initialLoading, session, hasProfileData, currentStep]);

  const handlePaymentSelect = async (selectedPayment: PaymentOption) => {
    setPaymentOption(selectedPayment);
    // Refetch profile data before moving to step 2 to ensure we have the latest data
    const { data: latestProfile } = await refetchProfile();
    const complete = !!(
      latestProfile?.first_name &&
      latestProfile?.last_name &&
      latestProfile?.country
    );

    if (!complete) {
      setShowPersonalInfoModal(true);
    } else {
      setCurrentStep(2);
    }
  };

  const handlePersonalInfoComplete = async () => {
    setShowPersonalInfoModal(false);
    // Refetch profile data after personal info is saved
    await refetchProfile();
    // If user had already selected a payment option, proceed to step 2
    if (paymentOption) {
      setCurrentStep(2);
    }
  };

  const handleEditData = () => {
    setShowEditModal(true);
  };

  const handleSavePersonalData = (data: PersonalData) => {
    setPersonalData(data);
  };

  const handleEnrollmentProceed = async () => {
    if (!pricingPlan?.id) {
      toast({
        variant: "error",
        title: "Error",
        description: "Pricing plan not found",
      });
      return;
    }

    try {
      setSubmitting(true);

      // Build success and cancel URLs based on environment
      const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEVELOPMENT';
      const baseUrl = isDevelopment 
        ? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
        : (process.env.NEXT_PUBLIC_WEBAPP_URL || 'https://talentloop-frontend.vercel.app');
      
      const successUrl = `${baseUrl}/v1/complete-your-payment?p-id=${pId}&step=3`;
      const cancelUrl = `${baseUrl}/v1/complete-your-payment?p-id=${pId}&cancel=true`;

      // Determine payment_option based on selected payment type
      // payment_option: 1 for full payment, 2 for installments
      const paymentOptionNumber = paymentOption?.type === "installments" ? 2 : 1;

      // Prepare request body
      const requestBody = {
        pricing_id: pricingPlan.id,
        payment_option: paymentOptionNumber,
        success_url: successUrl,
        cancel_url: cancelUrl,
      };

      // Create payment plan
      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/v1/payment-plans`, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          variant: "error",
          title: "Payment Error",
          description: data.message || "Failed to create payment plan",
        });
        setSubmitting(false);
        return;
      }

      // Redirect to Stripe checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        toast({
          variant: "error",
          title: "Error",
          description: "No checkout URL received",
        });
        setSubmitting(false);
      }
    } catch (error: any) {
      console.error("Payment plan creation error:", error);
      toast({
        variant: "error",
        title: "Error",
        description: "Failed to initiate payment",
      });
      setSubmitting(false);
    }
  };

  const handleCompleteOnboarding = () => {
    setCurrentStep(3);
  };

  const handleCareerInfoBack = () => {
    setCurrentStep(2);
  };

  const handleCareerInfoProceed = (careerData: CareerFormData) => {
    console.log("Career data:", careerData);
    setCurrentStep(4);
  };

  const handleEducationInfoBack = () => {
    setCurrentStep(3);
  };

  const handleEducationInfoProceed = (educationData: EducationFormData) => {
    console.log("Education data:", educationData);
    setCurrentStep(5);
  };

  const handleJobApplicationInfoBack = () => {
    setCurrentStep(4);
  };

  const handleJobApplicationInfoProceed = (jobAppData: JobApplicationFormData) => {
    console.log("Job Application data:", jobAppData);
    setCurrentStep(6);
  };

  const handleCredentialsUploadBack = () => {
    setCurrentStep(5);
  };

  const handleCredentialsUploadProceed = (credentialsData: CredentialsFormData) => {
    console.log("Credentials data:", credentialsData);
    // TODO: Submit all enrollment data and redirect to dashboard or show final success
  };


  // Render step content
  const renderStepContent = () => {
    // Show loading state while fetching data
    if (currentStep === 1 && initialLoading) {
      return (
        <div className="bg-[#01090B] min-h-screen py-14 lg:py-20 flex items-center justify-center">
          <div className="text-white font-mona-sans text-lg">Loading...</div>
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <div className="bg-[#01090B] min-h-screen py-14 lg:py-20">
          <div className="p-3">
            <Navbar v1Launch />
            <PaymentSelection
              planId={pricingPlan?.id || planId}
              planType={pricingPlan?.title || planId}
              planPrice={pricingPlan ? `£${pricingPlan.amount}` : planPrice}
              planAmount={pricingPlan?.amount || planAmount || undefined}
              planInstallments={pricingPlan?.installments || planInstallments}
              pricingPlanData={pricingPlan}
              onPaymentSelect={handlePaymentSelect}
            />
            <V1FooterSection />
          </div>
        </div>
      );
    }

    if (currentStep === 2 && paymentOption) {
      return (
        <div className="bg-[#01090B] min-h-screen py-14 lg:py-20">
          <div className="p-3">
            <Navbar v1Launch />
            <EnrollmentConfirmation
              personalData={personalData}
              paymentPlan={{
                planName: pricingPlan?.title || (paymentOption.type === "installments" ? "2 Installments" : "Full Payment"),
                paymentType: paymentOption.type,
                firstPayment: paymentOption.installmentDetails?.first,
                secondPayment: paymentOption.installmentDetails?.second,
                nextPaymentDate: "Jun 21, 2026",
                pricingPlanData: pricingPlan,
              }}
              onEditData={handleEditData}
              onProceed={handleEnrollmentProceed}
              onCompleteOnboarding={handleCompleteOnboarding}
            />
            <EditPersonalDataModal
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              onSave={handleSavePersonalData}
              initialData={personalData}
            />
            <V1FooterSection />
          </div>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="bg-[#01090B] min-h-screen py-14 lg:py-20">
          <div className="p-3">
            <Navbar v1Launch />
            <CareerInfoSection
              onBack={handleCareerInfoBack}
              onProceed={handleCareerInfoProceed}
              initialData={profile}
            />
            <V1FooterSection />
          </div>
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="bg-[#01090B] min-h-screen py-14 lg:py-20">
          <div className="p-3">
            <Navbar v1Launch />
            <EducationalInfoSection
              onBack={handleEducationInfoBack}
              onProceed={handleEducationInfoProceed}
              initialData={profile}
            />
            <V1FooterSection />
          </div>
        </div>
      );
    }

    if (currentStep === 5) {
      return (
        <div className="bg-[#01090B] min-h-screen py-14 lg:py-20">
          <div className="p-3">
            <Navbar v1Launch />
            <JobApplicationInfoSection
              onBack={handleJobApplicationInfoBack}
              onProceed={handleJobApplicationInfoProceed}
              initialData={profile}
            />
            <V1FooterSection />
          </div>
        </div>
      );
    }

    if (currentStep === 6) {
      return (
        <div className="bg-[#01090B] min-h-screen py-14 lg:py-20">
          <div className="p-3">
            <Navbar v1Launch />
            <CredentialsUploadSection
              onBack={handleCredentialsUploadBack}
              onProceed={handleCredentialsUploadProceed}
              initialData={profile}
            />
            <V1FooterSection />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {renderStepContent()}

      {/* PersonalInfoModal - rendered globally, shown when authenticated user has no profile data */}
      <PersonalInfoModal
        isOpen={showPersonalInfoModal}
        onComplete={handlePersonalInfoComplete}
      />
    </>
  );
};

const CompleteYourPaymentPage = () => {
  return (
    <Suspense fallback={
      <div className="bg-[#01090B] min-h-screen py-14 lg:py-20 flex items-center justify-center">
        <div className="text-white font-mona-sans text-lg">Loading...</div>
      </div>
    }>
      <CompleteYourPaymentContent />
    </Suspense>
  );
};

export default CompleteYourPaymentPage;
