import { oAuthDiscoveryMetadata } from "better-auth/plugins";
import { auth } from "../../../lib/auth";

type MCPAuth = {
  api: {
    getMcpOAuthConfig: (...args: unknown[]) => unknown;
  };
};

export const GET = oAuthDiscoveryMetadata(
  auth as unknown as MCPAuth
);