import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return new NextResponse("unauthorized access", { status: 401 });
  }

  try {
    const { question, threadId } = await req.json();
    console.log({
      user_id: session.user.id,
      question,
      thread_id: threadId,
    });

    // Call the Python AI Financial Agent FastAPI backend running locally
    const res = await fetch("https://ai-financial-agent-1.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: session.user.id,
        question: question,
        thread_id: threadId || `session_${session.user.id}`,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("AI Agent backend returned error:", errorText);
      return new NextResponse(
        "Error communicating with AI Financial Agent backend",
        {
          status: res.status,
        },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in Next.js agent proxy route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
