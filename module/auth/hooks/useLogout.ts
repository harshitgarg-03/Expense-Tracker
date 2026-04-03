import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";
import { logoutUser } from "../services/action.api";

export const useLogout = () => {
    const logout = useAuthStore(s => s.logout);
    
    const navigate = useRouter();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            logout();
            navigate.push("/home")
        },
    });
};
