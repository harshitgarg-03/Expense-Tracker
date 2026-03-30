import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({ children }: {children: React.ReactNode}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  }); 

  if(!session?.user){
    redirect("/login");
  }
  
  return (
  <div className="p-0! flex h-auto w-full gap-5 overflow-hidden">
    
    {/* Sidebar */}
    <Sidebar />

    {/* Content */}
    <main className="flex-1 h-full overflow-hidden">
      {children}
    </main>

  </div>
);
}