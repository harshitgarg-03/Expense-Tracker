"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  TrendingUp,
  PieChart,
  Wallet,
  CheckCircle2,
  Star,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const chartData = [
  { month: "Jan", income: 5000, expenses: 3200 },
  { month: "Feb", income: 6200, expenses: 3800 },
  { month: "Mar", income: 5800, expenses: 4100 },
  { month: "Apr", income: 7200, expenses: 3900 },
  { month: "May", income: 8200, expenses: 4150 },
];

export default async function HomePage() {
  // useEffect(() => {

  //   funct
   

  // }, [])
  return (
    <div className="w-full bg-linear-to-b from-background to-muted/20">
      {/* HERO */}
      <section className="relative px-6 py-24">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-100 w-100 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Star className="h-4 w-4 fill-primary" />
              Trusted by 50,000+ users
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Take Control of Your
              <span className="block bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-muted-foreground mb-8 text-lg">
              Track expenses, analyze spending patterns, and achieve your goals
              with powerful tools.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div variants={fadeInUp} className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-gray-200/85 dark:border-gray-800/85 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-transparent to-blue-500/5" />
              
              {/* Cards grid */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className="border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-900/80 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                    </div>
                    <h3 className="text-2xl font-bold">$12,450</h3>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-900/80 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">Income</p>
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">$8,200</h3>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-900/80 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">Expenses</p>
                    </div>
                    <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">$4,150</h3>
                  </CardContent>
                </Card>
              </div>

              {/* Chart section */}
              <div className="border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-900/80 rounded-xl p-5 shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-semibold">Monthly Spending Flow</h4>
                    <p className="text-xs text-muted-foreground">Recent income and expenses trend</p>
                  </div>
                  <div className="flex gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>Income</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>Expenses</span>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-gray-150 dark:stroke-gray-800" horizontal={true} vertical={false} />
                      <XAxis dataKey="month" className="text-[10px] text-muted-foreground" tickLine={false} axisLine={false} />
                      <YAxis className="text-[10px] text-muted-foreground" tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          fontSize: '12px'
                        }}
                        itemStyle={{ padding: '2px 0' }}
                        labelStyle={{ fontWeight: '600', marginBottom: '4px', color: '#1e293b' }}
                      />
                      <Area type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                      <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything You Need to Manage Your Money
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful features designed to help you understand and control your
              spending
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card
                  className="
              h-full
              border border-gray-200/60 dark:border-gray-800/60
              bg-white/70 dark:bg-gray-900/60
              backdrop-blur
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl
            "
                >
                  <CardContent className="pt-6 pb-6 px-6">
                    {/* Icon */}
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="px-6 py-20 bg-muted/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 text-center"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <h3 className="text-4xl font-bold text-primary">{s.value}</h3>
              <p className="text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">
                Why Choose ExpenseTracker?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="rounded-xl border bg-background p-6 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">Groceries</p>
                        <p className="text-sm text-muted-foreground">
                          Today, 2:30 PM
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-red-500">-$125.50</p>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Salary</p>
                        <p className="text-sm text-muted-foreground">
                          Yesterday
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-500">+$3,500</p>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Utilities</p>
                        <p className="text-sm text-muted-foreground">Mar 20</p>
                      </div>
                    </div>
                    <p className="font-semibold text-red-500">-$89.00</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section id="about" className="px-4 py-20 sm:px-6 lg:px-8 bg-muted/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">
                About ExpenseTracker
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2024, ExpenseTracker was born from a simple idea:
                  personal finance management should be effortless, intuitive,
                  and accessible to everyone.
                </p>
                <p>
                  Our mission is to empower individuals and families to take
                  control of their financial lives through smart technology and
                  beautiful design. We believe that understanding where your
                  money goes is the first step toward financial freedom.
                </p>
                <p>
                  Today, we're proud to serve over 50,000 users worldwide,
                  helping them track millions of transactions and make better
                  financial decisions every day.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-sm text-muted-foreground">
                        Active Users
                      </div>
                    </div>
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">2M+</div>
                      <div className="text-sm text-muted-foreground">
                        Transactions
                      </div>
                    </div>
                    <div className="text-center">
                      <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm text-muted-foreground">
                        Secure
                      </div>
                    </div>
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-muted-foreground">
                        Support
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto max-w-4xl"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-blue-500/10" />
            <CardContent className="relative pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl mb-4">
                Ready to Take Control?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already managing their finances
                smarter. Start your journey to financial freedom today.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link href="/signup">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description:
      "Beautiful charts and graphs that help you understand your spending patterns at a glance.",
  },
  {
    icon: PieChart,
    title: "Category Tracking",
    description:
      "Organize expenses by categories and see exactly where your money goes each month.",
  },
  {
    icon: Wallet,
    title: "Budget Management",
    description:
      "Set budgets for different categories and get alerts when you're close to your limits.",
  },
  {
    icon: TrendingUp,
    title: "Income Tracking",
    description:
      "Track all your income sources and monitor your cash flow with ease.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your financial data is encrypted and protected with industry-standard security.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Add transactions in seconds with our intuitive and streamlined interface.",
  },
];

const stats = [
  { value: "50K+", label: "Users" },
  { value: "2M+", label: "Transactions" },
  { value: "99%", label: "Uptime" },
  { value: "4.9", label: "Rating" },
];

const benefits = [
  {
    title: "Easy to Use",
    description: "Simple and intuitive UI",
  },
  {
    title: "Real-time Tracking",
    description: "Live expense updates",
  },
  {
    title: "Secure",
    description: "Your data is protected",
  },
];
