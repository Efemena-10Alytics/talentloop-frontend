"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar1 } from "@/components/manage-your-profile/Navbar1";
import { GlassCard } from "@/components/manage-your-profile/GlassCard";

/* ─── SVG Icons ─── */

const ClockSVG = () => (
  <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="68.3385" height="68.3385" rx="16.0797" fill="#161719"/>
    <path d="M34.1697 16.0801C40.8303 16.0801 46.2295 21.4792 46.2295 28.1398C46.2295 34.8004 40.8303 40.1996 34.1697 40.1996C27.5091 40.1996 22.11 34.8004 22.11 28.1398C22.11 21.4792 27.5091 16.0801 34.1697 16.0801ZM34.1697 18.492C31.611 18.492 29.157 19.5085 27.3477 21.3178C25.5384 23.1271 24.5219 25.5811 24.5219 28.1398C24.5219 30.6986 25.5384 33.1525 27.3477 34.9618C29.157 36.7711 31.611 37.7876 34.1697 37.7876C36.7285 37.7876 39.1824 36.7711 40.9917 34.9618C42.801 33.1525 43.8175 30.6986 43.8175 28.1398C43.8175 25.5811 42.801 23.1271 40.9917 21.3178C39.1824 19.5085 36.7285 18.492 34.1697 18.492ZM34.1697 20.904C34.4651 20.904 34.7502 21.0125 34.9709 21.2087C35.1917 21.405 35.3327 21.6755 35.3673 21.9688L35.3757 22.1099V27.6405L38.6403 30.9051C38.8566 31.1221 38.9821 31.4134 38.9915 31.7196C39.0008 32.0259 38.8933 32.3242 38.6906 32.554C38.488 32.7838 38.2055 32.9279 37.9004 32.957C37.5954 32.986 37.2908 32.8979 37.0484 32.7105L36.935 32.6104L33.3171 28.9924C33.1297 28.8048 33.0093 28.5607 32.9746 28.2978L32.9638 28.1398V22.1099C32.9638 21.7901 33.0908 21.4834 33.317 21.2572C33.5431 21.031 33.8499 20.904 34.1697 20.904Z" fill="#A2CE3A"/>
    <path d="M34.1697 52.2593C44.1603 52.2593 52.2593 44.1603 52.2593 34.1697C52.2593 24.1791 44.1603 16.0801 34.1697 16.0801C24.1791 16.0801 16.0801 24.1791 16.0801 34.1697C16.0801 44.1603 24.1791 52.2593 34.1697 52.2593Z" stroke="#A2CE3A" strokeWidth="3.01494" strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
  </svg>
);

const SaveIconSVG = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8135 17.5871H2.76369C2.03071 17.5871 1.32776 17.2959 0.809466 16.7777C0.291174 16.2594 0 15.5564 0 14.8234V2.76369C0 2.03071 0.291174 1.32776 0.809466 0.809466C1.32776 0.291173 2.03071 0 2.76369 0H10.301C10.5009 0.000175923 10.6924 0.0797023 10.8337 0.221095L15.3561 4.77365C15.4975 4.91486 15.577 5.10645 15.5772 5.30628V14.8234C15.5772 15.5564 15.286 16.2594 14.7677 16.7777C14.2494 17.2959 13.5464 17.5871 12.8135 17.5871ZM2.76369 1.50747C2.43052 1.50747 2.11099 1.63982 1.87541 1.87541C1.63982 2.11099 1.50747 2.43052 1.50747 2.76369V14.8234C1.50747 15.1566 1.63982 15.4761 1.87541 15.7117C2.11099 15.9473 2.43052 16.0797 2.76369 16.0797H12.8135C13.1466 16.0797 13.4662 15.9473 13.7018 15.7117C13.9373 15.4761 14.0697 15.1566 14.0697 14.8234V5.58768L9.98948 1.50747H2.76369Z" fill="#0F4F3A"/>
    <path d="M12.562 16.8336H11.0545V10.5524H4.52216V16.8336H3.01469V10.3012C3.01469 9.96803 3.14704 9.6485 3.38263 9.41292C3.61821 9.17733 3.93774 9.04498 4.27091 9.04498H11.3058C11.6389 9.04498 11.9585 9.17733 12.194 9.41292C12.4296 9.6485 12.562 9.96803 12.562 10.3012V16.8336ZM8.26067 5.52755H4.30106C4.13081 5.52624 3.96249 5.4914 3.8057 5.42503C3.64891 5.35866 3.50674 5.26206 3.38728 5.14074C3.26783 5.01943 3.17345 4.87577 3.10952 4.71797C3.04559 4.56017 3.01336 4.39133 3.01469 4.22108V0.753906H4.52216V4.02009H8.03958V0.753906H9.54705V4.22108C9.54837 4.39133 9.51615 4.56017 9.45222 4.71797C9.38829 4.87577 9.2939 5.01943 9.17445 5.14074C9.055 5.26206 8.91282 5.35866 8.75604 5.42503C8.59925 5.4914 8.43092 5.52624 8.26067 5.52755Z" fill="#0F4F3A"/>
  </svg>
);

const TrashSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11V17" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11V17" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockSmallSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#999" strokeWidth="1.5"/>
    <path d="M12 6V12L16 14" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Types ─── */
interface TimeSlot {
  id: string;
  start: string;
  end: string;
}

interface DaySchedule {
  enabled: boolean;
  slots: TimeSlot[];
}

type WeekSchedule = Record<string, DaySchedule>;

/* ─── Time Options ─── */
const timeOptions: string[] = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    timeOptions.push(`${hh}:${mm}`);
  }
}

/* ─── Default Schedule ─── */
const defaultSchedule: WeekSchedule = {
  Monday: { enabled: true, slots: [{ id: "mon-1", start: "09:00", end: "17:00" }] },
  Tuesday: { enabled: true, slots: [{ id: "tue-1", start: "09:00", end: "17:00" }, { id: "tue-2", start: "09:00", end: "17:00" }] },
  Wednesday: { enabled: true, slots: [{ id: "wed-1", start: "09:00", end: "17:00" }] },
  Thursday: { enabled: true, slots: [{ id: "thu-1", start: "09:00", end: "17:00" }] },
  Friday: { enabled: true, slots: [{ id: "fri-1", start: "09:00", end: "17:00" }] },
  Saturday: { enabled: false, slots: [] },
  Sunday: { enabled: false, slots: [] },
};

