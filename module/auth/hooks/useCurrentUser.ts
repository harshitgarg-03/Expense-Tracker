"use client"

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth.api";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";


export const useCurrentUser = () => {
    const setUser = useAuthStore(s => s.setUser);
    const router = useRouter();
    return useQuery({
        queryKey: ["current-user"],
        queryFn: async () => {
            const data = await getCurrentUser();
            if(data?.user) setUser(data.user);
            // rou
            return data;
        },
    });
};