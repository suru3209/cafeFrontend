import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔑 Session cookie check (same name as backend)
  const session = request.cookies.get("aniicones.sid");

  const isLoggedIn = !!session;

  // ❌ Not logged in → trying to access /profile
  if (!isLoggedIn && pathname.startsWith("/Profile")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ❌ Logged in → trying to access /login or /auth
  if (
    isLoggedIn &&
    (pathname.startsWith("/login") || pathname.startsWith("/Auth"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Profile/:path*", "/login", "/Auth/:path*"],
};
