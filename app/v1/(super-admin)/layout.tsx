"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6666 4.00668L8.29992 0.513346C7.44659 -0.166654 6.11326 -0.173321 5.26659 0.506679L0.899923 4.00668C0.273257 4.50668 -0.106743 5.50668 0.0265899 6.29334L0.86659 11.32C1.05992 12.4467 2.10659 13.3333 3.24659 13.3333H10.3133C11.4399 13.3333 12.5066 12.4267 12.6999 11.3133L13.5399 6.28668C13.6599 5.50668 13.2799 4.50668 12.6666 4.00668ZM7.27992 10.6667C7.27992 10.94 7.05326 11.1667 6.77992 11.1667C6.50659 11.1667 6.27992 10.94 6.27992 10.6667V8.66668C6.27992 8.39334 6.50659 8.16668 6.77992 8.16668C7.05326 8.16668 7.27992 8.39334 7.27992 8.66668V10.6667Z" fill="currentColor"/>
  </svg>
);

const ClientsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.55333C11.96 4.54667 11.9133 4.54667 11.8733 4.55333C10.9533 4.52 10.22 3.76667 10.22 2.83333C10.22 1.88 10.9867 1.11333 11.94 1.11333C12.8933 1.11333 13.66 1.88667 13.66 2.83333C13.6533 3.76667 12.92 4.52 12 4.55333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3135 9.62C12.2268 9.77333 13.2335 9.61333 13.9468 9.14C14.8868 8.52 14.8868 7.49333 13.9468 6.87333C13.2268 6.40667 12.2068 6.24667 11.2935 6.40667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.98021 4.55333C4.02021 4.54667 4.06688 4.54667 4.10688 4.55333C5.02688 4.52 5.76021 3.76667 5.76021 2.83333C5.76021 1.88 4.99355 1.11333 4.04021 1.11333C3.08688 1.11333 2.32021 1.88667 2.32021 2.83333C2.32688 3.76667 3.06021 4.52 3.98021 4.55333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.66667 9.62C3.75333 9.77333 2.74667 9.61333 2.03333 9.14C1.09333 8.52 1.09333 7.49333 2.03333 6.87333C2.75333 6.40667 3.77333 6.24667 4.68667 6.40667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.00016 9.74667C7.96016 9.74 7.91349 9.74 7.87349 9.74667C6.95349 9.71333 6.22016 8.96 6.22016 8.02667C6.22016 7.07333 6.98683 6.30667 7.94016 6.30667C8.89349 6.30667 9.66016 7.08 9.66016 8.02667C9.65349 8.96 8.92016 9.72 8.00016 9.74667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.06 11.8667C5.12 12.4867 5.12 13.5133 6.06 14.1333C7.12667 14.84 8.87333 14.84 9.94 14.1333C10.88 13.5133 10.88 12.4867 9.94 11.8667C8.88 11.1667 7.12667 11.1667 6.06 11.8667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ManagersIcon = () => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.4866 7.51032C18.2904 7.54315 18.1153 7.65256 17.9998 7.81449C17.8843 7.97641 17.8378 8.17758 17.8706 8.37376C17.9468 8.82855 17.985 9.28889 17.985 9.75001C17.9868 11.7696 17.2445 13.719 15.9 15.2259C15.0635 14.0138 13.8874 13.0761 12.5194 12.5306C13.2542 11.9519 13.7904 11.1585 14.0534 10.2609C14.3165 9.36321 14.2932 8.40591 13.987 7.52209C13.6807 6.63826 13.1066 5.87184 12.3446 5.32941C11.5825 4.78697 10.6704 4.49549 9.73501 4.49549C8.79963 4.49549 7.88749 4.78697 7.12544 5.32941C6.3634 5.87184 5.78933 6.63826 5.48306 7.52209C5.17679 8.40591 5.15355 9.36321 5.41658 10.2609C5.6796 11.1585 6.21581 11.9519 6.95064 12.5306C5.58265 13.0761 4.40648 14.0138 3.57001 15.2259C2.51506 14.0372 1.82595 12.569 1.58555 10.9979C1.34515 9.42677 1.56369 7.81967 2.21489 6.36982C2.86609 4.91997 3.92223 3.68909 5.25631 2.82517C6.5904 1.96126 8.14563 1.50109 9.73501 1.50001C10.1961 1.49994 10.6565 1.53819 11.1113 1.61439C11.3066 1.6452 11.5061 1.59766 11.6665 1.48209C11.827 1.36653 11.9352 1.1923 11.9679 0.997306C12.0005 0.802308 11.9548 0.602316 11.8407 0.440833C11.7267 0.27935 11.5534 0.16944 11.3588 0.135011C9.32199 -0.207631 7.22902 0.105887 5.38204 1.0303C3.53507 1.95471 2.02966 3.44218 1.08318 5.27795C0.136702 7.11371 -0.201877 9.20277 0.116332 11.2435C0.43454 13.2842 1.39307 15.171 2.85352 16.6315C4.31398 18.092 6.20078 19.0505 8.24152 19.3687C10.2823 19.6869 12.3713 19.3483 14.2071 18.4018C16.0428 17.4554 17.5303 15.95 18.4547 14.103C19.3791 12.256 19.6927 10.163 19.35 8.12626C19.3172 7.93009 19.2078 7.75499 19.0458 7.63948C18.8839 7.52397 18.6827 7.47751 18.4866 7.51032ZM6.73501 9.00001C6.73501 8.40667 6.91096 7.82665 7.2406 7.3333C7.57025 6.83995 8.03878 6.45543 8.58696 6.22837C9.13514 6.00131 9.73834 5.9419 10.3203 6.05765C10.9022 6.17341 11.4368 6.45913 11.8563 6.87869C12.2759 7.29825 12.5616 7.8328 12.6774 8.41474C12.7931 8.99668 12.7337 9.59988 12.5066 10.1481C12.2796 10.6962 11.8951 11.1648 11.4017 11.4944C10.9084 11.8241 10.3284 12 9.73501 12C8.93936 12 8.1763 11.6839 7.61369 11.1213C7.05108 10.5587 6.73501 9.79566 6.73501 9.00001ZM4.68001 16.2656C5.22257 15.4171 5.97002 14.7188 6.85344 14.2351C7.73686 13.7514 8.72783 13.4978 9.73501 13.4978C10.7422 13.4978 11.7332 13.7514 12.6166 14.2351C13.5 14.7188 14.2474 15.4171 14.79 16.2656C13.3447 17.3897 11.566 17.9999 9.73501 17.9999C7.90405 17.9999 6.12532 17.3897 4.68001 16.2656ZM20.0156 2.03064L17.0156 5.03064C16.946 5.10037 16.8633 5.15569 16.7722 5.19343C16.6812 5.23117 16.5836 5.2506 16.485 5.2506C16.3864 5.2506 16.2889 5.23117 16.1978 5.19343C16.1068 5.15569 16.024 5.10037 15.9544 5.03064L14.4544 3.53064C14.3847 3.46095 14.3294 3.37823 14.2917 3.28718C14.254 3.19614 14.2346 3.09856 14.2346 3.00001C14.2346 2.90146 14.254 2.80388 14.2917 2.71284C14.3294 2.62179 14.3847 2.53907 14.4544 2.46939C14.5951 2.32866 14.786 2.24959 14.985 2.24959C15.0836 2.24959 15.1811 2.269 15.2722 2.30672C15.3632 2.34443 15.446 2.3997 15.5156 2.46939L16.485 3.4397L18.9544 0.969386C19.0241 0.899703 19.1068 0.844428 19.1978 0.806716C19.2889 0.769004 19.3865 0.749594 19.485 0.749594C19.5836 0.749594 19.6811 0.769004 19.7722 0.806716C19.8632 0.844428 19.946 0.899703 20.0156 0.969386C20.0853 1.03907 20.1406 1.12179 20.1783 1.21284C20.216 1.30388 20.2354 1.40146 20.2354 1.50001C20.2354 1.59856 20.216 1.69614 20.1783 1.78718C20.1406 1.87823 20.0853 1.96095 20.0156 2.03064Z" fill="currentColor"/>
  </svg>
);

const ApplicationTrackerIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.41667 14.0833H9.41667C12.75 14.0833 14.0833 12.75 14.0833 9.41667V5.41667C14.0833 2.08333 12.75 0.75 9.41667 0.75H5.41667C2.08333 0.75 0.75 2.08333 0.75 5.41667V9.41667C0.75 12.75 2.08333 14.0833 5.41667 14.0833Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PaymentsIcon = () => (
  <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.1475 1.12878C22.0395 1.06139 21.9162 1.02259 21.7891 1.01603C21.662 1.00947 21.5353 1.03536 21.4209 1.09128C17.3962 3.06003 14.5219 2.13753 11.4834 1.1644C8.29594 0.143465 4.99125 -0.911222 0.425625 1.31815C0.29806 1.37934 0.190404 1.47537 0.115091 1.59514C0.0397771 1.71491 -0.000122227 1.85354 2.81267e-07 1.99503V13.2385C-1.76404e-05 13.3657 0.0323425 13.4909 0.0940354 13.6022C0.155728 13.7135 0.244725 13.8072 0.35265 13.8747C0.460575 13.9421 0.583879 13.9809 0.710959 13.9876C0.838038 13.9942 0.964713 13.9684 1.07906 13.9125C5.10375 11.9438 7.97812 12.8663 11.0212 13.8394C12.825 14.416 14.6625 15.0038 16.74 15.0038C18.3422 15.0038 20.0897 14.655 22.0753 13.6857C22.2014 13.6241 22.3077 13.5283 22.3822 13.4094C22.4566 13.2904 22.4961 13.1529 22.4963 13.0125V1.76909C22.4974 1.64151 22.4659 1.51575 22.4049 1.4037C22.3439 1.29166 22.2553 1.19703 22.1475 1.12878ZM21 12.5353C17.1938 14.2388 14.4141 13.35 11.4788 12.4116C9.675 11.835 7.8375 11.2472 5.76 11.2472C4.30041 11.2543 2.85567 11.5407 1.50375 12.091V2.47222C5.31 0.768778 8.08969 1.65753 11.025 2.59597C13.9603 3.5344 16.9819 4.50378 21 2.91846V12.5353Z" fill="currentColor"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.3077 14.6087H16.6154V0.695652C16.6154 0.511154 16.5424 0.334212 16.4126 0.203752C16.2828 0.0732919 16.1067 0 15.9231 0H11.0769C10.8933 0 10.7172 0.0732919 10.5874 0.203752C10.4576 0.334212 10.3846 0.511154 10.3846 0.695652V4.17391H6.23077C6.04716 4.17391 5.87107 4.2472 5.74123 4.37767C5.6114 4.50813 5.53846 4.68507 5.53846 4.86957V8.34783H2.07692C1.89331 8.34783 1.71722 8.42112 1.58739 8.55158C1.45755 8.68204 1.38462 8.85898 1.38462 9.04348V14.6087H0.692308C0.508696 14.6087 0.332605 14.682 0.202772 14.8124C0.0729393 14.9429 0 15.1198 0 15.3043C0 15.4888 0.0729393 15.6658 0.202772 15.7962C0.332605 15.9267 0.508696 16 0.692308 16H17.3077C17.4913 16 17.6674 15.9267 17.7972 15.7962C17.9271 15.6658 18 15.4888 18 15.3043C18 15.1198 17.9271 14.9429 17.7972 14.8124C17.6674 14.682 17.4913 14.6087 17.3077 14.6087ZM11.7692 1.3913H15.2308V14.6087H11.7692V1.3913ZM6.92308 5.56522H10.3846V14.6087H6.92308V5.56522ZM2.76923 9.73913H5.53846V14.6087H2.76923V9.73913Z" fill="currentColor"/>
  </svg>
);

