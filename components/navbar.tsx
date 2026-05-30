"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const navLinks = [{text: "Find Interview Coach", link:"/coaches"}, {text: "Auto Apply", link:"/auto-apply"}, {text: "AI Copilot", link:"/ai-copilot"}];

const v1Navlinks = [
  {text: "How it works", link: "#how-it-works"},
  {text: "Pricing Plan", link: "#pricing"},
  {text: "FAQs", link: "#faqs"}
];

export function Navbar({ v1Launch }: {v1Launch?: boolean;}) {
  const { data: session } = useSession();
  const { userData } = useUserData();
  const router = useRouter();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignUpDropdown, setShowSignUpDropdown] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileSidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > heroHeight * 0.1); 
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSignUpDropdown(false);
      }
      if (mobileSidebarRef.current && !mobileSidebarRef.current.contains(event.target as Node)) {
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const targetId = link.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        
        <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-6 py-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="/">
            <img
              src="/logo.svg"
              alt="Talentloop logo"
              className="h-12 w-auto object-contain"
            />
            </a>
          </div>

{v1Launch ? (
          <nav className="hidden items-center gap-8 lg:flex">
            {v1Navlinks.map((link) => (
              <a
                href={link.link}
                key={link.text}
                onClick={(e) => handleNavClick(e, link.link)}
                className="text-sm font-normal text-white/60 transition-colors hover:text-white font-sora cursor-pointer"
              >
                {link.text}
              </a>
            ))}
          </nav>
): (
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
            {v1Launch ? (
              <div
                onClick={() => {
                  // Check if user has stripe_customer_id
                  if (userData?.user?.stripe_customer_id) {
                    // User has a plan, redirect to dashboard
                    router.push(session.user?.role === 'coach' ? '#' : '/v1/dashboard');
                  } else {
                    // User doesn't have a plan, show toast and scroll to pricing
                    toast({
                      variant: "success",
                      title: "Get a Plan First",
                      description: "Please choose an acceleration tier to access your dashboard.",
                    });
                    
                    // Scroll to pricing section
                    const pricingSection = document.querySelector('#pricing');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="w-10 h-10 rounded-full bg-white/20 overflow-hidden hover:ring-2 hover:ring-[#A2CE3A] transition-all cursor-pointer"
              >
                <img
                  src={userData?.user?.photo || session.user?.image || '/coaches/coach1.jpg'}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <Link
                href={session.user?.role === 'coach' ? '/dashboard?us=coach' : '/dashboard'}
                className="w-10 h-10 rounded-full bg-white/20 overflow-hidden hover:ring-2 hover:ring-[#A2CE3A] transition-all cursor-pointer"
              >
                <img
                  src={userData?.user?.photo || session.user?.image || '/coaches/coach1.jpg'}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </Link>
            )}
            </>
          ) : (
            <>
            {v1Launch ? (
              <Link
                href="/signup?v1=true"
                className="rounded-full bg-[#0B0D0F] border border-[#A2CE3A] px-8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#A2CE3A] hover:text-[#0B0D0F] font-mona-sans"
              >
                Sign Up
              </Link>
            ) : (

              <div className="relative" ref={dropdownRef}>
             <button
                type="button"
                onClick={() => setShowSignUpDropdown(!showSignUpDropdown)}
                className="rounded-full bg-[#A2CE3A] px-9 py-2 text-sm font-semibold text-[#121212] transition-transform hover:scale-[1.02] font-mona-sans"
              >
                Sign Up
              </button>
  
                {showSignUpDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-[175px] rounded-[10px] bg-[#1D242D] p-2 shadow-lg">
                    <Link
                      href="/signup?type=jobseeker"
                      className="block rounded-[8px] bg-[#151A20] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a2028] font-mona-sans mb-2"
                      onClick={() => setShowSignUpDropdown(false)}
                    >
                      As Jobseeker
                    </Link>
                    <Link
                      href="/signup?type=coach"
                      className="block rounded-[8px] bg-[#151A20] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a2028] font-mona-sans"
                      onClick={() => setShowSignUpDropdown(false)}
                    >
                      As Interview Coach
                    </Link>
                  </div>
                )}
              </div>
            )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileSidebar(false)} />
          <div
            ref={mobileSidebarRef}
            className="absolute left-0 top-0 h-full w-[280px] bg-[#0B0D0F] border-r border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
              <img src="/logo.svg" alt="TalentLoop" className="h-10 w-auto object-contain" />
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
              {v1Launch ? (
                v1Navlinks.map((link) => (
                  <a
                    key={link.text}
                    href={link.link}
                    onClick={(e) => {
                      handleNavClick(e, link.link);
                      setShowMobileSidebar(false);
                    }}
                    className="block rounded-lg bg-[#FFFFFF26] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FFFFFF33] font-mona-sans cursor-pointer"
                  >
                    {link.text}
                  </a>
                ))
              ) : (
                navLinks.map((link) => (
                  <Link
                    key={link.text}
                    href={link.link}
                    className="block rounded-lg bg-[#FFFFFF26] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FFFFFF33] font-mona-sans"
                    onClick={() => setShowMobileSidebar(false)}
                  >
                    {link.text}
                  </Link>
                ))
              )}
            </nav>

            {!session && (
              <div className="px-4 pb-6 space-y-3 border-t border-white/10 pt-4">
                <Link
                  href="/signup?type=jobseeker"
                  className="block rounded-lg bg-[#151A20] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a2028] font-mona-sans text-center"
                  onClick={() => setShowMobileSidebar(false)}
                >
                  Sign Up as Jobseeker
                </Link>
                <Link
                  href="/signup?type=coach"
                  className="block rounded-lg bg-[#A2CE3A] px-5 py-3 text-sm font-semibold text-[#121212] transition-colors hover:bg-[#92BE2A] font-mona-sans text-center"
                  onClick={() => setShowMobileSidebar(false)}
                >
                  Sign Up as Coach
                </Link>
                <Link
                  href="/signin"
                  className="block rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5 font-mona-sans text-center"
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
