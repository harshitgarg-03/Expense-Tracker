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
];

const keyOf = (t: {
  date: Date | string;
  amount: number;
  type: string;
  title: string;
}) =>
  `${new Date(t.date).toISOString().slice(0, 10)}|${t.amount}|${t.type}|${t.title.toLowerCase()}`;

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return new Response("unauthorized", { status: 401 });

  const body = await req.json();
  const items = Array.isArray(body.transactions)
    ? body.transactions.slice(0, 500)
    : [];

  const valid = items
    .map((t: any) => ({
      title: String(t.title ?? "")
        .trim()
        .slice(0, 100),
      amount: Math.abs(Number(t.amount)),
      type: t.type === "INCOME" ? "INCOME" : "EXPENSE",
      category: CATEGORIES.includes(t.category) ? t.category : "Other",
      date: new Date(t.date),
    }))
    .filter((t: any) => t.title && t.amount > 0 && !isNaN(t.date.getTime()));

  if (valid.length === 0) {
    return Response.json({ error: "No valid transactions" }, { status: 400 });
  }

  // Duplicate check: wahi statement dobara upload karne par double entries na bane
  const times = valid.map((t: any) => t.date.getTime());
  const existing = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(Math.min(...times)),
        lte: new Date(Math.max(...times)),
      },
    },
    select: { title: true, amount: true, type: true, date: true },
  });
  const seen = new Set(existing.map((e) => keyOf({ ...e, date: e.date! })));

  const fresh = valid.filter((t: any) => !seen.has(keyOf(t)));

  const result = await prisma.transaction.createMany({
    data: fresh.map((t: any) => ({
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
