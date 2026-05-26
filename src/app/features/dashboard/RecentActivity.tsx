import { Activity } from 'lucide-react'

const activities = [
  {
    title: 'New order placed',
    description: 'Order #4832 placed by Olivia Martin',
    time: '2 min ago',
  },
  {
    title: 'Payment received',
    description: '$1,240 payment received from Acme Inc.',
    time: '12 min ago',
  },
  {
    title: 'New customer registered',
    description: 'James Anderson joined the platform',
    time: '1 hour ago',
  },
  {
    title: 'Server deployment completed',
    description: 'Production deployment finished successfully',
    time: '3 hours ago',
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Activity size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Recent Activity
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest platform updates
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:bg-secondary"
          >
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>

                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}