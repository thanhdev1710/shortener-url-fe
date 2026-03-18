// app/api/auth/logout/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // 👉 gọi BE để xóa refreshToken trong DB
  if (refreshToken) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
  }

  const response = NextResponse.json({ success: true });

  // 👉 xóa cookie FE
  response.cookies.set("accessToken", "", {
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("refreshToken", "", {
    path: "/",
    maxAge: 0,
  });

  console.log("logout success");

  return response;
}
