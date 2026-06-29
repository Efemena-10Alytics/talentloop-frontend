"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";

const ManagersNavIcon = () => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="33" height="32" rx="8" fill="#0C6746"/>
    <path d="M25.1851 13.7088C24.9815 13.7425 24.7998 13.8548 24.6799 14.021C24.56 14.1872 24.5118 14.3937 24.5459 14.5951C24.6249 15.0619 24.6646 15.5344 24.6646 16.0077C24.6664 18.0806 23.8961 20.0816 22.5008 21.6284C21.6327 20.3842 20.4121 19.4217 18.9924 18.8618C19.755 18.2677 20.3115 17.4534 20.5844 16.532C20.8574 15.6107 20.8333 14.6281 20.5154 13.7209C20.1976 12.8137 19.6018 12.027 18.811 11.4703C18.0202 10.9135 17.0736 10.6143 16.1028 10.6143C15.1321 10.6143 14.1855 10.9135 13.3947 11.4703C12.6038 12.027 12.0081 12.8137 11.6902 13.7209C11.3724 14.6281 11.3483 15.6107 11.6212 16.532C11.8942 17.4534 12.4507 18.2677 13.2133 18.8618C11.7936 19.4217 10.573 20.3842 9.7049 21.6284C8.61009 20.4082 7.89494 18.9011 7.64546 17.2885C7.39597 15.6759 7.62277 14.0263 8.29857 12.5382C8.97438 11.05 10.0704 9.78659 11.4549 8.89984C12.8394 8.01309 14.4534 7.54077 16.1028 7.53966C16.5814 7.53958 17.0591 7.57885 17.5311 7.65705C17.7338 7.68868 17.9409 7.63988 18.1073 7.52127C18.2738 7.40265 18.3862 7.22382 18.4201 7.02366C18.4539 6.82351 18.4065 6.61824 18.2881 6.45248C18.1697 6.28673 17.99 6.17392 17.7879 6.13858C15.6742 5.78688 13.5022 6.10869 11.5854 7.05753C9.66864 8.00637 8.10635 9.53316 7.12411 11.4174C6.14187 13.3017 5.7905 15.446 6.12073 17.5407C6.45096 19.6353 7.4457 21.572 8.96134 23.0711C10.477 24.5701 12.4351 25.554 14.5529 25.8806C16.6708 26.2072 18.8387 25.8597 20.7439 24.8882C22.649 23.9167 24.1927 22.3715 25.152 20.4757C26.1114 18.5799 26.4367 16.4316 26.0811 14.341C26.0471 14.1397 25.9335 13.9599 25.7655 13.8414C25.5974 13.7228 25.3887 13.6751 25.1851 13.7088ZM12.9895 15.2379C12.9895 14.6289 13.1721 14.0335 13.5142 13.5271C13.8563 13.0207 14.3425 12.626 14.9114 12.393C15.4803 12.1599 16.1063 12.0989 16.7102 12.2178C17.3142 12.3366 17.8689 12.6298 18.3043 13.0605C18.7397 13.4911 19.0362 14.0398 19.1564 14.6371C19.2765 15.2345 19.2148 15.8536 18.9792 16.4163C18.7436 16.9789 18.3445 17.4599 17.8325 17.7982C17.3205 18.1366 16.7186 18.3172 16.1028 18.3172C15.2771 18.3172 14.4852 17.9927 13.9014 17.4153C13.3175 16.8378 12.9895 16.0546 12.9895 15.2379ZM10.8568 22.6955C11.4199 21.8246 12.1956 21.1078 13.1124 20.6113C14.0292 20.1148 15.0576 19.8546 16.1028 19.8546C17.1481 19.8546 18.1765 20.1148 19.0933 20.6113C20.0101 21.1078 20.7858 21.8246 21.3488 22.6955C19.8489 23.8493 18.003 24.4757 16.1028 24.4757C14.2027 24.4757 12.3568 23.8493 10.8568 22.6955ZM26.7719 8.0843L23.6586 11.1636C23.5863 11.2352 23.5004 11.2919 23.4059 11.3307C23.3114 11.3694 23.2102 11.3894 23.1079 11.3894C23.0056 11.3894 22.9043 11.3694 22.8098 11.3307C22.7153 11.2919 22.6295 11.2352 22.5572 11.1636L21.0005 9.62395C20.9282 9.55242 20.8708 9.46751 20.8317 9.37406C20.7926 9.28061 20.7724 9.18045 20.7724 9.0793C20.7724 8.97815 20.7926 8.87799 20.8317 8.78454C20.8708 8.69109 20.9282 8.60617 21.0005 8.53465C21.1466 8.3902 21.3447 8.30905 21.5512 8.30905C21.6535 8.30905 21.7547 8.32897 21.8492 8.36768C21.9437 8.40639 22.0296 8.46313 22.1019 8.53465L23.1079 9.53061L25.6706 6.99501C25.7429 6.92348 25.8287 6.86675 25.9232 6.82804C26.0177 6.78933 26.119 6.76941 26.2212 6.76941C26.3235 6.76941 26.4248 6.78933 26.5193 6.82804C26.6137 6.86675 26.6996 6.92348 26.7719 6.99501C26.8442 7.06653 26.9016 7.15144 26.9407 7.24489C26.9799 7.33834 27 7.4385 27 7.53966C27 7.64081 26.9799 7.74097 26.9407 7.83442C26.9016 7.92787 26.8442 8.01278 26.7719 8.0843Z" fill="white"/>
  </svg>
);

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1v10M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

