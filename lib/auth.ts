import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js"
import { prisma } from "./prisma";

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

  plugins: [nextCookies()],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },

  cookies: {
    sessionToken: {
      name: "session_token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      },
    },
  },
});
