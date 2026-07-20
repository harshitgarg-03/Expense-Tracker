import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "./prisma";
import { jwt } from "better-auth/plugins";
import { oauthProvider } from "@better-auth/oauth-provider";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  plugins: [
    jwt({
      jwks: {
        keyPairConfig: { alg: "RS256" },
      },
    }),

    oauthProvider({
      loginPage: "/login",       // flat now, not nested under oidcConfig
      consentPage: "/consent",
      accessTokenExpiresIn: 900,
      refreshTokenExpiresIn: 60 * 60 * 24 * 30,
      allowDynamicClientRegistration: true,
      allowUnauthenticatedClientRegistration: true,
      scopes: ["openid", "profile", "email", "offline_access", "expenses:read", "expenses:write"],
      validAudiences: ["https://expense-tracker-mcp.fastapicloud.dev/mcp"],
      silenceWarnings: {
        oauthAuthServerConfig: true,
      },
    }),

    // mcp({
    //   loginPage: "/login",
    //   resource: process.env.MCP_RESOURCE_URI!, // canonical URI of your MCP server, e.g. "https://mcp.yourapp.com"
    //   oidcConfig: {
    //     loginPage: "/login",
    //     consentPage: "/consent",
    //     accessTokenExpiresIn: 900, // 15 min — short-lived is important, see hardening section
    //     refreshTokenExpiresIn: 60 * 60 * 24 * 30, // 30 days
    //   },
    // }),

    nextCookies(),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },

  cookies: {
    sessionToken: {
      name: "session_token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
