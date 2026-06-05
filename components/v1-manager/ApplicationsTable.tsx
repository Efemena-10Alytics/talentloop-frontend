"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Application {
  date: string;
  client: string;
  company: string;
  role: string;
  link: string;
}

interface Interview {
  date: string;
  client: string;
  company: string;
  role: string;
  location: string;
  status: "Interview" | "2nd Interview";
  cvUsed: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const applications: Application[] = [
  { date: "14 May, 26", client: "Adaeze Nwosu",   company: "Barclays",    role: "Data Analyst",      link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433" },
  { date: "14 May, 26", client: "Taiwo Kolade",   company: "Accenture",   role: "PM Consultant",     link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433" },
  { date: "14 May, 26", client: "Priya Mehta",    company: "BT Group",    role: "Cyber Analyst",     link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433" },
  { date: "14 May, 26", client: "Olumide Adeyemi",company: "Meta Group",  role: "Financial Analyst", link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433" },
  { date: "14 May, 26", client: "Olumide Adeyemi",company: "Meta Group",  role: "Financial Analyst", link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433" },
  { date: "14 May, 26", client: "Olumide Adeyemi",company: "Meta Group",  role: "Financial Analyst", link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433" },
  { date: "14 May, 26", client: "Olumide Adeyemi",company: "Meta Group",  role: "Financial Analyst", link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433" },
];

const interviews: Interview[] = [
  { date: "14 May, 26", client: "Adaeze Nwosu",    company: "Barclays",   role: "Data Analyst",      location: "Data Analyst",      status: "Interview",     cvUsed: "CV_v3_Optimized" },
  { date: "14 May, 26", client: "Taiwo Kolade",    company: "Accenture",  role: "PM Consultant",     location: "PM Consultant",     status: "2nd Interview", cvUsed: "CV_v3" },
  { date: "14 May, 26", client: "Priya Mehta",     company: "BT Group",   role: "Cyber Analyst",     location: "Cyber Analyst",     status: "Interview",     cvUsed: "CV_v3" },
  { date: "14 May, 26", client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Financial Analyst", status: "Interview",     cvUsed: "CV_v3" },
  { date: "14 May, 26", client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Financial Analyst", status: "Interview",     cvUsed: "CV_v3_Optimized" },
  { date: "14 May, 26", client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Financial Analyst", status: "2nd Interview", cvUsed: "CV_v3" },
  { date: "14 May, 26", client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Financial Analyst", status: "Interview",     cvUsed: "CV_v3_Optimized" },
  { date: "14 May, 26", client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Financial Analyst", status: "Interview",     cvUsed: "CV_v3" },
  { date: "14 May, 26", client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Financial Analyst", status: "2nd Interview", cvUsed: "CV_v3_Optimized" },
  { date: "14 May, 26", client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Financial Analyst", status: "Interview",     cvUsed: "CV_v3" },
  { date: "14 May, 26", client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Financial Analyst", status: "Interview",     cvUsed: "CV_v3" },
  { date: "14 May, 26", client: "Olumide Adeyemi", company: "Meta Group", role: "Financial Analyst", location: "Financial Analyst", status: "Interview",     cvUsed: "CV_v3" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const ExportIcon = () => (
  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.9242 0.175674C4.81168 0.0631898 4.6591 0 4.5 0C4.3409 0 4.18832 0.0631898 4.0758 0.175674L1.0758 3.17571C0.966505 3.28887 0.906028 3.44043 0.907395 3.59775C0.908763 3.75507 0.971864 3.90556 1.08311 4.01681C1.19435 4.12805 1.34484 4.19115 1.50216 4.19252C1.65948 4.19389 1.81104 4.13341 1.9242 4.02411L3.9 2.04829V9.59997C3.9 9.75911 3.96321 9.91172 4.07574 10.0242C4.18826 10.1368 4.34087 10.2 4.5 10.2C4.65913 10.2 4.81174 10.1368 4.92426 10.0242C5.03679 9.91172 5.1 9.75911 5.1 9.59997V2.04829L7.0758 4.02411C7.13115 4.08142 7.19736 4.12713 7.27056 4.15858C7.34376 4.19002 7.42249 4.20657 7.50216 4.20727C7.58183 4.20796 7.66083 4.19278 7.73457 4.16261C7.80831 4.13244 7.8753 4.08789 7.93164 4.03155C7.98797 3.97522 8.03253 3.90822 8.06269 3.83449C8.09286 3.76075 8.10804 3.68174 8.10735 3.60207C8.10666 3.5224 8.09011 3.44367 8.05866 3.37047C8.02722 3.29726 7.98151 3.23105 7.9242 3.17571L4.9242 0.175674ZM0.45 11.1C0.330653 11.1 0.216193 11.1474 0.131802 11.2318C0.0474105 11.3162 0 11.4306 0 11.55C0 11.6693 0.0474105 11.7838 0.131802 11.8682C0.216193 11.9526 0.330653 12 0.45 12H8.55C8.66935 12 8.78381 11.9526 8.8682 11.8682C8.95259 11.7838 9 11.6693 9 11.55C9 11.4306 8.95259 11.3162 8.8682 11.2318C8.78381 11.1474 8.66935 11.1 8.55 11.1H0.45Z" fill="#0B0D0F"/>
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 6.375H0.75M6.375 12L0.75 6.375L6.375 0.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 6.375H15.25M9.625 0.75L15.25 6.375L9.625 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L6 6L11 1" stroke="#95ACCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StatusBadge = ({ status }: { status: "Interview" | "2nd Interview" }) => {
  const isSecond = status === "2nd Interview";
  return (
    <span
      className="font-jakarta-sans text-xs font-bold px-3 py-1 whitespace-nowrap"
      style={{
        background: "#0088FF1A",
        borderRadius: "100px",
        border: "1px solid #FFFFFF0F",
        color: isSecond ? "#CB30E0" : "#0088FF",
      }}
    >
      {status}
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 12;

export default function ApplicationsTable() {
  const [activeTab, setActiveTab] = useState<"applications" | "interviews">("applications");
  const [currentPage, setCurrentPage] = useState(1);

  const isApplications = activeTab === "applications";
  const data = isApplications ? applications : interviews;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paged = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (tab: "applications" | "interviews") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Tab styles
  const activeTabStyle: React.CSSProperties = {
    background: "#1563743D",
    border: "0.5px solid #E8EFF11A",
    borderRadius: "10px",
    color: "#E8EFF1",
    fontFamily: "var(--font-mona-sans, sans-serif)",
    fontWeight: 500,
    fontSize: "13px",
    padding: "8px 18px",
    cursor: "pointer",
  };

  const inactiveTabStyle: React.CSSProperties = {
    background: "transparent",
    border: "0.5px solid #FFFFFF1A",
    borderRadius: "10px",
    color: "#E8EFF1",
    fontFamily: "var(--font-mona-sans, sans-serif)",
    fontWeight: 500,
    fontSize: "13px",
    padding: "8px 18px",
    cursor: "pointer",
  };

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "#1563741A",
        border: "0.5px solid #FFFFFF1A",
      }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTabChange("applications")}
            style={activeTab === "applications" ? activeTabStyle : inactiveTabStyle}
          >
            Applications
          </button>
          <button
            onClick={() => handleTabChange("interviews")}
            style={activeTab === "interviews" ? activeTabStyle : inactiveTabStyle}
          >
            Interviews Secured
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Export */}
          <button
            className="flex items-center gap-2"
            style={{
              background: "#A2CE3A",
              border: "0.5px solid #FFFFFF1A",
              borderRadius: "10px",
              padding: "8px 16px",
              color: "#0B0D0F",
              fontFamily: "var(--font-mona-sans, sans-serif)",
              fontWeight: 500,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Export
            <ExportIcon />
          </button>

          {/* Premium Clients filter */}
          <button
            className="flex items-center gap-2"
            style={inactiveTabStyle}
          >
            Premium Clients
            <ChevronDown />
          </button>

          {/* Today filter */}
          <button
            className="flex items-center gap-2"
            style={inactiveTabStyle}
          >
            Today
            <ChevronDown />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isApplications ? (
          /* ── Applications Table ── */
          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "110px" }} />
              <col style={{ width: "160px" }} />
              <col style={{ width: "150px" }} />
              <col style={{ width: "150px" }} />
              <col />
            </colgroup>
            <thead>
              <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
                {["Date", "Client", "Company", "Role", "Link"].map((h) => (
                  <th
                    key={h}
                    className="text-left pb-3 pr-4"
                    style={{ color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "var(--font-mona-sans, sans-serif)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(paged as Application[]).map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #FFFFFF06" }}>
                  <td className="py-3 pr-4" style={{ color: "#95ACCB", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.date}</td>
                  <td className="py-3 pr-4" style={{ color: "#fff", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.client}</td>
                  <td className="py-3 pr-4" style={{ color: "#fff", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.company}</td>
                  <td className="py-3 pr-4" style={{ color: "#95ACCB", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.role}</td>
                  <td className="py-3">
                    <a
                      href={row.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate hover:text-white transition-colors"
                      style={{ color: "#657997", fontSize: "12px", fontFamily: "var(--font-mona-sans, sans-serif)" }}
                    >
                      {row.link}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* ── Interviews Table ── */
          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "100px" }} />
              <col style={{ width: "145px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "140px" }} />
            </colgroup>
            <thead>
              <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
                {["Client", "Company", "Role", "Location", "Status", "CV Used", "Date"].map((h) => (
                  <th
                    key={h}
                    className="text-left pb-3 pr-4"
                    style={{ color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "var(--font-mona-sans, sans-serif)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(paged as Interview[]).map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #FFFFFF06" }}>
                  <td className="py-3 pr-4" style={{ color: "#fff", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.client}</td>
                  <td className="py-3 pr-4" style={{ color: "#fff", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.company}</td>
                  <td className="py-3 pr-4" style={{ color: "#95ACCB", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.role}</td>
                  <td className="py-3 pr-4" style={{ color: "#95ACCB", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.location}</td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 pr-4" style={{ color: "#95ACCB", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.cvUsed}</td>
                  <td className="py-3" style={{ color: "#95ACCB", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity"
          style={{ opacity: currentPage === 1 ? 0.3 : 1, background: "transparent", border: "none", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
        >
          <ArrowLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-mona-sans font-medium transition-all"
            style={{
              background: currentPage === page ? "#A2CE3A" : "transparent",
              color: currentPage === page ? "#0B0D0F" : "#95ACCB",
              border: currentPage === page ? "none" : "1px solid #FFFFFF1A",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity"
          style={{ opacity: currentPage === totalPages ? 0.3 : 1, background: "transparent", border: "none", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}