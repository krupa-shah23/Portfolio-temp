import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import BackgroundCanvas from "@/components/3d/BackgroundCanvas";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krupa Shah | AI Engineer & Full Stack Developer",
  description: "Portfolio of Krupa Shah - I romanticize late nights, big dreams, and clean commits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${plusJakartaSans.variable} antialiased min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-x-hidden`}
      >
        <BackgroundCanvas />
        <Navbar />
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
