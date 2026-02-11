"use client";

import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

const YellowStarSVG = () => (
  <svg
    width="26"
    height="24"
    viewBox="0 0 26 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5072 1.50226L17.5937 5.48059C17.7489 5.77345 17.9717 6.02559 18.2438 6.21636C18.5159 6.40712 18.8297 6.53109 19.1593 6.5781L23.5663 7.17808C25.9231 7.50114 26.8368 10.3894 25.0939 11.9955L22.076 14.7637C21.8191 14.9989 21.6262 15.2949 21.5153 15.6241C21.4044 15.9534 21.3791 16.3051 21.4417 16.6467L22.1781 20.7063C22.5876 22.9677 20.2207 24.7307 18.1434 23.6969L13.9314 21.6201C13.6414 21.4789 13.3229 21.4055 13 21.4055C12.6771 21.4055 12.3586 21.4789 12.0686 21.6201L7.85658 23.6969C5.77842 24.7215 3.41239 22.9677 3.8219 20.7063L4.55826 16.6458C4.68826 15.9535 4.44683 15.2427 3.92497 14.7628L0.906148 11.9955C-0.836801 10.3986 0.0769235 7.50022 2.43366 7.17715L6.84072 6.57717C7.1713 6.5331 7.48629 6.4103 7.75887 6.21921C8.03145 6.02813 8.25356 5.77442 8.40631 5.47967L10.4938 1.50226C11.5561 -0.500753 14.4532 -0.500753 15.5062 1.50226"
      fill="#FCD53F"
    />
  </svg>
);

const WhiteStarSVG = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.8245 2.4825L16.9365 6.74129C17.2245 7.33409 17.9926 7.90289 18.6406 8.01089L22.4675 8.65289C24.9155 9.06448 25.4916 10.8549 23.7275 12.6213L20.7514 15.6213C20.2474 16.1289 19.9714 17.1093 20.1274 17.8113L20.9794 21.5253C21.6515 24.4653 20.1034 25.6017 17.5234 24.0657L13.9353 21.9237C13.2873 21.5373 12.2192 21.5373 11.5592 21.9237L7.97352 24.0657C5.40545 25.6017 3.84541 24.4521 4.51743 21.5253L5.36945 17.8113C5.52545 17.1093 5.24945 16.1289 4.74543 15.6213L1.76936 12.6213C0.0185146 10.8537 0.582529 9.06448 3.02939 8.65289L6.85749 8.01089C7.4935 7.90289 8.26152 7.33409 8.54953 6.74129L10.6616 2.4825C11.8136 0.172501 13.6857 0.172501 14.8257 2.4825"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlaneSVG = () => (
  <svg
    width="26"
    height="24"
    viewBox="0 0 26 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.8636 0C22.5897 1.87394e-05 23.303 0.19421 23.9318 0.563056C24.5606 0.931903 25.0828 1.46241 25.4458 2.10125C25.8089 2.7401 26 3.46477 26 4.20244C26 4.94011 25.8089 5.66478 25.4458 6.30362L16.5818 21.9006C16.1727 22.6197 15.563 23.1995 14.8297 23.5668C14.0964 23.9341 13.2724 24.0724 12.4618 23.9642C11.6512 23.856 10.8903 23.5062 10.2752 22.959C9.66019 22.4118 9.21855 21.6917 9.0061 20.8896L6.91656 12.9722L1.21053 7.17292C0.632371 6.58514 0.238714 5.83642 0.0793135 5.02139C-0.0800866 4.20637 0.00192627 3.36163 0.314986 2.59395C0.628046 1.82627 1.1581 1.17011 1.83815 0.708402C2.5182 0.246698 3.31771 0.000177369 4.13564 0H21.8636ZM4.13564 2.40138C3.78524 2.40169 3.44279 2.50749 3.15154 2.70541C2.8603 2.90333 2.63331 3.1845 2.49926 3.5134C2.36521 3.8423 2.33011 4.20418 2.39838 4.55334C2.46666 4.9025 2.63525 5.22327 2.88286 5.47514L8.17052 10.8482L16.4164 6.01185C16.6877 5.85514 17.009 5.81381 17.3102 5.89689C17.6114 5.97996 17.868 6.18069 18.024 6.45527C18.1801 6.72986 18.2229 7.056 18.1431 7.36253C18.0634 7.66906 17.8675 7.93109 17.5982 8.09145L9.35238 12.929L11.2883 20.2652C11.3793 20.6089 11.5686 20.9175 11.8322 21.152C12.0957 21.3865 12.4218 21.5364 12.7692 21.5828C13.1165 21.6292 13.4696 21.57 13.7839 21.4126C14.0982 21.2553 14.3595 21.0068 14.5349 20.6987L23.3988 5.10293C23.5544 4.82914 23.6363 4.51857 23.6363 4.20242C23.6363 3.88628 23.5544 3.57571 23.3988 3.30192C23.2432 3.02813 23.0195 2.80077 22.75 2.64269C22.4805 2.48461 22.1748 2.40139 21.8636 2.40138H4.13564Z"
      fill="white"
    />
  </svg>
);

export default function CoachDropReviewSection() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const activeRating = hoverRating || rating;

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#1E1F21] rounded-[16px] px-6 lg:px-10 py-8 lg:py-10"
    >
      <Fade direction="up" triggerOnce duration={1500}>
        <div>
          <h2 className="text-white text-xl lg:text-2xl font-mona-sans font-bold leading-tight">
            Ever been prepped by this coach?
          </h2>
          <p className="text-[#A2CE3A] text-lg lg:text-xl font-mona-sans font-bold italic mt-1">
            Drop a Review for them
          </p>
        </div>

        {/* Input Row */}
        <div className="flex items-center gap-3 mt-6">
          {/* Avatar */}
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Your avatar"
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover flex-shrink-0"
          />

          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-[72px] bg-transparent border border-white/20 rounded-full px-6 pr-24 text-white text-sm font-mona-sans placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />

            {/* Icons inside input */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {/* Star Rating Toggle */}
              <button
                onClick={() => setRating(rating > 0 ? 0 : 5)}
                className="cursor-pointer hover:scale-110 transition-transform"
              >
                {activeRating > 0 ? <YellowStarSVG /> : <WhiteStarSVG />}
              </button>

              {/* Send */}
              <button className="cursor-pointer hover:scale-110 transition-transform">
                <PlaneSVG />
              </button>
            </div>
          </div>
        </div>

        {/* Star Rating Row (shown when star is clicked) */}
        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-1 mt-4 ml-14"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="cursor-pointer hover:scale-110 transition-transform"
              >
                {star <= activeRating ? <YellowStarSVG /> : <WhiteStarSVG />}
              </button>
            ))}
            <span className="text-white/50 text-xs font-mona-sans ml-2">
              {rating}/5
            </span>
          </motion.div>
        )}
      </Fade>
    </motion.section>
  );
}
