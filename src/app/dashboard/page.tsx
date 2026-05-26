import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { KPISection } from '../features/dashboard/KPISection'
import { PerformanceChart } from '../features/dashboard/PerformanceChart'
import { RecentActivity } from '../features/dashboard/RecentActivity'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Overview of key metrics, recent activity, and performance data.',
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <KPISection />

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <PerformanceChart />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  )
}
