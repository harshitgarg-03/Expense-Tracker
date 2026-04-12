import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../services/transaction.api";
import { toast } from "sonner";

export const useDeleteTransaction = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,

    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction Delete success! 👍");
    },
    onError: () => {
      toast.error("Transaction Delete failed! 👎");
    },
  });
};
 