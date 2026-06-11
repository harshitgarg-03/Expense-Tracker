import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function InitialAuth({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/dashboard");
  }
  return <>{children}</>;
}

export default InitialAuth;
