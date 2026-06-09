"use client";

import { useState } from "react";

const ChevronDown = () => (
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L6 6L11 1" stroke="#95ACCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "#1563741A",
  border: "1px solid #FFFFFF1A",
  borderRadius: "12px",
  color: "#fff",
  fontFamily: "var(--font-mona-sans, sans-serif)",
  fontSize: "13px",
  padding: "12px 16px",
  outline: "none",
  appearance: "none" as const,
};

const labelStyle: React.CSSProperties = {
  color: "#E8EFF1",
  fontFamily: "var(--font-mona-sans, sans-serif)",
  fontSize: "13px",
  fontWeight: 500,
  marginBottom: "8px",
  display: "block",
};

const placeholderColor = "#657997";

export default function ScheduleMeeting({ clientId }: {clientId?: string}) {
  const [client, setClient] = useState("");
  const [meetingType, setMeetingType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    // Hook up to your API / calendar integration here
    console.log({ client, meetingType, date, time, link });
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#1563741A",
        borderTop: "0.5px solid #FFFFFF1A",
      }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-white font-mona-sans font-semibold text-xl">
          Schedule New Meeting
        </h2>
      </div>

      {/* Form */}
      <div className="px-6 pb-6 space-y-5">
        {/* Client */}
        <div>
          <label style={labelStyle}>Client</label>
          <div className="relative">
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              style={{
                ...inputBase,
                color: client ? "#fff" : placeholderColor,
                paddingRight: "40px",
                cursor: "pointer",
              }}
            >
              <option value="" disabled hidden>Select</option>
              <option value="adaeze">Adaeze Nwosu</option>
              <option value="taiwo">Taiwo Kolade</option>
              <option value="priya">Priya Mehta</option>
              <option value="olumide">Olumide Adeyemi</option>
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown />
            </span>
          </div>
        </div>

        {/* Meeting Type */}
        <div>
          <label style={labelStyle}>Meeting Type</label>
          <div className="relative">
            <select
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              style={{
                ...inputBase,
                color: meetingType ? "#fff" : placeholderColor,
                paddingRight: "40px",
                cursor: "pointer",
              }}
            >
              <option value="" disabled hidden>Select</option>
              <option value="cv-review">CV Review Call</option>
              <option value="interview-prep">Interview Prep</option>
              <option value="check-in">Check-in Call</option>
              <option value="sponsorship">Sponsorship Strategy</option>
              <option value="onboarding">Onboarding</option>
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown />
            </span>
          </div>
        </div>

        {/* Date + Time row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Date */}
          <div>
            <label style={labelStyle}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="dd/mm/yyyy"
              style={{
                ...inputBase,
                color: date ? "#fff" : placeholderColor,
                colorScheme: "dark",
              }}
            />
          </div>

          {/* Time */}
          <div>
            <label style={labelStyle}>Time</label>
            <div className="relative">
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{
                  ...inputBase,
                  color: time ? "#fff" : placeholderColor,
                  paddingRight: "40px",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled hidden>Select</option>
                <option value="09:00">9:00 AM</option>
                <option value="09:30">9:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="14:30">2:30 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:30">3:30 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown />
              </span>
            </div>
          </div>
        </div>

        {/* Meeting Link */}
        <div>
          <label style={labelStyle}>Meeting Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://cv-review/googlemeet"
            style={{
              ...inputBase,
              color: link ? "#fff" : placeholderColor,
            }}
          />
        </div>

        {/* Send Invite */}
        <button
          onClick={handleSubmit}
          className="w-full font-mona-sans font-semibold text-sm transition-opacity hover:opacity-90 active:scale-[0.99]"
          style={{
            background: "#A2CE3A",
            color: "#0B0D0F",
            borderRadius: "12px",
            padding: "14px",
            border: "none",
            cursor: "pointer",
            marginTop: "4px",
          }}
        >
          Send Invite
        </button>
      </div>
    </div>
  );
}