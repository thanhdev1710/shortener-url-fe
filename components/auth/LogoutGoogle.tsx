"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogoutGoogle() {
  return (
    <Button
      onClick={async () => {
        await signOut({ redirect: true, redirectTo: "/login" });
      }}
    >
      Logout
    </Button>
  );
}
