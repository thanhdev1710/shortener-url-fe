import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login"];

const protectedRoutes = ["/me"];

export default auth(async (req: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.[^/]+$/)
  ) {
    return NextResponse.next();
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const isAuth = res.ok;

  if (authRoutes.includes(pathname) && isAuth) {
    return NextResponse.redirect(new URL("/me", req.url));
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuth) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
