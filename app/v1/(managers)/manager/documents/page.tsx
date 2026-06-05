"use client";

import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";
import DocumentsTable from "@/components/v1-manager/DocumentsTable";

const DocumentsIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="8" fill="#0C6746" />
    <path
      d="M24.0475 14.7004L23.2309 18.1837C22.5309 21.1921 21.1475 22.4087 18.5475 22.1587C18.1309 22.1254 17.6809 22.0504 17.1975 21.9337L15.7975 21.6004C12.3225 20.7754 11.2475 19.0587 12.0642 15.5754L12.8809 12.0837C13.0475 11.3754 13.2475 10.7587 13.4975 10.2504C14.4725 8.23375 16.1309 7.69208 18.9142 8.35041L20.3059 8.67541C23.7975 9.49208 24.8642 11.2171 24.0475 14.7004Z"
      stroke="#E8EFF1"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.5513 22.1583C18.0346 22.5083 17.3846 22.8 16.5929 23.0583L15.2763 23.4917C11.9679 24.5583 10.2263 23.6667 9.15126 20.3583L8.08459 17.0667C7.01793 13.7583 7.90126 12.0083 11.2096 10.9417L12.5263 10.5083C12.8679 10.4 13.1929 10.3083 13.5013 10.25C13.2513 10.7583 13.0513 11.375 12.8846 12.0833L12.0679 15.575C11.2513 19.0583 12.3263 20.775 15.8013 21.6L17.2013 21.9333C17.6846 22.05 18.1346 22.125 18.5513 22.1583Z"
      stroke="#E8EFF1"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.5312 13.1084L20.5729 14.1334"
      stroke="#E8EFF1"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.7168 16.333L18.1335 16.9497"
      stroke="#E8EFF1"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function DocumentsPage() {
  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar pageTitle="Documents" pageIcon={<DocumentsIcon />} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="TOTAL CV UPLOADS" value="47" />
        <StatCard title="TOTAL COVER LETTERS" value="18" />
        <StatCard title="TOTAL OPTIMIZED CV" value="18" />
        <StatCard title="TOTAL OPTIMIZED COVER LETTERS" value="18" />
      </div>

      <DocumentsTable />
    </div>
  );
}
