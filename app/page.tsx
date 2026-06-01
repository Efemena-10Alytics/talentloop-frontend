"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import V1CareerSection from "@/components/v1-launch/v1-career-section";
import V1CTASection from "@/components/v1-launch/v1-cta-section";
import V1ExpertsSection from "@/components/v1-launch/v1-experts-section";
import V1HeroSection from "@/components/v1-launch/v1-hero-section";
import V1PricingSection from "@/components/v1-launch/v1-pricing-section";
import V1TestimonialsSection from "@/components/v1-launch/v1-testimonials-section";
import V1WhoIsForSection from "@/components/v1-launch/v1-who-is-for-section";
import V1WhyDifferentSection from "@/components/v1-launch/v1-why-different-section";
import V1FooterSection from "@/components/v1-launch/v1-footer-section";
import PricingFlowWrapper from "@/components/v1-launch/pricing-components/PricingFlowWrapper";
import BookingFlow from "@/components/v1-launch/pricing-components/BookingFlow";
import { useActivePricingPlans } from "@/lib/hooks/usePricing";
import V1VideoTestimonialSection from "@/components/v1-launch/v1-video-testimonials-section";

export default function Home() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { data: pricingPlans } = useActivePricingPlans();

  const handleStartNow = (planId: string) => {
    setSelectedPlan(planId);
    setShowBookingModal(true);
  };

  // Get the selected pricing plan details
  const selectedPlanData = pricingPlans?.find(
    (plan) =>
      String(plan.id) === selectedPlan ||
      plan.title.toLowerCase() === selectedPlan?.toLowerCase(),
  );

  const handleCloseModal = () => {
    setShowBookingModal(false);
  };

  return (
    <div className="bg-[#01090B] min-h-screen">
      <div className="p-3">
        <Navbar v1Launch />
        <V1HeroSection />
        <V1CareerSection />
        <V1ExpertsSection />
        {showBookingModal && selectedPlan ? (
          <BookingFlow
            planId={selectedPlanData?.id || selectedPlan}
            planType={selectedPlanData?.title || selectedPlan}
            planPrice={
              selectedPlanData?.amount ? `£${selectedPlanData.amount}` : "£250"
            }
            planAmount={selectedPlanData?.amount}
            planInstallments={selectedPlanData?.installments}
            onBackToPricing={handleCloseModal}
          />
        ) : (
          <div id="pricing">
            <V1PricingSection onStartNow={handleStartNow} />
          </div>
        )}
        <V1VideoTestimonialSection />
        <V1TestimonialsSection />
        <V1WhoIsForSection />
        <V1WhyDifferentSection />
        <V1CTASection />
        <V1FooterSection />
      </div>
    </div>
  );
}
