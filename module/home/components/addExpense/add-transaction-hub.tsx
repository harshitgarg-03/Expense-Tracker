"use client";

import { useState } from "react";
import { FileText, PencilLine } from "lucide-react";
import { ExpenseFormUI } from "./addExpensePage";
import { ImportStatement } from "../transactions/import-statement";

type Mode = "manual" | "pdf";

const TABS: { id: Mode; label: string; icon: typeof PencilLine }[] = [
  { id: "manual", label: "Manual Entry", icon: PencilLine },
  { id: "pdf", label: "Upload PDF", icon: FileText },
];

export function AddTransactionHub() {
  const [mode, setMode] = useState<Mode>("manual");

  return (
    <div>
      {/* Mode switcher */}
      <div className="px-6 pt-6">
        <div className="inline-flex rounded-xl border border-black/10 bg-black/5 p-1 dark:border-white/10 dark:bg-white/5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                mode === id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {mode === "manual" ? (
        <ExpenseFormUI mode="Add" />
      ) : (
        <div className="px-6 py-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold">Import from Bank Statement</h1>
            <p className="text-sm text-gray-500">
              Upload a PDF and we&apos;ll turn it into transactions
            </p>
          </div>

          <div className="max-w-2xl space-y-5 rounded-xl border p-6 shadow-sm">
            <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-300">
              <li>Upload your bank statement PDF (up to 5MB).</li>
              <li>Review the transactions we found. Untick or edit any row.</li>
              <li>Confirm to add them. Duplicates are skipped automatically.</li>
            </ol>

            <ImportStatement />

            <p className="text-xs text-gray-400">
              Works with text-based PDFs only (not scanned photos) and
              password-protected files aren&apos;t supported. The statement text
              is processed by AI to read the transactions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
