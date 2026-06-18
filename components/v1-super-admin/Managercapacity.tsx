"use client";

import Link from "next/link";

interface Manager {
  name: string;
  role: string;
  clients: number;
  capacityPercent: number;
  barColor: string;
  avatarBg: string;
}

const managers: Manager[] = [
  { name: "Happiness Abiye Ibrahim",          role: "Team Lead Employability Associate", clients: 6, capacityPercent: 90, barColor: "#A2CE3A", avatarBg: "#C0392B" },
  { name: "Oluwaseun Gabby Owolabi",          role: "Employability Associate",           clients: 4, capacityPercent: 55, barColor: "#FF9500", avatarBg: "#8E44AD" },
  { name: "Kareemah Oyinkansola Alli-Kamal",  role: "Employability Associate",           clients: 7, capacityPercent: 92, barColor: "#A2CE3A", avatarBg: "#27AE60" },
  { name: "Karimat Adesina",                  role: "Employability Associate",           clients: 5, capacityPercent: 52, barColor: "#FF9500", avatarBg: "#E67E22" },
  { name: "Ayotomide Ilesanmi",               role: "Employability Associate",           clients: 8, capacityPercent: 98, barColor: "#A2CE3A", avatarBg: "#2980B9" },
  { name: "Mofesolamisi Elusakin",            role: "Employability Associate",           clients: 6, capacityPercent: 82, barColor: "#A2CE3A", avatarBg: "#16A085" },
  { name: "Happiness Abiye Ibrahim",          role: "Team Lead Employability Associate", clients: 6, capacityPercent: 90, barColor: "#A2CE3A", avatarBg: "#C0392B" },
];

export default function ManagerCapacity() {
  return (
    <div
      className="rounded-2xl p-5 h-full"
      style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-mona-sans font-semibold text-base">
          Manager Capacity
        </h2>
        <Link
          href="/v1/super-admin/managers"
          className="font-mona-sans text-xs text-white hover:text-[#95ACCB] transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* Manager list */}
      <div className="space-y-5">
        {managers.map((mgr, i) => {
          // Derive initials from name
          const initials = mgr.name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("");

          return (
            <div key={i} className="flex items-start gap-3 bg-[#1563741A] rounded-[10px] p-[10px] border border-[#FFFFFF1A]">
              {/* Avatar + badge */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mona-sans font-bold text-sm text-white"
                  style={{ background: mgr.avatarBg }}
                >
                  {initials}
                </div>
                {/* Client count badge */}
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-mona-sans font-bold"
                  style={{ background: "#A2CE3A", color: "#0B0D0F", fontSize: "9px" }}
                >
                  {mgr.clients}
                </div>
              </div>

              {/* Name, role, bar */}
              <div className="flex-1 min-w-0">
                <p
                  className="font-mona-sans font-medium text-sm truncate"
                  style={{ color: "#E8EFF1" }}
                >
                  {mgr.name}
                </p>
                <p
                  className="font-mona-sans text-xs mb-2"
                  style={{ color: "#657997" }}
                >
                  {mgr.role}
                </p>
                <div
                  className="rounded-full overflow-hidden"
                  style={{ height: "6px", background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${mgr.capacityPercent}%`,
                      background: mgr.barColor,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}