import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return new Response("unauthorized access ", { status: 401 });
  }
  // console.log("session si ", session);
  
  const transaction = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: { createdAt: "desc" },
  });

  // console.log("transaction is ", transaction);
  
  if(!transaction) {
    return new Response("get transactions not found", { status: 403 });
  }

  return Response.json(transaction);
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return new Response("unauthorized user ", { status: 404 });
  }

  const data = await req.json();
  const transaction = await prisma.transaction.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });
  if(!transaction) {
    return new Response("post transactions get failed!", { status: 401 });
  }
  return Response.json(transaction);
}
