"use client";

import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";
import ClientPipeline from "@/components/v1-super-admin/Clientpipeline";
import OnboardingQueue from "@/components/v1-super-admin/Onboardingqueue";  
import ManagerCapacity from "@/components/v1-super-admin/Managercapacity";

const DashboardIcon = () => (
 <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="8" fill="#0C6746"/>
<path d="M23.3567 12.6749L17.8983 8.30819C16.8317 7.45819 15.165 7.44985 14.1067 8.29985L8.64834 12.6749C7.86501 13.2999 7.39001 14.5499 7.55667 15.5332L8.60667 21.8165C8.84834 23.2249 10.1567 24.3332 11.5817 24.3332H20.415C21.8233 24.3332 23.1567 23.1999 23.3983 21.8082L24.4483 15.5249C24.5983 14.5499 24.1233 13.2999 23.3567 12.6749ZM16.6233 20.9999C16.6233 21.3415 16.34 21.6249 15.9983 21.6249C15.6567 21.6249 15.3733 21.3415 15.3733 20.9999V18.4999C15.3733 18.1582 15.6567 17.8749 15.9983 17.8749C16.34 17.8749 16.6233 18.1582 16.6233 18.4999V20.9999Z" fill="white"/>
</svg>

);


export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen p-4 lg:p-6">
      {/* Navbar */}
      <div className="w-full">
        <DashboardNavbar
          pageTitle="Dashboard"
          pageIcon={<DashboardIcon />}
        />
      </div>

      {/* Stats Row 1 — Client counts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard title="TOTAL CLIENTS"      value="56" />
        <StatCard title="ASSIGNED CLIENTS"   value="54" />
        <StatCard title="UNASSIGNED CLIENTS" value="2"  />
        <StatCard title="CLOSED CLIENTS"     value="10" />
      </div>

      {/* Stats Row 2 — Activity */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="TOTAL APPLICATIONS"  value="420" />
        <StatCard title="INTERVIEWS SECURED"  value="24"  />
        <StatCard title="ASSESSMENTS SECURED" value="20"  />
        <StatCard title="JOBS"                value="3"   />
      </div>

      {/* Main grid — left 2/3, right 1/3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ClientPipeline />
          <OnboardingQueue />
        </div>
        <div className="lg:col-span-1">
          <ManagerCapacity />
        </div>
      </div>
    </div>
  );
}