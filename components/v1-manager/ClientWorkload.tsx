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

const mockClients: Client[] = [];
const _allClients: Client[] = [
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

const ClientWorkloadEmptyIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="40" fill="#A2CE3A" fillOpacity="0.24"/>
    <path d="M53.459 57.2969H58.3134C58.7404 57.3036 59.1626 57.207 59.5441 57.0154C59.9255 56.8238 60.2548 56.5429 60.5038 56.1967C60.7528 55.8505 60.9141 55.4492 60.9739 55.0273C61.0337 54.6053 60.9903 54.1752 60.8473 53.7736C59.6095 51.1298 57.6499 48.8877 55.1932 47.3047C52.7366 45.7216 49.8825 44.8618 46.9585 44.8238M46.9585 38.5726C48.0512 38.5729 49.1332 38.3583 50.1428 37.9413C51.1524 37.5242 52.0698 36.9127 52.8425 36.1418C53.6153 35.3709 54.2283 34.4556 54.6465 33.4482C55.0647 32.4409 55.28 31.3612 55.28 30.2708C55.2829 29.1785 55.0699 28.0963 54.653 27.0863C54.2361 26.0763 53.6236 25.1584 52.8506 24.385C52.0775 23.6117 51.1591 22.9982 50.1481 22.5797C49.137 22.1613 48.0531 21.946 46.9585 21.9463M33.9598 38.8331C36.4613 38.8271 38.8583 37.8311 40.6248 36.0636C42.3913 34.2961 43.3831 31.9015 43.3824 29.4052C43.3824 26.9108 42.3895 24.5186 40.622 22.7547C38.8544 20.9909 36.4572 20 33.9575 20C31.4579 20 29.0606 20.9909 27.2931 22.7547C25.5256 24.5186 24.5326 26.9108 24.5326 29.4052C24.5326 31.9015 25.5249 34.2959 27.2919 36.063C29.0588 37.83 31.456 38.8255 33.9575 38.8309M44.5972 60C45.3969 59.9989 46.1808 59.7769 46.8619 59.3586C47.543 58.9403 48.0948 58.342 48.4561 57.63C48.8174 56.9181 48.9742 56.1201 48.909 55.3247C48.8439 54.5293 48.5594 53.7674 48.087 53.1234C46.432 50.9312 44.3015 49.141 41.855 47.887C39.4085 46.6329 36.7094 45.9475 33.9598 45.882C31.21 45.9477 28.5108 46.6335 26.0642 47.888C23.6177 49.1424 21.4873 50.933 19.8326 53.1256C19.3619 53.7697 19.0786 54.531 19.0141 55.3256C18.9497 56.1202 19.1065 56.9171 19.4673 57.6283C19.8282 58.3396 20.3789 58.9374 21.0588 59.356C21.7387 59.7745 22.5213 59.9974 23.3202 60H44.5972Z" stroke="#1E2124" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

      {/* Client List or Empty State */}
      {mockClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-4">
          <ClientWorkloadEmptyIcon />
          <p className="text-[#95ACCB] font-mona-sans text-sm text-center">
            You&apos;ve not been assigned<br />any client yet
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
