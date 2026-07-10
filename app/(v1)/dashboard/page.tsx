"use client";

import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";
import WelcomeCard from "@/components/v1-dashboard/WelcomeCard";
import RecentActivities from "@/components/v1-dashboard/RecentActivities";
import YourProgress from "@/components/v1-dashboard/YourProgress";
import YourManager from "@/components/v1-dashboard/YourManager";
import { useDashboard } from "@/hooks/useEnrollmentData";
import { useAuthMe } from "@/hooks/useUserData";

const DashboardIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8332 5.00835L10.3749 0.641682C9.30824 -0.208318 7.64157 -0.216651 6.58324 0.633349L1.1249 5.00835C0.341571 5.63335 -0.133429 6.88335 0.0332373 7.86668L1.08324 14.15C1.3249 15.5583 2.63324 16.6667 4.05824 16.6667H12.8916C14.2999 16.6667 15.6332 15.5333 15.8749 14.1417L16.9249 7.85835C17.0749 6.88335 16.5999 5.63335 15.8332 5.00835ZM9.0999 13.3334C9.0999 13.675 8.81657 13.9584 8.4749 13.9584C8.13324 13.9584 7.8499 13.675 7.8499 13.3334V10.8333C7.8499 10.4917 8.13324 10.2083 8.4749 10.2083C8.81657 10.2083 9.0999 10.4917 9.0999 10.8333V13.3334Z" fill="white"/>
  </svg>
);

function formatDeliveryDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" });
}

export default function V1DashboardPage() {
  const { data: dashboard, isLoading } = useDashboard();
  const { data: authData } = useAuthMe();

  const profile = (authData as any)?.user?.profile;
  const firstName: string =
    profile?.first_name ?? authData?.user?.name?.split(" ")[0] ?? "";

  const deliveryDate = formatDeliveryDate(dashboard?.welcome?.delivery_date);

  return (
    <div className="min-h-screen p-4 lg:p-6">
      {/* Navbar */}
      <DashboardNavbar 
        pageTitle="Dashboard" 
        pageIcon={<DashboardIcon />} 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
        <StatCard 
          title="Applications Sent" 
          value={isLoading ? "—" : String(dashboard?.applications_sent ?? 0)}
        />
        <StatCard 
          title="Interviews Secured" 
          value={isLoading ? "—" : String(dashboard?.interviews_secured ?? 0)}
        />
        <StatCard 
          title="Days Active" 
          value={isLoading ? "—" : `${dashboard?.days_active ?? 0} Days`}
        />
      </div>

      {/* Welcome and Recent Activities Section - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left: Welcome Card */}
        <WelcomeCard 
          userName={firstName || "there"}
          managerName={dashboard?.manager?.name}
          deliveryDate={deliveryDate}
        />

        {/* Right: Recent Activities */}
        <RecentActivities />
      </div>

      {/* Your Progress and Your Manager Section - Split Layout (75% / 25%) */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left: Your Progress (75% width - 3 columns) */}
        <div className="lg:w-[70%]">
          <YourProgress nextMeeting={dashboard?.next_meeting ?? null} />
        </div>

        {/* Right: Your Manager (25% width - 1 column) */}
        <div className="lg:w-[30%]">
          <YourManager 
            name={dashboard?.manager?.name ?? ""}
            rating={dashboard?.manager?.rating}
            title={dashboard?.manager?.title ?? ""}
            imageUrl={dashboard?.manager?.avatar}
            meetingLink={dashboard?.next_meeting?.meeting_link}
          />
        </div>
      </div>
    </div>
  );
}
