import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.api";
import { useAuthStore } from "../store";

export const useLogin = () => {
    const setUser = useAuthStore(s => s.setUser);

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setUser(data.user);
        },
    })

} 