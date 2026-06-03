import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { DashboardWidgets } from '../features/dashboard/DashboardWidgets'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Overview of key metrics, recent activity, and performance data.',
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardWidgets />
    </DashboardLayout>
  )
}
