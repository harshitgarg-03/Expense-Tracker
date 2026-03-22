import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/auth.api";
import { useAuthStore } from "../store";
import { useStore } from "zustand";

export const useLogout = () => {
    const logout = useAuthStore(s => s.logout);

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            logout();
        },
    });
};
