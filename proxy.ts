import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/auth"];
const protectedRoutes = ["/me"];

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  console.log(pathname);

  // 👉 nếu ông dùng BE riêng → phải gọi API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    credentials: "include",
  });

  const isAuth = res.ok;

  console.log("isAuth:::", isAuth);

  // 🔒 chặn login
  if (authRoutes.includes(pathname) && isAuth) {
    console.log("run 🔒 chặn login");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 🔒 chặn protected
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuth) {
    console.log("run 🔒 chặn protected");
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
