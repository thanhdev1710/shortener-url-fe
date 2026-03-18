// app/api/auth/refresh/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.log("BE error:", text);

    return NextResponse.json({ success: false }, { status: 401 });
  }

  const data = await res.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set("accessToken", data.accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 15,
  });

  return response;
}
