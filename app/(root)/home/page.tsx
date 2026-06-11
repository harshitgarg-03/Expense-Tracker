"use client";

import { authClient } from "@/lib/auth-client";
import HomePage from "@/module/home/components/home/homepage";

async function page() {
  console.log("harshit");
  const session = await authClient.getSession();
  console.log("session", session);
  return <HomePage />;
}

export default page;
