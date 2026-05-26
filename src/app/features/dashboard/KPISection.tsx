import {
  ArrowUpRight,
  CreditCard,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react'

const kpis = [
  {
    title: 'Total Revenue',
    value: '$48,290',
    change: '+12.4%',
    icon: CreditCard,
  },
  {
    title: 'Active Users',
    value: '18,420',
    change: '+8.1%',
    icon: Users,
  },
  {
    title: 'Orders',
    value: '2,847',
    change: '+5.6%',
    icon: ShoppingCart,
  },
  {
    title: 'Conversion Rate',
    value: '6.24%',
    change: '+1.2%',
    icon: TrendingUp,
  },
]

export function KPISection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                  {item.value}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon size={22} />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                <ArrowUpRight size={12} />
                {item.change}
              </div>

              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}