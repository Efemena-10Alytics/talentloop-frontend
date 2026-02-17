"use client";

import { useState } from "react";

/* ─── SVG Icons ─── */
const RealTimeAssistantSVG = () => (
  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.3511 30.9406L21.2211 19.0306M3.95605 7.12061L10.8411 19.0306M29.7861 10.0306H16.0311M16.0311 10.0306C17.6224 10.0306 19.1485 10.6627 20.2737 11.788C21.3989 12.9132 22.0311 14.4393 22.0311 16.0306C22.0311 17.6219 21.3989 19.148 20.2737 20.2732C19.1485 21.3985 17.6224 22.0306 16.0311 22.0306C14.4398 22.0306 12.9136 21.3985 11.7884 20.2732C10.6632 19.148 10.0311 17.6219 10.0311 16.0306C10.0311 14.4393 10.6632 12.9132 11.7884 11.788C12.9136 10.6627 14.4398 10.0306 16.0311 10.0306Z" stroke="#A2CE3A" strokeWidth="2.0625" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.0312 31.0312C18.0011 31.0312 19.9516 30.6433 21.7715 29.8894C23.5914 29.1356 25.245 28.0307 26.6378 26.6378C28.0307 25.245 29.1356 23.5914 29.8894 21.7715C30.6433 19.9516 31.0312 18.0011 31.0312 16.0312C31.0312 14.0614 30.6433 12.1109 29.8894 10.291C29.1356 8.47111 28.0307 6.81753 26.6378 5.42465C25.245 4.03177 23.5914 2.92688 21.7715 2.17306C19.9516 1.41924 18.0011 1.03125 16.0312 1.03125C12.053 1.03125 8.23769 2.6116 5.42465 5.42465C2.6116 8.23769 1.03125 12.053 1.03125 16.0312C1.03125 20.0095 2.6116 23.8248 5.42465 26.6378C8.23769 29.4509 12.053 31.0312 16.0312 31.0312Z" stroke="#A2CE3A" strokeWidth="2.0625" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChromeExtensionSVG = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.6871 24.9588L17.1831 15.4308M3.37109 5.90283L8.87909 15.4308M24.0351 8.23083H13.0311M13.0311 8.23083C14.3041 8.23083 15.525 8.73654 16.4252 9.63672C17.3254 10.5369 17.8311 11.7578 17.8311 13.0308C17.8311 14.3039 17.3254 15.5248 16.4252 16.4249C15.525 17.3251 14.3041 17.8308 13.0311 17.8308C11.7581 17.8308 10.5372 17.3251 9.63698 16.4249C8.73681 15.5248 8.23109 14.3039 8.23109 13.0308C8.23109 11.7578 8.73681 10.5369 9.63698 9.63672C10.5372 8.73654 11.7581 8.23083 13.0311 8.23083Z" stroke="#0B0D0F" strokeWidth="2.0625" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.0313 25.0313C14.6071 25.0313 16.1675 24.7209 17.6235 24.1178C19.0794 23.5147 20.4022 22.6308 21.5165 21.5165C22.6308 20.4022 23.5147 19.0794 24.1178 17.6235C24.7209 16.1675 25.0313 14.6071 25.0313 13.0313C25.0313 11.4554 24.7209 9.89496 24.1178 8.43905C23.5147 6.98314 22.6308 5.66027 21.5165 4.54597C20.4022 3.43167 19.0794 2.54775 17.6235 1.9447C16.1675 1.34164 14.6071 1.03125 13.0313 1.03125C9.84865 1.03125 6.79641 2.29553 4.54597 4.54597C2.29553 6.79641 1.03125 9.84865 1.03125 13.0313C1.03125 16.2138 2.29553 19.2661 4.54597 21.5165C6.79641 23.767 9.84865 25.0313 13.0313 25.0313Z" stroke="#0B0D0F" strokeWidth="2.0625" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AICopilotTabSVG = () => (
  <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.83911 13.0711C10.2936 13.0711 11.4641 11.9139 11.4641 10.4997V4.49965C11.4641 3.08537 10.2936 1.92822 8.83911 1.92822C7.38465 1.92822 6.21411 3.08537 6.21411 4.49965V10.4997C6.21411 11.9139 7.38465 13.0711 8.83911 13.0711Z" fill="currentColor" fillOpacity="0.15"/>
    <path d="M17.6786 10.4465C17.6786 10.3286 17.5821 10.2322 17.4643 10.2322H15.8571C15.7393 10.2322 15.6429 10.3286 15.6429 10.4465C15.6429 14.2045 12.5973 17.25 8.83929 17.25C5.08125 17.25 2.03571 14.2045 2.03571 10.4465C2.03571 10.3286 1.93929 10.2322 1.82143 10.2322H0.214286C0.0964286 10.2322 0 10.3286 0 10.4465C0 14.9652 3.39107 18.6938 7.76786 19.2215V21.9643H3.87589C3.50893 21.9643 3.21429 22.3474 3.21429 22.8215V23.7857C3.21429 23.9036 3.28929 24 3.38036 24H14.2982C14.3893 24 14.4643 23.9036 14.4643 23.7857V22.8215C14.4643 22.3474 14.1696 21.9643 13.8027 21.9643H9.80357V19.2349C14.2312 18.7527 17.6786 15.0027 17.6786 10.4465Z" fill="currentColor"/>
    <path d="M8.83946 15C11.3546 15 13.393 12.9857 13.393 10.5V4.5C13.393 2.01429 11.3546 0 8.83946 0C6.32428 0 4.28589 2.01429 4.28589 4.5V10.5C4.28589 12.9857 6.32428 15 8.83946 15ZM6.21446 4.5C6.21446 3.08571 7.385 1.92857 8.83946 1.92857C10.2939 1.92857 11.4645 3.08571 11.4645 4.5V10.5C11.4645 11.9143 10.2939 13.0714 8.83946 13.0714C7.385 13.0714 6.21446 11.9143 6.21446 10.5V4.5Z" fill="currentColor"/>
  </svg>
);

