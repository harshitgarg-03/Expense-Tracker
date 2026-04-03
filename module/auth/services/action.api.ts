"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const logoutUser = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    // await fetch("/api/auth/sign-out", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  } catch (error) {
    console.error("error is signout ", error);
  }
};
