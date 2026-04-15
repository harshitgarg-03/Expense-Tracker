import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const txn = await params;
    const id = txn.id;

    const data = await prisma.transaction.delete({
      where: {
        id,
      },
    });
    if (!data) {
      console.log("something went wrong");
      return;
    }

    return NextResponse.json({
      message: "Transaction delete succeed!",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error in transaction delete ${error} `,
      status: 400,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const txn = await params;
  const id = txn.id;

  if (!id) {
    return new Response("updete txn id not found!", { status: 404 });
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return new Response("Unauthorized!", { status: 401 });
  }

  try {
    const data = await request.json();

    const transaction = await prisma.transaction.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        amount: Number(data.amount),
        category: data.category,
        date: data.date ? new Date(data.date) : Date.now(),
        type: data.type,
        note: data.note || null,
        userId: session.user.id,
      },
    });

    return Response.json(transaction);
  } catch (error) {
    return new Response("update txn failed!", { status: 500 });
  }
}
