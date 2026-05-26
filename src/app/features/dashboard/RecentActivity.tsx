'use client'

import { Activity } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Skeleton } from '@/components/atoms/Skeleton'
import { Badge } from '@/components/atoms/Badge'

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (days  > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (mins  > 0) return `${mins}m ago`
  return 'just now'
}

export function RecentActivity() {
  const { data, isLoading } = useAnalytics()

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Activity size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <p className="text-sm text-muted-foreground">Latest customer activity</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))
          : (data?.recentOrders ?? []).map((order) => (
              <div
                key={order.id}
                className="flex gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:bg-secondary"
              >
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{order.orderNumber}</p>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {order.customerName} · {order.items.length} item{order.items.length !== 1 ? 's' : ''} · ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <Badge status={order.status} />
                      <span className="text-xs text-muted-foreground">{timeAgo(order.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
