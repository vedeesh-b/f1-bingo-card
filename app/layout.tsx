import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DotBackground } from "@/components/features/DotBackground";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "F1 Bingo",
  description: "A bingo card app for the 2026 Formula 1 season.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
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
        <NavigationMenu className="z-50 min-w-full bg-neutral-900/50 py-4 px-8 justify-start">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">F1 Bingo</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <DotBackground>{children}</DotBackground>
      </body>
    </html>
  );
}
