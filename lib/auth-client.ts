import { createAuthClient } from "better-auth/react"
import { oauthProviderClient } from "@better-auth/oauth-provider/client";
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: typeof window !== "undefined" ? window.location.origin : process.env.BETTER_AUTH_URL,

    plugins: [
    oauthProviderClient(), // ← this is what adds `.oauth2.consent(...)` to the client
  ],
})

// const signIn = async (provider: "google" | "github") => {
//   const data = await authClient.signIn.social({
//     provider,
//   });
// };