import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { DashboardWidgets } from '../features/dashboard/DashboardWidgets'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Dashboard',
  description: 'Overview of key metrics, recent activity, and performance data.',
  path: '/dashboard',
})

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <section aria-labelledby="dashboard-title">
          <h1 id="dashboard-title" className="text-2xl font-semibold">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of key metrics, recent activity, and performance data.
          </p>
        </section>
        <DashboardWidgets />
      </div>
    </DashboardLayout>
  )
}
