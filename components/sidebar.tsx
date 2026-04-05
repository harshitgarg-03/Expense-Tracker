"use client"
import { LayoutDashboard, PlusCircle, Receipt, LogOut, Wallet } from 'lucide-react';
import { useAuthStore } from '../module/auth/store';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogout } from '@/module/auth/hooks/useLogout';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Add Expense', to: '/add-expense', icon: PlusCircle },
  { name: 'Transactions', to: '/transaction-table', icon: Receipt },
];

export function Sidebar() {
  const location = usePathname();
  const { user } = useAuthStore();
  const router = useRouter();
  const { isPending, mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };
  
  return (
    <div className="flex h-screen font-medium pb-4 w-64 flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">

  {/* Logo */}
  <div className="flex items-center gap-3 px-5 h-16 border-b">
    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600/10">
      
      <Wallet className="h-6 w-6 cursor-pointer text-blue-600" onClick={() => router.push("/dashboard")}/>
    </div> 
    <span className="text-2xl font-semibold tracking-tight">
      ExpenseTracker
    </span>
  </div>

  {/* Navigation */}
  <nav className="flex-1 px-3 py-5 space-y-1">
    {navigation.map((item) => {
      const isActive = location === item.to;
      const Icon = item.icon;

      return (
        <Link
          key={item.name}
          href={item.to}
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
            isActive
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5 transition",
              isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
            )}
          />
          <span>{item.name}</span>
        </Link>
      );
    })}
  </nav>

  {/* User Section */}
  <div className="border-t px-4 py-4 bg-gray-50 dark:bg-gray-900/50">
    
    <div className="flex items-center gap-3 mb-4">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
          {user?.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {user?.name}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {user?.email}
        </p>
      </div>
    </div>

    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="w-full cursor-pointer justify-start gap-2 rounded-lg"
    >
      <LogOut className="h-4 w-4" />
      { isPending? "Logging out...": "Logout"}
    </Button>

  </div>
</div>
  );
}