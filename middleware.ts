import { NextRequest, NextResponse } from "next/server";
import { middlewares } from "./middlewares";

export function middleware(request: NextRequest) {
  let response = NextResponse.next();

  for (const handler of middlewares) {
    const res = handler(request);

    if (res) {
      // If the middleware returned a redirect, rewrite, or custom status response (not a NEXT pass-through),
      // return it immediately to short-circuit.
      const isNext = res.headers.has("x-middleware-next");
      if (!isNext) {
        return res;
      }

      // If it is a pass-through response, merge its headers into our accumulated response
      res.headers.forEach((value, key) => {
        response.headers.set(key, value);
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};