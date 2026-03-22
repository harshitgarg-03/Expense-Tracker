"use client"

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.api";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";


export const useLogin = () => {
    const router = useRouter();
    const setUser = useAuthStore(s => s.setUser);

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log("data ", data);
            setUser(data.user);
            router.push("/home");
        },
    })

} 