import { Skeleton } from '@/components/atoms/Skeleton'

export default function AnalyticsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-3xl" />
        ))}
      </div>

      {/* Revenue chart + status */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Skeleton className="h-80 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>

      {/* Category + top products */}
      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <Skeleton className="h-72 rounded-3xl" />
        <Skeleton className="h-72 rounded-3xl" />
      </div>
    </div>
  )
}
