import { oauthProviderResourceClient } from "@better-auth/oauth-provider/resource-client";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const resourceClient = oauthProviderResourceClient(auth);
  const metadata = await resourceClient.getActions().getProtectedResourceMetadata({
    resource: process.env.MCP_RESOURCE_URI || "https://expense-tracker-mcp.fastapicloud.dev/mcp",
    jwks_uri: `${auth.options.baseURL}/api/auth/jwks`,
    bearer_methods_supported: ["header"],
    resource_signing_alg_values_supported: ["RS256"],
  });

  return NextResponse.json(metadata);
}