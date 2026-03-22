import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth.api";
import { useAuthStore } from "../store";


export const useCurrentUser = () => {
    const setUser = useAuthStore(s => s.setUser);

    return useQuery({
        queryKey: ["current-user"],
        queryFn: async () => {
            const data = await getCurrentUser();
            if(data?.user) setUser(data.user);
            return data;
        },
    });
};