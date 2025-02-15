import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CatType",
  description:
    "CatType is a typing game that allows you to practice your typing skills.",
  metadataBase: new URL("https://www.cattype.live"),
  openGraph: {
    title: "CatType - The Ultimate Typing Practice App",
    description: "Improve your typing speed with fun and interactive exercises",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CatType - The Ultimate Typing Practice App",
    description: "Improve your typing speed with fun and interactive exercises",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
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
