// app/api/auth/google/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const data = await res.json();

  const response = NextResponse.json({
    success: true,
    user: data.user,
  });

  // 👉 set accessToken
  response.cookies.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 15,
  });

  // 👉 set refreshToken
  response.cookies.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
