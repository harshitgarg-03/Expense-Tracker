import { apiErrorFromResponse } from "@/lib/api-error";
import { Transaction } from "../types";

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch("/api/transaction");

  if (!res.ok) {
    throw await apiErrorFromResponse(
      res,
      "Couldn't load your transactions. Please refresh the page.",
    );
  }

  return res.json();
};

export const postTransaction = async (
  payload: Transaction,
): Promise<Transaction> => {
  const res = await fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw await apiErrorFromResponse(
      res,
      "Couldn't add the transaction. Please try again.",
    );
  }

  return res.json();
};

export const deleteTransaction = async (id: string) => {
  const res = await fetch(`/api/transaction/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw await apiErrorFromResponse(
      res,
      "Couldn't delete the transaction. Please try again.",
    );
  }

  return res.json().catch(() => null);
};

export const updateTransaction = async ({
  id,
  payload,
}: any): Promise<Transaction> => {
  const res = await fetch(`/api/transaction/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw await apiErrorFromResponse(
      res,
      "Couldn't update the transaction. Please try again.",
    );
  }

  return res.json();
};
