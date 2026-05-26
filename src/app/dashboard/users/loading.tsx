import { Skeleton } from '@/components/atoms/Skeleton'

export default function UsersLoading() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="border-b border-border p-6">
        <Skeleton className="h-7 w-32 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-20 rounded-lg" />
      </div>
      <div className="border-b border-border px-6 py-4">
        <Skeleton className="h-9 w-72 rounded-xl" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <Skeleton className="h-7 w-7 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 rounded-lg" />
              <Skeleton className="mt-1.5 h-3 w-48 rounded-lg" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
