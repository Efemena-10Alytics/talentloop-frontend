"use client";

import { Suspense } from "react";

/* ─── SVG Icons ─── */

const DownloadSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarSVG = ({ filled = true }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.66667L12.575 6.88333L18.3333 7.725L14.1667 11.7833L15.15 17.5167L10 14.8083L4.85 17.5167L5.83333 11.7833L1.66667 7.725L7.425 6.88333L10 1.66667Z" fill={filled ? "#DFB400" : "none"} stroke="#DFB400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ─── */

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    date: "Jan 16, 2026",
    comment: "Great improvement in behavioral answers. Needs work on system design communication."
  },
  {
    id: 2,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    date: "Jan 16, 2026",
    comment: "After completing several projects on Amdari, I secured a job as a Data Analyst. The hands-on experience made me ready for the role."
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    date: "Jan 16, 2026",
    comment: "Intrinsicly transform multifunctional communities through world-class markets."
  },
  {
    id: 4,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    date: "Jan 16, 2026",
    comment: "After completing several projects on Amdari, I secured a job as a Data Analyst. The hands-on experience made me ready for the role."
  },
  {
    id: 5,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    date: "Jan 16, 2026",
    comment: "Great improvement in behavioral answers. Needs work on system design communication."
  },
  {
    id: 6,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    date: "Jan 16, 2026",
    comment: "Intrinsicly transform multifunctional communities through world-class markets."
  },
];

const ratingBreakdown = [
  { stars: 5, count: 89, percentage: 80 },
  { stars: 4, count: 28, percentage: 50 },
  { stars: 3, count: 7, percentage: 12 },
  { stars: 2, count: 2, percentage: 3 },
  { stars: 1, count: 1, percentage: 1 },
];

/* ─── Components ─── */

function ReviewsContent() {
  return (
    <div className="bg-[#141619] min-h-screen -m-6 lg:-m-8 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-mona-sans font-bold text-3xl">Reviews & Ratings</h1>
        <button className="px-4 py-2.5 bg-transparent border border-white/20 hover:border-white/40 text-white font-mona-sans font-medium text-sm rounded-[10px] transition-colors flex items-center gap-2">
          <DownloadSVG />
          Download Receipt
        </button>
      </div>

      {/* Rating Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Overall Rating Card */}
        <div className="bg-[#0B0D0F] border border-white/10 rounded-[16px] p-8 flex flex-col items-center justify-center">
          <h2 className="text-white font-mona-sans font-bold text-6xl mb-3">4.9</h2>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarSVG key={star} filled={true} />
            ))}
          </div>
          <p className="text-white font-mona-sans text-sm">56 total reviews</p>
        </div>

        {/* Rating Breakdown */}
        <div className="lg:col-span-2 bg-[#0B0D0F] border border-white/10 rounded-[16px] p-6">
          <h3 className="text-white font-mona-sans font-bold text-lg mb-4">Rating Breakdown</h3>
          <div className="space-y-3">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-4">
                <span className="text-white font-mona-sans text-sm w-12">{item.stars} Star</span>
                <div className="flex-1 h-2 bg-[#A2CE3A26] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#A2CE3A] rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-white font-mona-sans text-sm w-8 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coach's Note Section */}
      <div className="bg-[#0B0D0F] border border-white/10 rounded-[16px] p-6">
        <h3 className="text-white font-mona-sans font-bold text-xl mb-6">Coach's Note</h3>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-l-2 border-[#A2CE3A] pl-4 py-2">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#A2CE3A] flex-shrink-0">
                  <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-mona-sans font-bold text-base">{review.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#DFB400] font-mona-sans text-sm font-semibold">{review.rating}</span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 1.16667L8.8025 4.81833L12.8333 5.4075L9.91667 8.24833L10.605 12.2617L7 10.3658L3.395 12.2617L4.08333 8.24833L1.16667 5.4075L5.1975 4.81833L7 1.16667Z" fill="#DFB400" stroke="#DFB400" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-white/50 font-mona-sans text-xs">{review.date}</span>
                  </div>
                  <p className="text-white font-mona-sans text-sm leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ReviewsContent />
    </Suspense>
  );
}
