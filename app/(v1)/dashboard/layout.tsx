"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { AvatarProvider } from "@/context/AvatarContext";
import { useAuthMe } from "@/hooks/useUserData";
import UpgradeModal from "@/components/v1-dashboard/layout/UpgradeModal";

function UpgradeModalController() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isOpenUpgradeModal = searchParams.get("upgrade") === "true";

  const handleCloseUpgradeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("upgrade");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <UpgradeModal
      isOpen={isOpenUpgradeModal}
      onClose={handleCloseUpgradeModal}
      onUpgrade={() => {}}
    />
  );
}

const DashboardIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6666 4.00668L8.29992 0.513346C7.44659 -0.166654 6.11326 -0.173321 5.26659 0.506679L0.899923 4.00668C0.273257 4.50668 -0.106743 5.50668 0.0265899 6.29334L0.86659 11.32C1.05992 12.4467 2.10659 13.3333 3.24659 13.3333H10.3133C11.4399 13.3333 12.5066 12.4267 12.6999 11.3133L13.5399 6.28668C13.6599 5.50668 13.2799 4.50668 12.6666 4.00668ZM7.27992 10.6667C7.27992 10.94 7.05326 11.1667 6.77992 11.1667C6.50659 11.1667 6.27992 10.94 6.27992 10.6667V8.66668C6.27992 8.39334 6.50659 8.16668 6.77992 8.16668C7.05326 8.16668 7.27992 8.39334 7.27992 8.66668V10.6667Z"
      fill="currentColor"
    />
  </svg>
);

const ApplicationTrackerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.24707 5.91992H11.7471"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.25293 5.91992L4.75293 6.41992L6.25293 4.91992"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.24707 10.5869H11.7471"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.25293 10.5869L4.75293 11.0869L6.25293 9.58691"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.99967 14.6663H9.99967C13.333 14.6663 14.6663 13.333 14.6663 9.99967V5.99967C14.6663 2.66634 13.333 1.33301 9.99967 1.33301H5.99967C2.66634 1.33301 1.33301 2.66634 1.33301 5.99967V9.99967C1.33301 13.333 2.66634 14.6663 5.99967 14.6663Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.4398 10.9603L17.7865 13.747C17.2265 16.1537 16.1198 17.127 14.0398 16.927C13.7065 16.9003 13.3465 16.8403 12.9598 16.747L11.8398 16.4803C9.05979 15.8203 8.19979 14.447 8.85313 11.6603L9.50646 8.867C9.63979 8.30033 9.79979 7.807 9.99979 7.40033C10.7798 5.787 12.1065 5.35366 14.3331 5.88033L15.4465 6.14033C18.2398 6.79366 19.0931 8.17366 18.4398 10.9603Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.0402 16.9271C13.6269 17.2071 13.1069 17.4404 12.4736 17.6471L11.4202 17.9937C8.77356 18.8471 7.38023 18.1337 6.52023 15.4871L5.66689 12.8537C4.81356 10.2071 5.52023 8.80706 8.16689 7.95372L9.22023 7.60706C9.49356 7.52039 9.75356 7.44706 10.0002 7.40039C9.80023 7.80706 9.64023 8.30039 9.50689 8.86706L8.85356 11.6604C8.20023 14.4471 9.06023 15.8204 11.8402 16.4804L12.9602 16.7471C13.3469 16.8404 13.7069 16.9004 14.0402 16.9271Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.4268 9.68652L15.6601 10.5065"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.7734 12.2666L13.7068 12.7599"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 6.07292V9.91958C2 11.3329 2 11.3329 3.33333 12.2329L7 14.3529C7.55333 14.6729 8.45333 14.6729 9 14.3529L12.6667 12.2329C14 11.3329 14 11.3329 14 9.92625V6.07292C14 4.66625 14 4.66625 12.6667 3.76625L9 1.64625C8.45333 1.32625 7.55333 1.32625 7 1.64625L3.33333 3.76625C2 4.66625 2 4.66625 2 6.07292Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CollapseIcon = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="24" height="24" rx="12" fill="#A2CE3A" />
    <rect
      x="0.25"
      y="0.25"
      width="24.5"
      height="24.5"
      rx="12.25"
      stroke="white"
      strokeOpacity="0.15"
      strokeWidth="0.5"
    />
    <path
      d="M14.5002 17.7797L10.1536 13.4331C9.64022 12.9197 9.64022 12.0797 10.1536 11.5664L14.5002 7.21973"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DividerSVG = () => (
  <svg
    width="228"
    height="1"
    viewBox="0 0 228 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_157_3616" fill="white">
      <path d="M12 0H216V1H12V0Z" />
    </mask>
    <path
      d="M216 1V0H12V1V2H216V1Z"
      fill="url(#paint0_radial_157_3616)"
      mask="url(#path-1-inside-1_157_3616)"
    />
    <defs>
      <radialGradient
        id="paint0_radial_157_3616"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(105.102 3.15959e-08 -1.84669e-05 9.47703 120.342 1)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A2CE3A" />
        <stop offset="1" stopColor="#156374" stopOpacity="0" />
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
  { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
  {
    name: "Application Tracker",
    href: "/dashboard/application-tracker",
    icon: <ApplicationTrackerIcon />,
  },
  { name: "Documents", href: "/dashboard/documents", icon: <DocumentIcon /> },
];

const accountNavLinks: NavLink[] = [
  { name: "Settings", href: "/dashboard/settings", icon: <SettingIcon /> },
];

export default function V1DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const { data: authData, isLoading: authLoading } = useAuthMe();
  const initialAvatar = (authData as any)?.user?.profile?.avatar ?? null;

  // In Progress
  const subcriptionPlanName = "Basi";

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [sessionStatus, pathname, router]);

  useEffect(() => {
    if (authLoading) return;
    if (authData && !authData.current_enrollment?.id) {
      router.replace("/?no-plan=true");
    }
  }, [authData, authLoading, router]);

  if (sessionStatus !== "authenticated" || authLoading) {
    return <div className="min-h-screen bg-[#01090B]" />;
  }

  return (
    <AvatarProvider initial={initialAvatar}>
      <Suspense fallback={null}>
        <UpgradeModalController />
      </Suspense>
      <div className="min-h-screen bg-[#01090B] flex">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#A2CE3A] rounded-lg flex items-center justify-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 5H17M3 10H17M3 15H17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
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
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } ${isCollapsed ? "w-64 lg:w-20" : "w-64"}`}
          style={{
            background:
              "linear-gradient(180deg, #0e1718 0%, #172520 50%, #27472c 100%)",
          }}
        >
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="px-6 py-6">
              <Link href="/">
                <img
                  src="/logo.svg"
                  alt="TalentLoop"
                  className={`transition-all duration-300 ${
                    isCollapsed ? "w-8" : "w-auto h-12"
                  }`}
                />
              </Link>
            </div>

            {/* Divider */}
            <div className="px-4 mb-6">{!isCollapsed && <DividerSVG />}</div>

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
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={
                          subcriptionPlanName?.toLowerCase() == "basic"
                            ? "/dashboard?upgrade=true"
                            : link.href
                        }
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

              {/* Account Section */}
              <div>
                {!isCollapsed && (
                  <p className="text-[#657997] text-xs font-mona-sans uppercase tracking-wider mb-3 px-3">
                    Account
                  </p>
                )}
                <div className="space-y-1">
                  {accountNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-mona-sans transition-colors ${
                          isActive
                            ? "text-[#E8EFF1] bg-[#0D65461A] border border-[#FFFFFF0D]"
                            : "text-[#E8EFF1] hover:bg-[#0D65461A]"
                        }`}
                        style={{
                          backgroundColor: isActive
                            ? "rgba(13, 101, 70, 0.1)"
                            : undefined,
                        }}
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
                    Having trouble in?
                    <br />
                    Please contact us
                  </p>
                  <Link
                    href="/contact"
                    className="w-full bg-[#A2CE3A] text-white font-mona-sans text-xs font-semibold py-2.5 px-4 rounded-[20px] hover:bg-[#92BE2A] transition-colors"
                    style={{
                      boxShadow: "0px 0px 16px 0px rgba(29, 57, 196, 0.2)",
                    }}
                  >
                    Contact us Now
                  </Link>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <div className="lg:hidden px-4 py-4 border-t border-white/10">
              <button
                onClick={() => {
                  import("@/lib/auth").then(({ clearAuthStorage }) => {
                    clearAuthStorage();
                  });
                  import("next-auth/react").then(({ signOut }) => {
                    signOut({ callbackUrl: "/" });
                  });
                }}
                className="w-full mt-3 flex items-center justify-center gap-2 p-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all border border-red-500/30"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H9"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="text-red-400 font-mona-sans text-sm font-semibold">
                    Logout
                  </span>
                )}
              </button>
            </div>

            {/* Collapse Button */}
            <div className="hidden lg:block absolute top-20 -right-4 px-4 pb-6">
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
    </AvatarProvider>
  );
}