/* ─── Toggle Switch ─── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-[44px] h-[24px] rounded-full transition-colors cursor-pointer flex-shrink-0 ${
        checked ? "bg-[#A2CE3A]" : "bg-[#333]"
      }`}
    >
      <span
        className={`absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white transition-transform ${
          checked ? "left-[22px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

/* ─── Time Select ─── */
function TimeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative flex items-center gap-1.5 bg-[#FFFFFF0D] border border-white/10 rounded-[8px] px-3 py-2">
      <span className="text-white font-mona-sans text-sm">{value}</span>
      <ClockSmallSVG />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer"
      >
        {timeOptions.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}

/* ─── Day Row ─── */
function DayRow({
  day,
  schedule,
  onToggle,
  onSlotChange,
  onAddSlot,
  onRemoveSlot,
}: {
  day: string;
  schedule: DaySchedule;
  onToggle: (enabled: boolean) => void;
  onSlotChange: (slotId: string, field: "start" | "end", value: string) => void;
  onAddSlot: () => void;
  onRemoveSlot: (slotId: string) => void;
}) {
  return (
    <div className="bg-[#FFFFFF08] border border-white/5 rounded-[16px] px-5 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Toggle checked={schedule.enabled} onChange={onToggle} />
          <span className="text-white font-mona-sans font-bold text-sm">{day}</span>
        </div>
        {schedule.enabled && (
          <button
            onClick={onAddSlot}
            className="text-[#A2CE3A] font-mona-sans text-xs font-semibold cursor-pointer hover:underline"
          >
            + Add Slot
          </button>
        )}
      </div>

      {/* Time Slots */}
      {schedule.enabled && schedule.slots.length > 0 && (
        <div className="flex flex-col gap-2 mt-3">
          {schedule.slots.map((slot) => (
            <div key={slot.id} className="flex items-center gap-3">
              <TimeSelect value={slot.start} onChange={(v) => onSlotChange(slot.id, "start", v)} />
              <span className="text-white/50 font-mona-sans text-xs">to</span>
              <TimeSelect value={slot.end} onChange={(v) => onSlotChange(slot.id, "end", v)} />
              {schedule.slots.length > 1 && (
                <button onClick={() => onRemoveSlot(slot.id)} className="cursor-pointer hover:opacity-70 transition-opacity">
                  <TrashSVG />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function SetAvailabilityPage() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<WeekSchedule>(defaultSchedule);

  const handleToggle = (day: string, enabled: boolean) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled,
        slots: enabled && prev[day].slots.length === 0
          ? [{ id: `${day.toLowerCase().slice(0, 3)}-${Date.now()}`, start: "09:00", end: "17:00" }]
          : prev[day].slots,
      },
    }));
  };

  const handleSlotChange = (day: string, slotId: string, field: "start" | "end", value: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((s) => (s.id === slotId ? { ...s, [field]: value } : s)),
      },
    }));
  };

  const handleAddSlot = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { id: `${day.toLowerCase().slice(0, 3)}-${Date.now()}`, start: "09:00", end: "17:00" }],
      },
    }));
  };

  const handleRemoveSlot = (day: string, slotId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((s) => s.id !== slotId),
      },
    }));
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="min-h-screen bg-[#0B0D0F] relative overflow-hidden">
      {/* Background LooperGroup */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] opacity-20 pointer-events-none">
        <img src="/LooperGroup.svg" alt="" className="w-full h-full object-contain" />
      </div>

      <Navbar1 />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-8 lg:py-12">
        <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl mb-8">Set Availability</h1>

        {/* ─── Configure Your Weekly Schedule ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <div className="flex items-center gap-4">
            <ClockSVG />
            <div>
              <h2 className="text-white font-mona-sans font-bold text-xl">Configure Your Weekly Schedule</h2>
              <p className="text-white/50 font-mona-sans text-sm mt-1">
                Set the hours you&apos;re available for coaching sessions. Clients will only be able to book during these times.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* ─── Weekly Availability ─── */}
        <GlassCard className="p-6 lg:p-8 mb-10">
          <h2 className="text-white font-mona-sans font-bold text-xl mb-1">Weekly Availability</h2>
          <p className="text-white/50 font-mona-sans text-sm mb-6">Toggle days on/off and set your available hours</p>

          <div className="flex flex-col gap-3">
            {days.map((day) => (
              <DayRow
                key={day}
                day={day}
                schedule={schedule[day]}
                onToggle={(enabled) => handleToggle(day, enabled)}
                onSlotChange={(slotId, field, value) => handleSlotChange(day, slotId, field, value)}
                onAddSlot={() => handleAddSlot(day)}
                onRemoveSlot={(slotId) => handleRemoveSlot(day, slotId)}
              />
            ))}
          </div>
        </GlassCard>

        {/* ─── Action Buttons ─── */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => router.push("/manage-your-profile")}
            className="px-10 py-3 rounded-[8px] font-mona-sans text-sm font-bold transition-colors cursor-pointer"
            style={{ backgroundColor: "#ECF8C7", color: "#054711" }}
          >
            Cancel
          </button>
          <button
            onClick={() => router.push("/manage-your-profile")}
            className="flex items-center gap-2 px-10 py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-sm font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer"
          >
            <SaveIconSVG />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
