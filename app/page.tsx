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
import PricingFlowWrapper from "@/components/v1-launch/pricing-components/PricingFlowWrapper";
import BookingFlow from "@/components/v1-launch/pricing-components/BookingFlow";

export default function Home() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleStartNow = (planId: string) => {
    setSelectedPlan(planId);
    setShowBookingModal(true);
  };

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
          <BookingFlow planId={selectedPlan} planType={selectedPlan} />
        ) : (
          <div id="pricing">
            <V1PricingSection onStartNow={handleStartNow} />
          </div>
        )}
        <V1WhyDifferentSection />
        <V1WhoIsForSection />
        <V1TestimonialsSection />
        <V1CTASection />
      </div>

    
    
    </div>
  );
}
