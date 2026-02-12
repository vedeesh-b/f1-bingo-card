import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { DotBackground } from "@/components/features/DotBackground";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Toaster } from "sonner";
import gridlockIcon from "@/public/logo.svg";
import Image from "next/image";

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
              toast: "!bg-[#1C0505] !border-red-400/30 !text-red-400",
            },
          }}
        />
        <NavigationMenu className="z-50 min-w-full fixed top-0 bg-neutral-900/50 py-4 md:px-8 px-4 justify-start">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="flex flex-row gap-3 text-md"
              >
                <Image
                  src={gridlockIcon}
                  height={24}
                  width={24}
                  alt="GridLock icon"
                />
                <div className="font-mono font-medium">
                  <span className="text-neutral-400">Grid</span>
                  <span>Lock</span>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <DotBackground>{children}</DotBackground>
      </body>
    </html>
  );
}
