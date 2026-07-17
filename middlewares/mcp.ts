import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:6274",
  // here all client url's like claude gpt ....
];

const MCP_PATHS = [
  "/api/auth",
  "/.well-known",
];

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export function mcpmiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isMcpRoute = MCP_PATHS.some(path =>
    pathname.startsWith(path)
  );

  if (!isMcpRoute) return null;

  const origin = request.headers.get("origin");

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return null;
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }

  const response = NextResponse.next();

  Object.entries(corsHeaders(origin)).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}