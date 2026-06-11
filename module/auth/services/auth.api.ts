import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signupUser = async (data: authProp) => {
  const res = await fetch("/api/auth/sign-up/email", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Signup user failed!");

  return res.json();
};

export const loginUser = async (data: authProp) => {
  const res = await fetch("/api/auth/sign-in/email", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("login failed ");

  return res.json();
};

export const getCurrentUser = async () => {
  // const res = await fetch("/api/auth/get-session", {
  //   credentials: "include",
  // });

  const session = await auth.api.getSession({
    headers: await headers()
  })

  // if (!res.ok) return null;

  if(!session){
    console.log("unauthentucated");
  } else {
    console.log("session is ", session);
  }
  return session?.user;
};
