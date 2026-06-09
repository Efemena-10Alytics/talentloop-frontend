"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── SVG Icons ─── */

const DashboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6666 4.00668L8.29992 0.513346C7.44659 -0.166654 6.11326 -0.173321 5.26659 0.506679L0.899923 4.00668C0.273257 4.50668 -0.106743 5.50668 0.0265899 6.29334L0.86659 11.32C1.05992 12.4467 2.10659 13.3333 3.24659 13.3333H10.3133C11.4399 13.3333 12.5066 12.4267 12.6999 11.3133L13.5399 6.28668C13.6599 5.50668 13.2799 4.50668 12.6666 4.00668ZM7.27992 10.6667C7.27992 10.94 7.05326 11.1667 6.77992 11.1667C6.50659 11.1667 6.27992 10.94 6.27992 10.6667V8.66668C6.27992 8.39334 6.50659 8.16668 6.77992 8.16668C7.05326 8.16668 7.27992 8.39334 7.27992 8.66668V10.6667Z" fill="currentColor"/>
  </svg>
);

const MyClientsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.55333C11.96 4.54667 11.9133 4.54667 11.8733 4.55333C10.9533 4.52 10.22 3.76667 10.22 2.83333C10.22 1.88 10.9867 1.11333 11.94 1.11333C12.8933 1.11333 13.66 1.88667 13.66 2.83333C13.6533 3.76667 12.92 4.52 12 4.55333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3135 9.62C12.2268 9.77333 13.2335 9.61333 13.9468 9.14C14.8868 8.52 14.8868 7.49333 13.9468 6.87333C13.2268 6.40667 12.2068 6.24667 11.2935 6.40667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.98021 4.55333C4.02021 4.54667 4.06688 4.54667 4.10688 4.55333C5.02688 4.52 5.76021 3.76667 5.76021 2.83333C5.76021 1.88 4.99355 1.11333 4.04021 1.11333C3.08688 1.11333 2.32021 1.88667 2.32021 2.83333C2.32688 3.76667 3.06021 4.52 3.98021 4.55333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.66667 9.62C3.75333 9.77333 2.74667 9.61333 2.03333 9.14C1.09333 8.52 1.09333 7.49333 2.03333 6.87333C2.75333 6.40667 3.77333 6.24667 4.68667 6.40667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.00016 9.74667C7.96016 9.74 7.91349 9.74 7.87349 9.74667C6.95349 9.71333 6.22016 8.96 6.22016 8.02667C6.22016 7.07333 6.98683 6.30667 7.94016 6.30667C8.89349 6.30667 9.66016 7.08 9.66016 8.02667C9.65349 8.96 8.92016 9.72 8.00016 9.74667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.06 11.8667C5.12 12.4867 5.12 13.5133 6.06 14.1333C7.12667 14.84 8.87333 14.84 9.94 14.1333C10.88 13.5133 10.88 12.4867 9.94 11.8667C8.88 11.1667 7.12667 11.1667 6.06 11.8667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ApplicationsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.24707 5.91992H11.7471" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.25293 5.91992L4.75293 6.41992L6.25293 4.91992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.24707 10.5869H11.7471" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.25293 10.5869L4.75293 11.0869L6.25293 9.58691" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.99967 14.6663H9.99967C13.333 14.6663 14.6663 13.333 14.6663 9.99967V5.99967C14.6663 2.66634 13.333 1.33301 9.99967 1.33301H5.99967C2.66634 1.33301 1.33301 2.66634 1.33301 5.99967V9.99967C1.33301 13.333 2.66634 14.6663 5.99967 14.6663Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4.66667V11.3333C14 13.3333 13 14.6667 10.6667 14.6667H5.33333C3 14.6667 2 13.3333 2 11.3333V4.66667C2 2.66667 3 1.33333 5.33333 1.33333H10.6667C13 1.33333 14 2.66667 14 4.66667Z" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.66699 3V4.33333C9.66699 5.06667 10.267 5.66667 11.0003 5.66667H12.3337" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.33301 8.66667H7.99967" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.33301 11.3333H10.6663" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MeetingSchedulerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.33301 1.33333V3.33333" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.667 1.33333V3.33333" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.33301 6.06H13.6663" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 5.66667V11.3333C14 13.3333 13 14.6667 10.6667 14.6667H5.33333C3 14.6667 2 13.3333 2 11.3333V5.66667C2 3.66667 3 2.33333 5.33333 2.33333H10.6667C13 2.33333 14 3.66667 14 5.66667Z" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.4631 9.13333H10.4691" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.4631 11.1333H10.4691" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.99715 9.13333H8.00314" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.99715 11.1333H8.00314" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.52938 9.13333H5.53537" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.52938 11.1333H5.53537" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    <mask id="path-1-inside-1_manager_sidebar" fill="white">
      <path d="M12 0H216V1H12V0Z"/>
    </mask>
    <path d="M216 1V0H12V1V2H216V1Z" fill="url(#paint0_radial_manager_sidebar)" mask="url(#path-1-inside-1_manager_sidebar)"/>
    <defs>
      <radialGradient id="paint0_radial_manager_sidebar" cx="0" cy="0" r="1" gradientTransform="matrix(105.102 3.15959e-08 -1.84669e-05 9.47703 120.342 1)" gradientUnits="userSpaceOnUse">
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
  { name: "Dashboard", href: "/v1/manager/dashboard", icon: <DashboardIcon /> },
  { name: "My Clients", href: "/v1/manager/clients", icon: <MyClientsIcon /> },
  { name: "Applications", href: "/v1/manager/applications", icon: <ApplicationsIcon /> },
  { name: "Documents", href: "/v1/manager/documents", icon: <DocumentsIcon /> },
  // { name: "Meeting Scheduler", href: "/v1/manager/meeting-scheduler", icon: <MeetingSchedulerIcon /> },
];

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
        className={`fixed lg:sticky top-0 left-0 h-screen transition-all duration-300 z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-64 lg:w-20" : "w-64"} overflow-hidden`}
        style={{
          background: "linear-gradient(180deg, #0e1718 0%, #172520 50%, #27472c 100%)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="px-6 py-6">
            <Link href="/v1/manager/dashboard">
              <img
                src="/logo.svg"
                alt="TalentLoop"
                className={`transition-all duration-300 ${
                  isCollapsed ? "w-8" : "w-auto h-8"
                }`}
              />
            </Link>
          </div>

          {/* Divider */}
          <div className="px-4 mb-6">
            <DividerSVG />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 overflow-y-auto">
            {/* Main Section */}
            <div className="mb-6">
              {!isCollapsed && (
                <p className="text-[#657997] text-xs font-mona-sans uppercase tracking-wider mb-3 px-3">
                  Main
                </p>
              )}
              <div className="space-y-1">
                {mainNavLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/v1/manager/dashboard" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mona-sans transition-colors ${
                        isActive
                          ? "text-[#95ACCB] bg-white/5"
                          : "text-[#95ACCB] hover:bg-white/5"
                      }`}
                    >
                      <span className="flex-shrink-0">{link.icon}</span>
                      {!isCollapsed && <span>{link.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Help Center */}
          {!isCollapsed && (
            <div className="p-4 mb-6">
              <div
                className="rounded-2xl p-4 relative overflow-hidden"
                style={{
                  background: "rgba(162, 206, 58, 0.05)",
                  border: "0.5px solid transparent",
                  backgroundImage:
                    "linear-gradient(rgba(162, 206, 58, 0.05), rgba(162, 206, 58, 0.05)), radial-gradient(100% 100% at 0% 0%, rgba(21, 99, 116, 0.144) 0%, rgba(162, 206, 58, 0.48) 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <h3 className="text-white font-mona-sans font-semibold text-sm mb-2">
                  Help Center
                </h3>
                <p className="text-[#F6FAEB] font-mona-sans text-xs mb-4 leading-relaxed">
                  Having trouble in?<br />
                  Please contact us
                </p>
                <button
                  className="w-full bg-[#A2CE3A] text-white font-mona-sans text-xs font-semibold py-2.5 px-4 rounded-[20px] hover:bg-[#92BE2A] transition-colors"
                  style={{
                    boxShadow: "0px 0px 16px 0px rgba(29, 57, 196, 0.2)",
                  }}
                >
                  Contact us Now
                </button>
              </div>
            </div>
          )}

          {/* Collapse Button */}
          <div className="absolute top-20 -right-4 px-4 pb-6">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            >
              <CollapseIcon />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "lg:ml-0" : "lg:ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
