"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import BookingCalendar from "@/components/v1-launch/pricing-components/BookingCalendar";
import V1FooterSection from "@/components/v1-launch/v1-footer-section";
import BookingFlow from "@/components/v1-launch/pricing-components/BookingFlow";

const ClaritySessionPage = () => {
  return (
    <div className="bg-[#01090B] min-h-screen">
      <div className="p-3">
        <Navbar v1Launch />

        <section className="relative py-14 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h2 className="text-4xl lg:text-5xl  font-semibold leading-tight mb-4">
                <span className="text-white font-mona-sans">Book your clarity session</span>
              </h2>
              <p className="text-[#CCCCCC] font-sora text-sm">
             Before purchasing the Premium package, book a free clarity session with our team.
              </p>
            </motion.div>

            <BookingFlow
              planId="clarity-session"
              planType="Clarity Session"
              planPrice="£250"
              onBackToPricing={() => {}}
            />
          </div>
        </section>
        <V1FooterSection />
      </div>
    </div>
  );
};

export default ClaritySessionPage;
