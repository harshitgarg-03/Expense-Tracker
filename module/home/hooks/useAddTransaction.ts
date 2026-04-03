import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTransaction } from "../services/transaction.api";

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });
};
