"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PipelineItem {
  id: number;
  date: string; // e.g. "14 May, 26"
  company: string;
  role: string;
  link: string;
}

export interface ApplicationPipelineProps {
  /** Optional: pass data directly instead of letting the component fetch it */
  applications?: PipelineItem[];
  interviews?: PipelineItem[];
}

type TabKey = "applications" | "interviews";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("auth_token")
    : null;
}

function getAuthHeaders() {
  const token = getToken();
  return {
    "content-type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const TableIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="1.5"
      y="1.5"
      width="13"
      height="13"
      rx="2"
      stroke="#95ACCB"
      strokeWidth="1.3"
    />
    <path d="M1.5 6H14.5" stroke="#95ACCB" strokeWidth="1.3" />
    <path d="M6 6V14.5" stroke="#95ACCB" strokeWidth="1.3" />
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

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="#657997" strokeWidth="1.4" />
    <path
      d="M13 13L9.6 9.6"
      stroke="#657997"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ApplicationPipelineTable({
  applications: applicationsProp,
  interviews: interviewsProp,
}: ApplicationPipelineProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>("applications");
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState<PipelineItem[]>(
    applicationsProp ?? [],
  );
  const [interviews, setInterviews] = useState<PipelineItem[]>(
    interviewsProp ?? [],
  );
  const [loading, setLoading] = useState(applicationsProp === undefined);

  // Fetch only if data wasn't passed in as props
  useEffect(() => {
    if (applicationsProp !== undefined) return;

    const load = async () => {
      try {
        setLoading(true);
        const [appsRes, interviewsRes] = await Promise.all([
          fetch(`${getApiUrl()}/api/v1/client/applications`, {
            headers: getAuthHeaders(),
          }),
          fetch(`${getApiUrl()}/api/v1/client/interviews`, {
            headers: getAuthHeaders(),
          }),
        ]);
        if (!appsRes.ok || !interviewsRes.ok) {
          throw new Error("Failed to fetch application pipeline");
        }
        const appsData = await appsRes.json();
        const interviewsData = await interviewsRes.json();
        setApplications(appsData.data ?? []);
        setInterviews(interviewsData.data ?? []);
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to load application pipeline",
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [applicationsProp]);

  const activeData = activeTab === "applications" ? applications : interviews;

  const filteredData = useMemo(() => {
    if (!search.trim()) return activeData;
    const q = search.trim().toLowerCase();
    return activeData.filter(
      (item) =>
        item.company.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q) ||
        item.link.toLowerCase().includes(q),
    );
  }, [activeData, search]);

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-white font-mona-sans font-semibold text-base">
            Application Pipeline
          </span>
          <span className="font-mona-sans text-sm" style={{ color: "#95ACCB" }}>
            {applications.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center"
            style={{
              background: "transparent",
              border: "0.5px solid #FFFFFF1A",
              borderRadius: "10px",
              width: "36px",
              height: "36px",
              cursor: "pointer",
            }}
          >
            <TableIcon />
          </button>
          <button
            className="flex items-center gap-2"
            style={{
              background: "transparent",
              border: "0.5px solid #FFFFFF1A",
              borderRadius: "10px",
              padding: "8px 16px",
              color: "#E8EFF1",
              fontFamily: "var(--font-mona-sans, sans-serif)",
              fontWeight: 500,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Today <ChevronDown />
          </button>
        </div>
      </div>

      {/* Toggle tabs + search */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div
          className="inline-flex items-center"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid #FFFFFF1A",
            borderRadius: "10px",
            padding: "4px",
          }}
        >
          {(
            [
              { key: "applications", label: "Applications" },
              { key: "interviews", label: "Interview Secured" },
            ] as { key: TabKey; label: string }[]
          ).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="font-mona-sans font-medium transition-colors"
                style={{
                  fontSize: "13px",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  color: isActive ? "#E8EFF1" : "#95ACCB",
                  background: isActive ? "#1E3A3F" : "transparent",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className="flex items-center gap-2"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "0.5px solid #FFFFFF1A",
            borderRadius: "10px",
            padding: "9px 14px",
            width: "260px",
          }}
        >
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="font-mona-sans text-sm bg-transparent outline-none w-full"
            style={{ color: "#E8EFF1" }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <colgroup>
            <col style={{ width: "140px" }} />
            <col style={{ width: "200px" }} />
            <col style={{ width: "200px" }} />
            <col />
          </colgroup>
          <thead>
            <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
              {["Date", "Company", "Role", "Link"].map((h) => (
                <th
                  key={h}
                  className="text-left pb-3 pr-3"
                  style={{
                    color: "#fff",
                    fontSize: "13px",
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
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center font-mona-sans text-sm"
                  style={{ color: "#657997" }}
                >
                  Loading pipeline...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center font-mona-sans text-sm"
                  style={{ color: "#657997" }}
                >
                  {activeTab === "applications"
                    ? "No applications found"
                    : "No interviews secured yet"}
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: "1px solid #FFFFFF06" }}
                >
                  <td className="py-3 pr-3">
                    <span
                      className="font-mona-sans text-sm"
                      style={{ color: "#95ACCB", whiteSpace: "nowrap" }}
                    >
                      {item.date}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span
                      className="font-mona-sans text-sm"
                      style={{ color: "#E8EFF1" }}
                    >
                      {item.company}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span
                      className="font-mona-sans text-sm"
                      style={{ color: "#E8EFF1" }}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mona-sans text-sm transition-opacity hover:opacity-80"
                      style={{
                        color: "#0088FF",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "block",
                        maxWidth: "100%",
                      }}
                    >
                      {item.link}
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}