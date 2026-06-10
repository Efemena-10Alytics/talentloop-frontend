"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";

const PaymentsNavIcon = () => (
  <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="23" rx="8" fill="#0C6746"/>
    <path d="M21.7519 6.82756C21.6751 6.77816 21.5874 6.74971 21.497 6.7449C21.4066 6.74009 21.3165 6.75908 21.2352 6.80007C18.3727 8.24346 16.3284 7.56713 14.1674 6.85368C11.9003 6.10518 9.54992 5.33194 6.30272 6.9664C6.21199 7.01126 6.13542 7.08167 6.08186 7.16948C6.02829 7.25729 5.99991 7.35892 6 7.46265V15.7058C5.99999 15.7991 6.023 15.8908 6.06688 15.9724C6.11076 16.054 6.17406 16.1228 6.25081 16.1722C6.32757 16.2216 6.41527 16.2501 6.50565 16.255C6.59604 16.2598 6.68613 16.2409 6.76746 16.2C9.62993 14.7566 11.6743 15.4329 13.8386 16.1463C15.1215 16.569 16.4284 17 17.906 17C19.0455 17 20.2884 16.7443 21.7006 16.0336C21.7903 15.9885 21.8659 15.9183 21.9188 15.831C21.9718 15.7438 21.9999 15.643 22 15.5401V7.29701C22.0008 7.20347 21.9784 7.11127 21.935 7.02912C21.8916 6.94698 21.8286 6.8776 21.7519 6.82756Z" fill="white"/>
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

type PaymentPlan = "Premium" | "Basic" | "Comprehensive" | "Platinum";
type PaymentStatus = "Completed" | "Ongoing" | "Overdue";

interface Payment {
  client: string;
  email: string;
  batch: string;
  plan: PaymentPlan;
  amount: string;
  firstPayment: string;
  nextPayment: string;
  status: PaymentStatus;
}

const planConfig: Record<PaymentPlan, { color: string; bg: string; border: string }> = {
  Premium:       { color: "#34C759", bg: "rgba(52,199,89,0.12)",   border: "rgba(52,199,89,0.25)"   },
  Basic:         { color: "#FF9500", bg: "rgba(255,149,0,0.12)",   border: "rgba(255,149,0,0.25)"   },
  Comprehensive: { color: "#0088FF", bg: "rgba(0,136,255,0.12)",   border: "rgba(0,136,255,0.25)"   },
  Platinum:      { color: "#CB30E0", bg: "rgba(203,48,224,0.12)",  border: "rgba(203,48,224,0.25)"  },
};

const statusConfig: Record<PaymentStatus, { color: string }> = {
  Completed: { color: "#34C759" },
  Ongoing:   { color: "#FF9500" },
  Overdue:   { color: "#FF3B30" },
};

const mockPayments: Payment[] = [
  { client: "Adaeze Nwosu",    email: "adaeze@email.com", batch: "June", plan: "Premium",       amount: "£250", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Completed" },
  { client: "Taiwo Kolade",    email: "adaeze@email.com", batch: "June", plan: "Basic",         amount: "£70",  firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Ongoing"   },
  { client: "Priya Mehta",     email: "adaeze@email.com", batch: "June", plan: "Comprehensive", amount: "£350", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Overdue"   },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Platinum",      amount: "£200", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Completed" },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Comprehensive", amount: "£350", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Completed" },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Platinum",      amount: "£200", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Completed" },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Basic",         amount: "£70",  firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Completed" },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Comprehensive", amount: "£350", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Overdue"   },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Basic",         amount: "£70",  firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Completed" },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Premium",       amount: "£250", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Ongoing"   },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Platinum",      amount: "£200", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Completed" },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Premium",       amount: "£250", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Ongoing"   },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Basic",         amount: "£70",  firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Completed" },
  { client: "Olumide Adeyemi", email: "adaeze@email.com", batch: "June", plan: "Platinum",      amount: "£200", firstPayment: "14 May, 2026", nextPayment: "14 May, 2026", status: "Completed" },
];

const PAGE_SIZE = 12;

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("Premium Clients");
  const [statusFilter, setStatusFilter] = useState("Status");
  const [periodFilter, setPeriodFilter] = useState("Today");

  const filtered = mockPayments.filter((p) => {
    const matchSearch = p.client.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Status" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar pageTitle="Payments" pageIcon={<PaymentsNavIcon />} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard title="SUCCESSFUL PAYMENTS"      value="48" />
        <StatCard title="COMPLETE D PAYMENTS"      value="20" />
        <StatCard title="ONGOING PAYMENTS"         value="28" />
        <StatCard title="REFUNDED PAYMENTS"        value="0"  />
        <StatCard title="DEFAULTED / FAILED PAYMENT" value="0" />
      </div>

      {/* Table card */}
      <div className="rounded-2xl p-5" style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}>
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[180px] max-w-xs"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #FFFFFF1A" }}
          >
            <SearchIcon />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="bg-transparent outline-none font-mona-sans text-sm w-full"
              style={{ color: "#E8EFF1" }}
            />
          </div>

          {/* Client filter */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #FFFFFF1A" }}
          >
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="bg-transparent outline-none font-mona-sans text-sm cursor-pointer"
              style={{ color: "#95ACCB" }}
            >
              <option>Premium Clients</option>
              <option>Basic Clients</option>
              <option>Comprehensive Clients</option>
              <option>Platinum Clients</option>
              <option>All Clients</option>
            </select>
            <ChevronDown />
          </div>

          {/* Status filter */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #FFFFFF1A" }}
          >
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="bg-transparent outline-none font-mona-sans text-sm cursor-pointer"
              style={{ color: "#95ACCB" }}
            >
              <option value="Status">Status</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Overdue">Overdue</option>
            </select>
            <ChevronDown />
          </div>

          {/* Period filter */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #FFFFFF1A" }}
          >
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="bg-transparent outline-none font-mona-sans text-sm cursor-pointer"
              style={{ color: "#95ACCB" }}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <ChevronDown />
          </div>

          {/* Export */}
          <button
            className="flex items-center gap-2 font-mona-sans font-semibold text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-90 ml-auto"
            style={{ background: "#A2CE3A", color: "#0B0D0F" }}
          >
            Export <ExportIcon />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
                {["Client","Email","Batch","Payment Plan","Amount","First Payment","Next Payment","Status"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-4 font-mona-sans font-bold text-sm" style={{ color: "#E8EFF1" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((row, i) => {
                const plan = planConfig[row.plan];
                const st = statusConfig[row.status];
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #FFFFFF06" }}>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#E8EFF1" }}>{row.client}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#657997" }}>{row.email}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.batch}</td>
                    <td className="py-3 pr-4">
                      <span
                        className="font-mona-sans text-xs font-bold px-3 py-1 rounded-full"
                        style={{ color: plan.color, background: plan.bg, border: `1px solid ${plan.border}` }}
                      >
                        {row.plan}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-mona-sans text-sm font-semibold" style={{ color: "#E8EFF1" }}>{row.amount}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.firstPayment}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.nextPayment}</td>
                    <td className="py-3 font-mona-sans text-sm font-semibold" style={{ color: st.color }}>{row.status}</td>
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