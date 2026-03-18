"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginGoogle() {
  return (
    <Button
      onClick={() =>
        signIn("google", { redirect: true, redirectTo: "/auth/callback" })
      }
    >
      LoginGoogle
    </Button>
  );
}
