import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

const CATEGORIES = [
  "Food",
  "Travel",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Salary",
  "Freelance",
  "Other",
] as const;

type BankTransactionInput = {
  title?: unknown;
  amount?: unknown;
  type?: unknown;
  category?: unknown;
  date?: unknown;
};

type ValidatedTransaction = {
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: (typeof CATEGORIES)[number];
  date: Date;
};

type TransactionKeyInput = {
  date: Date | string;
  amount: number;
  type: string;
  title: string;
};

const keyOf = (t: TransactionKeyInput): string =>
  `${new Date(t.date).toISOString().slice(0, 10)}|${t.amount}|${t.type}|${t.title.toLowerCase()}`;

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new Response("unauthorized", { status: 401 });
  }

  const body: unknown = await req.json();

  const transactions =
    typeof body === "object" &&
    body !== null &&
    "transactions" in body &&
    Array.isArray(body.transactions)
      ? body.transactions.slice(0, 500) as BankTransactionInput[]
      : [];

  const valid: ValidatedTransaction[] = transactions
    .map((t): ValidatedTransaction => ({
      title: String(t.title ?? "").trim().slice(0, 100),
      amount: Math.abs(Number(t.amount)),
      type: t.type === "INCOME" ? "INCOME" : "EXPENSE",
      category: CATEGORIES.includes(
        t.category as (typeof CATEGORIES)[number]
      )
        ? (t.category as (typeof CATEGORIES)[number])
        : "Other",
      date: new Date(t.date as string),
    }))
    .filter(
      (t) =>
        t.title.length > 0 &&
        Number.isFinite(t.amount) &&
        t.amount > 0 &&
        !isNaN(t.date.getTime())
    );

  if (valid.length === 0) {
    return Response.json(
      { error: "No valid transactions" },
      { status: 400 }
    );
  }

  const times = valid.map((t) => t.date.getTime());

  const existing = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(Math.min(...times)),
        lte: new Date(Math.max(...times)),
      },
    },
    select: {
      title: true,
      amount: true,
      type: true,
      date: true,
    },
  });

  const seen = new Set(
    existing.map((e) =>
      keyOf({
        title: e.title,
        amount: Number(e.amount),
        type: e.type,
        date: e.date!,
      })
    )
  );

  const fresh = valid.filter((t) => !seen.has(keyOf(t)));

  const result = await prisma.transaction.createMany({
    data: fresh.map((t) => ({
      ...t,
      note: "Imported from bank statement",
      userId: session.user.id,
    })),
  });

  return Response.json({
    created: result.count,
    skipped: valid.length - fresh.length,
  });
}