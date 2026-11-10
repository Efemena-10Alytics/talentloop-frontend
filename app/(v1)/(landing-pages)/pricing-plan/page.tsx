import type { Metadata } from "next";
import PricingPlanContent from "./PricingPlanContent";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing Plans & Career Acceleration Packages",
  description:
    "Explore TalentLoop AI pricing tiers. Transparent plans for CV revamps, LinkedIn optimization, mock interviews, and done-for-you job applications.",
  alternates: {
    canonical: "/pricing-plan",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Pricing Plans | ${SITE_NAME}`,
    description:
      "Explore transparent career coaching and job application plans built for your career outcome.",
    url: "/pricing-plan",
  },
  twitter: {
    card: "summary_large_image",
    title: `Pricing Plans | ${SITE_NAME}`,
    description:
      "Explore transparent career coaching and job application plans built for your career outcome.",
  },
};

export default function PricingPlanPage() {
  return <PricingPlanContent />;
}
