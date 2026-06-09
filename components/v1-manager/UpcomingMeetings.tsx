"use client";

interface Meeting {
  day: string;
  month: string;
  title: string;
  with: string;
  time: string;
  duration: string;
  platform: string;
  link: string;
}

const mockMeetings: Meeting[] = [
  {
    day: "22",
    month: "May",
    title: "CV Review Call",
    with: "Priya Mehta",
    time: "10:00 AM",
    duration: "30 min",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-defg-hij",
  },
  {
    day: "25",
    month: "May",
    title: "Interview Prep",
    with: "Priya Mehta",
    time: "10:00 AM",
    duration: "30 min",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-defg-hij",
  },
  {
    day: "22",
    month: "May",
    title: "CV Review Call",
    with: "Priya Mehta",
    time: "10:00 AM",
    duration: "30 min",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-defg-hij",
  },
  {
    day: "22",
    month: "May",
    title: "CV Review Call",
    with: "Priya Mehta",
    time: "10:00 AM",
    duration: "30 min",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-defg-hij",
  },
];

const CalendarIcon = () => (
  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.6 0.5V3.3M4 0.5V3.3M13.1 7.5C13.1 4.8603 13.1 3.5401 12.2796 2.7204C11.4592 1.9007 10.1397 1.9 7.5 1.9H6.1C3.4603 1.9 2.1401 1.9 1.3204 2.7204C0.5007 3.5408 0.5 4.8603 0.5 7.5V8.9C0.5 11.5397 0.5 12.8599 1.3204 13.6796C2.1408 14.4993 3.4603 14.5 6.1 14.5M0.5 6.1H13.1" stroke="#A9B4C4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.1869 12.1911L10.3 11.7004V10.4873M13.1 11.7004C13.1 12.443 12.805 13.1552 12.2799 13.6803C11.7548 14.2054 11.0426 14.5004 10.3 14.5004C9.55739 14.5004 8.8452 14.2054 8.3201 13.6803C7.795 13.1552 7.5 12.443 7.5 11.7004C7.5 10.9578 7.795 10.2456 8.3201 9.72049C8.8452 9.19539 9.55739 8.90039 10.3 8.90039C11.0426 8.90039 11.7548 9.19539 12.2799 9.72049C12.805 10.2456 13.1 10.9578 13.1 11.7004Z" stroke="#A9B4C4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function UpcomingMeetings({ clientId }: {clientId?: string}) {
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
          Upcoming Meetings
        </h2>
      </div>

      {/* Meeting Cards */}
      <div className="px-4 pb-6 space-y-3">
        {mockMeetings.map((meeting, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-2xl"
            style={{
              background: "#1563741A",
              border: "1px solid #FFFFFF1A",
            }}
          >
            {/* Date badge */}
            <div
              className="flex flex-col items-center justify-center rounded-xl flex-shrink-0 mr-4"
              style={{
                width: "56px",
                height: "56px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid #FFFFFF1A",
              }}
            >
              <span className="text-white font-mona-sans font-bold text-xl leading-none">
                {meeting.day}
              </span>
              <span className="text-[#95ACCB] font-mona-sans text-xs mt-0.5">
                {meeting.month}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-mona-sans font-semibold text-sm mb-1">
                {meeting.title}
              </p>
              <p className="text-[#95ACCB] font-mona-sans text-xs mb-2">
                With {meeting.with}
              </p>
              <div className="flex items-center gap-1.5">
                <CalendarIcon />
                <span className="text-[#A9B4C4] font-mona-sans text-xs">
                  {meeting.time} · {meeting.duration} · {meeting.platform}
                </span>
              </div>
            </div>

            {/* Join button */}
            <a
              href={meeting.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 ml-4 flex items-center justify-center font-mona-sans font-semibold text-xs transition-opacity hover:opacity-90"
              style={{
                background: "#A2CE3A",
                color: "#0B0D0F",
                borderRadius: "100px",
                padding: "10px 18px",
                whiteSpace: "nowrap",
              }}
            >
              Join Session
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}