"use client";

import Link from "next/link";

/* ─── SVG Icons ─── */

const TotalClientsSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M21.4964 14.8962C18.3831 14.8962 15.8594 17.42 15.8594 20.5332C15.8594 23.6465 18.3831 26.1702 21.4964 26.1702C24.6096 26.1702 27.1331 23.6465 27.1331 20.5332C27.1331 17.42 24.6094 14.8962 21.4964 14.8962ZM21.4964 23.6852C19.7554 23.6852 18.3441 22.274 18.3441 20.5332C18.3441 18.7925 19.7554 17.381 21.4964 17.381C23.2374 17.381 24.6484 18.7922 24.6484 20.5332C24.6484 22.274 23.2371 23.6852 21.4964 23.6852Z" fill="#A2CE3A"/>
    <path d="M21.5 11.1582C16.322 11.1582 12.125 15.3565 12.125 20.5337C12.125 25.711 16.322 29.9082 21.5 29.9082C26.678 29.9082 30.875 25.7112 30.875 20.5337C30.875 15.3562 26.678 11.1582 21.5 11.1582ZM21.5 27.4235C17.7002 27.4235 14.61 24.333 14.61 20.5337C14.61 16.735 17.7005 13.6432 21.5 13.6432C25.2995 13.6432 28.39 16.735 28.39 20.5337C28.39 24.3325 25.2995 27.4235 21.5 27.4235Z" fill="#A2CE3A"/>
    <path d="M21.4951 22.4384C22.5473 22.4384 23.4003 21.5854 23.4003 20.5332C23.4003 19.4809 22.5473 18.6279 21.4951 18.6279C20.4429 18.6279 19.5898 19.4809 19.5898 20.5332C19.5898 21.5854 20.4429 22.4384 21.4951 22.4384Z" fill="#A2CE3A"/>
  </svg>
);

const UpcomingSessionsSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M20.507 29.5332H19.105C15.52 29.5332 13.728 29.5332 12.614 28.3982C11.5 27.2632 11.5 25.4372 11.5 21.7832C11.5 18.1302 11.5 16.3032 12.614 15.1682C13.728 14.0332 15.52 14.0332 19.105 14.0332H22.908C26.493 14.0332 28.286 14.0332 29.4 15.1682C30.257 16.0412 30.454 17.3242 30.5 19.5332" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M20.507 29.5332H19.105C15.52 29.5332 13.728 29.5332 12.614 28.3982C11.5 27.2632 11.5 25.4372 11.5 21.7832C11.5 18.1302 11.5 16.3032 12.614 15.1682C13.728 14.0332 15.52 14.0332 19.105 14.0332H22.908C26.493 14.0332 28.286 14.0332 29.4 15.1682C30.257 16.0412 30.454 17.3242 30.5 19.5332" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M29.5175 28.5562L31.5005 30.5332L29.5175 28.5562ZM30.5535 26.0592C30.5614 25.5911 30.476 25.1261 30.3023 24.6913C30.1286 24.2566 29.8701 23.8607 29.5419 23.5269C29.2136 23.1931 28.8222 22.9279 28.3904 22.747C27.9587 22.566 27.4952 22.4728 27.027 22.4728C26.5588 22.4728 26.0953 22.566 25.6636 22.747C25.2318 22.9279 24.8404 23.1931 24.5121 23.5269C24.1839 23.8607 23.9254 24.2566 23.7517 24.6913C23.578 25.1261 23.4926 25.5911 23.5005 26.0592C23.5161 26.9842 23.8945 27.866 24.5541 28.5147C25.2138 29.1633 26.1019 29.5268 27.027 29.5268C27.9521 29.5268 28.8402 29.1633 29.4999 28.5147C30.1595 27.866 30.5379 26.9842 30.5535 26.0592Z" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M29.5175 28.5562L31.5005 30.5332M30.5535 26.0592C30.5614 25.5911 30.476 25.1261 30.3023 24.6913C30.1286 24.2566 29.8701 23.8607 29.5419 23.5269C29.2136 23.1931 28.8222 22.9279 28.3904 22.747C27.9587 22.566 27.4952 22.4728 27.027 22.4728C26.5588 22.4728 26.0953 22.566 25.6636 22.747C25.2318 22.9279 24.8404 23.1931 24.5121 23.5269C24.1839 23.8607 23.9254 24.2566 23.7517 24.6913C23.578 25.1261 23.4926 25.5911 23.5005 26.0592C23.5161 26.9842 23.8945 27.866 24.5541 28.5147C25.2138 29.1633 26.1019 29.5268 27.027 29.5268C27.9521 29.5268 28.8402 29.1633 29.4999 28.5147C30.1595 27.866 30.5379 26.9842 30.5535 26.0592Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25.5 14.0332L25.4 13.7232C24.905 12.1832 24.658 11.4132 24.069 10.9732C23.479 10.5332 22.697 10.5332 21.13 10.5332H20.867C19.302 10.5332 18.519 10.5332 17.93 10.9732C17.34 11.4132 17.093 12.1832 16.598 13.7232L16.5 14.0332" stroke="#A2CE3A" strokeWidth="1.5"/>
  </svg>
);

const MonthlyEarningsSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M25 11.5V15.5M17 11.5V15.5M30 21.5C30 17.729 30 15.843 28.828 14.672C27.656 13.501 25.771 13.5 22 13.5H20C16.229 13.5 14.343 13.5 13.172 14.672C12.001 15.844 12 17.729 12 21.5V23.5C12 27.271 12 29.157 13.172 30.328C14.344 31.499 16.229 31.5 20 31.5M12 19.5H30" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M27.267 28.2009L26 27.4999V25.7669M30 27.4999C30 28.5607 29.5786 29.5782 28.8284 30.3283C28.0783 31.0784 27.0609 31.4999 26 31.4999C24.9391 31.4999 23.9217 31.0784 23.1716 30.3283C22.4214 29.5782 22 28.5607 22 27.4999C22 26.439 22.4214 25.4216 23.1716 24.6715C23.9217 23.9213 24.9391 23.4999 26 23.4999C27.0609 23.4999 28.0783 23.9213 28.8284 24.6715C29.5786 25.4216 30 26.439 30 27.4999Z" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AverageRatingSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M26 14.2334H33.2V21.4334" stroke="#A2CE3A" strokeWidth="1.83335" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M33.2008 14.2334L23.0308 24.4034C22.8625 24.5683 22.6364 24.6607 22.4008 24.6607C22.1652 24.6607 21.939 24.5683 21.7708 24.4034L17.6308 20.2634C17.4625 20.0985 17.2364 20.0061 17.0008 20.0061C16.7652 20.0061 16.539 20.0985 16.3708 20.2634L9.80078 26.8334" stroke="#A2CE3A" strokeWidth="1.83335" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarSmallSVG = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.08333 1.16667V2.91667M9.91667 1.16667V2.91667M1.75 5.25H12.25M2.91667 2.33333H11.0833C11.7277 2.33333 12.25 2.85565 12.25 3.5V11.0833C12.25 11.7277 11.7277 12.25 11.0833 12.25H2.91667C2.27233 12.25 1.75 11.7277 1.75 11.0833V3.5C1.75 2.85565 2.27233 2.33333 2.91667 2.33333Z" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BulletPointSVG = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="10" height="10" rx="5" fill="#A2CE3A"/>
  </svg>
);




