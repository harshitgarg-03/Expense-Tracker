"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Header } from "./header";
import { BalanceCard } from "./balancard";
import { SpendingChart } from "./spendChat";
import { RecentTransactions } from "./recenttrx";
import { useTransaction } from "../../hooks/useTransaction";
import AIInsights from "./ai-insights";
import { AIChat } from "./ai-chat";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
            
export function DashboardPage() {
  const { balance, monthlyData, transactions, isLoading } = useTransaction();
  const [activeTab, setActiveTab] = useState<"insights" | "advisor">("insights");
  const [isChatOpen, setIsChatOpen] = useState(true);

  const handleTabChange = (tab: "insights" | "advisor") => {
    setActiveTab(tab);
    setIsChatOpen(tab === "advisor");
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setActiveTab("insights");
  };

  const handleChatOpen = () => {
    setIsChatOpen(true);
    setActiveTab("advisor");
  };
  
  return (
    <div className="flex h-full w-full gap-6 overflow-hidden">
      {/* Left panel: Scrollable Dashboard Content */}
      <div className="flex-1 h-full overflow-y-auto no-scrollbar pt-2 pb-6 pr-1">
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
      <div className="relative overflow-hidden mb-8 rounded-[2rem] border border-white/10 bg-linear-to-br from-white/4 to-white/2 backdrop-blur-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 px-6 py-5 gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
              {activeTab === "insights" ? "AI Financial Insights" : "AI Financial Advisor"}
            </h2>
            <p className="mt-1 text-sm text-black dark:text-gray-400">
              {activeTab === "insights"
                ? "Smart analysis based on your spending patterns"
                : "Ask queries and chat with your personalized AI agent"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Pill Tabs */}
            <div className="flex bg-black/10 dark:bg-white/5 p-1 rounded-xl border border-black/10 dark:border-white/10">
              <button
                onClick={() => handleTabChange("insights")}
                className={`cursor-pointer px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === "insights"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Insights
              </button>
              <button
                onClick={() => handleTabChange("advisor")}
                className={`cursor-pointer px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === "advisor"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Chat Advisor
              </button>
            </div>

            <div className="hidden sm:block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1 text-xs font-semibold tracking-wide text-violet-600 dark:text-violet-300">
              LIVE AI
            </div>
          </div>
        </div>

        {/* AI Component */}
        <div className="relative z-10 p-6">
          {activeTab === "insights" ? (
            <AIInsights
              transactions={transactions}
              balance={balance}
              isLoading={isLoading}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bot className="h-12 w-12 text-violet-500 mb-3 animate-pulse" />
              <h3 className="font-semibold text-lg text-black dark:text-white">AI Financial Advisor Active</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                Your personalized AI Advisor is now active in the right sidebar. Ask questions about your spending patterns or get savings advice!
              </p>
            </div>
          )}
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
      </div>

      {/* Right Side Chat Panel */}
      <div
        className={cn(
          "h-full shrink-0 transition-all duration-300 ease-in-out",
          isChatOpen
            ? "fixed inset-4 z-50 lg:relative lg:inset-auto w-[calc(100%-2rem)] lg:w-[400px] h-[calc(100vh-2rem)] lg:h-full opacity-100"
            : "w-0 opacity-0 pointer-events-none hidden lg:block"
        )}
      >
        <div className="w-full lg:w-[400px] h-full flex flex-col rounded-[2rem] border border-white/10 bg-linear-to-br from-white/4 to-white/2 backdrop-blur-2xl p-6 relative overflow-hidden">
          {/* Glow Effects */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
          
          <AIChat onClose={handleChatClose} />
        </div>
      </div>

      {/* Floating Action Button */}
      {!isChatOpen && (
        <button
          onClick={handleChatOpen}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg cursor-pointer transition-all hover:scale-105"
        >
          <Bot className="h-5 w-5 animate-pulse" />
          <span className="text-sm font-semibold">AI Advisor</span>
        </button>
      )}
    </div>
  );
}
