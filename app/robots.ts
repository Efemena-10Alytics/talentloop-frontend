import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard",
        "/dashboard/",
        "/billings",
        "/billings/",
        "/signin",
        "/signup",
        "/forgot-password",
        "/auth",
        "/auth/",
        "/clarity-session",
        "/complete-your-payment",
        "/enroll",
        "/enroll/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
