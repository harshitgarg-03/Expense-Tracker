import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "../services/transaction.api";
import { toast } from "sonner";


export function useEditTransaction() {
  const queryClient = useQueryClient();

  return useMutation ({
    mutationFn: updateTransaction,

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transaction"]});
        toast.success("Transaction updated 👍")
    },
    onError: () => {
        toast.error("Transaction updation failed! 👎")
    }
  })
}

