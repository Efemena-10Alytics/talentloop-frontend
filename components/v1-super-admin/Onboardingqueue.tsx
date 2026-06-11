"use client";

import { useState } from "react";

type PackageType = "Premium" | "Comprehensive" | "Platinum" | "Basic";

interface OnboardingClient {
  initials: string;
  initialsColor: string;
  name: string;
  email: string;
  pkg: PackageType;
  payment: string;
  assigned: boolean;
}

const mockQueue: OnboardingClient[] = [
  { initials: "AN", initialsColor: "#A2CE3A", name: "Adaeze Nwosu",    email: "adaeze@email.com", pkg: "Premium",       payment: "Full Payment",   assigned: false },
  { initials: "TK", initialsColor: "#9B59B6", name: "Taiwo Kolade",    email: "taiwo@email.com",  pkg: "Comprehensive", payment: "2 Installments", assigned: false },
  { initials: "PM", initialsColor: "#3498DB", name: "Priya Mehta",     email: "priya@email.com",  pkg: "Platinum",      payment: "Full Payment",   assigned: false },
  { initials: "OA", initialsColor: "#F1C40F", name: "Olumide Adeyemi", email: "adaeze@email.com", pkg: "Basic",         payment: "2 Installments", assigned: true  },
  { initials: "AN", initialsColor: "#A2CE3A", name: "Adaeze Nwosu",    email: "adaeze@email.com", pkg: "Premium",       payment: "2 Installments", assigned: true  },
];

const pkgConfig: Record<PackageType, { color: string; bg: string; border: string }> = {
  Premium:       { color: "#34C759", bg: "#14AE5C1A",              border: "rgba(52,199,89,0.25)"   },
  Comprehensive: { color: "#FF9500", bg: "rgba(255,149,0,0.1)",    border: "rgba(255,149,0,0.25)"   },
  Platinum:      { color: "#CB30E0", bg: "rgba(203,48,224,0.1)",   border: "rgba(203,48,224,0.25)"  },
  Basic:         { color: "#0088FF", bg: "rgba(0,136,255,0.1)",    border: "rgba(0,136,255,0.25)"   },
};

const MANAGERS = [
  "Happiness Abiye Ibrahim",
  "Oluwaseun Gabby Owolabi",
  "Kareemah Oyinkansola Alli-Kamal",
  "Karimat Adesina",
  "Ayotomide Ilesanmi",
  "Mofesolamisi Elusakin",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "14px 16px",
  color: "#E8EFF1",
  fontFamily: "var(--font-mona-sans, sans-serif)",
  fontSize: "14px",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#E8EFF1",
  fontFamily: "var(--font-mona-sans, sans-serif)",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "8px",
};

interface AssignForm {
  manager: string;
  startDate: string;
  notifyManager: boolean;
  sendWelcome: boolean;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="relative flex-shrink-0"
      style={{
        width: "48px",
        height: "26px",
        borderRadius: "13px",
        background: checked ? "#A2CE3A" : "rgba(255,255,255,0.15)",
        border: "none",
        cursor: "pointer",
        transition: "background 0.2s",
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: checked ? "25px" : "3px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "9px",
          fontWeight: 700,
          color: checked ? "#A2CE3A" : "#657997",
        }}
      >
        {checked ? "I" : ""}
      </span>
    </button>
  );
}

