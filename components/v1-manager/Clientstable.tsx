"use client";

import Link from "next/link";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PackageType = "Premium" | "Comprehensive" | "Platinum" | "Basic";
type StageType =
  | "CV Optimisation"
  | "Applications"
  | "Interview"
  | "Sponsorship";

interface Client {
  initials: string;
  initialsColor: string;
  name: string;
  email: string;
  pkg: PackageType;
  role: string;
  stage: StageType;
  apps: number;
  interviews: number;
  sponsor: boolean | null; // true = green tick, false/null = grey dash
  endDate: string;
  // Profile drawer data
  profile: ClientProfile;
}

interface ClientProfile {
  title: string;
  location: string;
  phone: string;
  emailFull: string;
  totalApplications: number;
  interviews: number;
  interviewsTrend: string;
  careerField: string;
  experience: string;
  preferredCareerPath: string;
  preferredIndustries: string;
  preferredJobTitles: string;
  currentCompany: string;
  openToRelocation: string;
  industriesToAvoid: string;
  companiesToAvoid: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const clients: Client[] = [
  {
    initials: "AN",
    initialsColor: "#A2CE3A",
    name: "Adaeze Nwosu",
    email: "adaeze@email.com",
    pkg: "Premium",
    role: "Data Analyst",
    stage: "CV Optimisation",
    apps: 13,
    interviews: 3,
    sponsor: null,
    endDate: "June 22",
    profile: {
      title: "Data Analyst",
      location: "United Kingdom",
      phone: "+447721792879",
      emailFull: "adaeze@email.com",
      totalApplications: 12,
      interviews: 3,
      interviewsTrend: "+1",
      careerField: "Data Analytics",
      experience: "4 years",
      preferredCareerPath:
        "Data Science and Analytics, Healthcare and Pharmaceuticals, E-commerce, Engineering and Manufacturing, Retail and Consumer Goods,",
      preferredIndustries: "Healthcare, Technology, Finance",
      preferredJobTitles: "Data Analyst",
      currentCompany: "Northrop Grumman",
      openToRelocation: "Yes",
      industriesToAvoid: "None",
      companiesToAvoid: "None",
    },
  },
  {
    initials: "TK",
    initialsColor: "#9B59B6",
    name: "Taiwo Kolade",
    email: "taiwo@email.com",
    pkg: "Comprehensive",
    role: "IT Project Mgmt",
    stage: "Applications",
    apps: 23,
    interviews: 3,
    sponsor: null,
    endDate: "June 19",
    profile: {
      title: "IT Project Manager",
      location: "United Kingdom",
      phone: "+447700900123",
      emailFull: "taiwo@email.com",
      totalApplications: 23,
      interviews: 3,
      interviewsTrend: "+2",
      careerField: "IT Project Management",
      experience: "6 years",
      preferredCareerPath: "Technology, Finance, Consulting",
      preferredIndustries: "Technology, Finance",
      preferredJobTitles: "IT Project Manager, Programme Manager",
      currentCompany: "KPMG",
      openToRelocation: "No",
      industriesToAvoid: "None",
      companiesToAvoid: "None",
    },
  },
  {
    initials: "PM",
    initialsColor: "#3498DB",
    name: "Priya Mehta",
    email: "priya@email.com",
    pkg: "Platinum",
    role: "Cybersecurity",
    stage: "Interview",
    apps: 45,
    interviews: 3,
    sponsor: true,
    endDate: "June 23",
    profile: {
      title: "Cybersecurity Analyst",
      location: "United Kingdom",
      phone: "+447911123456",
      emailFull: "priya@email.com",
      totalApplications: 45,
      interviews: 3,
      interviewsTrend: "+1",
      careerField: "Cybersecurity",
      experience: "5 years",
      preferredCareerPath: "Cybersecurity, Defence, Banking",
      preferredIndustries: "Defence, Banking, Technology",
      preferredJobTitles: "Cybersecurity Analyst, SOC Analyst",
      currentCompany: "BAE Systems",
      openToRelocation: "Yes",
      industriesToAvoid: "Retail",
      companiesToAvoid: "None",
    },
  },
  {
    initials: "OA",
    initialsColor: "#F1C40F",
    name: "Olumide Adeyemi",
    email: "adaeze@email.com",
    pkg: "Basic",
    role: "Financial Analyst",
    stage: "Interview",
    apps: 3,
    interviews: 0,
    sponsor: null,
    endDate: "June 19",
    profile: {
      title: "Financial Analyst",
      location: "United Kingdom",
      phone: "+447700111222",
      emailFull: "olumide@email.com",
      totalApplications: 3,
      interviews: 0,
      interviewsTrend: "+0",
      careerField: "Financial Crime",
      experience: "3 years",
      preferredCareerPath: "Finance, Compliance, Risk",
      preferredIndustries: "Banking, Insurance",
      preferredJobTitles: "Financial Analyst, Risk Analyst",
      currentCompany: "Lloyds Bank",
      openToRelocation: "No",
      industriesToAvoid: "None",
      companiesToAvoid: "None",
    },
  },
];

// ─── Package badge config ─────────────────────────────────────────────────────

const pkgConfig: Record<
  PackageType,
  { color: string; bg: string; border: string }
> = {
  Premium: {
    color: "#34C759",
    bg: "#14AE5C1A",
    border: "rgba(52,199,89,0.25)",
  },
  Comprehensive: {
    color: "#FF9500",
    bg: "rgba(255,149,0,0.1)",
    border: "rgba(255,149,0,0.25)",
  },
  Platinum: {
    color: "#CB30E0",
    bg: "rgba(203,48,224,0.1)",
    border: "rgba(203,48,224,0.25)",
  },
  Basic: {
    color: "#0088FF",
    bg: "rgba(0,136,255,0.1)",
    border: "rgba(0,136,255,0.25)",
  },
};

// ─── Stage badge config ───────────────────────────────────────────────────────

const stageConfig: Record<
  StageType,
  { color: string; bg: string; border: string }
> = {
  "CV Optimisation": {
    color: "#FF9500",
    bg: "rgba(255,149,0,0.1)",
    border: "rgba(255,149,0,0.25)",
  },
  Applications: {
    color: "#A2CE3A",
    bg: "rgba(162,206,58,0.1)",
    border: "rgba(162,206,58,0.25)",
  },
  Interview: {
    color: "#0088FF",
    bg: "rgba(0,136,255,0.1)",
    border: "rgba(0,136,255,0.25)",
  },
  Sponsorship: {
    color: "#CB30E0",
    bg: "rgba(203,48,224,0.1)",
    border: "rgba(203,48,224,0.25)",
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const ExportIcon = () => (
  <svg
    width="9"
    height="12"
    viewBox="0 0 9 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.9242 0.175674C4.81168 0.0631898 4.6591 0 4.5 0C4.3409 0 4.18832 0.0631898 4.0758 0.175674L1.0758 3.17571C0.966505 3.28887 0.906028 3.44043 0.907395 3.59775C0.908763 3.75507 0.971864 3.90556 1.08311 4.01681C1.19435 4.12805 1.34484 4.19115 1.50216 4.19252C1.65948 4.19389 1.81104 4.13341 1.9242 4.02411L3.9 2.04829V9.59997C3.9 9.75911 3.96321 9.91172 4.07574 10.0242C4.18826 10.1368 4.34087 10.2 4.5 10.2C4.65913 10.2 4.81174 10.1368 4.92426 10.0242C5.03679 9.91172 5.1 9.75911 5.1 9.59997V2.04829L7.0758 4.02411C7.19736 4.12713 7.27056 4.15858 7.34376 4.19002 7.42249 4.20657 7.50216 4.20727C7.58183 4.20796 7.66083 4.19278 7.73457 4.16261C7.80831 4.13244 7.8753 4.08789 7.93164 4.03155C7.98797 3.97522 8.03253 3.90822 8.06269 3.83449C8.09286 3.76075 8.10804 3.68174 8.10735 3.60207C8.10666 3.5224 8.09011 3.44367 8.05866 3.37047C8.02722 3.29726 7.98151 3.23105 7.9242 3.17571L4.9242 0.175674ZM0.45 11.1C0.216193 11.1 0 11.3162 0 11.55C0 11.7838 0.216193 12 0.45 12H8.55C8.78381 12 9 11.7838 9 11.55C9 11.3162 8.78381 11.1 8.55 11.1H0.45Z"
      fill="#0B0D0F"
    />
  </svg>
);

const ChevronDown = () => (
  <svg
    width="12"
    height="7"
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L6 6L11 1"
      stroke="#95ACCB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 1L1 13M1 1L13 13"
      stroke="#FF6B6B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const SponsorTick = () => (
  <div
    className="flex items-center justify-center w-6 h-6 rounded-full"
    style={{
      background: "rgba(52,199,89,0.15)",
      border: "1px solid rgba(52,199,89,0.3)",
    }}
  >
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
      <path
        d="M1 4.5L4.5 8L11 1"
        stroke="#34C759"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const SponsorDash = () => (
  <div
    className="flex items-center justify-center w-6 h-6 rounded-full"
    style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.15)",
    }}
  >
    <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
      <path
        d="M1 1H9"
        stroke="#657997"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// ─── Client Profile Drawer ────────────────────────────────────────────────────

function ClientDrawer({
  client,
  onClose,
}: {
  client: Client;
  onClose: () => void;
}) {
  const pkgStyle = pkgConfig[client.pkg];

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div
      className="flex gap-6 py-3"
      style={{ borderBottom: "1px solid #FFFFFF08" }}
    >
      <span
        className="font-mona-sans text-xs flex-shrink-0"
        style={{ color: "#657997", width: "160px", lineHeight: "1.5" }}
      >
        {label}
      </span>
      <span
        className="font-mona-sans text-sm"
        style={{ color: "#E8EFF1", lineHeight: "1.5" }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full z-50 overflow-y-auto"
        style={{
          width: "500px",
          background: "#0F1E21",
          borderLeft: "1px solid #FFFFFF1A",
          padding: "28px 28px 40px",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 mb-5 font-mona-sans text-sm transition-opacity hover:opacity-80"
          style={{
            background: "transparent",
            border: "none",
            color: "#FF6B6B",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
          Close
        </button>

        {/* Header */}
        <h2
          className="font-mona-sans font-bold mb-1"
          style={{ color: "#E8EFF1", fontSize: "22px" }}
        >
          Client Profile — {client.name}
        </h2>
        <p className="font-mona-sans text-sm mb-1" style={{ color: "#95ACCB" }}>
          {client.profile.title} · {client.profile.location} ·{" "}
          {client.profile.phone}
        </p>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mona-sans text-sm" style={{ color: "#95ACCB" }}>
            {client.profile.emailFull}
          </span>
          <span
            className="font-jakarta-sans text-xs font-bold px-3 py-1 rounded-full"
            style={{
              color: pkgStyle.color,
              background: pkgStyle.bg,
              border: `1px solid ${pkgStyle.border}`,
            }}
          >
            {client.pkg}
          </span>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            className="rounded-2xl p-4"
            style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
          >
            <p
              className="font-mona-sans text-xs uppercase tracking-wide mb-2"
              style={{ color: "#95ACCB" }}
            >
              Total Applications
            </p>
            <p
              className="font-mona-sans font-bold text-3xl"
              style={{ color: "#E8EFF1" }}
            >
              {client.profile.totalApplications}
            </p>
          </div>
          <div
            className="rounded-2xl p-4"
            style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
          >
            <p
              className="font-mona-sans text-xs uppercase tracking-wide mb-2 flex items-center gap-2"
              style={{ color: "#95ACCB" }}
            >
              Interviews
              <span
                className="font-mona-sans text-xs font-medium"
                style={{ color: "#9EFF00" }}
              >
                {client.profile.interviewsTrend}
              </span>
            </p>
            <p
              className="font-mona-sans font-bold text-3xl"
              style={{ color: "#E8EFF1" }}
            >
              {client.profile.interviews}
            </p>
          </div>
        </div>

        {/* Details section */}
        <p
          className="font-mona-sans text-sm font-semibold mb-2"
          style={{ color: "#E8EFF1" }}
        >
          Details
        </p>
        <div style={{ borderTop: "1px solid #FFFFFF0D" }}>
          <DetailRow label="Career Field" value={client.profile.careerField} />
          <DetailRow label="Experience" value={client.profile.experience} />
          <DetailRow
            label="Preferred Career Path"
            value={client.profile.preferredCareerPath}
          />
          <DetailRow
            label="Preferred Industries"
            value={client.profile.preferredIndustries}
          />
          <DetailRow
            label="Preferred Job titles"
            value={client.profile.preferredJobTitles}
          />
          <DetailRow
            label="Current Company Name"
            value={client.profile.currentCompany}
          />
          <DetailRow
            label="Open to Relocation?"
            value={client.profile.openToRelocation}
          />
          <DetailRow
            label="Industries You Want to Avoid?"
            value={client.profile.industriesToAvoid}
          />
          <DetailRow
            label="Companies You Want to Avoid?"
            value={client.profile.companiesToAvoid}
          />
        </div>

        {/* CTA */}
        <Link
        href={`/v1/manager/clients/${":ID"}`}
          className="w-full mt-6 font-mona-sans font-semibold text-sm transition-opacity hover:opacity-90"
          style={{
            background: "#A2CE3A",
            color: "#0B0D0F",
            borderRadius: "12px",
            padding: "15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Open Workspace
        </Link>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ClientsTable() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-white font-mona-sans font-semibold text-base">
            My Clients
          </span>
          <span className="font-mona-sans text-sm" style={{ color: "#95ACCB" }}>
            {clients.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <colgroup>
            <col style={{ width: "210px" }} />
            <col style={{ width: "145px" }} />
            <col style={{ width: "140px" }} />
            <col style={{ width: "145px" }} />
            <col style={{ width: "60px" }} />
            <col style={{ width: "90px" }} />
            <col style={{ width: "80px" }} />
            <col style={{ width: "90px" }} />
            <col style={{ width: "70px" }} />
          </colgroup>
          <thead>
            <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
              {[
                "Client",
                "Package",
                "Role",
                "Stage",
                "Apps",
                "Interviews",
                "Sponsor",
                "End Date",
                "Action",
              ].map((h) => (
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
            {clients.map((client, i) => {
              const pkg = pkgConfig[client.pkg];
              const stg = stageConfig[client.stage];
              return (
                <tr key={i} style={{ borderBottom: "1px solid #FFFFFF06" }}>
                  {/* Client */}
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: client.initialsColor }}
                      >
                        <span className="text-white text-xs font-semibold font-mona-sans">
                          {client.initials}
                        </span>
                      </div>
                      <div>
                        <p
                          className="font-mona-sans font-medium text-sm"
                          style={{ color: "#fff" }}
                        >
                          {client.name}
                        </p>
                        <p
                          className="font-mona-sans text-xs"
                          style={{ color: "#657997" }}
                        >
                          {client.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Package */}
                  <td className="py-3 pr-3">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        fontFamily: "var(--font-plus-jakarta-sans, sans-serif)",
                        color: pkg.color,
                        background: pkg.bg,
                        border: `1px solid ${pkg.border}`,
                      }}
                    >
                      {client.pkg}
                    </span>
                  </td>

                  {/* Role */}
                  <td className="py-3 pr-3">
                    <span
                      className="font-mona-sans text-sm"
                      style={{ color: "#E8EFF1" }}
                    >
                      {client.role}
                    </span>
                  </td>

                  {/* Stage */}
                  <td className="py-3 pr-3">
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        fontFamily: "var(--font-mona-sans, sans-serif)",
                        color: stg.color,
                        background: stg.bg,
                        border: `1px solid ${stg.border}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {client.stage}
                    </span>
                  </td>

                  {/* Apps */}
                  <td className="py-3 pr-3">
                    <span
                      className="font-mona-sans text-sm"
                      style={{ color: "#E8EFF1" }}
                    >
                      {client.apps}
                    </span>
                  </td>

                  {/* Interviews */}
                  <td className="py-3 pr-3">
                    <span
                      className="font-mona-sans text-sm"
                      style={{ color: "#E8EFF1" }}
                    >
                      {client.interviews}
                    </span>
                  </td>

                  {/* Sponsor */}
                  <td className="py-3 pr-3">
                    {client.sponsor === true ? (
                      <SponsorTick />
                    ) : (
                      <SponsorDash />
                    )}
                  </td>

                  {/* End Date */}
                  <td className="py-3 pr-3">
                    <span
                      className="font-mona-sans text-sm"
                      style={{ color: "#95ACCB" }}
                    >
                      {client.endDate}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3">
                    <button
                      onClick={() => setSelectedClient(client)}
                      className="font-mona-sans font-medium text-sm transition-all hover:opacity-90 active:scale-95"
                      style={{
                        background: "transparent",
                        border: "1px solid #FFFFFF1A",
                        borderRadius: "8px",
                        padding: "5px 16px",
                        color: "#E8EFF1",
                        cursor: "pointer",
                      }}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Profile Drawer */}
      {selectedClient && (
        <ClientDrawer
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
}
