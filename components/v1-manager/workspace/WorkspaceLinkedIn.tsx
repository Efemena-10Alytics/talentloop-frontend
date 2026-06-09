"use client";

import { useState } from "react";

const checklistItems = [
  "Professional profile photo (clear, high-quality, and professional)",
  "Compelling headline with target role and key expertise",
  'Well-written "About" section highlighting experience, skills, and career goals',
  "Current and previous work experience updated with measurable achievements",
  "Relevant skills added and aligned with target job roles",
  "Industry-specific keywords incorporated throughout the profile",
  "Education and certifications fully updated",
  "Featured section showcasing portfolio, projects, publications, or achievements",
  "Professional banner image relevant to industry or personal brand",
  "Recommendations from colleagues, managers, or clients",
];

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10.667 0.667H2.667C1.933 0.667 1.333 1.267 1.333 2v10.667h1.334V2h8V0.667zm2 2.666H5.333C4.6 3.333 4 3.933 4 4.667v10.666C4 16.067 4.6 16.667 5.333 16.667h7.334C13.4 16.667 14 16.067 14 15.333V4.667C14 3.933 13.4 3.333 12.667 3.333zm0 12H5.333V4.667h7.334v10.666z" fill="#657997"/>
  </svg>
);

export default function WorkspaceLinkedIn() {
  const [email, setEmail]       = useState("example@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [checked, setChecked]   = useState<boolean[]>([true, true, ...Array(8).fill(false)]);

  const toggleCheck = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1563741A",
    border: "1px solid #FFFFFF1A",
    borderRadius: "12px",
    color: "#fff",
    fontFamily: "var(--font-mona-sans, sans-serif)",
    fontSize: "13px",
    padding: "12px 44px 12px 16px",
    outline: "none",
  };

  return (
    <div className="w-full flex justify-center">
    <div className="p-5 max-w-3xl">
      {/* Credentials card */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: "#1563741A", border: "1px solid #FFFFFF1A" }}>
        {/* Email */}
        <p className="font-mona-sans text-xs mb-2" style={{ color: "#95ACCB" }}>
          LinkedIn Email <span style={{ color: "#657997" }}>(provided by client)</span>
        </p>
        <div className="relative mb-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={() => copyToClipboard(email)}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <CopyIcon />
          </button>
        </div>

        {/* Password */}
        <p className="font-mona-sans text-xs mb-2" style={{ color: "#95ACCB" }}>
          Temporary Password <span style={{ color: "#657997" }}>(provided by client)</span>
        </p>
        <div className="relative">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={() => copyToClipboard(password)}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <CopyIcon />
          </button>
        </div>
      </div>

      {/* Checklist */}
      <h3 className="font-mona-sans font-bold text-lg mb-4" style={{ color: "#E8EFF1" }}>
        Optimisation Checklist
      </h3>

      <div className="space-y-2">
        {checklistItems.map((item, i) => (
          <button
            key={i}
            onClick={() => toggleCheck(i)}
            className="w-full flex items-start gap-3 text-left rounded-xl px-4 py-3 transition-colors hover:border-white/20"
            style={{
              background: "#1563741A",
              border: "1px solid #FFFFFF1A",
              cursor: "pointer",
            }}
          >
            {/* Checkbox */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-md mt-0.5"
              style={{
                width: "20px",
                height: "20px",
                background: checked[i] ? "#A2CE3A" : "transparent",
                border: checked[i] ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                transition: "all 0.15s ease",
              }}
            >
              {checked[i] && (
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path d="M1 4.5L4.5 8L11 1" stroke="#0B0D0F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span
              className="font-mona-sans text-sm leading-relaxed"
              style={{ color: checked[i] ? "#E8EFF1" : "#95ACCB" }}
            >
              {item}
            </span>
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}