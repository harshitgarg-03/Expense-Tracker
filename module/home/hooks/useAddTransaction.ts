import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTransaction } from "../services/transaction.api";
import { toast } from "sonner";
import { useForm } from 'react-hook-form';

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const { reset } = useForm();
  // console.log("use add transcation ");
          
  return useMutation({
    mutationFn: postTransaction,

    onSuccess: () => {
      // console.log("succs txn");
      
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction success! 👍");
      reset();
    },
    onError: () => {
      // console.error("error txn");
      toast.error("Transaction failed! 👎")
    }
  });
};
