"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";

const ManagersNavIcon = () => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="33" height="32" rx="8" fill="#0C6746"/>
    <path d="M25.1851 13.7088C24.9815 13.7425 24.7998 13.8548 24.6799 14.021C24.56 14.1872 24.5118 14.3937 24.5459 14.5951C24.6249 15.0619 24.6646 15.5344 24.6646 16.0077C24.6664 18.0806 23.8961 20.0816 22.5008 21.6284C21.6327 20.3842 20.4121 19.4217 18.9924 18.8618C19.755 18.2677 20.3115 17.4534 20.5844 16.532C20.8574 15.6107 20.8333 14.6281 20.5154 13.7209C20.1976 12.8137 19.6018 12.027 18.811 11.4703C18.0202 10.9135 17.0736 10.6143 16.1028 10.6143C15.1321 10.6143 14.1855 10.9135 13.3947 11.4703C12.6038 12.027 12.0081 12.8137 11.6902 13.7209C11.3724 14.6281 11.3483 15.6107 11.6212 16.532C11.8942 17.4534 12.4507 18.2677 13.2133 18.8618C11.7936 19.4217 10.573 20.3842 9.7049 21.6284C8.61009 20.4082 7.89494 18.9011 7.64546 17.2885C7.39597 15.6759 7.62277 14.0263 8.29857 12.5382C8.97438 11.05 10.0704 9.78659 11.4549 8.89984C12.8394 8.01309 14.4534 7.54077 16.1028 7.53966C16.5814 7.53958 17.0591 7.57885 17.5311 7.65705C17.7338 7.68868 17.9409 7.63988 18.1073 7.52127C18.2738 7.40265 18.3862 7.22382 18.4201 7.02366C18.4539 6.82351 18.4065 6.61824 18.2881 6.45248C18.1697 6.28673 17.99 6.17392 17.7879 6.13858C15.6742 5.78688 13.5022 6.10869 11.5854 7.05753C9.66864 8.00637 8.10635 9.53316 7.12411 11.4174C6.14187 13.3017 5.7905 15.446 6.12073 17.5407C6.45096 19.6353 7.4457 21.572 8.96134 23.0711C10.477 24.5701 12.4351 25.554 14.5529 25.8806C16.6708 26.2072 18.8387 25.8597 20.7439 24.8882C22.649 23.9167 24.1927 22.3715 25.152 20.4757C26.1114 18.5799 26.4367 16.4316 26.0811 14.341C26.0471 14.1397 25.9335 13.9599 25.7655 13.8414C25.5974 13.7228 25.3887 13.6751 25.1851 13.7088Z" fill="white"/>
  </svg>
);

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v10M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12ZM14 14l-2-2" stroke="#657997" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

type DeliveryStatus = "Complete" | "Overdue" | "Not Started" | "Inprogress";

interface ClientRow {
  client: string;
  applications: number;
  interviews: number;
  assessments: number;
  target: string;
  startDate: string;
  deliveryStatus: DeliveryStatus;
  daysLeft: string;
}

const statusConfig: Record<DeliveryStatus, { color: string; bg: string }> = {
  Complete:      { color: "#34C759", bg: "rgba(52,199,89,0.12)"   },
  Overdue:       { color: "#FF3B30", bg: "rgba(255,59,48,0.12)"   },
  "Not Started": { color: "#A2CE3A", bg: "rgba(162,206,58,0.12)"  },
  Inprogress:    { color: "#FF9500", bg: "rgba(255,149,0,0.12)"   },
};

