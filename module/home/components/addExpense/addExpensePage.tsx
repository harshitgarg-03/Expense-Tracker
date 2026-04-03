"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  "Food",
  "Travel",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Salary",
  "Freelance",
  "Other",
];

export function ExpenseFormUI() {
  const [type, setType] = useState<"EXPENSE" | "INCOME">("EXPENSE");

  return (
    <div className="px-6 py-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Add Transaction</h1>
        <p className="text-sm text-gray-500">
          Track your expenses and income
        </p>
      </div>

      {/* Card */}
      <Card className="max-w-2xl border shadow-sm">
        <CardContent className="p-5 space-y-5">

          {/* Type */}
          <div className="flex items-center justify-between">
            <Label className="text-sm">Type</Label>

            <div className="flex bg-gray-100 dark:bg-gray-900 rounded-md p-1">
              <button
                onClick={() => setType("EXPENSE")}
                className={`px-3 py-1 text-xs rounded-md transition ${
                  type === "EXPENSE"
                    ? "bg-white dark:bg-gray-800 shadow text-black dark:text-white"
                    : "text-gray-500"
                }`}
              >
                Expense
              </button>

              <button
                onClick={() => setType("INCOME")}
                className={`px-3 py-1 text-xs rounded-md transition ${
                  type === "INCOME"
                    ? "bg-white dark:bg-gray-800 shadow text-black dark:text-white"
                    : "text-gray-500"
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <Label className="text-sm mb-1 block">Title</Label>
            <Input className="h-9" placeholder="Grocery Shopping" />
          </div>

          {/* Amount + Category */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <Label className="text-sm mb-1 block">Amount</Label>
              <Input type="number" className="h-9" placeholder="0.00" />
            </div>

            <div>
              <Label className="text-sm mb-1 block">Category</Label>
              <Select>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Date */}
          <div>
            <Label className="text-sm mb-1 block">Date</Label>
            <Input type="date" className="h-9" />
          </div>

          {/* Submit */}
          <Button className="w-full h-9 text-sm font-medium">
            Add Transaction
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}