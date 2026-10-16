"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/module/auth/store";
import { Transaction } from "../types";

export const WATCH_ALL = "ALL";
export const WATCH_WARN_AT = 0.8; // warn when 80% of the limit is used

export type WatchLevel = "ok" | "warn" | "over";

export interface WatchItem {
  key: string;
  label: string;
  limit: number;
  spent: number;
  percent: number; // can go above 100
  remaining: number; // negative when over the limit
  level: WatchLevel;
}

type Limits = Record<string, number>;

const limitsKey = (uid: string) => `expendtrack:watch:${uid}`;
const alertsKey = (uid: string) => `expendtrack:watch-alerts:${uid}`;

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked: the watch still works for this session
  }
}

const monthId = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}`;

/**
 * "Keep an eye": the user sets monthly limits (per category or overall).
 * This hook tracks this month's expenses against them and pops a toast
 * when a limit is close (80%) or hit (100%) - once per limit, per month.
 *
 * Limits are stored in this browser (localStorage), keyed by user.
 */
export function useSpendingWatch(
  transactions: Transaction[],
  isLoading?: boolean,
) {
  const user = useAuthStore((s) => s.user) as unknown as {
    id?: string;
    email?: string;
  } | null;
  const uid = user?.id ?? user?.email ?? "guest";

  const [limits, setLimits] = useState<Limits>({});
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  const ready = loadedFor === uid;

  // Load saved limits (and reload if the logged-in user changes)
  useEffect(() => {
    setLimits(readJSON<Limits>(limitsKey(uid), {}));
    setLoadedFor(uid);
  }, [uid]);

  const persist = useCallback(
    (next: Limits) => {
      setLimits(next);
      writeJSON(limitsKey(uid), next);
    },
    [uid],
  );

  const setLimit = useCallback(
    (key: string, amount: number) => persist({ ...limits, [key]: amount }),
    [limits, persist],
  );

  const removeLimit = useCallback(
    (key: string) => {
      const next = { ...limits };
      delete next[key];
      persist(next);
    },
    [limits, persist],
  );

  const items = useMemo<WatchItem[]>(() => {
    const now = new Date();
    const spentBy: Record<string, number> = {};
    let total = 0;

    for (const tx of transactions) {
      if (tx.type !== "EXPENSE") continue;
      const d = new Date((tx.date ?? tx.createdAt) as Date);
      if (
        isNaN(d.getTime()) ||
        d.getFullYear() !== now.getFullYear() ||
        d.getMonth() !== now.getMonth()
      ) {
        continue;
      }
      spentBy[tx.category] = (spentBy[tx.category] ?? 0) + tx.amount;
      total += tx.amount;
    }

    return Object.entries(limits)
      .map(([key, limit]) => {
        const spent = key === WATCH_ALL ? total : (spentBy[key] ?? 0);
        const ratio = limit > 0 ? spent / limit : 0;
        const level: WatchLevel =
          ratio >= 1 ? "over" : ratio >= WATCH_WARN_AT ? "warn" : "ok";

        return {
          key,
          label: key === WATCH_ALL ? "All spending" : key,
          limit,
          spent,
          percent: Math.round(ratio * 100),
          remaining: limit - spent,
          level,
        };
      })
      .sort((a, b) => b.percent - a.percent);
  }, [transactions, limits]);

  // Popup alerts: once per (month, limit, level) so users aren't nagged
  useEffect(() => {
    if (!ready || isLoading) return;

    const thisMonth = monthId(new Date());
    const log = readJSON<Record<string, true>>(alertsKey(uid), {});
    let changed = false;

    // drop alerts from previous months
    for (const k of Object.keys(log)) {
      if (!k.startsWith(`${thisMonth}:`)) {
        delete log[k];
        changed = true;
      }
    }

    for (const it of items) {
      if (it.level === "ok") continue;

      const id = `${thisMonth}:${it.key}:${it.limit}:${it.level}`;
      if (log[id]) continue;

      log[id] = true;
      changed = true;

      if (it.level === "over") {
        toast.error(`${it.label} limit hit 🚨`, {
          id,
          description: `You've spent $${it.spent.toFixed(2)} of your $${it.limit.toFixed(2)} monthly limit.`,
          duration: 7000,
        });
      } else {
        toast.warning(`Heads up: ${it.label} is at ${it.percent}% 👀`, {
          id,
          description: `Only $${it.remaining.toFixed(2)} left of your $${it.limit.toFixed(2)} monthly limit.`,
          duration: 7000,
        });
      }
    }

    if (changed) writeJSON(alertsKey(uid), log);
  }, [items, ready, isLoading, uid]);

  return { items, ready, setLimit, removeLimit };
}
