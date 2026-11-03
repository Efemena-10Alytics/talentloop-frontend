import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TalentLoop Diamond — 25–30 Guaranteed Interviews in 6 Months",
  description:
    "Work one-to-one with our top career managers. Full done-for-you job applications, positioning, mock interview coaching, and guaranteed placement.",
  robots: { index: false, follow: false },
};

export default function AdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#01090B] text-white antialiased selection:bg-[#A2CE3A]/30">
      {children}
    </div>
  );
}
