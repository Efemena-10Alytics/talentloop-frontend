"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import V1FooterSection from "@/components/v1-launch/v1-footer-section";
import V1PricingSection from "@/components/v1-launch/v1-pricing-section";

const PricingPlanContent = () => {
  const router = useRouter();
  const handleStartNow = (planId: string) => {
    router.push(`/complete-your-payment?p-id=${planId}&type=installment`);
  };

  return (
    <div className="bg-[#01090B] min-h-screen">
      <div className="p-3">
        <Navbar v1Launch />

        <section className="relative py-14 lg:py-20 overflow-hidden">
          {/* Ambient glow blobs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.18, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #A2CE3A 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 2.4, ease: "easeOut", delay: 0.3 }}
            className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #156374 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          <div className="max-w-[1400px] mx-auto px-3 lg:px-6 pt-10 relative">
            <V1PricingSection onStartNow={handleStartNow} excludeBasicPlan />
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <V1FooterSection />
        </motion.div>
      </div>
    </div>
  );
};

const PricingPlanPage = () => {
  return (
    <Suspense
      fallback={
        <div className="bg-[#01090B] min-h-screen py-14 lg:py-20 flex items-center justify-center">
          <div className="text-white font-mona-sans text-lg">Loading...</div>
        </div>
      }
    >
      <PricingPlanContent />
    </Suspense>
  );
};

export default PricingPlanPage;
