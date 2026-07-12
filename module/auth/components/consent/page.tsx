// app/consent/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ConsentPage() {
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
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-lg font-medium">{clientName} wants access</h1>
      <ul className="text-sm text-gray-600 list-disc pl-5">
        {scopes.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <div className="flex gap-3">
        <button onClick={() => respond(true)} className="btn-primary">Allow</button>
        <button onClick={() => respond(false)} className="btn-secondary">Deny</button>
      </div>
    </div>
  );
}