"use client";

import Image from "next/image";

const StarPattern = () => (
  <svg
    width="199"
    height="129"
    viewBox="0 0 199 129"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute opacity-100"
  >
    <path
      d="M78.0675 129.579L87.3759 162.137C90.864 174.324 108.136 174.324 111.624 162.137L120.922 129.579C121.511 127.519 122.614 125.644 124.129 124.129C125.644 122.614 127.519 121.511 129.579 120.922L162.137 111.624C174.324 108.136 174.324 90.864 162.137 87.3759L129.579 78.078C127.519 77.4893 125.644 76.3856 124.129 74.8709C122.614 73.3562 121.511 71.4806 120.922 69.421L111.624 36.8626C108.136 24.6755 90.864 24.6755 87.3759 36.8626L78.078 69.421C77.4893 71.4806 76.3856 73.3562 74.8709 74.8709C73.3562 76.3856 71.4806 77.4893 69.421 78.078L36.8626 87.3759C24.6755 90.864 24.6755 108.136 36.8626 111.624L69.421 120.922C71.4806 121.511 73.3562 122.614 74.8709 124.129C76.3856 125.644 77.4893 127.519 78.078 129.579M19.9688 180.565L23.9191 196.408C24.4444 198.531 27.4701 198.531 27.9954 196.408L31.9562 180.565C32.049 180.197 32.2396 179.862 32.5078 179.593C32.776 179.325 33.1118 179.134 33.4796 179.042L49.3228 175.081C51.4451 174.556 51.4451 171.54 49.3228 171.005L33.4796 167.044C33.1118 166.951 32.776 166.76 32.5078 166.492C32.2396 166.224 32.049 165.888 31.9562 165.52L27.9954 149.677C27.4701 147.555 24.4444 147.555 23.9191 149.677L19.9583 165.52C19.8655 165.888 19.6749 166.224 19.4067 166.492C19.1385 166.76 18.8027 166.951 18.4349 167.044L2.59167 171.005C0.469442 171.53 0.469442 174.545 2.59167 175.081L18.4349 179.042C18.8027 179.134 19.1385 179.325 19.4067 179.593C19.6749 179.862 19.876 180.197 19.9688 180.565ZM167.054 33.4796L171.005 49.3228C171.53 51.4451 174.545 51.4451 175.081 49.3228L179.042 33.4796C179.134 33.1118 179.325 32.776 179.593 32.5078C179.862 32.2396 180.197 32.049 180.565 31.9562L196.408 27.9954C198.531 27.4701 198.531 24.4444 196.408 23.9191L180.565 19.9583C180.197 19.8655 179.862 19.6749 179.593 19.4067C179.325 19.1385 179.134 18.8027 179.042 18.4349L175.081 2.59167C174.556 0.469442 171.54 0.469442 171.005 2.59167L167.044 18.4349C166.951 18.8027 166.76 19.1385 166.492 19.4067C166.224 19.6749 165.888 19.8655 165.52 19.9583L149.677 23.9191C147.555 24.4444 147.555 27.4701 149.677 27.9954L165.52 31.9562C165.888 32.049 166.224 32.2396 166.492 32.5078C166.76 32.776 166.961 33.1118 167.054 33.4796Z"
      stroke="black"
      strokeOpacity="0.1"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function JobSearchCTASection() {
  return (
    <section className="relative bg-black py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 lg:px-6">
        {/* Main Container */}
        <div className="relative bg-[#E8FFB1] rounded-[32px] lg:rounded-[48px] overflow-hidden">
          {/* Decorative Star Patterns */}
          <div className="absolute top-[10%] left-[5%] hidden lg:block">
            <StarPattern />
          </div>
          <div className="absolute bottom-[15%] left-[15%] hidden lg:block scale-75">
            <StarPattern />
          </div>
          <div className="absolute top-[20%] right-[8%] hidden lg:block scale-90">
            <StarPattern />
          </div>
          <div className="absolute bottom-[25%] right-[20%] hidden md:block scale-50">
            <StarPattern />
          </div>

          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 lg:p-16">
            {/* Left Side - Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Main Heading */}
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-mona-sans font-bold leading-tight text-[#054711]">
                Your Job Search Should Work as Hard as You Do.
              </h1>

              {/* Subheading */}
              <p className="text-lg lg:text-xl xl:text-2xl font-sora leading-relaxed">
                <span className="text-[#A2CE3A] font-semibold">
                  TalentLoop.ai
                </span>{" "}
                <span className="text-[#054711]">applies for you</span>{" "}
                <span className="text-[#A2CE3A] font-semibold">
                  to grow until you get the job.
                </span>
              </p>

              {/* CTA Button */}
              <button className="px-10 py-4 lg:px-12 lg:py-5 bg-[#054711] rounded-full text-white font-mona-sans text-base lg:text-lg font-semibold hover:bg-[#043610] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Subscribe to this
              </button>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] lg:aspect-square rounded-[24px] overflow-hidden shadow-2xl">
                <Image
                  src="/homepage/Frame 1321318255.svg"
                  alt="Professional in video call"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}