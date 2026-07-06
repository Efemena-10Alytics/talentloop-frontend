"use client";

import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";
import ApplicationPipeline from "@/components/v1-dashboard/ApplicationPipeline";
import { useEnrollmentStats } from "@/hooks/useEnrollmentData";

const ApplicationTrackerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#0C6746"/>
    <path d="M23.3586 12.6749L17.9003 8.30819C16.8336 7.45819 15.167 7.44985 14.1086 8.29985L8.65029 12.6749C7.86696 13.2999 7.39196 14.5499 7.55863 15.5332L8.60863 21.8165C8.85029 23.2249 10.1586 24.3332 11.5836 24.3332H20.417C21.8253 24.3332 23.1586 23.1999 23.4003 21.8082L24.4503 15.5249C24.6003 14.5499 24.1253 13.2999 23.3586 12.6749ZM16.6253 20.9999C16.6253 21.3415 16.342 21.6249 16.0003 21.6249C15.6586 21.6249 15.3753 21.3415 15.3753 20.9999V18.4999C15.3753 18.1582 15.6586 17.8749 16.0003 17.8749C16.342 17.8749 16.6253 18.1582 16.6253 18.4999V20.9999Z" fill="white"/>
  </svg>
);

export default function ApplicationTrackerPage() {
  const { data: stats, isLoading } = useEnrollmentStats("all");

  const breakdown = stats?.status_breakdown ?? {};
  const deltas = stats?.deltas ?? {};

  const getCount = (key: string) => {
    const found = Object.keys(breakdown).find((k) => k.toLowerCase().includes(key));
    return found ? String(breakdown[found]) : "0";
  };

  const getDelta = (key: string) => {
    const found = Object.keys(deltas).find((k) => k.toLowerCase().includes(key));
    if (!found) return undefined;
    const val = deltas[found];
    return val !== 0 ? { value: val > 0 ? `+${val}` : `${val}`, isPositive: val > 0 } : undefined;
  };

  return (
    <div className="min-h-screen p-4 lg:p-6">
      {/* Navbar */}
      <DashboardNavbar
        pageTitle="Application Tracker"
        pageIcon={<ApplicationTrackerIcon />}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="TOTAL APPLIED"
          value={isLoading ? "—" : (stats?.total_applications ?? "0")}
          trend={getDelta("applied")}
        />
        <StatCard
          title="INTERVIEWS SECURED"
          value={isLoading ? "—" : (stats?.interviews_secured ?? "0")}
          trend={getDelta("interview")}
        />
        <StatCard
          title="ASSESSMENTS"
          value={isLoading ? "—" : getCount("assessment")}
          trend={getDelta("assessment")}
        />
        <StatCard
          title="REJECTED"
          value={isLoading ? "—" : getCount("reject")}
          trend={getDelta("reject")}
        />
        <StatCard
          title="OFFER"
          value={isLoading ? "—" : getCount("offer")}
          trend={getDelta("offer")}
        />
      </div>

      {/* Application Pipeline */}
      <ApplicationPipeline />
    </div>
  );
}
