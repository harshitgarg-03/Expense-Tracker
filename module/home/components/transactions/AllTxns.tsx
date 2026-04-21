"use client";

import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useTransaction } from "../../hooks/useTransaction";
import { CATEGORY_COLORS, Transaction } from "../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, ExpenseFormUI } from "../addExpense/addExpensePage";
import { Label } from "@/components/ui/label";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function TransactionTableUI() {
  const { transactions, isLoading } = useTransaction();
  const { mutate } = useDeleteTransaction();
  const [open, setopen] = useState<boolean>(false);
  const [Category, setCategory] = useState<string>("all");
  const [editTxn, seteditTxn] = useState<Transaction>();
  const handledelete = (id: string) => {
    mutate(id);
  };
  const handleEdit = async(id: string, txn: Transaction) => {
    await seteditTxn(txn);
    setopen(!open);
  };

  const filteredtxn = Category == "all"? transactions: transactions.filter(txn => txn.category == Category);

  return (
    <div className="space-y-6">
        <Dialog open={open} onOpenChange={setopen} >
          <DialogContent className="max-w-xl! w-full ">
            <ExpenseFormUI mode="Edit" EditTxn={editTxn!} />
          </DialogContent>
        </Dialog>
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <p className="text-gray-500 text-sm">
          View and manage all your transactions
        </p>
      </div>

      {/* Filter + Count */}
      <div className="flex items-end justify-between gap-4 ml-2 flex-wrap">
        {/* Left: Category Filter */}
        <div className="flex flex-col">
          <Label className="text-xs text-gray-500 mb-1">Category</Label>

          <Select onValueChange={(value) => setCategory(value)} >
            <SelectTrigger className="w-45 h-10 rounded-lg bg-gray-100 border-none">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>

              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Right: Count */}
        <span className="text-lg font-semibold text-gray-500 whitespace-nowrap">
          {filteredtxn.length} transactions
        </span>
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-lg">
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date ↑↓</TableHead>
              <TableHead>Amount ↑↓</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              filteredtxn.map((tx: Transaction) => {
                const isIncome = tx.type === "INCOME";
                const categoryConfig = CATEGORY_COLORS[tx.category];

                return (
                  <TableRow key={tx.id}>
                    {/* Title */}
                    <TableCell className="font-medium text-lg">
                      {tx.title}
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      <Badge
                        className={`rounded-full text-lg px-4 py-3 ${categoryConfig.bgColor} ${categoryConfig.color}`}
                      >
                        {tx.category}
                      </Badge>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <Badge
                        className={`rounded-full px-4 py-3 text-lg ${
                          isIncome
                            ? "bg-black text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {tx.type.toLowerCase()}
                      </Badge>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-lg text-gray-600">
                      {format(new Date(tx.date), "MMM dd, yyyy")}
                    </TableCell>

                    {/* Amount */}
                    <TableCell
                      className={`font-medium text-lg ${
                        isIncome ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isIncome ? "+" : "-"}${tx.amount.toFixed(2)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-3">
                        <Pencil
                          className="h-6 w-6 cursor-pointer text-gray-600 hover:text-black"
                          onClick={() => handleEdit(tx.id!, tx)}
                        />
                        <Trash2
                          className="h-6 w-6 cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => handledelete(tx.id!)}
                        />
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
