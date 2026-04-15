"use client"

import { motion } from 'motion/react';
import { Header } from './header';
import { BalanceCard } from './balancard';
import { SpendingChart } from './spendChat';
import { RecentTransactions } from './recenttrx';
import { useTransaction } from '../../hooks/useTransaction';

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
      
      {/* Chart and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart data={monthlyData} balance={balance} isLoading={isLoading} />
        <RecentTransactions transactions={transactions} isLoading={isLoading} />
      </div>
    </motion.div>
  );
}