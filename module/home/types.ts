export type Category = 
  | 'Food' 
  | 'Travel' 
  | 'Bills' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Health' 
  | 'Salary'
  | 'Freelance'
  | 'Other';

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export interface SpendingChartProps {
  data: { month?: string; income?: number; expense?: number; amount?: number }[];
  isLoading?: boolean;
}

export interface TransactionInput {
  title: string;
  amount: number;
  category: Category;
  type?: 'INCOME' | 'EXPENSE';
  date: string;
}

export interface ExpenseFormProps {
  onSubmit: (data: TransactionInput) => Promise<void>;
  defaultValues?: Partial<TransactionInput>;
  isLoading?: boolean;
}


export interface Transaction {
  id?: string;
  title: string;
  amount: number;
  category: Category;
  type: 'INCOME' | 'EXPENSE';
  date: Date;
  note?: String;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryConfig {
  label: string;
  color: string;
  bgColor: string;
}

export const CATEGORY_COLORS: Record<Category, CategoryConfig> = {
  Food: { label: 'Food', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-950' },
  Travel: { label: 'Travel', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-950' },
  Bills: { label: 'Bills', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-950' },
  Entertainment: { label: 'Entertainment', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-950' },
  Shopping: { label: 'Shopping', color: 'text-pink-600', bgColor: 'bg-pink-100 dark:bg-pink-950' },
  Health: { label: 'Health', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-950' },
  Salary: { label: 'Salary', color: 'text-emerald-600', bgColor: 'bg-emerald-100 dark:bg-emerald-950' },
  Freelance: { label: 'Freelance', color: 'text-teal-600', bgColor: 'bg-teal-100 dark:bg-teal-950' },
  Other: { label: 'Other', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-950' },
};

export interface BalanceCardProps {
  title: string;
  amount: number;
  type: 'balance' | 'income' | 'expense';
  isLoading?: boolean;
}
