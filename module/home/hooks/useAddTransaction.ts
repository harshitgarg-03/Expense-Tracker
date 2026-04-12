import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTransaction } from "../services/transaction.api";
import { toast } from "sonner";
import { useForm } from 'react-hook-form';

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const { reset } = useForm();
                
  return useMutation({ 
    mutationFn: postTransaction,

    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction success! 👍");
      reset();
    },
    onError: () => {
      toast.error("Transaction failed! 👎")
    }
  });
};
