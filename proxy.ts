import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle legacy /home path redirects to /
  if (pathname === "/home") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Retrieve session token from cookies
  const sessionToken = 
    request.cookies.get("session_token")?.value || 
    request.cookies.get("__Secure-session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isLoggedIn = !!sessionToken;

  // Protected routes that require authentication
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/transaction-table") || 
    pathname.startsWith("/add-expense");

  // Auth routes (guest only)
  const isAuthRoute = 
    pathname === "/login" || 
    pathname === "/signup" || 
    pathname === "/";

  if (isLoggedIn) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};