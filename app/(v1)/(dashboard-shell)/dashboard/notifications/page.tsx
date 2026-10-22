"use client";

import { useRouter } from "next/navigation";

const BagIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="39.9985" height="39.9997" rx="8" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M18.8078 30.8003H17.1255C12.8237 30.8003 10.6735 30.8003 9.33673 29.4383C8 28.0763 8 25.8851 8 21.5003C8 17.1166 8 14.9242 9.33673 13.5622C10.6735 12.2002 12.8237 12.2002 17.1255 12.2002H21.6889C25.9906 12.2002 28.1421 12.2002 29.4789 13.5622C30.5072 14.6098 30.7436 16.1494 30.7988 18.8002" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M18.8078 30.8003H17.1255C12.8237 30.8003 10.6735 30.8003 9.33673 29.4383C8 28.0763 8 25.8851 8 21.5003C8 17.1166 8 14.9242 9.33673 13.5622C10.6735 12.2002 12.8237 12.2002 17.1255 12.2002H21.6889C25.9906 12.2002 28.1421 12.2002 29.4789 13.5622C30.5072 14.6098 30.7436 16.1494 30.7988 18.8002" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M29.6191 29.6273L31.9985 31.9997M30.8622 26.6308C30.8716 26.0691 30.7692 25.5111 30.5608 24.9894C30.3524 24.4677 30.0422 23.9927 29.6483 23.5921C29.2544 23.1915 28.7847 22.8734 28.2666 22.6562C27.7485 22.439 27.1924 22.3271 26.6306 22.3271C26.0688 22.3271 25.5127 22.439 24.9946 22.6562C24.4765 22.8734 24.0068 23.1915 23.6129 23.5921C23.219 23.9927 22.9089 24.4677 22.7005 24.9894C22.492 25.5111 22.3896 26.0691 22.399 26.6308C22.4177 27.7409 22.8718 28.7991 23.6633 29.5775C24.4549 30.3558 25.5205 30.792 26.6306 30.792C27.7407 30.792 28.8064 30.3558 29.5979 29.5775C30.3895 28.7991 30.8435 27.7409 30.8622 26.6308Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.7994 12.2L24.6794 11.828C24.0855 9.98002 23.7891 9.05601 23.0823 8.528C22.3744 8 21.436 8 19.5557 8H19.2401C17.3622 8 16.4227 8 15.7159 8.528C15.0079 9.05601 14.7116 9.98002 14.1176 11.828L14 12.2" stroke="#A2CE3A" strokeWidth="1.5"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="40" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="37.6" height="40.0004" rx="8" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M23.6 8V12.8M14 8V12.8M29.6 20C29.6 15.4748 29.6 13.2116 28.1936 11.8064C26.7872 10.4012 24.5252 10.4 20 10.4H17.6C13.0748 10.4 10.8116 10.4 9.4064 11.8064C8.0012 13.2128 8 15.4748 8 20V22.4C8 26.9252 8 29.1884 9.4064 30.5936C10.8128 31.9988 13.0748 32 17.6 32M8 17.6H29.6" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26.3204 28.0416L24.8 27.2004V25.1208M29.6 27.2004C29.6 28.4734 29.0943 29.6943 28.1941 30.5945C27.2939 31.4947 26.073 32.0004 24.8 32.0004C23.527 32.0004 22.3061 31.4947 21.4059 30.5945C20.5057 29.6943 20 28.4734 20 27.2004C20 25.9274 20.5057 24.7065 21.4059 23.8063C22.3061 22.9061 23.527 22.4004 24.8 22.4004C26.073 22.4004 27.2939 22.9061 28.1941 23.8063C29.0943 24.7065 29.6 25.9274 29.6 27.2004Z" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellIcon = () => (
  <svg width="40" height="40" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="39" height="40" rx="8" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M23.9726 27.5789C23.9726 28.1595 23.8569 28.7344 23.6321 29.2708C23.4073 29.8072 23.0778 30.2946 22.6625 30.7051C22.2471 31.1156 21.754 31.4413 21.2113 31.6635C20.6687 31.8856 20.087 32 19.4996 32C18.9122 32 18.3306 31.8856 17.7879 31.6635C17.2452 31.4413 16.7521 31.1156 16.3368 30.7051C15.9214 30.2946 15.5919 29.8072 15.3672 29.2708C15.1424 28.7344 15.0267 28.1595 15.0267 27.5789M28.7407 27.5789H10.2598C9.81273 27.5788 9.37575 27.4476 9.00411 27.2019C8.63246 26.9563 8.34284 26.6073 8.17186 26.199C8.00088 25.7907 7.95622 25.3415 8.04352 24.9081C8.13082 24.4747 8.34616 24.0766 8.66232 23.7642L9.43167 23.0025C10.1503 22.2918 10.5539 21.3281 10.5537 20.3234V16.8421C10.5537 14.497 11.4962 12.248 13.1739 10.5898C14.8516 8.93158 17.127 8 19.4996 8C21.8722 8 24.1476 8.93158 25.8253 10.5898C27.503 12.248 28.4455 14.497 28.4455 16.8421V20.3234C28.4457 21.3283 28.8498 22.292 29.5689 23.0025L30.3395 23.7642C30.655 24.0769 30.8698 24.4749 30.9568 24.9081C31.0437 25.3412 30.9989 25.7902 30.828 26.1982C30.6572 26.6063 30.3679 26.9552 29.9966 27.2009C29.6254 27.4466 29.1875 27.5782 28.7407 27.5789Z" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface NotificationItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}

