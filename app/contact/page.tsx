"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import V1FooterSection from "@/components/v1-launch/v1-footer-section";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl } from "@/lib/api";

const LiveChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 6.47715 6.47715 2 12 2" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12H8.01M12 12H12.01M16 12H16.01" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 12C2 17.5228 6.47715 22 12 22" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CallCenterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 2C4.01472 2 2 4.01472 2 6.5V17.5C2 19.9853 4.01472 22 6.5 22H17.5C19.9853 22 22 19.9853 22 17.5V6.5C22 4.01472 19.9853 2 17.5 2H6.5Z" stroke="#A2CE3A" strokeWidth="1.5"/>
    <path d="M9 10.5C9 9.11929 10.1193 8 11.5 8H12.5C13.8807 8 15 9.11929 15 10.5V10.5C15 11.8807 13.8807 13 12.5 13H11.5C10.1193 13 9 13 9 14.5V16H15" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      toast({ variant: "error", title: "Please fill in all required fields." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${getApiUrl()}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast({ variant: "success", title: "Message sent!", description: "We'll get back to you shortly." });
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      toast({ variant: "error", title: "Failed to send message.", description: "Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-[40px] px-5 h-[52px] font-sora text-sm text-white outline-none transition-all placeholder:text-white/30";
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  return (
    <div className="min-h-screen bg-[#01090B] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div
          className="w-full max-w-[870px] rounded-[24px] p-8 lg:p-14"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left */}
            <div className="lg:w-[38%] flex flex-col gap-6">
              <div>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-mona-sans font-semibold mb-4"
                  style={{ background: "rgba(162,206,58,0.15)", color: "#A2CE3A", border: "1px solid rgba(162,206,58,0.3)" }}
                >
                  Connect now
                </span>
                <h1 className="text-3xl lg:text-4xl font-mona-sans font-bold text-white mb-4">
                  Contact us
                </h1>
                <p className="text-white/50 font-plus-jakarta text-sm leading-relaxed">
                  Have questions or need support? Connect with our team for expert guidance, personalized career solutions, and answers to help you move forward with confidence.
                </p>
              </div>

              <div className="flex flex-col gap-5 mt-4">
                {/* Live Chat */}
                <div
                  className="rounded-[16px] p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <LiveChatIcon />
                    <span className="text-white font-mona-sans font-semibold text-sm">Live Chat</span>
                  </div>
                  <p className="text-white/40 font-plus-jakarta text-xs leading-relaxed">
                    Have questions? Chat with our experts 24/7 for quick assistance.
                  </p>
                </div>

                {/* Call Center */}
                <div
                  className="rounded-[16px] p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CallCenterIcon />
                    <span className="text-white font-mona-sans font-semibold text-sm">Call Center</span>
                  </div>
                  <p className="text-white/40 font-plus-jakarta text-xs leading-relaxed">
                    Need help with Talentloop? Call us anytime for quick support!
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <form onSubmit={handleSubmit} className="lg:w-[62%] flex flex-col gap-5">
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 font-plus-jakarta text-sm">First Name</label>
                  <input
                    type="text"
                    placeholder="Ricky"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 font-plus-jakarta text-sm">Last Name</label>
                  <input
                    type="text"
                    placeholder="Samson"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 font-plus-jakarta text-sm">Email Address</label>
                <input
                  type="email"
                  placeholder="helloshivani2025@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 font-plus-jakarta text-sm">How can we help?</label>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-[20px] px-5 py-4 font-sora text-sm text-white outline-none transition-all placeholder:text-white/30 resize-none"
                  style={inputStyle}
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 h-[48px] rounded-full font-mona-sans font-semibold text-sm text-[#0B0D0F] bg-[#A2CE3A] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ boxShadow: "0px -4px 4px 0px #FFFFFF4D inset" }}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <V1FooterSection />
    </div>
  );
}
