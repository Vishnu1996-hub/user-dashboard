'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { Skeleton } from '@/components/atoms/Skeleton'

function fmt(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n.toFixed(0)}`
}

export function RevenueChart() {
  const { data, isLoading } = useAnalytics()

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-36 rounded-lg" />
        <Skeleton className="mt-8 h-64 w-full rounded-2xl" />
        <Skeleton className="mt-6 h-16 w-full rounded-2xl" />
      </div>
    )
  }

  const monthly = data?.monthlyRevenue ?? []
  const maxRev  = Math.max(...monthly.map((m) => m.revenue), 1)
  const total   = monthly.reduce((s, m) => s + m.revenue, 0)
  const peak    = monthly.reduce((best, m) => m.revenue > (best?.revenue ?? 0) ? m : best, monthly[0])

  const last     = monthly[monthly.length - 1]
  const prevLast = monthly[monthly.length - 2]
  const mom = prevLast && prevLast.revenue > 0
    ? Math.round(((last.revenue - prevLast.revenue) / prevLast.revenue) * 100 * 10) / 10
    : null

  const yTicks = [1, 0.75, 0.5, 0.25, 0]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Monthly Revenue</h2>
          <p className="mt-1 text-sm text-muted-foreground">Last {monthly.length} months</p>
        </div>
        <div className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
          {monthly.length} months
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        {/* Y-axis */}
        <div className="flex flex-col justify-between pb-7 text-right">
          {yTicks.map((t) => (
            <span key={t} className="text-xs text-muted-foreground">{fmt(maxRev * t)}</span>
          ))}
        </div>

        {/* Bars + X labels */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex h-56 items-end gap-2">
            {monthly.map((m) => {
              const pct = maxRev > 0 ? (m.revenue / maxRev) * 100 : 0
              return (
                <div key={m.label} className="group relative flex flex-1 flex-col items-center">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                    {fmt(m.revenue)} · {m.orders} order{m.orders !== 1 ? 's' : ''}
                  </div>
                  <div
                    className="w-full rounded-t-2xl bg-primary/80 transition-all duration-300 hover:bg-primary"
                    style={{ height: `${pct}%`, minHeight: m.revenue > 0 ? 4 : 0 }}
                  />
                </div>
              )
            })}
          </div>
          <div className="flex gap-2">
            {monthly.map((m) => (
              <div key={m.label} className="flex-1 text-center text-xs font-medium text-muted-foreground truncate">
                {m.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border">
        <div className="p-4 text-center">
          <p className="text-xs text-muted-foreground">Peak Month</p>
          <p className="mt-1 text-base font-semibold">{peak?.label ?? '—'}</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-xs text-muted-foreground">Period Total</p>
          <p className="mt-1 text-base font-semibold">{fmt(total)}</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-xs text-muted-foreground">MoM Growth</p>
          <p className={`mt-1 text-base font-semibold ${mom === null ? 'text-muted-foreground' : mom >= 0 ? 'text-success' : 'text-danger'}`}>
            {mom === null ? '—' : `${mom >= 0 ? '+' : ''}${mom}%`}
          </p>
        </div>
      </div>
    </div>
  )
}
