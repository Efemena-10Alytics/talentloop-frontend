"use client";

import { useRouter } from "next/navigation";

const RetrySVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4V10H7M23 20V14H17" stroke="#0B0D0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="#0B0D0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CoachSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function ReportActions() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => router.push("/dashboard/interview-prep")}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[12px] bg-[#A2CE3A] text-[#0B0D0F] font-mona-sans font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity"
      >
        <RetrySVG />
        Retry Mock Interview
      </button>
      <button
        onClick={() => router.push("/dashboard/interview-prep")}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[12px] bg-[#FFFFFF0A] border border-white/10 text-white font-mona-sans font-semibold text-sm cursor-pointer hover:bg-white/10 transition-colors"
      >
        <CoachSVG />
        Book Human Coach
      </button>
    </div>
  );
}
