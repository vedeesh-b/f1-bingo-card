"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      variant="destructive"
      size="sm"
      className="text-sm text-neutral-500 hover:text-white mt-1"
      onClick={() => logout()}
    >
      Log out
    </Button>
  );
}
