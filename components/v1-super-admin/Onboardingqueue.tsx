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

export default function OnboardingQueue() {
  const [assignedMap, setAssignedMap] = useState<Record<number, boolean>>(
    Object.fromEntries(mockQueue.map((c, i) => [i, c.assigned]))
  );

  const handleAssign = (i: number) => {
    setAssignedMap((prev) => ({ ...prev, [i]: true }));
    // TODO: wire up to API — POST /v1/super-admin/clients/:id/assign
  };

  return (
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
                  {/* Client */}
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

                  {/* Package */}
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

                  {/* Payment */}
                  <td className="py-3 pr-4">
                    <span className="font-mona-sans text-sm" style={{ color: "#95ACCB" }}>
                      {client.payment}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3">
                    <button
                      onClick={() => !isAssigned && handleAssign(i)}
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
  );
}