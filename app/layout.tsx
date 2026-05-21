import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Outfit } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Fly World · Premium Last-Minute Flights & Holidays",
    template: "%s · Fly World",
  },
  description:
    "Discover extraordinary last-minute flights and holiday packages across 500+ destinations. ATOL protected, best price guarantee, 24/7 UK support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} min-h-dvh font-sans`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