const ScheduleSessionSVG = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.37138 3.73804C6.25813 3.73804 3.73438 6.26179 3.73438 9.37504C3.73438 12.4883 6.25813 15.012 9.37138 15.012C12.4846 15.012 15.0081 12.4883 15.0081 9.37504C15.0081 6.26179 12.4844 3.73804 9.37138 3.73804ZM9.37138 12.527C7.63037 12.527 6.21912 11.1158 6.21912 9.37504C6.21912 7.63429 7.63037 6.22279 9.37138 6.22279C11.1124 6.22279 12.5234 7.63404 12.5234 9.37504C12.5234 11.1158 11.1121 12.527 9.37138 12.527Z" fill="#A2CE3A"/>
    <path d="M9.375 0C4.197 0 0 4.19825 0 9.3755C0 14.5527 4.197 18.75 9.375 18.75C14.553 18.75 18.75 14.553 18.75 9.3755C18.75 4.198 14.553 0 9.375 0ZM9.375 16.2652C5.57525 16.2652 2.485 13.1747 2.485 9.3755C2.485 5.57675 5.5755 2.485 9.375 2.485C13.1745 2.485 16.265 5.57675 16.265 9.3755C16.265 13.1742 13.1745 16.2652 9.375 16.2652Z" fill="#A2CE3A"/>
    <path d="M9.37009 11.2802C10.4223 11.2802 11.2753 10.4272 11.2753 9.37498C11.2753 8.32274 10.4223 7.46973 9.37009 7.46973C8.31785 7.46973 7.46484 8.32274 7.46484 9.37498C7.46484 10.4272 8.31785 11.2802 9.37009 11.2802Z" fill="#A2CE3A"/>
  </svg>
);

const ViewPayoutsSVG = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.757 19.75H8.355C4.77 19.75 2.978 19.75 1.864 18.615C0.75 17.48 0.75 15.654 0.75 12C0.75 8.347 0.75 6.52 1.864 5.385C2.978 4.25 4.77 4.25 8.355 4.25H12.158C15.743 4.25 17.536 4.25 18.65 5.385C19.507 6.258 19.704 7.541 19.75 9.75" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M9.757 19.75H8.355C4.77 19.75 2.978 19.75 1.864 18.615C0.75 17.48 0.75 15.654 0.75 12C0.75 8.347 0.75 6.52 1.864 5.385C2.978 4.25 4.77 4.25 8.355 4.25H12.158C15.743 4.25 17.536 4.25 18.65 5.385C19.507 6.258 19.704 7.541 19.75 9.75" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18.7675 18.7731L20.7505 20.7501L18.7675 18.7731ZM19.8035 16.2761C19.8114 15.808 19.726 15.343 19.5523 14.9082C19.3786 14.4735 19.1201 14.0776 18.7919 13.7438C18.4636 13.41 18.0722 13.1449 17.6404 12.9639C17.2087 12.7829 16.7452 12.6897 16.277 12.6897C15.8088 12.6897 15.3453 12.7829 14.9136 12.9639C14.4818 13.1449 14.0904 13.41 13.7621 13.7438C13.4339 14.0776 13.1754 14.4735 13.0017 14.9082C12.828 15.343 12.7426 15.808 12.7505 16.2761C12.7661 17.2011 13.1445 18.0829 13.8041 18.7316C14.4638 19.3802 15.3519 19.7437 16.277 19.7437C17.2021 19.7437 18.0902 19.3802 18.7499 18.7316C19.4095 18.0829 19.7879 17.2011 19.8035 16.2761Z" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M18.7675 18.7731L20.7505 20.7501M19.8035 16.2761C19.8114 15.808 19.726 15.343 19.5523 14.9082C19.3786 14.4735 19.1201 14.0776 18.7919 13.7438C18.4636 13.41 18.0722 13.1449 17.6404 12.9639C17.2087 12.7829 16.7452 12.6897 16.277 12.6897C15.8088 12.6897 15.3453 12.7829 14.9136 12.9639C14.4818 13.1449 14.0904 13.41 13.7621 13.7438C13.4339 14.0776 13.1754 14.4735 13.0017 14.9082C12.828 15.343 12.7426 15.808 12.7505 16.2761C12.7661 17.2011 13.1445 18.0829 13.8041 18.7316C14.4638 19.3802 15.3519 19.7437 16.277 19.7437C17.2021 19.7437 18.0902 19.3802 18.7499 18.7316C19.4095 18.0829 19.7879 17.2011 19.8035 16.2761Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.75 4.25L14.65 3.94C14.155 2.4 13.908 1.63 13.319 1.19C12.729 0.75 11.947 0.75 10.38 0.75H10.117C8.552 0.75 7.769 0.75 7.18 1.19C6.59 1.63 6.343 2.4 5.848 3.94L5.75 4.25" stroke="#A2CE3A" strokeWidth="1.5"/>
  </svg>
);

