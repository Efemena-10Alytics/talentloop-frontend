import type { Metadata } from "next";
import localFont from 'next/font/local'
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

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
  title: "Talentloop AI",
  description: "Talentloop AI is a platform for AI-powered recruitment",
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
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
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
