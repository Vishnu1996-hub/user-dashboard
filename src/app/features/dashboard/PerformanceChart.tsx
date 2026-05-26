export function PerformanceChart() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Performance Overview
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Revenue and engagement analytics
          </p>
        </div>

        <button className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary">
          Export
        </button>
      </div>

      <div className="mt-8 flex h-80 items-end gap-3 rounded-3xl bg-background p-6">
        {[45, 72, 58, 88, 64, 92, 76, 98, 70, 82].map(
          (height, index) => (
            <div
              key={index}
              className="flex flex-1 items-end"
            >
              <div
                className="w-full rounded-t-2xl bg-primary/80 transition-all hover:bg-primary"
                style={{
                  height: `${height}%`,
                }}
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}