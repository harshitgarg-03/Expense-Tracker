// import { auth } from "../lib/auth";

// async function main() {
//   const client = await auth.api.createOAuthClient({
//     body: {
//       name: "expense-tracker-mcp-introspection",
//       type: "confidential",
//       grantTypes: [],
//     },
//   });

//   console.log("INTROSPECTION_CLIENT_ID=", client.clientId);
//   console.log("INTROSPECTION_CLIENT_SECRET=", client.clientSecret);
// }

// main().catch(console.error);



import { auth } from "../lib/auth";

async function main() {
  const result = await auth.api.createOAuthClient({
    body: {
      name: "expense-tracker-mcp-introspection",
    },
  });

  console.dir(result, { depth: null });
}

main().catch(console.error);