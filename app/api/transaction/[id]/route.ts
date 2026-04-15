import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
    try {
        // console.log("pramsa is ", params);
        
        const txn = await params;
        const id = txn.id;
        
        const data = await prisma.transaction.delete({
            where: {
                id
            }
        })
        if(!data){
            console.log("something went wrong");
            return;
        }
        // console.log("data is ", data);
        
        return NextResponse.json({
            message: "Transaction delete succeed!",
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: `Error in transaction delete ${error} `,
            status: 400
        })
    }
}
