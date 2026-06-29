"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import ProfileTab from "@/components/v1-dashboard/settings/ProfileTab";
import NotificationsTab from "@/components/v1-dashboard/settings/NotificationsTab";
import SecurityTab from "@/components/v1-dashboard/settings/SecurityTab";

const SettingsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#0C6746"/>
    <path d="M8.5 13.5916V18.4C8.5 20.1666 8.5 20.1666 10.1667 21.2916L14.75 23.9416C15.4417 24.3416 16.5667 24.3416 17.25 23.9416L21.8333 21.2916C23.5 20.1666 23.5 20.1666 23.5 18.4083V13.5916C23.5 11.8333 23.5 11.8333 21.8333 10.7083L17.25 8.0583C16.5667 7.6583 15.4417 7.6583 14.75 8.0583L10.1667 10.7083C8.5 11.8333 8.5 11.8333 8.5 13.5916Z" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 18.5C17.3807 18.5 18.5 17.3807 18.5 16C18.5 14.6193 17.3807 13.5 16 13.5C14.6193 13.5 13.5 14.6193 13.5 16C13.5 17.3807 14.6193 18.5 16 18.5Z" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type TabType = "profile" | "notifications" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const tabs: { id: TabType; label: string }[] = [
    { id: "profile", label: "PROFILE" },
    { id: "notifications", label: "NOTIFICATIONS" },
    { id: "security", label: "SECURITY" },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-6">
      {/* Navbar */}
      <DashboardNavbar 
        pageTitle="Settings" 
        pageIcon={<SettingsIcon />} 
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border border-[#FFFFFF1A] rounded-[10px] p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-[10px] font-mona-sans text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[#1563741A] text-white"
                : "text-[#95ACCB] hover:text-white hover:bg-[#1563740D]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "notifications" && <NotificationsTab />}
        {activeTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
}
