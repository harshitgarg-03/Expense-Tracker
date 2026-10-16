import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../services/transaction.api";
import { toast } from "sonner";
import { toastError } from "@/lib/api-error";

export const useDeleteTransaction = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,

    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction Delete success! 👍");
    },
    onError: (error) => {
      toastError(error, "Couldn't delete the transaction. Please try again.");
    },
  });
};
