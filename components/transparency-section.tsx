"use client";

import { Dot } from "lucide-react";
import Image from "next/image";

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#A2CE3A" fillOpacity="0.2" />
    <path
      d="M5 8L7 10L11 6"
      stroke="#A2CE3A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StatCard = ({
  icon,
  number,
  label,
  subtitle,
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
  subtitle: string;
}) => (
  <div className="bg-[#1A1D21]/80 backdrop-blur-sm border border-white/10 rounded-[12px] p-4">
    <div className="flex items-start justify-between mb-2">
      <span className="text-2xl lg:text-3xl">{icon}</span>
    </div>
    <div className="mb-1">
      <h3 className="text-2xl lg:text-3xl font-bold text-white font-mona-sans">
        {number}
      </h3>
      <p className="text-sm text-white font-sora">{label}</p>
    </div>
    <p className="text-xs text-[#ACACAC] font-sora">{subtitle}</p>
  </div>
);

export default function ReportingTransparencySection() {
  return (
    <section className="relative bg-[#0B0D0F] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="flex-1 space-y-6 lg:space-y-8">
            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-mona-sans font-bold text-white leading-tight">
                REPORTING &<br />
                TRANSPARENCY
              </h1>
              <h2 className="text-xl lg:text-2xl font-mona-sans font-semibold text-white">
                Know Exactly What's Happening<br />
                — Every Week
              </h2>
            </div>

            {/* Dashboard Info */}
            <div className="space-y-3">
              <p className="text-white font-sora text-base lg:text-lg">
                Your dashboard shows:
              </p>
              
              <div className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Dot className="text-white" />
                  </div>
                  <p className="text-white font-sora text-sm lg:text-base">
                    Total jobs applied to
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Dot className="text-white" />
                  </div>
                  <p className="text-white font-sora text-sm lg:text-base">
                    Applications this week
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Dot className="text-white" />
                  </div>
                  <p className="text-white font-sora text-sm lg:text-base">
                    Interviews received
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Dot className="text-white" />
                  </div>
                  <p className="text-white font-sora text-sm lg:text-base">
                    Roles and industries targeted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image with Stats Overlay */}
          <div className="flex-1 w-full lg:max-w-[550px] relative">
            <div className="relative rounded-[24px] overflow-hidden">
              {/* Main Image */}
              <div className="relative aspect-[4/3] lg:aspect-[16/10]">
                <img
                  src="/homepage/full-shot-woman-reading-laptop 1.svg"
                  alt="Professional working on laptop"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}