'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { Skeleton } from '@/components/atoms/Skeleton'

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  delivered:  { label: 'Delivered',  color: 'bg-success',   dot: 'bg-success'   },
  shipped:    { label: 'Shipped',    color: 'bg-blue-500',  dot: 'bg-blue-500'  },
  processing: { label: 'Processing', color: 'bg-primary',   dot: 'bg-primary'   },
  pending:    { label: 'Pending',    color: 'bg-warning',   dot: 'bg-warning'   },
  cancelled:  { label: 'Cancelled',  color: 'bg-danger',    dot: 'bg-danger'    },
}

export function OrderStatusBreakdown() {
  const { data, isLoading } = useAnalytics()

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <Skeleton className="h-6 w-36 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-24 rounded-lg" />
        <Skeleton className="mt-6 h-3 w-full rounded-full" />
        <div className="mt-5 flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-6 w-full rounded-lg" />)}
        </div>
      </div>
    )
  }

  const counts = data?.orderStatusCounts ?? {}
  const total  = Object.values(counts).reduce((s, v) => s + v, 0)

  // Order by our preferred display order, include only statuses that exist
  const entries = Object.keys(STATUS_CONFIG)
    .filter((s) => counts[s] != null)
    .map((s) => ({ status: s, count: counts[s] }))

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Order Status</h2>
      <p className="mt-1 text-sm text-muted-foreground">{total} order{total !== 1 ? 's' : ''} total</p>

      {/* Stacked bar */}
      <div className="mt-6 flex h-3 overflow-hidden rounded-full">
        {entries.map(({ status, count }) => {
          const cfg = STATUS_CONFIG[status]!
          return (
            <div
              key={status}
              title={`${cfg.label}: ${count}`}
              className={`${cfg.color} first:rounded-l-full last:rounded-r-full`}
              style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-col gap-3">
        {entries.map(({ status, count }) => {
          const cfg = STATUS_CONFIG[status]!
          const pct = total > 0 ? Math.round((count / total) * 100) : 0
          return (
            <div key={status} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
                <span className="text-sm font-medium">{cfg.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full rounded-full ${cfg.color}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="w-5 text-right text-sm tabular-nums text-muted-foreground">{count}</span>
                <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{pct}%</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
