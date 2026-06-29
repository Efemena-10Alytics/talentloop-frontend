"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Select } from "@/components/ui/Select";
import type { SelectOption } from "@/components/ui/Select";

interface UpdateApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: UpdateApplicationFormData) => void;
  initialData?: Partial<UpdateApplicationFormData>;
}

export interface UpdateApplicationFormData {
  status: string;
  location: string;
  cvVersionUsed: string;
  interviewDate: string;
  notes: string;
  notifyClient: boolean;
}

const MODAL_BG = "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)";

const statusOptions: SelectOption[] = [
  { value: "first_stage_interview", label: "First Stage Interview" },
  { value: "second_stage_interview", label: "Second Stage Interview" },
  { value: "third_stage_interview", label: "Third Stage Interview" },
  { value: "assessment", label: "Assessment" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const cvVersionOptions: SelectOption[] = [
  { value: "cv_v3_optimised", label: "CV_Adaeze_Nwosu_v3_Optimised.pdf" },
  { value: "cv_v1_optimised", label: "CV_Adaeze_Nwosu_v1_Optimised.pdf" },
  { value: "cv_adaeze", label: "CV_Adaeze_Nwosu" },
  { value: "cv_data_analyst", label: "CV_Adaeze_Nwosu_Data Analyst" },
];

const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="relative inline-flex items-center transition-colors"
    style={{
      width: "48px",
      height: "28px",
      borderRadius: "100px",
      background: checked ? "#A2CE3A" : "#FFFFFF1A",
      border: "none",
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        position: "absolute",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: "#fff",
        top: "3px",
        left: checked ? "23px" : "3px",
        transition: "left 0.2s",
      }}
    />
  </button>
);

export default function UpdateApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: UpdateApplicationModalProps) {
  const [formData, setFormData] = useState<UpdateApplicationFormData>({
    status: initialData?.status || "",
    location: initialData?.location || "",
    cvVersionUsed: initialData?.cvVersionUsed || "",
    interviewDate: initialData?.interviewDate || "",
    notes: initialData?.notes || "",
    notifyClient: initialData?.notifyClient ?? true,
  });

  const handleChange = (field: keyof UpdateApplicationFormData, value: string | boolean) => {
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
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
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
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF99",
                  marginBottom: "8px",
                }}
              >
                Update Application
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
                Edit status and notes
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Status + Location */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Status - custom Select */}
                <div>
                  <label style={labelStyle}>Status</label>
                  <Select
                    placeholder="Select"
                    value={formData.status}
                    onChange={(v) => handleChange("status", v)}
                    options={statusOptions}
                  />
                </div>

                {/* Location */}
                <div>
                  <label style={labelStyle}>Location</label>
                  <input
                    type="text"
                    placeholder="e.g London/Remote"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    style={inputStyle}
                    className="placeholder-[#4E4E4E] focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: CV Version Used + Interview Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* CV Version - custom Select */}
                <div>
                  <label style={labelStyle}>CV Version Used</label>
                  <Select
                    placeholder="Select"
                    value={formData.cvVersionUsed}
                    onChange={(v) => handleChange("cvVersionUsed", v)}
                    options={cvVersionOptions}
                  />
                </div>

                {/* Interview Date */}
                <div>
                  <label style={labelStyle}>Interview Date</label>
                  <label
                    style={{ display: "block", cursor: "pointer" }}
                  >
                    <input
                      type="date"
                      value={formData.interviewDate}
                      onChange={(e) => handleChange("interviewDate", e.target.value)}
                      style={{
                        ...inputStyle,
                        colorScheme: "dark",
                        cursor: "pointer",
                      }}
                      className="focus:border-white/30 transition-colors [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={labelStyle}>Notes (Optional)</label>
                <textarea
                  placeholder="|"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={4}
                  style={{
                    background: "transparent",
                    border: "1px solid #FFFFFF1A",
                    borderRadius: "16px",
                    padding: "16px 20px",
                    color: "#fff",
                    fontFamily: "var(--font-plus-jakarta, sans-serif)",
                    fontSize: "16px",
                    fontWeight: 400,
                    outline: "none",
                    width: "100%",
                    resize: "none",
                  }}
                  className="placeholder-[#4E4E4E] focus:border-white/30 transition-colors"
                />
              </div>

              {/* Notify client toggle */}
              <div className="flex items-center justify-between py-1">
                <span
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "var(--font-plus-jakarta, sans-serif)",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Notify client of status change
                </span>
                <ToggleSwitch
                  checked={formData.notifyClient}
                  onChange={(v) => handleChange("notifyClient", v)}
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
                    letterSpacing: "-0.01em",
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
                    letterSpacing: "-0.01em",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  Update Application
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
