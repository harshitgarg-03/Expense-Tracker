import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

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
  const url = new URL(request.url);
  const isIntrospect = url.pathname === "/api/auth/oauth2/introspect" || 
                       url.pathname.endsWith("/oauth2/introspect") || 
                       url.pathname.endsWith("/oauth2/introspect/");

  if (isIntrospect) {
    let client_id = "";
    let client_secret = "";
    let token = "";

    // 1. Check Basic Authentication Header
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Basic ")) {
      try {
        const credentials = Buffer.from(authHeader.substring(6), "base64").toString("ascii");
        const parts = credentials.split(":");
        if (parts.length === 2) {
          client_id = parts[0];
          client_secret = parts[1];
        }
      } catch (e) {
        console.error("Error parsing Basic auth:", e);
      }
    }

    // 2. Read and parse body if needed
    try {
      const clonedRequest = request.clone();
      const contentType = request.headers.get("content-type") || "";
      const bodyText = await clonedRequest.text();

      if (contentType.includes("application/x-www-form-urlencoded")) {
        const params = new URLSearchParams(bodyText);
        if (!client_id) client_id = params.get("client_id") || "";
        if (!client_secret) client_secret = params.get("client_secret") || "";
        token = params.get("token") || "";
      } else if (contentType.includes("application/json")) {
        const json = JSON.parse(bodyText);
        if (!client_id) client_id = json.client_id || "";
        if (!client_secret) client_secret = json.client_secret || "";
        token = json.token || "";
      }
    } catch (e) {
      console.error("Error reading request body:", e);
    }

    if (token && token.startsWith("Bearer ")) {
      token = token.substring(7);
    }

    if (!client_id || !client_secret) {
      return NextResponse.json(
        { error: "invalid_client", error_description: "Missing client credentials" },
        { status: 401 }
      );
    }

    // 3. Authenticate client
    try {
      const client = await prisma.oauthClient.findUnique({
        where: { clientId: client_id }
      });

      if (!client || client.disabled) {
        return NextResponse.json(
          { error: "invalid_client", error_description: "Invalid client credentials" },
          { status: 401 }
        );
      }

      // Check client secret (either plain-text or hashed)
      const hashedSecret = createHash("sha256").update(client_secret).digest("base64url");
      const isMatch = client.clientSecret === client_secret || client.clientSecret === hashedSecret;

      if (!isMatch) {
        return NextResponse.json(
          { error: "invalid_client", error_description: "Invalid client credentials" },
          { status: 401 }
        );
      }

      // 4. Retrieve and validate token
      if (!token) {
        return NextResponse.json(
          { error: "invalid_request", error_description: "Missing token parameter" },
          { status: 400 }
        );
      }

      const tokenData = await prisma.oauthAccessToken.findUnique({
        where: { accessToken: token }
      });

      if (!tokenData) {
        return NextResponse.json({ active: false });
      }

      const now = new Date();
      if (tokenData.accessTokenExpiresAt && tokenData.accessTokenExpiresAt < now) {
        return NextResponse.json({ active: false });
      }

      // Token is valid! Return metadata.
      return NextResponse.json({
        active: true,
        client_id: tokenData.clientId,
        sub: tokenData.userId,
        scope: tokenData.scopes || "",
        exp: tokenData.accessTokenExpiresAt ? Math.floor(tokenData.accessTokenExpiresAt.getTime() / 1000) : undefined,
        iat: tokenData.createdAt ? Math.floor(tokenData.createdAt.getTime() / 1000) : undefined,
        iss: process.env.BETTER_AUTH_URL || url.origin
      }, {
        headers: {
          "Cache-Control": "no-store",
          "Pragma": "no-cache"
        }
      });
    } catch (error) {
      console.error("Error in custom introspection endpoint:", error);
      return NextResponse.json(
        { error: "server_error", error_description: "Internal server error" },
        { status: 500 }
      );
    }
  }

  return auth.handler(request);
}
