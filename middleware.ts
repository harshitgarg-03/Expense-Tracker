import { NextRequest, NextResponse } from "next/server";
import { middlewares } from "./middlewares";

export function middleware(request: NextRequest) {
  for (const handler of middlewares) {
    const response = handler(request);

    if (response) {
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};