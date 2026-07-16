// app/consent/page.tsx
"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function ConsentContent() {
  const params = useSearchParams();
  const clientName = params.get("client_name") ?? "This application";
  const scopes = (params.get("scope") ?? "").split(" ").filter(Boolean);

  async function respond(approve: boolean) {
    await authClient.$fetch("/mcp/consent", {
      method: "POST",
      body: { accept: approve, oauth_query: params.get("oauth_query") },
    });
    // Better Auth redirects the browser back to the MCP client's redirect_uri
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
          Authorization Request
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-800 dark:text-gray-200">{clientName}</span> wants access to your account details.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Requested Permissions
        </h2>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 pl-1">
          {scopes.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => respond(true)}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition"
        >
          Allow
        </button>
        <button
          onClick={() => respond(false)}
          className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg text-sm transition"
        >
          Deny
        </button>
      </div>
    </div>
  );
}

export default function ConsentPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto mt-20 p-6 text-center text-sm text-gray-500">
        Loading consent request...
      </div>
    }>
      <ConsentContent />
    </Suspense>
  );
}