const MockInterviewsSVG = () => (
  <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.36719 10.8929C8.57924 10.8929 9.55469 9.92861 9.55469 8.75004V3.75003C9.55469 2.57146 8.57924 1.60718 7.36719 1.60718C6.15513 1.60718 5.17969 2.57146 5.17969 3.75003V8.75004C5.17969 9.92861 6.15513 10.8929 7.36719 10.8929Z" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M14.7321 8.70543C14.7321 8.60721 14.6518 8.52686 14.5536 8.52686H13.2143C13.1161 8.52686 13.0357 8.60721 13.0357 8.70543C13.0357 11.8371 10.4978 14.3751 7.36607 14.3751C4.23437 14.3751 1.69643 11.8371 1.69643 8.70543C1.69643 8.60721 1.61607 8.52686 1.51786 8.52686H0.178571C0.0803571 8.52686 0 8.60721 0 8.70543C0 12.4711 2.82589 15.5782 6.47321 16.0179V18.3036H3.22991C2.92411 18.3036 2.67857 18.6228 2.67857 19.0179V19.8215C2.67857 19.9197 2.74107 20.0001 2.81696 20.0001H11.9152C11.9911 20.0001 12.0536 19.9197 12.0536 19.8215V19.0179C12.0536 18.6228 11.808 18.3036 11.5022 18.3036H8.16964V16.0291C11.8594 15.6273 14.7321 12.5023 14.7321 8.70543Z" fill="#A2CE3A"/>
    <path d="M7.36496 12.5C9.46094 12.5 11.1596 10.8214 11.1596 8.75V3.75C11.1596 1.67857 9.46094 0 7.36496 0C5.26897 0 3.57031 1.67857 3.57031 3.75V8.75C3.57031 10.8214 5.26897 12.5 7.36496 12.5ZM5.17746 3.75C5.17746 2.57143 6.1529 1.60714 7.36496 1.60714C8.57701 1.60714 9.55246 2.57143 9.55246 3.75V8.75C9.55246 9.92857 8.57701 10.8929 7.36496 10.8929C6.1529 10.8929 5.17746 9.92857 5.17746 8.75V3.75Z" fill="#A2CE3A"/>
  </svg>
);

