import { NextRequest, NextResponse } from "next/server";
        
export function proxy(request: NextRequest) {
  const session = request.cookies.get("better-auth.session_token")?.value;
         
  const { pathname } = request.nextUrl;

  const isPublic = pathname === "/login" || pathname === "/signup";
          
  if (pathname === "/") {
    if (session) {
      // console.log("hello session");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      // console.log("hello no session");
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (session && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/"],
};