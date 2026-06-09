"use client";

import Link from "next/link";

interface Task {
  title: string;
  priority: "due_today" | "overdue" | "meeting";
  priorityLabel: string;
  priorityColor: string;
  dueTime: string;
  dueLabel?: string;
  statusLabel?: string;
  statusColor?: string;
}

const mockTasks: Task[] = [];
const _allTasks: Task[] = [
  {
    title: "Review Adaeze CV draft v2",
    priority: "due_today",
    priorityLabel: "Due Today",
    priorityColor: "#A2CE3A",
    dueTime: "By 5:00 PM",
    statusLabel: "Done",
    statusColor: "#A2CE3A",
  },
  {
    title: "Upload Priya's optimised CV",
    priority: "overdue",
    priorityLabel: "Overdue",
    priorityColor: "#FF9500",
    dueTime: "Due yesterday",
    statusLabel: undefined,
    statusColor: undefined,
  },
  {
    title: "Review Adaeze CV draft v2",
    priority: "due_today",
    priorityLabel: "Due Today",
    priorityColor: "#A2CE3A",
    dueTime: "By 5:00 PM",
  },
  {
    title: "Interview Prep Session",
    priority: "meeting",
    priorityLabel: "Meeting",
    priorityColor: "#9B59B6",
    dueTime: "3:00 PM · 30 min",
  },
];

const TasksEmptyIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="40" fill="#A2CE3A" fillOpacity="0.24"/>
    <path d="M57.5 19H22.5C21.5717 19 20.6815 19.3687 20.0251 20.0251C19.3687 20.6815 19 21.5717 19 22.5V57.5C19 58.4283 19.3687 59.3185 20.0251 59.9749C20.6815 60.6312 21.5717 61 22.5 61H57.5C58.4283 61 59.3185 60.6312 59.9749 59.9749C60.6312 59.3185 61 58.4283 61 57.5V22.5C61 21.5717 60.6312 20.6815 59.9749 20.0251C59.3185 19.3687 58.4283 19 57.5 19ZM29.5 57.5H22.5V22.5H29.5V57.5ZM50.5 45.25H36.5C36.0359 45.25 35.5908 45.0656 35.2626 44.7374C34.9344 44.4093 34.75 43.9641 34.75 43.5C34.75 43.0359 34.9344 42.5907 35.2626 42.2626C35.5908 41.9344 36.0359 41.75 36.5 41.75H50.5C50.9641 41.75 51.4092 41.9344 51.7374 42.2626C52.0656 42.5907 52.25 43.0359 52.25 43.5C52.25 43.9641 52.0656 44.4093 51.7374 44.7374C51.4092 45.0656 50.9641 45.25 50.5 45.25ZM50.5 38.25H36.5C36.0359 38.25 35.5908 38.0656 35.2626 37.7374C34.9344 37.4092 34.75 36.9641 34.75 36.5C34.75 36.0359 34.9344 35.5908 35.2626 35.2626C35.5908 34.9344 36.0359 34.75 36.5 34.75H50.5C50.9641 34.75 51.4092 34.9344 51.7374 35.2626C52.0656 35.5908 52.25 36.0359 52.25 36.5C52.25 36.9641 52.0656 37.4092 51.7374 37.7374C51.4092 38.0656 50.9641 38.25 50.5 38.25Z" fill="#161719"/>
  </svg>
);

export default function TasksPanel() {
  return (
    <div
      className="rounded-2xl p-5 h-full"
    style={{
              background: "#1563741A",
              border: "0.5px solid #FFFFFF1A",
            }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-white font-mona-sans font-semibold text-base">
            Tasks
          </h2>
          <span className="text-[#95ACCB] text-sm font-mona-sans">4</span>
        </div>
        <Link
          href="/v1/manager/dashboard?tasks=all"
          className="text-[#95ACCB] text-xs font-mona-sans hover:text-white transition-colors flex items-center gap-1"
        >
          View all →
        </Link>
      </div>

      {/* Task List or Empty State */}
      {mockTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <TasksEmptyIcon />
          <p className="text-[#95ACCB] font-mona-sans text-sm text-center">
            Is today your off day?
          </p>
          <button
            style={{
              background: "#A2CE3A",
              border: "none",
              borderRadius: "100px",
              padding: "10px 20px",
              color: "#0B0D0F",
              fontFamily: "var(--font-mona-sans, sans-serif)",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            + Create Task
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {mockTasks.map((task, index) => (
          <div
            key={index}
            className="p-3 rounded-xl"
        style={{
              background: "#15637433",
              border: "1px solid #FFFFFF1A",
            }}
          >
            {/* Priority & Due Info */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-sm"
                  style={{ backgroundColor: task.priorityColor }}
                />
                <span
                  className="text-[10px] font-mona-sans font-medium"
                  style={{ color: task.priorityColor }}
                >
                  {task.priorityLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {task.statusLabel && (
                  <span
                    className="text-[10px] font-mona-sans font-medium"
                    style={{ color: task.statusColor }}
                  >
                    {task.statusLabel}
                  </span>
                )}
                <span className="text-[#657997] text-[10px] font-mona-sans">
                  {task.dueTime}
                </span>
              </div>
            </div>

            {/* Task Title */}
            <p className="text-white font-mona-sans font-medium text-sm">
              {task.title}
            </p>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}
