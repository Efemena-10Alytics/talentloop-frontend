"use client";

import Link from "next/link";
import { Suspense, useState } from "react";

/* ─── SVG Icons ─── */

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
      stroke="#A9B4C4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.1869 12.1906L10.3 11.6999V10.4868M13.1 11.6999C13.1 12.4425 12.805 13.1547 12.2799 13.6798C11.7548 14.2049 11.0426 14.4999 10.3 14.4999C9.55739 14.4999 8.8452 14.2049 8.3201 13.6798C7.795 13.1547 7.5 12.4425 7.5 11.6999C7.5 10.9573 7.795 10.2451 8.3201 9.72C8.8452 9.1949 9.55739 8.8999 10.3 8.8999C11.0426 8.8999 11.7548 9.1949 12.2799 9.72C12.805 10.2451 13.1 10.9573 13.1 11.6999Z"
      stroke="#A9B4C4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProfileSearchSVG = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIconSVG = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.6 0.5V3.3M4 0.5V3.3M13.1 7.5C13.1 4.8603 13.1 3.5401 12.2796 2.7204C11.4592 1.9007 10.1397 1.9 7.5 1.9H6.1C3.4603 1.9 2.1401 1.9 1.3204 2.7204C0.5007 3.5408 0.5 4.8603 0.5 7.5V8.9C0.5 11.5397 0.5 12.8599 1.3204 13.6796C2.1408 14.4993 3.4603 14.5 6.1 14.5M0.5 6.1H13.1"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.1869 12.1906L10.3 11.6999V10.4868M13.1 11.6999C13.1 12.4425 12.805 13.1547 12.2799 13.6798C11.7548 14.2049 11.0426 14.4999 10.3 14.4999C9.55739 14.4999 8.8452 14.2049 8.3201 13.6798C7.795 13.1547 7.5 12.4425 7.5 11.6999C7.5 10.9573 7.795 10.2451 8.3201 9.72C8.8452 9.1949 9.55739 8.8999 10.3 8.8999C11.0426 8.8999 11.7548 9.1949 12.2799 9.72C12.805 10.2451 13.1 10.9573 13.1 11.6999Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Data ─── */

const clients = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    date: "Jan 16, 2026",
    time: "3:00 PM",
    sessions: 4,
    lastSession: "02/11/2026",
    progress: 85,
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    date: "Jan 16, 2026",
    time: "3:00 PM",
    sessions: 4,
    lastSession: "02/11/2026",
    progress: 85,
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    date: "Jan 16, 2026",
    time: "3:00 PM",
    sessions: 4,
    lastSession: "02/11/2026",
    progress: 85,
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    date: "Jan 16, 2026",
    time: "3:00 PM",
    sessions: 4,
    lastSession: "02/11/2026",
    progress: 85,
  },
  {
    id: 5,
    name: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    date: "Jan 16, 2026",
    time: "3:00 PM",
    sessions: 4,
    lastSession: "02/11/2026",
    progress: 85,
  },
  {
    id: 6,
    name: "Lisa Anderson",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    date: "Jan 16, 2026",
    time: "3:00 PM",
    sessions: 4,
    lastSession: "02/11/2026",
    progress: 85,
  },
  {
    id: 7,
    name: "David Martinez",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    date: "Jan 16, 2026",
    time: "3:00 PM",
    sessions: 4,
    lastSession: "02/11/2026",
    progress: 85,
  },
  {
    id: 8,
    name: "Jessica Taylor",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    date: "Jan 16, 2026",
    time: "3:00 PM",
    sessions: 4,
    lastSession: "02/11/2026",
    progress: 85,
  },
  {
    id: 9,
    name: "Robert Brown",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    date: "Jan 16, 2026",
    time: "3:00 PM",
    sessions: 4,
    lastSession: "02/11/2026",
    progress: 85,
  },
];

/* ─── Components ─── */

function ClientCard({ client }: { client: any }) {
  return (
    <div className="bg-[#0B0D0F] border border-white/10 rounded-[16px] p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#A2CE3A]">
          <img
            src={client.avatar}
            alt={client.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-mona-sans font-bold text-base">
            {client.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-[#A9B4C4] text-xs font-mona-sans">
            <CalendarSVG />
            <span>
              {client.date} {client.time}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-mona-sans text-sm">Progress</span>
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
      </div>

      {/* Sessions Info */}
      <div className="flex items-center justify-between mb-4 text-xs font-mona-sans">
        <span className="text-[#A2CE3A]">{client.sessions} Sessions</span>
        <span className="text-[#A9B4C4]">Last: {client.lastSession}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Link
          href={`/dashboard/clients/${client.id}/details`}
          className="flex-1 h-10 bg-transparent border border-white/20 hover:border-white/40 text-white font-mona-sans font-medium text-sm rounded-[8px] transition-colors flex items-center justify-center gap-2"
        >
          <ProfileSearchSVG />
          Profile
        </Link>
        <button className="h-10 w-10 bg-transparent border border-white/20 hover:border-white/40 text-white rounded-[8px] transition-colors flex items-center justify-center">
          <CalendarIconSVG />
        </button>
      </div>
    </div>
  );
}

function ClientsContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-[#141619] min-h-screen -m-6 lg:-m-8 p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-[#0B0D0F] flex flex-col gap-6 rounded-[16px] p-6 mb-6">
        <div className="flex items-center justify-between lg:px-4">
          <h1 className="text-white font-mona-sans font-bold text-3xl">
            Clients
          </h1>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchSVG />
            </div>
            <input
              type="text"
              placeholder="Search clients"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[280px] h-12 bg-transparent border border-[#37393B] rounded-[10px] pl-12 pr-4 text-white placeholder:text-[#A9B4C4] font-mona-sans text-sm focus:outline-none focus:border-[#A2CE3A]/50 transition-colors"
            />
          </div>
        </div>

        {/* Clients Grid Section */}
        <div className="bg-[#161719] rounded-[16px] p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#A9B4C4] font-mona-sans">No clients found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClientsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ClientsContent />
    </Suspense>
  );
}
