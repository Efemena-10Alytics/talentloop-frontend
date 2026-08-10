import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

const monaSans = localFont({
  src: [
    {
      path: '../public/fonts/Mona_Sans/MonaSans-VariableFont_wdth,wght.ttf',
      style: 'normal',
    },
    {
      path: '../public/fonts/Mona_Sans/MonaSans-Italic-VariableFont_wdth,wght.ttf',
      style: 'italic',
    },
    {
      path: '../public/fonts/Mona_Sans/static/MonaSans_Expanded-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Mona_Sans/static/MonaSans_Expanded-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Mona_Sans/static/MonaSans_Expanded-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Mona_Sans/static/MonaSans_Expanded-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Mona_Sans/static/MonaSans_Expanded-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-mona-sans',
  display: 'swap',
})

const sora = localFont({
  src: '../public/fonts/Sora-VariableFont_wght.ttf',
  variable: '--font-sora',
  display: 'swap',
})

const jakartaSans = localFont({
  src: '../public/fonts/Sora-VariableFont_wght.ttf',
  variable: '--font-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Land Your Next Role With Expert Career Coaching`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "career coaching",
    "job search coaching",
    "CV revamp",
    "resume optimization",
    "LinkedIn optimization",
    "mock interview practice",
    "AI job search",
    "job application service",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Land Your Next Role With Expert Career Coaching`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Land Your Next Role With Expert Career Coaching`,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.variable} ${sora.variable} ${jakartaSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SessionProvider>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