const SkillInsightsSVG = () => (
  <svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.1172 0.916748H24.3172V8.11675" stroke="#A2CE3A" strokeWidth="1.83335" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.318 0.916748L14.148 11.0867C13.9797 11.2517 13.7535 11.344 13.518 11.344C13.2824 11.344 13.0562 11.2517 12.888 11.0867L8.74797 6.94675C8.57973 6.78184 8.35355 6.68948 8.11797 6.68948C7.88239 6.68948 7.65621 6.78184 7.48797 6.94675L0.917969 13.5167" stroke="#A2CE3A" strokeWidth="1.83335" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NavArrowSVG = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5H11M11 5L7.25 1M11 5L7.25 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ─── */

const stats = [
  { icon: <TotalClientsSVG />, label: "Total Clients", value: "23", sub: "+2 from last week", subColor: "text-[#A2CE3A]" },
  { icon: <UpcomingSessionsSVG />, label: "Upcoming Sessions", value: "12", sub: "Next, Today 10AM", subColor: "text-white/40" },
  { icon: <MonthlyEarningsSVG />, label: "Monthly Earnings", value: "$8,750", sub: "+12% vs last month", subColor: "text-[#A2CE3A]" },
  { icon: <AverageRatingSVG />, label: "Average Rating", value: "4.9", sub: "50 reviews", subColor: "text-white/40" },
];

const upcomingInterviews = [
  { name: "Alex Johnson", badge: "Technical", role: "Frontend Engineer", date: "Jan 16, 2026", time: "3:00 PM", action: "Join", actionColor: "bg-[#A2CE3A]" },
  { name: "Maria James", badge: "Technical", role: "Product Designer", date: "Jan 16, 2026", time: "4:00 PM", action: "Start Prep", actionColor: "bg-[#A2CE3A]" },
  { name: "Maria James", badge: "Technical", role: "Product Designer", date: "Jan 16, 2026", time: "4:00 PM", action: "Start Prep", actionColor: "bg-[#A2CE3A]" },
  { name: "Maria James", badge: "Technical", role: "Product Designer", date: "Jan 16, 2026", time: "4:00 PM", action: "Start Prep", actionColor: "bg-[#A2CE3A]" },
];

const recentActivities = [
  { title: "Session Completed", subtitle: "Lisa Smith - 2 hours ago" },
  { title: "New Booking", subtitle: "Brian Evans - 4 hours ago" },
  { title: "Review Received", subtitle: "Alice Chen - 1 day ago" },
  { title: "Payment Receieved", subtitle: "Yusra Alika - 2 days ago" },
];

const quickActions = [
  { icon: <ScheduleSessionSVG />, label: "Schedule Session", href: "/dashboard/sessions?us=coach" },
  { icon: <ViewPayoutsSVG />, label: "View Payouts", href: "/dashboard/earnings?us=coach" },
  { icon: <MockInterviewsSVG />, label: "Mock Interviews", href: "/dashboard/sessions?us=coach" },
  { icon: <SkillInsightsSVG />, label: "Skill Insights", href: "/dashboard/analytics?us=coach" },
];

/* ─── Component ─── */

export function CoachDashboard() {
  return (
    <div>
      {/* Welcome */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl flex items-center gap-3">
            Welcome back, Ricky 👋
          </h1>
          <p className="text-white/50 font-mona-sans text-sm mt-1">You have 12 sessions scheduled this week</p>
        </div>
        <div className="hidden lg:block">
          <span className="px-4 py-2 rounded-full bg-[#A2CE3A]/20 text-[#A2CE3A] text-sm font-mona-sans font-semibold">
            Approved Coach
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#161719] border border-white/10 rounded-[16px] p-5">
            <div className="mb-4">{stat.icon}</div>
            <p className="text-white/50 font-mona-sans text-xs mb-1">{stat.label}</p>
            <p className="text-white font-mona-sans font-bold text-2xl">{stat.value}</p>
            <p className={`font-mona-sans text-xs mt-1 ${stat.subColor}`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Upcoming Interviews */}
          <div>
            <h2 className="text-white font-mona-sans font-bold text-xl mb-4">Upcoming Interviews</h2>
            <div className="space-y-3">
              {upcomingInterviews.map((interview, i) => (
                <div key={i} className="bg-[#0B0D0F] border border-white/10 rounded-[16px] p-5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white font-mona-sans font-bold text-base">{interview.name}</span>
                      <span className="px-3 py-0.5 rounded-full bg-[#A2CE3A]/15 text-[#A2CE3A] text-xs font-mona-sans font-medium">{interview.badge}</span>
                    </div>
                    <p className="text-white/50 font-mona-sans text-sm">{interview.role}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-white/40 font-mona-sans text-xs">
                      <CalendarSmallSVG />
                      <span>{interview.date} &nbsp; {interview.time}</span>
                    </div>
                  </div>
                  <button className={`px-5 py-2 rounded-[10px] ${interview.actionColor} text-[#0B0D0F] font-mona-sans font-semibold text-sm hover:opacity-90 transition-opacity`}>
                    {interview.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Overview */}
          <div>
            <h2 className="text-white font-mona-sans font-bold text-xl mb-4">Payment Overview</h2>
            <div className="bg-[#161719] border border-white/10 rounded-[16px] p-6">
              <div className="bg-[#1E1F21] rounded-[12px] p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-white/50 font-mona-sans text-sm">Jan</span>
                  <span className="text-white/50 font-mona-sans text-sm">Feb</span>
                  <span className="text-white/50 font-mona-sans text-sm">Mar</span>
                  <span className="text-white/50 font-mona-sans text-sm">Apr</span>
                  <span className="text-white/50 font-mona-sans text-sm">May</span>
                  <span className="text-white/50 font-mona-sans text-sm">Jun</span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-4 h-[200px]">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-[#A2CE3A] rounded-t-lg relative" style={{ height: "140px" }}>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#161719] border border-white/10 rounded-lg px-3 py-2 whitespace-nowrap">
                      <p className="text-white font-mona-sans text-xs font-semibold">February</p>
                      <p className="text-[#A2CE3A] font-mona-sans text-sm font-bold">$8,750 USD</p>
                    </div>
                  </div>
                  <span className="text-white/50 font-mona-sans text-xs">Jan</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-[#A2CE3A] rounded-t-lg" style={{ height: "160px" }}></div>
                  <span className="text-white/50 font-mona-sans text-xs">Feb</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-[#A2CE3A] rounded-t-lg" style={{ height: "180px" }}></div>
                  <span className="text-white/50 font-mona-sans text-xs">Mar</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-[#A2CE3A] rounded-t-lg" style={{ height: "220px" }}></div>
                  <span className="text-white/50 font-mona-sans text-xs">Apr</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-[#A2CE3A] rounded-t-lg" style={{ height: "200px" }}></div>
                  <span className="text-white/50 font-mona-sans text-xs">May</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-[#A2CE3A] rounded-t-lg" style={{ height: "240px" }}></div>
                  <span className="text-white/50 font-mona-sans text-xs">Jun</span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Clients You're Working With */}
          <div>
            <div className="bg-[#161719] border border-white/10 rounded-[16px] p-4">
              <h2 className="text-white font-mona-sans font-bold text-base mb-3">Clients You&apos;re Working With</h2>
              <div className="relative rounded-[12px] overflow-hidden">
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-[#A2CE3A]/20 text-[#A2CE3A] text-[10px] font-mona-sans font-semibold">
                    Data Science
                  </span>
                </div>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" alt="Client" className="w-full h-[200px] object-cover" />
              </div>
              <div className="mt-3">
                <span className="text-white font-mona-sans font-bold text-sm">Abdullahi Muhammed</span>
              </div>
              {/* Nav arrows */}
              <div className="flex items-center justify-end gap-2 mt-3">
                <button className="cursor-pointer"><img src="/leftarrow.png" alt="Previous" width={28} height={28} /></button>
                <button className="cursor-pointer"><img src="/rightarrow.png" alt="Next" width={28} height={28} /></button>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <h2 className="text-white font-mona-sans font-bold text-base mb-3">Recent Activities</h2>
            <div className="bg-[#161719] border border-white/10 rounded-[16px] divide-y divide-white/5">
              {recentActivities.map((activity, i) => (
                <div key={i} className="px-4 py-4 flex items-start gap-3">
                  <div className="mt-1"><BulletPointSVG /></div>
                  <div>
                    <p className="text-white font-mona-sans font-semibold text-sm">{activity.title}</p>
                    <p className="text-white/40 font-mona-sans text-xs">{activity.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-white font-mona-sans font-bold text-base mb-3">Quick Actions</h2>
            <div className="bg-[#161719] border border-white/10 rounded-[16px] divide-y divide-white/5">
              {quickActions.map((action, i) => (
                <Link key={i} href={action.href} className="block first:rounded-t-[16px] last:rounded-b-[16px]">
                  <div className="bg-[#1D1E20] mx-3 my-3 rounded-[12px] px-4 py-3.5 flex items-center justify-between hover:bg-[#252628] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-[#A2CE3A]">{action.icon}</span>
                      <span className="text-white font-mona-sans text-sm">{action.label}</span>
                    </div>
                    <span className="text-white"><NavArrowSVG /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
