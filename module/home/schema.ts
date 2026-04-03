import { z } from "zod";
export const transactionSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  amount: z.number().positive("Amount must be positive"),
  category: z.enum([
    "Food",
    "Travel",
    "Bills",
    "Entertainment",
    "Shopping",
    "Health",
    "Salary",
    "Freelance",
    "Other",
  ]),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.string(),
});