const HumanCoachesTabSVG = () => (
  <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.6667 25V22.3333C19.6667 20.9188 19.1048 19.5623 18.1046 18.5621C17.1044 17.5619 15.7478 17 14.3333 17H6.33333C4.91885 17 3.56229 17.5619 2.5621 18.5621C1.5619 19.5623 1 20.9188 1 22.3333V25M19.6667 1.17065C20.8103 1.46715 21.8232 2.13501 22.5462 3.0694C23.2693 4.0038 23.6616 5.15184 23.6616 6.33332C23.6616 7.5148 23.2693 8.66284 22.5462 9.59724C21.8232 10.5316 20.8103 11.1995 19.6667 11.496M27.6667 25V22.3333C27.6658 21.1516 27.2725 20.0037 26.5485 19.0697C25.8245 18.1358 24.8108 17.4687 23.6667 17.1733" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.3333 11.6667C13.2789 11.6667 15.6667 9.27885 15.6667 6.33333C15.6667 3.38781 13.2789 1 10.3333 1C7.38781 1 5 3.38781 5 6.33333C5 9.27885 7.38781 11.6667 10.3333 11.6667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StartMockSVG = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5 41.5C32.5457 41.5 41.5 32.5457 41.5 21.5C41.5 10.4543 32.5457 1.5 21.5 1.5C10.4543 1.5 1.5 10.4543 1.5 21.5C1.5 32.5457 10.4543 41.5 21.5 41.5Z" stroke="#A2CE3A" strokeWidth="3"/>
    <path d="M29.39 22.2896C29.038 23.5436 27.366 24.4296 24.026 26.1996C20.796 27.9116 19.182 28.7696 17.88 28.4256C17.3475 28.2858 16.8582 28.0157 16.456 27.6396C15.5 26.7396 15.5 24.9916 15.5 21.4996C15.5 18.0076 15.5 16.2596 16.456 15.3596C16.852 14.9876 17.342 14.7176 17.88 14.5756C19.18 14.2296 20.796 15.0876 24.026 16.7996C27.366 18.5716 29.038 19.4576 29.39 20.7096C29.536 21.2276 29.536 21.7716 29.39 22.2896Z" stroke="#A2CE3A" strokeWidth="3" strokeLinejoin="round"/>
  </svg>
);

