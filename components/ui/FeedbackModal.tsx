"use client";

import { useState } from "react";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M35.0926 16.4757L27.8562 22.9485L30.0609 32.6283C30.1826 33.1538 30.1512 33.7049 29.9709 34.2119C29.7906 34.7189 29.4693 35.1592 29.0477 35.4771C28.6261 35.7949 28.1231 35.9761 27.6022 35.9978C27.0813 36.0195 26.5659 35.8806 26.1211 35.5988L18.0003 30.418L9.87471 35.5988C9.42996 35.879 8.91517 36.0165 8.39517 35.9941C7.87518 35.9716 7.37322 35.7901 6.95251 35.4725C6.5318 35.1549 6.21114 34.7154 6.03092 34.2093C5.8507 33.7032 5.81898 33.1531 5.93974 32.6283L8.15245 22.9485L0.916103 16.4757C0.522602 16.1232 0.238016 15.6583 0.097884 15.1391C-0.0422479 14.6199 -0.0317146 14.0694 0.128168 13.5564C0.288051 13.0434 0.590198 12.5905 0.996874 12.2544C1.40355 11.9184 1.89673 11.7139 2.41483 11.6666L11.9025 10.8732L15.5625 1.69171C15.7606 1.19132 16.0978 0.763305 16.5311 0.462073C16.9645 0.160841 17.4745 0 17.9963 0C18.5181 0 19.0281 0.160841 19.4615 0.462073C19.8948 0.763305 20.232 1.19132 20.4301 1.69171L24.0885 10.8732L33.5762 11.6666C34.0953 11.7122 34.5899 11.9155 34.9981 12.2511C35.4062 12.5867 35.7098 13.0397 35.8706 13.5534C36.0315 14.067 36.0426 14.6185 35.9025 15.1386C35.7623 15.6588 35.4773 16.1245 35.0829 16.4774L35.0926 16.4757Z"
      fill={filled ? "#FBD447" : "#EFF0F73D"}
    />
  </svg>
);

interface FeedbackModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (rating: number, comment: string) => void;
}

export default function FeedbackModal({ isOpen, onClose, onSubmit }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const displayRating = hovered || rating;

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit?.(rating, comment);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[380px] rounded-[24px] px-8 py-10 flex flex-col items-center text-center"
        style={{
          background: "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stars */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
            >
              <StarIcon filled={star <= displayRating} />
            </button>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-white font-mona-sans font-bold text-xl leading-snug mb-3">
          How would you rate<br />your experience?
        </h2>

        {/* Description */}
        <p className="text-[#9CA3AF] font-mona-sans text-sm leading-relaxed mb-6">
          Your feedback helps us improve and deliver a better service for you.
        </p>

        {/* Comment Box */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment (optional)"
          rows={3}
          className="w-full rounded-xl px-4 py-3 text-sm font-mona-sans text-white placeholder-[#6B7280] resize-none outline-none mb-6"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full py-3.5 rounded-full font-mona-sans font-semibold text-sm text-[#0B0D0F] bg-[#A2CE3A] hover:opacity-90 transition-opacity mb-3 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ boxShadow: rating > 0 ? "0px -4px 4px 0px #FFFFFF4D inset" : "none" }}
        >
          Submit Feedback
        </button>

        {/* Skip Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full font-mona-sans font-semibold text-sm text-[#9CA3AF] hover:bg-white/5 transition-colors"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
