"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

interface Prefs {
  application_updates: boolean;
  interview_invites: boolean;
  marketing_emails: boolean;
}

const ITEMS: { key: keyof Prefs; title: string; description: string }[] = [
  { key: "application_updates", title: "Application Updates", description: "Receive notifications about application updates" },
  { key: "interview_invites", title: "Interview Invites", description: "Receive notifications about interview invites" },
  { key: "marketing_emails", title: "Marketing Emails", description: "Receive notifications about marketing emails" },
];

const DEFAULT_PREFS: Prefs = {
  application_updates: true,
  interview_invites: true,
  marketing_emails: false,
};

const BellIcon = () => (
  <svg width="38" height="33" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01877 24.6875C4.13439 22.6094 5.45314 21.9094 5.99064 18.8969C6.52814 15.8844 6.09689 9.5375 8.46564 5.38125C10.6281 1.575 14.5969 0 18.4688 0C18.5625 0 18.6563 0.00625014 18.75 0.00625014C18.8438 0.00312514 18.9375 0 19.0313 0C22.9031 0 26.8719 1.575 29.0344 5.37812C31.4 9.5375 30.9719 15.8844 31.5094 18.8938C32.0469 21.9063 33.3656 22.6063 35.4813 24.6844C36.3938 25.5813 37.4969 27.0094 37.5 27.9281C37.5031 28.8469 37.0344 29.1813 35.9188 29.65C32.7625 30.9781 28.5438 32.2656 18.75 32.2656C8.95627 32.2656 4.73752 30.9781 1.58127 29.65C0.465641 29.1813 -0.00310948 28.85 1.55152e-05 27.9281C0.00314052 27.0125 1.10627 25.5844 2.01877 24.6875Z" fill="#FFCA28"/>
  </svg>
);

const ToggleActive = () => (
  <svg width="78" height="34" viewBox="0 0 78 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="77.7153" height="34.0005" rx="17.0002" fill="#A2CE3A"/>
    <rect x="14.5713" y="10.9287" width="1.2143" height="12.143" fill="white"/>
    <rect x="27.9287" y="2.42871" width="47.3578" height="29.1433" rx="14.5716" fill="white"/>
  </svg>
);

const ToggleInactive = () => (
  <svg width="78" height="34" viewBox="0 0 78 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="77.7153" height="34.0005" rx="17.0002" fill="#3C3C43" fillOpacity="0.3"/>
    <circle cx="62.5364" cy="17.0002" r="5.46436" stroke="#B3B3B3" strokeWidth="1.2143"/>
    <rect x="2.42871" y="2.42871" width="47.3578" height="29.1433" rx="14.5716" fill="white"/>
  </svg>
);

export default function NotificationsTab() {
  const { toast } = useToast();
  const { status } = useSession();

  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [original, setOriginal] = useState<Prefs>(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/profile/notification-preferences")
      .then((r) => r.json())
      .then((json) => {
        const data = json.data;
        if (data && typeof data === "object" && !Array.isArray(data)) {
          const loaded: Prefs = {
            application_updates: data.application_updates ?? DEFAULT_PREFS.application_updates,
            interview_invites: data.interview_invites ?? DEFAULT_PREFS.interview_invites,
            marketing_emails: data.marketing_emails ?? DEFAULT_PREFS.marketing_emails,
          };
          setPrefs(loaded);
          setOriginal(loaded);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [status]);

  const toggle = (key: keyof Prefs) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleCancel = () => setPrefs(original);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/profile/notification-preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });
      const json = await res.json();
      if (!res.ok) {
        toast({ variant: "error", title: "Save failed", description: json.message || "An error occurred" });
        return;
      }
      setOriginal(prefs);
      toast({ variant: "success", title: "Preferences saved!" });
    } catch {
      toast({ variant: "error", title: "Save failed", description: "An error occurred" });
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
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-white text-lg font-mona-sans font-bold">
          Notification Preferences
        </h2>
        <span className="text-[#95ACCB] text-sm font-mona-sans">{ITEMS.length}</span>
      </div>

      {loading ? (
        <p className="text-[#95ACCB] font-mona-sans text-sm">Loading preferences...</p>
      ) : (
        <>
          {/* Notification Items */}
          <div className="space-y-4">
            {ITEMS.map((item) => (
              <div
                key={item.key}
                className="p-6 rounded-2xl flex items-center justify-between"
                style={{
                  background: "rgba(21, 99, 116, 0.1)",
                  border: "0.5px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <BellIcon />
                  </div>
                  <div>
                    <h3 className="text-white font-mona-sans font-semibold text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#95ACCB] text-sm font-mona-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggle(item.key)}
                  className="flex-shrink-0 transition-opacity hover:opacity-80"
                >
                  {prefs[item.key] ? <ToggleActive /> : <ToggleInactive />}
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 mt-8">
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
              style={{ background: "#A2CE3A", color: "#121212", height: "48px" }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
