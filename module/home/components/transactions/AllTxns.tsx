"use client"
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useTransaction } from "../../hooks/useTransaction";
import { CATEGORY_COLORS, Transaction } from "../../types";

export function TransactionTableUI() {
  const { balance, monthlyData, transactions, isLoading } = useTransaction();
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <span className="text-sm text-gray-500">
          {transactions.length} items
        </span>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx: Transaction) => {
                const isIncome = tx.type === "INCOME";
                const categoryConfig = CATEGORY_COLORS[tx.category];
                
                return (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.title}</TableCell>

                    <TableCell>
                      <Badge className={`${categoryConfig.bgColor} ${categoryConfig.color}`} >{tx.category}</Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant={isIncome ? "default" : "secondary"}>
                        {tx.type}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {format(new Date(tx.date), "MMM dd, yyyy")}
                    </TableCell>

                    <TableCell
                      className={`font-semibold ${
                        isIncome ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isIncome ? "+" : "-"}${tx.amount}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
