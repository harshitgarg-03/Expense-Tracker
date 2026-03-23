import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: Request) {
  return auth.handler(request);
}

export async function POST(request: Request) {
  return auth.handler(request);
}
