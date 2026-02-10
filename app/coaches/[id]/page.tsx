"use client";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function CoachPage() {


  return (
    <div className="bg-[#0B0D0F]">
      <div className="p-3">
        <Navbar />
        
        <div className="bg-black">
          <Footer />
        </div>
      </div>
    </div>
  );
}