const CollapseIcon = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="24" height="24" rx="12" fill="#A2CE3A"/>
    <rect x="0.25" y="0.25" width="24.5" height="24.5" rx="12.25" stroke="white" strokeOpacity="0.15" strokeWidth="0.5"/>
    <path d="M14.5002 17.7797L10.1536 13.4331C9.64022 12.9197 9.64022 12.0797 10.1536 11.5664L14.5002 7.21973" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DividerSVG = () => (
  <svg width="228" height="1" viewBox="0 0 228 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_sa_sidebar" fill="white">
      <path d="M12 0H216V1H12V0Z"/>
    </mask>
    <path d="M216 1V0H12V1V2H216V1Z" fill="url(#paint0_radial_sa_sidebar)" mask="url(#path-1-inside-1_sa_sidebar)"/>
    <defs>
      <radialGradient id="paint0_radial_sa_sidebar" cx="0" cy="0" r="1" gradientTransform="matrix(105.102 3.15959e-08 -1.84669e-05 9.47703 120.342 1)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A2CE3A"/>
        <stop offset="1" stopColor="#156374" stopOpacity="0"/>
      </radialGradient>
    </defs>
  </svg>
);

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const mainNavLinks: NavLink[] = [
  { name: "Dashboard",           href: "/v1/super-admin/dashboard",           icon: <DashboardIcon /> },
  { name: "Clients",             href: "/v1/super-admin/clients",             icon: <ClientsIcon /> },
  { name: "Managers",            href: "/v1/super-admin/managers",            icon: <ManagersIcon /> },
  { name: "Application Tracker", href: "/v1/super-admin/application-tracker", icon: <ApplicationTrackerIcon /> },
  { name: "Payments",            href: "/v1/super-admin/payments",            icon: <PaymentsIcon /> },
];

