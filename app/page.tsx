"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
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
import V1VideoTestimonialSection from "@/components/v1-launch/v1-video-testimonials-section";
import V1Faqs from "@/components/v1-launch/v1-faqs";
import { useToast } from "@/components/ui/use-toast";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get("no-plan") === "true") {
      toast({
        variant: "error",
        title: "No active plan",
        description: "You don't have an active plan. Choose a plan below to get started.",
      });
      setTimeout(() => {
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      router.replace("/");
    }
  }, [searchParams, toast, router]);

  const handleStartNow = (planId: string) => {
    router.push(`/v1/clarity-session?p-id=${planId}`);
  };

  return (
    <div className="bg-[#01090B] min-h-screen">
      <div className="p-3">
        <Navbar v1Launch />
        <V1HeroSection />
        <div id="how-it-works">
          <V1CareerSection />
        </div>
        <div id="experts">
          <V1ExpertsSection />
        </div>
        <V1VideoTestimonialSection />
        <V1TestimonialsSection />
        <div id="pricing">
          <V1PricingSection onStartNow={handleStartNow} />
        </div>
        <V1WhoIsForSection />
        <V1WhyDifferentSection />
        <div id="faqs">
          <V1Faqs />
        </div>
        <V1CTASection />
        <V1FooterSection />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#01090B]" />}>
      <HomeContent />
    </Suspense>
  );
}
