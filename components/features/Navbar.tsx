import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import gridlockIcon from "@/public/logo.svg";
import { getSession } from "@/lib/session";
import { neon } from "@neondatabase/serverless";

export default async function Navbar() {
  const session = await getSession();
  let hasPredictions = false;
  if (session) {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`
        SELECT content FROM predictions
        WHERE user_id = ${session.userId}
        LIMIT 1
    `;
    hasPredictions = result.length > 0;
  }

  return (
    <>
      <NavigationMenu className="z-50 min-w-full fixed top-0 bg-neutral-900/50 py-4 md:px-8 px-4 !justify-between">
        {/* Left: Logo/Branding */}
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
              <div className="hidden md:inline md:font-mono md:font-medium">
                <span className="text-neutral-400">Grid</span>
                <span>Lock</span>
              </div>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Right: Conditional Nav Links */}
        {hasPredictions && (
          <NavigationMenuList className="ml-auto">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/pitwall"
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                All Predictions
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}
      </NavigationMenu>
    </>
  );
}
