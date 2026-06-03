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

function ChartSkeleton() {
  return <Skeleton className="h-full min-h-85 w-full rounded-3xl" />
}

function ActivitySkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <Skeleton className="h-11 w-56 rounded-2xl" />
      <div className="mt-6 flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

const KPISection = dynamic(
  () => import('./KPISection').then((mod) => mod.KPISection),
  { loading: KPISkeleton }
)

const PerformanceChart = dynamic(
  () => import('./PerformanceChart').then((mod) => mod.PerformanceChart),
  { loading: ChartSkeleton }
)

const RecentActivity = dynamic(
  () => import('./RecentActivity').then((mod) => mod.RecentActivity),
  { loading: ActivitySkeleton }
)

export function DashboardWidgets() {
  return (
    <div className="flex flex-col gap-6">
      <KPISection />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <PerformanceChart />
        <RecentActivity />
      </div>
    </div>
  )
}
