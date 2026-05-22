"use client";

import { useState } from "react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

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
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "application-updates",
      title: "Application Updates",
      description: "Receive notifications about application updates",
      enabled: true,
    },
    {
      id: "interview-invites",
      title: "Interview Invites",
      description: "Receive notifications about interview invites",
      enabled: true,
    },
    {
      id: "marketing-emails",
      title: "Marketing Emails",
      description: "Receive notifications about marketing emails",
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
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
        <span className="text-[#95ACCB] text-sm font-mona-sans">
          {notifications.length}
        </span>
      </div>

      {/* Notification Items */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
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
                  {notification.title}
                </h3>
                <p className="text-[#95ACCB] text-sm font-mona-sans">
                  {notification.description}
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => toggleNotification(notification.id)}
              className="flex-shrink-0 transition-opacity hover:opacity-80"
            >
              {notification.enabled ? <ToggleActive /> : <ToggleInactive />}
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          className="px-8 py-3 rounded-[10px] font-mona-sans font-medium text-sm transition-opacity hover:opacity-80"
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
          className="px-8 py-3 rounded-[10px] font-mona-sans font-semibold text-sm transition-opacity hover:opacity-90"
          style={{
            background: "#A2CE3A",
            color: "#121212",
            height: "48px",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
