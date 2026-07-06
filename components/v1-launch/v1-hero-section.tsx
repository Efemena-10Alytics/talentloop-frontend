"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ReactPlayer from "react-player";
import ClaritySessionModal from "./ClaritySessionModal";

export default function V1HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Video player state
  const playerRef = useRef<HTMLVideoElement & { api?: any }>(null);
  const [volume, setVolume] = useState(0.4);
  // Default to unmuted; we fall back to muted only if the browser blocks autoplay
  const [muted, setMuted] = useState(false);

  // Force 1080p once the player is ready (best-effort; YouTube may auto-adjust)
  const handlePlayerReady = () => {
    const el = playerRef.current;
    const api = el?.api;
    if (api?.setPlaybackQuality) {
      api.setPlaybackQuality("hd1080");
      api.setPlaybackQualityRange?.("hd1080", "hd1080");
    }

    const fallbackToMuted = () => {
      // Mute the element synchronously so the retry isn't blocked again
      if (el) el.muted = true;
      setMuted(true);
      el?.play?.().catch(() => {});
    };

    // Try to autoplay with sound.
    const playPromise = el?.play?.();
    // Case 1: browser rejects the play() promise -> mute and retry.
    if (playPromise?.catch) {
      playPromise.catch(fallbackToMuted);
    }
    // Case 2: browser silently blocks autoplay without throwing -> if still
    // paused shortly after, mute and retry so it never sits paused.
    setTimeout(() => {
      if (el?.paused) fallbackToMuted();
    }, 1000);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    // Adjusting the slider unmutes (or mutes when dragged to zero)
    setMuted(value === 0);
  };

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      // Unmuting with zero volume restores an audible level
      if (!next && volume === 0) setVolume(0.4);
      return next;
    });
  };

  // Auto-switch between images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const images = ["/homepage/1.png", "/homepage/2.png"];

  return (
    <section className="relative min-h-screen pt-20 lg:pt-40 pb-16">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <img
            src="/Testimonials_header.png"
            alt="5-star testimonials"
            className="h-12 object-contain"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-7xl font-mona-sans font-bold leading-tight">
            <span className="text-white">
              You Don't Need More Applications.
            </span>
            <br />
            <span className="text-[#A2CE3A] font-mona-sans">
              You Need Better Positioning.
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <span className="text-lg lg:text-xl font-mona-sans text-center text-white leading-tight">
            The global job market is competitive. TalentLoop helps you compete
            strategically with optimized materials, expert guidance, and managed
            career support tuned for the UK, US, and Canada.
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <Link
            href="/clarity-session"
            className="px-8 py-4 text-center rounded-[30px] text-[#090B0E] font-mona-sans text-base font-semibold hover:opacity-90 transition-opacity"
            style={{
              background:
                "linear-gradient(88.9deg, #A2CE3A 24.91%, #52681D 92.25%)",
            }}
          >
            Start My Career Upgrade
          </Link>
          <Link
            href="/clarity-session"
            className="px-8 py-4 text-center rounded-[30px] text-white font-mona-sans text-base font-semibold hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(180deg, #0E0912 0%, #22162B 100%)",
            }}
          >
            Book a Clarity Session
          </Link>
        </motion.div>

        {/* Video Component Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative p-6 lg:p-10 rounded-[30px] border overflow-hidden"
          style={{
            background: "#1563741A",
            borderColor: "#FFFFFF1A",
          }}
        >
          {/* Video Section */}
          <div className="group relative w-full rounded-[20px] overflow-hidden aspect-video mb-6 bg-black">
            <ReactPlayer
              ref={playerRef}
              src="https://www.youtube.com/watch?v=8Q3-A2CZx-c"
              playing
              loop
              volume={volume}
              muted={muted}
              playsInline
              controls={false}
              width="100%"
              height="100%"
              onReady={handlePlayerReady}
              config={{
                youtube: {
                  rel: 0,
                  fs: 0,
                  disablekb: 1,
                  iv_load_policy: 3,
                },
              }}
              style={{ position: "absolute", inset: 0 }}
            />

            {/* Click blocker - prevents pause/seek interactions on the iframe */}
            <div className="absolute inset-0 z-10" />

            {/* Custom Volume Control */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="text-white hover:text-[#A2CE3A] transition-colors"
              >
                {muted || volume === 0 ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 9l-6 6M16 9l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.5 8.5a5 5 0 010 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.5 8.5a5 5 0 010 7M18.5 6a9 9 0 010 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                aria-label="Volume"
                className="v1-volume-slider w-24 h-1 cursor-pointer"
                style={{ accentColor: "#A2CE3A" }}
              />
            </div>
          </div>

          {/* Cards Section - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Mock Interview Score Card */}
            <div className="bg-[#0A0F0C] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#A2CE3A]/20 flex items-center justify-center">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="29.7578"
                      height="29.7578"
                      rx="14.8789"
                      fill="#A2CE3A"
                      fill-opacity="0.15"
                    />
                    <path
                      d="M14.5521 19.6653H13.7574C11.7254 19.6653 10.7097 19.6653 10.0782 19.022C9.44678 18.3787 9.44678 17.3437 9.44678 15.2725C9.44678 13.202 9.44678 12.1664 10.0782 11.5231C10.7097 10.8798 11.7254 10.8798 13.7574 10.8798H15.913C17.9451 10.8798 18.9614 10.8798 19.5928 11.5231C20.0786 12.0179 20.1903 12.7451 20.2163 13.9972"
                      fill="#A2CE3A"
                      fill-opacity="0.15"
                    />
                    <path
                      d="M14.5521 19.6653H13.7574C11.7254 19.6653 10.7096 19.6653 10.0782 19.022C9.44678 18.3787 9.44678 17.3437 9.44678 15.2725C9.44678 13.202 9.44678 12.1664 10.0782 11.5231C10.7096 10.8798 11.7254 10.8798 13.7574 10.8798H15.913C17.9451 10.8798 18.9614 10.8798 19.5928 11.5231C20.0786 12.0179 20.1903 12.7451 20.2163 13.9972"
                      stroke="#A2CE3A"
                      stroke-width="0.70852"
                      stroke-linecap="round"
                    />
                    <path
                      d="M19.6594 19.1118L20.7834 20.2324L19.6594 19.1118ZM20.2466 17.6965C20.2511 17.4312 20.2027 17.1676 20.1042 16.9212C20.0058 16.6748 19.8592 16.4504 19.6732 16.2612C19.4871 16.072 19.2653 15.9217 19.0205 15.8191C18.7758 15.7165 18.5131 15.6637 18.2477 15.6637C17.9823 15.6637 17.7196 15.7165 17.4749 15.8191C17.2302 15.9217 17.0083 16.072 16.8222 16.2612C16.6362 16.4504 16.4896 16.6748 16.3912 16.9212C16.2928 17.1676 16.2444 17.4312 16.2488 17.6965C16.2576 18.2208 16.4721 18.7206 16.846 19.0883C17.2199 19.4559 17.7233 19.662 18.2477 19.662C18.7721 19.662 19.2755 19.4559 19.6494 19.0883C20.0233 18.7206 20.2378 18.2208 20.2466 17.6965Z"
                      fill="#A2CE3A"
                      fill-opacity="0.15"
                    />
                    <path
                      d="M19.6594 19.1118L20.7834 20.2324M20.2466 17.6965C20.2511 17.4312 20.2027 17.1676 20.1042 16.9212C20.0058 16.6748 19.8592 16.4504 19.6732 16.2612C19.4871 16.072 19.2653 15.9217 19.0205 15.8191C18.7758 15.7165 18.5131 15.6637 18.2477 15.6637C17.9823 15.6637 17.7196 15.7165 17.4749 15.8191C17.2302 15.9217 17.0083 16.072 16.8222 16.2612C16.6362 16.4504 16.4896 16.6748 16.3912 16.9212C16.2928 17.1676 16.2444 17.4312 16.2488 17.6965C16.2576 18.2208 16.4721 18.7206 16.846 19.0883C17.2199 19.4559 17.7233 19.662 18.2477 19.662C18.7721 19.662 19.2755 19.4559 19.6494 19.0883C20.0233 18.7206 20.2378 18.2208 20.2466 17.6965Z"
                      stroke="#A2CE3A"
                      stroke-width="0.70852"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.3821 10.8798L17.3255 10.7041C17.0449 9.83123 16.9049 9.39479 16.571 9.14539C16.2366 8.896 15.7933 8.896 14.9051 8.896H14.7561C13.869 8.896 13.4252 8.896 13.0913 9.14539C12.7569 9.39479 12.6169 9.83123 12.3363 10.7041L12.2808 10.8798"
                      stroke="#A2CE3A"
                      stroke-width="0.70852"
                    />
                  </svg>
                </div>
                <span className="text-white font-bold text-sm font-mona-sans">
                  Mock Interview Score
                </span>
              </div>
              <div className="text-4xl font-bold text-white mb-2">78</div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-[#A2CE3A] h-2 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>

            {/* Hire Likelihood Card */}
            <div className="bg-[#0A0F0C] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#A2CE3A]/20 flex items-center justify-center">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="29.7578"
                      height="29.7578"
                      rx="14.8789"
                      fill="#A2CE3A"
                      fill-opacity="0.15"
                    />
                    <path
                      d="M18.4219 10.0846H23.5232V15.1859"
                      stroke="#A2CE3A"
                      stroke-width="1.29897"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M23.5232 10.0846L16.3175 17.2902C16.1983 17.4071 16.0381 17.4725 15.8712 17.4725C15.7043 17.4725 15.544 17.4071 15.4248 17.2902L12.4915 14.357C12.3723 14.2401 12.2121 14.1747 12.0452 14.1747C11.8783 14.1747 11.718 14.2401 11.5988 14.357L6.94385 19.0119"
                      stroke="#A2CE3A"
                      stroke-width="1.29897"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-white font-bold text-sm font-sora">
                  Hire Likelihood
                  <br />
                  <p className="text-white/60 text-[8px] font-sora">
                    Based on performance
                  </p>
                </span>
              </div>
              <div className="text-2xl font-bold text-white font-sora mb-1">
                Moderate
              </div>
              <p className="text-white/50 text-xs font-sora">
                Strong foundation with room for improvement
              </p>
            </div>

            {/* Key Insights Card */}
            <div className="bg-[#0A0F0C] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#A2CE3A]/20 flex items-center justify-center">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="29.7578"
                      height="29.7578"
                      rx="14.8789"
                      fill="#A2CE3A"
                      fill-opacity="0.15"
                    />
                    <path
                      d="M13.7769 17.1047C14.6954 17.1047 15.4761 16.7822 16.119 16.137C16.7619 15.4919 17.0833 14.7087 17.0833 13.7873C17.0833 12.8659 16.7619 12.0826 16.119 11.4375C15.4761 10.7924 14.6954 10.47 13.7769 10.4704C12.8585 10.4707 12.0778 10.7933 11.4349 11.4381C10.792 12.0828 10.4705 12.8659 10.4705 13.7873C10.4705 14.7087 10.792 15.4919 11.4349 16.137C12.0778 16.7822 12.8585 17.1047 13.7769 17.1047ZM13.5014 15.2074V11.9225H14.0525V15.2074H13.5014ZM11.6575 15.2074V12.9722H12.2086V15.2079L11.6575 15.2074ZM15.3453 15.2074V13.5013H15.8963V15.2074H15.3453ZM19.4596 19.8386L16.3107 16.6903C15.9694 16.9842 15.5828 17.2149 15.1507 17.3824C14.7187 17.55 14.2608 17.6339 13.7769 17.6343C12.7001 17.6343 11.7879 17.2608 11.0403 16.514C10.2931 15.7667 9.91943 14.8549 9.91943 13.7785C9.91943 12.702 10.2931 11.7898 11.0403 11.0418C11.7876 10.2939 12.6992 9.91968 13.7753 9.91931C14.8513 9.91894 15.7637 10.2926 16.5124 11.0402C17.2604 11.7882 17.6344 12.7004 17.6344 13.7768C17.6344 14.2606 17.5505 14.7186 17.3826 15.1506C17.2147 15.5827 16.984 15.9658 16.6904 16.3001L19.8387 19.4484L19.4596 19.8386Z"
                      fill="#A2CE3A"
                    />
                  </svg>
                </div>
                <span className="text-white font-bold text-sm font-sora">
                  Key Insights
                  <br />
                  <p className="text-white/60 text-[8px] font-sora">
                    Based on performance
                  </p>
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <svg
                    width="15"
                    height="9"
                    viewBox="0 0 15 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6894 0.531372L7.97069 6.25013C7.87609 6.34285 7.7489 6.39479 7.61643 6.39479C7.48396 6.39479 7.35677 6.34285 7.26217 6.25013L4.93418 3.92214C4.83958 3.82941 4.71239 3.77747 4.57993 3.77747C4.44746 3.77747 4.32027 3.82941 4.22567 3.92214L0.53125 7.61655"
                      stroke="#A2CE3A"
                      stroke-width="1.06278"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span className="text-white font-semibold text-xs font-sans">
                    Strengths
                    <br />
                    <p className="text-white/60 text-[8px] font-sora">
                      Technical Knowledge
                    </p>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="15"
                    height="9"
                    viewBox="0 0 15 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6894 7.61658L7.97069 1.89782C7.87609 1.8051 7.7489 1.75315 7.61643 1.75315C7.48396 1.75315 7.35677 1.8051 7.26217 1.89782L4.93418 4.22581C4.83958 4.31854 4.71239 4.37048 4.57993 4.37048C4.44746 4.37048 4.32027 4.31854 4.22567 4.22581L0.53125 0.531395"
                      stroke="#FF0400"
                      stroke-width="1.06278"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span className="text-white font-semibold text-xs font-sans">
                    Areas to Improve
                    <br />
                    <p className="text-white/60 text-[8px] font-sora">
                      STAR structure, Communication clarity
                    </p>
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Component - 4th Grid Item */}
            <div className="bg-[#0A0F0C] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-[#B9B7BA] text-sm font-sora mb-4">
                We prep you using the actual CV version submitted, with
                role-specific coaching and tailored mock sessions until you're
                ready to compete.
              </p>
              <Link
                href="/clarity-session"
                className="px-12 py-4 w-fit text-center rounded-[30px] text-white font-mona-sans text-base font-semibold hover:opacity-90 transition-opacity"
                style={{
                  background:
                    "linear-gradient(180deg, #0E0912 0%, #22162B 100%)",
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="lg:pt-10">
        <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full pointer-events-none">
          <img
            src="/blush.png"
            alt=""
            className="w-full max-w-[1400px] object-contain"
          />
        </div>
      </div>

      {/* Clarity Session Booking Modal */}
      <ClaritySessionModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </section>
  );
}
