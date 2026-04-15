"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../services/transaction.api";
import { Transaction } from "../types";

export const useTransaction = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["transaction"],
    queryFn: getTransactions,
  });

  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // console.log("data is : ", data);

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

  const transactions = data.slice(0, 10);

  // const monthlyData = data.reduce(
  //   (
  //     acc: {
  //       month: string;
  //       amount: number;
  //       expense: number;
  //       income: number;
  //     }[],

  //     tx: Transaction,
  //   ) => {
  //     const month = new Date(tx.createdAt!).toLocaleString("default", {
  //       month: "short",
  //     });

  //     const existing = acc.find((item) => item.month === month);

  //     if (existing) {
  //       existing.amount += tx.amount;
  //     } else {
  //       acc.push({ month, amount: tx.amount, income: balance.income, expense: balance.expense });
  //     }
  //     return acc;
  //   },
  //   [],
  // );

  const monthlyData = allMonths.map((month) => {
    const monthTxns = data.filter((tx: Transaction) => {
      const txMonth = new Date(tx.date).toLocaleString("default", {
        month: "short",
      });
      return txMonth == month;
    });
    // console.log("month txn ", monthTxns);
    
    let income = 0;
    let expense = 0;

    monthTxns.forEach((tx) => {
      if (tx.type === "INCOME") {
        income += tx.amount;
      } else {
        expense += tx.amount;
      }
    });

    return {
      month,
      income,
      expenses: expense, // chart ke liye important key
    };
  });
  // console.log("monthlyData ", monthlyData);

  return {
    balance,
    monthlyData,
    transactions,
    isLoading,
  };
};
