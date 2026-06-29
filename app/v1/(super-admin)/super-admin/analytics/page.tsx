"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";

const AnalyticsNavIcon = () => (
  <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="28" rx="8" fill="#0C6746"/>
    <path d="M23.3077 20.6087H22.6154V6.69565C22.6154 6.51115 22.5424 6.33421 22.4126 6.20375C22.2828 6.07329 22.1067 6 21.9231 6H17.0769C16.8933 6 16.7172 6.07329 16.5874 6.20375C16.4576 6.33421 16.3846 6.51115 16.3846 6.69565V10.1739H12.2308C12.0472 10.1739 11.8711 10.2472 11.7412 10.3777C11.6114 10.5081 11.5385 10.6851 11.5385 10.8696V14.3478H8.07692C7.89331 14.3478 7.71722 14.4211 7.58739 14.5516C7.45755 14.682 7.38462 14.859 7.38462 15.0435V20.6087H6.69231C6.5087 20.6087 6.33261 20.682 6.20277 20.8124C6.07294 20.9429 6 21.1198 6 21.3043C6 21.4888 6.07294 21.6658 6.20277 21.7962C6.33261 21.9267 6.5087 22 6.69231 22H23.3077C23.4913 22 23.6674 21.9267 23.7972 21.7962C23.9271 21.6658 24 21.4888 24 21.3043C24 21.1198 23.9271 20.9429 23.7972 20.8124C23.6674 20.682 23.4913 20.6087 23.3077 20.6087ZM17.7692 7.3913H21.2308V20.6087H17.7692V7.3913ZM12.9231 11.5652H16.3846V20.6087H12.9231V11.5652ZM8.76923 15.7391H11.5385V20.6087H8.76923V15.7391Z" fill="white"/>
  </svg>
);

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v10M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const managers = ["Happiness","Karimah","Kareemah","Abdullahi","Ayo","More","Monsurah","Mubaraq","Gabby","Bisola","Abdulrahaman"];

const assignedClientsData = managers.map((m, i) => ({
  name: m,
  clients: [13,12,11,9,9,9,7,7,7,6,5][i],
}));

const applicationsData = managers.map((m, i) => ({
  name: m,
  target:       [150,150,175,150,150,168,190,150,161,150,150][i],
  applications: [137,150,150,150,150,150,150,122,150,122,126][i],
}));

const interviewsData = managers.map((m, i) => ({
  name: m,
  interviews: [5,5,4,3,3,3,2,2,1,1,1][i],
}));

const assessmentsData = managers.map((m, i) => ({
  name: m,
  assessments: [2,2,2,1,1,1,1,0,0,0,0][i],
}));

const chartCardStyle = {
  background: "#1563741A",
  border: "0.5px solid #FFFFFF1A",
  borderRadius: "16px",
  padding: "20px",
};

const axisStyle = { fill: "#657997", fontSize: 10, fontFamily: "var(--font-mona-sans, sans-serif)" };

const gridStyle = { stroke: "rgba(255,255,255,0.05)", strokeDasharray: "0" };

