import { Skeleton } from '@/components/atoms/Skeleton'

export default function ProductsLoading() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-6">
        <div>
          <Skeleton className="h-7 w-36 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-24 rounded-lg" />
        </div>
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 border-b border-border px-6 py-4">
        <div className="flex gap-3">
          <Skeleton className="h-9 w-64 rounded-xl" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-16 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="flex-1">
              <Skeleton className="h-4 w-40 rounded-lg" />
              <Skeleton className="mt-1.5 h-3 w-24 rounded-lg" />
            </div>
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
