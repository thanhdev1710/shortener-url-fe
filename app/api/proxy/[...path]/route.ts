import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const cookieStore = await cookies();
  const { path } = await context.params;

  const accessToken = cookieStore.get("accessToken")?.value;

  const url = `${BASE_URL}/${path.join("/")}`;

  const res = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
  });

  const data = await res.text();

  return new NextResponse(data, {
    status: res.status,
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
