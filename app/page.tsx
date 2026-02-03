import AIChatInputSection from "@/components/ai-chat-input-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/home/hero-section";
import InterviewPrepSection from "@/components/home/interview-prep-section";
import JobSearchCTASection from "@/components/home/job-search-section";
import PerfectInterviewSection from "@/components/home/perfect-interview-section";
import WhoTalentLoopIsFor from "@/components/home/testimonials-section";
import { Navbar } from "@/components/navbar";
import ReportingTransparencySection from "@/components/transparency-section";

export default function Home() {
  return (
    <div className="bg-[#0B0D0F]">
      <div className="p-3">
      <Navbar />
      <HeroSection />
      <PerfectInterviewSection />
      <AIChatInputSection />
      <InterviewPrepSection />
      <WhoTalentLoopIsFor />
      <div className="bg-black">
      <ReportingTransparencySection />
      <JobSearchCTASection />
      <Footer />
      </div>
      </div>
    </div>
  );
}