const BehaviouralSVG = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5 41.5C32.5457 41.5 41.5 32.5457 41.5 21.5C41.5 10.4543 32.5457 1.5 21.5 1.5C10.4543 1.5 1.5 10.4543 1.5 21.5C1.5 32.5457 10.4543 41.5 21.5 41.5Z" stroke="#A2CE3A" strokeWidth="3"/>
    <path d="M29.39 22.2896C29.038 23.5436 27.366 24.4296 24.026 26.1996C20.796 27.9116 19.182 28.7696 17.88 28.4256C17.3475 28.2858 16.8582 28.0157 16.456 27.6396C15.5 26.7396 15.5 24.9916 15.5 21.4996C15.5 18.0076 15.5 16.2596 16.456 15.3596C16.852 14.9876 17.342 14.7176 17.88 14.5756C19.18 14.2296 20.796 15.0876 24.026 16.7996C27.366 18.5716 29.038 19.4576 29.39 20.7096C29.536 21.2276 29.536 21.7716 29.39 22.2896Z" stroke="#A2CE3A" strokeWidth="3" strokeLinejoin="round"/>
  </svg>
);

const TechnicalInterviewSVG = () => (
  <svg width="43" height="25" viewBox="0 0 43 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.1909 1.5H41.4986V13.8077" stroke="#A2CE3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M41.5 1.5L24.1154 18.8846C23.8278 19.1665 23.4412 19.3244 23.0385 19.3244C22.6358 19.3244 22.2491 19.1665 21.9615 18.8846L14.8846 11.8077C14.597 11.5258 14.2104 11.3679 13.8077 11.3679C13.405 11.3679 13.0184 11.5258 12.7308 11.8077L1.5 23.0385" stroke="#A2CE3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RecentMockIconSVG = () => (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.25 20.75C5.243 20.75 3.24 20.75 1.995 19.285C0.75 17.822 0.75 15.464 0.75 10.75C0.75 6.036 0.75 3.679 1.995 2.214C3.24 0.749 5.243 0.75 9.25 0.75C13.257 0.75 15.26 0.75 16.505 2.214C17.507 3.394 17.703 5.151 17.741 8.25M5.75 6.75H12.75M5.75 11.75H8.75" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.3601 16.855C17.9367 16.4359 18.3657 15.8451 18.5858 15.1673C18.8059 14.4894 18.8058 13.7592 18.5854 13.0814C18.365 12.4036 17.9357 11.813 17.359 11.3942C16.7823 10.9754 16.0879 10.7499 15.3751 10.75H15.1241C14.4115 10.7501 13.7172 10.9757 13.1407 11.3946C12.5641 11.8135 12.135 12.4041 11.9148 13.0819C11.6945 13.7596 11.6944 14.4897 11.9146 15.1675C12.1347 15.8453 12.5637 16.436 13.1401 16.855M13.1401 16.855C13.7163 17.2751 14.4111 17.501 15.1241 17.5H15.3741C16.0872 17.501 16.782 17.2751 17.3581 16.855L17.9411 18.69C18.1631 19.39 18.2751 19.74 18.2441 19.958C18.1811 20.412 17.8111 20.748 17.3741 20.75C17.1641 20.75 16.8501 20.586 16.2211 20.256C15.9511 20.114 15.8171 20.044 15.6791 20.002C15.3986 19.9181 15.0997 19.9181 14.8191 20.002C14.6811 20.044 14.5461 20.114 14.2771 20.256C13.6481 20.586 13.3341 20.751 13.1241 20.75C12.6871 20.748 12.3171 20.412 12.2541 19.958C12.2241 19.74 12.3341 19.39 12.5571 18.69L13.1401 16.855Z" stroke="#A2CE3A" strokeWidth="1.5"/>
  </svg>
);

const ViewReportArrowSVG = () => (
  <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.115 9.654V5.327H0V4.327H9.115V0L16.711 4.827L9.115 9.654Z" fill="#A2CE3A"/>
  </svg>
);

const CalendarSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#A2CE3A" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

