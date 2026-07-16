import { NextRequest, NextResponse } from "next/server";

import { proxy } from "./middlewares/proxy";
import { mcpmiddleware } from "./middlewares/mcp";


export function middleware(request: NextRequest) {
    

    const auth = proxy(request);
    if(auth) return auth;

    const mcp_Middleware = mcpmiddleware(request);
    if(mcp_Middleware) return mcp_Middleware;

    return NextResponse.next();
}


export const config = {
    matcher: ["/:path*"],
};