import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTransaction } from "../services/transaction.api";
import { toast } from "sonner";
import { toastError } from "@/lib/api-error";


export const useAddTransaction = () => {
  const queryClient = useQueryClient();
                
  return useMutation({ 
    mutationFn: postTransaction,

    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction success! 👍");
    },
    onError: (error) => {
      toastError(error, "Couldn't add the transaction. Please try again.");
    }
  });
};