const mockClients: ClientRow[] = [
  { client: "Adaeze Nwosu", applications: 67, interviews: 3, assessments: 1, target: "3 Interviews",    startDate: "14 May, 26", deliveryStatus: "Complete",    daysLeft: "25 days"    },
  { client: "Accenture",    applications: 67, interviews: 2, assessments: 1, target: "3 Interviews",    startDate: "14 May, 26", deliveryStatus: "Overdue",     daysLeft: "-14 days"   },
  { client: "BT Group",     applications: 67, interviews: 1, assessments: 1, target: "3 Interviews",    startDate: "14 May, 26", deliveryStatus: "Not Started", daysLeft: "60 days"    },
  { client: "Meta Group",   applications: 67, interviews: 2, assessments: 1, target: "3 Interviews",    startDate: "14 May, 26", deliveryStatus: "Inprogress",  daysLeft: "14 days"    },
  { client: "Meta Group",   applications: 70, interviews: 3, assessments: 1, target: "70 Applications", startDate: "14 May, 26", deliveryStatus: "Complete",    daysLeft: "14 days"    },
  { client: "Meta Group",   applications: 67, interviews: 2, assessments: 1, target: "3 Interviews",    startDate: "14 May, 26", deliveryStatus: "Inprogress",  daysLeft: "14 May, 26" },
  { client: "Meta Group",   applications: 67, interviews: 1, assessments: 1, target: "70 Applications", startDate: "14 May, 26", deliveryStatus: "Overdue",     daysLeft: "-14 days"   },
  { client: "Meta Group",   applications: 89, interviews: 3, assessments: 1, target: "3 Interviews",    startDate: "14 May, 26", deliveryStatus: "Complete",    daysLeft: "14 days"    },
  { client: "Meta Group",   applications: 67, interviews: 1, assessments: 1, target: "70 Applications", startDate: "14 May, 26", deliveryStatus: "Inprogress",  daysLeft: "14 days"    },
  { client: "Meta Group",   applications: 67, interviews: 3, assessments: 1, target: "3 Interviews",    startDate: "14 May, 26", deliveryStatus: "Complete",    daysLeft: "14 days"    },
  { client: "Meta Group",   applications: 67, interviews: 3, assessments: 1, target: "3 Interviews",    startDate: "14 May, 26", deliveryStatus: "Complete",    daysLeft: "14 days"    },
];

const PAGE_SIZE = 11;

export default function ManagerDetailPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = mockClients.filter((c) =>
    c.client.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar pageTitle="Managers - Happiness" pageIcon={<ManagersNavIcon />} />

      {/* Stats Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard title="TOTAL CLIENTS"        value="56" />
        <StatCard title="ACTIVE CLIENTS"       value="17" />
        <StatCard title="CLIENTS YET TO START" value="2"  />
        <StatCard title="CLOSED OUT CLIENTS"   value="10" />
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="TOTAL APPLICATIONS"  value="420" />
        <StatCard title="INTERVIEWS SECURED"  value="24"  />
        <StatCard title="ASSESSMENTS SECURED" value="20"  />
        <StatCard title="JOBS"                value="3"   />
      </div>

      {/* Table card */}
      <div className="rounded-2xl p-5" style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[200px] max-w-xs"
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
          <div className="flex items-center gap-3">
            <select
              className="font-mona-sans text-sm px-3 py-2 rounded-xl outline-none"
              style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A", color: "#95ACCB" }}
            >
              <option>This Week</option>
              <option>Today</option>
              <option>This Month</option>
            </select>
            <button
              className="flex items-center gap-2 font-mona-sans font-semibold text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-90"
              style={{ background: "#A2CE3A", color: "#0B0D0F" }}
            >
              Export <ExportIcon />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
                {["Client","Applications","Interviews","Assessments","Target","Start Date","Delivery Status","Days Left"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-4 font-mona-sans font-bold text-sm" style={{ color: "#E8EFF1" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((row, i) => {
                const st = statusConfig[row.deliveryStatus];
                const isNeg = row.daysLeft.startsWith("-");
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #FFFFFF06" }}>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#E8EFF1" }}>{row.client}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.applications}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.interviews}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.assessments}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.target}</td>
                    <td className="py-3 pr-4 font-mona-sans text-sm" style={{ color: "#95ACCB" }}>{row.startDate}</td>
                    <td className="py-3 pr-4">
                      <span className="font-mona-sans text-xs font-semibold px-3 py-1 rounded-full" style={{ color: st.color, background: st.bg }}>
                        {row.deliveryStatus}
                      </span>
                    </td>
                    <td className="py-3 font-mona-sans text-sm font-semibold" style={{ color: isNeg ? "#FF3B30" : "#95ACCB" }}>
                      {row.daysLeft}
                    </td>
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