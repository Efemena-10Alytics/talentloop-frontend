"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SessionCard, type Session } from "@/components/sessions/SessionCard";

/* ─── SVG Icons ─── */

const BackArrowSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 5L7.5 10L12.5 15"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ─── */

const upcomingSessions: Session[] = [
  { id: 1, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 2, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 3, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 4, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
];

const completedSessions: Session[] = [
  { id: 1, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 2, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 3, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
];

const cancelledSessions: Session[] = [
  { id: 1, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
];

/* ─── Components ─── */

function ScheduleContent() {
  const params = useParams();
  const clientId = params.id as string;
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  
  const tabs = [
    { id: 'upcoming' as const, label: 'Upcoming', count: upcomingSessions.length },
    { id: 'completed' as const, label: 'Completed', count: completedSessions.length },
    { id: 'cancelled' as const, label: 'Cancelled', count: cancelledSessions.length },
  ];
  
  const getCurrentSessions = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingSessions;
      case 'completed':
        return completedSessions;
      case 'cancelled':
        return cancelledSessions;
    }
  };
  
  return (
    <div className="bg-[#141619] min-h-screen -m-6 lg:-m-8 p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-[#0B0D0F] flex flex-col gap-6 rounded-[16px] p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/clients/${clientId}/details`}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <BackArrowSVG />
            </Link>
            <h1 className="text-white font-mona-sans font-bold text-3xl">Sessions</h1>
          </div>
          <button className="px-5 py-3 bg-[#A2CE3A]/15 hover:bg-[#A2CE3A]/25 text-[#A2CE3A] font-mona-sans font-semibold text-sm rounded-[12px] transition-colors flex items-center gap-2">
            <PlusSVG />
            Schedule New Session
          </button>
        </div>
        
        {/* Sessions Content */}
        <div className="bg-[#161719] rounded-[16px] p-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-[10px] font-mona-sans font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#A2CE3A] text-black'
                    : 'bg-[#1E1F21] text-white/70 hover:bg-[#252628] hover:text-white'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          
          {/* Session Cards */}
          <div className="space-y-3">
            {getCurrentSessions().map((session) => (
              <SessionCard key={session.id} session={session} type={activeTab} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ScheduleContent />
    </Suspense>
  );
}
