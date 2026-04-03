import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BalanceCardProps } from '../../types';

export function BalanceCard({ title, amount, type, isLoading }: BalanceCardProps) {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  const getIcon = () => {
    switch (type) {
      case 'income':
        return <ArrowUpRight className="h-5 w-5 text-green-600" />;
      case 'expense':
        return <ArrowDownRight className="h-5 w-5 text-red-600" />;
      default:
        return <Wallet className="h-5 w-5 text-blue-600" />;
    }
  };
  
  const getAmountColor = () => {
    switch (type) {
      case 'income':
        return 'text-green-600 dark:text-green-500';
      case 'expense':
        return 'text-red-600 dark:text-red-500';
      default:
        return 'text-gray-900 dark:text-white';
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-5 rounded" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-32" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
          {getIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-xl md:text-2xl font-semibold ${getAmountColor()}`}>
          {formatAmount(amount)}
        </div>
      </CardContent>
    </Card>
  );
}