"use client";

import { Suspense } from "react";
import DiamondNavbar from "@/components/diamond/diamond-navbar";
import DiamondHero from "@/components/diamond/diamond-hero";
import DiamondProblem from "@/components/diamond/diamond-problem";
import DiamondVideoTestimonials from "@/components/diamond/diamond-video-testimonials";
import DiamondHowItWorks from "@/components/diamond/diamond-how-it-works";
import DiamondOffer from "@/components/diamond/diamond-offer";
import DiamondGuarantee from "@/components/diamond/diamond-guarantee";
import DiamondManagers from "@/components/diamond/diamond-managers";
import DiamondScreenshots from "@/components/diamond/diamond-screenshots";
import DiamondPricing from "@/components/diamond/diamond-pricing";
import DiamondFit from "@/components/diamond/diamond-fit";
import DiamondBooking from "@/components/diamond/diamond-booking";
import DiamondFaq from "@/components/diamond/diamond-faq";
import DiamondFooter from "@/components/diamond/diamond-footer";

export default function DiamondLandingPage() {
  return (
    <main className="w-full min-h-screen flex flex-col font-sora">
      {/* 0. Sticky Header */}
      <DiamondNavbar />

      {/* 1. Hero with A/B variant switching */}
      <Suspense fallback={<div className="h-96 bg-[#01090B] animate-pulse" />}>
        <DiamondHero />
      </Suspense>

      {/* 2. Problem section */}
      <DiamondProblem />

      {/* 3. Testimonial Videos */}
      <DiamondVideoTestimonials />

      {/* 4. How It Works (5 steps) */}
      <DiamondHowItWorks />

      {/* 5. The Offer (All inclusions + bonus) */}
      <DiamondOffer />

      {/* 6. Guarantee */}
      <DiamondGuarantee />

      {/* 7. Meet the Managers */}
      <DiamondManagers />

      {/* 8. Testimonial Screenshots with filter pills */}
      <DiamondScreenshots />

      {/* 9. Pricing (Pay in full vs 3 installments) */}
      <DiamondPricing />

      {/* 10. Who it's for vs not for */}
      <DiamondFit />

      {/* 11. Clarity Call Booking */}
      <DiamondBooking />

      {/* 12. FAQ Accordion */}
      <DiamondFaq />

      {/* 13. Final Urgency CTA & Footer */}
      <DiamondFooter />
    </main>
  );
}