interface NotificationSection {
  label: string;
  items: NotificationItem[];
}

const sections: NotificationSection[] = [
  {
    label: "New Notification",
    items: [
      { icon: <BagIcon />, title: "Job Applications", description: "Your manager Happiness has applied to 15 job posts today.", time: "15m ago", unread: true },
      { icon: <CalendarIcon />, title: "Interview scheduled", description: "You have an interview prep scheduled.", time: "15m ago", unread: true },
      { icon: <BellIcon />, title: "Job Applications", description: "You've secured an interview with one of the companies you applied to.", time: "15m ago", unread: true },
    ],
  },
  {
    label: "Today",
    items: [
      { icon: <CalendarIcon />, title: "Interview scheduled", description: "You have an interview prep scheduled.", time: "3hrs ago" },
      { icon: <BellIcon />, title: "Job Applications", description: "You've secured an interview with one of the companies you applied to.", time: "3hrs ago" },
      { icon: <BagIcon />, title: "Job Applications", description: "Your manager Happiness has applied to 15 job posts today.", time: "3hrs ago" },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { icon: <CalendarIcon />, title: "Interview scheduled", description: "You have an interview prep scheduled.", time: "2nd June, 2026" },
    ],
  },
];

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div
        className="mx-auto rounded-[24px] overflow-hidden"
        style={{ background: "#0e1617", border: "1px solid #FFFFFF1A" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <h1 className="text-white font-mona-sans font-bold text-lg">Notifications</h1>

          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="5" r="1.5" fill="white"/>
              <circle cx="12" cy="12" r="1.5" fill="white"/>
              <circle cx="12" cy="19" r="1.5" fill="white"/>
            </svg>
          </button>
        </div>

        {/* Sections */}
        <div className="px-6 py-4">
          {sections.map((section) => (
            <div key={section.label} className="mb-6">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-mona-sans font-bold text-base">{section.label}</h2>
                {section.label === "New Notification" && (
                  <button className="text-[#A2CE3A] font-mona-sans text-sm hover:opacity-80 transition-opacity">
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Items */}
              <div className="flex flex-col gap-1">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white font-mona-sans font-semibold text-sm">{item.title}</span>
                        {item.unread && <span className="w-2 h-2 rounded-full bg-[#A2CE3A] flex-shrink-0" />}
                      </div>
                      <p className="text-[#9CA3AF] font-mona-sans text-xs leading-relaxed">
                        {item.description}{" "}
                        <span className="text-[#A2CE3A]">{item.time}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
