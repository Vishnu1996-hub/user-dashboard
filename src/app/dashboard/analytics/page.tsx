import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { AnalyticsWidgets } from '@/app/features/analytics/AnalyticsWidgets'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Analytics',
  description: 'Revenue trends, order status breakdown, and top-performing products.',
  path: '/dashboard/analytics',
})

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <section aria-labelledby="analytics-title">
          <h1 id="analytics-title" className="text-2xl font-semibold">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track revenue trends, category performance, and top products.
          </p>
        </section>
        <AnalyticsWidgets />
      </div>
    </DashboardLayout>
  )
}
