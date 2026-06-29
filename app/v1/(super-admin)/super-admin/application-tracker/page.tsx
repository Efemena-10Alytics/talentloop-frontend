"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";

const AppTrackerNavIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#0C6746"/>
    <path d="M16.3086 13.4004H20.6836" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3164 13.4004L11.9414 14.0254L13.8164 12.1504" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.3086 19.2334H20.6836" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3164 19.2334L11.9414 19.8584L13.8164 17.9834" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.4974 24.3327H18.4974C22.6641 24.3327 24.3307 22.666 24.3307 18.4993V13.4993C24.3307 9.33268 22.6641 7.66602 18.4974 7.66602H13.4974C9.33073 7.66602 7.66406 9.33268 7.66406 13.4993V18.4993C7.66406 22.666 9.33073 24.3327 13.4974 24.3327Z" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v10M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12ZM14 14l-2-2" stroke="#657997" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

type InterviewStatus = "Interview" | "2nd Interview";

interface InterviewRow {
  client: string;
  company: string;
  role: string;
  location: string;
  status: InterviewStatus;
  cvUsed: string;
  date: string;
  manager: string;
}

const statusConfig: Record<InterviewStatus, { color: string; bg: string }> = {
  "Interview":     { color: "#0088FF", bg: "rgba(0,136,255,0.15)"  },
  "2nd Interview": { color: "#CB30E0", bg: "rgba(203,48,224,0.15)" },
};

const mockRows: InterviewRow[] = [
  { client: "Adaeze Nwosu",    company: "Barclays",   role: "Data Analyst",      location: "Remote", status: "Interview",     cvUsed: "CV_v3_Optimized", date: "14 May, 26", manager: "Happiness A. Ibrahim"      },
  { client: "Taiwo Kolade",    company: "Accenture",  role: "PM Consultant",     location: "Remote", status: "2nd Interview", cvUsed: "CV_v3",           date: "14 May, 26", manager: "Oluwaseun G. Owola"        },
  { client: "Priya Mehta",     company: "BT Group",   role: "Cyber Analyst",     location: "Remote", status: "Interview",     cvUsed: "CV_v3",           date: "14 May, 26", manager: "Ayotomide Ilesanmi"        },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "Interview",     cvUsed: "CV_v3",           date: "14 May, 26", manager: "Mofesolamisi Elusak"       },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "Interview",     cvUsed: "CV_v3_Optimized", date: "14 May, 26", manager: "Kareemah O. Alli-Ka"       },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "2nd Interview", cvUsed: "CV_v3",           date: "14 May, 26", manager: "Kareemah O. Alli-Ka"       },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "Interview",     cvUsed: "CV_v3_Optimized", date: "14 May, 26", manager: "Ayotomide Ilesanmi"        },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "Interview",     cvUsed: "CV_v3",           date: "14 May, 26", manager: "Happiness A. Ibrahim"      },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "2nd Interview", cvUsed: "CV_v3_Optimized", date: "14 May, 26", manager: "Ayotomide Ilesanmi"        },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "Interview",     cvUsed: "CV_v3",           date: "14 May, 26", manager: "Oluwaseun G. Owola"        },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "Interview",     cvUsed: "CV_v3",           date: "14 May, 26", manager: "Oluwaseun G. Owola"        },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "Interview",     cvUsed: "CV_v3",           date: "14 May, 26", manager: "Happiness A. Ibrahim"      },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "Interview",     cvUsed: "CV_v3",           date: "14 May, 26", manager: "Kareemah O. Alli-Ka"       },
  { client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Remote", status: "2nd Interview", cvUsed: "CV_v3_Optimized", date: "14 May, 26", manager: "Mofesolamisi Elusak"       },
];

const PAGE_SIZE = 12;

