import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Geist, Geist_Mono } from "next/font/google";
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
  ],
  variable: '--font-mona-sans',
  display: 'swap',
})

const sora = localFont({
  src: '../public/fonts/Sora-VariableFont_wght.ttf',
  variable: '--font-sora',
  display: 'swap',
})

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta-sans',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${monaSans.variable} ${sora.variable} ${jakartaSans.variable} antialiased`}
        suppressHydrationWarning
      >
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
