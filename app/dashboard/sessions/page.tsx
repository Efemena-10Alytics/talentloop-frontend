"use client";

import { Suspense, useState } from "react";
import Link from "next/link";

/* ─── SVG Icons ─── */

const PlusSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.66667 2V4.66667M11.3333 2V4.66667M2 7.33333H14M3.33333 3.33333H12.6667C13.403 3.33333 14 3.93029 14 4.66667V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V4.66667C2 3.93029 2.59695 3.33333 3.33333 3.33333Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1667 2.49993C14.3856 2.28106 14.6454 2.10744 14.9314 1.98899C15.2173 1.87054 15.5238 1.80957 15.8334 1.80957C16.1429 1.80957 16.4494 1.87054 16.7353 1.98899C17.0213 2.10744 17.2811 2.28106 17.5 2.49993C17.7189 2.7188 17.8925 2.97863 18.011 3.2646C18.1294 3.55057 18.1904 3.85706 18.1904 4.16659C18.1904 4.47612 18.1294 4.78262 18.011 5.06859C17.8925 5.35455 17.7189 5.61439 17.5 5.83326L6.25004 17.0833L1.66671 18.3333L2.91671 13.7499L14.1667 2.49993Z" stroke="#A2CE3A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeleteSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5H4.16667H17.5" stroke="#FF4444" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.8333 4.99984V16.6665C15.8333 17.1085 15.6577 17.5325 15.3452 17.845C15.0326 18.1576 14.6087 18.3332 14.1667 18.3332H5.83333C5.39131 18.3332 4.96738 18.1576 4.65482 17.845C4.34226 17.5325 4.16667 17.1085 4.16667 16.6665V4.99984M6.66667 4.99984V3.33317C6.66667 2.89114 6.84226 2.46722 7.15482 2.15466C7.46738 1.8421 7.89131 1.6665 8.33333 1.6665H11.6667C12.1087 1.6665 12.5326 1.8421 12.8452 2.15466C13.1577 2.46722 13.3333 2.89114 13.3333 3.33317V4.99984" stroke="#FF4444" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlaySVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33337 2.66667L12.6667 8L3.33337 13.3333V2.66667Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CancelSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ─── */

const upcomingSessions = [
  { id: 1, name: "Alex Johnson", avatar: "/human-coach.svg", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 2, name: "Maria James", avatar: "/human-coach.svg", date: "Jan 16, 2026", time: "4:00 PM", badge: "Behavioral", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 3, name: "Alex Johnson", avatar: "/human-coach.svg", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 4, name: "Alex Johnson", avatar: "/human-coach.svg", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 5, name: "Alex Johnson", avatar: "/human-coach.svg", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
];

const completedSessions = [
  { id: 1, name: "Alex Johnson", avatar: "/human-coach.svg", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 2, name: "Alex Johnson", avatar: "/human-coach.svg", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
  { id: 3, name: "Alex Johnson", avatar: "/human-coach.svg", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
];

const cancelledSessions = [
  { id: 1, name: "Alex Johnson", avatar: "/human-coach.svg", date: "Jan 16, 2026", time: "3:00 PM", badge: "Technical", badgeColor: "bg-[#A2CE3A]/15 text-[#A2CE3A]" },
];

/* ─── Components ─── */

function SessionCard({ session, type }: { session: any; type: 'upcoming' | 'completed' | 'cancelled' }) {
  return (
    <div className="bg-[#161719] border border-white/10 rounded-[16px] p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#A2CE3A]">
          <img src={session.avatar} alt={session.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-white font-mona-sans font-bold text-base">{session.name}</h3>
          <div className="flex items-center gap-2 mt-1 text-white/50 text-xs font-mona-sans">
            <CalendarSVG />
            <span>{session.date} {session.time}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1.5 rounded-full text-xs font-mona-sans font-medium ${session.badgeColor}`}>
          {session.badge}
        </span>
        
        {type === 'upcoming' && (
          <>
            <button className="px-6 py-2 bg-[#A2CE3A] hover:bg-[#8fb832] text-black font-mona-sans font-semibold text-sm rounded-[8px] transition-colors">
              Join
            </button>
            <button className="p-2 hover:bg-white/5 rounded-[8px] transition-colors">
              <EditSVG />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-[8px] transition-colors">
              <DeleteSVG />
            </button>
          </>
        )}
        
        {type === 'completed' && (
          <button className="px-4 py-2 bg-white hover:bg-white/90 text-black font-mona-sans font-semibold text-sm rounded-[8px] transition-colors flex items-center gap-2">
            <PlaySVG />
            Watch Replay
          </button>
        )}
        
        {type === 'cancelled' && (
          <span className="px-4 py-2 bg-[#FF4444]/10 text-[#FF4444] font-mona-sans font-semibold text-sm rounded-[8px] flex items-center gap-2">
            <CancelSVG />
            Cancelled
          </span>
        )}
      </div>
    </div>
  );
}

function SessionsContent() {
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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white font-mona-sans font-bold text-3xl">Sessions</h1>
        <button className="px-5 py-3 bg-[#A2CE3A]/15 hover:bg-[#A2CE3A]/25 text-[#A2CE3A] font-mona-sans font-semibold text-sm rounded-[12px] transition-colors flex items-center gap-2">
          <PlusSVG />
          Schedule New Session
        </button>
      </div>
      
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
  );
}

export default function SessionsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <SessionsContent />
    </Suspense>
  );
}
