"use client";

import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../services/auth.api";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toastError } from "@/lib/api-error";


export const useSignup = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: signupUser,

    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Account Created 🎉🎉")
      router.push("/dashboard");
      router.refresh();
    },

    onError: (error) => {
      toastError(error, "Signup failed. Please try again.");
    },
  });
};
