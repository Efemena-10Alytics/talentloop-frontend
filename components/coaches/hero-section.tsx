"use client";

import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

const CheckmarkSVG = () => (
  <svg
    width="107"
    height="66"
    viewBox="0 0 107 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block align-middle w-[70px] h-[43px] md:w-[90px] md:h-[55px] lg:w-[107px] lg:h-[66px]"
  >
    <rect
      x="1.13756"
      y="1.13756"
      width="104.656"
      height="63.7034"
      rx="31.8517"
      stroke="#A2CE3A"
      strokeWidth="2.27512"
    />
    <path
      d="M60.2905 21.165C58.2164 19.9648 55.8616 19.3346 53.4652 19.3386C45.9259 19.3386 39.8145 25.45 39.8145 32.9893C39.8145 40.5286 45.9259 46.64 53.4652 46.64C61.0045 46.64 67.1159 40.5286 67.1159 32.9893C67.1141 32.0519 67.0231 31.1419 66.8429 30.2591"
      stroke="#A2CE3A"
      strokeWidth="3.32736"
      strokeLinecap="round"
    />
    <path
      d="M48.0051 33.6718C48.0051 33.6718 50.0527 33.6718 52.7829 38.4496C52.7829 38.4496 60.3713 25.936 67.1161 23.4338"
      stroke="#A2CE3A"
      strokeWidth="3.32736"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckmarkSVGSmall = () => (
  <svg
    width="67"
    height="66"
    viewBox="0 0 67 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="67" height="66" rx="33" fill="#0B0D0F" />
    <path
      d="M39.4761 20.8265C37.4019 19.6262 35.0471 18.9961 32.6507 19C25.1114 19 19 25.1114 19 32.6507C19 40.19 25.1114 46.3015 32.6507 46.3015C40.19 46.3015 46.3014 40.19 46.3014 32.6507C46.2996 31.7134 46.2086 30.8033 46.0284 29.9206"
      stroke="#A2CE3A"
      strokeWidth="3.32736"
      strokeLinecap="round"
    />
    <path
      d="M27.1906 33.3333C27.1906 33.3333 29.2382 33.3333 31.9683 38.111C31.9683 38.111 39.5567 25.5974 46.3016 23.0952"
      stroke="#A2CE3A"
      strokeWidth="3.32736"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuSVG = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.4126 20.4761V18.201H23.8887V20.4761H3.4126ZM3.4126 14.7883V12.5132H23.8887V14.7883H3.4126ZM3.4126 9.1005V6.82538H23.8887V9.1005H3.4126Z"
      fill="#49454F"
    />
  </svg>
);

const SearchSVG = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.2962 23.8888L15.1296 16.7222C14.5608 17.1772 13.9067 17.5374 13.1673 17.8028C12.4279 18.0683 11.6411 18.201 10.8069 18.201C8.7403 18.201 6.9913 17.4853 5.55987 16.0538C4.12844 14.6224 3.41272 12.8734 3.41272 10.8068C3.41272 8.74027 4.12844 6.99127 5.55987 5.55984C6.9913 4.1284 8.7403 3.41269 10.8069 3.41269C12.8734 3.41269 14.6224 4.1284 16.0539 5.55984C17.4853 6.99127 18.201 8.74027 18.201 10.8068C18.201 11.641 18.0683 12.4279 17.8029 13.1673C17.5374 13.9067 17.1772 14.5608 16.7222 15.1296L23.8888 22.2962L22.2962 23.8888ZM10.8069 15.9259C12.2288 15.9259 13.4375 15.4282 14.4328 14.4328C15.4282 13.4374 15.9259 12.2288 15.9259 10.8068C15.9259 9.38488 15.4282 8.17623 14.4328 7.18086C13.4375 6.18549 12.2288 5.68781 10.8069 5.68781C9.38491 5.68781 8.17626 6.18549 7.18089 7.18086C6.18552 8.17623 5.68784 9.38488 5.68784 10.8068C5.68784 12.2288 6.18552 13.4374 7.18089 14.4328C8.17626 15.4282 9.38491 15.9259 10.8069 15.9259Z"
      fill="#49454F"
    />
  </svg>
);

interface CoachesHeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function CoachesHeroSection({
  searchQuery,
  onSearchChange,
}: CoachesHeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative bg-[#141619] rounded-[10px] pt-24 lg:pt-32 pb-12 lg:pb-16"
      style={{
        background: "url('/homepage/bg1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          {/* Left Side - Title + Search */}
          <div className="flex-1">
            <Fade direction="down" triggerOnce duration={2000}>
              <div className="font-mona-sans font-bold leading-[1.15] tracking-tight">
                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-mona-sans font-bold leading-[1.15] tracking-tight">
                  <span className="text-white">Get </span>
                  <CheckmarkSVG />
                  <span className="text-[#A2CE3A]"> Prepped </span>
                  <span className="text-white">by the</span>
                  <br className="hidden md:block" />
                  <span className="inline-block align-middle mt-1 mr-2">
                    <img
                      src="/Frame 1321318471.svg"
                      alt="Coaches"
                      className="h-[40px] md:h-[52px] lg:h-[64px] inline-block"
                    />
                  </span>
                  <span className="text-white">best coaches in the <p className="block lg:hidden">Industry</p> </span>
                  <br className="hidden md:block" />
                </h1>

                <div className="hidden lg:flex items-center gap-3">
                  <span className="text-4xl md:text-5xl lg:text-[64px] font-mona-sans font-bold leading-[1.15] tracking-tight text-white">Industry</span>
                  <div className="relative w-full  lg:inline-block">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <MenuSVG />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by category"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full h-[60px] bg-[#ECE6F0] rounded-[100px] pl-12 pr-12 text-sm font-mona-sans font-normal text-[#49454F] placeholder:text-[#49454F] focus:outline-none focus:ring-2 focus:ring-[#A2CE3A] transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                      <SearchSVG />
                    </div>
                  </div>
                </div>
                {/* Search Input - inline with "Industry" on desktop */}
                <div className="lg:hidden relative w-full mt-5 block">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                    <MenuSVG />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by category"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full h-[44px] bg-[#ECE6F0] rounded-[100px] pl-12 pr-12 text-sm font-mona-sans font-normal text-[#49454F] placeholder:text-[#49454F] focus:outline-none focus:ring-2 focus:ring-[#A2CE3A] transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                    <SearchSVG />
                  </div>
                </div>
              </div>
            </Fade>
          </div>

          {/* Right Side - Green Card */}
          <Fade direction="right" triggerOnce delay={300} duration={2000}>
            <div className="bg-[#D3F36A] rounded-[24px] min-h-[244px] w-full lg:w-[380px] xl:w-[420px] p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between">
              {/* Decorative circles */}
              <div className="absolute -top-5 -right-5 w-[180px] h-[180px] rounded-full border-2 border-[#0B0D0F]" />
              <div className="absolute -bottom-4 -right-24 w-[150px] h-[150px] rounded-full border-2 border-[#0B0D0F]" />

              {/* Top row: checkmark + arrow */}
              <div className="flex items-start justify-between relative z-10">
                <CheckmarkSVGSmall />
                {/* Down-left arrow */}
                <div className="pt-5 lg:pl-20">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 7L7 17M7 17V7M7 17H17"
                    stroke="#0B0D0F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </div>
              </div>

              {/* Bottom text */}
              <div className="relative z-10 mt-6">
                <h3 className="text-[#0B0D0F] text-2xl lg:text-[28px] xl:text-[32px] font-mona-sans font-bold leading-tight">
                  We Have Top
                  <br />
                  Interview Coaches
                </h3>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </motion.section>
  );
}
