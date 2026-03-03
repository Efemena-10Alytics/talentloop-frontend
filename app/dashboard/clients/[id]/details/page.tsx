"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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

const SearchSVG = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
      stroke="#D0D5DD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarSVG = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.6 0.5V3.3M4 0.5V3.3M13.1 7.5C13.1 4.8603 13.1 3.5401 12.2796 2.7204C11.4592 1.9007 10.1397 1.9 7.5 1.9H6.1C3.4603 1.9 2.1401 1.9 1.3204 2.7204C0.5007 3.5408 0.5 4.8603 0.5 7.5V8.9C0.5 11.5397 0.5 12.8599 1.3204 13.6796C2.1408 14.4993 3.4603 14.5 6.1 14.5M0.5 6.1H13.1"
      stroke="#0B0D0F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.1869 12.1906L10.3 11.6999V10.4868M13.1 11.6999C13.1 12.4425 12.805 13.1547 12.2799 13.6798C11.7548 14.2049 11.0426 14.4999 10.3 14.4999C9.55739 14.4999 8.8452 14.2049 8.3201 13.6798C7.795 13.1547 7.5 12.4425 7.5 11.6999C7.5 10.9573 7.795 10.2451 8.3201 9.72C8.8452 9.1949 9.55739 8.8999 10.3 8.8999C11.0426 8.8999 11.7548 9.1949 12.2799 9.72C12.805 10.2451 13.1 10.9573 13.1 11.6999Z"
      stroke="#0B0D0F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Data ─── */

const clientsData: any = {
  "1": {
    id: 1,
    name: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    role: "Project Manager",
    specialty: "Technology",
    sessions: 5,
    progress: 85,
    lastSession: "02/11/2026",
  },
  "2": {
    id: 2,
    name: "Sarah Williams",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    role: "Software Engineer",
    specialty: "Technology",
    sessions: 4,
    progress: 85,
    lastSession: "02/11/2026",
  },
  "3": {
    id: 3,
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    role: "Product Designer",
    specialty: "Design",
    sessions: 4,
    progress: 85,
    lastSession: "02/11/2026",
  },
};

const coachNotes = [
  {
    date: "Jan 16, 2026",
    note: "Great improvement in behavioral answers. Needs work on system design communication.",
  },
  {
    date: "Jan 16, 2026",
    note: "Practiced STAR method - much more structured responses now.",
  },
  {
    date: "Jan 16, 2026",
    note: "Initial assessment: Strong technical skills, needs confidence in leadership questions.",
  },
  {
    date: "Jan 16, 2026",
    note: "Practiced STAR method - much more structured responses now.",
  },
  {
    date: "Jan 16, 2026",
    note: "Great improvement in behavioral answers. Needs work on system design communication.",
  },
  {
    date: "Jan 16, 2026",
    note: "Initial assessment: Strong technical skills, needs confidence in leadership questions.",
  },
];

/* ─── Components ─── */

function ClientDetailsContent() {
  const params = useParams();
  const clientId = params.id as string;
  const client = clientsData[clientId] || clientsData["1"];

  return (
    <div className="bg-[#141619] min-h-screen -m-6 lg:-m-8 p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-[#0B0D0F] flex flex-col gap-6 lg:gap-20 rounded-[16px] p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/clients"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <BackArrowSVG />
            </Link>
            <h1 className="text-white font-mona-sans font-bold text-3xl">
              {client.name}
            </h1>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchSVG />
            </div>
            <input
              type="text"
              placeholder="Search clients"
              className="w-[280px] h-12 bg-transparent border border-[#37393B] rounded-[10px] pl-12 pr-4 text-white placeholder:text-[#A9B4C4] font-mona-sans text-sm focus:outline-none focus:border-[#A2CE3A]/50 transition-colors"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-6 bg-[#161719] p-2 rounded-[16px]">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Client Info */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-[#0B0D0F] rounded-[16px] p-6">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#A2CE3A]">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name and Role */}
              <div className="text-center mb-6">
                <h2 className="text-white font-mona-sans font-bold text-xl mb-1">
                  {client.name}
                </h2>
                <p className="text-[#A9B4C4] font-mona-sans text-sm mb-1">
                  {client.role} • {client.specialty}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-white font-mona-sans text-sm">
                    Sessions
                  </span>
                  <span className="text-white font-mona-sans font-semibold text-sm">
                    {client.sessions}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-mona-sans text-sm">
                    Progress
                  </span>
                  <span className="text-white font-mona-sans font-semibold text-sm">
                    {client.progress}%
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A2CE3A] rounded-full"
                    style={{ width: `${client.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mona-sans">
                  <span className="text-[#A9B4C4]">Last Session</span>
                  <span className="text-[#A9B4C4]">{client.lastSession}</span>
                </div>
              </div>

              {/* Schedule Button */}
              <Link
                href={`/dashboard/clients/${client.id}/details/schedule`}
                className="w-full h-12 bg-[#A2CE3A] hover:bg-[#8fb832] text-black font-mona-sans font-semibold text-sm rounded-[10px] transition-colors flex items-center justify-center gap-2"
              >
                <CalendarSVG />
                Schedule
              </Link>
            </div>
          </div>

          {/* Right Column - Performance & Notes */}
          <div className="w-full lg:w-[65%] space-y-6">
            {/* Performance Over Time */}
            <div className="bg-[#0B0D0F] rounded-[16px] p-6">
              <h3 className="text-white font-mona-sans font-bold text-lg mb-6">
                Performance Over Time
              </h3>
              <div className="bg-[#14141C] rounded-[12px] h-[300px] flex items-center justify-center">
                <p className="text-[#A9B4C4] font-mona-sans text-sm">
                  Add Chart
                </p>
              </div>
            </div>
          </div>
        </div>

 {/* Coach's Notes */}
        <div className="bg-[#0B0D0F] rounded-[16px] p-4 lg:p-6 w-full">
          <h3 className="text-white font-mona-sans font-bold text-lg mb-6">
            Coach's Note
          </h3>
          <div className="space-y-6">
            {coachNotes.map((note, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-1 bg-[#A2CE3A] rounded-full flex-shrink-0" />
                <div className="">
                  <p className="text-[#A9B4C4] font-mona-sans text-sm mb-1">
                    {note.date}
                  </p>
                  <p className="text-white font-mona-sans text-base">
                    {note.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientDetailsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ClientDetailsContent />
    </Suspense>
  );
}
