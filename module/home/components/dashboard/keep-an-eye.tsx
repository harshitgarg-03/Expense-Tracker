"use client";

import { useState } from "react";
import { AlertTriangle, Eye, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Transaction } from "../../types";
import {
  WATCH_ALL,
  WatchLevel,
  useSpendingWatch,
} from "../../hooks/useSpendingWatch";

const WATCH_TARGETS = [
  { value: WATCH_ALL, label: "All spending" },
  ...["Food", "Travel", "Bills", "Entertainment", "Shopping", "Health", "Other"].map(
    (c) => ({ value: c, label: c }),
  ),
];

const LEVEL_STYLES: Record<
  WatchLevel,
  { bar: string; text: string; label: string }
> = {
  ok: {
    bar: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "On track",
  },
  warn: {
    bar: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    label: "Close to limit",
  },
  over: {
    bar: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    label: "Limit hit",
  },
};

interface KeepAnEyeProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export function KeepAnEye({ transactions, isLoading }: KeepAnEyeProps) {
  const { items, setLimit, removeLimit } = useSpendingWatch(
    transactions,
    isLoading,
  );
  const [target, setTarget] = useState<string>(WATCH_ALL);
  const [amount, setAmount] = useState("");

  const attention = items.filter((i) => i.level !== "ok").length;

  const handleAdd = () => {
    const value = Number(amount);

    if (!amount.trim() || !Number.isFinite(value) || value <= 0) {
      toast.error("Enter a monthly limit greater than 0.");
      return;
    }

    const existed = items.some((i) => i.key === target);
    setLimit(target, value);
    setAmount("");
    toast.success(existed ? "Limit updated 👍" : "Now keeping an eye on it 👀");
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-white/4 to-white/2 backdrop-blur-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-500/10 p-2 text-blue-500">
            <Eye className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Keep an Eye
            </h2>
            <p className="text-sm text-gray-500">
              Set monthly limits and get alerted before you overspend
            </p>
          </div>
        </div>

        {attention > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500">
            <AlertTriangle className="h-3.5 w-3.5" />
            {attention} need{attention === 1 ? "s" : ""} attention
          </span>
        )}
      </div>

      <div className="space-y-5 p-6">
        {/* Add / update a watch */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="h-9 rounded-xl border border-black/10 bg-white/30 px-3 text-sm text-black outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
          >
            {WATCH_TARGETS.map((t) => (
              <option
                key={t.value}
                value={t.value}
                className="bg-white text-black dark:bg-gray-900 dark:text-white"
              >
                {t.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Monthly limit ($)"
            className="h-9 w-44 rounded-xl border border-black/10 bg-white/30 px-3 text-sm text-black outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
          />

          <Button type="button" onClick={handleAdd} className="h-9 gap-1">
            <Plus className="h-4 w-4" />
            Watch
          </Button>
        </div>

        {/* Watched limits */}
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">
            Nothing is being watched yet. Pick a category, set a monthly limit
            and we&apos;ll pop up a heads-up when you get close.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((it) => {
              const style = LEVEL_STYLES[it.level];

              return (
                <div
                  key={it.key}
                  className="rounded-2xl border border-white/10 bg-black/5 p-4 dark:bg-white/5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-black dark:text-white">
                      {it.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${style.text}`}>
                        {style.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLimit(it.key)}
                        aria-label={`Stop watching ${it.label}`}
                        className="text-gray-400 transition hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
                      style={{ width: `${Math.min(it.percent, 100)}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>
                      ${it.spent.toFixed(2)} / ${it.limit.toFixed(2)} ({it.percent}%)
                    </span>
                    <span>
                      {it.remaining >= 0
                        ? `$${it.remaining.toFixed(2)} left`
                        : `$${Math.abs(it.remaining).toFixed(2)} over`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-xs text-gray-400">
          Limits are saved on this device. You&apos;ll get a popup at 80% and
          again at 100%, once per month.
        </p>
      </div>
    </div>
  );
}
