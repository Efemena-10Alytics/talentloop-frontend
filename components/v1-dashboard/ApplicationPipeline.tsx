"use client";

import { useState } from "react";
import ApplicationCard from "./ApplicationCard";

type Application = {
  id: string;
  company: string;
  position: string;
  location: string;
  date: string;
  status: "Sponsored" | "Call Scheduled" | "Open" | "Done";
  stage: "Applied" | "Interviews" | "Assessments" | "Rejected" | "Offer";
};

const sampleApplications: Application[] = [
  {
    id: "1",
    company: "Lloyds Banking",
    position: "Data Analyst",
    location: "London",
    date: "12 May",
    status: "Sponsored",
    stage: "Applied",
  },
  {
    id: "2",
    company: "Deloitte",
    position: "BI Consultant",
    location: "Remote",
    date: "12 May",
    status: "Open",
    stage: "Applied",
  },
  {
    id: "3",
    company: "Deloitte",
    position: "BI Consultant",
    location: "Remote",
    date: "12 May",
    status: "Open",
    stage: "Applied",
  },
  {
    id: "4",
    company: "Deloitte",
    position: "BI Consultant",
    location: "Remote",
    date: "12 May",
    status: "Open",
    stage: "Applied",
  },
  {
    id: "5",
    company: "Deloitte",
    position: "BI Consultant",
    location: "Remote",
    date: "12 May",
    status: "Open",
    stage: "Applied",
  },
  {
    id: "6",
    company: "Barclays",
    position: "Data Analyst",
    location: "London",
    date: "22 May",
    status: "Sponsored",
    stage: "Interviews",
  },
  {
    id: "7",
    company: "NatWest",
    position: "Data Analyst",
    location: "Manchester",
    date: "24 May",
    status: "Open",
    stage: "Interviews",
  },
  {
    id: "8",
    company: "Deloitte",
    position: "BI Consultant",
    location: "Remote",
    date: "12 May",
    status: "Done",
    stage: "Interviews",
  },
  {
    id: "9",
    company: "Lloyds Banking",
    position: "Data Analyst",
    location: "London",
    date: "12 May",
    status: "Call Scheduled",
    stage: "Assessments",
  },
  {
    id: "10",
    company: "Deloitte",
    position: "BI Consultant",
    location: "Remote",
    date: "12 May",
    status: "Done",
    stage: "Assessments",
  },
  {
    id: "11",
    company: "Lloyds Banking",
    position: "Data Analyst",
    location: "London",
    date: "12 May",
    status: "Sponsored",
    stage: "Rejected",
  },
  {
    id: "12",
    company: "Lloyds Banking",
    position: "Data Analyst",
    location: "London",
    date: "12 May",
    status: "Sponsored",
    stage: "Offer",
  },
  {
    id: "13",
    company: "Deloitte",
    position: "BI Consultant",
    location: "Remote",
    date: "12 May",
    status: "Open",
    stage: "Offer",
  },
];

export default function ApplicationPipeline() {
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const stages = [
    { name: "Applied", count: 5, trend: "+12" },
    { name: "Interviews", count: 3, trend: "+2" },
    { name: "Assessments", count: 2, trend: "+1" },
    { name: "Rejected", count: 1 },
    { name: "Offer", count: 5, trend: "+2" },
  ];

  const getApplicationsByStage = (stage: string) => {
    return sampleApplications.filter((app) => app.stage === stage);
  };

  return (
    <div
      className="rounded-[20px] p-6"
      style={{
        background: "rgba(21, 99, 116, 0.1)",
        borderTop: "0.5px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-white text-lg font-mona-sans font-bold">
            Application Pipeline
          </h2>
          <span className="text-[#95ACCB] text-sm font-mona-sans">5</span>
        </div>

        {/* Filter Dropdown */}
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 rounded-lg font-mona-sans text-sm text-white transition-colors cursor-pointer appearance-none"
          style={{
            background: "rgba(21, 99, 116, 0.1)",
            border: "0.5px solid rgba(255, 255, 255, 0.1)",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%2395ACCB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem",
          }}
        >
          <option value="Today" className="bg-[#0B0D0F] text-white">
            Today
          </option>
          <option value="This Week" className="bg-[#0B0D0F] text-white">
            This Week
          </option>
          <option value="This Month" className="bg-[#0B0D0F] text-white">
            This Month
          </option>
          <option value="All Time" className="bg-[#0B0D0F] text-white">
            All Time
          </option>
        </select>
      </div>

      {/* Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {stages.map((stage) => {
          const applications = getApplicationsByStage(stage.name);
          return (
            <div
              key={stage.name}
              className="rounded-2xl p-3"
              style={{
                background: "rgba(21, 99, 116, 0.1)",
                border: "0.5px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Stage Header */}
              <div
                className="rounded-lg p-3 mb-3"
                style={{
                  background: "rgba(21, 99, 116, 0.1)",
                  borderTop: "0.5px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-mona-sans font-semibold uppercase">
                      {stage.name}
                    </span>
                    {stage.trend && (
                      <span className="text-[#9EFF00] text-xs font-mona-sans">
                        {stage.trend}
                      </span>
                    )}
                  </div>
                  <span className="text-white text-sm font-mona-sans font-bold">
                    {stage.count}
                  </span>
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-2">
                {applications.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
