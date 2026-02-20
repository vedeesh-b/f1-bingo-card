import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { DotBackground } from "@/components/features/DotBackground";
import { Toaster } from "sonner";
import SplashScreenWrapper from "@/components/features/SplashScreen";
import Navbar from "@/components/features/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geist = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "GridLock",
  description: "A bingo card app for the 2026 Formula 1 season.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} dark`}>
      <body className={`antialiased`}>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            classNames: {
              toast: "!bg-[#0F131A] !border-[#3C424Eg]",
            },
          }}
        />
        <Navbar />
        <DotBackground>
          <SplashScreenWrapper>{children}</SplashScreenWrapper>
        </DotBackground>
      </body>
    </html>
  );
}
