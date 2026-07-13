import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const isUserInfo = url.pathname === "/api/auth/mcp/userinfo" || 
                     url.pathname.endsWith("/mcp/userinfo") || 
                     url.pathname.endsWith("/mcp/userinfo/");

  if (isUserInfo) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "invalid_request", error_description: "Missing or invalid authorization header" },
        { status: 400 }
      );
    }

    const token = authHeader.substring(7);

    try {
      const tokenData = await prisma.oauthAccessToken.findUnique({
        where: { accessToken: token },
        include: { user: true }
      });

      if (!tokenData) {
        return NextResponse.json(
          { error: "invalid_token", error_description: "Invalid access token" },
          { status: 401 }
        );
      }

      if (tokenData.accessTokenExpiresAt && tokenData.accessTokenExpiresAt < new Date()) {
        return NextResponse.json(
          { error: "invalid_token", error_description: "Access token has expired" },
          { status: 401 }
        );
      }

      const user = tokenData.user;
      if (!user) {
        return NextResponse.json(
          { error: "invalid_token", error_description: "Associated user not found" },
          { status: 401 }
        );
      }

      const requestedScopes = (tokenData.scopes ?? "").split(" ");

      return NextResponse.json({
        sub: user.id,
        ...(requestedScopes.includes("email") ? {
          email: user.email,
          email_verified: user.emailVerified,
        } : {}),
        ...(requestedScopes.includes("profile") ? {
          name: user.name,
          picture: user.image,
          given_name: user.name.split(" ")[0] || user.name,
          family_name: user.name.split(" ")[1] || "",
        } : {})
      });
    } catch (error) {
      console.error("Error in userinfo endpoint:", error);
      return NextResponse.json(
        { error: "server_error", error_description: "Internal server error" },
        { status: 500 }
      );
    }
  }

  return auth.handler(request);
}

export async function POST(request: Request) {
  return auth.handler(request);
}
