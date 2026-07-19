// app/.well-known/oauth-protected-resource/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const resource = process.env.MCP_RESOURCE_URI;
  const authorizationServer = process.env.BETTER_AUTH_URL;

  if (!resource || !authorizationServer) {
    return NextResponse.json(
      { error: "Missing OAuth environment variables" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    resource,
    authorization_servers: [authorizationServer],
  });
}






// import { oAuthProtectedResourceMetadata } from "better-auth/plugins";
// import { auth } from "@/lib/auth";

// type MCPProtectedResourceAuth =
//   Parameters<typeof oAuthProtectedResourceMetadata>[0];

// export const GET = oAuthProtectedResourceMetadata(
//   auth as unknown as MCPProtectedResourceAuth
// );




// import { oAuthProtectedResourceMetadata } from "@better-auth/oauth-provider";
// import { auth } from "@/lib/auth";

// export const GET = oAuthProtectedResourceMetadata(auth);