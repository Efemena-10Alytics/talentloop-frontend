"use client";

import { useState } from "react";
import LogApplicationModal from "./LogApplicationModal";
import UpdateApplicationModal from "./UpdateApplicationModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppRow {
  date: string;
  company: string;
  role: string;
  link: string;
}

interface InterviewRow {
  company: string;
  role: string;
  location: string;
  status: "Interview" | "2nd Interview";
  cvUsed: string;
  date: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const appRows: AppRow[] = Array.from({ length: 11 }, (_, i) => ({
  date: "14 May, 26",
  company:
    i === 0
      ? "Barclays"
      : i === 1
        ? "Accenture"
        : i === 2
          ? "BT Group"
          : "Meta Group",
  role:
    i === 0
      ? "Data Analyst"
      : i === 1
        ? "PM Consultant"
        : i === 2
          ? "Cyber Analyst"
          : "Financial Analyst",
  link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433",
}));

const interviewRows: InterviewRow[] = Array.from({ length: 11 }, (_, i) => ({
  company:
    i === 0
      ? "Barclays"
      : i === 1
        ? "Accenture"
        : i === 2
          ? "BT Group"
          : "Meta Group",
  role:
    i === 0
      ? "Data Analyst"
      : i === 1
        ? "PM Consultant"
        : i === 2
          ? "Cyber Analyst"
          : "Financial Analyst",
  location:
    i === 0
      ? "London"
      : i === 1
        ? "Remote"
        : i === 2
          ? "Cyber Analyst"
          : "Financial Analyst",
  status: i === 1 || i === 5 || i === 8 ? "2nd Interview" : "Interview",
  cvUsed: i % 2 === 0 ? "CV_v3_Optimized" : "CV_v3",
  date: "14 May, 26",
}));

// ─── Sub-components ───────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7.5" cy="7.5" r="5.5" stroke="#657997" strokeWidth="1.3" />
    <path
      d="M13 13L11.5 11.5"
      stroke="#657997"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const ExportIcon = () => (
  <svg width="9" height="12" viewBox="0 0 9 12" fill="none">
    <path
      d="M4.9242 0.175674C4.81168 0.0631898 4.6591 0 4.5 0C4.3409 0 4.18832 0.0631898 4.0758 0.175674L1.0758 3.17571C0.966505 3.28887 0.906028 3.44043 0.907395 3.59775C0.908763 3.75507 0.971864 3.90556 1.08311 4.01681C1.19435 4.12805 1.34484 4.19115 1.50216 4.19252C1.65948 4.19389 1.81104 4.13341 1.9242 4.02411L3.9 2.04829V9.6C3.9 9.75914 3.96321 9.91175 4.07574 10.0243C4.18826 10.1368 4.34087 10.2 4.5 10.2C4.65913 10.2 4.81174 10.1368 4.92426 10.0243C5.03679 9.91175 5.1 9.75914 5.1 9.6V2.04829L7.0758 4.02411C7.19736 4.12713 7.34376 4.19002 7.50216 4.20727C7.66083 4.19278 7.8753 4.08789 7.93164 4.03155C7.98797 3.97522 8.06269 3.83449 8.09286 3.76075C8.10804 3.68174 8.10735 3.60207 8.09011 3.44367C8.02722 3.29726 7.9242 3.17571 7.9242 3.17571L4.9242 0.175674ZM0.45 11.1C0.216193 11.1 0 11.3162 0 11.55C0 11.7838 0.216193 12 0.45 12H8.55C8.78381 12 9 11.7838 9 11.55C9 11.3162 8.78381 11.1 8.55 11.1H0.45Z"
      fill="#0B0D0F"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M6 1V11M1 6H11"
      stroke="#0B0D0F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
    <path
      d="M14.5 6.375H0.75M6.375 12L0.75 6.375L6.375 0.75"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
    <path
      d="M1.5 6.375H15.25M9.625 0.75L15.25 6.375L9.625 12"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
    <path
      d="M1 1L6 6L11 1"
      stroke="#95ACCB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StatusBadge = ({ status }: { status: "Interview" | "2nd Interview" }) => (
  <span
    className="font-jakarta-sans text-xs font-bold px-3 py-1"
    style={{
      background: "#0088FF1A",
      borderRadius: "100px",
      border: "1px solid #FFFFFF0F",
      color: status === "2nd Interview" ? "#CB30E0" : "#0088FF",
      whiteSpace: "nowrap",
    }}
  >
    {status}
  </span>
);

const ITEMS_PER_PAGE = 11;

type AppSubTab = "applications" | "interviews";

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

export default function WorkspaceApplications() {
  const [subTab, setSubTab] = useState<AppSubTab>("applications");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const data = subTab === "applications" ? appRows : interviewRows;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paged = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleTabChange = (t: AppSubTab) => {
    setSubTab(t);
    setCurrentPage(1);
  };

  return (
    <div className="p-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTabChange("applications")}
            style={
              subTab === "applications" ? activeTabStyle : inactiveTabStyle
            }
          >
            Applications
          </button>
          <button
            onClick={() => handleTabChange("interviews")}
            style={subTab === "interviews" ? activeTabStyle : inactiveTabStyle}
          >
            Interview Secured
          </button>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="font-mona-sans text-sm"
              style={{
                background: "#1563741A",
                border: "1px solid #FFFFFF1A",
                borderRadius: "10px",
                padding: "8px 16px 8px 36px",
                color: "#fff",
                outline: "none",
                width: "200px",
              }}
            />
          </div>
          {/* Today */}
          <button className="flex items-center gap-2" style={inactiveTabStyle}>
            Today <ChevronDown />
          </button>
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
            Export <ExportIcon />
          </button>
          {/* Log Applications — only on Applications tab */}
          {subTab === "applications" && (
            <button
              onClick={() => setShowLogModal(true)}
              className="flex items-center gap-2"
              style={{
                background: "#A2CE3A",
                border: "0.5px solid #FFFFFF1A",
                borderRadius: "10px",
                padding: "8px 16px",
                color: "#0B0D0F",
                fontFamily: "var(--font-mona-sans, sans-serif)",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              <PlusIcon /> Log Applications
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {subTab === "applications" ? (
          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "110px" }} />
              <col style={{ width: "150px" }} />
              <col style={{ width: "150px" }} />
              <col />
              <col style={{ width: "60px" }} />
            </colgroup>
            <thead>
              <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
                {["Date", "Company", "Role", "Link", "Update"].map((h) => (
                  <th
                    key={h}
                    className="text-left pb-3 pr-4"
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 700,
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(paged as AppRow[]).map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #FFFFFF06" }}>
                  <td
                    className="py-3 pr-4"
                    style={{
                      color: "#95ACCB",
                      fontSize: "13px",
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {row.date}
                  </td>
                  <td
                    className="py-3 pr-4"
                    style={{
                      color: "#E8EFF1",
                      fontSize: "13px",
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {row.company}
                  </td>
                  <td
                    className="py-3 pr-4"
                    style={{
                      color: "#95ACCB",
                      fontSize: "13px",
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {row.role}
                  </td>
                  <td className="py-3 pr-4">
                    <a
                      href={row.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate hover:text-white transition-colors"
                      style={{
                        color: "#657997",
                        fontSize: "12px",
                        fontFamily: "var(--font-mona-sans, sans-serif)",
                      }}
                    >
                      {row.link}
                    </a>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => setShowUpdateModal(true)}
                      style={{
                        background: "#0000001F",
                        border: "none",
                        color: "#95ACCB",
                        fontFamily: "var(--font-mona-sans, sans-serif)",
                        cursor: "pointer",
                      }}
                      className="hover:text-white transition-colors px-5 py-2 text-xs 2xl:text-sm flex justify-center w-fit rounded-[10px] border border-[#FFFFFF0F]"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "130px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "60px" }} />
            </colgroup>
            <thead>
              <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
                {[
                  "Company",
                  "Role",
                  "Location",
                  "Status",
                  "CV Used",
                  "Date",
                  "Update",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left pb-3 pr-4"
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 700,
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(paged as InterviewRow[]).map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #FFFFFF06" }}>
                  <td
                    className="py-3 pr-4"
                    style={{
                      color: "#E8EFF1",
                      fontSize: "13px",
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {row.company}
                  </td>
                  <td
                    className="py-3 pr-4"
                    style={{
                      color: "#95ACCB",
                      fontSize: "13px",
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {row.role}
                  </td>
                  <td
                    className="py-3 pr-4"
                    style={{
                      color: "#95ACCB",
                      fontSize: "13px",
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {row.location}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td
                    className="py-3 pr-4"
                    style={{
                      color: "#95ACCB",
                      fontSize: "13px",
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {row.cvUsed}
                  </td>
                  <td
                    className="py-3 pr-4"
                    style={{
                      color: "#95ACCB",
                      fontSize: "13px",
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {row.date}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => setShowUpdateModal(true)}
                      style={{
                        background: "#0000001F",
                        border: "none",
                        color: "#95ACCB",
                        fontFamily: "var(--font-mona-sans, sans-serif)",
                        cursor: "pointer",
                      }}
                      className="hover:text-white transition-colors px-5 py-2 text-xs 2xl:text-sm flex justify-center w-fit rounded-[10px] border border-[#FFFFFF0F]"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      <LogApplicationModal
        isOpen={showLogModal}
        onClose={() => setShowLogModal(false)}
      />
      <UpdateApplicationModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{
            opacity: currentPage === 1 ? 0.3 : 1,
            background: "transparent",
            border: "none",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: currentPage === page ? "#A2CE3A" : "transparent",
              color: currentPage === page ? "#0B0D0F" : "#95ACCB",
              border: currentPage === page ? "none" : "1px solid #FFFFFF1A",
              fontFamily: "var(--font-mona-sans, sans-serif)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          style={{
            opacity: currentPage === totalPages ? 0.3 : 1,
            background: "transparent",
            border: "none",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
