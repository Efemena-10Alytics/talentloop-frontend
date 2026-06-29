"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LogApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: LogApplicationFormData) => void;
}

export interface LogApplicationFormData {
  company: string;
  jobTitle: string;
  jobUrl: string;
  dateApplied: string;
}

const MODAL_BG = "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)";

export default function LogApplicationModal({ isOpen, onClose, onSubmit }: LogApplicationModalProps) {
  const [formData, setFormData] = useState<LogApplicationFormData>({
    company: "",
    jobTitle: "",
    jobUrl: "",
    dateApplied: "",
  });

  const handleChange = (field: keyof LogApplicationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "1px solid #FFFFFF1A",
    borderRadius: "40px",
    height: "52px",
    padding: "0 20px",
    color: "#fff",
    fontFamily: "var(--font-plus-jakarta, sans-serif)",
    fontSize: "16px",
    fontWeight: 400,
    outline: "none",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    color: "#FFFFFF",
    fontFamily: "var(--font-plus-jakarta, sans-serif)",
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "8px",
    display: "block",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: "#000000DB" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-3xl"
            style={{
              background: MODAL_BG,
              borderRadius: "24px",
              padding: "53px 40px",
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2
                style={{
                  fontFamily: "var(--font-mona-sans, sans-serif)",
                  fontWeight: 600,
                  fontSize: "32px",
                  lineHeight: "130%",
                  letterSpacing: "-2%",
                  color: "#FFFFFF99",
                  marginBottom: "8px",
                }}
              >
                Log New Application
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta, sans-serif)",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  color: "#FFFFFF99",
                }}
              >
                Record a job application for a client
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company */}
              <div>
                <label style={labelStyle}>Company</label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  style={inputStyle}
                  className="placeholder-[#4E4E4E] focus:border-white/30 transition-colors"
                />
              </div>

              {/* Job Title */}
              <div>
                <label style={labelStyle}>Job Title</label>
                <input
                  type="text"
                  placeholder="e.g Data Analyst"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  style={inputStyle}
                  className="placeholder-[#4E4E4E] focus:border-white/30 transition-colors"
                />
              </div>

              {/* Job URL */}
              <div>
                <label style={labelStyle}>Job URL</label>
                <input
                  type="url"
                  placeholder="https://jobsearch.url.com"
                  value={formData.jobUrl}
                  onChange={(e) => handleChange("jobUrl", e.target.value)}
                  style={inputStyle}
                  className="placeholder-[#4E4E4E] focus:border-white/30 transition-colors"
                />
              </div>

              {/* Date Applied */}
              <div>
                <label style={labelStyle}>Date Applied</label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={formData.dateApplied}
                  onChange={(e) => handleChange("dateApplied", e.target.value)}
                  style={inputStyle}
                  className="placeholder-[#4E4E4E] focus:border-white/30 transition-colors"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: "#7676801F",
                    border: "1.5px solid #FFFFFF1A",
                    borderRadius: "90px",
                    height: "48px",
                    padding: "0 32px",
                    color: "#727272",
                    fontFamily: "var(--font-mona-sans, sans-serif)",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-1%",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#A2CE3A",
                    border: "none",
                    borderRadius: "90px",
                    height: "48px",
                    padding: "0 32px",
                    color: "#0F0F0F",
                    fontFamily: "var(--font-mona-sans, sans-serif)",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-1%",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  Log Application
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
