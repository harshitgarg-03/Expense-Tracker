// app/.well-known/oauth-authorization-server/route.ts
import { oauthProviderAuthServerMetadata } from "@better-auth/oauth-provider";
import { auth } from "../../../lib/auth";

export const GET = oauthProviderAuthServerMetadata(auth);






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