"use client";

import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";
import ApplicationsTable from "@/components/v1-manager/ApplicationsTable";

const ApplicationsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#0C6746"/>
    <path d="M16.3086 13.4004H20.6836" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3164 13.4004L11.9414 14.0254L13.8164 12.1504" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.3086 19.2334H20.6836" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3164 19.2334L11.9414 19.8584L13.8164 17.9834" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5013 24.3337H18.5013C22.668 24.3337 24.3346 22.667 24.3346 18.5003V13.5003C24.3346 9.33366 22.668 7.66699 18.5013 7.66699H13.5013C9.33464 7.66699 7.66797 9.33366 7.66797 13.5003V18.5003C7.66797 22.667 9.33464 24.3337 13.5013 24.3337Z" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar
        pageTitle="Applications"
        pageIcon={<ApplicationsIcon />}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard title="TOTAL APPLICATIONS" value="47" />
        <StatCard title="INTERVIEWS SECURED" value="18" />
        <StatCard title="RESPONSES RECEIVED" value="18" />
        <StatCard title="RESPONSE RATE" value="38%" />
        <StatCard title="SPONSOR-ONLY" value="31" />
      </div>

      {/* Table Section */}
      <ApplicationsTable />
    </div>
  );
}