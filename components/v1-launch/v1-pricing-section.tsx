"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useActivePricingPlans } from "@/lib/hooks/usePricing";
import type { PricingPlan } from "@/lib/services/pricing.service";
import { formatMoney } from "@/lib/services/quote.service";

interface V1PricingSectionProps {
  onStartNow?: (planId: string, planTitle?: string) => void;
  excludeBasicPlan?: boolean;
}

const PCIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#A2CE3A"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.3984 14.6504C11.3984 12.8555 12.8535 11.4004 14.6484 11.4004H26.1484C27.9434 11.4004 29.3984 12.8555 29.3984 14.6504V24.4004H30.6484C31.0627 24.4004 31.3984 24.7362 31.3984 25.1504V26.1504C31.3984 27.9453 29.9434 29.4004 28.1484 29.4004H12.6484C10.8535 29.4004 9.39844 27.9453 9.39844 26.1504V25.1504C9.39844 24.7362 9.73422 24.4004 10.1484 24.4004H11.3984V14.6504ZM10.8984 25.9004V26.1504C10.8984 27.1169 11.6819 27.9004 12.6484 27.9004H28.1484C29.1149 27.9004 29.8984 27.1169 29.8984 26.1504V25.9004H10.8984Z" fill="#0B0D0F"/>
  </svg>
);

const MostPopularBadge = () => (
  <span
    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mona-sans font-semibold text-white shadow-sm"
    style={{
      background: "linear-gradient(90deg, #A2CE3A 0%, #156374 100%)",
    }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFFFFF"/>
    </svg>
    Most Popular
  </span>
);

const CheckmarkIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5C21 16.299 16.299 21 10.5 21C4.70101 21 0 16.299 0 10.5Z" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M10.5 0.25C16.1609 0.25 20.75 4.83908 20.75 10.5C20.75 16.1609 16.1609 20.75 10.5 20.75C4.83908 20.75 0.25 16.1609 0.25 10.5C0.25 4.83908 4.83908 0.25 10.5 0.25Z" stroke="#A2CE3A" strokeOpacity="0.2" strokeWidth="0.5"/>
    <path d="M14.5 7.48633L9 12.9863L6.5 10.4863" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/** Old price struck through in red, current price in the normal bold style. */
function PriceDisplay({
  price,
  oldPrice,
  className,
}: {
  price: string;
  oldPrice?: string | null;
  className: string;
}) {
  return (
    <span className="inline-flex items-baseline gap-2">
      {oldPrice && oldPrice !== price && (
        <span className="line-through font-mona-sans text-[0.75em]" style={{ color: "#FF383C" }}>
          {oldPrice}
        </span>
      )}
      <span className={className}>{price}</span>
    </span>
  );
}

// Mock pricing plans (used during SSR and as robust fallback)
const mockPricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "£70",
    description: "For professionals needing sharper positioning, fast.",
    features: [
      "CV Revamp",
      "LinkedIn Optimization"
    ],
    isMostPopular: false
  },
  {
    id: "premium",
    name: "Premium",
    price: "£250",
    description: "For professionals tired of applying blindly.",
    features: [
      "CV Revamp",
      "LinkedIn Optimization",
      "Job Application Services",
      "3 Guaranteed Interviews",
      "2025 Job roadmap handbook"
    ],
    isMostPopular: true
  },
  {
    id: "comprehensive",
    name: "Comprehensive Plan",
    price: "£350",
    description: "For professionals serious about securing offers.",
    features: [
      "Everything in Premium",
      "5 Guaranteed Interviews",
      "Interview Prep Sessions",
      "Salary Negotiation Support"
    ],
    isMostPopular: false
  },
  {
    id: "platinum",
    name: "Platinum Plan",
    price: "£200",
    description: "For high-level executives seeking tailored strategy.",
    features: [
      "Everything in Comprehensive",
      "Executive Resume Writing",
      "Personal Branding Strategy",
      "Direct Recruiter Connections"
    ],
    isMostPopular: false
  }
];

