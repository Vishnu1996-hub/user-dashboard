import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { AnalyticsWidgets } from '@/app/features/analytics/AnalyticsWidgets'

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Revenue trends, order status breakdown, and top-performing products.',
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <AnalyticsWidgets />
    </DashboardLayout>
  )
}
