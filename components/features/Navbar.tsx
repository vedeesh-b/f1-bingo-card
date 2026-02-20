import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { neon } from "@neondatabase/serverless";

import gridlockIcon from "@/public/logo.svg";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./LogOutButton";

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

  const menuOptions = [
    { href: "/view-predictions", title: "My Predictions" },
    { href: "/pitwall", title: "Pitwall" },
  ];

  return (
    <nav className="z-50 w-full fixed top-0 bg-neutral-900/50 backdrop-blur py-4 md:px-8 px-4 flex items-center justify-between">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-3 text-md">
        <Image src={gridlockIcon} height={24} width={24} alt="GridLock icon" />
        <div className="hidden md:inline font-mono font-medium">
          <span className="text-neutral-400">Grid</span>
          <span>Lock</span>
        </div>
      </Link>

      {/* Right: Dropdown */}
      {hasPredictions && (
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition">
            Menu
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 bg-neutral-900 border border-neutral-800 text-white"
          >
            {menuOptions.map((option) => (
              <DropdownMenuItem key={option.href} asChild>
                <Link href={option.href} className="w-full cursor-pointer">
                  {option.title}
                </Link>
              </DropdownMenuItem>
            ))}
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}
