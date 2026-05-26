import { Skeleton } from '@/components/atoms/Skeleton'

export default function OrdersLoading() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      {/* Header */}
      <div className="border-b border-border p-6">
        <Skeleton className="h-7 w-32 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-20 rounded-lg" />
      </div>

      {/* Filters */}
      <div className="flex gap-3 border-b border-border px-6 py-4">
        <Skeleton className="h-9 w-72 rounded-xl" />
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <div className="flex-1">
              <Skeleton className="h-4 w-28 rounded-lg" />
              <Skeleton className="mt-1.5 h-3 w-20 rounded-lg" />
            </div>
            <div className="hidden flex-1 sm:block">
              <Skeleton className="h-4 w-36 rounded-lg" />
              <Skeleton className="mt-1.5 h-3 w-44 rounded-lg" />
            </div>
            <Skeleton className="hidden h-4 w-12 rounded-lg md:block" />
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-7 w-8 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
