'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/atoms/Skeleton'

function KPISkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-36 rounded-3xl" />
      ))}
    </div>
  )
}

function PanelSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <Skeleton className="h-6 w-48 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-36 rounded-lg" />
      <div className="mt-6 flex flex-col gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}

const AnalyticsKPIs = dynamic(
  () => import('./AnalyticsKPIs').then((mod) => mod.AnalyticsKPIs),
  { loading: KPISkeleton }
)

const RevenueChart = dynamic(
  () => import('./RevenueChart').then((mod) => mod.RevenueChart),
  { loading: () => <PanelSkeleton rows={5} /> }
)

const OrderStatusBreakdown = dynamic(
  () => import('./OrderStatusBreakdown').then((mod) => mod.OrderStatusBreakdown),
  { loading: () => <PanelSkeleton rows={5} /> }
)

const CategoryBreakdown = dynamic(
  () => import('./CategoryBreakdown').then((mod) => mod.CategoryBreakdown),
  { loading: () => <PanelSkeleton rows={5} /> }
)

const TopProducts = dynamic(
  () => import('./TopProducts').then((mod) => mod.TopProducts),
  { loading: () => <PanelSkeleton rows={5} /> }
)

export function AnalyticsWidgets() {
  return (
    <div className="flex flex-col gap-6">
      <AnalyticsKPIs />

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <RevenueChart />
        <OrderStatusBreakdown />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <CategoryBreakdown />
        <TopProducts />
      </div>
    </div>
  )
}
