'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { Skeleton } from '@/components/atoms/Skeleton'

const CATEGORY_COLORS: Record<string, string> = {
  electronics: 'bg-primary',
  home:        'bg-blue-500',
  sports:      'bg-success',
  clothing:    'bg-warning',
  books:       'bg-purple-500',
  food:        'bg-orange-400',
  other:       'bg-zinc-400',
}

function fmt(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n.toFixed(0)}`
}

export function CategoryBreakdown() {
  const { data, isLoading } = useAnalytics()

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-36 rounded-lg" />
        <div className="mt-6 flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-9 w-full rounded-xl" />)}
        </div>
      </div>
    )
  }

  const cats  = data?.categoryRevenue ?? []
  const total = cats.reduce((s, c) => s + c.revenue, 0)

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Revenue by Category</h2>
          <p className="mt-1 text-sm text-muted-foreground">Product category performance</p>
        </div>
        <span className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
          {fmt(total)} total
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {cats.map((c) => {
          const color = CATEGORY_COLORS[c.category] ?? 'bg-zinc-400'
          return (
            <div key={c.category}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium capitalize">{c.category}</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{fmt(c.revenue)}</span>
                  <span className="w-9 text-right text-xs text-muted-foreground">{c.pct}%</span>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${color}`}
                  style={{ width: `${c.pct}%` }}
                />
              </div>
            </div>
          )
        })}

        {cats.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No order data yet.</p>
        )}
      </div>
    </div>
  )
}
