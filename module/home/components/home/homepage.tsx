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

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      {/* HERO */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
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
          <motion.div variants={fadeInUp} className="mt-16">
            <div className="rounded-xl border bg-background p-6 shadow-2xl">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <Wallet className="text-primary mb-2" />
                    <p>Total Balance</p>
                    <h3 className="text-xl font-bold">$12,450</h3>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <TrendingUp className="text-green-500 mb-2" />
                    <p>Income</p>
                    <h3 className="text-green-500 font-bold">$8,200</h3>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <BarChart3 className="text-red-500 mb-2" />
                    <p>Expenses</p>
                    <h3 className="text-red-500 font-bold">$4,150</h3>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20">
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
                    <div className="flex-shrink-0">
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
