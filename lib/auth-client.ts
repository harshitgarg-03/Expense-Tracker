import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "https://expense-tracker-orpin-nu-68.vercel.app"
})

const signIn = async (provider: "google" | "github") => {
  const data = await authClient.signIn.social({
    provider,
  });
};