'use client'

import { ArrowDownRight, ArrowUpRight, CreditCard, Package, ShoppingCart, TrendingUp } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Skeleton } from '@/components/atoms/Skeleton'

function GrowthBadge({ value }: { value: number | null }) {
  if (value === null) return <span className="text-xs text-muted-foreground">no prior data</span>
  const up = value >= 0
  return (
    <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
      {up ? (
        <ArrowUpRight size={12} aria-hidden="true" />
      ) : (
        <ArrowDownRight size={12} aria-hidden="true" />
      )}
      {up ? '+' : ''}{value}%
    </div>
  )
}

export function KPISection() {
  const { data, isLoading } = useAnalytics()

  const kpis = data ? [
    {
      title:  'Total Revenue',
      value:  `$${data.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      growth: data.revenueGrowth,
      icon:   CreditCard,
    },
    {
      title:  'Total Orders',
      value:  data.totalOrders.toLocaleString(),
      growth: data.orderGrowth,
      icon:   ShoppingCart,
    },
    {
      title:  'Avg Order Value',
      value:  `$${data.avgOrderValue.toFixed(2)}`,
      growth: data.avgOrderGrowth,
      icon:   TrendingUp,
    },
    {
      title:  'Active Products',
      value:  `${data.activeProducts} / ${data.totalProducts}`,
      growth: null,
      icon:   Package,
    },
  ] : []

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-3xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon size={22} aria-hidden="true" />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <GrowthBadge value={item.growth} />
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
