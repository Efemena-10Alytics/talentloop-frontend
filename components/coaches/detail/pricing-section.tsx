"use client";

import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

const CheckmarkSVG = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <path
      d="M15.75 2.08801C14.2306 1.20874 12.5055 0.747119 10.75 0.750014C5.227 0.750014 0.75 5.22701 0.75 10.75C0.75 16.273 5.227 20.75 10.75 20.75C16.273 20.75 20.75 16.273 20.75 10.75C20.7487 10.0633 20.682 9.39668 20.55 8.75001"
      stroke="#A2CE3A"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.75 11.25C6.75 11.25 8.25 11.25 10.25 14.75C10.25 14.75 15.809 5.583 20.75 3.75"
      stroke="#A2CE3A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowSVG = () => (
  <svg
    width="16"
    height="13"
    viewBox="0 0 16 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.666672 7.15067C0.48986 7.15067 0.320289 7.08212 0.195264 6.9601C0.0702381 6.83807 0 6.67257 0 6.5C0 6.32743 0.0702381 6.16193 0.195264 6.0399C0.320289 5.91788 0.48986 5.84933 0.666672 5.84933L13.5961 5.84933L8.2214 1.12804C8.09299 1.01196 8.0165 0.851254 8.00845 0.680612C8.0004 0.509969 8.06142 0.34308 8.17835 0.215972C8.29528 0.0888643 8.45874 0.0117331 8.63343 0.00123119C8.80812 -0.00927067 8.98004 0.047698 9.11207 0.159839L15.7788 6.0159C15.8484 6.07692 15.9041 6.15156 15.9422 6.23497C15.9803 6.31837 16 6.40868 16 6.5C16 6.59132 15.9803 6.68163 15.9422 6.76503C15.9041 6.84844 15.8484 6.92308 15.7788 6.9841L9.11207 12.8402C8.98004 12.9523 8.80812 13.0093 8.63343 12.9988C8.45874 12.9883 8.29528 12.9111 8.17835 12.784C8.06142 12.6569 8.0004 12.49 8.00845 12.3194C8.0165 12.1487 8.09299 11.988 8.2214 11.872L13.5961 7.15067L0.666672 7.15067Z"
      fill="#0B0D0F"
    />
  </svg>
);

interface PricingFeature {
  text: string;
  isHighlight?: boolean;
}

interface PricingPlan {
  title: string;
  price: string;
  subtitle: string;
  features: PricingFeature[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Single Mock Interview",
    price: "$20",
    subtitle: "1 session  •  60 min",
    features: [
      { text: "45-minute live mock interview" },
      { text: "Role-specific questions" },
      { text: "Verbal feedback during session" },
      { text: "Written feedback summary" },
      { text: "Interview scorecard" },
      { text: "Best for quick preparation", isHighlight: true },
    ],
  },
  {
    title: "Interview Accelerator",
    price: "$50",
    subtitle: "5 Mock Interviews Guaranteed  •  60 min",
    popular: true,
    features: [
      { text: "5 live mock interviews" },
      { text: "Different interview scenarios (behavioral, technical, panel)" },
      { text: "Detailed feedback after each session" },
      { text: "Personalized improvement plan" },
      { text: "Confidence & communication coaching" },
      { text: "Ideal for active job seekers", isHighlight: true },
    ],
  },
  {
    title: "Premium Career Coaching Bundle",
    price: "$75",
    subtitle: "5 Mock Interviews Guaranteed  •  60 min",
    features: [
      { text: "8 mock interviews" },
      { text: "CV & LinkedIn interview alignment review" },
      { text: "Real interview simulations (timed & pressured)" },
      { text: "Salary negotiation guidance" },
      { text: "Priority scheduling" },
      {
        text: "Built for senior or international job seekers",
        isHighlight: true,
      },
    ],
  },
];

export default function CoachPricingSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative py-8 lg:py-12 overflow-hidden"
    >
      {/* Background "Pricing Plan" text */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none overflow-hidden">
        <h2
          className="text-[80px] lg:text-[140px] xl:text-[180px] font-mona-sans font-bold whitespace-nowrap mt-[-20px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Pricing Plan
        </h2>
      </div>

      <Fade direction="up" triggerOnce duration={1500}>
        {/* Pricing Cards Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-16 lg:mt-24">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group rounded-[16px] p-4 lg:p-5 flex flex-col border border-transparent hover:border-[#A2CE3A] transition-colors duration-300 cursor-pointer"
              style={{ backgroundColor: "#FFFFFF1A" }}
            >
              {/* Glassy Inner Card - Title / Price / Subtitle */}
              <div
                className="rounded-[12px] p-5 lg:p-6 backdrop-blur-md"
                style={{
                  backgroundColor: plan.popular
                    ? "#A2CE3A3B"
                    : "#D0D5DD1A",
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="flex justify-start mb-4">
                    <span className="bg-[#D3F36A] text-[#0B0D0F] text-xs font-mona-sans font-medium px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-white text-xl lg:text-2xl font-mona-sans font-bold leading-tight">
                  {plan.title}
                </h3>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 my-4" />

                {/* Price */}
                <p className="text-white text-4xl lg:text-5xl font-mona-sans font-bold">
                  {plan.price}
                </p>

                {/* Subtitle */}
                <p className="text-white text-sm font-mona-sans mt-2">
                  {plan.subtitle}
                </p>
              </div>

              {/* Features - outside inner card */}
              <div className="flex flex-col gap-3 flex-1 px-2 pt-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    {feature.isHighlight ? (
                      <span className="flex-shrink-0 text-base">👉</span>
                    ) : (
                      <CheckmarkSVG />
                    )}
                    <span
                      className={`text-sm font-mona-sans leading-snug ${
                        feature.isHighlight
                          ? "text-white/70"
                          : "text-white/80"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Book Now Button */}
              <button className="mt-8 w-full bg-[#A2CE3A] text-[#0B0D0F] font-mona-sans font-semibold text-sm rounded-[16px] py-3.5 px-6 flex items-center justify-center gap-2 hover:bg-[#8FBB2E] transition-colors duration-300 cursor-pointer">
                Book Now
                <ArrowSVG />
              </button>
            </motion.div>
          ))}
        </div>
      </Fade>
    </motion.section>
  );
}
