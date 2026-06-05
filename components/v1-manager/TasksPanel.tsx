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

const mockTasks: Task[] = [
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
          href="/v1/manager/tasks"
          className="text-[#95ACCB] text-xs font-mona-sans hover:text-white transition-colors flex items-center gap-1"
        >
          View all →
        </Link>
      </div>

      {/* Task List */}
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
    </div>
  );
}
