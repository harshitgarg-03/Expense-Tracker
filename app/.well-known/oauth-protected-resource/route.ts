import { oAuthProtectedResourceMetadata } from "better-auth/plugins";
import { auth } from "@/lib/auth";

type MCPProtectedResourceAuth =
  Parameters<typeof oAuthProtectedResourceMetadata>[0];

export const GET = oAuthProtectedResourceMetadata(
  auth as unknown as MCPProtectedResourceAuth
);