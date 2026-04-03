"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../services/transaction.api";
import { Transaction } from "../types";

export const useTransaction = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["transaction"],
    queryFn: getTransactions,
  });

  const balance = data.reduce(
    (
      acc: {
        income: number;
        total: number;
        expense: number;
      },
      tx: Transaction,
    ) => {
      if (tx.type === "INCOME") {
        acc.income += tx.amount;
        acc.total += tx.amount;
      } else {
        acc.expense += tx.amount;
        acc.total -= tx.amount;
      }
      return acc;
    },
    { total: 0, expense: 0, income: 0 },
  );

  const transactions = data.slice(0, 5);

  const monthlyData = data.reduce(
    (
      acc: {
        month: string;
        amount: number;
      }[],

      tx: Transaction,
    ) => {
      const month = new Date(tx.createdAt).toLocaleString("default", {
        month: "short",
      });

      const existing = acc.find((item) => item.month === month);

      if (existing) {
        existing.amount += tx.amount;
      } else {
        acc.push({ month, amount: tx.amount });
      }
      return acc;
    },
    [],
  );

  return {
    balance,
    monthlyData,
    transactions,
    isLoading,
  };
};
