import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/home") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const sessionToken =
    request.cookies.get("session_token")?.value ||
    request.cookies.get("__Secure-session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isLoggedIn = !!sessionToken;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/transaction-table") ||
    pathname.startsWith("/add-expense");

  const isGuestOnlyRoute = pathname === "/" || pathname === "/signup";

  if (isLoggedIn && isGuestOnlyRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}