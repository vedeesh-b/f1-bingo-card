"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sm text-red-300 hover:text-red-500 p-2"
      onClick={() => logout()}
    >
      Log out
    </Button>
  );
}
