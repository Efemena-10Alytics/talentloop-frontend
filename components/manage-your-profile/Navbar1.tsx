import Link from "next/link";

const BellSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9ZM13.73 21a2 2 0 0 1-3.46 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function Navbar1() {
  return (
    <nav className="relative z-10 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <img src="/logo.svg" alt="TalentLoop" className="h-10 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-4">
          <button className="cursor-pointer relative">
            <BellSVG />
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-white/20 overflow-hidden">
              <img src="/coaches/coach1.jpg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <ChevronDownSVG />
          </div>
        </div>
      </div>
    </nav>
  );
}
