import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/signin",
        "/signup",
        "/forgot-password",
        "/auth",
        "/dashboard",
        "/clarity-session",
        "/complete-your-payment",
        "/enroll",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
