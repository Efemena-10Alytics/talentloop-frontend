"use client";

import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import CoachDetailHeroSection from "@/components/coaches/detail/hero-section";
import CoachAboutSection from "@/components/coaches/detail/about-section";
import CoachFieldsCoachedSection from "@/components/coaches/detail/fields-coached-section";
import CoachSuccessStoriesSection from "@/components/coaches/detail/success-stories-section";
import CoachPricingSection from "@/components/coaches/detail/pricing-section";
import CoachHelpsSection from "@/components/coaches/detail/coach-helps-section";
import CoachDropReviewSection from "@/components/coaches/detail/drop-review-section";

const coachData = {
  name: "Abdullahi Muhammed",
  role: "Project Management Coach",
  image:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  rating: 4.9,
  reviewCount: 94,
  yearsExperience: "10+ years",
  successStories: 52,
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  bio: "I've interviewed 300+ PM candidates and helped 60+ professionals land product roles. My approach combines structured frameworks with real-world product thinking.",
  hiredCount: "60+ more got hired",
  avatars: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
  ],
  fields: [
    { label: "Business Analysis", color: "#D3F36A" },
    { label: "Data Analysis", color: "#FFF59D" },
    { label: "Product & Strategy Roles", color: "#C9D1FF" },
    { label: "Consulting Interviews", color: "#FF9DED" },
  ],
  availability: "Flexible",
  languages: "English, Yoruba",
  location: "Nigeria",
};

export default function CoachPage() {
  return (
    <div className="bg-[#0B0D0F]">
      <div className="p-3">
        <Navbar />

        <CoachDetailHeroSection
          coach={{
            name: coachData.name,
            role: coachData.role,
            image: coachData.image,
            rating: coachData.rating,
            reviewCount: coachData.reviewCount,
            yearsExperience: coachData.yearsExperience,
            successStories: coachData.successStories,
            videoUrl: coachData.videoUrl,
          }}
        />

        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 mt-6 space-y-6">
          <CoachAboutSection
            coach={{
              bio: coachData.bio,
              hiredCount: coachData.hiredCount,
              avatars: coachData.avatars,
            }}
          />

          <CoachFieldsCoachedSection
            coach={{
              fields: coachData.fields,
              availability: coachData.availability,
              languages: coachData.languages,
              location: coachData.location,
            }}
          />
          <CoachSuccessStoriesSection />

          <CoachPricingSection />

          <CoachHelpsSection />

          <CoachDropReviewSection />
        </div>

        <div className="bg-black mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
