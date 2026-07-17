import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {

  const ALLOWED_ORIGINS = [
  "http://localhost:6274",
  // here all client url's like claude gpt
];
  const origin = request.headers.get("origin") ?? "";
  if (!ALLOWED_ORIGINS.includes(origin)) return NextResponse.next();

  const requestedHeaders = request.headers.get("access-control-request-headers") ?? "";

  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": requestedHeaders || "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Expose-Headers": "WWW-Authenticate",
  };

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers });
  }
  const response = NextResponse.next();
  for (const [k, v] of Object.entries(headers)) response.headers.set(k, v);
  return response;
}














// const ALLOWED_ORIGINS = [
//   "http://localhost:6274",
//   // here all client url's like claude gpt
// ];

// const MCP_PATHS = [
//   "/api/auth",
//   "/.well-known",
// ];

// function corsHeaders(origin: string) {
//   return {
//     "Access-Control-Allow-Origin": origin,
//     "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
//     "Access-Control-Allow-Headers":
//       "Content-Type, Authorization",
//     "Access-Control-Allow-Credentials": "true",
//   };
// }

// export function mcpmiddleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const isMcpRoute = MCP_PATHS.some(path =>
//     pathname.startsWith(path)
//   );

//   if (!isMcpRoute) return null;

//   const origin = request.headers.get("origin");

  // if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
  //   return null;
  // }

  // if (request.method === "OPTIONS") {
  //   return new NextResponse(null, {
  //     status: 204,
  //     headers: corsHeaders(origin),
  //   });
  // }

//   const response = NextResponse.next();

//   Object.entries(corsHeaders(origin)).forEach(([key, value]) => {
//     response.headers.set(key, value);
//   });

//   return response;
// }