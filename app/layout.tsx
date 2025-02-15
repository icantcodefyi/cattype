import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cattype",
  description: "a minimalist developer typing test.",
  metadataBase: new URL('https://www.cattype.live'),
  applicationName: 'cattype',
  authors: [{ name: 'icantcodefyi' }],
  keywords: ['typing test', 'developer tools', 'coding practice', 'speed typing', 'programming', 'developer typing', 'code snippets'],
  creator: 'icantcodefyi',
  publisher: 'icantcodefyi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.cattype.live',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.cattype.live',
    siteName: 'cattype',
    title: "cattype",
    description: "a minimalist developer typing test.",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'cattype - Developer Typing Test',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@icantcodefyi',
    creator: '@icantcodefyi',
    title: "cattype",
    description: "a minimalist developer typing test.",
    images: [{
      url: '/og-image.png',
      alt: 'cattype - Developer Typing Test',
    }],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  category: 'developer tools',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <TooltipProvider delayDuration={300}>
            <Toaster />
            <Header />
            {children}
          </TooltipProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
