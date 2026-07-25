// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:6274", // MCP Inspector
  "https://chatgpt.com", // CHATGPT url
  "https://chat.openai.com", // CHATGPT url,
  "https://claude.ai", // Claude url,
  "https://gemini.google.com", // Gemini url,
  "https://anthropic.com", // Anthropic url,
  "https://gemini.google.com/share/", // Gemini url,
  "https://claude.ai/api/v1/mcp", // Claude url,
];

export function middleware(request: NextRequest) {
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

export const config = {
  matcher: ["/api/auth/:path*", "/.well-known/:path*"],
};