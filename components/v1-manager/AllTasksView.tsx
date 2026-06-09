"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Select } from "@/components/ui/Select";
import type { SelectOption } from "@/components/ui/Select";

/* ─── Types ─────────────────────────────────────────────────────────────────── */

interface TaskRow {
  client: string;
  priority: "High" | "Medium" | "Low";
  taskTitle: string;
  taskType: string;
  dueDate: string;
  note: string;
  completed: boolean;
}

interface AllTasksViewProps {
  onNewTask?: () => void;
  externalNewTask?: boolean;
  onExternalNewTaskClose?: () => void;
}

/* ─── Mock Data ──────────────────────────────────────────────────────────────── */

const MOCK_NOTE = "Monotonectally optimize B2C interfaces and corporate communities. Dynamically engage exceptional methods of empowerment whereas seamless information. Compellingly initiate compelling synergy vis-a-vis top-line collaboration.";

const initialTasks: TaskRow[] = Array.from({ length: 13 }, (_, i) => ({
  client: "Adaeze Nwosu",
  priority: "High",
  taskTitle: "Optimize Adaeze's CV for Data Analyst role",
  taskType: "CV Optimization",
  dueDate: "14 May, 26",
  note: i % 3 !== 1 ? MOCK_NOTE : "",
  completed: i >= 10,
}));

/* ─── Select options ─────────────────────────────────────────────────────────── */

const clientOptions: SelectOption[] = [
  { value: "adaeze", label: "Adaeze Nwosu" },
  { value: "priya", label: "Priya Sharma" },
  { value: "tom", label: "Tom Harris" },
];

