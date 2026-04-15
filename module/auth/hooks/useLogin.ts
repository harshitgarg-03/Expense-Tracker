"use client";

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.api";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Login success 🎉🎉");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message || "Login failed 👎");
    },
  });
};
