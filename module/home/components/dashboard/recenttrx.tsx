import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Transaction, CATEGORY_COLORS, RecentTransactionsProps } from '../../types';
import { format } from 'date-fns';

export function RecentTransactions({ transactions, isLoading }: RecentTransactionsProps) {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const recentTransactions = transactions.slice(0, 5) || [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => {
            const categoryConfig = CATEGORY_COLORS[transaction.category];
            const isIncome = transaction.type === 'INCOME';
            
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${categoryConfig.bgColor}`}>
                    {isIncome ? (
                      <ArrowUpRight className={`h-5 w-5 ${categoryConfig.color}`} />
                    ) : (
                      <ArrowDownRight className={`h-5 w-5 ${categoryConfig.color}`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(transaction.date!), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                  {isIncome ? '+' : '-'}{formatAmount(transaction.amount)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
