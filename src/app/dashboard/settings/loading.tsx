import { Skeleton } from '@/components/atoms/Skeleton'

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-72 rounded-lg" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="flex items-center gap-4 border-b border-border p-6">
            <Skeleton className="h-11 w-11 rounded-2xl" />
            <div>
              <Skeleton className="h-5 w-28 rounded-lg" />
              <Skeleton className="mt-1.5 h-4 w-56 rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <Skeleton className="h-9 w-full rounded-xl" />
            <Skeleton className="h-9 w-3/4 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