export default function ApplicationTrackerPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [managerFilter, setManagerFilter] = useState("Filter By Manager");
  const [clientFilter, setClientFilter] = useState("Premium Clients");
  const [periodFilter, setPeriodFilter] = useState("Today");

  const filtered = mockRows.filter((r) => {
    const matchSearch =
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.company.toLowerCase().includes(search.toLowerCase()) ||
      r.role.toLowerCase().includes(search.toLowerCase());
    const matchManager =
      managerFilter === "Filter By Manager" ||
      r.manager.toLowerCase().includes(managerFilter.toLowerCase());
    return matchSearch && matchManager;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar pageTitle="Application Tracker" pageIcon={<AppTrackerNavIcon />} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="ACTIVE CLIENTS"     value="48"  trend={{ value: "+1", isPositive: true }} />
        <StatCard title="APPLICATIONS MADE"  value="670" trend={{ value: "+1", isPositive: true }} />
        <StatCard title="INTERVIEWS SECURED" value="65"  trend={{ value: "+1", isPositive: true }} />
        <StatCard title="ASSESSMENTS SECURED" value="25" trend={{ value: "+1", isPositive: true }} />
      </div>

      {/* Table card */}
      <div className="rounded-2xl p-5" style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}>
        {/* Section title + toolbar */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <h2 className="text-white font-mona-sans font-semibold text-base 2xl:text-lg flex-shrink-0">
            Interviews Secured
          </h2>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl min-w-[160px]"
              style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #FFFFFF1A" }}
            >
              <SearchIcon />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="bg-transparent outline-none font-mona-sans text-[10px] 2xl:text-sm w-full"
                style={{ color: "#E8EFF1" }}
              />
            </div>

            {/* Filter By Manager */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #FFFFFF1A" }}
            >
              <select
                value={managerFilter}
                onChange={(e) => { setManagerFilter(e.target.value); setPage(1); }}
                className="bg-transparent outline-none font-mona-sans text-[10px] 2xl:text-sm cursor-pointer w-[120px] 2xl:w-full"
                style={{ color: "#95ACCB" }}
              >
                <option value="Filter By Manager">Filter By Manager</option>
                <option value="Happiness">Happiness A. Ibrahim</option>
                <option value="Oluwaseun">Oluwaseun G. Owola</option>
                <option value="Ayotomide">Ayotomide Ilesanmi</option>
                <option value="Mofesolamisi">Mofesolamisi Elusak</option>
                <option value="Kareemah">Kareemah O. Alli-Ka</option>
              </select>
            </div>

            {/* Premium Clients */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #FFFFFF1A" }}
            >
              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="bg-transparent outline-none font-mona-sans text-[10px] 2xl:text-sm cursor-pointer w-[120px] 2xl:w-full"
                style={{ color: "#95ACCB" }}
              >
                <option>Premium Clients</option>
                <option>Basic Clients</option>
                <option>Comprehensive Clients</option>
                <option>Platinum Clients</option>
                <option>All Clients</option>
              </select>
            </div>

            {/* Period */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #FFFFFF1A" }}
            >
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="bg-transparent outline-none font-mona-sans text-[10px] 2xl:text-sm cursor-pointer w-[120px] 2xl:w-full"
                style={{ color: "#95ACCB" }}
              >
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            {/* Export */}
            <button
              className="flex items-center gap-2 font-mona-sans font-semibold text-[12px] 2xl:text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-90"
              style={{ background: "#A2CE3A", color: "#0B0D0F" }}
            >
              Export <ExportIcon />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
                {["Client","Company","Role","Location","Status","CV Used","Date","Manager"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-4 font-mona-sans font-bold text-sm" style={{ color: "#E8EFF1" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((row, i) => {
                const st = statusConfig[row.status];
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #FFFFFF06" }}>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#E8EFF1" }}>{row.client}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.company}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.role}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.location}</td>
                    <td className="py-3 pr-4">
                      <span
                        className="font-mona-sans text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ color: st.color, background: st.bg }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.cvUsed}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.date}</td>
                    <td className="py-3 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.manager}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
            style={{ background: "rgba(255,255,255,0.08)", color: "#95ACCB" }}
          >
            <ChevronLeft />
          </button>
          {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-mona-sans text-sm font-semibold"
              style={{ background: page === n ? "#A2CE3A" : "rgba(255,255,255,0.08)", color: page === n ? "#0B0D0F" : "#95ACCB" }}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
            style={{ background: "rgba(255,255,255,0.08)", color: "#95ACCB" }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}