export default function OnboardingQueue() {
  const [assignedMap, setAssignedMap] = useState<Record<number, boolean>>(
    Object.fromEntries(mockQueue.map((c, i) => [i, c.assigned]))
  );

  const [step, setStep] = useState<"closed" | "form" | "confirm">("closed");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [form, setForm] = useState<AssignForm>({
    manager: "",
    startDate: "",
    notifyManager: true,
    sendWelcome: true,
  });

  const activeClient = activeIdx !== null ? mockQueue[activeIdx] : null;

  const openAssign = (i: number) => {
    setActiveIdx(i);
    setForm({ manager: "", startDate: "", notifyManager: true, sendWelcome: true });
    setStep("form");
  };

  const handleFormAssign = () => {
    if (!form.manager || !form.startDate) return;
    setStep("confirm");
  };

  const handleConfirm = () => {
    if (activeIdx !== null) {
      setAssignedMap((prev) => ({ ...prev, [activeIdx]: true }));
    }
    setStep("closed");
    setActiveIdx(null);
  };

  const handleCancel = () => {
    setStep("closed");
    setActiveIdx(null);
  };

  const managerFirstName = form.manager ? form.manager.split(" ")[0] : "";

  return (
    <>
      <div
        className="rounded-2xl p-5"
        style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
      >
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-white font-mona-sans font-semibold text-base">
            Onboarding Queue
          </h2>
          <span className="font-mona-sans text-sm" style={{ color: "#95ACCB" }}>
            {mockQueue.length + 1}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "220px" }} />
              <col style={{ width: "150px" }} />
              <col style={{ width: "140px" }} />
              <col style={{ width: "130px" }} />
            </colgroup>
            <thead>
              <tr style={{ borderBottom: "1px solid #FFFFFF0D" }}>
                {["Client", "Package", "Payment", "Action"].map((h) => (
                  <th
                    key={h}
                    className="text-left pb-3 pr-4"
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 700,
                      fontFamily: "var(--font-mona-sans, sans-serif)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockQueue.map((client, i) => {
                const pkg = pkgConfig[client.pkg];
                const isAssigned = assignedMap[i];
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #FFFFFF06" }}>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: client.initialsColor }}
                        >
                          <span className="text-white text-xs font-semibold font-mona-sans">
                            {client.initials}
                          </span>
                        </div>
                        <div>
                          <p className="font-mona-sans font-medium text-sm" style={{ color: "#fff" }}>
                            {client.name}
                          </p>
                          <p className="font-mona-sans text-xs" style={{ color: "#657997" }}>
                            {client.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 pr-4">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          fontFamily: "var(--font-plus-jakarta-sans, sans-serif)",
                          color: pkg.color,
                          background: pkg.bg,
                          border: `1px solid ${pkg.border}`,
                        }}
                      >
                        {client.pkg}
                      </span>
                    </td>

                    <td className="py-3 pr-4">
                      <span className="font-mona-sans text-sm" style={{ color: "#95ACCB" }}>
                        {client.payment}
                      </span>
                    </td>

                    <td className="py-3">
                      <button
                        onClick={() => !isAssigned && openAssign(i)}
                        className="font-mona-sans font-semibold text-sm rounded-full transition-all"
                        style={{
                          background: isAssigned ? "rgba(162,206,58,0.12)" : "#A2CE3A",
                          color: isAssigned ? "#A2CE3A" : "#0B0D0F",
                          border: isAssigned ? "1px solid rgba(162,206,58,0.25)" : "none",
                          padding: "7px 20px",
                          cursor: isAssigned ? "default" : "pointer",
                        }}
                      >
                        {isAssigned ? "Assigned" : "Assign"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal Overlay ── */}
      {step !== "closed" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) handleCancel(); }}
        >

          {/* ── Step 1: Assign Client Manager Form ── */}
          {step === "form" && activeClient && (
            <div
              className="w-full max-w-lg mx-4 rounded-2xl p-8"
              style={{ background: "#121C1E", border: "0.5px solid rgba(255,255,255,0.1)" }}
            >
              <div className="text-center mb-6">
                <h2 className="font-mona-sans font-bold text-2xl text-white mb-1">
                  Assign Client Manager
                </h2>
                <p className="font-mona-sans text-sm" style={{ color: "#657997" }}>
                  Workload Balancer
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Name — read-only */}
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    value={activeClient.name}
                    readOnly
                    style={{ ...inputStyle, opacity: 0.7 }}
                  />
                </div>

                {/* Email — read-only */}
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="text"
                    value={activeClient.email}
                    readOnly
                    style={{ ...inputStyle, opacity: 0.7 }}
                  />
                </div>

                {/* Package — read-only */}
                <div>
                  <label style={labelStyle}>Package</label>
                  <input
                    type="text"
                    value={activeClient.pkg}
                    readOnly
                    style={{ ...inputStyle, opacity: 0.7 }}
                  />
                </div>

                {/* Assign Manager */}
                <div>
                  <label style={labelStyle}>Assign Manager</label>
                  <div className="relative">
                    <select
                      value={form.manager}
                      onChange={(e) => setForm((f) => ({ ...f, manager: e.target.value }))}
                      style={{
                        ...inputStyle,
                        appearance: "none",
                        paddingRight: "40px",
                        color: form.manager ? "#E8EFF1" : "#657997",
                      }}
                    >
                      <option value="" disabled>Select</option>
                      {MANAGERS.map((m) => (
                        <option key={m} value={m} style={{ background: "#121C1E" }}>{m}</option>
                      ))}
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5l4 4 4-4" stroke="#657997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label style={labelStyle}>Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                      style={{
                        ...inputStyle,
                        paddingRight: "40px",
                        colorScheme: "dark",
                        color: form.startDate ? "#E8EFF1" : "#657997",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="flex-1 font-mona-sans font-semibold text-sm py-3 rounded-full transition-opacity hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.08)", color: "#E8EFF1", border: "none" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFormAssign}
                  className="flex-1 font-mona-sans font-semibold text-sm py-3 rounded-full transition-opacity hover:opacity-90"
                  style={{
                    background: form.manager && form.startDate ? "#A2CE3A" : "rgba(162,206,58,0.3)",
                    color: "#0B0D0F",
                    border: "none",
                    cursor: form.manager && form.startDate ? "pointer" : "not-allowed",
                  }}
                >
                  Assign
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Confirmation Modal ── */}
          {step === "confirm" && activeClient && (
            <div
              className="w-full max-w-lg mx-4 rounded-2xl p-8"
              style={{ background: "#121C1E", border: "0.5px solid rgba(255,255,255,0.1)" }}
            >
              {/* Preview banner */}
              <div
                className="rounded-xl p-5 mb-6"
                style={{ background: "rgba(13,74,39,0.6)", border: "1px solid rgba(162,206,58,0.3)" }}
              >
                <h3 className="font-mona-sans font-bold text-xl text-white mb-1">
                  Assignment Preview
                </h3>
                <p className="font-mona-sans text-sm" style={{ color: "#A2CE3A" }}>
                  {activeClient.name.split(" ")[0]} → assigned to {managerFirstName}
                </p>
              </div>

              {/* Toggles */}
              <div className="space-y-5 mb-8">
                <div className="flex items-center justify-between">
                  <span className="font-mona-sans text-sm" style={{ color: "#E8EFF1" }}>
                    Notify manager immediately
                  </span>
                  <Toggle
                    checked={form.notifyManager}
                    onChange={() => setForm((f) => ({ ...f, notifyManager: !f.notifyManager }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mona-sans text-sm" style={{ color: "#E8EFF1" }}>
                    Send welcome email to client
                  </span>
                  <Toggle
                    checked={form.sendWelcome}
                    onChange={() => setForm((f) => ({ ...f, sendWelcome: !f.sendWelcome }))}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep("form")}
                  className="flex-1 font-mona-sans font-semibold text-sm py-3 rounded-full transition-opacity hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.08)", color: "#E8EFF1", border: "none" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 font-mona-sans font-semibold text-sm py-3 rounded-full transition-opacity hover:opacity-90"
                  style={{ background: "#A2CE3A", color: "#0B0D0F", border: "none" }}
                >
                  Confirm Assignment
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}