/* ─── AI Copilot Tab Content ─── */
function AICopilotTab() {
  const practiceCards = [
    {
      icon: <StartMockSVG />,
      title: "Start Mock Interview",
      subtitle: "Practice with AI interview for any role",
      buttonText: "Start Practice",
      buttonColor: "bg-[#A2CE3A] text-[#0B0D0F]",
    },
    {
      icon: <BehaviouralSVG />,
      title: "Behavioral Practice",
      subtitle: "Master STAR method for behavioral questions",
      buttonText: "Practice Now",
      buttonColor: "bg-[#A2CE3A] text-[#0B0D0F]",
    },
    {
      icon: <TechnicalInterviewSVG />,
      title: "Technical Interview",
      subtitle: "Code challenges and system design",
      buttonText: "Start Session",
      buttonColor: "bg-[#E040FB] text-white",
    },
  ];

  const recentInterviews = [
    { company: "Meta", role: "Frontend Engineer", type: "Technical", score: 78, feedback: "Strong technical knowledge, work on communication clarity", daysAgo: "2 days ago" },
    { company: "Meta", role: "Frontend Engineer", type: "Technical", score: 78, feedback: "Strong technical knowledge, work on communication clarity", daysAgo: "2 days ago" },
    { company: "Meta", role: "Frontend Engineer", type: "Technical", score: 78, feedback: "Strong technical knowledge, work on communication clarity", daysAgo: "2 days ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Practice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {practiceCards.map((card, i) => (
          <div key={i} className="bg-[#FFFFFF0A] backdrop-blur-sm border border-white/10 rounded-[20px] p-6 flex flex-col gap-4">
            <div className="w-[43px] h-[43px] flex items-center justify-center">
              {card.icon}
            </div>
            <div>
              <h3 className="text-white font-mona-sans font-bold text-lg">{card.title}</h3>
              <p className="text-white/50 font-mona-sans text-sm mt-1">{card.subtitle}</p>
            </div>
            <button className={`mt-auto w-full py-3 rounded-[10px] font-mona-sans font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity ${card.buttonColor}`}>
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Recent Mock Interviews */}
      <div>
        <h2 className="text-white font-mona-sans font-bold text-xl mb-4">Recent Mock Interviews</h2>
        <div className="space-y-4">
          {recentInterviews.map((interview, i) => (
            <div key={i} className="bg-[#FFFFFF0A] backdrop-blur-sm border border-white/10 rounded-[16px] p-5 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white font-mona-sans font-bold text-base">{interview.company} – {interview.role}</span>
                  <span className="px-3 py-0.5 rounded-full bg-[#A2CE3A]/15 text-[#A2CE3A] text-xs font-mona-sans font-medium">{interview.type}</span>
                </div>
                <p className="text-white/50 font-mona-sans text-sm">{interview.feedback}</p>
                <button className="mt-3 flex items-center gap-2 text-[#A2CE3A] font-mona-sans text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity">
                  View Full Report <ViewReportArrowSVG />
                </button>
              </div>
              <div className="flex flex-col items-end gap-1 ml-6">
                <div className="flex items-center gap-2">
                  <RecentMockIconSVG />
                  <span className="text-white font-mona-sans font-bold text-2xl">{interview.score}</span>
                </div>
                <span className="text-white/40 font-mona-sans text-xs">{interview.daysAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Human Interview Coaches Tab Content ─── */
function HumanCoachesTab() {
  const coaches = [
    {
      name: "Sarah Johnson",
      specialty: "Technical Interviews",
      company: "Talentloop",
      experience: "10+ years",
      rating: 4.9,
      sessions: 150,
      avatar: "/homepage/1.png",
    },
    {
      name: "Ibrahim Suleman",
      specialty: "Behavioral Interviews",
      company: "Talentloop",
      experience: "10+ years",
      rating: 4.9,
      sessions: 120,
      avatar: "/homepage/2.png",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Book an Interview Coach */}
      <div>
        <h2 className="text-white font-mona-sans font-bold text-xl mb-1">Book an Interview Coach</h2>
        <p className="text-white/50 font-mona-sans text-sm mb-6">Get personalized 1-on-1 coaching from industry professionals</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {coaches.map((coach, i) => (
            <div key={i} className="bg-[#FFFFFF0A] backdrop-blur-sm border border-white/10 rounded-[20px] p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-white/20 overflow-hidden flex-shrink-0">
                  <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-mona-sans font-bold text-base">{coach.name}</h3>
                  <p className="text-[#A2CE3A] font-mona-sans text-sm">{coach.specialty}</p>
                  <p className="text-white/40 font-mona-sans text-xs">{coach.company}, {coach.experience}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1.5">
                  <StarSVG />
                  <span className="text-white font-mona-sans text-sm font-semibold">{coach.rating}</span>
                </div>
                <span className="text-white/50 font-mona-sans text-sm">{coach.sessions} sessions</span>
              </div>
              <button className="w-full py-3 rounded-[10px] bg-[#A2CE3A]/20 text-[#A2CE3A] font-mona-sans font-semibold text-sm cursor-pointer hover:bg-[#A2CE3A]/30 transition-colors">
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Coaching Sessions */}
      <div className="bg-[#FFFFFF0A] backdrop-blur-sm border border-[#A2CE3A]/30 rounded-[20px] p-6">
        <h2 className="text-white font-mona-sans font-bold text-xl mb-5">Upcoming Coaching Sessions</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 overflow-hidden flex-shrink-0">
              <img src="/homepage/1.png" alt="Sarah Johnson" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-white font-mona-sans font-bold text-base">Sarah Johnson</h3>
              <p className="text-white/50 font-mona-sans text-sm">Technical Interviews</p>
              <div className="flex items-center gap-2 mt-1 text-white/40 font-mona-sans text-xs">
                <CalendarSVG />
                <span>Jan 16, 2026 &nbsp; 3:00 PM &nbsp; 60 min</span>
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 rounded-[10px] border border-[#A2CE3A] text-[#A2CE3A] font-mona-sans font-semibold text-sm cursor-pointer hover:bg-[#A2CE3A]/10 transition-colors">
            Join Session
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function InterviewPrepPage() {
  const [activeTab, setActiveTab] = useState<"ai" | "human">("ai");

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl">Interview Preparation</h1>
        <p className="text-white/50 font-mona-sans text-sm mt-1">Practice with AI or get coached by humans</p>
      </div>

      {/* Real-Time Interview Assistant Banner */}
      <div className="bg-[#FFFFFF0A] backdrop-blur-sm border border-[#A2CE3A]/30 rounded-[20px] p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <RealTimeAssistantSVG />
          <h2 className="text-white font-mona-sans font-bold text-xl">Real-Time Interview Assistant</h2>
        </div>
        <p className="text-white/60 font-mona-sans text-sm mb-5 max-w-3xl">
          Install our Chrome Extension to get AI copilot support during live interviews on Zoom, Google Meet, and Microsoft Teams. Get instant suggestions as questions are asked.
        </p>
        <button className="flex items-center gap-2.5 px-5 py-2.5 rounded-[10px] bg-[#A2CE3A] text-[#0B0D0F] font-mona-sans font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity">
          <ChromeExtensionSVG />
          Install Chrome Extension
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-white/10 mb-8">
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex items-center gap-2 px-5 py-3 font-mona-sans font-semibold text-sm cursor-pointer transition-colors relative ${
            activeTab === "ai" ? "text-[#A2CE3A]" : "text-white/50 hover:text-white/70"
          }`}
        >
          <AICopilotTabSVG />
          AI Interview Copilot
          {activeTab === "ai" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A2CE3A]" />}
        </button>
        <button
          onClick={() => setActiveTab("human")}
          className={`flex items-center gap-2 px-5 py-3 font-mona-sans font-semibold text-sm cursor-pointer transition-colors relative ${
            activeTab === "human" ? "text-[#A2CE3A]" : "text-white/50 hover:text-white/70"
          }`}
        >
          <HumanCoachesTabSVG />
          Human Interview Coaches
          {activeTab === "human" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A2CE3A]" />}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "ai" ? <AICopilotTab /> : <HumanCoachesTab />}
    </div>
  );
}
