"use client";

import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../services/auth.api";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useSignup = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: signupUser,

    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Account Created 🎉🎉")
      router.push("/login");
    },

    onError: (error: any) => {
      toast.error(error.message || "Signup failed 👎")
    },
  });
};
