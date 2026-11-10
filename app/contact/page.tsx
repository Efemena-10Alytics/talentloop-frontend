import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have questions or need support? Connect with our team for expert career guidance, personalized solutions, and answers to help you move forward.",
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description:
      "Connect with our team for expert career guidance and personalized career solutions.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${SITE_NAME}`,
    description:
      "Connect with our team for expert career guidance and personalized career solutions.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
