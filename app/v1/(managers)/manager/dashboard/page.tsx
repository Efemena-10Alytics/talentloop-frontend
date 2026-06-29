"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";
import ClientWorkload from "@/components/v1-manager/ClientWorkload";
import TasksPanel from "@/components/v1-manager/TasksPanel";
import RecentApplicationsTable from "@/components/v1-manager/RecentApplicationsTable";
import AllTasksView from "@/components/v1-manager/AllTasksView";

const ManagerDashboardIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#0C6746"/>
    <path d="M23.3586 12.6749L17.9003 8.30819C16.8336 7.45819 15.167 7.44985 14.1086 8.29985L8.65029 12.6749C7.86696 13.2999 7.39196 14.5499 7.55863 15.5332L8.60863 21.8165C8.85029 23.2249 10.1586 24.3332 11.5836 24.3332H20.417C21.8253 24.3332 23.1586 23.1999 23.4003 21.8082L24.4503 15.5249C24.6003 14.5499 24.1253 13.2999 23.3586 12.6749ZM16.6253 20.9999C16.6253 21.3415 16.342 21.6249 16.0003 21.6249C15.6586 21.6249 15.3753 21.3415 15.3753 20.9999V18.4999C15.3753 18.1582 15.6586 17.8749 16.0003 17.8749C16.342 17.8749 16.6253 18.1582 16.6253 18.4999V20.9999Z" fill="white"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 1V11M1 6H11" stroke="#0B0D0F" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

function DashboardContent() {
  const searchParams = useSearchParams();
  const showAllTasks = searchParams.get("tasks") === "all";
  const [openNewTask, setOpenNewTask] = useState(false);

  const newTaskButton = (
    <button
      onClick={() => setOpenNewTask(true)}
      className="flex items-center gap-2"
      style={{
        background: "#A2CE3A",
        border: "none",
        borderRadius: "100px",
        padding: "10px 18px",
        color: "#0B0D0F",
        fontFamily: "var(--font-mona-sans, sans-serif)",
        fontWeight: 600,
        fontSize: "13px",
        cursor: "pointer",
      }}
    >
      <PlusIcon /> New Task
    </button>
  );

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar
        pageTitle="Dashboard"
        pageIcon={<ManagerDashboardIcon />}
        actionSlot={showAllTasks ? newTaskButton : undefined}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {showAllTasks ? (
          <>
            <StatCard title="TOTAL TASKS"      value="5"  trend={{ value: "+1",  isPositive: true }} />
            <StatCard title="COMPLETED TASKS"  value="3" />
            <StatCard title="DUE TASKS"        value="24" trend={{ value: "+12", isPositive: true }} />
            <StatCard title="COMPLETION RATE"  value="1" />
          </>
        ) : (
          <>
            <StatCard title="ACTIVE CLIENTS"      value="5"  trend={{ value: "+1",  isPositive: true }} />
            <StatCard title="APPLICATIONS"        value="3" />
            <StatCard title="INTERVIEWS SECURED"  value="24" trend={{ value: "+12", isPositive: true }} />
            <StatCard title="TASKS DUE TODAY"     value="1" />
          </>
        )}
      </div>

      {showAllTasks ? (
        <AllTasksView
          externalNewTask={openNewTask}
          onExternalNewTaskClose={() => setOpenNewTask(false)}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <ClientWorkload />
            </div>
            <div className="lg:col-span-1">
              <TasksPanel />
            </div>
          </div>
          <RecentApplicationsTable />
        </>
      )}
    </div>
  );
}

export default function ManagerDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#01090B]" />}>
      <DashboardContent />
    </Suspense>
  );
}
