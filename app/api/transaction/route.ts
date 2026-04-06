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
    return new Response("unauthorized user", { status: 401 });
  }

  const data = await req.json();
  console.log("data expense backend is", data);

  const transaction = await prisma.transaction.create({
    data: {
      title: data.title,
      amount: Number(data.amount),
      category: data.category,
      type: data.type,
      note: data.note || null,
      userId: session.user.id,
    },   
  });

  return Response.json(transaction);
}
