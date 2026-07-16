import { NextRequest, NextResponse } from "next/server";

import { proxy } from "./middlewares/proxy";
import { mcp } from "./middlewares/mcp";


export function middleware(request: NextRequest) {
    

    const auth = proxy(request);
    if(auth) return auth;

    const mcpMiddleware = mcp(request);
    if(mcpMiddleware) return mcpMiddleware;

    return NextResponse.next();
}


export const config = {
    matcher: ["/:path*"],
};