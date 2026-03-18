"use client";

import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const session = await getSession();

      if (!session?.idToken) {
        router.push("/login");
        return;
      }

      try {
        await fetch(`/api/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            idToken: session.idToken,
          }),
        });
        router.push("/me");
      } catch (error) {
        console.error(error);
      }
    };

    handleLogin();
  }, [router]);

  return <div>Logging in...</div>;
}
