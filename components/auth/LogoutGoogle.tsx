"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogoutGoogle() {
  return (
    <Button
      onClick={async () => {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        await signOut({ redirect: true, redirectTo: "/login" });
      }}
    >
      Logout
    </Button>
  );
}
