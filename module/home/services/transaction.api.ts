import { Transaction } from "../types";

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const res = await fetch("/api/transaction");

    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data: Transaction[] = await res.json();
    return data;
  } catch (error) {
    // console.error("Error fetching transactions:", error);
    return [];
  }
};

export const postTransaction = async (
  payload: Transaction,
): Promise<Transaction> => {
  try {
    const res = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to create transaction");
    }

    const result: Transaction = await res.json();
    return result;
  } catch (error) {
    // console.error("PostTransaction Error:", error);
    throw error;
  }
};
       
export const deleteTransaction = async (id: string) => {
  try {
    const res = await fetch(`api/transaction/${id}`, {
      method: "DELETE",
    });

    // console.log("delete res is ", res);
    
    if (!res.ok) {
      throw new Error("error in deleting a transaction ");
    }

    return await res.json();
  } catch (error) {
    throw `error in deleting a transaction ${error}`;
  }
};
