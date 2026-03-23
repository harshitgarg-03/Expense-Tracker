import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return new Response("unauthorized access ", { status: 401 });
  }

  const transaction = await prisma.transaction.findMnay({
    where: {
      userId: session.user.id,
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(transaction);
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return new Response("unauthorized user ", { status: 401 });
  }

  const data = await req.json();
  const transaction = await prisma.transaction.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });
  return Response.json(transaction);
}
