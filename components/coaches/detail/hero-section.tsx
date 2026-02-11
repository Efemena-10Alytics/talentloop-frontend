"use client";

import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { motion, AnimatePresence } from "framer-motion";

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

const PlayMeSVG = () => (
  <svg
    width="143"
    height="51"
    viewBox="0 0 143 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="143"
      height="51"
      rx="25.5"
      fill="white"
      fillOpacity="0.09"
    />
    <path
      opacity="0.5"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.5 47C37.3745 47 47 37.3745 47 25.5C47 13.6256 37.3745 4 25.5 4C13.6256 4 4 13.6256 4 25.5C4 37.3745 13.6256 47 25.5 47Z"
      fill="white"
    />
    <path
      d="M32.8401 27.7768L22.6921 33.7689C21.0581 34.7321 19.05 33.4765 19.05 31.4899V19.5101C19.05 17.5235 21.0581 16.27 22.6921 17.2332L32.8401 23.2253C34.5193 24.2186 34.5193 26.7857 32.8401 27.779"
      fill="white"
    />
    <path
      d="M57.944 26.436V25.06H60.552C61.1067 25.06 61.5653 24.9533 61.928 24.74C62.2907 24.516 62.5627 24.2173 62.744 23.844C62.936 23.4707 63.032 23.0547 63.032 22.596C63.032 22.1267 62.936 21.7053 62.744 21.332C62.5627 20.9587 62.2907 20.6653 61.928 20.452C61.5653 20.2387 61.1067 20.132 60.552 20.132H57.944V18.756H60.264C61.224 18.756 62.024 18.9107 62.664 19.22C63.3147 19.5187 63.8053 19.9453 64.136 20.5C64.4667 21.0547 64.632 21.7107 64.632 22.468V22.724C64.632 23.4707 64.4667 24.1267 64.136 24.692C63.8053 25.2467 63.3147 25.6787 62.664 25.988C62.024 26.2867 61.224 26.436 60.264 26.436H57.944ZM56.696 30.5V18.756H58.264V30.5H56.696ZM66.8024 30.5V18.82H68.3384V30.5H66.8024ZM65.6184 20.036V18.82H68.3384V20.036H65.6184ZM76.4525 30.5V27.94H76.1965V24.98C76.1965 24.3933 76.0418 23.9507 75.7325 23.652C75.4338 23.3533 74.9912 23.204 74.4045 23.204C74.0738 23.204 73.7325 23.2093 73.3805 23.22C73.0285 23.2307 72.6925 23.2413 72.3725 23.252C72.0525 23.2627 71.7752 23.2787 71.5405 23.3V21.956C71.7752 21.9347 72.0205 21.9187 72.2765 21.908C72.5432 21.8867 72.8152 21.876 73.0925 21.876C73.3698 21.8653 73.6365 21.86 73.8925 21.86C74.7672 21.86 75.4818 21.9667 76.0365 22.18C76.5912 22.3827 77.0018 22.7187 77.2685 23.188C77.5352 23.6573 77.6685 24.292 77.6685 25.092V30.5H76.4525ZM73.6525 30.724C73.0125 30.724 72.4578 30.6173 71.9885 30.404C71.5298 30.18 71.1725 29.86 70.9165 29.444C70.6712 29.028 70.5485 28.5267 70.5485 27.94C70.5485 27.332 70.6818 26.8253 70.9485 26.42C71.2258 26.0147 71.6258 25.7107 72.1485 25.508C72.6712 25.2947 73.3005 25.188 74.0365 25.188H76.3565V26.34H73.9725C73.3538 26.34 72.8792 26.4893 72.5485 26.788C72.2178 27.0867 72.0525 27.4707 72.0525 27.94C72.0525 28.4093 72.2178 28.788 72.5485 29.076C72.8792 29.364 73.3538 29.508 73.9725 29.508C74.3352 29.508 74.6818 29.444 75.0125 29.316C75.3432 29.1773 75.6152 28.9533 75.8285 28.644C76.0525 28.324 76.1752 27.8867 76.1965 27.332L76.6125 27.94C76.5592 28.548 76.4098 29.06 76.1645 29.476C75.9298 29.8813 75.5992 30.1907 75.1725 30.404C74.7565 30.6173 74.2498 30.724 73.6525 30.724ZM79.8804 33.828V32.452H81.1124C81.475 32.452 81.779 32.404 82.0244 32.308C82.2804 32.2227 82.4884 32.0733 82.6484 31.86C82.819 31.6467 82.9577 31.364 83.0644 31.012L85.7524 21.956H87.2564L84.4084 31.412C84.2377 31.9773 83.9977 32.436 83.6884 32.788C83.379 33.1507 83.0004 33.412 82.5524 33.572C82.115 33.7427 81.603 33.828 81.0164 33.828H79.8804ZM82.4884 30.308V29.028H84.3444V30.308H82.4884ZM82.3284 30.308L79.2724 21.956H80.8404L83.7684 30.308H82.3284ZM93.071 30.5V18.82H95.151L98.607 26.612H98.863L102.303 18.82H104.399V30.5H102.831V20.532L102.943 20.564L99.631 28.084H97.711L94.383 20.564L94.511 20.532V30.5H93.071ZM111.198 30.788C110.451 30.788 109.806 30.66 109.262 30.404C108.718 30.148 108.275 29.812 107.934 29.396C107.592 28.9693 107.336 28.4947 107.166 27.972C107.006 27.4493 106.926 26.916 106.926 26.372V26.084C106.926 25.5293 107.006 24.9907 107.166 24.468C107.336 23.9453 107.592 23.476 107.934 23.06C108.275 22.6333 108.707 22.2973 109.23 22.052C109.763 21.796 110.387 21.668 111.102 21.668C112.03 21.668 112.792 21.8707 113.39 22.276C113.998 22.6707 114.446 23.1827 114.734 23.812C115.032 24.4413 115.182 25.1133 115.182 25.828V26.516H107.598V25.364H114.062L113.71 25.988C113.71 25.38 113.614 24.8573 113.422 24.42C113.23 23.972 112.942 23.6253 112.558 23.38C112.174 23.1347 111.688 23.012 111.102 23.012C110.494 23.012 109.987 23.1507 109.582 23.428C109.187 23.7053 108.888 24.084 108.686 24.564C108.494 25.044 108.398 25.5987 108.398 26.228C108.398 26.836 108.494 27.3853 108.686 27.876C108.888 28.356 109.198 28.74 109.614 29.028C110.03 29.3053 110.558 29.444 111.198 29.444C111.87 29.444 112.414 29.2947 112.83 28.996C113.256 28.6973 113.512 28.3507 113.598 27.956H115.038C114.92 28.5427 114.686 29.0493 114.334 29.476C113.982 29.9027 113.539 30.228 113.006 30.452C112.472 30.676 111.87 30.788 111.198 30.788ZM117.475 27.012V18.82H119.043V27.012H117.475ZM117.331 30.5V28.548H119.187V30.5H117.331Z"
      fill="white"
    />
  </svg>
);

const StarSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.76146 2.44037L11.6731 7.12587L16.7246 7.50006L12.8526 10.7702L14.0646 15.6834L9.76146 13.0153L5.45828 15.6834L6.67033 10.7702L2.79828 7.50006L7.84984 7.12587L9.76146 2.44037Z"
      fill="#FBC02D"
    />
    <path
      d="M9.76146 2.44037L7.84984 7.12587L2.79828 7.50006L6.67033 10.7702L5.45828 15.6834L9.76146 13.0153M9.76146 2.44037L11.6731 7.12587L16.7246 7.50006L12.8526 10.7702L14.0646 15.6834L9.76146 13.0153"
      stroke="#FBC02D"
      strokeWidth="2.78899"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9909 6.62385V14.7119C14.9909 14.7859 14.9615 14.8568 14.9092 14.9091C14.8569 14.9614 14.7859 14.9908 14.712 14.9908H9.41287M28.9358 14.9908C28.9358 22.6926 22.6927 28.9358 14.9909 28.9358C7.28906 28.9358 1.0459 22.6926 1.0459 14.9908C1.0459 7.28903 7.28906 1.04587 14.9909 1.04587C22.6927 1.04587 28.9358 7.28903 28.9358 14.9908Z"
      stroke="white"
      strokeWidth="2.09174"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChatSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9908 28.9358C17.7489 28.9358 20.445 28.1179 22.7382 26.5856C25.0315 25.0533 26.8188 22.8754 27.8743 20.3273C28.9297 17.7792 29.2059 14.9754 28.6678 12.2703C28.1298 9.56525 26.8016 7.08049 24.8514 5.13026C22.9012 3.18002 20.4164 1.85189 17.7113 1.31382C15.0063 0.775753 12.2024 1.05191 9.65432 2.10737C7.10621 3.16283 4.92831 4.95019 3.39602 7.24343C1.86373 9.53666 1.04587 12.2328 1.04587 14.9908C1.04587 17.222 1.56958 19.3293 2.50234 21.1994C3.20424 22.611 2.22809 24.5152 1.85622 25.9051C1.77384 26.2125 1.77383 26.5361 1.85618 26.8435C1.93854 27.1509 2.10037 27.4312 2.3254 27.6563C2.55042 27.8813 2.83073 28.0431 3.13812 28.1255C3.44552 28.2078 3.76918 28.2078 4.07657 28.1254C5.46642 27.7536 7.37068 26.7774 8.78222 27.4809C10.7116 28.4389 12.8367 28.9368 14.9908 28.9358Z"
      stroke="white"
      strokeWidth="2.09174"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface CoachDetailHeroProps {
  coach: {
    name: string;
    role: string;
    image: string;
    rating: number;
    reviewCount: number;
    yearsExperience: string;
    successStories: number;
    videoUrl: string;
  };
}

