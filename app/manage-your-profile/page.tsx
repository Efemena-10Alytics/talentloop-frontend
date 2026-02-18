"use client";

import { Navbar1 } from "@/components/manage-your-profile/Navbar1";
import { ApplicationStatusCard } from "@/components/manage-your-profile/ApplicationStatusCard";
import { QuickActionsCard } from "@/components/manage-your-profile/QuickActionsCard";
import { ProfileCompletionCard } from "@/components/manage-your-profile/ProfileCompletionCard";
import { ProTipCard } from "@/components/manage-your-profile/ProTipCard";
import { QuickStatsCard } from "@/components/manage-your-profile/QuickStatsCard";

/* ─── Main Page ─── */
export default function ManageYourProfilePage() {
  return (
    <div className="min-h-screen bg-[#0B0D0F] relative overflow-hidden">
      {/* Background LooperGroup */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] opacity-20 pointer-events-none">
        <img src="/LooperGroup.svg" alt="" className="w-full h-full object-contain" />
      </div>

      {/* ─── Navbar ─── */}
      <Navbar1 />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-8 lg:py-12">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl">Welcome, Ricky Samson</h1>
          <p className="text-white/50 font-mona-sans text-sm mt-1">Manage your coaching profile and track your application status.</p>
        </div>

        {/* ─── Grid Layout ─── */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ─── Left Column ─── */}
          <div className="flex-1 flex flex-col gap-6">
            <ApplicationStatusCard />zz
            <QuickActionsCard />
          </div>

          {/* ─── Right Column ─── */}
          <div className="w-full lg:w-[340px] flex flex-col gap-6">
            <ProfileCompletionCard />
            <ProTipCard />
            <QuickStatsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
