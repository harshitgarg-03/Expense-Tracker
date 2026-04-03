import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTransaction } from "../services/transaction.api";
import { toast } from "sonner";

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction success! 👍")
    },
    onError: () => {
      toast.success("Transaction failed! 👎")
    }
  });
};