const priorityOptions: SelectOption[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const taskTypeOptions: SelectOption[] = [
  { value: "cv_optimization", label: "CV Optimization" },
  { value: "interview_prep", label: "Interview Prep" },
  { value: "linkedin", label: "LinkedIn Optimization" },
  { value: "job_search", label: "Job Search" },
];

const ITEMS_PER_PAGE = 13;

/* ─── SVG Icons ──────────────────────────────────────────────────────────────── */

const ArrowLeft = () => (
  <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
    <path d="M14.5 6.375H0.75M6.375 12L0.75 6.375L6.375 0.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
    <path d="M1.5 6.375H15.25M9.625 0.75L15.25 6.375L9.625 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BackIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
    <path d="M13 6H1M6 1L1 6L6 11" stroke="#95ACCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 1V11M1 6H11" stroke="#0B0D0F" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ─── Note Modal ─────────────────────────────────────────────────────────────── */

function NoteModal({ note, onClose }: { note: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
          style={{ background: "#000000CC" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-lg rounded-[24px] p-10 text-center"
          style={{ background: "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)" }}
        >
          <h2 className="text-white font-mona-sans font-semibold text-2xl mb-4">Note</h2>
          <p className="text-white/70 font-plus-jakarta text-sm leading-relaxed mb-8">{note}</p>
          <button
            onClick={onClose}
            className="px-10 h-11 rounded-[100px] font-mona-sans text-sm font-medium text-white/70 transition-colors hover:text-white"
            style={{ background: "#7676801F", border: "1.5px solid #FFFFFF1A" }}
          >
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ─── Create Task Modal ──────────────────────────────────────────────────────── */

function CreateTaskModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ title: "", client: "", priority: "", taskType: "", dueDate: "", notes: "" });

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "1px solid #FFFFFF1A",
    borderRadius: "40px",
    height: "52px",
    padding: "0 20px",
    color: "#fff",
    fontFamily: "var(--font-plus-jakarta, sans-serif)",
    fontSize: "16px",
    outline: "none",
    width: "100%",
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
          style={{ background: "#000000CC" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl rounded-[24px] p-10 max-h-[90vh] overflow-y-auto"
          style={{ background: "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-white font-mona-sans font-semibold text-[32px] leading-tight mb-2">New Task</h2>
            <p className="text-white/60 font-plus-jakarta text-base">Assign work to your queue</p>
          </div>

          <div className="space-y-5">
            {/* Task Title */}
            <div>
              <label className="block text-white font-plus-jakarta text-base font-medium mb-2">Task Title</label>
              <input
                type="text"
                placeholder="e.g Optimize Adaeze's CV for Data Analyst role"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                style={inputStyle}
                className="placeholder-[#4E4E4E]"
              />
            </div>

            {/* Client + Priority */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-white font-plus-jakarta text-base font-medium mb-2">Client</label>
                <Select placeholder="Select" value={form.client} onChange={(v) => setForm((p) => ({ ...p, client: v }))} options={clientOptions} />
              </div>
              <div>
                <label className="block text-white font-plus-jakarta text-base font-medium mb-2">Priority</label>
                <Select placeholder="Select" value={form.priority} onChange={(v) => setForm((p) => ({ ...p, priority: v }))} options={priorityOptions} />
              </div>
            </div>

            {/* Task Type + Due Date */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-white font-plus-jakarta text-base font-medium mb-2">Task Type</label>
                <Select placeholder="Select" value={form.taskType} onChange={(v) => setForm((p) => ({ ...p, taskType: v }))} options={taskTypeOptions} />
              </div>
              <div>
                <label className="block text-white font-plus-jakarta text-base font-medium mb-2">Due Date</label>
                <label style={{ display: "block", cursor: "pointer" }}>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
                    style={{ ...inputStyle, colorScheme: "dark", cursor: "pointer" }}
                    className="[&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-white font-plus-jakarta text-base font-medium mb-2">Notes (Optional)</label>
              <textarea
                placeholder="Additional context..."
                value={form.notes}
                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                rows={4}
                style={{
                  background: "transparent",
                  border: "1px solid #FFFFFF1A",
                  borderRadius: "16px",
                  padding: "16px 20px",
                  color: "#fff",
                  fontFamily: "var(--font-plus-jakarta, sans-serif)",
                  fontSize: "16px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                className="placeholder-[#4E4E4E]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 rounded-[90px] font-mona-sans text-sm font-medium"
                style={{ background: "#7676801F", border: "1.5px solid #FFFFFF1A", color: "#727272", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 rounded-[90px] font-mona-sans text-sm font-medium"
                style={{ background: "#A2CE3A", color: "#0F0F0F", cursor: "pointer", border: "none" }}
              >
                Create Task
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */

export default function AllTasksView({ onNewTask, externalNewTask, onExternalNewTaskClose }: AllTasksViewProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskRow[]>(initialTasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [noteText, setNoteText] = useState<string | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const totalPages = 4;

  const paged = tasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const toggleCompleted = (globalIndex: number) => {
    setTasks((prev) =>
      prev.map((t, i) => i === globalIndex ? { ...t, completed: !t.completed } : t)
    );
  };

  const handleBack = () => {
    router.push("/v1/manager/dashboard");
  };

  useEffect(() => {
    if (externalNewTask) {
      setShowCreateTask(true);
    }
  }, [externalNewTask]);

  const handleNewTask = () => {
    if (onNewTask) onNewTask();
    else setShowCreateTask(true);
  };

  const handleCreateTaskClose = () => {
    setShowCreateTask(false);
    onExternalNewTaskClose?.();
  };

  const thStyle: React.CSSProperties = {
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "var(--font-mona-sans, sans-serif)",
    textAlign: "left",
    paddingBottom: "12px",
    paddingRight: "16px",
    borderBottom: "1px solid #FFFFFF0D",
  };

  return (
    <>
      <div
        className="rounded-2xl p-5"
        style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mona-sans font-semibold text-base" style={{ color: "#E8EFF1" }}>
            Task For The Week
          </h2>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#95ACCB] text-sm font-mona-sans hover:text-white transition-colors"
          >
            <BackIcon />
            Back
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "160px" }} />
              <col style={{ width: "90px" }} />
              <col />
              <col style={{ width: "140px" }} />
              <col style={{ width: "110px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "40px" }} />
            </colgroup>
            <thead>
              <tr>
                {["Client", "Priority", "Task Title", "Task Type", "Due Date", "Note", ""].map((h, i) => (
                  <th key={i} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((row, i) => {
                const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + i;
                return (
                  <tr
                    key={i}
                    style={{ borderBottom: "1px solid #FFFFFF06", opacity: row.completed ? 0.4 : 1 }}
                  >
                    <td className="py-3 pr-4" style={{ color: "#E8EFF1", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.client}</td>
                    <td className="py-3 pr-4" style={{ color: "#E8EFF1", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.priority}</td>
                    <td className="py-3 pr-4" style={{ color: "#E8EFF1", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.taskTitle}</td>
                    <td className="py-3 pr-4" style={{ color: "#95ACCB", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.taskType}</td>
                    <td className="py-3 pr-4" style={{ color: "#95ACCB", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)" }}>{row.dueDate}</td>
                    <td className="py-3 pr-4">
                      {row.note ? (
                        <button
                          onClick={() => setNoteText(row.note)}
                          className="hover:opacity-80 transition-opacity"
                          style={{ background: "none", border: "none", color: "#A2CE3A", fontSize: "13px", fontFamily: "var(--font-mona-sans, sans-serif)", cursor: "pointer", padding: 0 }}
                        >
                          Read
                        </button>
                      ) : null}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => toggleCompleted(globalIndex)}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}
                      >
                        {row.completed ? (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect width="18" height="18" rx="3" fill="#A2CE3A"/>
                            <path d="M4 9L7.5 12.5L14 5.5" stroke="#0B0D0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect x="0.5" y="0.5" width="17" height="17" rx="2.5" stroke="#FFFFFF33"/>
                          </svg>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{ opacity: currentPage === 1 ? 0.3 : 1, background: "transparent", border: "none", cursor: currentPage === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center" }}
          >
            <ArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{ width: "32px", height: "32px", borderRadius: "50%", background: currentPage === page ? "#A2CE3A" : "transparent", color: currentPage === page ? "#0B0D0F" : "#95ACCB", border: currentPage === page ? "none" : "1px solid #FFFFFF1A", fontFamily: "var(--font-mona-sans, sans-serif)", fontSize: "13px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{ opacity: currentPage === totalPages ? 0.3 : 1, background: "transparent", border: "none", cursor: currentPage === totalPages ? "not-allowed" : "pointer", display: "flex", alignItems: "center" }}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* Note Modal */}
      {noteText && <NoteModal note={noteText} onClose={() => setNoteText(null)} />}

      {/* Create Task Modal */}
      {showCreateTask && <CreateTaskModal onClose={handleCreateTaskClose} />}
    </>
  );
}
