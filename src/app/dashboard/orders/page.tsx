import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { OrderTable } from '@/components/organisms/OrderTable'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Orders',
  description: 'Review and manage customer orders - filter by status and update fulfilment.',
  path: '/dashboard/orders',
})

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <section aria-labelledby="orders-title">
          <h1 id="orders-title" className="text-2xl font-semibold">
            Orders
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review customer orders, status, totals, and fulfilment activity.
          </p>
        </section>
        <OrderTable />
      </div>
    </DashboardLayout>
  )
}
