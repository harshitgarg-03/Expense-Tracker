import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
  const session = request.cookies.get("better-auth.session_token")?.value;

  const { pathname } = request.nextUrl;

  const isPublic = pathname === "/login" || pathname === "/signup";

  if (pathname === "/") {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  
  return NextResponse.next();
}
