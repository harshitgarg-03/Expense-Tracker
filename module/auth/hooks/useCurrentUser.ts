"use client"

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth.api";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export const useCurrentUser = () => {
    const isAuthenticate = false;
    const userId = "";
    const setUser = useAuthStore(s => s.setUser);
    const router = useRouter();
    const {data} =  useQuery({
        queryKey: ["current-user"],
        queryFn: async () => {
            const data = await getCurrentUser();
            if(data?.user) setUser(data.user);
            return data;
        },
    });

    useEffect(() => {
        if (data) {
            setUser(data.user);
            isAuthenticate: true;
            userId: data.user._id
            // router.push("/dashboard");
        }
    }, [data, setUser])
    return data;
};