const tooltipStyle = {
  contentStyle: { background: "#0e1a1c", border: "0.5px solid #FFFFFF1A", borderRadius: "8px", fontFamily: "var(--font-mona-sans, sans-serif)", fontSize: "12px", color: "#E8EFF1" },
  cursor: { fill: "rgba(162,206,58,0.05)" },
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("This Week");

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar pageTitle="Analytics - Weekly Report" pageIcon={<AnalyticsNavIcon />} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="ACTIVE CLIENTS"      value="48"  trend={{ value: "+1", isPositive: true }} />
        <StatCard title="APPLICATIONS MADE"   value="670" trend={{ value: "+1", isPositive: true }} />
        <StatCard title="INTERVIEWS SECURED"  value="65"  trend={{ value: "+1", isPositive: true }} />
        <StatCard title="ASSESSMENTS SECURED" value="25"  trend={{ value: "+1", isPositive: true }} />
      </div>

      {/* Charts outer card */}
      <div className="rounded-2xl p-5" style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}>
        {/* Toolbar */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <button
            className="flex items-center gap-2 font-mona-sans font-semibold text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-90"
            style={{ background: "#A2CE3A", color: "#0B0D0F" }}
          >
            Export <ExportIcon />
          </button>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="font-mona-sans text-sm px-3 py-2 rounded-xl outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #FFFFFF1A", color: "#95ACCB" }}
          >
            <option>This Week</option>
            <option>Today</option>
            <option>This Month</option>
          </select>
        </div>

        {/* 2x2 chart grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Chart 1 — Assigned Clients */}
          <div style={chartCardStyle}>
            <h3 className="font-mona-sans font-semibold text-base text-white mb-4">Number Of Assigned Clients</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={assignedClientsData} barCategoryGap="35%" margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid vertical={false} {...gridStyle} />
                <XAxis dataKey="name" tick={axisStyle} angle={-45} textAnchor="end" interval={0} />
                <YAxis tick={axisStyle} />
                <Tooltip {...tooltipStyle} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#95ACCB", fontFamily: "var(--font-mona-sans, sans-serif)", paddingTop: "8px" }}
                  formatter={() => "Assigned Clients"}
                />
                <Bar dataKey="clients" name="Assigned Clients" fill="#A2CE3A" radius={[3, 3, 0, 0]} maxBarSize={28}>
                  {assignedClientsData.map((_, i) => (
                    <Cell key={i} fill="#A2CE3A" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 — Applications Made */}
          <div style={chartCardStyle}>
            <h3 className="font-mona-sans font-semibold text-base text-white mb-4">Number Of Applications Made</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={applicationsData} barCategoryGap="25%" barGap={2} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
                <CartesianGrid vertical={false} {...gridStyle} />
                <XAxis dataKey="name" tick={axisStyle} angle={-45} textAnchor="end" interval={0} />
                <YAxis tick={axisStyle} domain={[0, 220]} />
                <Tooltip {...tooltipStyle} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#95ACCB", fontFamily: "var(--font-mona-sans, sans-serif)", paddingTop: "8px" }}
                />
                <Bar dataKey="target"       name="Target"            fill="rgba(162,206,58,0.25)" radius={[3, 3, 0, 0]} maxBarSize={16} />
                <Bar dataKey="applications" name="Applications Made"  fill="#A2CE3A"               radius={[3, 3, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3 — Interviews Secured */}
          <div style={chartCardStyle}>
            <h3 className="font-mona-sans font-semibold text-base text-white mb-4">Number Of Interviews Secured</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={interviewsData} barCategoryGap="35%" margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid vertical={false} {...gridStyle} />
                <XAxis dataKey="name" tick={axisStyle} angle={-45} textAnchor="end" interval={0} />
                <YAxis tick={axisStyle} />
                <Tooltip {...tooltipStyle} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#95ACCB", fontFamily: "var(--font-mona-sans, sans-serif)", paddingTop: "8px" }}
                  formatter={() => "Interviews Secured"}
                />
                <Bar dataKey="interviews" name="Interviews Secured" fill="#A2CE3A" radius={[3, 3, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 4 — Assessment Secured */}
          <div style={chartCardStyle}>
            <h3 className="font-mona-sans font-semibold text-base text-white mb-4">Number Of Assessment Secured</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={assessmentsData} barCategoryGap="35%" margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid vertical={false} {...gridStyle} />
                <XAxis dataKey="name" tick={axisStyle} angle={-45} textAnchor="end" interval={0} />
                <YAxis tick={axisStyle} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#95ACCB", fontFamily: "var(--font-mona-sans, sans-serif)", paddingTop: "8px" }}
                  formatter={() => "Assessment Secured"}
                />
                <Bar dataKey="assessments" name="Assessment Secured" fill="#A2CE3A" radius={[3, 3, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}