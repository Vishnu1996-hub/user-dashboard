import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { AnalyticsKPIs } from '@/app/features/analytics/AnalyticsKPIs'
import { RevenueChart } from '@/app/features/analytics/RevenueChart'
import { OrderStatusBreakdown } from '@/app/features/analytics/OrderStatusBreakdown'
import { CategoryBreakdown } from '@/app/features/analytics/CategoryBreakdown'
import { TopProducts } from '@/app/features/analytics/TopProducts'

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Revenue trends, order status breakdown, and top-performing products.',
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* KPI row */}
        <AnalyticsKPIs />

        {/* Revenue chart + order status */}
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <RevenueChart />
          <OrderStatusBreakdown />
        </div>

        {/* Category breakdown + Top products */}
        <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
          <CategoryBreakdown />
          <TopProducts />
        </div>
      </div>
    </DashboardLayout>
  )
}
