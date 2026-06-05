"use client";

import Link from "next/link";

interface Client {
  initials: string;
  initialsColor: string;
  name: string;
  details: string;
  status: string;
  statusColor: string;
  statusBg: string;
  dueInfo: string;
}

const mockClients: Client[] = [
  {
    initials: "AN",
    initialsColor: "#A2CE3A",
    name: "Adaeze Nwosu",
    details: "Data Analytics · Premium · CV in progress",
    status: "CV Review",
    statusColor: "#FF6B6B",
    statusBg: "rgba(255, 107, 107, 0.1)",
    dueInfo: "Due Thu",
  },
  {
    initials: "TK",
    initialsColor: "#9B59B6",
    name: "Taiwo Kolade",
    details: "IT Project Mgmt · Comprehensive · Applications active",
    status: "Applying",
    statusColor: "#A2CE3A",
    statusBg: "rgba(162, 206, 58, 0.1)",
    dueInfo: "5 apps this week",
  },
  {
    initials: "PM",
    initialsColor: "#3498DB",
    name: "Priya Mehta",
    details: "Cybersecurity · Platinum · Sponsorship hunt",
    status: "Sponsorship",
    statusColor: "#FF9500",
    statusBg: "rgba(255, 149, 0, 0.1)",
    dueInfo: "In progress",
  },
  {
    initials: "OA",
    initialsColor: "#F1C40F",
    name: "Olumide Adeyemi",
    details: "Financial Crime · Basic · Awaiting CV upload",
    status: "CV Review",
    statusColor: "#FF6B6B",
    statusBg: "rgba(255, 107, 107, 0.1)",
    dueInfo: "Due Thu",
  },
];

export default function ClientWorkload() {
  return (
    <div
      className="rounded-2xl p-5 h-full"
     style={{
              background: "#1563741A",
              border: "0.5px solid #FFFFFF1A",
            }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-white font-mona-sans font-semibold text-base">
            Client Workload
          </h2>
          <span className="text-[#95ACCB] text-sm font-mona-sans">3</span>
        </div>
        <Link
          href="/v1/manager/clients"
          className="text-[#95ACCB] text-xs font-mona-sans hover:text-white transition-colors flex items-center gap-1"
        >
          View all →
        </Link>
      </div>

      {/* Client List */}
      <div className="space-y-3">
        {mockClients.map((client, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl"
              style={{
              background: "#1563741A",
              border: "1px solid #FFFFFF1A",
            }}
          >
            {/* Left: Avatar + Info */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: client.initialsColor }}
              >
                <span className="text-white text-xs font-mona-sans font-semibold">
                  {client.initials}
                </span>
              </div>
              <div>
                <p className="text-white font-mona-sans font-medium text-sm">
                  {client.name}
                </p>
                <p className="text-[#657997] font-mona-sans text-xs">
                  {client.details}
                </p>
              </div>
            </div>

            {/* Right: Status + Due */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mona-sans font-medium px-3 py-1 rounded-full"
                style={{
                  color: client.statusColor,
                  background: client.statusBg,
                  border: `1px solid ${client.statusColor}33`,
                }}
              >
                {client.status}
              </span>
              <span className="text-[#95ACCB] text-xs font-mona-sans whitespace-nowrap">
                {client.dueInfo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