const insightsNavLinks: NavLink[] = [
  { name: "Analytics", href: "/v1/super-admin/analytics", icon: <AnalyticsIcon /> },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const renderNavLink = (link: NavLink) => {
    const isActive =
      pathname === link.href ||
      (link.href !== "/v1/super-admin/dashboard" && pathname.startsWith(link.href));
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
          isActive ? "text-[#95ACCB] bg-white/5" : "text-[#95ACCB] hover:bg-white/5"
        }`}
      >
        <span className="flex-shrink-0">{link.icon}</span>
        {!isCollapsed && <span>{link.name}</span>}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#01090B] flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#A2CE3A] rounded-lg flex items-center justify-center"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5H17M3 10H17M3 15H17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen transition-all duration-300 z-40 flex-shrink-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-64"} overflow-hidden`}
        style={{
          background: "linear-gradient(180deg, #0e1718 0%, #172520 50%, #27472c 100%)",
        }}
      >
        <div className="flex flex-col h-full relative">
          {/* Logo */}
          <div className="px-6 py-6">
            <Link href="/v1/super-admin/dashboard">
              <img
                src="/logo.svg"
                alt="TalentLoop"
                className={`transition-all duration-300 ${isCollapsed ? "w-8" : "w-auto h-8"}`}
              />
            </Link>
          </div>

          {/* Divider */}
          <div className="px-4 mb-4">
            <DividerSVG />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 overflow-y-auto">
            {/* MAIN */}
            <div className="mb-6">
              {!isCollapsed && (
                <p className="text-[#657997] text-xs uppercase tracking-wider mb-3 px-3">
                  Main
                </p>
              )}
              <div className="space-y-1">
                {mainNavLinks.map(renderNavLink)}
              </div>
            </div>

            {/* INSIGHTS */}
            <div className="mb-6">
              {!isCollapsed && (
                <p className="text-[#657997] text-xs uppercase tracking-wider mb-3 px-3">
                  Insights
                </p>
              )}
              <div className="space-y-1">
                {insightsNavLinks.map(renderNavLink)}
              </div>
            </div>
          </nav>

          {/* Help Center */}
          {!isCollapsed && (
            <div className="p-4 mb-6">
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(162, 206, 58, 0.05)",
                  border: "0.5px solid rgba(162, 206, 58, 0.3)",
                }}
              >
                <h3 className="text-white font-semibold text-sm mb-2">Help Center</h3>
                <p className="text-[#F6FAEB] text-xs mb-4 leading-relaxed">
                  Having trouble in?<br />Please contact us
                </p>
                <button className="w-full bg-[#A2CE3A] text-white text-xs font-semibold py-2.5 px-4 rounded-[20px] hover:bg-[#92BE2A] transition-colors">
                  Contact us Now
                </button>
              </div>
            </div>
          )}

          {/* Collapse Button */}
          <div className="absolute top-20 -right-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            >
              <CollapseIcon />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