export default function V1PricingSection({ onStartNow, excludeBasicPlan }: V1PricingSectionProps) {
  // null means "the user hasn't picked yet" — derived from whichever plans are on screen
  const [selectedPlan, setSelectedPlan] = useState<number | string | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<number | string | null>(null);

  // Fetch pricing plans from API using Tanstack Query
  const { data: apiPlans } = useActivePricingPlans();

  // Transform API plans to match component structure, gracefully falling back to mock plans
  const allPricingPlans = apiPlans && apiPlans.length > 0
    ? apiPlans.map((plan: PricingPlan) => ({
        id: plan.id,
        name: plan.title,
        price: formatMoney(parseFloat(plan.amount)),
        oldPrice: plan.old_amount ? formatMoney(parseFloat(plan.old_amount)) : null,
        description: plan.description,
        features: plan.tags || [],
        isMostPopular: plan.is_popular,
        installments: plan.installments,
      }))
    : mockPricingPlans.map((plan) => ({ ...plan, oldPrice: null as string | null }));

  const pricingPlans = excludeBasicPlan
    ? allPricingPlans.filter((plan) => plan.name.toLowerCase() !== "basic")
    : allPricingPlans;

  // Resolve active plan selection against plans on screen
  const activePlan =
    pricingPlans.find((plan) => plan.id === selectedPlan) ??
    pricingPlans.find((plan) => plan.isMostPopular) ??
    pricingPlans[0];

  const handleStartNow = () => {
    if (onStartNow && activePlan) {
      onStartNow(String(activePlan.id), String(activePlan.name));
    }
  };

  return (
    <section className="relative py-10 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-[22px] lg:text-5xl font-semibold leading-tight mb-4">
            <span className="text-white font-mona-sans">Choose Your </span>
            <span className="text-[#A2CE3A] font-mona-sans">Acceleration Tier.</span>
          </h2>
          <p className="text-[#CCCCCC] font-sora text-[12px] lg:text-sm">
            Transparent pricing. No fake guarantees. Every package is built around the outcome you actually need.
          </p>
        </motion.div>

        {/* Pricing Container - Rendered with complete HTML during SSR */}
        {activePlan && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:rounded-[24px] lg:p-10 bg-transparent"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Side - Pricing Cards */}
              <div className="lg:col-span-2 space-y-4">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedPlan(plan.id)}
                    onMouseEnter={() => setHoveredPlan(plan.id)}
                    onMouseLeave={() => setHoveredPlan(null)}
                    className="rounded-[28px] p-4 lg:p-6 cursor-pointer transition-all duration-500 ease-in-out relative"
                    style={{
                      background: activePlan?.id === plan.id || hoveredPlan === plan.id
                        ? "linear-gradient(135deg, rgba(162, 206, 58, 0.2) 0%, rgba(21, 99, 116, 0.2) 100%)"
                        : "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)"
                    }}
                  >
                    <div className="flex items-start lg:items-center justify-between">
                      <div className="flex items-center gap-4">
                        <PCIcon />
                        <div>
                          <h3 className="text-white font-mona-sans text-base lg:text-xl font-bold mb-1">
                            {plan.name}
                          </h3>
                          <p className="text-white/40 font-sora text-[10px] lg:text-sm">
                            {plan.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {plan.isMostPopular && (
                          <div className="scale-75 lg:scale-100">
                            <MostPopularBadge />
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                          <PriceDisplay
                            price={plan.price}
                            oldPrice={plan.oldPrice}
                            className="text-white font-mona-sans text-lg lg:text-3xl font-bold"
                          />

                          {/* Radio Selection Indicator */}
                          <div 
                            className="w-5 lg:w-10 h-5 lg:h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                            style={{
                              borderColor: "#FFFFFF",
                              borderWidth: "1px"
                            }}
                          >
                            {activePlan?.id === plan.id && (
                              <div 
                                className="w-3 lg:w-8 h-3 lg:h-8 rounded-full transition-all duration-300"
                                style={{ background: "#A2CE3A" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Side - Active Plan Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="rounded-[28px] p-6 lg:p-8"
                style={{
                  background: "linear-gradient(135deg, rgba(162, 206, 58, 0.2) 0%, rgba(21, 99, 116, 0.2) 100%)",
                  border: "0.5px solid #A2CE3A33"
                }}
              >
                <div className="mb-6">
                  <h3 className="text-white font-mona-sans text-xl font-bold mb-2">
                    {activePlan.name}
                  </h3>
                  <div className="mb-4">
                    <PriceDisplay
                      price={activePlan.price}
                      oldPrice={activePlan.oldPrice}
                      className="text-[22px] font-mona-sans font-bold text-white"
                    />
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {activePlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckmarkIcon />
                      <span className="text-white/60 font-sora text-sm flex-1">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Start Now Button */}
                <button
                  onClick={handleStartNow}
                  className="w-full px-8 py-4 rounded-[30px] font-mona-sans text-base font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(90deg, #071522 25%, #A2CE3A 100%)",
                    boxShadow: "0px -6px 4px 0px #FFFFFF4D inset"
                  }}
                >
                  Start Now
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
