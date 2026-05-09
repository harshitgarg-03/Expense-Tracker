"use client";

import { motion } from "motion/react";
import { Header } from "./header";
import { BalanceCard } from "./balancard";
import { SpendingChart } from "./spendChat";
import { RecentTransactions } from "./recenttrx";
import { useTransaction } from "../../hooks/useTransaction";
import AIInsights from "./ai-insights";

export function DashboardPage() {
  const { balance, monthlyData, transactions, isLoading } = useTransaction();
  // console.log("txns ", transactions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header
        title="Dashboard"
        subtitle="Overview of your financial activities"
      />
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BalanceCard
          title="Total Balance"
          amount={balance.total || 0}
          type="balance"
          isLoading={isLoading}
        />
        <BalanceCard
          title="Total Income"
          amount={balance.income || 0}
          type="income"
          isLoading={isLoading}
        />
        <BalanceCard
          title="Total Expenses"
          amount={balance.expense || 0}
          type="expense"
          isLoading={isLoading}
        />
      </div>

      {/* Ai-insigth section */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-white/4 to-white/2 backdrop-blur-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              AI Financial Insights
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Smart analysis based on your spending patterns
            </p>
          </div>

          <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1 text-xs font-semibold tracking-wide text-violet-300">
            LIVE AI
          </div>
        </div>

        {/* AI Component */}
        <div className="relative z-10 p-6">
          <AIInsights
            transactions={transactions}
            balance={balance}
            isLoading={isLoading}
          />
        </div>
      </div>


      {/* Chart and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart
          data={monthlyData}
          balance={balance}
          isLoading={isLoading}
        />
        <RecentTransactions transactions={transactions} isLoading={isLoading} />
      </div>
    </motion.div>
  );
}
