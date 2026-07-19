// app/.well-known/oauth-authorization-server/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const issuer = process.env.BETTER_AUTH_URL;

  if (!issuer) {
    return NextResponse.json(
      { error: "BETTER_AUTH_URL is not configured" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    issuer,

    authorization_endpoint:
      `${issuer}/api/auth/mcp/authorize`,

    token_endpoint:
      `${issuer}/api/auth/mcp/token`,

    userinfo_endpoint:
      `${issuer}/api/auth/mcp/userinfo`,

    jwks_uri:
      `${issuer}/api/auth/mcp/jwks`,

    registration_endpoint:
      `${issuer}/api/auth/mcp/register`,

    scopes_supported: [
      "openid",
      "profile",
      "email",
      "offline_access",
    ],

    response_types_supported: ["code"],

    grant_types_supported: [
      "authorization_code",
      "refresh_token",
    ],

    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
      "none",
    ],

    code_challenge_methods_supported: ["S256"],
  });
}







// import { oAuthDiscoveryMetadata } from "better-auth/plugins";
// import { auth } from "../../../lib/auth";

// type MCPAuth = {
//   api: {
//     getMcpOAuthConfig: (...args: unknown[]) => unknown;
//   };
// };

// export const GET = oAuthDiscoveryMetadata(
//   auth as unknown as MCPAuth
// );



// import { oauthProviderAuthServerMetadata } from "@better-auth/oauth-provider";
// import { auth } from "../../../lib/auth";

// export const GET = oauthProviderAuthServerMetadata(auth);