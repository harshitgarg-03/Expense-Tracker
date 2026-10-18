"use client";

import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiErrorFromResponse, toastError } from "@/lib/api-error";
import { FileUp, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "../../types";

type Row = {
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: Category;
  date: string;
  selected: boolean;
};

const CATEGORIES: Category[] = [
  "Food", "Travel", "Bills", "Entertainment",
  "Shopping", "Health", "Salary", "Freelance", "Other",
];

export function ImportStatement() {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/transaction/import", { method: "POST", body: fd });
      if (!res.ok) {
        throw await apiErrorFromResponse(res, "Couldn't read this statement. Please try another PDF.");
      }
      const data = await res.json();
      if (!data.transactions.length) {
        toast.error("No transactions found in this PDF. Make sure it's a bank statement with selectable text.");
        return;
      }
      setRows(data.transactions.map((t: Omit<Row, "selected">) => ({ ...t, selected: true })));
    } catch (e: any) {
      toastError(e, "Couldn't read this statement. Please try again.");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const update = (i: number, patch: Partial<Row>) =>
    setRows((prev) => prev!.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const handleSave = async () => {
    const selected = rows!.filter((r) => r.selected);
    if (!selected.length) return;
    setSaving(true);
    try {
      const res = await fetch("/api/transaction/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions: selected }),
      });
      if (!res.ok) {
        throw await apiErrorFromResponse(res, "Couldn't save the transactions. Please try again.");
      }
      const data = await res.json();
      toast.success(`${data.created} transactions added, ${data.skipped} duplicates skipped`);
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      setRows(null);
    } catch (e: any) {
      toastError(e, "Couldn't save the transactions. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <Button onClick={() => inputRef.current?.click()} disabled={loading} className="gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
        {loading ? "Reading statement..." : "Import Statement"}
      </Button>

      {rows && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="flex max-h-[85vh] w-full max-w-4xl flex-col rounded-2xl border border-white/10 bg-background p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Review transactions ({rows.filter((r) => r.selected).length}/{rows.length})
              </h3>
              <button onClick={() => setRows(null)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto">
              {rows.map((r, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-white/10 p-2 text-sm">
                  <input
                    type="checkbox"
                    checked={r.selected}
                    onChange={(e) => update(i, { selected: e.target.checked })}
                  />
                  <input
                    value={r.title}
                    onChange={(e) => update(i, { title: e.target.value })}
                    className="min-w-0 flex-1 bg-transparent outline-none"
                  />
                  <span className="w-24 text-right tabular-nums">{r.amount.toFixed(2)}</span>
                  <select
                    value={r.type}
                    onChange={(e) => update(i, { type: e.target.value as Row["type"] })}
                    className="bg-transparent"
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                  <select
                    value={r.category}
                    onChange={(e) => update(i, { category: e.target.value as Category })}
                    className="bg-transparent"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <span className="w-24 text-xs text-gray-500">{r.date}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setRows(null)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Add selected
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}