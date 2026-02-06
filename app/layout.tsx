import type { Metadata } from "next";
import { Mona_Sans, Sora } from 'next/font/google'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-mona-sans',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
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
        className={`${geistSans.variable} ${geistMono.variable} ${monaSans.variable} ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}