export default function CoachDetailHeroSection({ coach }: CoachDetailHeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative rounded-[10px] pt-24 lg:pt-32 pb-12 lg:pb-16"
        style={{
          background: "url('/homepage/bg1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-8 lg:gap-14">
            {/* Left - Coach Image with Play Me */}
            <Fade direction="left" triggerOnce duration={1500}>
              <div className="relative w-full md:w-[320px] lg:w-[380px] flex-shrink-0">
                <div className="border border-white/20 rounded-[16px] overflow-hidden relative h-[300px]">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Play Me Button */}
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="absolute bottom-4 left-4 cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <PlayMeSVG />
                  </button>
                </div>
              </div>
            </Fade>

            {/* Right - Coach Info */}
            <Fade direction="right" triggerOnce duration={1500} delay={200}>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-[52px] font-mona-sans font-bold text-white leading-tight">
                  {coach.name}
                </h1>
                <p className="text-white/70 text-base lg:text-lg font-mona-sans mt-2">
                  {coach.role}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 mt-5">
                  {/* Rating Badge */}
                  <div className="flex items-center gap-2 bg-[#FFF59D] rounded-[100px] px-4 py-2">
                    <StarSVG />
                    <span className="text-[#0B0D0F] font-mona-sans font-semibold text-sm">
                      {coach.rating}
                    </span>
                    <span className="text-[#0B0D0F]/60 font-mona-sans text-sm">
                      ({coach.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Years */}
                  <div className="flex items-center gap-2">
                    <ClockSVG />
                    <span className="text-white font-mona-sans text-sm">
                      {coach.yearsExperience}
                    </span>
                  </div>

                  {/* Success Stories */}
                  <div className="flex items-center gap-2">
                    <ChatSVG />
                    <span className="text-white font-mona-sans text-sm">
                      {coach.successStories} success stories
                    </span>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-[90vw] max-w-[720px] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center rounded-full border border-white/30 hover:bg-white/10 transition-colors z-10"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="w-full h-full rounded-[16px] overflow-hidden border border-white/20 bg-black">
                <iframe
                  src={getYouTubeEmbedUrl(coach.videoUrl)}
                  width="100%"
                  height="100%"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
