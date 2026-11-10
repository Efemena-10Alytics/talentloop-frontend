import type { Metadata } from "next";
import TermsContent from "./TermsContent";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review TalentLoop policies, access restriction rules, refund policies, and deferment procedures.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Terms and Conditions | ${SITE_NAME}`,
    description:
      "Review TalentLoop policies, access restriction rules, refund policies, and deferment procedures.",
    url: "/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms and Conditions | ${SITE_NAME}`,
    description:
      "Review TalentLoop policies, access restriction rules, refund policies, and deferment procedures.",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