interface Manager {
  id: string;
  name: string;
  role: string;
  clients: number;
  capacityPercent: number;
  barColor: string;
  avatarBg: string;
}

const managers: Manager[] = [
  { id: "happiness-abiye-ibrahim-1",         name: "Happiness Abiye Ibrahim",         role: "Team Lead Employability Associate", clients: 17, capacityPercent: 88, barColor: "#A2CE3A", avatarBg: "#C0392B" },
  { id: "oluwaseun-gabby-owolabi",            name: "Oluwaseun Gabby Owolabi",          role: "Employability Associate",           clients: 7,  capacityPercent: 45, barColor: "#FF9500", avatarBg: "#8E44AD" },
  { id: "kareemah-oyinkansola-alli-kamal",    name: "Kareemah Oyinkansola Alli-Kamal",  role: "Employability Associate",           clients: 14, capacityPercent: 85, barColor: "#A2CE3A", avatarBg: "#27AE60" },
  { id: "karimat-adesina",                   name: "Karimat Adesina",                  role: "Employability Associate",           clients: 8,  capacityPercent: 50, barColor: "#FF9500", avatarBg: "#E67E22" },
  { id: "ayotomide-ilesanmi",                name: "Ayotomide Ilesanmi",               role: "Employability Associate",           clients: 15, capacityPercent: 91, barColor: "#A2CE3A", avatarBg: "#2980B9" },
  { id: "mofesolamisi-elusakin",             name: "Mofesolamisi Elusakin",            role: "Employability Associate",           clients: 16, capacityPercent: 78, barColor: "#A2CE3A", avatarBg: "#16A085" },
  { id: "happiness-abiye-ibrahim-2",         name: "Happiness Abiye Ibrahim",          role: "Team Lead Employability Associate", clients: 14, capacityPercent: 88, barColor: "#A2CE3A", avatarBg: "#C0392B" },
];

const PAGE_SIZE = 7;

export default function ManagersPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(managers.length / PAGE_SIZE);
  const paged = managers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar pageTitle="Managers" pageIcon={<ManagersNavIcon />} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="ACTIVE CLIENTS"     value="48"  trend={{ value: "+1", isPositive: true }} />
        <StatCard title="APPLICATIONS MADE"  value="670" trend={{ value: "+1", isPositive: true }} />
        <StatCard title="INTERVIEWS SECURED" value="65"  trend={{ value: "+1", isPositive: true }} />
        <StatCard title="ASSESSMENTS SECURED" value="25" trend={{ value: "+1", isPositive: true }} />
      </div>

      {/* Table card */}
      <div className="rounded-2xl p-5" style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-mona-sans font-semibold text-lg">Manager Capacity</h2>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 font-mona-sans font-semibold text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-90"
              style={{ background: "#A2CE3A", color: "#0B0D0F" }}
            >
              Export <ExportIcon />
            </button>
            <select
              className="font-mona-sans text-sm px-3 py-2 rounded-xl outline-none"
              style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A", color: "#95ACCB" }}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {paged.map((mgr) => {
            const initials = mgr.name.split(" ").slice(0, 2).map((n) => n[0]).join("");
            return (
              <div
                key={mgr.id}
                className="flex items-center gap-4 px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid #FFFFFF0A" }}
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mona-sans font-bold text-sm text-white flex-shrink-0"
                  style={{ background: mgr.avatarBg }}
                >
                  {initials}
                </div>

                {/* Name + role */}
                <div className="w-56 flex-shrink-0">
                  <p className="font-mona-sans font-medium text-sm" style={{ color: "#E8EFF1" }}>{mgr.name}</p>
                  <p className="font-mona-sans text-xs" style={{ color: "#657997" }}>{mgr.role}</p>
                </div>

                {/* Progress bar */}
                <div className="flex-1 mx-4">
                  <div className="rounded-full overflow-hidden" style={{ height: "8px", background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${mgr.capacityPercent}%`, background: mgr.barColor }}
                    />
                  </div>
                </div>

                {/* Client count */}
                <span className="font-mona-sans font-semibold text-sm w-8 text-center flex-shrink-0" style={{ color: "#E8EFF1" }}>
                  {mgr.clients}
                </span>

                {/* Open button */}
                <Link
                  href={`/v1/super-admin/managers/${mgr.id}`}
                  className="font-mona-sans font-semibold text-sm px-5 py-2 rounded-[10px] flex-shrink-0 transition-opacity hover:opacity-80"
                  style={{
                    background: "#0000001F",
                    border: "1px solid #FFFFFF0F",
                    color: "#E8EFF1",
                  }}
                >
                  Open
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity disabled:opacity-30"
            style={{ background: "rgba(255,255,255,0.08)", color: "#95ACCB" }}
          >
            <ChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-mona-sans text-sm font-semibold transition-all"
              style={{
                background: page === n ? "#A2CE3A" : "rgba(255,255,255,0.08)",
                color: page === n ? "#0B0D0F" : "#95ACCB",
              }}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity disabled:opacity-30"
            style={{ background: "rgba(255,255,255,0.08)", color: "#95ACCB" }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
