import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "../services/transaction.api";
import { toast } from "sonner";
import { toastError } from "@/lib/api-error";


export function useEditTransaction() {
  const queryClient = useQueryClient();

  return useMutation ({
    mutationFn: updateTransaction,

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transaction"]});
        toast.success("Transaction updated 👍")
    },
    onError: (error) => {
        toastError(error, "Couldn't update the transaction. Please try again.");
    }
  })
}
