"use client";

import { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";

/**
 * -----------------------------------------------------------------
 * 🔗 DIAMOND CALENDLY LINK CONFIGURATION
 * -----------------------------------------------------------------
 * Replace the URL below with your custom Calendly link,
 * or set NEXT_PUBLIC_DIAMOND_CALENDLY_URL in your .env.local file:
 */
export const DEFAULT_DIAMOND_CALENDLY_URL =
  process.env.NEXT_PUBLIC_DIAMOND_CALENDLY_URL ||
  "https://calendly.com/your-calendly-link";

export default function DiamondBooking({
  calendlyUrl = DEFAULT_DIAMOND_CALENDLY_URL,
}: {
  calendlyUrl?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPlaceholderUrl =
    calendlyUrl === "https://calendly.com/your-calendly-link";

  return (
    <section
      id="book"
      className="bg-[#050C0E] py-20 border-b border-white/10 relative overflow-hidden"
    >
      {/* Background glow blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, #A2CE3A 0%, transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.12,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, #156374 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.18,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mona-sans font-semibold uppercase tracking-wider bg-white/10 text-[#A2CE3A] border border-white/10">
            11 · Free Clarity Call
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mona-sans text-white tracking-tight">
            Book your free clarity call
          </h2>
          <p className="text-base sm:text-lg font-sora text-[#CCCCCC] max-w-xl">
            30 minutes to review your profile, agree target markets, and verify mutual fit. Only 9 Diamond slots available per cohort.
          </p>
        </div>

        {/* Embedded Calendly Container */}
        <div className="max-w-4xl mx-auto rounded-[32px] bg-[#0F1416] border border-white/15 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          {/* Helpful placeholder notice if the default placeholder link is still present */}
          {isPlaceholderUrl && (
            <div className="mb-4 p-4 rounded-2xl bg-[#1563741A] border border-[#A2CE3A]/30 text-xs sm:text-sm font-sora text-[#CCCCCC] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A2CE3A] animate-pulse shrink-0" />
                <span>
                  <strong className="text-white">Calendly link ready:</strong>{" "}
                  Replace <code className="text-[#A2CE3A] bg-black/40 px-1.5 py-0.5 rounded">DEFAULT_DIAMOND_CALENDLY_URL</code> in <code className="text-white">components/diamond/diamond-booking.tsx</code> with your live Calendly link.
                </span>
              </div>
            </div>
          )}

          {/* Calendly Inline Widget */}
          <div className="w-full min-h-[700px] rounded-[24px] overflow-hidden bg-[#0F1416]">
            {mounted ? (
              <InlineWidget
                url={calendlyUrl}
                styles={{ height: "700px", width: "100%" }}
                pageSettings={{
                  backgroundColor: "0f1416",
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: "a2ce3a",
                  textColor: "ffffff",
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-[700px] text-white/50 font-mona-sans text-sm">
                Loading scheduling calendar...
              </div>
            )}
          </div>
        </div>

        {/* Support Help Note */}
        <p className="text-xs sm:text-sm font-sora text-center text-[#94A3B8] mt-8">
          Can't find a convenient time?{" "}
          <a
            href="https://wa.me/447392608468?text=Hi%2C%20I'm%20interested%20in%20the%20Diamond%20Package%20and%20need%20help%20booking%20a%20clarity%20call."
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold underline hover:text-[#A2CE3A] transition-colors"
          >
            Chat directly with us on WhatsApp
          </a>{" "}
          or email{" "}
          <a
            href="mailto:support@talentloop.io"
            className="text-white font-semibold underline hover:text-[#A2CE3A] transition-colors"
          >
            support@talentloop.io
          </a>
        </p>
      </div>
    </section>
  );
}
