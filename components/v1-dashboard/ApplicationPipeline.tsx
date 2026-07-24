"use client";

import { useState } from "react";
import ApplicationCard from "./ApplicationCard";
import { useEnrollmentApplications, useEnrollmentStats, StatsPeriod } from "@/hooks/useEnrollmentData";
import { Select } from "@/components/ui/Select";

const PERIOD_OPTIONS: { label: string; value: StatsPeriod }[] = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
  { label: "All Time", value: "all" },
];

const STAGES = ["applied", "interview", "assessment", "rejected", "offer"] as const;
const STAGE_LABELS: Record<string, string> = {
  applied: "Applied",
  interview: "Interviews",
  assessment: "Assessments",
  rejected: "Rejected",
  offer: "Offer",
};

export default function ApplicationPipeline() {
  const [period, setPeriod] = useState<StatsPeriod>("today");

  const { data: applications = [], isLoading: appsLoading } = useEnrollmentApplications();
  const { data: stats } = useEnrollmentStats(period);

  const getApplicationsByStage = (stage: string) =>
    applications.filter((app) => app.status?.toLowerCase().includes(stage));

  const getStageCount = (stage: string): number => {
    if (stats?.status_breakdown) {
      const key = Object.keys(stats.status_breakdown).find((k) =>
        k.toLowerCase().includes(stage)
      );
      if (key !== undefined) return stats.status_breakdown[key];
    }
    return getApplicationsByStage(stage).length;
  };

  const getDelta = (stage: string): string | null => {
    if (!stats?.deltas) return null;
    const key = Object.keys(stats.deltas).find((k) => k.toLowerCase().includes(stage));
    if (key === undefined) return null;
    const val = stats.deltas[key];
    return val > 0 ? `+${val}` : val < 0 ? `${val}` : null;
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
          <span className="text-[#95ACCB] text-sm font-mona-sans">
            {applications.length}
          </span>
        </div>

        {/* Period Filter */}
        <Select
          value={period}
          onChange={(value) => setPeriod(value as StatsPeriod)}
          options={PERIOD_OPTIONS}
          className="w-40"
        />
      </div>

      {appsLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-[#95ACCB] font-mona-sans text-sm">Loading applications...</p>
        </div>
      ) : (
        /* Pipeline Grid */
        <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
          {STAGES.map((stage) => {
            const stageApps = getApplicationsByStage(stage);
            const count = getStageCount(stage);
            const delta = getDelta(stage);

            return (
              <div
                key={stage}
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
                        {STAGE_LABELS[stage]}
                      </span>
                      {delta && (
                        <span className="text-[#9EFF00] text-xs font-mona-sans">
                          {delta}
                        </span>
                      )}
                    </div>
                    <span className="text-white text-sm font-mona-sans font-bold">
                      {count}
                    </span>
                  </div>
                </div>

                {/* Applications List */}
                <div className="space-y-2">
                  {stageApps.length === 0 ? (
                    <p className="text-[#657997] text-xs font-mona-sans text-center py-4">
                      No applications
                    </p>
                  ) : (
                    stageApps.map((app) => (
                      <ApplicationCard key={app.id} application={app} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
