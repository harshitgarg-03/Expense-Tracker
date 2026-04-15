import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";
import { logoutUser } from "../services/action.api";
import { toast } from "sonner";

export const useLogout = () => {
    const logout = useAuthStore(s => s.logout);
    
    const navigate = useRouter();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            logout();
            toast.success("Logout success 🎉🎉")
            navigate.push("/home")
        },

        onError: (error) => {
            toast.error(error.message || "Logout failed 👎", {
        className: "bg-red-600 text-white"
      })
        }
    });
};
