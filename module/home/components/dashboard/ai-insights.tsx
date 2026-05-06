"use client";

import { motion } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  PiggyBank,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: "EXPENSE" | "INCOME";
  date: string;
}

interface AIInsightsProps {
  transactions: Transaction[];
  balance: {
    total: number;
    income: number;
    expenses: number;
  };
  isLoading?: boolean;
}

interface Insight {
  type: "danger" | "warning" | "success" | "info";
  icon: React.ReactNode;
  title: string;
  message: string;
  category?: string;
}

function analyzeSpending(
  transactions: Transaction[],
  balance: {
    total: number;
    income: number;
    expenses: number;
  }
): Insight[] {
  const insights: Insight[] = [];

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  const currentMonthExpenses = currentMonthTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentMonthIncome = currentMonthTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryExpenses = new Map<string, number>();

  currentMonthTransactions
    .filter((t) => t.type === "EXPENSE")
    .forEach((t) => {
      categoryExpenses.set(
        t.category,
        (categoryExpenses.get(t.category) || 0) + t.amount
      );
    });

  const sortedCategories = Array.from(categoryExpenses.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  const spendingRate =
    currentMonthIncome > 0
      ? (currentMonthExpenses / currentMonthIncome) * 100
      : 0;

  // Spending analysis
  if (spendingRate > 90) {
    insights.push({
      type: "danger",
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "High Spending Alert",
      message: `You're spending ${spendingRate.toFixed(
        0
      )}% of your income this month.`,
    });
  } else if (spendingRate > 70) {
    insights.push({
      type: "warning",
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Watch Your Spending",
      message: `You're spending ${spendingRate.toFixed(
        0
      )}% of your income.`,
    });
  } else if (spendingRate < 50) {
    insights.push({
      type: "success",
      icon: <PiggyBank className="h-5 w-5" />,
      title: "Excellent Saving Habits",
      message: `Amazing! You're only spending ${spendingRate.toFixed(
        0
      )}% of your income.`,
    });
  }

  // Top category analysis
  if (sortedCategories.length > 0) {
    const topCategory = sortedCategories[0];

    const categoryPercent =
      (topCategory[1] / currentMonthExpenses) * 100;

    insights.push({
      type: categoryPercent > 40 ? "danger" : "warning",
      icon:
        categoryPercent > 40 ? (
          <AlertTriangle className="h-5 w-5" />
        ) : (
          <TrendingDown className="h-5 w-5" />
        ),
      title: `${topCategory[0]} Spending`,
      message: `${topCategory[0]} takes ${categoryPercent.toFixed(
        0
      )}% of your expenses.`,
      category: topCategory[0],
    });
  }

  // Savings suggestion
  const potentialSavings = Math.max(
    0,
    currentMonthIncome * 0.3 -
      (currentMonthIncome - currentMonthExpenses)
  );

  if (potentialSavings > 100) {
    insights.push({
      type: "info",
      icon: <DollarSign className="h-5 w-5" />,
      title: "Savings Opportunity",
      message: `You can potentially save ₹${potentialSavings.toFixed(
        0
      )} more this month.`,
    });
  }

  // Low balance warning
  if (balance.total < 500 && balance.total > 0) {
    insights.push({
      type: "danger",
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Low Balance Alert",
      message: `Your balance is critically low.`,
    });
  }

  return insights.slice(0, 4);
}

export default function AIInsights({
  transactions,
  balance,
  isLoading,
}: AIInsightsProps) {
  const insights = analyzeSpending(transactions, balance);

  const getStyles = (type: Insight["type"]) => {
    switch (type) {
      case "danger":
        return {
          border: "border-red-500",
          bg: "bg-red-50 dark:bg-red-950/20",
          icon: "text-red-500",
        };

      case "warning":
        return {
          border: "border-yellow-500",
          bg: "bg-yellow-50 dark:bg-yellow-950/20",
          icon: "text-yellow-500",
        };

      case "success":
        return {
          border: "border-green-500",
          bg: "bg-green-50 dark:bg-green-950/20",
          icon: "text-green-500",
        };

      default:
        return {
          border: "border-blue-500",
          bg: "bg-blue-50 dark:bg-blue-950/20",
          icon: "text-blue-500",
        };
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Financial Insights</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-purple-500" />
          AI Financial Insights

          <Badge variant="secondary" className="ml-auto">
            Smart Advisor
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <Lightbulb className="h-12 w-12 mx-auto opacity-50 mb-3" />

            <p>Add more transactions to generate insights.</p>
          </div>
        ) : (
          insights.map((insight, index) => {
            const style = getStyles(insight.type);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border-l-4 rounded-xl p-4 ${style.border} ${style.bg}`}
              >
                <div className="flex gap-3">
                  <div className={style.icon}>{insight.icon}</div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        {insight.title}
                      </h4>

                      {insight.category && (
                        <Badge variant="outline">
                          {insight.category}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {insight.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}