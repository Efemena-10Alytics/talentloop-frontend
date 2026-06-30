"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const GreyCheckmark = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.33333 0C3.73333 0 0 3.73333 0 8.33333C0 12.9333 3.73333 16.6667 8.33333 16.6667C12.9333 16.6667 16.6667 12.9333 16.6667 8.33333C16.6667 3.73333 12.9333 0 8.33333 0ZM8.33333 15C4.65833 15 1.66667 12.0083 1.66667 8.33333C1.66667 4.65833 4.65833 1.66667 8.33333 1.66667C12.0083 1.66667 15 4.65833 15 8.33333C15 12.0083 12.0083 15 8.33333 15ZM11.5667 5.24167L6.66667 10.1417L5.1 8.575C4.775 8.25 4.25 8.25 3.925 8.575C3.6 8.9 3.6 9.425 3.925 9.75L6.08333 11.9083C6.40833 12.2333 6.93333 12.2333 7.25833 11.9083L12.75 6.41667C13.075 6.09167 13.075 5.56667 12.75 5.24167C12.425 4.91667 11.8917 4.91667 11.5667 5.24167Z" fill="#A4A4A4"/>
  </svg>
);

const GreenCheckmark = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.33333 0C3.73333 0 0 3.73333 0 8.33333C0 12.9333 3.73333 16.6667 8.33333 16.6667C12.9333 16.6667 16.6667 12.9333 16.6667 8.33333C16.6667 3.73333 12.9333 0 8.33333 0ZM8.33333 15C4.65833 15 1.66667 12.0083 1.66667 8.33333C1.66667 4.65833 4.65833 1.66667 8.33333 1.66667C12.0083 1.66667 15 4.65833 15 8.33333C15 12.0083 12.0083 15 8.33333 15ZM11.5667 5.24167L6.66667 10.1417L5.1 8.575C4.775 8.25 4.25 8.25 3.925 8.575C3.6 8.9 3.6 9.425 3.925 9.75L6.08333 11.9083C6.40833 12.2333 6.93333 12.2333 7.25833 11.9083L12.75 6.41667C13.075 6.09167 13.075 5.56667 12.75 5.24167C12.425 4.91667 11.8917 4.91667 11.5667 5.24167Z" fill="#1FC16B"/>
  </svg>
);

export default function SecurityTab() {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  // Password validation
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasMinLength = newPassword.length >= 8;

  // Password strength calculation
  const getPasswordStrength = () => {
    let strength = 0;
    if (hasUppercase) strength++;
    if (hasSpecialChar) strength++;
    if (hasNumber) strength++;
    if (hasMinLength) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength();

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSave = async () => {
    if (!currentPassword) {
      toast({ variant: "error", title: "Current password is required" });
      return;
    }
    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecialChar) {
      toast({ variant: "error", title: "New password doesn't meet requirements" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ variant: "error", title: "Passwords do not match" });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast({ variant: "error", title: "Failed to change password", description: json.message || "An error occurred" });
        return;
      }
      toast({ variant: "success", title: json.message || "Password changed successfully." });
      handleCancel();
    } catch {
      toast({ variant: "error", title: "Failed to change password", description: "An error occurred" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="rounded-[20px] p-6 lg:p-8"
      style={{
        background: "rgba(21, 99, 116, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <h2 className="text-white text-lg font-mona-sans font-bold mb-8">
        Change Password
      </h2>

      <div className="max-w-2xl">
        {/* Current Password */}
        <div className="mb-6">
          <label className="block text-white text-sm font-mona-sans mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 pr-12 text-white placeholder:text-white/60 font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4C5 4 1.73 7.11 1 10C1.73 12.89 5 16 10 16C15 16 18.27 12.89 19 10C18.27 7.11 15 4 10 4ZM10 14C7.79 14 6 12.21 6 10C6 7.79 7.79 6 10 6C12.21 6 14 7.79 14 10C14 12.21 12.21 14 10 14ZM10 8C8.9 8 8 8.9 8 10C8 11.1 8.9 12 10 12C11.1 12 12 11.1 12 10C12 8.9 11.1 8 10 8Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-white text-sm font-mona-sans mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 pr-12 text-white placeholder:text-white/60 font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4C5 4 1.73 7.11 1 10C1.73 12.89 5 16 10 16C15 16 18.27 12.89 19 10C18.27 7.11 15 4 10 4ZM10 14C7.79 14 6 12.21 6 10C6 7.79 7.79 6 10 6C12.21 6 14 7.79 14 10C14 12.21 12.21 14 10 14ZM10 8C8.9 8 8 8.9 8 10C8 11.1 8.9 12 10 12C11.1 12 12 11.1 12 10C12 8.9 11.1 8 10 8Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Password Strength Indicator */}
        {newPassword && (
          <div className="mb-6">
            <div className="flex gap-2 mb-3">
              <div
                className="h-1 flex-1 rounded-full transition-colors"
                style={{
                  backgroundColor: passwordStrength >= 1 ? "#FB3748" : "#E5E5E5",
                }}
              />
              <div
                className="h-1 flex-1 rounded-full transition-colors"
                style={{
                  backgroundColor: passwordStrength >= 2 ? "#FFDB43" : "#E5E5E5",
                }}
              />
              <div
                className="h-1 flex-1 rounded-full transition-colors"
                style={{
                  backgroundColor: passwordStrength >= 3 ? "#1FC16B" : "#E5E5E5",
                }}
              />
            </div>

            {/* Validation Checklist */}
            <div className="space-y-2">
              <p className="text-white/80 text-sm font-mona-sans mb-2">
                Must contain at least:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  {hasUppercase ? <GreenCheckmark /> : <GreyCheckmark />}
                  <span className={`text-sm font-mona-sans ${hasUppercase ? "text-[#1FC16B]" : "text-white/60"}`}>
                    At least 1 uppercase
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasNumber ? <GreenCheckmark /> : <GreyCheckmark />}
                  <span className={`text-sm font-mona-sans ${hasNumber ? "text-[#1FC16B]" : "text-white/60"}`}>
                    At least 1 number
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasSpecialChar ? <GreenCheckmark /> : <GreyCheckmark />}
                  <span className={`text-sm font-mona-sans ${hasSpecialChar ? "text-[#1FC16B]" : "text-white/60"}`}>
                    At least 1 special character
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasMinLength ? <GreenCheckmark /> : <GreyCheckmark />}
                  <span className={`text-sm font-mona-sans ${hasMinLength ? "text-[#1FC16B]" : "text-white/60"}`}>
                    At least 8 character
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div className="mb-8">
          <label className="block text-white text-sm font-mona-sans mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 pr-12 text-white placeholder:text-white/60 font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4C5 4 1.73 7.11 1 10C1.73 12.89 5 16 10 16C15 16 18.27 12.89 19 10C18.27 7.11 15 4 10 4ZM10 14C7.79 14 6 12.21 6 10C6 7.79 7.79 6 10 6C12.21 6 14 7.79 14 10C14 12.21 12.21 14 10 14ZM10 8C8.9 8 8 8.9 8 10C8 11.1 8.9 12 10 12C11.1 12 12 11.1 12 10C12 8.9 11.1 8 10 8Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={handleCancel}
            disabled={saving}
            className="px-8 py-3 rounded-[10px] font-mona-sans font-medium text-sm transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{
              background: "rgba(118, 118, 128, 0.12)",
              border: "1.5px solid rgba(255, 255, 255, 0.1)",
              color: "#FFFFFF",
              height: "48px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 rounded-[10px] font-mona-sans font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{
              background: "#A2CE3A",
              color: "#121212",
              height: "48px",
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
