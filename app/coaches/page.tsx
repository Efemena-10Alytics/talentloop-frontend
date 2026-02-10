"use client";

import { useState, useEffect, useRef } from "react";
import Footer from "@/components/footer";
import JobSearchCTASection from "@/components/home/job-search-section";
import { Navbar } from "@/components/navbar";
import CoachesHeroSection from "@/components/coaches/hero-section";
import CoachesGridSection from "@/components/coaches/coaches-grid-section";

export default function CoachesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 4000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchQuery]);

  return (
    <div className="bg-[#0B0D0F]">
      <div className="p-3">
        <Navbar />
        <CoachesHeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CoachesGridSection debouncedSearch={debouncedSearch} />

        <div className="bg-black">
          <JobSearchCTASection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
