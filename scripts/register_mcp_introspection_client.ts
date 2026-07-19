// scripts/register_mcp_introspection_client.ts
import { config } from "dotenv";
config({ path: ".env.local" });
import { auth } from "../lib/auth";

async function main() {
  // 1. Sign in as an existing user on your app (any account works — ideally your own admin/owner account)
  const signInResponse = await auth.api.signInEmail({
    body: {
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
    },
    asResponse: true, // return a real Response so we can read the Set-Cookie header
  });

  const sessionCookie = signInResponse.headers.get("set-cookie");
  if (!sessionCookie) throw new Error("Sign-in did not return a session cookie — check credentials");

  // 2. Reuse that session as the auth context for the create-client call
  const client = await auth.api.createOAuthClient({
    headers: new Headers({ cookie: sessionCookie }),
    body: {
      client_name: "expense-tracker-mcp-introspection",
      redirect_uris: ["https://expense-tracker-mcp.fastapicloud.dev/unused-callback"],
      grant_types: [],
      token_endpoint_auth_method: "client_secret_basic",
    },
  });

  console.log( "CLIENT IS ::: ", client);
}

main().catch(console.error);