"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { clearAuthStorage } from "@/lib/auth";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const navLinks = [
  { text: "Find Interview Coach", link: "/coaches" },
  { text: "Auto Apply", link: "/auto-apply" },
  { text: "AI Copilot", link: "/ai-copilot" },
];

const v1Navlinks = [
  { text: "How it works", link: "#how-it-works" },
  { text: "Experts", link: "#experts" },
  { text: "Pricing Plan", link: "#pricing" },
  { text: "FAQs", link: "#faqs" },
];

export function Navbar({ v1Launch }: { v1Launch?: boolean }) {
  const { data: session } = useSession();
  const { userData } = useUserData();
  const router = useRouter();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignUpDropdown, setShowSignUpDropdown] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileSidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > heroHeight * 0.1);

      // Detect active section for v1 nav links
      if (v1Launch) {
        const sections = v1Navlinks.map((link) => link.link.replace("#", ""));
        let currentSection = "";

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is in viewport (with offset for navbar)
            if (rect.top <= 150 && rect.bottom >= 150) {
              currentSection = `#${sectionId}`;
              break;
            }
          }
        }

        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [v1Launch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSignUpDropdown(false);
      }
      if (
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(event.target as Node)
      ) {
        setShowMobileSidebar(false);
      }
    };

    if (showSignUpDropdown || showMobileSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSignUpDropdown, showMobileSidebar]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string,
  ) => {
    e.preventDefault();
    const targetId = link.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50">
    <div className="relative w-full">
        <div
          className={`absolute inset-0 bg-[url('/homepage/bg1.svg')] bg-cover bg-center shadow-lg transition-opacity duration-700 ease-in-out ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative mx-auto flex w-full max-w-[1400px] shadow-lg border-b border-[#FFFFFF0F] items-center justify-between gap-4 px-6 py-6">
          <div className="flex items-center justify-between lg:justify-start gap-3 lg:w-auto w-full">
            <a href="/">
              <img
                src="/logo.svg"
                alt="Talentloop logo"
                className="h-12 w-auto object-contain"
              />
            </a>

            <button
              onClick={() => setShowMobileSidebar(true)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Open menu"
            >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66634 10.667C5.92996 10.667 5.33301 11.2639 5.33301 12.0003C5.33301 12.7367 5.92996 13.3337 6.66634 13.3337H25.333C26.0694 13.3337 26.6663 12.7367 26.6663 12.0003C26.6663 11.2639 26.0694 10.667 25.333 10.667H6.66634Z" fill="#FCFCFD"/>
<path d="M6.66634 18.667C5.92996 18.667 5.33301 19.2639 5.33301 20.0003C5.33301 20.7367 5.92996 21.3337 6.66634 21.3337H25.333C26.0694 21.3337 26.6663 20.7367 26.6663 20.0003C26.6663 19.2639 26.0694 18.667 25.333 18.667H6.66634Z" fill="#FCFCFD"/>
</svg>

            </button>
          </div>

          {v1Launch ? (
            <nav className="hidden items-center gap-8 lg:flex">
              {v1Navlinks.map((link) => {
                const isActive = activeSection === link.link;
                return (
                  <a
                    href={link.link}
                    key={link.text}
                    onClick={(e) => handleNavClick(e, link.link)}
                    className={`text-sm font-normal transition-colors px-5 py-2 font-mona-sans cursor-pointer ${
                      isActive
                        ? "text-white bg-[#FFFFFF0F] rounded-[30px]"
                        : "text-[#B9B7BA] hover:text-white hover:bg-[#FFFFFF0F] hover:rounded-[30px]"
                    }`}
                  >
                    {link.text}
                  </a>
                );
              })}
            </nav>
          ) : (
            <nav className="hidden items-center gap-3 lg:flex">
              {navLinks.map((link) => (
                <Link
                  href={link.link}
                  key={link.text}
                  className="rounded-full bg-[#FFFFFF26] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#FFFFFF33] font-mona-sans"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          )}

          {session ? (
            <>
              <div className="lg:flex hidden items-center gap-3">
                {v1Launch ? (
                  <div
                    onClick={() => {
                      // Check if user has stripe_customer_id
                      if (userData?.user?.stripe_customer_id) {
                        // User has a plan, redirect to dashboard
                        router.push(
                          session.user?.role === "coach"
                            ? "#"
                            : "/dashboard",
                        );
                      } else {
                        // User doesn't have a plan, show toast and scroll to pricing
                        toast({
                          variant: "success",
                          title: "Get a Plan First",
                          description:
                            "Please choose an acceleration tier to access your dashboard.",
                        });

                        // Scroll to pricing section
                        const pricingSection =
                          document.querySelector("#pricing");
                        if (pricingSection) {
                          pricingSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }
                    }}
                    className="flex items-center gap-3 px-4 h-[52px] rounded-[31.11px] cursor-pointer transition-all hover:opacity-90"
                    style={{
                      background:
                        "linear-gradient(94.02deg, #222126 0%, #111116 100%)",
                      border: "0.78px solid #FFFFFF1A",
                      width: "170px",
                    }}
                  >
                    {/* User Initials Icon */}
                    <div className="h-[30px] w-[30px] rounded-full bg-[#3FB185] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-mona-sans text-xs font-semibold">
                        {(() => {
                          // Use profile data from user.profile if available
                          const firstName = userData?.user?.profile?.first_name;
                          const lastName = userData?.user?.profile?.last_name;

                          if (firstName && lastName) {
                            return (
                              (firstName[0]?.toUpperCase() || "") +
                              (lastName[0]?.toUpperCase() || "")
                            );
                          }

                          // Fallback to name from user object
                          const name =
                            userData?.user?.name ||
                            session.user?.name ||
                            "User";
                          const nameParts = name.split(" ");
                          const firstInitial =
                            nameParts[0]?.[0]?.toUpperCase() || "U";
                          const lastInitial =
                            nameParts[
                              nameParts.length - 1
                            ]?.[0]?.toUpperCase() || "";
                          return firstInitial + lastInitial;
                        })()}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <p className="text-white font-mona-sans text-xs font-semibold truncate">
                        Dashboard
                      </p>
                      <p className="text-[#FFFFFF99] font-mona-sans text-[10px] font-normal">
                        {userData?.user?.stripe_customer_id ? "Premium Account" : "No active plan"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={
                      session.user?.role === "coach"
                        ? "/dashboard?us=coach"
                        : "/dashboard"
                    }
                    className="w-10 h-10 rounded-full bg-white/20 overflow-hidden hover:ring-2 hover:ring-[#A2CE3A] transition-all cursor-pointer"
                  >
                    <img
                      src={
                        userData?.user?.photo ||
                        session.user?.image ||
                        "/coaches/coach1.jpg"
                      }
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                )}

                {/* Logout Icon */}
                <button
                  onClick={() => {
                    clearAuthStorage();
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/20 flex items-center justify-center transition-all hover:ring-2 hover:ring-red-500"
                  title="Logout"
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
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 17L21 12L16 7"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12H9"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/signin"
              className="lg:inline-block hidden px-8 py-3.5 rounded-[30px] text-white font-mona-sans text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(90deg, #071522 25%, #A2CE3A 100%)",
                boxShadow: "0px -6px 4px 0px #FFFFFF4D inset",
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileSidebar(false)}
          />
          <div
            ref={mobileSidebarRef}
            className="absolute left-0 top-0 h-full w-[280px] bg-[#0B0D0F] border-r border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
              <img
                src="/logo.svg"
                alt="TalentLoop"
                className="h-10 w-auto object-contain"
              />
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
              {v1Launch
                ? v1Navlinks.map((link) => {
                    const isActive = activeSection === link.link;
                    return (
                      <a
                        key={link.text}
                        href={link.link}
                        onClick={(e) => {
                          handleNavClick(e, link.link);
                          setShowMobileSidebar(false);
                        }}
                        className={`block rounded-lg px-5 py-3 text-sm font-semibold transition-colors font-mona-sans cursor-pointer ${
                          isActive
                            ? "text-white bg-[#FFFFFF0F]"
                            : "bg-[#FFFFFF26] text-white hover:bg-[#FFFFFF33]"
                        }`}
                      >
                        {link.text}
                      </a>
                    );
                  })
                : navLinks.map((link) => (
                    <Link
                      key={link.text}
                      href={link.link}
                      className="block rounded-lg bg-[#FFFFFF26] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FFFFFF33] font-mona-sans"
                      onClick={() => setShowMobileSidebar(false)}
                    >
                      {link.text}
                    </Link>
                  ))}
            </nav>

            {session ? (
              <div className="px-4 pb-6 border-t border-white/10 pt-4 w-full">
                <div className="flex items-center gap-3 w-full">
                  <div
                    onClick={() => {
                      // Check if user has stripe_customer_id
                      if (userData?.user?.stripe_customer_id) {
                        // User has a plan, redirect to dashboard
                        router.push(
                          session.user?.role === "coach" ? "#" : "/dashboard",
                        );
                      } else {
                        // User doesn't have a plan, show toast and scroll to pricing
                        toast({
                          variant: "success",
                          title: "Get a Plan First",
                          description:
                            "Please choose an acceleration tier to access your dashboard.",
                        });

                        // Scroll to pricing section
                        const pricingSection =
                          document.querySelector("#pricing");
                        if (pricingSection) {
                          pricingSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }
                    }}
                    className="flex items-center gap-3 px-4 h-[52px] w-full rounded-[31.11px] cursor-pointer transition-all hover:opacity-90"
                    style={{
                      background:
                        "linear-gradient(94.02deg, #222126 0%, #111116 100%)",
                      border: "0.78px solid #FFFFFF1A",
                    }}
                  >
                    {/* User Initials Icon */}
                    <div className="h-[30px] w-[30px] rounded-full bg-[#3FB185] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-mona-sans text-xs font-semibold">
                        {(() => {
                          // Use profile data from user.profile if available
                          const firstName = userData?.user?.profile?.first_name;
                          const lastName = userData?.user?.profile?.last_name;

                          if (firstName && lastName) {
                            return (
                              (firstName[0]?.toUpperCase() || "") +
                              (lastName[0]?.toUpperCase() || "")
                            );
                          }

                          // Fallback to name from user object
                          const name =
                            userData?.user?.name ||
                            session.user?.name ||
                            "User";
                          const nameParts = name.split(" ");
                          const firstInitial =
                            nameParts[0]?.[0]?.toUpperCase() || "U";
                          const lastInitial =
                            nameParts[
                              nameParts.length - 1
                            ]?.[0]?.toUpperCase() || "";
                          return firstInitial + lastInitial;
                        })()}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col justify-center flex-1 min-w-0 w-full">
                      <p className="text-white font-mona-sans text-xs font-semibold truncate">
                        Dashboard
                      </p>
                      <p className="text-[#FFFFFF99] font-mona-sans text-[10px] font-normal">
                        {userData?.user?.stripe_customer_id
                          ? "Premium Account"
                          : "No active plan"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    clearAuthStorage();
                    signOut({ callbackUrl: "/" });
                    setShowMobileSidebar(false);
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
                  <span className="text-red-400 font-mona-sans text-sm font-semibold">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="px-4 pb-6 space-y-3 border-t border-white/10 pt-4">
                <Link
                  href="/signin"
                  className="block rounded-lg bg-[#A2CE3A] px-5 py-3 text-sm font-semibold text-[#121212] transition-colors hover:bg-[#92BE2A] font-mona-sans text-center"
                  onClick={() => setShowMobileSidebar(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
