'use client'

import { Package } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Skeleton } from '@/components/atoms/Skeleton'

export function TopProducts() {
  const { data, isLoading } = useAnalytics()

  return (
    <div className="rounded-3xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-6">
        <h2 className="text-lg font-semibold">Top Products</h2>
        <p className="mt-1 text-sm text-muted-foreground">Best performing items by revenue</p>
      </div>

      <div className="divide-y divide-border">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-40 rounded-lg" />
                  <Skeleton className="mt-1.5 h-2 w-32 rounded-full" />
                </div>
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
            ))
          : (data?.topProducts ?? []).map((p, i) => (
              <div key={p.name} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/40">
                {/* Rank */}
                <span className="w-5 shrink-0 text-center text-sm font-semibold text-muted-foreground">
                  {i + 1}
                </span>

                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Package size={16} />
                </div>

                {/* Name + bar */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary/60" style={{ width: `${p.barPct}%` }} />
                    </div>
                    <span className="text-xs capitalize text-muted-foreground">{p.sku}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold">${p.revenue.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{p.unitsSold} sold</p>
                </div>
              </div>
            ))}

        {!isLoading && (data?.topProducts ?? []).length === 0 && (
          <p className="px-6 py-16 text-center text-sm text-muted-foreground">No order data yet.</p>
        )}
      </div>
    </div>
  )
}
